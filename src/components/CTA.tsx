import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock, Clock, Shield, CreditCard, Zap } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
const benefits = ["E-book + App 8X — o sistema completo", "8 semanas estruturadas — só seguir e executar", "Nutrição prática — sem dieta maluca", "Técnicas avançadas — para quebrar estagnação", "Acesso vitalício — seu para sempre", "Garantia de 7 dias — risco zero pra você"];
const CTA = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
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
  return <section id="cta-section" className="py-16 sm:py-24 bg-[#F9F9F9] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsla(18,100%,58%,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-gray-900 leading-tight mb-4">
              Transforme seu corpo em <span className="text-accent">8 semanas</span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Você poderia gastar centenas de reais em personal trainer ou academias caras, mas hoje o Método 8X completo custa apenas:
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.25)_0%,transparent_60%)] blur-3xl" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-3xl shadow-2xl shadow-black/20" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" width={651} height={977} loading="lazy" decoding="async" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/10">
                
                {/* Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-bold bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                    <Zap className="w-4 h-4" />
                    Preço de lançamento
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight text-gray-900 leading-tight">
                  Comece agora. Veja resultados em 8 semanas.
                </h3>
                <p className="text-gray-500 text-base sm:text-lg mb-6">
                  Menos que uma refeição — e evita semanas de treino jogadas fora.
                </p>
                
                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-base sm:text-lg">{benefit}</span>
                    </div>)}
                </div>
                
                {/* Pricing */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-gray-400 line-through text-2xl">R$ 97</span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-bold">R$ 19,90</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Pagamento único · Acesso imediato · Sem mensalidade</span>
                  </p>
                </div>

                {/* URGÊNCIA */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 font-bold text-sm mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Cada dia sem método é mais uma semana perdida sem evolução
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Vagas limitadas para manter qualidade</li>
                    <li>• Comece imediatamente e veja resultados em 8 semanas</li>
                  </ul>
                </div>
                
                <Button variant="cta" size="cta" className="w-full mb-4 shadow-xl shadow-accent/30 text-lg py-6" onClick={handleCTAClick}>
                  Garantir meu acesso 
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    <span>Garantia 7 dias</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Pix, Cartão </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;