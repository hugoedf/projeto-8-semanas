import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock, Clock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const benefits = [
  "Sistema completo: E-book + App 8X",
  "8 semanas de treino — execução guiada",
  "Nutrição prática — sem complicação",
  "Técnicas avançadas — no momento certo",
  "Acesso vitalício — seu para sempre",
  "Garantia de 7 dias — risco zero"
];

const CTA = () => {
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
    <section id="cta-section" className={`py-20 sm:py-28 bg-background relative overflow-hidden transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsla(14,100%,60%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/20 rounded-2xl blur-[40px]" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-xl shadow-xl border border-accent/20" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" loading="lazy" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="bg-card border border-accent/20 rounded-xl p-6 sm:p-8">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-accent text-xs uppercase tracking-[0.15em] font-bold mb-3">⚡ OFERTA DE LANÇAMENTO</span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl mt-3 mb-3 tracking-tight text-foreground leading-tight font-bold">
                    Comece hoje. Veja resultados em 8 semanas.
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-muted-foreground text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-6 mb-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-muted-foreground line-through text-lg">R$ 97</span>
                    <span className="text-accent font-display text-3xl sm:text-4xl font-bold">R$ 19,90</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent/60" />
                    <span>Oferta por tempo limitado · Pagamento único</span>
                  </p>
                </div>
                
                <Button variant="cta" size="lg" className="w-full text-sm sm:text-base rounded-full mb-4" onClick={handleCTAClick}>
                  <span>QUERO TREINAR COM MÉTODO</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-accent/50" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
