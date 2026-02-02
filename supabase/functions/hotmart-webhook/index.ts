import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.85.0";
import { z } from "https://esm.sh/zod@3.25.76";

// ============================================
// CONFIGURAÇÃO DE AMBIENTE
// ============================================
const HOTMART_SECRET_KEY = Deno.env.get("HOTMART_SECRET_KEY");
const META_ACCESS_TOKEN = Deno.env.get("META_ACCESS_TOKEN");
const META_PIXEL_ID = Deno.env.get("META_PIXEL_ID");
const META_TEST_EVENT_CODE = Deno.env.get("META_TEST_EVENT_CODE");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-hotmart-hottok",
};

// ============================================
// MAPEAMENTO DE EVENTOS HOTMART -> META
// ============================================
const HOTMART_TO_META_EVENT: Record<string, string> = {
  PURCHASE_COMPLETE: "Purchase",
  PURCHASE_APPROVED: "Purchase",
  PURCHASE_BILLET_PRINTED: "InitiateCheckout",
  PURCHASE_CANCELED: "CustomEvent",
  PURCHASE_CHARGEBACK: "CustomEvent",
  PURCHASE_DELAYED: "CustomEvent",
  PURCHASE_EXPIRED: "CustomEvent",
  PURCHASE_PROTEST: "CustomEvent",
  PURCHASE_REFUNDED: "CustomEvent",
  PURCHASE_OUT_OF_SHOPPING_CART: "AddToCart",
};

// ✅ Fonte única de verdade para Purchase (evita APPROVED + COMPLETE duplicar)
const PURCHASE_EVENTS = ["PURCHASE_APPROVED"];

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
    console.error("❌ HOTMART_SECRET_KEY não configurado");
    return false;
  }
  return receivedToken === HOTMART_SECRET_KEY;
}

async function hashSHA256(text: string | undefined | null): Promise<string> {
  if (!text || text.trim() === "") return "";
  const normalized = text.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ============================================
// SCHEMAS DE VALIDAÇÃO
// ============================================
const hotmartPriceSchema = z
  .object({
    value: z.number().optional(),
    currency_code: z.string().max(10).optional(),
  })
  .optional();

const hotmartAddressSchema = z
  .object({
    city: z.string().max(200).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    zip_code: z.string().max(20).optional(),
  })
  .optional();

const hotmartBuyerSchema = z
  .object({
    email: z.string().email().max(255).optional(),
    name: z.string().max(200).optional(),
    phone: z.string().max(50).optional(),
    address: hotmartAddressSchema,
  })
  .optional();

const hotmartPurchaseSchema = z
  .object({
    transaction: z.string().max(100).optional(),
    tracking_id: z.string().max(100).optional(),
    price: hotmartPriceSchema,
    product: z
      .object({
        name: z.string().max(500).optional(),
      })
      .optional(),
  })
  .optional();

const hotmartWebhookSchema = z.object({
  event: z.string().max(100),
  data: z
    .object({
      buyer: hotmartBuyerSchema,
      purchase: hotmartPurchaseSchema,
    })
    .optional(),
});

// ============================================
// BANCO: UPSERT IDEMPOTENTE
// ============================================

/**
 * Upsert idempotente na tabela meta_events.
 * Recomendado: UNIQUE(event_name, event_id) na tabela meta_events.
 */
async function upsertEventToDatabase(
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
    // opcional: event_time pode ser a hora do webhook
    event_time?: string;
  }
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("meta_events")
      .upsert(
        {
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
          event_time: eventData.event_time || new Date().toISOString(),
        },
        { onConflict: "event_name,event_id" }
      );

    if (error) {
      console.error("❌ Erro ao upsert no banco:", error.message);
      return false;
    }

    console.log("✅ Evento upsert no banco:", eventData.event_name, eventData.event_id);
    return true;
  } catch (error) {
    console.error(
      "❌ Exceção ao upsert no banco:",
      error instanceof Error ? error.message : "unknown"
    );
    return false;
  }
}

// ============================================
// PROCESSAMENTO DE EVENTOS
// ============================================

/**
 * Processa evento de compra (Purchase)
 * - Compra só em PURCHASE_APPROVED
 * - event_id = transactionId (dedupe Meta e local)
 * - idempotência via upsert + check por eq
 */
async function processPurchaseEvent(
  supabase: any,
  validatedBody: z.infer<typeof hotmartWebhookSchema>,
  visitorData: any | null
): Promise<{ success: boolean; metaSent: boolean; dbSaved: boolean; skipped?: boolean }> {
  const purchase = validatedBody.data?.purchase;
  const buyer = validatedBody.data?.buyer;

  const trackingId = purchase?.tracking_id || null;

  // ✅ Nunca gerar transaction_id fallback aqui — isso destruiria dedupe
  const transactionId = purchase?.transaction || null;
  if (!transactionId) {
    console.error("❌ purchase.transaction ausente. Ignorando Purchase para evitar duplicidade.");
    return { success: true, metaSent: false, dbSaved: false, skipped: true };
  }

  const eventId = transactionId;
  const eventTime = Math.floor(Date.now() / 1000);

  const purchaseValue = purchase?.price?.value ?? 0;
  const currency = purchase?.price?.currency_code ?? "BRL";

  console.log("💰 Processando Purchase:", {
    transaction_id: transactionId,
    event_id: eventId,
    hotmart_event: validatedBody.event,
    value: purchaseValue,
    currency,
    buyer_email: maskEmail(buyer?.email),
  });

  // ✅ Só compra aprovada gera Purchase no Meta
  if (validatedBody.event !== "PURCHASE_APPROVED") {
    console.log(`ℹ️ Evento ${validatedBody.event} não envia Purchase (somente PURCHASE_APPROVED).`);
    return { success: true, metaSent: false, dbSaved: true, skipped: true };
  }

  // ✅ Dedupe local por igualdade (evita false matches)
  const { data: existingPurchase, error: checkError } = await supabase
    .from("meta_events")
    .select("event_id")
    .eq("event_name", "Purchase")
    .eq("event_id", eventId)
    .limit(1);

  if (!checkError && existingPurchase && existingPurchase.length > 0) {
    console.log("⚠️ DUPLICAÇÃO EVITADA: Purchase já registrado:", eventId);
    return { success: true, metaSent: false, dbSaved: false, skipped: true };
  }

  // 1) Salvar no banco (idempotente)
  const dbSaved = await upsertEventToDatabase(supabase, {
    event_name: "Purchase",
    event_id: eventId,
    visitor_id: trackingId,
    value: purchaseValue,
    currency,
    device: visitorData?.device || null,
    country: buyer?.address?.country || null,
    city: buyer?.address?.city || null,
    region: buyer?.address?.state || visitorData?.region || null,
    utm_source: visitorData?.utm_source || null,
    utm_medium: visitorData?.utm_medium || null,
    utm_campaign: visitorData?.utm_campaign || null,
    publisher_platform: "hotmart",
    placement: visitorData?.utm_content || null,
    page_url: visitorData?.landing_page || null,
    event_time: new Date().toISOString(),
  });

  // 2) Hash de dados pessoais (Advanced Matching)
  const hashedUserData: any = {};
  const normalize = (str: string) => str.trim().toLowerCase();

  if (buyer?.email) hashedUserData.em = [await hashSHA256(normalize(buyer.email))];

  if (buyer?.phone) {
    const phone = buyer.phone.replace(/\D/g, "");
    if (phone) hashedUserData.ph = [await hashSHA256(phone)];
  }

  if (buyer?.name) {
    const nameParts = normalize(buyer.name).split(" ").filter(Boolean);
    if (nameParts[0]) hashedUserData.fn = [await hashSHA256(nameParts[0])];
    if (nameParts.length > 1) {
      hashedUserData.ln = [await hashSHA256(nameParts[nameParts.length - 1])];
    }
  }

  if (buyer?.address?.city) hashedUserData.ct = [await hashSHA256(normalize(buyer.address.city))];
  if (buyer?.address?.state) hashedUserData.st = [await hashSHA256(normalize(buyer.address.state))];

  if (buyer?.address?.zip_code) {
    const zip = buyer.address.zip_code.replace(/\D/g, "");
    if (zip) hashedUserData.zp = [await hashSHA256(zip)];
  }

  hashedUserData.country = [await hashSHA256(normalize(buyer?.address?.country || "br"))];

  // 3) Montar payload Meta CAPI
  const metaEventData = {
    event_name: "Purchase",
    event_time: eventTime,
    event_id: eventId,
    event_source_url: visitorData?.landing_page || "https://metodo8x.com",
    action_source: "website",
    user_data: {
      ...hashedUserData,
      client_ip_address: visitorData?.ip_address || null,
      client_user_agent: visitorData?.user_agent || visitorData?.client_user_agent || null,
      fbp: visitorData?.fbp || null,
      fbc: visitorData?.fbc || null,
    },
    custom_data: {
      value: purchaseValue,
      currency,
      transaction_id: transactionId,
      content_name: purchase?.product?.name || "Método 8X",
      content_type: "product",
    },
  };

  // 4) Enviar para Meta CAPI
  let metaSent = false;
  if (META_PIXEL_ID && META_ACCESS_TOKEN) {
    try {
      const metaResponse = await fetch(
        `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [metaEventData],
            ...(META_TEST_EVENT_CODE ? { test_event_code: META_TEST_EVENT_CODE } : {}),
          }),
        }
      );

      metaSent = metaResponse.ok;
      if (!metaSent) {
        const errorData = await metaResponse.json();
        console.error("❌ Erro Meta CAPI:", errorData);
      }
    } catch (err) {
      console.error("❌ Exceção Meta CAPI:", err);
    }
  } else {
    console.warn("⚠️ META_PIXEL_ID/META_ACCESS_TOKEN ausentes. Purchase não enviado ao Meta.");
  }

  return { success: true, metaSent, dbSaved };
}

/**
 * Processa outros eventos (não-purchase): salva localmente
 */
async function processOtherEvent(
  supabase: any,
  validatedBody: z.infer<typeof hotmartWebhookSchema>,
  visitorData: any | null
): Promise<{ success: boolean; dbSaved: boolean }> {
  const hotmartEvent = validatedBody.event;
  const metaEventName = HOTMART_TO_META_EVENT[hotmartEvent] || "CustomEvent";
  const purchase = validatedBody.data?.purchase;

  const trackingId = purchase?.tracking_id || null;
  const eventId = `${trackingId || "no-tracking"}-${hotmartEvent.toLowerCase()}-${Date.now()}`;

  const dbSaved = await upsertEventToDatabase(supabase, {
    event_name: metaEventName,
    event_id: eventId,
    visitor_id: trackingId,
    value: purchase?.price?.value ?? null,
    currency: purchase?.price?.currency_code ?? null,
    device: visitorData?.device || null,
    country: null,
    city: null,
    region: visitorData?.region || null,
    utm_source: visitorData?.utm_source || null,
    utm_medium: visitorData?.utm_medium || null,
    utm_campaign: visitorData?.utm_campaign || null,
    publisher_platform: "hotmart",
    placement: visitorData?.utm_content || null,
    page_url: visitorData?.landing_page || null,
    event_time: new Date().toISOString(),
  });

  return { success: true, dbSaved };
}

// ============================================
// HANDLER PRINCIPAL
// ============================================
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bodyText = await req.text();
    let body: any;

    try {
      body = JSON.parse(bodyText);
    } catch {
      return new Response(JSON.stringify({ error: "Bad request - invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const signature = req.headers.get("x-hotmart-hottok");
    if (!signature || !validateHotmartToken(signature)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parseResult = hotmartWebhookSchema.safeParse(body);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: "Bad request - invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validatedBody = parseResult.data;
    const hotmartEvent = validatedBody.event;

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const trackingId = validatedBody.data?.purchase?.tracking_id;
    let visitorData: any = null;

    if (trackingId) {
      const { data } = await supabase
        .from("visitor_tracking")
        .select("*")
        .eq("visitor_id", trackingId)
        .single();

      visitorData = data;
    }

    const result = PURCHASE_EVENTS.includes(hotmartEvent)
      ? await processPurchaseEvent(supabase, validatedBody, visitorData)
      : await processOtherEvent(supabase, validatedBody, visitorData);

    return new Response(JSON.stringify({ received: true, processed: true, result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Erro crítico:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
