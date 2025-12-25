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
      className={`py-24 sm:py-32 bg-white relative overflow-hidden transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image - Enhanced Frame */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-[40px]" />
                <img 
                  alt="Treino de Hipertrofia" 
                  className="relative z-10 w-full h-auto rounded-2xl shadow-xl border-4 border-accent" 
                  src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" 
                  width={651} 
                  height={977} 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
            </div>
            
            {/* Content - Enhanced */}
            <div className="order-1 lg:order-2">
              <div className="bg-[#050505] border border-accent/30 rounded-3xl p-8 sm:p-10 shadow-xl">
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 text-accent text-xs uppercase tracking-[0.2em] font-bold mb-4">⚡ OFERTA DE LANÇAMENTO</span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-4 mb-4 tracking-tight text-white leading-tight font-extrabold">
                    Comece hoje. Veja resultados em 8 semanas.
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
                  </p>
                </div>
                
                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-gray-200 text-base sm:text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700/50 pt-8 mb-8">
                  <div className="flex items-baseline gap-5 mb-4">
                    <span className="text-gray-500 line-through text-xl">R$ 97</span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-extrabold">R$ 19,90</span>
                  </div>
                  <p className="text-base text-gray-400 flex items-center justify-start gap-2">
                    <Clock className="w-5 h-5 text-accent/70" />
                    <span>Oferta por tempo limitado · Pagamento único · Acesso imediato</span>
                  </p>
                </div>
                
                <Button 
                  variant="cta" 
                  size="xl" 
                  className="w-full text-base sm:text-lg py-7 mb-5 tracking-wide rounded-full" 
                  onClick={handleCTAClick}
                >
                  <span>QUERO TREINAR COM MÉTODO</span>
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                
                <div className="flex items-center justify-center gap-3 text-base text-gray-400">
                  <Lock className="w-5 h-5 text-accent/60" />
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
