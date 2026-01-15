import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Hotmart webhook handler for Vercel
const HOTMART_SECRET = process.env.HOTMART_SECRET_KEY || '';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not configured');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Helper para mascarar e-mail nos logs
function maskEmail(email: string | undefined | null): string {
  if (!email) return "hidden";
  const parts = email.split("@");
  if (parts.length !== 2) return "hidden";
  return parts[0][0] + "***@" + parts[1];
}

// Schemas de validação
const hotmartWebhookSchema = z.object({
  event: z.string(),
  data: z.object({
    tracking_id: z.string().optional(),
    buyer: z.object({
      email: z.string().email().optional(),
      name: z.string().optional(),
      tracking_id: z.string().optional(),
    }).optional(),
    purchase: z.object({
      transaction: z.string().optional(),
      price: z.object({
        value: z.number().optional(),
        currency_code: z.string().optional(),
      }).optional(),
      tracking_id: z.string().optional(),
    }).optional(),
    product: z.object({
      id: z.union([z.string(), z.number()]).optional(),
      name: z.string().optional(),
    }).optional(),
  }).optional(),
});

// Função de Hash SHA256 para Meta
const hashSHA256 = async (text: string | undefined | null): Promise<string> => {
  if (!text) return '';
  const normalized = text.toLowerCase().trim();
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Envio para Meta CAPI
const sendToMetaCAPI = async (purchaseData: any, visitorData: any) => {
  const metaAccessToken = process.env.META_ACCESS_TOKEN;
  const metaPixelId = process.env.META_PIXEL_ID;

  if (!metaAccessToken || !metaPixelId) {
    console.error('❌ Meta CAPI - Credenciais ausentes');
    return { success: false };
  }

  // DEDUPLICAÇÃO: Usar estritamente o ID da transação
  const eventId = purchaseData.transactionId;
  const eventTime = Math.floor(Date.now() / 1000);

  try {
    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: eventId,
          event_source_url: visitorData?.landing_page || 'https://www.metodo8xpro.online/',
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
            content_name: purchaseData.productName,
            content_category: 'Ebook/App',
            origem_compra: visitorData?.utm_source || 'not_provided',
            posicionamento: visitorData?.utm_campaign || 'not_provided',
          },
        },
      ],
      test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log('✅ Meta CAPI Response:', JSON.stringify(result));
    return { success: response.ok };
  } catch (error) {
    console.error('❌ Meta CAPI Error:', error);
    return { success: false };
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const receivedToken = req.headers['x-hotmart-hottok'] as string;
    if (!receivedToken || receivedToken !== HOTMART_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const parseResult = hotmartWebhookSchema.safeParse(req.body);
    if (!parseResult.success) return res.status(400).json({ error: 'Invalid payload' });

    const { data, event } = parseResult.data;
    const trackingId = data?.tracking_id || data?.buyer?.tracking_id || data?.purchase?.tracking_id;
    const buyerEmail = data?.buyer?.email;

    const purchaseInfo = {
      event,
      transactionId: data?.purchase?.transaction,
      productName: data?.product?.name,
      buyerEmail: buyerEmail,
      buyerName: data?.buyer?.name,
      price: data?.purchase?.price?.value,
      currency: data?.purchase?.price?.currency_code || 'BRL',
      clientIp: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    console.log(`🔔 Processando ${event}: ${purchaseInfo.transactionId} | ${maskEmail(buyerEmail)}`);

    let visitorData = null;

    // 1. Tentar buscar por tracking_id
    if (trackingId) {
      const { data: visitor } = await supabase
        .from('visitor_tracking')
        .select('*')
        .eq('visitor_id', trackingId)
        .single();
      if (visitor) visitorData = visitor;
    }

    // 2. FALLBACK: Se não achou por tracking_id, tenta por e-mail (Aumenta muito a chance de sucesso)
    if (!visitorData && buyerEmail) {
      console.log('🔎 Tracking ID ausente, tentando buscar por e-mail...');
      const { data: visitorByEmail } = await supabase
        .from('visitor_tracking')
        .select('*')
        .eq('email', buyerEmail) // Certifique-se que sua tabela salva o e-mail quando o usuário preenche algo
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (visitorByEmail) visitorData = visitorByEmail;
    }

    // Enviar para Meta
    await sendToMetaCAPI(purchaseInfo, visitorData);

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    return res.status(200).json({ received: true });
  }
}
