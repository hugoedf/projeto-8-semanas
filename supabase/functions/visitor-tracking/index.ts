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
  
  // Allow production domains
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  
  // Allow Lovable preview domains
  if (origin.includes('.lovable.app')) return true;
  if (origin.includes('.lovableproject.com')) return true;
  
  // Allow localhost for development
  if (origin.startsWith('http://localhost:')) return true;
  
  return false;
};

// Rate limiting (simple in-memory, resets on function cold start)
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
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    if (ips[0]) return ips[0];
  }
  
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  
  const xRealIP = req.headers.get('x-real-ip');
  if (xRealIP) return xRealIP;
  
  return 'unknown';
};

// Strict payload validation - only allowed fields
interface VisitorPayload {
  visitor_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_id?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  device?: string;
  region?: string;
}

const ALLOWED_FIELDS = [
  'visitor_id',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_term',
  'utm_content',
  'referrer',
  'landing_page',
  'device',
  'region'
];

// Validate and sanitize payload - REJECT age and any unknown fields
const validatePayload = (data: unknown): VisitorPayload | null => {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid payload: not an object');
    return null;
  }
  
  const payload = data as Record<string, unknown>;
  
  // Check for required visitor_id
  if (!payload.visitor_id || typeof payload.visitor_id !== 'string') {
    console.warn('Invalid payload: missing or invalid visitor_id');
    return null;
  }
  
  // Validate visitor_id format (UUID or similar)
  if (payload.visitor_id.length < 10 || payload.visitor_id.length > 100) {
    console.warn('Invalid payload: visitor_id length invalid');
    return null;
  }
  
  // Check for forbidden fields (age, birth_date, etc.)
  const forbiddenFields = ['age', 'birth_date', 'birth_year', 'idade', 'data_nascimento'];
  for (const field of forbiddenFields) {
    if (field in payload) {
      console.warn(`Rejected payload: contains forbidden field "${field}"`);
      return null;
    }
  }
  
  // Build sanitized payload with ONLY allowed fields
  const sanitized: VisitorPayload = {
    visitor_id: payload.visitor_id as string,
  };
  
  // Add optional string fields with validation
  const optionalFields = ALLOWED_FIELDS.filter(f => f !== 'visitor_id');
  for (const field of optionalFields) {
    if (field in payload) {
      const value = payload[field];
      if (typeof value === 'string' && value.length <= 500) {
        // Type-safe assignment for known optional fields
        switch (field) {
          case 'utm_source': sanitized.utm_source = value; break;
          case 'utm_medium': sanitized.utm_medium = value; break;
          case 'utm_campaign': sanitized.utm_campaign = value; break;
          case 'utm_id': sanitized.utm_id = value; break;
          case 'utm_term': sanitized.utm_term = value; break;
          case 'utm_content': sanitized.utm_content = value; break;
          case 'referrer': sanitized.referrer = value; break;
          case 'landing_page': sanitized.landing_page = value; break;
          case 'device': sanitized.device = value; break;
          case 'region': sanitized.region = value; break;
        }
      }
      // Silently ignore non-string or too-long values
    }
  }
  
  // Log if extra fields were dropped
  const extraFields = Object.keys(payload).filter(k => !ALLOWED_FIELDS.includes(k));
  if (extraFields.length > 0) {
    console.log(`Ignored extra fields: ${extraFields.join(', ')}`);
  }
  
  return sanitized;
};

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
    const referer = req.headers.get('referer');
    
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
    
    // Parse and validate payload
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
    
    // Initialize Supabase with service role (bypasses RLS)
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
    
    // Check for duplicate (deduplication)
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
    
    console.log(`Visitor tracked successfully: ${payload.visitor_id.substring(0, 8)}...`);
    
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
