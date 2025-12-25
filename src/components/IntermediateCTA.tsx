import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock } from "lucide-react";
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
    <section className={`py-20 sm:py-28 bg-secondary relative overflow-hidden transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 tracking-tight text-foreground font-bold">
            Você pode continuar tentando sozinho.<br />
            <span className="text-accent">Ou pode seguir um caminho que funciona.</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto" style={{ lineHeight: '1.8' }}>
            +500 pessoas já aplicaram o método. O método está comprovado. A única pergunta é: quando você vai começar? 
          </p>

          {/* Preço */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-muted-foreground line-through text-lg">R$ 97</span>
            <span className="text-accent font-display text-4xl sm:text-5xl font-bold">R$ 19,90</span>
          </div>

          {/* Botão */}
          <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-sm sm:text-base px-10 mb-8 rounded-full">
            GARANTIR MINHA VAGA AGORA
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              <span>Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntermediateCTA;
