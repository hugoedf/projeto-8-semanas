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
      <div className="bg-gray-950/98 backdrop-blur-lg border-t border-accent/40 shadow-[0_-10px_40px_hsla(18,100%,58%,0.15)] px-4 py-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between gap-3">
          {/* Preço - Enhanced */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 line-through text-sm">R$97</span>
            <span className="text-accent font-extrabold text-xl drop-shadow-[0_0_15px_hsla(18,100%,58%,0.4)]">R$19,90</span>
          </div>

          {/* Botão emocional - Enhanced */}
          <Button 
            variant="cta" 
            size="default"
            onClick={handleCTAClick}
            className="text-sm px-6 py-4 shadow-lg uppercase animate-pulse-glow whitespace-nowrap rounded-full"
          >
            EVOLUIR AGORA
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Fechar */}
          <button 
            onClick={handleDismiss}
            className="p-1.5 text-gray-500 hover:text-white transition-colors flex-shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
