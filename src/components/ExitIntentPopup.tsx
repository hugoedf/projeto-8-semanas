import { useState, useEffect } from "react";
import { X, AlertTriangle, Clock, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

import { buildHotmartCheckoutUrl } from "@/lib/utils";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) {
      setHasTriggered(true);
      return;
    }

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    // Mobile: Visibility change detection (when user switches tab/app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !hasTriggered) {
        sessionStorage.setItem("exit_popup_pending", "true"); // CORREÇÃO APLICADA AQUI
      }
      if (document.visibilityState === "visible" && !hasTriggered && !sessionStorage.getItem("exit_popup_shown")) {
        // Check if user was away for a bit
        const wasAway = sessionStorage.getItem("exit_popup_pending");
        if (wasAway) {
          setIsVisible(true);
          setHasTriggered(true);
          sessionStorage.setItem("exit_popup_shown", "true");
          sessionStorage.removeItem("exit_popup_pending");
        }
      }
    };

    // Mobile: Back button / history state
    const handlePopState = () => {
      if (!hasTriggered && !sessionStorage.getItem("exit_popup_shown")) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem("exit_popup_shown", "true");
        // Push state back to prevent actual navigation
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push initial state for mobile back button detection
    window.history.pushState(null, "", window.location.href);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasTriggered]);

  const handleCTAClick = () => {
    const baseUrl = "https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465";
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    
    console.log('✅ ===== REDIRECIONANDO PARA CHECKOUT (EXIT INTENT) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('ℹ️ InitiateCheckout e Purchase serão disparados pela UTM-FI da Hotmart');
    console.log('=========================================================');
    
    window.location.href = checkoutUrl;
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal - Same structure for desktop and mobile */}
      <div className="relative bg-black rounded-2xl max-w-md w-full p-5 sm:p-8 border border-accent/30 shadow-2xl shadow-accent/20 animate-scale-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-5">
          <h3 className="font-display text-xl sm:text-2xl text-white mb-2">
            Espera! Você ia sair sem o método?
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">
            Se você fechar agora, volta a treinar no escuro. Mais um mês de esforço sem resultado.
          </p>
          
          {/* Urgency */}
          <div className="bg-red-500/10 border border-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>Este preço não vai durar</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/40 line-through text-lg">R$ 97</span>
            <span className="text-accent font-display text-3xl font-bold">R$ 19,90</span>
          </div>
          <p className="text-white/50 text-xs">
            Menos que um lanche. Garantia de 7 dias.
          </p>
        </div>

        {/* GREEN CTA */}
        <Button 
          onClick={handleCTAClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30 font-bold mb-2"
          size="cta"
        >
          ÚLTIMA CHANCE - GARANTIR ACESSO
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Microcopy under green button */}
        <div className="flex items-center justify-center gap-2 text-white/50 text-[10px] mb-3 flex-wrap">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
          <span>|</span>
          <span>✅ Acesso Imediato</span>
          <span>|</span>
          <span>🛡️ 7 Dias de Garantia</span>
        </div>

        {/* Dismiss */}
        <button 
          onClick={handleClose}
          className="w-full text-white/40 hover:text-white/60 text-xs transition-colors py-2"
        >
          Não, prefiro continuar estagnado
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
