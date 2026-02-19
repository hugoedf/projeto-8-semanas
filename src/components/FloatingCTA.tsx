import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Clock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFinalCtaVisible, setIsFinalCtaVisible] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();

  // 1) Detecta quando a CTA final está visível (pra SUMIR o floating nessa hora)
  useEffect(() => {
    const el = document.getElementById("cta-section");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // quando a CTA final entra na tela, escondemos o floating
        setIsFinalCtaVisible(entry.isIntersecting);
      },
      {
        // Ajuste fino: quando ~25% do bloco aparecer, já consideramos "chegou na CTA final"
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2) Lógica original: aparece com 40% de scroll (sem “timer”)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

          // evita NaN quando página é curta
          const scrollPercentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // força checagem inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleCTAClick = () => {
    const baseUrl =
      "https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465";
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    trackInitiateCheckout(19.9, "BRL");
    window.location.href = checkoutUrl;
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Se não está visível, ou foi dispensado, ou chegou na CTA final -> não renderiza
  if (!isVisible || isDismissed || isFinalCtaVisible) return null;

  return (
    <>
      {/* MOBILE: Bottom bar (mais suave, menos agressiva) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-in-bottom">
        <div className="bg-black/80 backdrop-blur-md border-t border-white/10 shadow-2xl px-3 py-3 safe-area-inset-bottom">
          <div className="flex items-center justify-between gap-2">
            {/* Price */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white/35 line-through text-xs">R$97</span>
              <span className="text-accent font-bold text-lg">R$19,90</span>
            </div>

            {/* CTA Button (opacidade menor + hover mais forte) */}
            <Button
              variant="cta"
              size="sm"
              onClick={handleCTAClick}
              className="
                text-xs px-4 py-3 font-bold uppercase whitespace-nowrap
                bg-accent/85 hover:bg-accent
                shadow-lg shadow-accent/20
                transition-all
              "
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

      {/* DESKTOP: Side floating (mais elegante e menos pesado) */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block animate-slide-in-right">
        <div className="bg-black/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 border border-white/10 p-4 max-w-xs">
          {/* Urgency */}
          <div className="flex items-center gap-2 text-red-400/90 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Oferta por tempo limitado</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/35 line-through text-sm">R$97</span>
            <span className="text-accent font-display text-2xl font-bold">
              R$19,90
            </span>
          </div>

          {/* CTA */}
          <Button
            variant="cta"
            size="sm"
            onClick={handleCTAClick}
            className="
              w-full text-sm font-bold uppercase
              bg-accent/85 hover:bg-accent
              shadow-lg shadow-accent/20
              transition-all
            "
          >
            GARANTIR ACESSO
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Trust */}
          <p className="text-white/45 text-xs text-center mt-2">
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
