import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_TEST_EVENT_CODE = Deno.env.get('META_TEST_EVENT_CODE');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
 * Extrai região aproximada do IP (simplificado - pode ser melhorado com API de geolocalização)
 */
function detectRegion(ip: string): string {
  // Implementação simplificada - pode ser expandida com API de geolocalização
  return 'not_provided';
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
 * - Coleta completa de dados (UTMs, device, região, etc.)
 * - Normalização automática de campos
 * - Hash SHA256 para dados pessoais
 * - Deduplicação via event_id
 * - Retry automático em caso de falha
 * - Fallbacks com "not_provided"
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Meta CAPI - Processando novo evento');

    // Validação de configuração
    if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
      console.error('Meta CAPI - Configuração inválida');
      return new Response(
        JSON.stringify({ error: 'Configuração do Meta Pixel incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse dos dados recebidos
    const body = await req.json();
    const {
      eventName,
      eventParams = {},
      eventId,
      fbp,
      fbc,
      eventSourceUrl,
      utmData = {},
      deviceInfo = {},
      userData = {},
    } = body;

    console.log('Meta CAPI - Dados brutos recebidos:', {
      eventName,
      eventId,
      hasUtmData: Object.keys(utmData).length > 0,
      hasDeviceInfo: Object.keys(deviceInfo).length > 0,
      hasUserData: Object.keys(userData).length > 0,
    });

    // Validação obrigatória
    if (!eventName || !eventId || !eventSourceUrl) {
      return new Response(
        JSON.stringify({ error: 'eventName, eventId e eventSourceUrl são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Coleta informações do request
    const userAgent = req.headers.get('user-agent') || deviceInfo.userAgent || 'not_provided';
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'not_provided';

    // 1. NORMALIZAÇÃO DE DADOS
    const normalizedUtmSource = normalizeUtmSource(utmData.utm_source);
    const normalizedUtmMedium = utmData.utm_medium || 'not_provided';
    const normalizedUtmCampaign = utmData.utm_campaign || 'not_provided';
    const normalizedUtmContent = utmData.utm_content || 'not_provided';
    const normalizedUtmTerm = utmData.utm_term || 'not_provided';

    // Posicionamento (placement)
    const posicionamento = utmData.utm_content || utmData.placement || 'not_provided';

    // Dispositivo
    const aparelho = detectDevice(userAgent);

    // Região
    const regiao = detectRegion(clientIp);

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
      origem_compra: normalizedUtmSource,
      posicionamento: posicionamento,
      aparelho: aparelho,
      regiao: regiao,
      idade: userData.age || 'not_provided',
      utm_source: normalizedUtmSource,
      utm_medium: normalizedUtmMedium,
      utm_campaign: normalizedUtmCampaign,
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
        JSON.stringify({
          error: 'Falha ao enviar para Meta CAPI após múltiplas tentativas',
          details: metaResult.error,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 6. RESPOSTA DE SUCESSO
    return new Response(
      JSON.stringify({
        success: true,
        eventName,
        eventId,
        metaCAPI: metaResult.result,
        normalizedData: {
          origem_compra: customData.origem_compra,
          posicionamento: customData.posicionamento,
          aparelho: customData.aparelho,
          regiao: customData.regiao,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Meta CAPI - Erro crítico:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({
        error: 'Erro interno do servidor',
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
