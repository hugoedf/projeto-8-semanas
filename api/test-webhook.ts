import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Endpoint de teste para simular webhook da Hotmart
 * 
 * URL: /api/test-webhook
 * 
 * Este endpoint permite testar todo o fluxo do webhook sem depender da Hotmart.
 * Envia um payload simulado para o webhook real e retorna o resultado.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('🧪 ===== TESTE DE WEBHOOK INICIADO =====');

  // Obter tracking_id da query string (ou gerar um aleatório)
  const testTrackingId = req.query.tracking_id as string || `test_visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  console.log('📍 Usando tracking_id:', testTrackingId);

  // Payload simulado da Hotmart (PURCHASE_COMPLETE)
  const mockPayload = {
    event: 'PURCHASE_COMPLETE',
    data: {
      tracking_id: testTrackingId,
      product: {
        id: '103097031',
        name: 'MÉTODO 8X: HIPERTROFIA INTELIGENTE',
      },
      buyer: {
        email: 'teste@exemplo.com',
        name: 'João Silva Teste',
      },
      purchase: {
        transaction: `TEST_${Date.now()}`,
        price: {
          value: 97.00,
          currency_code: 'BRL',
        },
      },
    },
  };

  console.log('📦 Payload simulado:', JSON.stringify(mockPayload, null, 2));

  try {
    // Determinar URL base do webhook
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['host'];
    const webhookUrl = `${protocol}://${host}/api/hotmart/webhook`;

    console.log('📡 Enviando para webhook real:', webhookUrl);

    // Enviar para o webhook real
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hotmart-Hottok': 'zpP4f2qiVofDP8ScATDjW5l1GRrXzg24100806',
        'User-Agent': 'Hotmart-Webhook-Test',
      },
      body: JSON.stringify(mockPayload),
    });

    const result = await response.json();

    console.log('📥 Resposta do webhook:', JSON.stringify(result, null, 2));
    console.log('✅ ===== TESTE CONCLUÍDO =====');

    // Retornar resultado do teste
    return res.status(200).json({
      testStatus: 'completed',
      webhookUrl,
      testTrackingId,
      webhookResponse: result,
      instructions: {
        howToTest: 'Acesse /api/test-webhook?tracking_id=SEU_VISITOR_ID',
        example: `/api/test-webhook?tracking_id=${testTrackingId}`,
        nextSteps: [
          '1. Verifique os logs do console',
          '2. Confirme se o tracking_id foi reconhecido',
          '3. Verifique se os dados do visitante foram encontrados',
          '4. Confirme se o evento foi enviado para Meta CAPI',
        ],
      },
    });
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return res.status(500).json({
      testStatus: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      testTrackingId,
    });
  }
}
