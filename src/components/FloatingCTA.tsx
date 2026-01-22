import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Clock } from "lucide-react";

import { buildHotmartCheckoutUrl } from "@/lib/utils";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          
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
    
    console.log('✅ ===== REDIRECIONANDO PARA CHECKOUT (FLOATING CTA) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('ℹ️ InitiateCheckout e Purchase serão disparados pela UTM-FI da Hotmart');
    console.log('==========================================================');
    
    window.location.href = checkoutUrl;
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile - Bottom bar - ORANGE (intermediate) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-in-bottom">
        <div className="bg-black/95 backdrop-blur-md border-t border-accent/30 shadow-2xl px-3 py-3 safe-area-inset-bottom">
          <div className="flex items-center justify-between gap-2">
            {/* Price */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white/40 line-through text-xs">R$97</span>
              <span className="text-accent font-bold text-lg">R$19,90</span>
            </div>

            {/* ORANGE Button (intermediate) */}
            <Button 
              variant="cta" 
              size="sm"
              onClick={handleCTAClick}
              className="text-xs px-4 py-3 font-bold shadow-lg shadow-accent/30 uppercase whitespace-nowrap"
            >
              COMEÇAR POR R$19,90
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>

            {/* Close */}
            <button 
              onClick={handleDismiss}
              className="p-1 text-white/40 hover:text-white transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop - Side floating bar - ORANGE (intermediate) */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block animate-slide-in-right">
        <div className="bg-black backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 border border-accent/30 p-4 max-w-xs">
          {/* Urgency */}
          <div className="flex items-center gap-2 text-red-400 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Oferta por tempo limitado</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/40 line-through text-sm">R$97</span>
            <span className="text-accent font-display text-2xl font-bold">R$19,90</span>
          </div>

          {/* ORANGE CTA (intermediate) */}
          <Button 
            variant="cta" 
            size="sm"
            onClick={handleCTAClick}
            className="w-full text-sm font-bold shadow-lg shadow-accent/30 uppercase"
          >
            GARANTIR ACESSO
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Trust */}
          <p className="text-white/40 text-xs text-center mt-2">
            7 dias de garantia · Risco zero
          </p>

          {/* Close */}
          <button 
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X className="w-3 h-3 text-white/60" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingCTA;
