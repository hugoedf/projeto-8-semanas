import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Threshold for qualified ViewContent (in seconds)
const VIEW_CONTENT_TIME_THRESHOLD = 30;

/**
 * Provider do Meta Pixel - Fluxo Otimizado
 * 
 * Ordem dos eventos:
 * 1. PageView - IMEDIATO (sem dependências)
 * 2. ViewContent - QUALIFICADO (após 30s na página OU 25% do vídeo)
 * 3. InitiateCheckout - Apenas no clique do CTA
 * 4. Purchase - Via webhook/CAPI
 */
export const MetaPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { visitorData, isLoading } = useVisitorTracking();
  const pageViewFiredRef = useRef(false);
  const viewContentFiredRef = useRef(false);
  const pageLoadTimeRef = useRef(Date.now());
  
  // Ativa rastreamento de scroll na página principal
  useScrollTracking();

  // ============================================
  // 1. PAGEVIEW - DISPARO IMEDIATO (sem dependências)
  // ============================================
  useEffect(() => {
    // Não dispara pixel no ambiente de desenvolvimento/editor do Lovable
    const isDevEnvironment = 
      window.location.hostname.includes('lovableproject.com') ||
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1') ||
      window.self !== window.top;
    
    if (isDevEnvironment) {
      console.log('Meta Pixel - Desativado no ambiente de desenvolvimento');
      return;
    }

    // Anti-duplicação por sessão/rota
    const sessionKey = `meta-pv-${location.pathname}`;
    if (sessionStorage.getItem(sessionKey) || pageViewFiredRef.current) {
      console.log('Meta Pixel - PageView já disparado nesta sessão');
      return;
    }

    // Dispara PageView IMEDIATAMENTE quando fbq estiver pronto
    const fireImmediatePageView = () => {
      if (!window.fbq) {
        // Retry rápido (50ms) até fbq estar disponível
        setTimeout(fireImmediatePageView, 50);
        return;
      }

      // Gera eventId simples baseado em timestamp (sem depender de visitorId)
      const eventId = `pv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Marca como disparado
      pageViewFiredRef.current = true;
      sessionStorage.setItem(sessionKey, eventId);
      pageLoadTimeRef.current = Date.now();

      // Dispara PageView no browser
      window.fbq('track', 'PageView', {}, { eventID: eventId });
      console.log('✅ Meta Pixel - PageView IMEDIATO', { 
        eventId, 
        delay: `${Date.now() - performance.timing.navigationStart}ms` 
      });

      // Envia para CAPI em background (não bloqueia)
      sendPageViewToCAPI(eventId);
    };

    fireImmediatePageView();
  }, [location.pathname]);

  // ============================================
  // 2. VIEWCONTENT - QUALIFICADO (após 30s na página)
  // ============================================
  useEffect(() => {
    const isDevEnvironment = 
      window.location.hostname.includes('lovableproject.com') ||
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1') ||
      window.self !== window.top;
    
    if (isDevEnvironment) return;

    // Só dispara na página principal
    if (location.pathname !== '/') return;

    // Aguarda visitorId para ViewContent (tracking avançado)
    if (isLoading || !visitorData?.visitorId) return;

    // Anti-duplicação
    const sessionKey = `meta-vc-${location.pathname}`;
    if (sessionStorage.getItem(sessionKey) || viewContentFiredRef.current) {
      return;
    }

    // Timer para ViewContent qualificado (30 segundos na página)
    const timeOnPage = Date.now() - pageLoadTimeRef.current;
    const remainingTime = Math.max(0, VIEW_CONTENT_TIME_THRESHOLD * 1000 - timeOnPage);

    const viewContentTimer = setTimeout(() => {
      if (viewContentFiredRef.current) return;
      
      if (!window.fbq) return;

      const eventId = `vc-${visitorData.visitorId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      viewContentFiredRef.current = true;
      sessionStorage.setItem(sessionKey, eventId);

      window.fbq('track', 'ViewContent', { content_name: 'VSL - Qualificado 30s' }, { eventID: eventId });
      console.log('✅ Meta Pixel - ViewContent QUALIFICADO (30s)', { eventId, visitorId: visitorData.visitorId });

      // Envia para CAPI
      sendViewContentToCAPI(eventId, visitorData.visitorId);
    }, remainingTime);

    return () => clearTimeout(viewContentTimer);
  }, [location.pathname, visitorData, isLoading]);

  // ============================================
  // 3. VIEWCONTENT VIA VÍDEO (25% assistido) - Listener global
  // ============================================
  useEffect(() => {
    const isDevEnvironment = 
      window.location.hostname.includes('lovableproject.com') ||
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1') ||
      window.self !== window.top;
    
    if (isDevEnvironment) return;
    if (location.pathname !== '/') return;

    // Escuta evento customizado do VSLPlayer quando 25% é atingido
    const handleVideoProgress = (e: CustomEvent<{ progress: number; visitorId: string }>) => {
      if (viewContentFiredRef.current) return;
      if (e.detail.progress < 25) return;
      if (!window.fbq) return;

      const visitorId = e.detail.visitorId || visitorData?.visitorId || 'unknown';
      const eventId = `vc-video-${visitorId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      viewContentFiredRef.current = true;
      const sessionKey = `meta-vc-${location.pathname}`;
      sessionStorage.setItem(sessionKey, eventId);

      window.fbq('track', 'ViewContent', { content_name: 'VSL - Qualificado 25% Video' }, { eventID: eventId });
      console.log('✅ Meta Pixel - ViewContent QUALIFICADO (25% vídeo)', { eventId, visitorId });

      sendViewContentToCAPI(eventId, visitorId);
    };

    window.addEventListener('vsl-progress-25' as any, handleVideoProgress);
    return () => window.removeEventListener('vsl-progress-25' as any, handleVideoProgress);
  }, [location.pathname, visitorData]);

  return <>{children}</>;
};

// ============================================
// CAPI Helpers (envio server-side em background)
// ============================================

async function sendPageViewToCAPI(eventId: string) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbp = getCookie('_fbp') || localStorage.getItem('_fbp');
    const fbc = urlParams.get('fbclid') ? `fb.1.${Date.now()}.${urlParams.get('fbclid')}` : getCookie('_fbc');

    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventId,
        eventSourceUrl: window.location.href,
        fbp,
        fbc,
        client_user_agent: navigator.userAgent,
      }),
    });
    console.log('📤 Meta CAPI - PageView enviado', { eventId });
  } catch (error) {
    console.error('CAPI PageView error:', error);
  }
}

async function sendViewContentToCAPI(eventId: string, visitorId: string) {
  try {
    const fbp = getCookie('_fbp') || localStorage.getItem('_fbp');
    const fbc = getCookie('_fbc');

    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'ViewContent',
        eventId,
        eventSourceUrl: window.location.href,
        visitorId,
        fbp,
        fbc,
        client_user_agent: navigator.userAgent,
        eventParams: { content_name: 'VSL - Qualificado' },
      }),
    });
    console.log('📤 Meta CAPI - ViewContent enviado', { eventId, visitorId });
  } catch (error) {
    console.error('CAPI ViewContent error:', error);
  }
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
