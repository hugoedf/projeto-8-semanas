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
      className={`py-20 sm:py-28 bg-gray-900 relative overflow-hidden transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/25 rounded-2xl blur-[50px] scale-95" />
                <img 
                  alt="Treino de Hipertrofia" 
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-white/10" 
                  src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" 
                  width={651} 
                  height={977} 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
                <div className="mb-6">
                  <span className="text-accent text-xs uppercase tracking-[0.2em] font-bold">⚡ OFERTA DE LANÇAMENTO</span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl mt-3 mb-3 tracking-tight text-white leading-tight">
                    Comece hoje. Veja resultados em 8 semanas.
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-6 mb-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-gray-500 line-through text-lg">R$ 97</span>
                    <span className="text-accent font-display text-3xl sm:text-4xl font-bold">R$ 19,90</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center justify-start gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Oferta por tempo limitado · Pagamento único · Acesso imediato</span>
                  </p>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-xs sm:text-base py-5 sm:py-6 mb-4 font-bold tracking-wide shadow-xl shadow-accent/30 uppercase rounded-full" 
                  onClick={handleCTAClick}
                >
                  <span>QUERO TREINAR COM MÉTODO</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
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
