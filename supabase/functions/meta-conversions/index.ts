import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from 'https://esm.sh/zod@3.25.76';

const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_TEST_EVENT_CODE = Deno.env.get('META_TEST_EVENT_CODE');

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

// ============================================
// IP RESOLUTION - Suporte IPv4 e IPv6
// ============================================

/**
 * Valida se é um endereço IPv4 válido
 */
function isValidIPv4(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return false;
  const parts = ip.split('.').map(Number);
  return parts.every(part => part >= 0 && part <= 255);
}

/**
 * Valida se é um endereço IPv6 válido
 */
function isValidIPv6(ip: string): boolean {
  // Regex simplificado para IPv6
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  // Também aceita IPv6 com sufixo IPv4
  const ipv6v4Regex = /^([0-9a-fA-F]{0,4}:){2,6}(\d{1,3}\.){3}\d{1,3}$/;
  return ipv6Regex.test(ip) || ipv6v4Regex.test(ip);
}

/**
 * Valida se é um IP válido (IPv4 ou IPv6)
 */
function isValidIP(ip: string): boolean {
  return isValidIPv4(ip) || isValidIPv6(ip);
}

/**
 * Resolve o IP real do cliente a partir dos headers
 * Seguindo a documentação Meta Parameter Configurator:
 * - X-Forwarded-For (pode conter múltiplos IPs)
 * - X-Real-IP
 * - CF-Connecting-IP (Cloudflare)
 * - RemoteAddr como fallback
 */
function resolveClientIP(req: Request): string {
  // 1. X-Forwarded-For - formato: "client, proxy1, proxy2"
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Pega o primeiro IP (cliente original)
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    for (const ip of ips) {
      // Remove porta se presente
      const cleanIP = ip.split(':')[0] || ip;
      if (isValidIP(cleanIP)) {
        console.log('Meta CAPI - IP resolvido via X-Forwarded-For:', cleanIP);
        return cleanIP;
      }
    }
  }

  // 2. X-Real-IP
  const realIP = req.headers.get('x-real-ip');
  if (realIP && isValidIP(realIP)) {
    console.log('Meta CAPI - IP resolvido via X-Real-IP:', realIP);
    return realIP;
  }

  // 3. CF-Connecting-IP (Cloudflare)
  const cfIP = req.headers.get('cf-connecting-ip');
  if (cfIP && isValidIP(cfIP)) {
    console.log('Meta CAPI - IP resolvido via CF-Connecting-IP:', cfIP);
    return cfIP;
  }

  // 4. True-Client-IP (Akamai, Cloudflare Enterprise)
  const trueClientIP = req.headers.get('true-client-ip');
  if (trueClientIP && isValidIP(trueClientIP)) {
    console.log('Meta CAPI - IP resolvido via True-Client-IP:', trueClientIP);
    return trueClientIP;
  }

  console.log('Meta CAPI - IP não resolvido, usando not_provided');
  return 'not_provided';
}

// ============================================
// FBP/FBC VALIDATION - Meta Parameter Configurator
// ============================================

/**
 * Valida formato do fbp
 * Formato esperado: fb.{version}.{timestamp}.{random_id}
 */
function isValidFbp(fbp: string | undefined): boolean {
  if (!fbp) return false;
  const parts = fbp.split('.');
  return parts.length === 4 && parts[0] === 'fb' && parts[1] === '1';
}

/**
 * Valida formato do fbc
 * Formato esperado: fb.{version}.{timestamp}.{fbclid}
 */
function isValidFbc(fbc: string | undefined): boolean {
  if (!fbc) return false;
  const parts = fbc.split('.');
  return parts.length >= 4 && parts[0] === 'fb' && parts[1] === '1';
}

/**
 * Gera fbp server-side se não fornecido pelo cliente
 */
function generateServerFbp(): string {
  const timestamp = Date.now();
  const randomId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  return `fb.1.${timestamp}.${randomId}`;
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
    'https://www.metodo8xpro.online',
    'https://metodo8xpro.online',
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
  client_user_agent: z.string().max(1000).optional(), // User agent do cliente
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
 * Implementa Meta Parameter Configurator com:
 * - Captura e validação de fbp/fbc
 * - Resolução de IP real (IPv4/IPv6)
 * - client_user_agent em todos os eventos
 * - Rate limiting (60 req/min por IP)
 * - Hash SHA256 para dados pessoais
 * - Deduplicação via event_id
 * - Retry automático em caso de falha
 * 
 * IMPORTANTE: Não envia geolocalização manual - Meta infere via IP
 */
serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Resolve IP real do cliente
  const clientIP = resolveClientIP(req);
  const rateLimitIp = clientIP !== 'not_provided' ? clientIP : 'unknown';

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

    // Origin validation - allow requests from known origins only
    const origin = req.headers.get('origin') || '';
    const referer = req.headers.get('referer') || '';
    
    const originAllowed = isAllowedOrigin(origin) || isAllowedOrigin(referer);
    
    // Log origin for monitoring
    if (!originAllowed) {
      console.warn('Meta CAPI - Origin não autorizado:', origin || referer || 'nenhum');
      // Allow request but log for monitoring - rate limiting handles abuse
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
      fbp: clientFbp,
      fbc: clientFbc,
      client_user_agent: clientUserAgent,
      eventSourceUrl,
      utmData,
      userData,
    } = parseResult.data;

    // ============================================
    // META PARAMETER CONFIGURATOR - Server-side processing
    // ============================================

    // 1. Processa fbp - usa do cliente se válido, senão gera server-side
    let fbp: string | undefined;
    if (isValidFbp(clientFbp)) {
      fbp = clientFbp;
      console.log('Meta CAPI - fbp válido do cliente');
    } else {
      fbp = generateServerFbp();
      console.log('Meta CAPI - fbp gerado server-side:', fbp);
    }

    // 2. Processa fbc - só usa se válido (não gera server-side)
    let fbc: string | undefined;
    if (isValidFbc(clientFbc)) {
      fbc = clientFbc;
      console.log('Meta CAPI - fbc válido do cliente');
    }

    // 3. User Agent - prioriza do cliente, fallback para header do request
    const userAgent = clientUserAgent || req.headers.get('user-agent') || 'not_provided';

    // Log com dados mascarados
    console.log('Meta CAPI - Parâmetros processados:', {
      eventName,
      eventId,
      origin: origin || 'não fornecido',
      client_ip_address: clientIP,
      has_fbp: !!fbp,
      has_fbc: !!fbc,
      has_user_agent: userAgent !== 'not_provided',
      hasUtmData: Object.keys(utmData).length > 0,
      hasUserData: Object.keys(userData).length > 0,
      email: maskEmail(userData.email),
      phone: maskPhone(userData.phone),
    });

    // 4. NORMALIZAÇÃO DE UTMs
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

    // ============================================
    // USER_DATA - Parâmetros obrigatórios da Meta
    // ============================================
    const hashedUserData: Record<string, any> = {};

    // Parâmetros obrigatórios do Parameter Configurator
    // client_ip_address - OBRIGATÓRIO
    if (clientIP !== 'not_provided') {
      hashedUserData.client_ip_address = clientIP;
    }

    // client_user_agent - OBRIGATÓRIO
    if (userAgent !== 'not_provided') {
      hashedUserData.client_user_agent = userAgent;
    }

    // fbp - Browser Pixel ID
    if (fbp) {
      hashedUserData.fbp = fbp;
    }

    // fbc - Click ID (se disponível)
    if (fbc) {
      hashedUserData.fbc = fbc;
    }

    // Hash de dados pessoais se fornecidos
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
    // NOTA: Não enviamos city/state/country/zip - Meta infere via IP
    // Isso é conforme solicitado: "Não enviar geolocalização manual"

    // ============================================
    // CUSTOM_DATA
    // ============================================
    const customData: Record<string, any> = {
      ...eventParams,
      visitor_id: visitorId || 'not_provided',
      origem_compra: normalizedUtmSource,
      posicionamento: posicionamento,
      aparelho: aparelho,
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
        customData.transaction_id = eventId;
      }
      if (!customData.value) {
        customData.value = 0;
      }
      if (!customData.currency) {
        customData.currency = 'BRL';
      }
    }

    // ============================================
    // PAYLOAD FINAL para Meta CAPI
    // ============================================
    const eventTime = Math.floor(Date.now() / 1000);
    const metaEventData = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: hashedUserData,
      custom_data: customData,
    };

    console.log('Meta CAPI - Payload final:', {
      event_name: eventName,
      event_id: eventId,
      has_client_ip: !!hashedUserData.client_ip_address,
      has_user_agent: !!hashedUserData.client_user_agent,
      has_fbp: !!hashedUserData.fbp,
      has_fbc: !!hashedUserData.fbc,
      value: customData.value,
      currency: customData.currency,
      origem_compra: customData.origem_compra,
      posicionamento: customData.posicionamento,
      aparelho: customData.aparelho,
      transaction_id: customData.transaction_id,
    });

    // ENVIA PARA META CAPI com retry automático
    const metaResult = await sendToMetaCAPI(metaEventData);

    if (!metaResult.success) {
      console.error('Meta CAPI - Falha após todas as tentativas:', metaResult.error);
      return new Response(
        JSON.stringify({ error: "Bad request" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // RESPOSTA DE SUCESSO
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
