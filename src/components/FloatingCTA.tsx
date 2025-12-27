import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          
          // Aparece em 40% e permanece até o final, só some se voltar abaixo de 40%
          if (scrollPercentage >= 40 && !isDismissed) {
            setIsVisible(true);
          } else if (scrollPercentage < 40) {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed]);

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    console.log('✅ ===== CHECKOUT INICIADO (FLOATING CTA) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('==============================================');

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-in-bottom">
      <div className="bg-background/95 backdrop-blur-md border-t border-accent/30 shadow-2xl px-3 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-between gap-2">
          {/* Preço */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-muted-foreground line-through text-xs">R$97</span>
            <span className="text-accent font-bold text-lg">R$19,90</span>
          </div>

          {/* Botão emocional */}
          <Button 
            variant="cta" 
            size="sm"
            onClick={handleCTAClick}
            className="text-xs px-4 py-3 font-bold shadow-lg shadow-accent/30 uppercase animate-pulse-glow-subtle whitespace-nowrap"
          >
            EVOLUIR AGORA
            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Button>

          {/* Fechar */}
          <button 
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
