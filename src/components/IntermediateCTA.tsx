import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Sparkles } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
const IntermediateCTA = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
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
  return <section className="py-12 sm:py-16 gradient-hero relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(18,100%,58%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-3 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Decisão Simples</span>
          </div>

          {/* Headline emocional */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight text-white leading-[1.15]">
            O método já está pronto.{" "}
            <span className="text-accent">Só falta você começar.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg mb-6 max-w-lg mx-auto">
            +500 pessoas já aplicaram. Os resultados estão comprovados. A pergunta não é se funciona — é quando você vai começar.
          </p>

          {/* Preço com ancoragem */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-white/50 line-through text-xl">R$ 97</span>
            <span className="text-accent font-display text-4xl sm:text-5xl font-bold drop-shadow-[0_0_20px_hsla(18,100%,58%,0.4)]">R$ 19,90</span>
          </div>

          {/* Botão */}
          <Button variant="cta" size="cta" onClick={handleCTAClick} className="mb-6 w-full sm:w-auto">
            Quero treinar com clareza
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default IntermediateCTA;