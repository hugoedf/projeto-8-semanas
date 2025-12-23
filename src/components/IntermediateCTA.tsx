import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Sparkles } from "lucide-react";
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
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('================================================');

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className={`py-12 sm:py-16 bg-gradient-to-b from-muted via-accent/5 to-muted transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-accent/40 bg-accent/10 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DECISÃO SIMPLES</span>
          </div>

          {/* Headline emocional */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight">
            Você pode continuar tentando sozinho.<br />
            <span className="text-gradient">Ou pode seguir um caminho que funciona.</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-lg mx-auto">
            +500 pessoas já aplicaram o método. Menos que uma refeição para transformar seus próximos 8 anos de treino.
          </p>

          {/* Preço com ancoragem */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-muted-foreground line-through text-lg">R$ 97</span>
            <span className="text-accent font-display text-3xl sm:text-4xl font-bold">R$ 19,90</span>
          </div>

          {/* Botão com prazo específico */}
          <Button 
            variant="cta" 
            size="lg" 
            onClick={handleCTAClick}
            className="text-xs sm:text-base px-4 sm:px-10 py-5 sm:py-6 animate-pulse-glow font-bold tracking-wide shadow-lg shadow-accent/30 uppercase mb-6 w-full sm:w-auto max-w-full whitespace-normal leading-tight"
          >
            <span className="flex-1 text-center">QUERO EVOLUIR NAS PRÓXIMAS 8 SEMANAS</span>
            <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 flex-shrink-0" />
          </Button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-accent" />
              <span>Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntermediateCTA;
