import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConversionEvent {
  event_name: string;
  event_time: number;
  action_source: string;
  event_source_url: string;
  user_data?: {
    em?: string;
    ph?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PIXEL_ID = '2562850577432651';
    const ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
    const TEST_EVENT_CODE = 'TEST16230';

    if (!ACCESS_TOKEN) {
      throw new Error('META_ACCESS_TOKEN not configured');
    }

    const eventData: ConversionEvent = await req.json();

    // Ensure required fields
    if (!eventData.event_name) {
      throw new Error('event_name is required');
    }

    // Set defaults
    const event = {
      ...eventData,
      event_time: eventData.event_time || Math.floor(Date.now() / 1000),
      action_source: eventData.action_source || 'website',
    };

    const payload = {
      data: [event],
      test_event_code: TEST_EVENT_CODE,
    };

    console.log('Sending conversion event:', JSON.stringify(payload, null, 2));

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Meta API error:', result);
      throw new Error(`Meta API error: ${JSON.stringify(result)}`);
    }

    console.log('Conversion sent successfully:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in meta-conversion function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
