import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMetaPixel } from '@/hooks/useMetaPixel';

/**
 * Provider do Meta Pixel
 * 
 * Este componente deve envolver toda a aplicação para garantir que:
 * 1. O Meta Pixel seja inicializado uma única vez
 * 2. O evento PageView seja disparado automaticamente em cada mudança de rota
 * 3. O evento ViewContent seja disparado em páginas de conteúdo
 */
export const MetaPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { trackPageView, trackViewContent } = useMetaPixel();

  useEffect(() => {
    // Aguarda o Pixel estar pronto antes de disparar eventos
    const initEvents = () => {
      if (!window.fbq) {
        setTimeout(initEvents, 100);
        return;
      }

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
  }, [location.pathname, trackPageView, trackViewContent]);

  return <>{children}</>;
};
