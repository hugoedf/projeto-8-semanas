import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Clock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const DISMISS_KEY = "floating_cta_dismissed_v1";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasQualified, setHasQualified] = useState(false); // passou do “momento certo”
  const { trackInitiateCheckout } = useMetaPixel();

  // 1) Persistência do dismiss (player)
  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  // 2) Qualificação: só aparece depois de scroll OU tempo (player)
  useEffect(() => {
    if (isDismissed) return;

    const timer = window.setTimeout(() => {
      setHasQualified(true);
    }, 10000); // 10s

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // gatilho de scroll “player”: não aparece cedo demais
        if (window.scrollY > 600) setHasQualified(true);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDismissed]);

  // 3) Regra de ouro: some quando CTA final estiver visível (não compete)
  useEffect(() => {
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    // Só pode aparecer se o usuário já “qualificou”
    if (!hasQualified) {
      setIsVisible(false);
      return;
    }

    const cta = document.getElementById("cta-section");
    if (!cta) {
      // fallback: se não achou CTA, mostra depois de qualificar
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // CTA final na tela? some. Fora da tela? pode mostrar.
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    observer.observe(cta);

    return () => observer.disconnect();
  }, [hasQualified, isDismissed]);

  const handleCTAClick = () => {
    const baseUrl =
      "https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465";
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    trackInitiateCheckout(19.9, "BRL");
    window.location.href = checkoutUrl;
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile - Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-in-bottom">
        <div className="bg-black/80 backdrop-blur-md border-t border-accent/30 shadow-2xl px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          <div className="flex items-center justify-between gap-2">
            {/* Price */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white/40 line-through text-xs">R$97</span>
              <span className="text-accent font-bold text-lg">R$19,90</span>
            </div>

            {/* CTA Button */}
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

      {/* Desktop - Side floating bar */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block animate-slide-in-right">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 border border-accent/30 p-4 max-w-xs relative">
          {/* Urgency */}
          <div className="flex items-center gap-2 text-red-400 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Oferta por tempo limitado</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/40 line-through text-sm">R$97</span>
            <span className="text-accent font-display text-2xl font-bold">
              R$19,90
            </span>
          </div>

          {/* CTA */}
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
