import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock, Clock, Shield, CreditCard, Zap } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const benefits = [
  "E-book + App 8X — o sistema completo",
  "8 semanas estruturadas — só seguir e executar",
  "Nutrição prática — sem dieta maluca",
  "Técnicas avançadas — para quebrar estagnação",
  "Acesso vitalício — seu para sempre",
  "Garantia de 7 dias — risco zero pra você"
];

const CTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (CTA FINAL) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section id="cta-section" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsla(18,100%,58%,0.06),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl mx-auto">
          
          {/* Content Card */}
          <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/10">
            
            {/* Badge */}
            <div className="mb-5 text-center">
              <span className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-bold bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                <Zap className="w-4 h-4" />
                Preço de lançamento
              </span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl mb-3 tracking-tight text-black leading-tight text-center">
              Comece agora. Veja resultados em 8 semanas.
            </h3>
            <p className="text-black/60 text-base sm:text-lg mb-5 text-center">
              Menos que uma refeição — e evita semanas de treino jogadas fora.
            </p>
            
            {/* Benefits */}
            <div className="space-y-2.5 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                  </div>
                  <span className="text-black/80 text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Pricing */}
            <div className="border-t border-black/10 pt-5 mb-5">
              <div className="flex items-baseline justify-center gap-4 mb-2">
                <span className="text-black/40 line-through text-2xl">R$ 97</span>
                <span className="text-accent font-display text-4xl sm:text-5xl font-bold">R$ 19,90</span>
              </div>
              <p className="text-sm text-black/50 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Pagamento único · Acesso imediato · Sem mensalidade</span>
              </p>
            </div>

            {/* URGÊNCIA */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
              <p className="text-red-800 font-bold text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Cada dia sem método é mais uma semana perdida
              </p>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Vagas limitadas para manter qualidade</li>
                <li>• Comece imediatamente e veja resultados</li>
              </ul>
            </div>
            
            {/* GREEN CTA - Decision Button #2 (FINAL) */}
            <Button 
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white mb-3 shadow-xl shadow-green-500/30 text-lg py-6 font-bold"
              size="cta"
            >
              Garantir meu acesso 
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Microcopy under green button */}
            <div className="flex items-center justify-center gap-2 text-black/50 text-xs mb-4 flex-wrap">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
              <span>|</span>
              <span>✅ Acesso Imediato</span>
              <span>|</span>
              <span>🛡️ 7 Dias de Garantia</span>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 text-sm text-black/50">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Garantia 7 dias</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Pix, Cartão</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
