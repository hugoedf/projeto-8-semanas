import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Hotmart webhook handler for Vercel
// Secret is loaded from Vercel environment variables (never hardcode)
const HOTMART_SECRET = process.env.HOTMART_SECRET_KEY || '';

// Initialize Supabase client
const supabaseUrl = 'https://kfddlytvdzqwopongnew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZGRseXR2ZHpxd29wb25nbmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzczOTQsImV4cCI6MjA3OTcxMzM5NH0.4MRUaM-Pip7Bs_smO-NODMkc9OJnZsOXs9B4q2xv5zI';
const supabase = createClient(supabaseUrl, supabaseKey);

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

  const eventId = `hotmart_${purchaseData.transactionId}_${Date.now()}`;
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

    console.log('📤 Meta CAPI - Enviando evento Purchase:', JSON.stringify(payload, null, 2));

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
      console.error('❌ Meta CAPI - Erro na resposta:', result);
      return { success: false, error: result };
    }

    console.log('✅ Meta CAPI - Evento enviado com sucesso:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Meta CAPI - Erro ao enviar:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const report = {
    timestamp: new Date().toISOString(),
    webhookStatus: 'unknown',
    tokenValidation: 'unknown',
    trackingIdStatus: 'unknown',
    visitorDataMatching: 'unknown',
    metaCAPIStatus: 'unknown',
    errors: [] as string[],
    warnings: [] as string[],
    data: {} as any,
  };

  console.log('🔔 ===== HOTMART WEBHOOK INITIATED =====');
  console.log('🕐 Timestamp:', report.timestamp);

  // Only accept POST requests
  if (req.method !== 'POST') {
    report.webhookStatus = 'failed';
    report.errors.push('Método HTTP inválido - apenas POST é aceito');
    console.error('❌ Método não permitido:', req.method);
    return res.status(405).json({ error: 'Method not allowed', report });
  }

  report.webhookStatus = 'receiving';

  try {
    // Validate Hotmart token
    const receivedToken = req.headers['x-hotmart-hottok'] as string;
    
    console.log('🔑 Validando token Hotmart...');
    console.log('Token recebido:', receivedToken ? '***' + receivedToken.slice(-6) : 'NENHUM');
    console.log('Token esperado:', HOTMART_SECRET ? '***' + HOTMART_SECRET.slice(-6) : 'NÃO CONFIGURADO');

    if (!receivedToken) {
      report.tokenValidation = 'missing';
      report.warnings.push('Token X-Hotmart-Hottok não enviado no header');
      console.warn('⚠️ Token não enviado');
    } else if (receivedToken !== HOTMART_SECRET) {
      report.tokenValidation = 'invalid';
      report.errors.push('Token X-Hotmart-Hottok inválido');
      console.error('❌ Token inválido');
      return res.status(401).json({ error: 'Invalid token', report });
    } else {
      report.tokenValidation = 'valid';
      console.log('✅ Token válido');
    }

    // Validate incoming payload with zod schema
    const parseResult = hotmartWebhookSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      report.webhookStatus = 'validation_failed';
      report.errors.push(`Payload inválido: ${parseResult.error.message}`);
      console.error('❌ Validação do payload falhou:', parseResult.error.format());
      return res.status(400).json({ 
        error: 'Invalid webhook payload', 
        details: parseResult.error.format(),
        report 
      });
    }

    // Extract validated purchase data
    const { data, event } = parseResult.data;
    
    console.log('📦 Dados validados:');
    console.log('Event:', event);
    console.log('Purchase Data:', JSON.stringify(data, null, 2));

    // Extract tracking_id (eventId)
    // IMPORTANTE: A Hotmart DEVE enviar o tracking_id em data.tracking_id
    // Isso acontece quando o checkout é acessado com ?tracking_id=VALOR na URL
    const trackingId = data?.tracking_id || data?.buyer?.tracking_id || data?.purchase?.tracking_id || 'not_provided';
    
    console.log('🔍 ===== TRACKING ID EXTRAÍDO =====');
    console.log('📍 Tracking ID recebido:', trackingId);
    console.log('🔎 Locais verificados:');
    console.log('   - data.tracking_id:', data?.tracking_id || '❌ NÃO ENCONTRADO');
    console.log('   - data.buyer.tracking_id:', data?.buyer?.tracking_id || '❌ NÃO ENCONTRADO');
    console.log('   - data.purchase.tracking_id:', data?.purchase?.tracking_id || '❌ NÃO ENCONTRADO');
    console.log('📦 Estrutura completa recebida:', JSON.stringify(data, null, 2));
    console.log('====================================');

    if (trackingId === 'not_provided') {
      report.trackingIdStatus = 'missing';
      report.warnings.push('⚠️ HOTMART NÃO ENVIOU TRACKING_ID - Sem vínculo com o visitante!');
      console.error('❌ PROBLEMA CRÍTICO: tracking_id ausente no webhook da Hotmart');
      console.warn('💡 CAUSA: A Hotmart não está recebendo o tracking_id na URL do checkout');
      console.warn('💡 VERIFICAÇÃO NECESSÁRIA:');
      console.warn('   1. Confirme que o botão gera: https://pay.hotmart.com/O103097031O?tracking_id=EVENTID');
      console.warn('   2. Verifique no console do navegador se a URL tem o tracking_id');
      console.warn('   3. A Hotmart deve propagar esse tracking_id para o webhook automaticamente');
      console.warn('   4. Se a URL está correta mas o webhook não recebe, contate o suporte da Hotmart');
    } else {
      report.trackingIdStatus = 'found';
      console.log('✅ tracking_id encontrado e será usado para matching:', trackingId);
      console.log('✅ Prosseguindo com busca dos dados do visitante no banco...');
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

    report.data.purchase = purchaseInfo;
    console.log('💰 Informações da compra processadas:', JSON.stringify(purchaseInfo, null, 2));

    // Fetch visitor data from Supabase
    let visitorData = null;
    
    if (trackingId !== 'not_provided') {
      console.log('🔎 Buscando dados do visitante no Supabase...');
      console.log('Visitor ID:', trackingId);

      try {
        const { data: visitor, error } = await supabase
          .from('visitor_tracking')
          .select('*')
          .eq('visitor_id', trackingId)
          .single();

        if (error) {
          report.visitorDataMatching = 'not_found';
          report.warnings.push(`Dados do visitante não encontrados: ${error.message}`);
          console.warn('⚠️ Visitante não encontrado:', error.message);
        } else if (visitor) {
          visitorData = visitor;
          report.visitorDataMatching = 'success';
          report.data.visitor = visitorData;
          console.log('✅ Dados do visitante encontrados:', JSON.stringify(visitorData, null, 2));
        }
      } catch (error) {
        report.visitorDataMatching = 'error';
        report.errors.push(`Erro ao buscar visitante: ${error instanceof Error ? error.message : 'Unknown'}`);
        console.error('❌ Erro ao buscar visitante:', error);
      }
    } else {
      report.visitorDataMatching = 'skipped';
      report.warnings.push('Busca de dados do visitante ignorada (tracking_id ausente)');
      console.warn('⚠️ Busca de visitante ignorada');
    }

    // Send to Meta CAPI
    console.log('📡 Enviando evento Purchase para Meta CAPI...');
    const metaResult = await sendToMetaCAPI(purchaseInfo, visitorData);
    
    if (metaResult.success) {
      report.metaCAPIStatus = 'sent';
      report.data.metaCAPI = metaResult.data;
      console.log('✅ Evento enviado para Meta CAPI com sucesso');
    } else {
      report.metaCAPIStatus = 'failed';
      report.errors.push(`Falha ao enviar para Meta CAPI: ${JSON.stringify(metaResult.error)}`);
      console.error('❌ Falha ao enviar para Meta CAPI:', metaResult.error);
    }

    // Final report
    report.webhookStatus = 'completed';
    console.log('✅ ===== WEBHOOK PROCESSADO COM SUCESSO =====');
    console.log('📊 Relatório Final:', JSON.stringify(report, null, 2));

    // Return success to Hotmart
    return res.status(200).json({ 
      received: true,
      trackingId: purchaseInfo.trackingId,
      transactionId: purchaseInfo.transactionId,
      report
    });

  } catch (error) {
    report.webhookStatus = 'error';
    report.errors.push(`Erro inesperado: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('❌ ===== ERRO NO WEBHOOK =====');
    console.error('Erro:', error);
    console.log('📊 Relatório de Erro:', JSON.stringify(report, null, 2));
    
    // Always return 200 to prevent Hotmart from retrying
    return res.status(200).json({ 
      received: true, 
      error: error instanceof Error ? error.message : 'Unknown error',
      report
    });
  }
}
