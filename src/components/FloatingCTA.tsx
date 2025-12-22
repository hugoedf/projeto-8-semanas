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
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Mostrar após 50% de scroll e antes de chegar no CTA final (85%)
      const shouldShow = scrollPercentage > 50 && scrollPercentage < 85;
      
      if (!isDismissed) {
        setIsVisible(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden animate-slide-in-bottom">
      <div className="bg-card/95 backdrop-blur-lg border-t border-accent/20 shadow-2xl shadow-black/30 px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center gap-3">
          {/* Preço */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground line-through text-sm">R$ 97</span>
              <span className="text-accent font-bold text-xl">R$ 19,90</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              E-book + App 8X Grátis
            </p>
          </div>

          {/* Botão */}
          <Button 
            variant="cta" 
            size="sm"
            onClick={handleCTAClick}
            className="text-sm px-4 py-5 font-bold shadow-lg shadow-accent/30 uppercase whitespace-nowrap animate-pulse-glow"
          >
            COMPRAR
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>

          {/* Fechar */}
          <button 
            onClick={handleDismiss}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
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
