import { useCallback, useEffect, useRef } from 'react';
import { useVisitorTracking } from './useVisitorTracking';
import { getMetaParamBuilder, refreshMetaParams } from '@/utils/metaParameterBuilder';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    _metaPixelManaged?: boolean;
  }
}

// Anti-duplicação simples
const recentEvents = new Map<string, number>();

const shouldFireEvent = (eventName: string, eventId: string): boolean => {
  const now = Date.now();
  const key = `${eventName}-${eventId}`;
  const last = recentEvents.get(key);

  if (last && now - last < 500) return false;

  recentEvents.set(key, now);

  for (const [k, t] of recentEvents.entries()) {
    if (now - t > 5000) recentEvents.delete(k);
  }

  return true;
};

export const useMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  const { visitorData } = useVisitorTracking();

  const paramBuilderRef = useRef<ReturnType<typeof getMetaParamBuilder> | null>(null);
  const initializedRef = useRef(false);

  // Inicialização do Pixel
  useEffect(() => {
    if (!initializedRef.current) {
      paramBuilderRef.current = refreshMetaParams();
      initializedRef.current = true;
    }

    if (!window.fbq) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', pixelId);
      window._metaPixelManaged = true;

      console.log('Meta Pixel inicializado (Top/Middle Funnel Only)');
    }
  }, [pixelId]);

  const generateEventId = useCallback(() => {
    const base = visitorData?.visitorId || 'anon';
    return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }, [visitorData?.visitorId]);

  /**
   * ENVIO CAPI — APENAS PageView e ViewContent
   */
  const sendToConversionsAPI = useCallback(
    async (eventName: 'PageView' | 'ViewContent', eventParams: any, eventId: string) => {
      try {
        if (paramBuilderRef.current) {
          paramBuilderRef.current = refreshMetaParams();
        } else {
          paramBuilderRef.current = getMetaParamBuilder();
        }

        const metaParams = paramBuilderRef.current.getParameters();

        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName,
            eventParams,
            eventId,
            visitorId: visitorData?.visitorId,
            fbp: metaParams.fbp,
            fbc: metaParams.fbc,
            client_user_agent: metaParams.client_user_agent,
            eventSourceUrl: window.location.href,
          }),
        });

        console.log('Meta CAPI enviado:', eventName, eventId);
      } catch (err) {
        console.error('Erro CAPI:', err);
      }
    },
    [visitorData?.visitorId]
  );

  /**
   * PAGE VIEW
   */
  const trackPageView = useCallback(() => {
    if (!window.fbq) return;

    const eventId = generateEventId();
    if (!shouldFireEvent('PageView', eventId)) return;

    window.fbq('track', 'PageView', {}, { eventID: eventId });
    sendToConversionsAPI('PageView', {}, eventId);
  }, [generateEventId, sendToConversionsAPI]);

  /**
   * VIEW CONTENT
   */
  const trackViewContent = useCallback(
    (contentName?: string) => {
      if (!window.fbq) return;

      const eventId = generateEventId();
      if (!shouldFireEvent('ViewContent', eventId)) return;

      const params = contentName ? { content_name: contentName } : {};
      window.fbq('track', 'ViewContent', params, { eventID: eventId });
      sendToConversionsAPI('ViewContent', params, eventId);
    },
    [generateEventId, sendToConversionsAPI]
  );

  return {
    trackPageView,
    trackViewContent,
  };
};
