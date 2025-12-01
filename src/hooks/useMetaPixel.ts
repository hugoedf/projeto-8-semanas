import { useEffect } from 'react';

// Meta Pixel interface
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    _metaPixelManaged?: boolean;
  }
}

// Sistema de anti-duplicação
const recentEvents = new Map<string, number>();

const shouldFireEvent = (eventName: string, eventId: string): boolean => {
  const now = Date.now();
  const eventKey = `${eventName}-${eventId}`;
  const lastFired = recentEvents.get(eventKey);
  
  // Não dispara se foi disparado nos últimos 500ms
  if (lastFired && now - lastFired < 500) {
    console.log(`Meta Pixel - Evento ${eventName} ignorado (anti-duplicação)`, { eventId });
    return false;
  }
  
  recentEvents.set(eventKey, now);
  
  // Limpar eventos antigos (> 5 segundos)
  for (const [key, timestamp] of recentEvents.entries()) {
    if (now - timestamp > 5000) {
      recentEvents.delete(key);
    }
  }
  
  return true;
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
      
      // Anti-duplicação
      if (!shouldFireEvent('PageView', eventId)) {
        return;
      }
      
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
      
      // Anti-duplicação
      if (!shouldFireEvent('ViewContent', eventId)) {
        return;
      }
      
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
      
      // Anti-duplicação
      if (!shouldFireEvent('InitiateCheckout', eventId)) {
        return;
      }
      
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
   * Envia evento Purchase (conversão completa)
   * Usado quando uma compra é finalizada
   */
  const trackPurchase = (purchaseData: {
    value: number;
    currency?: string;
    transaction_id: string;
    content_name?: string;
    content_ids?: string[];
    num_items?: number;
    // Dados do usuário para hash
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }) => {
    if (window.fbq) {
      const eventId = generateEventId();
      const params: any = {
        value: purchaseData.value,
        currency: purchaseData.currency || 'BRL',
        transaction_id: purchaseData.transaction_id,
      };
      
      if (purchaseData.content_name) params.content_name = purchaseData.content_name;
      if (purchaseData.content_ids) params.content_ids = purchaseData.content_ids;
      if (purchaseData.num_items) params.num_items = purchaseData.num_items;
      
      window.fbq('track', 'Purchase', params, { eventID: eventId });
      console.log('Meta Pixel - Purchase enviado', { eventId, transaction_id: purchaseData.transaction_id });
      
      // Envia também para a API de Conversões com dados completos
      sendToConversionsAPI('Purchase', params, eventId, purchaseData);
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
  const sendToConversionsAPI = async (eventName: string, eventParams: any, eventId: string, userData?: any) => {
    try {
      // Coleta cookies do Meta Pixel para deduplicação
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');

      // Coleta UTMs da URL ou sessionStorage
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source') || sessionStorage.getItem('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || sessionStorage.getItem('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || undefined,
        utm_content: urlParams.get('utm_content') || sessionStorage.getItem('utm_content') || undefined,
        utm_term: urlParams.get('utm_term') || sessionStorage.getItem('utm_term') || undefined,
      };

      // Armazena UTMs no sessionStorage para uso futuro
      Object.entries(utmData).forEach(([key, value]) => {
        if (value) sessionStorage.setItem(key, value);
      });

      // Detecta informações do dispositivo
      const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

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
            utmData,
            deviceInfo,
            userData: userData || {},
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
    trackPurchase,
  };
};
