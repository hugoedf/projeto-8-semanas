import { useCallback } from 'react';
import { useVisitorTracking } from './useVisitorTracking';

declare global {
  interface Window {
    fbq: any;
    _metaPixelManaged?: boolean;
  }
}

export const useMetaPixel = () => {
  const { visitorData } = useVisitorTracking();

  const generateEventId = useCallback(() => {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const shouldFireEvent = (eventName: string, eventId: string) => {
    const key = `meta_event_${eventName}_${eventId}`;
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, 'true');
    return true;
  };

  const sendToConversionsAPI = useCallback(async (
    eventName: string, 
    eventParams: any, 
    eventId: string,
    userData?: any
  ) => {
    try {
      const metaParams = {
        fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1],
        fbc: document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1],
        client_user_agent: navigator.userAgent,
      };

      const deviceInfo = {
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      };

      const utmData = {
        utm_source: localStorage.getItem('utm_source'),
        utm_medium: localStorage.getItem('utm_medium'),
        utm_campaign: localStorage.getItem('utm_campaign'),
        utm_term: localStorage.getItem('utm_term'),
        utm_content: localStorage.getItem('utm_content'),
      };

      const eventSourceUrl = window.location.href;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName,
            eventParams,
            eventId,
            visitorId: visitorData?.visitorId,
            fbp: metaParams.fbp,
            fbc: metaParams.fbc,
            client_user_agent: metaParams.client_user_agent,
            eventSourceUrl,
            utmData,
            deviceInfo,
            userData: userData || {},
          }),
        }
      );

      if (!response.ok) throw new Error(`CAPI error: ${response.statusText}`);
      console.log('Meta CAPI - Evento enviado com sucesso', { eventName, eventId });
    } catch (error) {
      console.error('Erro ao enviar evento para CAPI:', error);
    }
  }, [visitorData?.visitorId]);

  const trackPageView = useCallback(() => {
    if (window.fbq) {
      const eventId = generateEventId();
      if (!shouldFireEvent('PageView', eventId)) return;
      window.fbq('track', 'PageView', {}, { eventID: eventId });
      sendToConversionsAPI('PageView', {}, eventId);
    }
  }, [generateEventId, sendToConversionsAPI]);

  const trackInitiateCheckout = useCallback((value: number = 19.90, currency: string = 'BRL') => {
    if (window.fbq) {
      const eventId = generateEventId();
      const params = { value, currency };
      window.fbq('track', 'InitiateCheckout', params, { eventID: eventId });
      console.log('Meta Pixel - InitiateCheckout enviado', { eventId, value, currency });
      sendToConversionsAPI('InitiateCheckout', params, eventId);
    }
  }, [generateEventId, sendToConversionsAPI]);

  const trackPurchase = useCallback((purchaseData: any) => {
    if (window.fbq) {
      const eventId = generateEventId();
      const params = {
        value: purchaseData.value,
        currency: purchaseData.currency || 'BRL',
        transaction_id: purchaseData.transaction_id,
      };
      window.fbq('track', 'Purchase', params, { eventID: eventId });
      sendToConversionsAPI('Purchase', params, eventId, purchaseData);
    }
  }, [generateEventId, sendToConversionsAPI]);

  return { trackPageView, trackInitiateCheckout, trackPurchase };
};
