import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Hotmart webhook handler for Vercel
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get Hotmart secret from environment
    const hotmartSecret = process.env.HOTMART_SECRET_KEY;
    
    if (!hotmartSecret) {
      console.error('HOTMART_SECRET_KEY not configured');
      return res.status(200).json({ received: true, error: 'Secret not configured' });
    }

    // Validate Hotmart signature
    const signature = req.headers['x-hotmart-hottok'] as string;
    const body = JSON.stringify(req.body);
    
    const hash = crypto
      .createHmac('sha256', hotmartSecret)
      .update(body)
      .digest('hex');

    if (signature !== hash) {
      console.error('Invalid Hotmart signature');
      return res.status(200).json({ received: true, error: 'Invalid signature' });
    }

    // Extract purchase data
    const { data, event } = req.body;
    
    console.log('=== HOTMART WEBHOOK RECEIVED ===');
    console.log('Event:', event);
    console.log('Purchase Data:', JSON.stringify(data, null, 2));
    
    // Extract tracking_id from custom fields if present
    const trackingId = data?.tracking_id || data?.buyer?.tracking_id || 'not_provided';
    
    // Log structured purchase information
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
      timestamp: new Date().toISOString()
    };
    
    console.log('Processed Purchase Info:', JSON.stringify(purchaseInfo, null, 2));

    // Return success to Hotmart
    return res.status(200).json({ 
      received: true,
      trackingId,
      transactionId: purchaseInfo.transactionId
    });

  } catch (error) {
    console.error('Error processing Hotmart webhook:', error);
    // Always return 200 to prevent Hotmart from retrying
    return res.status(200).json({ 
      received: true, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
