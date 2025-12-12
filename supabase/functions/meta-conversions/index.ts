import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from 'https://esm.sh/zod@3.25.76';

const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_TEST_EVENT_CODE = Deno.env.get('META_TEST_EVENT_CODE');
const META_CAPI_SECRET = Deno.env.get('META_CAPI_SECRET');

// ============================================
// RATE LIMITING - 60 requisições por minuto por IP
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 60;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

// Limpa entradas antigas periodicamente (a cada 5 minutos)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

// ============================================
// MASCARAMENTO DE DADOS SENSÍVEIS
// ============================================
function maskEmail(email: string | undefined | null): string {
  if (!email) return "hidden";
  const parts = email.split("@");
  if (parts.length !== 2) return "hidden";
  return parts[0][0] + "***@" + parts[1];
}

function maskPhone(phone: string | undefined | null): string {
  if (!phone || phone.length < 6) return "hidden";
  return phone.slice(0, 4) + "****" + phone.slice(-2);
}

// Allowed origin patterns for CORS validation
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  
  // Allow all Lovable preview and project domains
  if (origin.includes('.lovable.app') || origin.includes('.lovableproject.com')) {
    return true;
  }
  
  // Allow specific domains
  const allowedExact = [
    'https://lovable.dev',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  
  return allowedExact.includes(origin);
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-meta-capi-secret',
};

// Input validation schema for Meta CAPI events
const metaEventSchema = z.object({
  eventName: z.string().min(1).max(100),
  eventParams: z.record(z.any()).optional().default({}),
  eventId: z.string().min(1).max(200),
  visitorId: z.string().max(200).optional(),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(200).optional(),
  eventSourceUrl: z.string().url().max(2000),
  utmData: z.object({
    utm_source: z.string().max(100).optional(),
    utm_medium: z.string().max(100).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_id: z.string().max(100).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    placement: z.string().max(200).optional(),
  }).optional().default({}),
  deviceInfo: z.object({
    userAgent: z.string().max(500).optional(),
  }).optional().default({}),
  userData: z.object({
    email: z.string().email().max(255).optional(),
    phone: z.string().max(50).optional(),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    zipCode: z.string().max(20).optional(),
    age: z.union([z.string(), z.number()]).optional(),
  }).optional().default({}),
});

/**
 * Gera hash SHA256 para dados pessoais usando Web Crypto API
 */
async function hashSHA256(text: string | undefined | null): Promise<string> {
  if (!text || text.trim() === '') return '';
  const normalized = text.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Normaliza utm_source seguindo as regras de negócio
 */
function normalizeUtmSource(source: string | undefined | null): string {
  if (!source) return 'not_provided';
  const normalized = source.toLowerCase().trim();
  if (['fb', 'facebook', 'meta'].includes(normalized)) {
    return 'facebook_ads';
  }
  return source;
}

/**
 * Detecta dispositivo baseado no User-Agent
 */
function detectDevice(userAgent: string): string {
  if (!userAgent) return 'not_provided';
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  return 'desktop';
}

interface GeoData {
  region: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

/**
 * Obtém geolocalização via ipapi.co com fallback para ipwho.is
 * Mesma lógica robusta da Edge Function /geo
 */
async function fetchGeoFromIP(ip: string): Promise<GeoData> {
  const defaultGeo: GeoData = {
    region: 'not_provided',
    city: 'not_provided',
    country: 'not_provided',
    latitude: null,
    longitude: null,
  };

  if (!ip || ip === 'not_provided') return defaultGeo;
  
  // Tentativa 1: ipapi.co
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'Metodo8X-CAPI/1.0' }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (!data.error) {
        return {
          region: data.region || 'not_provided',
          city: data.city || 'not_provided',
          country: data.country_name || 'not_provided',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        };
      }
    }
    console.warn('Meta CAPI - ipapi.co falhou, tentando ipwho.is...');
  } catch (error) {
    console.warn('Meta CAPI - Erro ipapi.co:', error instanceof Error ? error.message : 'unknown');
  }

  // Tentativa 2: ipwho.is (fallback)
  try {
    const response = await fetch(`https://ipwho.is/${ip}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.success !== false) {
        return {
          region: data.region || 'not_provided',
          city: data.city || 'not_provided',
          country: data.country || 'not_provided',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        };
      }
    }
    console.warn('Meta CAPI - ipwho.is também falhou');
  } catch (error) {
    console.error('Meta CAPI - Erro ipwho.is:', error instanceof Error ? error.message : 'unknown');
  }

  return defaultGeo;
}

/**
 * Formata região para string legível (compatibilidade)
 */
function formatRegionString(geo: GeoData): string {
  const parts = [geo.city, geo.region, geo.country].filter(p => p && p !== 'not_provided');
  return parts.length > 0 ? parts.join(', ') : 'not_provided';
}

/**
 * Envia evento para a Meta Conversions API com retry automático
 */
async function sendToMetaCAPI(
  eventData: any,
  maxRetries = 3
): Promise<{ success: boolean; result?: any; error?: string }> {
  let lastError: string = '';

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Meta CAPI - Tentativa ${attempt}/${maxRetries} de envio`);

      const requestBody: any = {
        data: [eventData],
        access_token: META_ACCESS_TOKEN,
      };

      if (META_TEST_EVENT_CODE) {
        requestBody.test_event_code = META_TEST_EVENT_CODE;
        console.log('Meta CAPI - Modo de teste ativo:', META_TEST_EVENT_CODE);
      }

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log('Meta CAPI - Evento enviado com sucesso:', {
          attempt,
          events_received: result.events_received,
          fbtrace_id: result.fbtrace_id,
        });
        return { success: true, result };
      }

      lastError = `Status ${response.status}: ${JSON.stringify(result)}`;
      console.error(`Meta CAPI - Erro na tentativa ${attempt}:`, lastError);

      // Se não for erro 5xx, não tenta novamente
      if (response.status < 500) {
        break;
      }

      // Aguarda antes de tentar novamente (backoff exponencial)
      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error(`Meta CAPI - Exceção na tentativa ${attempt}:`, lastError);

      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  return { success: false, error: lastError };
}

/**
 * Edge Function principal para processar eventos de conversão
 * 
 * Implementa fluxo server-side robusto com:
 * - Rate limiting (60 req/min por IP)
 * - Coleta completa de dados (UTMs, device, região, etc.)
 * - Normalização automática de campos
 * - Hash SHA256 para dados pessoais
 * - Deduplicação via event_id
 * - Retry automático em caso de falha
 * - Fallbacks com "not_provided"
 */
serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Extrair IP do cliente para rate limiting
  const clientIpHeader = req.headers.get("x-forwarded-for") || 
                         req.headers.get("x-real-ip") || 
                         req.headers.get("cf-connecting-ip") || 
                         "unknown";
  const rateLimitIp = clientIpHeader.split(",")[0].trim();

  // Verificar rate limit ANTES de processar
  if (!checkRateLimit(rateLimitIp)) {
    console.warn(`Meta CAPI - Rate limit exceeded for IP: ${rateLimitIp}`);
    return new Response(
      JSON.stringify({ error: "Too many requests" }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    console.log('Meta CAPI - Processando novo evento');

    // Validate shared secret for authentication
    const authSecret = req.headers.get('x-meta-capi-secret');
    if (!META_CAPI_SECRET) {
      console.error('Meta CAPI - META_CAPI_SECRET não configurado');
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!authSecret || authSecret !== META_CAPI_SECRET) {
      console.warn('Meta CAPI - Autenticação inválida ou ausente');
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Origin validation as secondary check
    const origin = req.headers.get('origin') || '';
    const referer = req.headers.get('referer') || '';
    
    const originAllowed = isAllowedOrigin(origin) || isAllowedOrigin(referer);
    
    // Log origin for monitoring (but secret validation is primary auth)
    if (origin && !originAllowed) {
      console.warn('Meta CAPI - Origin não na allowlist, mas secret válido:', origin);
    }

    // Validação de configuração
    if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
      console.error('Meta CAPI - Configuração inválida');
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate incoming data with zod schema
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      console.error('Meta CAPI - Body JSON inválido');
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const parseResult = metaEventSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error('Meta CAPI - Validação falhou:', parseResult.error.format());
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const {
      eventName,
      eventParams,
      eventId,
      visitorId,
      fbp,
      fbc,
      eventSourceUrl,
      utmData,
      deviceInfo,
      userData,
    } = parseResult.data;

    // Log com dados mascarados
    console.log('Meta CAPI - Dados validados:', {
      eventName,
      eventId,
      origin: origin || 'não fornecido',
      hasUtmData: Object.keys(utmData).length > 0,
      hasDeviceInfo: Object.keys(deviceInfo).length > 0,
      hasUserData: Object.keys(userData).length > 0,
      email: maskEmail(userData.email),
      phone: maskPhone(userData.phone),
    });

    // Coleta informações do request
    const userAgent = req.headers.get('user-agent') || deviceInfo.userAgent || 'not_provided';
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'not_provided';

    // 1. NORMALIZAÇÃO DE DADOS
    const normalizedUtmSource = normalizeUtmSource(utmData.utm_source);
    const normalizedUtmMedium = utmData.utm_medium || 'not_provided';
    const normalizedUtmCampaign = utmData.utm_campaign || 'not_provided';
    const normalizedUtmId = utmData.utm_id || 'not_provided';
    const normalizedUtmContent = utmData.utm_content || 'not_provided';
    const normalizedUtmTerm = utmData.utm_term || 'not_provided';

    // Posicionamento (placement)
    const posicionamento = utmData.utm_content || utmData.placement || 'not_provided';

    // Dispositivo
    const aparelho = detectDevice(userAgent);

    // Geolocalização via ipapi.co/ipwho.is (com fallback robusto)
    const geoData = await fetchGeoFromIP(clientIp);
    const regiao = formatRegionString(geoData);

    // 2. HASH DE DADOS PESSOAIS (SHA256)
    const hashedUserData: any = {
      client_ip_address: clientIp !== 'not_provided' ? clientIp : undefined,
      client_user_agent: userAgent !== 'not_provided' ? userAgent : undefined,
    };

    // Adiciona fbp/fbc para deduplicação
    if (fbp) hashedUserData.fbp = fbp;
    if (fbc) hashedUserData.fbc = fbc;

    // Hash de dados pessoais se fornecidos (aguarda todas as promises)
    if (userData.email) {
      hashedUserData.em = await hashSHA256(userData.email);
    }
    if (userData.phone) {
      hashedUserData.ph = await hashSHA256(userData.phone);
    }
    if (userData.firstName) {
      hashedUserData.fn = await hashSHA256(userData.firstName);
    }
    if (userData.lastName) {
      hashedUserData.ln = await hashSHA256(userData.lastName);
    }
    if (userData.city) {
      hashedUserData.ct = await hashSHA256(userData.city);
    }
    if (userData.state) {
      hashedUserData.st = await hashSHA256(userData.state);
    }
    if (userData.country) {
      hashedUserData.country = await hashSHA256(userData.country);
    }
    if (userData.zipCode) {
      hashedUserData.zp = await hashSHA256(userData.zipCode);
    }

    // 3. MONTA CUSTOM DATA com todos os parâmetros adicionais
    const customData: any = {
      ...eventParams,
      visitor_id: visitorId || 'not_provided',
      origem_compra: normalizedUtmSource,
      posicionamento: posicionamento,
      aparelho: aparelho,
      regiao: regiao,
      idade: userData.age || 'not_provided',
      utm_source: normalizedUtmSource,
      utm_medium: normalizedUtmMedium,
      utm_campaign: normalizedUtmCampaign,
      utm_id: normalizedUtmId,
      utm_content: normalizedUtmContent,
      utm_term: normalizedUtmTerm,
    };

    // Para eventos Purchase, garantir que transaction_id, value e currency estão presentes
    if (eventName === 'Purchase') {
      if (!customData.transaction_id) {
        customData.transaction_id = eventId; // Usa eventId como fallback
      }
      if (!customData.value) {
        customData.value = 0;
      }
      if (!customData.currency) {
        customData.currency = 'BRL';
      }
    }

    // 4. MONTA PAYLOAD FINAL para Meta CAPI
    const eventTime = Math.floor(Date.now() / 1000);
    const metaEventData = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId, // Garantia de deduplicação
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: hashedUserData,
      custom_data: customData,
    };

    console.log('Meta CAPI - Payload normalizado:', {
      event_name: eventName,
      event_id: eventId,
      origem_compra: customData.origem_compra,
      posicionamento: customData.posicionamento,
      aparelho: customData.aparelho,
      transaction_id: customData.transaction_id,
    });

    // 5. ENVIA PARA META CAPI com retry automático
    const metaResult = await sendToMetaCAPI(metaEventData);

    if (!metaResult.success) {
      console.error('Meta CAPI - Falha após todas as tentativas:', metaResult.error);
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 6. RESPOSTA DE SUCESSO (sem dados internos detalhados)
    return new Response(
      JSON.stringify({
        success: true,
        eventName,
        eventId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Meta CAPI - Erro crítico:', error);
    return new Response(
      JSON.stringify({ error: "Bad request" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
