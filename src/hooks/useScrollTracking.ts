import { useEffect, useCallback } from 'react';

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
type ScrollThreshold = typeof SCROLL_THRESHOLDS[number];

/**
 * Hook para rastreamento de scroll da página
 * Dispara eventos personalizados do Meta Pixel ao atingir 25%, 50%, 75% e 100% de scroll
 * Cada evento dispara apenas uma vez por sessão
 */
export const useScrollTracking = () => {
  const getScrollPercentage = useCallback((): number => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight <= 0) return 100;
    
    return Math.round((scrollTop / scrollHeight) * 100);
  }, []);

  const trackScrollEvent = useCallback((threshold: ScrollThreshold) => {
    const sessionKey = `scroll_tracked_${threshold}`;
    
    // Verifica se já disparou nesta sessão
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Aguarda o fbq estar disponível
    if (!window.fbq) {
      console.warn(`Scroll_${threshold} - fbq não disponível`);
      return;
    }

    const eventName = `Scroll_${threshold}`;
    
    // Dispara evento customizado do Meta Pixel
    window.fbq('trackCustom', eventName, {
      scroll_depth: threshold,
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Marca como disparado nesta sessão
    sessionStorage.setItem(sessionKey, 'true');
    
    console.log(`Meta Pixel - ${eventName} disparado`, {
      threshold,
      pageUrl: window.location.href
    });
  }, []);

  useEffect(() => {
    const firedThresholds = new Set<ScrollThreshold>();

    // Carrega thresholds já disparados da sessão
    SCROLL_THRESHOLDS.forEach(threshold => {
      if (sessionStorage.getItem(`scroll_tracked_${threshold}`)) {
        firedThresholds.add(threshold);
      }
    });

    const handleScroll = () => {
      const scrollPercentage = getScrollPercentage();

      SCROLL_THRESHOLDS.forEach(threshold => {
        if (!firedThresholds.has(threshold) && scrollPercentage >= threshold) {
          firedThresholds.add(threshold);
          trackScrollEvent(threshold);
        }
      });
    };

    // Usa passive listener para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Verifica posição inicial (caso usuário já tenha scrollado)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getScrollPercentage, trackScrollEvent]);
};
