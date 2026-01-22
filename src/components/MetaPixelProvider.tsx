import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

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

  const isExcludedRoute = EXCLUDED_ROUTES.some(route =>
    location.pathname.startsWith(route)
  );

  // ===============================
  // LOAD PIXEL (ONCE)
  // ===============================
  useEffect(() => {
    if (window.fbq) return;

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

    window.fbq('init', import.meta.env.VITE_META_PIXEL_ID);
    console.log('✅ Meta Pixel carregado');
  }, []);

  // ===============================
  // 1. PAGEVIEW (IMEDIATO)
  // ===============================
  useEffect(() => {
    if (isExcludedRoute) return;
    if (!window.fbq) return;

    const sessionKey = `pv-${location.pathname}`;
    if (sessionStorage.getItem(sessionKey) || pageViewFiredRef.current) return;

    const eventId = `pv-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    pageViewFiredRef.current = true;
    sessionStorage.setItem(sessionKey, eventId);
    pageLoadTimeRef.current = Date.now();

    window.fbq('track', 'PageView', {}, { eventID: eventId });

    console.log('✅ PageView disparado', { eventId });
  }, [location.pathname, isExcludedRoute]);

  // ===============================
  // 2. VIEWCONTENT (30s QUALIFICADO)
  // ===============================
  useEffect(() => {
    if (location.pathname !== '/') return;
    if (isExcludedRoute) return;
    if (!window.fbq) return;
    if (isLoading || !visitorData?.visitorId) return;

    const sessionKey = `vc-${location.pathname}`;
    if (sessionStorage.getItem(sessionKey) || viewContentFiredRef.current) return;

    const elapsed = Date.now() - pageLoadTimeRef.current;
    const remaining = Math.max(0, VIEW_CONTENT_TIME_THRESHOLD * 1000 - elapsed);

    const timer = setTimeout(() => {
      if (viewContentFiredRef.current) return;

      const eventId = `vc-${visitorData.visitorId}-${Date.now()}`;

      viewContentFiredRef.current = true;
      sessionStorage.setItem(sessionKey, eventId);

      window.fbq(
        'track',
        'ViewContent',
        { content_name: 'VSL - Qualificado 30s' },
        { eventID: eventId }
      );

      console.log('✅ ViewContent (30s) disparado', { eventId });
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
      if (viewContentFiredRef.current) return;
      if (e.detail.progress < 25) return;

      const eventId = `vc-video-${Date.now()}`;

      viewContentFiredRef.current = true;
      sessionStorage.setItem(`vc-${location.pathname}`, eventId);

      window.fbq(
        'track',
        'ViewContent',
        { content_name: 'VSL - Qualificado 25%' },
        { eventID: eventId }
      );

      console.log('✅ ViewContent (25% vídeo) disparado', { eventId });
    };

    window.addEventListener('vsl-progress-25' as any, handler);
    return () =>
      window.removeEventListener('vsl-progress-25' as any, handler);
  }, [location.pathname]);

  return <>{children}</>;
};
