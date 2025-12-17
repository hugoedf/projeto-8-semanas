import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock } from "lucide-react";
import gymTraining from "@/assets/gym-training.jpg";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
const benefits = ["Protocolos completos de treino para 8 semanas", "Progressão estruturada baseada em fisiologia", "Técnicas avançadas explicadas passo a passo", "Guia prático de nutrição para hipertrofia", "Mentalidade e disciplina para constância real", "Método de autoavaliação e ajustes contínuos", "Acesso vitalício ao conteúdo", "Atualizações gratuitas", "Garantia incondicional de 7 dias"];
const CTA = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const handleCTAClick = () => {
    // 1. Base URL do checkout da Hotmart
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';

    // 2. Construir URL completa com todos os parâmetros de rastreamento
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    // 3. Log detalhado ANTES do redirecionamento
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

    // 4. Disparar evento de InitiateCheckout
    trackInitiateCheckout(97, 'BRL');

    // 5. Abrir checkout em nova aba
    window.location.href = checkoutUrl;
  };
  return <section id="cta-section" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-[60px] scale-95" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl drop-shadow-xl" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
              <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-9 shadow-xl">
                <div className="mb-6 sm:mb-7">
                  <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest">
                    OFERTA ESPECIAL — ACESSO COMPLETO AO MÉTODO 8X
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-3 mb-4 sm:mb-5 tracking-tight leading-tight">Tudo o que você precisa para transformar seu corpo com ciência e estratégia:</h2>
                  <p className="text-accent font-semibold text-base sm:text-lg">
                    Não é motivacional.<br />
                    É protocolo.
                  </p>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-7 sm:mb-9">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 drop-shadow-sm" />
                      <span className="text-foreground text-sm sm:text-base">{benefit}</span>
                    </div>)}
                </div>
                
                
                
                <div className="border-t border-border/60 pt-6 sm:pt-7 mb-6 sm:mb-7">
                  <div className="flex items-baseline gap-3 mb-2.5 flex-wrap">
                    <span className="text-muted-foreground line-through text-xl sm:text-2xl">
                      DE R$ 97,00
                    </span>
                    <span className="text-accent font-display text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-sm">
                      POR APENAS R$ 19,90
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                    Pagamento único · Acesso imediato após o pagamento · Conteúdo vitalício
                  </p>
                </div>
                
                <p className="text-center font-semibold text-sm sm:text-base mb-4 text-primary">
                  ⚠️ Oferta disponível por tempo limitado
                </p>
                
                <Button variant="cta" size="lg" className="w-full text-base sm:text-lg py-6 sm:py-7 mb-4 animate-pulse-glow font-semibold tracking-wide shadow-xl shadow-accent/30" onClick={handleCTAClick}>
                  Quero meu acesso agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-muted-foreground mb-5">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>Pagamento 100% seguro e protegido</span>
                </div>
                
                <div className="bg-muted/50 border border-border/40 rounded-xl p-4 mb-4">
                  <p className="text-muted-foreground text-center text-base font-semibold">
                    Por menos que uma mensalidade de academia, você leva um método estruturado para evoluir de verdade.
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-14 sm:mt-20 text-center max-w-3xl mx-auto px-4">
          <p className="text-xl sm:text-2xl font-display text-foreground mb-3 sm:mb-4 tracking-tight">
            Daqui a 8 semanas, você vai olhar no espelho e{" "}
            <span className="text-accent">agradecer por ter começado hoje.</span>
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            O Método 8X é o próximo passo.
          </p>
        </div>
      </div>
    </section>;
};
export default CTA;