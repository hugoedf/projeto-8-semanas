import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock } from "lucide-react";
import gymTraining from "@/assets/gym-training.jpg";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const benefits = [
  "Protocolos de treino para 8 semanas",
  "Técnicas avançadas explicadas passo a passo",
  "Guia de nutrição para hipertrofia",
  "Mentalidade e disciplina",
  "Acesso vitalício",
  "Atualizações gratuitas",
  "Garantia de 7 dias"
];

const CTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    console.log('✅ ===== CHECKOUT INICIADO (CTA) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('📍 Parâmetros capturados:', {
      tracking_id: localStorage.getItem('visitor_id'),
      utm_source: localStorage.getItem('utm_source'),
      utm_medium: localStorage.getItem('utm_medium'),
      utm_campaign: localStorage.getItem('utm_campaign'),
      utm_term: localStorage.getItem('utm_term'),
      utm_content: localStorage.getItem('utm_content'),
      fbclid: localStorage.getItem('fbclid'),
      gclid: localStorage.getItem('gclid'),
      ttclid: localStorage.getItem('ttclid'),
      msclkid: localStorage.getItem('msclkid')
    });
    console.log('========================================');

    trackInitiateCheckout(97, 'BRL');
    window.open(checkoutUrl, "_blank");
  };

  return (
    <section id="cta-section" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/15 rounded-3xl blur-[60px]" />
                <img 
                  alt="Treino de Hipertrofia" 
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift" 
                  src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" 
                />
              </div>
            </div>
            
            {/* Content Card */}
            <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="card-premium rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-glow">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                  <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-widest">
                    OFERTA ESPECIAL — ACESSO COMPLETO AO MÉTODO 8X
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-3 mb-4 text-foreground leading-tight">
                    Tudo o que você precisa para transformar seu corpo com ciência e estratégia:
                  </h2>
                </div>
                
                {/* Benefits List */}
                <div className="space-y-3 sm:space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-foreground text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Pricing */}
                <div className="border-t border-border/50 pt-6 sm:pt-8 mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 mb-2">
                    <span className="text-muted-foreground line-through text-lg sm:text-xl">
                      DE R$ 97,00
                    </span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-bold leading-none">
                      POR APENAS R$ 19,90
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    (Pagamento único — acesso para sempre)
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Acesso imediato. Conteúdo vitalício. Atualizações gratuitas.
                  </p>
                </div>
                
                {/* CTA Button */}
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-base sm:text-lg py-6 sm:py-7 mb-4 animate-pulse-glow font-bold shadow-lg" 
                  onClick={handleCTAClick}
                >
                  QUERO O MÉTODO 8X AGORA 
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>Pagamento 100% seguro e protegido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final CTA Text */}
        <div className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto px-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-display text-foreground mb-4 leading-tight">
            Daqui a 8 semanas, você vai olhar no espelho e{" "}
            <span className="text-accent">agradecer por ter começado hoje.</span>
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            O Método 8X é o próximo passo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
