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
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className={`py-20 sm:py-28 bg-white transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-4 h-4" />DECISÃO SIMPLES
          </span>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 tracking-tight text-accent">
            Você pode continuar tentando sozinho.<br /><span className="text-[#1a1a1a]">Ou pode seguir um caminho que funciona.</span>
          </h2>

          <p className="text-[#1a1a1a]/70 text-base sm:text-lg mb-8 max-w-lg mx-auto" style={{ lineHeight: '1.8' }}>
            +500 pessoas já aplicaram o método. O método está comprovado. A única pergunta é: quando você vai começar? 
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[#1a1a1a]/40 line-through text-lg">R$ 97</span>
            <span className="text-accent font-display text-4xl sm:text-5xl font-bold">R$ 19,90</span>
          </div>

          <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-sm sm:text-base px-10 py-6 font-bold tracking-wide shadow-xl shadow-accent/40 uppercase mb-8 rounded-full bg-gradient-to-r from-accent to-[#e55a2b] hover:from-[#e55a2b] hover:to-accent border-0">
            GARANTIR MINHA VAGA AGORA
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#1a1a1a]/60">
            <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-accent" /><span>Garantia 7 dias</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /><span>Acesso imediato</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntermediateCTA;