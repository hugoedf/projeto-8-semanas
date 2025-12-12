import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.85.0';
import { z } from 'https://esm.sh/zod@3.25.76';

const HOTMART_SECRET_KEY = Deno.env.get('HOTMART_SECRET_KEY');
const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hotmart-hottok',
};

// Hotmart webhook payload schema for validation
const hotmartPriceSchema = z.object({
  value: z.number().optional(),
  currency_code: z.string().max(10).optional(),
}).optional();

const hotmartAddressSchema = z.object({
  city: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  zip_code: z.string().max(20).optional(),
}).optional();

const hotmartBuyerSchema = z.object({
  email: z.string().email().max(255).optional(),
  name: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  address: hotmartAddressSchema,
}).optional();

const hotmartPurchaseSchema = z.object({
  transaction: z.string().max(100).optional(),
  tracking_id: z.string().max(100).optional(),
  price: hotmartPriceSchema,
  product: z.object({
    name: z.string().max(500).optional(),
  }).optional(),
}).optional();

const hotmartWebhookSchema = z.object({
  event: z.string().max(100),
  data: z.object({
    buyer: hotmartBuyerSchema,
    purchase: hotmartPurchaseSchema,
  }).optional(),
});

/**
 * Valida a assinatura HMAC da Hotmart
 */
async function validateHotmartSignature(body: string, signature: string): Promise<boolean> {
  if (!HOTMART_SECRET_KEY) {
    console.error('HOTMART_SECRET_KEY não configurado');
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(HOTMART_SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(body)
    );

    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return expectedSignature === signature;
  } catch (error) {
    console.error('Erro ao validar assinatura:', error);
    return false;
  }
}

/**
 * Hash SHA256 para dados pessoais
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
 * Envia evento Purchase para Meta CAPI
 */
async function sendPurchaseToMetaCAPI(eventData: any): Promise<boolean> {
  if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
    console.error('Meta CAPI não configurado');
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [eventData],
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();
    
    if (response.ok) {
      console.log('Purchase enviado para Meta CAPI:', result);
      return true;
    } else {
      console.error('Erro ao enviar para Meta CAPI:', result);
      return false;
    }
  } catch (error) {
    console.error('Exceção ao enviar para Meta CAPI:', error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Hotmart Webhook - Recebendo evento');

    // Ler corpo da requisição
    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    // Validar configuração do servidor
    if (!HOTMART_SECRET_KEY) {
      console.error('HOTMART_SECRET_KEY não configurado');
      return new Response(
        JSON.stringify({ error: 'Server misconfigured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validar token - SEMPRE rejeitar requisições sem token válido
    const signature = req.headers.get('x-hotmart-hottok');
    if (!signature) {
      console.error('❌ Token x-hotmart-hottok ausente - rejeitando requisição');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isValid = await validateHotmartSignature(bodyText, signature);
    if (!isValid) {
      console.error('❌ Assinatura inválida - rejeitando requisição');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('✅ Token válido');

    // Validate incoming payload with zod schema
    const parseResult = hotmartWebhookSchema.safeParse(body);
    
    if (!parseResult.success) {
      console.error('Validação do payload falhou:', parseResult.error.format());
      return new Response(
        JSON.stringify({ error: 'Payload inválido', details: parseResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validatedBody = parseResult.data;

    console.log('Evento Hotmart validado:', {
      event: validatedBody.event,
      transaction_id: validatedBody.data?.purchase?.transaction,
    });

    // Processar apenas eventos de compra
    if (validatedBody.event !== 'PURCHASE_COMPLETE') {
      console.log('Evento ignorado - não é PURCHASE_COMPLETE');
      return new Response(
        JSON.stringify({ message: 'Evento não processado' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extrair tracking_id (visitorId)
    const trackingId = validatedBody.data?.purchase?.tracking_id || 'not_provided';
    console.log('Tracking ID:', trackingId);

    // Buscar dados do visitante no banco de dados
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    const { data: visitorData, error: visitorError } = await supabase
      .from('visitor_tracking')
      .select('*')
      .eq('visitor_id', trackingId)
      .single();

    if (visitorError || !visitorData) {
      console.error('Erro ao buscar dados do visitante:', visitorError);
      // Continua o processamento mesmo sem dados do visitante
    } else {
      console.log('Dados do visitante recuperados:', visitorData);
    }

    // Extrair dados da compra (using validated data)
    const purchase = validatedBody.data?.purchase;
    const buyer = validatedBody.data?.buyer;

    // Montar dados do evento Purchase para Meta CAPI
    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = `${trackingId}-purchase-${purchase?.transaction || Date.now()}`;

    // Hash de dados pessoais
    const hashedUserData: any = {
      em: buyer?.email ? await hashSHA256(buyer.email) : undefined,
      ph: buyer?.phone ? await hashSHA256(buyer.phone) : undefined,
      fn: buyer?.name?.split(' ')[0] ? await hashSHA256(buyer.name.split(' ')[0]) : undefined,
      ln: buyer?.name?.split(' ').slice(1).join(' ') ? await hashSHA256(buyer.name.split(' ').slice(1).join(' ')) : undefined,
      ct: buyer?.address?.city ? await hashSHA256(buyer.address.city) : undefined,
      st: buyer?.address?.state ? await hashSHA256(buyer.address.state) : undefined,
      country: buyer?.address?.country ? await hashSHA256(buyer.address.country) : undefined,
      zp: buyer?.address?.zip_code ? await hashSHA256(buyer.address.zip_code) : undefined,
    };

    // Custom data com informações da compra + dados do visitante
    const customData: any = {
      value: purchase?.price?.value || 0,
      currency: purchase?.price?.currency_code || 'BRL',
      transaction_id: purchase?.transaction || eventId,
      content_name: purchase?.product?.name || 'Método 8X',
      origem_compra: visitorData?.utm_source || 'not_provided',
      posicionamento: visitorData?.utm_content || 'not_provided',
      aparelho: visitorData?.device || 'not_provided',
      regiao: visitorData?.region || 'not_provided',
      utm_source: visitorData?.utm_source || 'not_provided',
      utm_medium: visitorData?.utm_medium || 'not_provided',
      utm_campaign: visitorData?.utm_campaign || 'not_provided',
      utm_id: visitorData?.utm_id || 'not_provided',
      utm_content: visitorData?.utm_content || 'not_provided',
      utm_term: visitorData?.utm_term || 'not_provided',
    };

    const metaEventData = {
      event_name: 'Purchase',
      event_time: eventTime,
      event_id: eventId,
      event_source_url: visitorData?.landing_page || 'https://lovable.dev',
      action_source: 'website',
      user_data: hashedUserData,
      custom_data: customData,
    };

    // Enviar para Meta CAPI
    await sendPurchaseToMetaCAPI(metaEventData);

    console.log('Webhook processado com sucesso');

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
