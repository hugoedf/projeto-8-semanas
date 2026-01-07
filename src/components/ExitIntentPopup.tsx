import { useState, useEffect } from "react";
import { X, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();

  useEffect(() => {
    // Verifica se já mostrou nessa sessão
    const alreadyShown = sessionStorage.getItem('exit_popup_shown');
    if (alreadyShown) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detecta quando o mouse vai para o topo da tela (intenção de sair)
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exit_popup_shown', 'true');
      }
    };

    // Também trigger após 60 segundos se não interagiu
    const timeout = setTimeout(() => {
      if (!hasTriggered && !sessionStorage.getItem('exit_popup_shown')) {
        // Não mostrar automaticamente, só no exit intent
      }
    }, 60000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
    };
  }, [hasTriggered]);

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    trackInitiateCheckout(19.90, 'BRL');
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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl max-w-md w-full p-6 sm:p-8 border border-accent/30 shadow-2xl shadow-accent/20 animate-scale-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="font-display text-xl sm:text-2xl text-white mb-2">
            Espera! Você ia sair sem o método?
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">
            Se você fechar agora, volta a treinar no escuro. Mais um mês de esforço sem resultado.
          </p>
          
          {/* Urgency */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
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

        {/* CTA */}
        <Button 
          variant="cta" 
          size="cta" 
          onClick={handleCTAClick}
          className="w-full mb-3"
        >
          ÚLTIMA CHANCE - GARANTIR ACESSO
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

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