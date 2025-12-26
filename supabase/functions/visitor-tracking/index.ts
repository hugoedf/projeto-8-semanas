import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS and validation
const ALLOWED_ORIGINS = [
  'https://11d22b42-f1d4-448a-bb0a-b307793705e3.lovableproject.com',
  'https://guiadotreino.com.br',
  'https://www.guiadotreino.com.br',
];

// Allow preview URLs
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.includes('.lovable.app')) return true;
  if (origin.includes('.lovableproject.com')) return true;
  if (origin.startsWith('http://localhost:')) return true;
  return false;
};

// Rate limiting (in-memory, resets on cold start)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // max 10 requests per minute per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || (now - record.timestamp) > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${ip.substring(0, 8)}...`);
    return false;
  }
  
  record.count++;
  return true;
};

// Resolve client IP from headers
const resolveClientIP = (req: Request): string => {
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    if (ips[0]) return ips[0];
  }
  
  const xRealIP = req.headers.get('x-real-ip');
  if (xRealIP) return xRealIP;
  
  return 'unknown';
};

// Strict input validation patterns
const VISITOR_ID_PATTERN = /^[a-zA-Z0-9_\-]{10,100}$/;
const UTM_PATTERN = /^[a-zA-Z0-9_\-.\s]{0,200}$/;
const URL_MAX_LENGTH = 2000;
const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'];

// Validate URL format (basic check)
function isValidUrl(url: string): boolean {
  if (!url || url.length > URL_MAX_LENGTH) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Sanitize string - remove potential XSS/injection
function sanitizeString(value: unknown, maxLength: number = 500): string | null {
  if (typeof value !== 'string') return null;
  // Remove null bytes and control characters
  const sanitized = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  if (sanitized.length === 0 || sanitized.length > maxLength) return null;
  return sanitized;
}

// Strict payload validation
interface VisitorPayload {
  visitor_id: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_id?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  landing_page?: string | null;
  device?: string | null;
  region?: string | null;
}

const ALLOWED_FIELDS = [
  'visitor_id', 'utm_source', 'utm_medium', 'utm_campaign',
  'utm_id', 'utm_term', 'utm_content', 'referrer',
  'landing_page', 'device', 'region'
];

const FORBIDDEN_FIELDS = [
  'age', 'birth_date', 'birth_year', 'idade', 'data_nascimento',
  'password', 'email', 'phone', 'cpf', 'rg', 'credit_card'
];

function validatePayload(data: unknown): VisitorPayload | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.warn('Invalid payload: not an object');
    return null;
  }
  
  const payload = data as Record<string, unknown>;
  
  // Check for forbidden fields
  for (const field of FORBIDDEN_FIELDS) {
    if (field in payload) {
      console.warn(`Rejected payload: contains forbidden field "${field}"`);
      return null;
    }
  }
  
  // Validate visitor_id (required)
  const visitorId = sanitizeString(payload.visitor_id, 100);
  if (!visitorId || !VISITOR_ID_PATTERN.test(visitorId)) {
    console.warn('Invalid payload: invalid visitor_id format');
    return null;
  }
  
  // Build sanitized payload
  const sanitized: VisitorPayload = { visitor_id: visitorId };
  
  // Validate UTM fields
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'];
  for (const field of utmFields) {
    if (field in payload) {
      const value = sanitizeString(payload[field], 200);
      if (value !== null) {
        if (!UTM_PATTERN.test(value)) {
          console.warn(`Invalid ${field} format, skipping`);
          continue;
        }
        (sanitized as any)[field] = value;
      }
    }
  }
  
  // Validate URL fields
  if (payload.landing_page) {
    const landingPage = sanitizeString(payload.landing_page, URL_MAX_LENGTH);
    if (landingPage && isValidUrl(landingPage)) {
      sanitized.landing_page = landingPage;
    }
  }
  
  if (payload.referrer) {
    const referrer = sanitizeString(payload.referrer, URL_MAX_LENGTH);
    if (referrer === 'direct' || (referrer && isValidUrl(referrer))) {
      sanitized.referrer = referrer;
    }
  }
  
  // Validate device type
  if (payload.device) {
    const device = sanitizeString(payload.device, 20);
    if (device && DEVICE_TYPES.includes(device.toLowerCase())) {
      sanitized.device = device.toLowerCase();
    }
  }
  
  // Validate region (alphanumeric + spaces only)
  if (payload.region) {
    const region = sanitizeString(payload.region, 100);
    if (region && /^[a-zA-Z\s,\-]+$/.test(region)) {
      sanitized.region = region;
    }
  }
  
  // Log dropped fields
  const extraFields = Object.keys(payload).filter(k => !ALLOWED_FIELDS.includes(k));
  if (extraFields.length > 0) {
    console.log(`Dropped unknown fields: ${extraFields.join(', ')}`);
  }
  
  return sanitized;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  try {
    // Validate origin
    const origin = req.headers.get('origin');
    if (!isAllowedOrigin(origin)) {
      console.warn(`Blocked request from origin: ${origin}`);
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Rate limiting
    const clientIP = resolveClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Parse JSON with size limit check
    const contentLength = parseInt(req.headers.get('content-length') || '0');
    if (contentLength > 10000) { // 10KB max
      return new Response(JSON.stringify({ error: 'Payload too large' }), {
        status: 413,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const payload = validatePayload(rawData);
    if (!payload) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Initialize Supabase with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check for duplicate
    const { data: existing } = await supabase
      .from('visitor_tracking')
      .select('visitor_id')
      .eq('visitor_id', payload.visitor_id)
      .maybeSingle();
    
    if (existing) {
      console.log(`Visitor already tracked: ${payload.visitor_id.substring(0, 8)}...`);
      return new Response(JSON.stringify({ success: true, duplicate: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Insert visitor data
    const { error } = await supabase
      .from('visitor_tracking')
      .insert({
        visitor_id: payload.visitor_id,
        utm_source: payload.utm_source || null,
        utm_medium: payload.utm_medium || null,
        utm_campaign: payload.utm_campaign || null,
        utm_id: payload.utm_id || null,
        utm_term: payload.utm_term || null,
        utm_content: payload.utm_content || null,
        referrer: payload.referrer || null,
        landing_page: payload.landing_page || null,
        device: payload.device || null,
        region: payload.region || null,
      });
    
    if (error) {
      console.error('Database insert error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save visitor' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log(`Visitor tracked: ${payload.visitor_id.substring(0, 8)}...`);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
