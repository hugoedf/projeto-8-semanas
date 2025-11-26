import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Edge Function para enviar eventos para a Meta Conversions API (CAPI)
 * 
 * Esta função recebe eventos do cliente e os envia para a API de Conversões do Meta
 * de forma server-side, garantindo maior confiabilidade e privacidade dos dados.
 * 
 * Eventos suportados:
 * - PageView: Visualização de página
 * - ViewContent: Visualização de conteúdo específico
 * - InitiateCheckout: Início do processo de compra
 * 
 * Parâmetros importantes:
 * - event_id: ID único para deduplicação entre Pixel e CAPI
 * - fbp/fbc: Cookies do Meta Pixel para matching
 * - event_source_url: URL onde o evento ocorreu
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Meta CAPI - Recebendo evento');

    // Validação de configuração
    if (!META_ACCESS_TOKEN) {
      console.error('META_ACCESS_TOKEN não configurado');
      return new Response(
        JSON.stringify({ error: 'META_ACCESS_TOKEN não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!META_PIXEL_ID) {
      console.error('META_PIXEL_ID não configurado');
      return new Response(
        JSON.stringify({ error: 'META_PIXEL_ID não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse do body da requisição
    const { eventName, eventParams, eventId, fbp, fbc, eventSourceUrl } = await req.json();

    console.log('Meta CAPI - Dados recebidos:', {
      eventName,
      eventId,
      eventSourceUrl,
      hasParams: !!eventParams,
      hasFbp: !!fbp,
      hasFbc: !!fbc,
    });

    // Valida evento
    if (!eventName || !eventId || !eventSourceUrl) {
      console.error('Dados obrigatórios faltando', { eventName, eventId, eventSourceUrl });
      return new Response(
        JSON.stringify({ error: 'eventName, eventId e eventSourceUrl são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepara o evento para enviar à CAPI
    const eventTime = Math.floor(Date.now() / 1000);
    
    const userData: any = {};
    
    // Adiciona fbp e fbc se disponíveis (importante para deduplicação)
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    // Extrai informações do User-Agent
    const userAgent = req.headers.get('user-agent') || '';
    const clientIpAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                           req.headers.get('x-real-ip') || 
                           'unknown';

    // Monta o payload do evento
    const eventData: any = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: {
        ...userData,
        client_ip_address: clientIpAddress,
        client_user_agent: userAgent,
      },
    };

    // Adiciona custom_data se houver parâmetros
    if (eventParams && Object.keys(eventParams).length > 0) {
      eventData.custom_data = eventParams;
    }

    console.log('Meta CAPI - Enviando evento:', {
      pixel_id: META_PIXEL_ID,
      event_name: eventName,
      event_id: eventId,
    });

    // Envia para a Meta Conversions API
    const capiResponse = await fetch(
      `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    const capiResult = await capiResponse.json();

    if (!capiResponse.ok) {
      console.error('Meta CAPI - Erro na resposta:', {
        status: capiResponse.status,
        result: capiResult,
      });
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao enviar evento para CAPI',
          details: capiResult,
        }),
        { 
          status: capiResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Meta CAPI - Evento enviado com sucesso:', {
      eventName,
      eventId,
      events_received: capiResult.events_received,
      fbtrace_id: capiResult.fbtrace_id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        eventName,
        eventId,
        capiResult,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Meta CAPI - Erro geral:', error);
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
