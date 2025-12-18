import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useScrollTracking } from '@/hooks/useScrollTracking';

/**
 * Provider do Meta Pixel
 * 
 * Este componente deve envolver toda a aplicação para garantir que:
 * 1. O Meta Pixel seja inicializado uma única vez
 * 2. O evento PageView seja disparado automaticamente em cada mudança de rota
 * 3. O evento ViewContent seja disparado em páginas de conteúdo
 * 4. O visitorId esteja disponível antes de disparar eventos
 */
export const MetaPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { trackPageView, trackViewContent } = useMetaPixel();
  const { visitorData, isLoading } = useVisitorTracking();
  
  // Ativa rastreamento de scroll na página principal
  useScrollTracking();

  useEffect(() => {
    // Aguarda o visitorId estar disponível antes de disparar eventos
    if (isLoading || !visitorData?.visitorId) {
      return;
    }

    // Verifica se já disparou evento nesta sessão para esta rota
    const sessionKey = `meta-pixel-${location.pathname}`;
    const lastFired = sessionStorage.getItem(sessionKey);
    const now = Date.now();
    
    // Se disparou nos últimos 2 segundos, ignora (anti-duplicação de navegação rápida)
    if (lastFired && now - parseInt(lastFired) < 2000) {
      console.log('Meta Pixel - Eventos ignorados (navegação muito rápida)');
      return;
    }
    
    // Aguarda o Pixel estar pronto antes de disparar eventos
    const initEvents = () => {
      if (!window.fbq) {
        setTimeout(initEvents, 100);
        return;
      }

      // Marca como disparado nesta sessão
      sessionStorage.setItem(sessionKey, now.toString());

      console.log('Meta Pixel - Disparando eventos com visitorId:', visitorData.visitorId);

      // Dispara PageView em cada mudança de rota
      trackPageView();

      // Dispara ViewContent para páginas específicas
      if (location.pathname === '/') {
        trackViewContent('Página de Vendas Principal');
      } else if (location.pathname === '/termos-de-uso') {
        trackViewContent('Termos de Uso');
      } else if (location.pathname === '/politica-de-privacidade') {
        trackViewContent('Política de Privacidade');
      }
    };

    initEvents();
  }, [location.pathname, trackPageView, trackViewContent, visitorData, isLoading]);

  return <>{children}</>;
};
