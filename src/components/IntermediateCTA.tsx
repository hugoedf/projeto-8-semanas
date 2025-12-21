import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Sparkles } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useVSLState } from "@/hooks/useVSLState";

const IntermediateCTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { hasVSLEnded } = useVSLState();

  // Não renderiza se o VSL não terminou
  if (!hasVSLEnded) return null;

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
    <section className="py-12 sm:py-16 bg-gradient-to-b from-muted via-accent/5 to-muted animate-fade-in">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-accent/40 bg-accent/10 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFERTA POR TEMPO LIMITADO</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight">
            Pronto para sua{" "}
            <span className="text-gradient">transformação?</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-lg mx-auto">
            Mais de 500 pessoas já começaram. O método está comprovado. A única pergunta é: quando você vai começar?
          </p>

          {/* Preço */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-muted-foreground line-through text-lg">R$ 97</span>
            <span className="text-accent font-display text-3xl sm:text-4xl font-bold">R$ 19,90</span>
          </div>

          {/* Botão */}
          <Button 
            variant="cta" 
            size="lg" 
            onClick={handleCTAClick}
            className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 animate-pulse-glow font-bold tracking-wide shadow-xl shadow-accent/30 uppercase mb-6"
          >
            QUERO COMEÇAR AGORA
            <ArrowRight className="ml-2 w-5 h-5" />
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
