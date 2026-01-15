import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Hotmart webhook handler for Vercel
// Secret is loaded from Vercel environment variables (never hardcode)
const HOTMART_SECRET = process.env.HOTMART_SECRET_KEY || '';

// Initialize Supabase client using SERVICE_ROLE_KEY to bypass RLS
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not configured - need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// ============================================
// MASCARAMENTO DE DADOS SENSÍVEIS
// ============================================
function maskEmail(email: string | undefined | null): string {
  if (!email) return "hidden";
  const parts = email.split("@");
  if (parts.length !== 2) return "hidden";
  return parts[0][0] + "***@" + parts[1];
}

// Hotmart webhook payload schema for validation
const hotmartPriceSchema = z.object({
  value: z.number().optional(),
  currency_code: z.string().max(10).optional(),
}).optional();

const hotmartBuyerSchema = z.object({
  email: z.string().email().max(255).optional(),
  name: z.string().max(200).optional(),
  tracking_id: z.string().max(100).optional(),
}).optional();

const hotmartPurchaseSchema = z.object({
  transaction: z.string().max(100).optional(),
  price: hotmartPriceSchema,
  tracking_id: z.string().max(100).optional(),
}).optional();

const hotmartProductSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string().max(500).optional(),
}).optional();

const hotmartWebhookSchema = z.object({
  event: z.string().max(100),
  data: z.object({
    tracking_id: z.string().max(100).optional(),
    buyer: hotmartBuyerSchema,
    purchase: hotmartPurchaseSchema,
    product: hotmartProductSchema,
  }).optional(),
});

// Hash function for Meta CAPI
const hashSHA256 = async (text: string | undefined | null): Promise<string> => {
  if (!text) return '';
  const msgBuffer = new TextEncoder().encode(text.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Send purchase event to Meta CAPI
const sendToMetaCAPI = async (purchaseData: any, visitorData: any) => {
  const metaAccessToken = process.env.META_ACCESS_TOKEN;
  const metaPixelId = process.env.META_PIXEL_ID;

  if (!metaAccessToken || !metaPixelId) {
    console.error('❌ Meta CAPI - Credenciais não configuradas');
    return { success: false, error: 'Credenciais não configuradas' };
  }

  // Usar apenas o ID da transação como eventId para garantir a deduplicação perfeita na Meta
  const eventId = purchaseData.transactionId;
  const eventTime = Math.floor(new Date(purchaseData.timestamp).getTime() / 1000);

  try {
    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: eventId,
          event_source_url: visitorData?.landing_page || 'not_provided',
          action_source: 'website',
          user_data: {
            em: purchaseData.buyerEmail ? await hashSHA256(purchaseData.buyerEmail) : undefined,
            fn: purchaseData.buyerName ? await hashSHA256(purchaseData.buyerName.split(' ')[0]) : undefined,
            ln: purchaseData.buyerName ? await hashSHA256(purchaseData.buyerName.split(' ').slice(1).join(' ')) : undefined,
            client_ip_address: purchaseData.clientIp,
            client_user_agent: purchaseData.userAgent,
            fbc: visitorData?.fbc || undefined,
            fbp: visitorData?.fbp || undefined,
          },
          custom_data: {
            value: purchaseData.price,
            currency: purchaseData.currency,
            transaction_id: purchaseData.transactionId,
            origem_compra: visitorData?.utm_source || 'not_provided',
            posicionamento: visitorData?.utm_campaign || 'not_provided',
            aparelho: visitorData?.device || 'not_provided',
            regiao: visitorData?.region || 'not_provided',
          },
        },
      ],
      test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
    };

    // Log sem dados sensíveis
    console.log('📤 Meta CAPI - Enviando evento Purchase:', {
      event_id: eventId,
      transaction_id: purchaseData.transactionId,
      buyer_email: maskEmail(purchaseData.buyerEmail),
      value: purchaseData.price,
      currency: purchaseData.currency,
    });

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Meta CAPI - Erro na resposta - status:', response.status);
      return { success: false, error: 'API error' };
    }

    console.log('✅ Meta CAPI - Evento enviado com sucesso:', {
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Meta CAPI - Erro ao enviar:', error instanceof Error ? error.message : 'unknown');
    return { success: false, error: 'Exception' };
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('🔔 ===== HOTMART WEBHOOK INITIATED =====');
  console.log('🕐 Timestamp:', new Date().toISOString());

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.error('❌ Método não permitido:', req.method);
    return res.status(405).json({ error: 'Bad request' });
  }

  try {
    // Validate Hotmart token
    const receivedToken = req.headers['x-hotmart-hottok'] as string;
    
    console.log('🔑 Validando token Hotmart...');

    // Reject requests without valid token - only Hotmart should call this endpoint
    if (!receivedToken || receivedToken !== HOTMART_SECRET) {
      console.error('❌ Token inválido ou ausente - rejeitando requisição');
      return res.status(401).json({ error: 'Bad request' });
    }
    
    console.log('✅ Token válido');

    // Validate incoming payload with zod schema
    const parseResult = hotmartWebhookSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      console.error('❌ Validação do payload falhou:', parseResult.error.format());
      return res.status(400).json({ error: 'Bad request' });
    }

    // Extract validated purchase data
    const { data, event } = parseResult.data;
    
    // Log com dados mascarados
    console.log('📦 Dados validados:', {
      event,
      transaction_id: data?.purchase?.transaction,
      buyer_email: maskEmail(data?.buyer?.email),
    });

    // Extract tracking_id (eventId)
    const trackingId = data?.tracking_id || data?.buyer?.tracking_id || data?.purchase?.tracking_id || 'not_provided';
    
    console.log('🔍 Tracking ID:', trackingId);

    if (trackingId === 'not_provided') {
      console.warn('⚠️ tracking_id ausente no webhook da Hotmart');
    }

    // Structure purchase info
    const purchaseInfo = {
      event,
      trackingId,
      transactionId: data?.purchase?.transaction,
      productId: data?.product?.id,
      productName: data?.product?.name,
      buyerEmail: data?.buyer?.email,
      buyerName: data?.buyer?.name,
      price: data?.purchase?.price?.value,
      currency: data?.purchase?.price?.currency_code || 'BRL',
      timestamp: new Date().toISOString(),
      clientIp: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    console.log('💰 Compra processada:', {
      transaction_id: purchaseInfo.transactionId,
      product: purchaseInfo.productName,
      value: purchaseInfo.price,
      currency: purchaseInfo.currency,
    });

    // Fetch visitor data from Supabase
    let visitorData = null;
    
    if (trackingId !== 'not_provided') {
      console.log('🔎 Buscando dados do visitante...');

      try {
        const { data: visitor, error } = await supabase
          .from('visitor_tracking')
          .select('*')
          .eq('visitor_id', trackingId)
          .single();

        if (error) {
          console.warn('⚠️ Visitante não encontrado');
        } else if (visitor) {
          visitorData = visitor;
          console.log('✅ Dados do visitante encontrados:', {
            visitor_id: visitor.visitor_id,
            utm_source: visitor.utm_source,
            device: visitor.device,
          });
        }
      } catch (error) {
        console.error('❌ Erro ao buscar visitante:', error instanceof Error ? error.message : 'unknown');
      }
    }

    // Send to Meta CAPI
    console.log('📡 Enviando evento Purchase para Meta CAPI...');
    const metaResult = await sendToMetaCAPI(purchaseInfo, visitorData);
    
    if (metaResult.success) {
      console.log('✅ Evento enviado para Meta CAPI com sucesso');
    } else {
      console.error('❌ Falha ao enviar para Meta CAPI');
    }

    console.log('✅ ===== WEBHOOK PROCESSADO COM SUCESSO =====');

    // Return minimal success response to Hotmart (no internal details)
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ ===== ERRO NO WEBHOOK =====');
    console.error('Erro:', error instanceof Error ? error.message : 'unknown');
    
    // Always return 200 to prevent Hotmart from retrying (no internal details)
    return res.status(200).json({ received: true });
  }
}
