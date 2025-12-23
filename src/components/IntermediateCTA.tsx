import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const IntermediateCTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { ctaVisible } = useCTAVisibility();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    console.log('✅ ===== CHECKOUT INICIADO (INTERMEDIATE CTA) =====');
    console.log('🔗 URL:', checkoutUrl);
    console.log('📊 Visitor:', visitorData);
    console.log('================================================');

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className={`py-10 sm:py-14 gradient-hero transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-md mx-auto text-center">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Oferta Especial
          </span>
          
          {/* Título */}
          <h3 className="font-display text-lg sm:text-2xl text-white mb-3 tracking-tight leading-tight">
            Pronto para transformar seu treino?
          </h3>
          
          <p className="text-white/70 text-sm mb-5">
            Método completo + App 8X por um preço que cabe no bolso.
          </p>
          
          {/* Preço */}
          <div className="flex items-baseline justify-center gap-2.5 mb-5">
            <span className="text-white/50 line-through text-sm">R$ 97</span>
            <span className="text-accent font-display text-2xl sm:text-3xl font-bold drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]">
              R$ 19,90
            </span>
          </div>
          
          {/* Botão CTA */}
          <Button 
            variant="cta" 
            size="lg" 
            className="w-full text-sm py-5 sm:py-6 mb-4 animate-pulse-glow font-bold tracking-wide shadow-lg shadow-accent/30 uppercase" 
            onClick={handleCTAClick}
          >
            QUERO EVOLUIR AGORA
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              7 dias de garantia
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Acesso imediato
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntermediateCTA;
