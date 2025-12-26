import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock, Clock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
const benefits = ["Sistema completo: E-book + App 8X", "8 semanas de treino — execução guiada", "Nutrição prática — sem complicação", "Técnicas avançadas — no momento certo", "Acesso vitalício — seu para sempre", "Garantia de 7 dias — risco zero"];
const CTA = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const {
    ctaVisible
  } = useCTAVisibility();
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
  return <section id="cta-section" className={`py-16 sm:py-20 bg-white transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.2)_0%,transparent_60%)] blur-2xl" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl shadow-black/20" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" width={651} height={977} loading="lazy" decoding="async" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-bold bg-accent/8 px-3 py-1.5 rounded-full mb-4">
                    ⚡ Oferta de Lançamento
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight text-black leading-tight">
                    Comece hoje. Veja resultados em 8 semanas.
                  </h2>
                  <p className="text-gray-500 text-base">
                    Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                    </div>)}
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-gray-400 line-through text-xl">R$ 97</span>
                    <span className="text-accent font-display text-3xl sm:text-4xl font-bold">R$ 19,90</span>
                  </div>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Oferta por tempo limitado · Pagamento único · Acesso imediato</span>
                  </p>
                </div>
                
                <Button variant="cta" size="cta" className="w-full mb-4" onClick={handleCTAClick}>
                  QUERO RESULTADOS COMO ESSES
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;