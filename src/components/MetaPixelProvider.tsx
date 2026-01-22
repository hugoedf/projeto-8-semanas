import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { getMetaParamBuilder, refreshMetaParams } from '@/utils/metaParameterBuilder';

// ===============================
// CONFIGURAÇÕES
// ===============================
const VIEW_CONTENT_TIME_THRESHOLD = 30; // segundos

const EXCLUDED_ROUTES = [
  '/dashboard',
  '/auth',
  '/admin',
  '/generate-audio',
];

// ===============================
// META PIXEL PROVIDER
// ===============================
export const MetaPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { visitorData, isLoading } = useVisitorTracking();

  const pageViewFiredRef = useRef(false);
  const viewContentFiredRef = useRef(false);
  const pageLoadTimeRef = useRef<number>(Date.now());
  const paramBuilderRef = useRef<ReturnType<typeof getMetaParamBuilder> | null>(null);

  const isExcludedRoute = EXCLUDED_ROUTES.some(route =>
    location.pathname.startsWith(route)
  );

  // ===============================
  // LOAD PIXEL (ONCE)
  // ===============================
  useEffect(() => {
    if (window.fbq) {
      console.log('⚠️ Meta Pixel já estava carregado');
      return;
    }

    !function (f: any, b, e, v, n?, t?, s?) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
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
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    window.fbq('init', pixelId);
    console.log('✅ Meta Pixel carregado e inicializado', { pixelId });
  }, []);

  // ===============================
  // FUNÇÃO PARA ENVIAR PARA CAPI
  // ===============================
  const sendToConversionsAPI = async (
    eventName: 'PageView' | 'ViewContent',
    eventParams: any,
    eventId: string
  ) => {
    try {
      // Atualizar parâmetros Meta
      if (paramBuilderRef.current) {
        paramBuilderRef.current = refreshMetaParams();
      } else {
        paramBuilderRef.current = getMetaParamBuilder();
      }

      const metaParams = paramBuilderRef.current.getParameters();

      console.log(`📤 Enviando ${eventName} para CAPI...`, {
        eventId,
        visitorId: visitorData?.visitorId,
        fbp: metaParams.fbp,
        fbc: metaParams.fbc,
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`,
        {
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
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ ${eventName} enviado para CAPI com sucesso`, {
          eventId,
          fbtrace_id: result.metaCAPI?.fbtrace_id,
        });
      } else {
        console.error(`❌ Erro ao enviar ${eventName} para CAPI:`, response.status);
      }
    } catch (err) {
      console.error(`❌ Erro CAPI ${eventName}:`, err);
    }
  };

  // ===============================
  // 1. PAGEVIEW (IMEDIATO)
  // ===============================
  useEffect(() => {
    console.log('🔍 PageView Effect - Verificando condições...', {
      isExcludedRoute,
      fbqExists: !!window.fbq,
      pathname: location.pathname,
      alreadyFired: pageViewFiredRef.current,
    });

    if (isExcludedRoute) {
      console.log('⏭️ Rota excluída, pulando PageView');
      return;
    }

    if (!window.fbq) {
      console.log('⏳ Aguardando Meta Pixel carregar...');
      return;
    }

    // IMPORTANTE: Resetar ref quando muda de rota
    if (pageViewFiredRef.current) {
      console.log('⚠️ PageView já foi disparado nesta sessão');
      return;
    }

    const eventId = `pv-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    pageViewFiredRef.current = true;
    pageLoadTimeRef.current = Date.now();

    // Disparar via Pixel
    window.fbq('track', 'PageView', {}, { eventID: eventId });
    console.log('✅ PageView disparado via Pixel', { eventId, pathname: location.pathname });

    // Enviar para CAPI
    sendToConversionsAPI('PageView', {}, eventId);

  }, [location.pathname, isExcludedRoute]);

  // ===============================
  // 2. VIEWCONTENT (30s QUALIFICADO)
  // ===============================
  useEffect(() => {
    console.log('🔍 ViewContent Effect - Verificando condições...', {
      pathname: location.pathname,
      isHome: location.pathname === '/',
      isExcludedRoute,
      fbqExists: !!window.fbq,
      isLoading,
      hasVisitorId: !!visitorData?.visitorId,
      alreadyFired: viewContentFiredRef.current,
    });

    if (location.pathname !== '/') {
      console.log('⏭️ Não é home, pulando ViewContent');
      return;
    }

    if (isExcludedRoute) {
      console.log('⏭️ Rota excluída, pulando ViewContent');
      return;
    }

    if (!window.fbq) {
      console.log('⏳ Aguardando Meta Pixel carregar...');
      return;
    }

    if (isLoading) {
      console.log('⏳ Aguardando visitor tracking carregar...');
      return;
    }

    if (!visitorData?.visitorId) {
      console.log('⚠️ visitorId não disponível ainda');
      return;
    }

    if (viewContentFiredRef.current) {
      console.log('⚠️ ViewContent já foi disparado nesta sessão');
      return;
    }

    const elapsed = Date.now() - pageLoadTimeRef.current;
    const remaining = Math.max(0, VIEW_CONTENT_TIME_THRESHOLD * 1000 - elapsed);

    console.log(`⏰ ViewContent será disparado em ${Math.ceil(remaining / 1000)}s`);

    const timer = setTimeout(() => {
      if (viewContentFiredRef.current) return;

      const eventId = `vc-${visitorData.visitorId}-${Date.now()}`;

      viewContentFiredRef.current = true;

      const params = { content_name: 'VSL - Qualificado 30s' };

      // Disparar via Pixel
      window.fbq('track', 'ViewContent', params, { eventID: eventId });
      console.log('✅ ViewContent (30s) disparado via Pixel', { eventId });

      // Enviar para CAPI
      sendToConversionsAPI('ViewContent', params, eventId);

    }, remaining);

    return () => clearTimeout(timer);
  }, [location.pathname, visitorData, isLoading, isExcludedRoute]);

  // ===============================
  // 3. VIEWCONTENT VIA VÍDEO (25%)
  // ===============================
  useEffect(() => {
    if (location.pathname !== '/') return;
    if (!window.fbq) return;

    const handler = (e: CustomEvent<{ progress: number; visitorId: string }>) => {
      console.log('🎥 Evento de vídeo recebido', { progress: e.detail.progress });

      if (viewContentFiredRef.current) {
        console.log('⚠️ ViewContent já foi disparado, ignorando evento de vídeo');
        return;
      }

      if (e.detail.progress < 25) {
        console.log('⏭️ Progresso < 25%, ignorando');
        return;
      }

      const eventId = `vc-video-${Date.now()}`;
      viewContentFiredRef.current = true;

      const params = { content_name: 'VSL - Qualificado 25%' };

      // Disparar via Pixel
      window.fbq('track', 'ViewContent', params, { eventID: eventId });
      console.log('✅ ViewContent (25% vídeo) disparado via Pixel', { eventId });

      // Enviar para CAPI
      sendToConversionsAPI('ViewContent', params, eventId);
    };

    window.addEventListener('vsl-progress-25' as any, handler);
    return () => window.removeEventListener('vsl-progress-25' as any, handler);
  }, [location.pathname]);

  // ===============================
  // RESET REFS AO MUDAR DE ROTA
  // ===============================
  useEffect(() => {
    console.log('🔄 Rota mudou, resetando refs', { pathname: location.pathname });
    pageViewFiredRef.current = false;
    viewContentFiredRef.current = false;
    pageLoadTimeRef.current = Date.now();
  }, [location.pathname]);

  return <>{children}</>;
};
