import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock, Clock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const benefits = ["Sistema completo: E-book + App 8X", "8 semanas de treino — execução guiada", "Nutrição prática — sem complicação", "Técnicas avançadas — no momento certo", "Acesso vitalício — seu para sempre", "Garantia de 7 dias — risco zero"];

const CTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { ctaVisible } = useCTAVisibility();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible, getItemStyle } = useStaggeredAnimation(benefits.length, 80, 'fadeUp');

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (CTA) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section 
      id="cta-section" 
      ref={sectionRef}
      className={`py-12 sm:py-16 bg-background transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div 
              className="order-2 lg:order-1"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-[40px] scale-95" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-xl shadow-xl" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" width={651} height={977} loading="lazy" decoding="async" />
              </div>
            </div>
            
            {/* Content */}
            <div 
              className="order-1 lg:order-2"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s'
              }}
            >
              <div className="bg-card border border-border/80 rounded-xl p-5 sm:p-7 shadow-lg">
                <div className="mb-5">
                  <span className="text-accent text-xs uppercase tracking-widest font-bold">⚡ OFERTA DE LANÇAMENTO</span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl mt-2 mb-2 tracking-tight leading-tight">
                    Comece hoje. Veja resultados em 8 semanas.
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
                  </p>
                </div>
                
                <div ref={benefitsRef} className="space-y-2.5 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2.5" style={getItemStyle(index)}>
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border/60 pt-5 mb-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-muted-foreground line-through text-lg">R$ 97</span>
                    <span className="text-accent font-display text-2xl sm:text-3xl font-bold animate-pulse-scale">R$ 19,90</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center justify-start gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Oferta por tempo limitado · Pagamento único · Acesso imediato</span>
                  </p>
                </div>
                
                <Button variant="cta" size="lg" className="w-full max-w-full text-xs sm:text-base py-5 sm:py-6 mb-3 animate-pulse-glow font-bold tracking-wide shadow-lg shadow-accent/30 uppercase whitespace-normal leading-tight px-3 sm:px-6" onClick={handleCTAClick}>
                  <span className="flex-1 text-center">GARANTIR MINHA VAGA AGORA</span>
                  <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 flex-shrink-0" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5" />
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