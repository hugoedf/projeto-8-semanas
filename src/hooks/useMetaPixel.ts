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
    // O Meta Pixel já é carregado no index.html
    // Este hook apenas aguarda que o fbq esteja disponível
    const checkPixelReady = setInterval(() => {
      if (window.fbq) {
        console.log('Meta Pixel detectado e pronto para uso');
        clearInterval(checkPixelReady);
      }
    }, 100);

    return () => clearInterval(checkPixelReady);
  }, []);

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
