import { useCallback, useEffect, useRef } from 'react';
import { useVisitorTracking } from './useVisitorTracking';
import { getMetaParamBuilder, refreshMetaParams } from '@/utils/metaParameterBuilder';

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
};

/**
 * Hook para inicializar e gerenciar o Meta Pixel
 * Implementa Parameter Configurator da Meta para captura de fbp, fbc e user_agent
 */
export const useMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  const { visitorData } = useVisitorTracking();
  
  // useRef DEVE vir sempre na mesma ordem - antes de qualquer useEffect/useCallback
  const paramBuilderRef = useRef<ReturnType<typeof getMetaParamBuilder> | null>(null);
  const isInitializedRef = useRef(false);

  // Inicializa Parameter Builder apenas uma vez
  useEffect(() => {
    if (!isInitializedRef.current) {
      paramBuilderRef.current = refreshMetaParams();
      isInitializedRef.current = true;
    }
    
    // O Meta Pixel já é carregado no index.html
    const checkPixelReady = setInterval(() => {
      if (window.fbq) {
        console.log('Meta Pixel detectado e pronto para uso');
        clearInterval(checkPixelReady);
      }
    }, 100);

    return () => clearInterval(checkPixelReady);
  }, []);

  /**
   * Gera um ID único para o evento (usado para deduplicação)
   * Usa o visitorId como base para consistência
   */
  const generateEventId = useCallback((): string => {
    const base = visitorData?.visitorId || 'unknown';
    return `${base}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, [visitorData?.visitorId]);

  /**
   * Envia evento para a API de Conversões (server-side)
   * Inclui todos os parâmetros do Parameter Configurator
   */
  const sendToConversionsAPI = useCallback(async (
    eventName: string, 
    eventParams: any, 
    eventId: string, 
    userData?: any
  ) => {
    try {
      // Atualiza parâmetros antes de enviar (captura fbp/fbc mais recentes)
      if (paramBuilderRef.current) {
        paramBuilderRef.current = refreshMetaParams();
      } else {
        paramBuilderRef.current = getMetaParamBuilder();
      }
      
      const metaParams = paramBuilderRef.current.getParameters();

      // Coleta UTMs da URL ou localStorage (persistente entre sessões)
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source') || localStorage.getItem('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || undefined,
        utm_id: urlParams.get('utm_id') || localStorage.getItem('utm_id') || undefined,
        utm_content: urlParams.get('utm_content') || localStorage.getItem('utm_content') || undefined,
        utm_term: urlParams.get('utm_term') || localStorage.getItem('utm_term') || undefined,
      };

      // Armazena UTMs no localStorage para persistência entre sessões
      Object.entries(utmData).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });

      // Armazena landing page (primeira página visitada) e referrer
      if (!localStorage.getItem('landing_page')) {
        localStorage.setItem('landing_page', window.location.href);
        localStorage.setItem('referrer', document.referrer || 'direct');
      }

      // Coleta deviceInfo para enviar ao servidor
      const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: localStorage.getItem('referrer') || document.referrer || '',
        landingPage: localStorage.getItem('landing_page') || window.location.href,
      };

      const metaCapiSecret = import.meta.env.VITE_META_CAPI_SECRET;
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-meta-capi-secret': metaCapiSecret || '',
          },
          body: JSON.stringify({
            eventName,
            eventParams,
            eventId,
            visitorId: visitorData?.visitorId,
            // Parâmetros do Meta Parameter Configurator
            fbp: metaParams.fbp,
            fbc: metaParams.fbc,
            client_user_agent: metaParams.client_user_agent,
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

      console.log('Meta CAPI - Evento enviado com sucesso', { 
        eventName, 
        eventId,
        hasFbp: !!metaParams.fbp,
        hasFbc: !!metaParams.fbc,
      });
    } catch (error) {
      console.error('Erro ao enviar evento para CAPI:', error);
    }
  }, [visitorData?.visitorId]);

  /**
   * Envia evento PageView
   * Deve ser chamado em cada mudança de página
   */
  const trackPageView = useCallback(() => {
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
  }, [generateEventId, sendToConversionsAPI]);

  /**
   * Envia evento ViewContent
   * Usado quando usuário visualiza conteúdo específico
   */
  const trackViewContent = useCallback((contentName?: string) => {
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
  }, [generateEventId, sendToConversionsAPI]);

  /**
   * Envia evento InitiateCheckout
   * Usado quando usuário clica no botão de compra
   */
  const trackInitiateCheckout = useCallback((value?: number, currency: string = 'BRL') => {
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
  }, [generateEventId, sendToConversionsAPI]);

  /**
   * Envia evento Purchase (conversão completa)
   * Usado quando uma compra é finalizada
   */
  const trackPurchase = useCallback((purchaseData: {
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
  }, [generateEventId, sendToConversionsAPI]);

  return {
    trackPageView,
    trackViewContent,
    trackInitiateCheckout,
    trackPurchase,
  };
};
