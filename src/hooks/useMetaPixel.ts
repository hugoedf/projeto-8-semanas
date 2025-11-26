import { useEffect } from 'react';

// Meta Pixel interface
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

/**
 * Hook para inicializar e gerenciar o Meta Pixel
 * Carrega o script de forma assíncrona e configura eventos
 */
export const useMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) {
      console.warn('Meta Pixel ID não configurado');
      return;
    }

    // Inicializa o Meta Pixel
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    // Inicializa o pixel com o ID
    window.fbq('init', pixelId);
    
    console.log('Meta Pixel inicializado:', pixelId);
  }, [pixelId]);

  /**
   * Envia evento PageView
   * Deve ser chamado em cada mudança de página
   */
  const trackPageView = () => {
    if (window.fbq) {
      const eventId = generateEventId();
      window.fbq('track', 'PageView', {}, { eventID: eventId });
      console.log('Meta Pixel - PageView enviado', { eventId });
      
      // Envia também para a API de Conversões
      sendToConversionsAPI('PageView', {}, eventId);
    }
  };

  /**
   * Envia evento ViewContent
   * Usado quando usuário visualiza conteúdo específico
   */
  const trackViewContent = (contentName?: string) => {
    if (window.fbq) {
      const eventId = generateEventId();
      const params = contentName ? { content_name: contentName } : {};
      window.fbq('track', 'ViewContent', params, { eventID: eventId });
      console.log('Meta Pixel - ViewContent enviado', { eventId, contentName });
      
      // Envia também para a API de Conversões
      sendToConversionsAPI('ViewContent', params, eventId);
    }
  };

  /**
   * Envia evento InitiateCheckout
   * Usado quando usuário clica no botão de compra
   */
  const trackInitiateCheckout = (value?: number, currency: string = 'BRL') => {
    if (window.fbq) {
      const eventId = generateEventId();
      const params: any = {
        currency,
      };
      if (value) params.value = value;
      
      window.fbq('track', 'InitiateCheckout', params, { eventID: eventId });
      console.log('Meta Pixel - InitiateCheckout enviado', { eventId, value, currency });
      
      // Envia também para a API de Conversões
      sendToConversionsAPI('InitiateCheckout', params, eventId);
    }
  };

  /**
   * Gera um ID único para o evento (usado para deduplicação)
   */
  const generateEventId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Envia evento para a API de Conversões (server-side)
   */
  const sendToConversionsAPI = async (eventName: string, eventParams: any, eventId: string) => {
    try {
      // Coleta cookies do Meta Pixel para deduplicação
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');

      const response = await fetch(
        'https://kfddlytvdzqwopongnew.supabase.co/functions/v1/meta-conversions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName,
            eventParams,
            eventId,
            fbp,
            fbc,
            eventSourceUrl: window.location.href,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`CAPI error: ${response.statusText}`);
      }

      console.log('Meta CAPI - Evento enviado com sucesso', { eventName, eventId });
    } catch (error) {
      console.error('Erro ao enviar evento para CAPI:', error);
    }
  };

  /**
   * Função auxiliar para obter cookie
   */
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  return {
    trackPageView,
    trackViewContent,
    trackInitiateCheckout,
  };
};
