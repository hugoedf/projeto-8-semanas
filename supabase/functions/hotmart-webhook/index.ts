import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.85.0';
import { z } from 'https://esm.sh/zod@3.25.76';

// ============================================
// CONFIGURAÇÃO DE AMBIENTE
// ============================================
const HOTMART_SECRET_KEY = Deno.env.get('HOTMART_SECRET_KEY');
const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_TEST_EVENT_CODE = Deno.env.get('META_TEST_EVENT_CODE');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hotmart-hottok',
};

// ============================================
// MAPEAMENTO DE EVENTOS HOTMART -> META
// ============================================
const HOTMART_TO_META_EVENT: Record<string, string> = {
  'PURCHASE_COMPLETE': 'Purchase',
  'PURCHASE_APPROVED': 'Purchase',
  'PURCHASE_BILLET_PRINTED': 'InitiateCheckout',
  'PURCHASE_CANCELED': 'CustomEvent',
  'PURCHASE_CHARGEBACK': 'CustomEvent',
  'PURCHASE_DELAYED': 'CustomEvent',
  'PURCHASE_EXPIRED': 'CustomEvent',
  'PURCHASE_PROTEST': 'CustomEvent',
  'PURCHASE_REFUNDED': 'CustomEvent',
  'PURCHASE_OUT_OF_SHOPPING_CART': 'AddToCart',
};

// Eventos que devem disparar notificação de compra
const PURCHASE_EVENTS = ['PURCHASE_COMPLETE', 'PURCHASE_APPROVED'];

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================
function maskEmail(email: string | undefined | null): string {
  if (!email) return "hidden";
  const parts = email.split("@");
  if (parts.length !== 2) return "hidden";
  return parts[0][0] + "***@" + parts[1];
}

function validateHotmartToken(receivedToken: string): boolean {
  if (!HOTMART_SECRET_KEY) {
    console.error('❌ HOTMART_SECRET_KEY não configurado');
    return false;
  }
  return receivedToken === HOTMART_SECRET_KEY;
}

async function hashSHA256(text: string | undefined | null): Promise<string> {
  if (!text || text.trim() === '') return '';
  const normalized = text.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// SCHEMAS DE VALIDAÇÃO
// ============================================
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

// ============================================
// FUNÇÕES DE INTEGRAÇÃO
// ============================================

/**
 * Registra evento no banco meta_events
 */
async function saveEventToDatabase(
  supabase: any,
  eventData: {
    event_name: string;
    event_id: string;
    visitor_id: string | null;
    value: number | null;
    currency: string | null;
    device: string | null;
    country: string | null;
    city: string | null;
    region: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    publisher_platform: string | null;
    placement: string | null;
    page_url: string | null;
  }
): Promise<boolean> {
  try {
    const { error } = await supabase.from('meta_events').insert({
      event_name: eventData.event_name,
      event_id: eventData.event_id,
      visitor_id: eventData.visitor_id,
      value: eventData.value,
      currency: eventData.currency,
      device: eventData.device,
      country: eventData.country,
      city: eventData.city,
      region: eventData.region,
      utm_source: eventData.utm_source,
      utm_medium: eventData.utm_medium,
      utm_campaign: eventData.utm_campaign,
      publisher_platform: eventData.publisher_platform,
      placement: eventData.placement,
      page_url: eventData.page_url,
      event_time: new Date().toISOString(),
    });

    if (error) {
      console.error('❌ Erro ao salvar evento no banco:', error.message);
      return false;
    }

    console.log('✅ Evento salvo no banco:', eventData.event_name);
    return true;
  } catch (error) {
    console.error('❌ Exceção ao salvar no banco:', error instanceof Error ? error.message : 'unknown');
    return false;
  }
}

/**
 * Envia evento para Meta CAPI
 */
async function sendToMetaCAPI(eventData: any): Promise<boolean> {
  if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
    console.error('❌ Meta CAPI não configurado (falta META_ACCESS_TOKEN ou META_PIXEL_ID)');
    return false;
  }

  try {
    const payload: any = {
      data: [eventData],
      access_token: META_ACCESS_TOKEN,
    };

    // Adicionar test_event_code se configurado
    if (META_TEST_EVENT_CODE) {
      payload.test_event_code = META_TEST_EVENT_CODE;
      console.log('📧 Meta CAPI - Modo de teste ativo:', META_TEST_EVENT_CODE);
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Evento enviado para Meta CAPI:', {
        event_name: eventData.event_name,
        events_received: result.events_received,
        fbtrace_id: result.fbtrace_id,
      });
      return true;
    } else {
      console.error('❌ Erro Meta CAPI - status:', response.status, 'response:', JSON.stringify(result));
      return false;
    }
  } catch (error) {
    console.error('❌ Exceção ao enviar para Meta CAPI:', error instanceof Error ? error.message : 'unknown');
    return false;
  }
}

/**
 * Processa evento de compra (Purchase)
 */
async function processPurchaseEvent(
  supabase: any,
  validatedBody: z.infer<typeof hotmartWebhookSchema>,
  visitorData: any | null
): Promise<{ success: boolean; metaSent: boolean; dbSaved: boolean }> {
  const purchase = validatedBody.data?.purchase;
  const buyer = validatedBody.data?.buyer;
  
  const trackingId = purchase?.tracking_id || null;
  const transactionId = purchase?.transaction || `hotmart-${Date.now()}`;
  const eventId = `${trackingId || 'no-tracking'}-purchase-${transactionId}`;
  const eventTime = Math.floor(Date.now() / 1000);

  // Valor da compra
  const purchaseValue = purchase?.price?.value || 0;
  const currency = purchase?.price?.currency_code || 'BRL';

  console.log('💰 Processando Purchase:', {
    transaction_id: transactionId,
    value: purchaseValue,
    currency: currency,
    buyer_email: maskEmail(buyer?.email),
    product: purchase?.product?.name,
  });

  // 1. Salvar no banco meta_events
  const dbSaved = await saveEventToDatabase(supabase, {
    event_name: 'Purchase',
    event_id: eventId,
    visitor_id: trackingId,
    value: purchaseValue,
    currency: currency,
    device: visitorData?.device || null,
    country: buyer?.address?.country || null,
    city: buyer?.address?.city || null,
    region: buyer?.address?.state || visitorData?.region || null,
    utm_source: visitorData?.utm_source || null,
    utm_medium: visitorData?.utm_medium || null,
    utm_campaign: visitorData?.utm_campaign || null,
    publisher_platform: 'hotmart',
    placement: visitorData?.utm_content || null,
    page_url: visitorData?.landing_page || null,
  });

  // 2. Hash de dados pessoais para Meta CAPI
  const hashedUserData: any = {};
  
  if (buyer?.email) hashedUserData.em = await hashSHA256(buyer.email);
  if (buyer?.phone) hashedUserData.ph = await hashSHA256(buyer.phone);
  if (buyer?.name) {
    const nameParts = buyer.name.split(' ');
    hashedUserData.fn = await hashSHA256(nameParts[0]);
    if (nameParts.length > 1) {
      hashedUserData.ln = await hashSHA256(nameParts.slice(1).join(' '));
    }
  }
  if (buyer?.address?.city) hashedUserData.ct = await hashSHA256(buyer.address.city);
  if (buyer?.address?.state) hashedUserData.st = await hashSHA256(buyer.address.state);
  if (buyer?.address?.country) hashedUserData.country = await hashSHA256(buyer.address.country);
  if (buyer?.address?.zip_code) hashedUserData.zp = await hashSHA256(buyer.address.zip_code);

  // 3. Montar payload para Meta CAPI
  const metaEventData = {
    event_name: 'Purchase',
    event_time: eventTime,
    event_id: eventId,
    event_source_url: visitorData?.landing_page || 'https://metodo8x.com',
    action_source: 'website',
    user_data: hashedUserData,
    custom_data: {
      value: purchaseValue,
      currency: currency,
      transaction_id: transactionId,
      content_name: purchase?.product?.name || 'Método 8X',
      content_type: 'product',
      origem_compra: visitorData?.utm_source || 'hotmart_direct',
      posicionamento: visitorData?.utm_content || 'not_provided',
      aparelho: visitorData?.device || 'not_provided',
      regiao: visitorData?.region || 'not_provided',
    },
  };

  // 4. Enviar para Meta CAPI
  const metaSent = await sendToMetaCAPI(metaEventData);

  // 5. Log de confirmação da compra
  console.log('🎉 ========================================');
  console.log('🎉 COMPRA REGISTRADA COM SUCESSO!');
  console.log('🎉 ----------------------------------------');
  console.log('🎉 Transaction ID:', transactionId);
  console.log('🎉 Valor:', `${currency} ${purchaseValue}`);
  console.log('🎉 Produto:', purchase?.product?.name || 'Método 8X');
  console.log('🎉 Comprador:', maskEmail(buyer?.email));
  console.log('🎉 Banco salvo:', dbSaved ? '✅' : '❌');
  console.log('🎉 Meta CAPI:', metaSent ? '✅' : '❌');
  console.log('🎉 ========================================');

  return { success: true, metaSent, dbSaved };
}

/**
 * Processa outros eventos (não-purchase)
 */
async function processOtherEvent(
  supabase: any,
  validatedBody: z.infer<typeof hotmartWebhookSchema>,
  visitorData: any | null
): Promise<{ success: boolean; dbSaved: boolean }> {
  const hotmartEvent = validatedBody.event;
  const metaEventName = HOTMART_TO_META_EVENT[hotmartEvent] || 'CustomEvent';
  const purchase = validatedBody.data?.purchase;
  
  const trackingId = purchase?.tracking_id || null;
  const eventId = `${trackingId || 'no-tracking'}-${hotmartEvent.toLowerCase()}-${Date.now()}`;

  console.log('📋 Processando evento:', {
    hotmart_event: hotmartEvent,
    meta_event: metaEventName,
    tracking_id: trackingId,
  });

  // Salvar no banco meta_events
  const dbSaved = await saveEventToDatabase(supabase, {
    event_name: metaEventName,
    event_id: eventId,
    visitor_id: trackingId,
    value: purchase?.price?.value || null,
    currency: purchase?.price?.currency_code || null,
    device: visitorData?.device || null,
    country: null,
    city: null,
    region: visitorData?.region || null,
    utm_source: visitorData?.utm_source || null,
    utm_medium: visitorData?.utm_medium || null,
    utm_campaign: visitorData?.utm_campaign || null,
    publisher_platform: 'hotmart',
    placement: visitorData?.utm_content || null,
    page_url: visitorData?.landing_page || null,
  });

  console.log('📋 Evento registrado no banco:', dbSaved ? '✅' : '❌');

  return { success: true, dbSaved };
}

// ============================================
// HANDLER PRINCIPAL
// ============================================
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔔 Hotmart Webhook - Recebendo evento');
    console.log('📅 Timestamp:', new Date().toISOString());

    // 1. Ler corpo da requisição
    const bodyText = await req.text();
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      console.error('❌ JSON inválido');
      return new Response(
        JSON.stringify({ error: 'Bad request - invalid JSON' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Validar configuração do servidor
    if (!HOTMART_SECRET_KEY) {
      console.error('❌ HOTMART_SECRET_KEY não configurado');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Supabase não configurado');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validar token da Hotmart
    const signature = req.headers.get('x-hotmart-hottok');
    if (!signature) {
      console.error('❌ Token x-hotmart-hottok ausente');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - missing token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!validateHotmartToken(signature)) {
      console.error('❌ Token inválido');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('✅ Token validado');

    // 4. Validar payload com Zod
    const parseResult = hotmartWebhookSchema.safeParse(body);
    if (!parseResult.success) {
      console.error('❌ Payload inválido:', parseResult.error.format());
      return new Response(
        JSON.stringify({ error: 'Bad request - invalid payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validatedBody = parseResult.data;
    const hotmartEvent = validatedBody.event;

    console.log('📨 Evento recebido:', {
      event: hotmartEvent,
      transaction_id: validatedBody.data?.purchase?.transaction,
      tracking_id: validatedBody.data?.purchase?.tracking_id,
      buyer_email: maskEmail(validatedBody.data?.buyer?.email),
    });

    // 5. Inicializar Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 6. Buscar dados do visitante (se houver tracking_id)
    const trackingId = validatedBody.data?.purchase?.tracking_id;
    let visitorData: any = null;

    if (trackingId) {
      const { data, error } = await supabase
        .from('visitor_tracking')
        .select('*')
        .eq('visitor_id', trackingId)
        .single();

      if (!error && data) {
        visitorData = data;
        console.log('👤 Visitante encontrado:', {
          visitor_id: data.visitor_id,
          utm_source: data.utm_source,
          device: data.device,
        });
      } else {
        console.log('👤 Visitante não encontrado para tracking_id:', trackingId);
      }
    }

    // 7. Processar evento baseado no tipo
    let result;

    if (PURCHASE_EVENTS.includes(hotmartEvent)) {
      // Evento de compra - registra no banco + envia para Meta CAPI
      result = await processPurchaseEvent(supabase, validatedBody, visitorData);
    } else {
      // Outros eventos - apenas registra no banco
      result = await processOtherEvent(supabase, validatedBody, visitorData);
    }

    console.log('✅ Webhook processado com sucesso');

    return new Response(
      JSON.stringify({ 
        received: true,
        event: hotmartEvent,
        processed: result.success,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Erro crítico no webhook:', error instanceof Error ? error.message : 'unknown');
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
