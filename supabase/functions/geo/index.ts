import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS and validation
const ALLOWED_ORIGINS = [
  'https://11d22b42-f1d4-448a-bb0a-b307793705e3.lovableproject.com',
  'https://guiadotreino.com.br',
  'https://www.guiadotreino.com.br',
];

// Allow preview URLs and production domains
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.includes('.lovable.app')) return true;
  if (origin.includes('.lovableproject.com')) return true;
  if (origin.startsWith('http://localhost:')) return true;
  return false;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-forwarded-for, x-real-ip',
};

// Rate limiting: 30 requests per minute per IP (more restrictive)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime + RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000); // Every 5 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// In-memory cache to reduce external API calls
const geoCache = new Map<string, { data: GeoResponse; timestamp: number }>();
const GEO_CACHE_TTL = 3600000; // 1 hour

interface GeoResponse {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  timezone?: string;
}

// Validate IP format
function isValidIP(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;
  // Basic IPv4/IPv6 validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  const ipv6CompressedRegex = /^([0-9a-fA-F]{1,4}:)*::([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ipv6CompressedRegex.test(ip);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate origin
  const origin = req.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    console.warn(`[GEO] Blocked request from origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get client IP for rate limiting
  const clientIpForRateLimit = req.headers.get('cf-connecting-ip') || 
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
    req.headers.get('x-real-ip') || 
    'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIpForRateLimit)) {
    console.log('[GEO] Rate limit exceeded for IP:', clientIpForRateLimit.substring(0, 8) + '...');
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log('[GEO] Request received from:', origin);

  try {
    // Get client IP
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    let clientIp = 'unknown';
    
    if (cfConnectingIp && isValidIP(cfConnectingIp)) {
      clientIp = cfConnectingIp;
    } else if (forwardedFor) {
      const firstIp = forwardedFor.split(',')[0].trim();
      if (isValidIP(firstIp)) clientIp = firstIp;
    } else if (realIp && isValidIP(realIp)) {
      clientIp = realIp;
    }

    // Check cache first
    if (clientIp !== 'unknown') {
      const cached = geoCache.get(clientIp);
      if (cached && Date.now() - cached.timestamp < GEO_CACHE_TTL) {
        console.log('[GEO] Cache hit for IP:', clientIp.substring(0, 8) + '...');
        return new Response(
          JSON.stringify({ success: true, ...cached.data, cached: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Default response
    let geoData: GeoResponse = {
      ip: clientIp,
      country: 'not_provided',
      region: 'not_provided',
      city: 'not_provided',
      latitude: null,
      longitude: null,
    };

    // Try ipapi.co first
    try {
      const ipApiUrl = clientIp !== 'unknown' 
        ? `https://ipapi.co/${encodeURIComponent(clientIp)}/json/`
        : 'https://ipapi.co/json/';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      
      const geoResponse = await fetch(ipApiUrl, {
        headers: { 'User-Agent': 'Metodo8X/1.0' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (geoResponse.ok) {
        const data = await geoResponse.json();
        
        if (!data.error) {
          geoData = {
            ip: data.ip || clientIp,
            country: data.country_name || data.country || 'not_provided',
            region: data.region || 'not_provided',
            city: data.city || 'not_provided',
            latitude: typeof data.latitude === 'number' ? data.latitude : null,
            longitude: typeof data.longitude === 'number' ? data.longitude : null,
            timezone: data.timezone,
          };
          console.log('[GEO] ipapi.co success');
        } else {
          throw new Error(data.reason || 'ipapi.co error');
        }
      } else {
        throw new Error(`ipapi.co status ${geoResponse.status}`);
      }
    } catch (ipapiError) {
      console.log('[GEO] ipapi.co failed, trying fallback');
      
      // Fallback to ipwho.is
      try {
        const ipwhoUrl = clientIp !== 'unknown'
          ? `https://ipwho.is/${encodeURIComponent(clientIp)}`
          : 'https://ipwho.is/';
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const ipwhoResponse = await fetch(ipwhoUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (ipwhoResponse.ok) {
          const data = await ipwhoResponse.json();
          
          if (data.success !== false) {
            geoData = {
              ip: data.ip || clientIp,
              country: data.country || 'not_provided',
              region: data.region || 'not_provided',
              city: data.city || 'not_provided',
              latitude: typeof data.latitude === 'number' ? data.latitude : null,
              longitude: typeof data.longitude === 'number' ? data.longitude : null,
              timezone: data.timezone?.id,
            };
            console.log('[GEO] ipwho.is success');
          }
        }
      } catch (ipwhoError) {
        console.log('[GEO] All geo services failed');
      }
    }

    // Cache successful results
    if (clientIp !== 'unknown' && geoData.country !== 'not_provided') {
      geoCache.set(clientIp, { data: geoData, timestamp: Date.now() });
      
      // Clean old cache entries
      if (geoCache.size > 1000) {
        const oldest = Array.from(geoCache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .slice(0, 100);
        oldest.forEach(([key]) => geoCache.delete(key));
      }
    }

    return new Response(
      JSON.stringify({ success: true, ...geoData }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[GEO] Error:', errorMessage);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        ip: 'unknown',
        country: 'not_provided',
        region: 'not_provided',
        city: 'not_provided',
        latitude: null,
        longitude: null,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
