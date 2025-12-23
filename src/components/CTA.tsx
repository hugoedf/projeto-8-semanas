import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const benefits = [
  "8 semanas de treino — sem improviso",
  "App 8X incluso — treino guiado",
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

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section 
      id="cta-section" 
      className={`py-14 sm:py-20 bg-background transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-md mx-auto text-center">
          
          {/* Card principal */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-lg animate-fade-in">
            
            {/* Badge */}
            <span className="text-accent text-xs uppercase tracking-widest font-bold">
              ÚLTIMA CHANCE
            </span>
            
            {/* Título */}
            <h2 className="font-display text-lg sm:text-2xl mt-3 mb-2 tracking-tight leading-tight">
              Sua decisão de hoje muda seus próximos 8 anos
            </h2>
            
            <p className="text-muted-foreground text-sm mb-6">
              Tudo isso por menos que uma refeição — e transforma como você treina para sempre.
            </p>
            
            {/* Lista de benefícios - Vertical */}
            <div className="flex flex-col gap-2 mb-6 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Preço destacado */}
            <div className="border-t border-border/60 pt-5 mb-5">
              <div className="flex items-baseline justify-center gap-3 mb-1">
                <span className="text-muted-foreground line-through text-base">
                  R$ 97
                </span>
                <span className="text-accent font-display text-3xl sm:text-4xl font-bold drop-shadow-[0_0_15px_hsl(var(--accent)/0.4)]">
                  R$ 19,90
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Pagamento único · Acesso imediato
              </p>
            </div>
            
            {/* Botão CTA - Full width */}
            <Button 
              variant="cta" 
              size="lg" 
              className="w-full text-sm sm:text-base py-5 sm:py-6 mb-4 animate-pulse-glow font-bold tracking-wide shadow-lg shadow-accent/30 uppercase" 
              onClick={handleCTAClick}
            >
              SIM! QUERO EXECUTAR O MÉTODO 8X
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            {/* Segurança */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>Pagamento 100% seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
