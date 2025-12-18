import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-forwarded-for, x-real-ip',
};

// Rate limiting: 60 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

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

interface GeoResponse {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  timezone?: string;
  org?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIpForRateLimit = req.headers.get('cf-connecting-ip') || 
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
    req.headers.get('x-real-ip') || 
    'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIpForRateLimit)) {
    console.log('[GEO] Rate limit exceeded for IP:', clientIpForRateLimit);
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log('[GEO] Requisição recebida');

  try {
    // 1. Capturar IP real do visitante
    // Ordem de prioridade para headers de IP
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    let clientIp = 'unknown';
    
    if (cfConnectingIp) {
      clientIp = cfConnectingIp;
      console.log('[GEO] IP via CF-Connecting-IP:', clientIp);
    } else if (forwardedFor) {
      // X-Forwarded-For pode ter múltiplos IPs, o primeiro é o cliente original
      clientIp = forwardedFor.split(',')[0].trim();
      console.log('[GEO] IP via X-Forwarded-For:', clientIp);
    } else if (realIp) {
      clientIp = realIp;
      console.log('[GEO] IP via X-Real-IP:', clientIp);
    } else {
      console.log('[GEO] Nenhum header de IP encontrado, usando fallback');
    }

    // 2. Consultar API de geolocalização
    let geoData: GeoResponse = {
      ip: clientIp,
      country: 'not_provided',
      region: 'not_provided',
      city: 'not_provided',
      latitude: null,
      longitude: null,
    };

    // Tentar ipapi.co primeiro
    try {
      console.log('[GEO] Consultando ipapi.co para IP:', clientIp);
      
      const ipApiUrl = clientIp !== 'unknown' 
        ? `https://ipapi.co/${clientIp}/json/`
        : 'https://ipapi.co/json/';
      
      const geoResponse = await fetch(ipApiUrl, {
        headers: {
          'User-Agent': 'Metodo8X/1.0'
        }
      });

      if (geoResponse.ok) {
        const data = await geoResponse.json();
        
        // Verificar se não é um erro da API
        if (!data.error) {
          geoData = {
            ip: data.ip || clientIp,
            country: data.country_name || data.country || 'not_provided',
            region: data.region || 'not_provided',
            city: data.city || 'not_provided',
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            timezone: data.timezone,
            org: data.org,
          };
          console.log('[GEO] ipapi.co sucesso:', geoData);
        } else {
          console.log('[GEO] ipapi.co retornou erro:', data);
          throw new Error(data.reason || 'ipapi.co error');
        }
      } else {
        throw new Error(`ipapi.co status ${geoResponse.status}`);
      }
    } catch (ipapiError) {
      console.log('[GEO] ipapi.co falhou, tentando ipwho.is:', ipapiError);
      
      // Fallback para ipwho.is
      try {
        const ipwhoUrl = clientIp !== 'unknown'
          ? `https://ipwho.is/${clientIp}`
          : 'https://ipwho.is/';
        
        const ipwhoResponse = await fetch(ipwhoUrl);
        
        if (ipwhoResponse.ok) {
          const data = await ipwhoResponse.json();
          
          if (data.success !== false) {
            geoData = {
              ip: data.ip || clientIp,
              country: data.country || 'not_provided',
              region: data.region || 'not_provided',
              city: data.city || 'not_provided',
              latitude: data.latitude || null,
              longitude: data.longitude || null,
              timezone: data.timezone?.id,
            };
            console.log('[GEO] ipwho.is sucesso:', geoData);
          } else {
            console.log('[GEO] ipwho.is retornou erro:', data);
          }
        }
      } catch (ipwhoError) {
        console.log('[GEO] ipwho.is também falhou:', ipwhoError);
      }
    }

    // 3. Retornar dados
    console.log('[GEO] Resposta final:', geoData);
    
    return new Response(
      JSON.stringify({
        success: true,
        ...geoData,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[GEO] Erro geral:', errorMessage);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        ip: 'unknown',
        country: 'not_provided',
        region: 'not_provided',
        city: 'not_provided',
        latitude: null,
        longitude: null,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
