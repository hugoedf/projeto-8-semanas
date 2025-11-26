import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock } from "lucide-react";
import gymTraining from "@/assets/gym-training.jpg";
import { useMetaPixel } from "@/hooks/useMetaPixel";

const benefits = ["8 módulos completos de treino e nutrição", "Técnicas avançadas de hipertrofia", "Guia de nutrição estratégica", "Mentalidade e disciplina", "Acesso vitalício ao conteúdo", "Atualizações gratuitas", "Garantia de 7 dias"];

const CTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  
  const handleCTAClick = () => {
    // Dispara evento de InitiateCheckout antes de redirecionar
    trackInitiateCheckout(97, 'BRL');
    window.open("https://pay.hotmart.com/O103097031O", "_blank");
  };
  return <section id="cta-section" className="py-12 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <img alt="Treino de Hipertrofia" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl" src="/lovable-uploads/22c8ae88-1ad8-436a-a6f8-af3a7af011a3.jpg" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
              <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-xl">
                <div className="mb-5 sm:mb-6">
                  <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider">
                    Oferta Especial
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2 mb-3 sm:mb-4">
                    Tudo o que você precisa para transformar seu corpo
                  </h2>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm sm:text-base">{benefit}</span>
                    </div>)}
                </div>
                
                <div className="border-t border-border pt-5 sm:pt-6 mb-5 sm:mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-muted-foreground line-through text-xl sm:text-2xl">
                      R$ 97,00
                    </span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-bold">
                      R$ 19,90
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ou 12x de R$ 1,66 no cartão
                  </p>
                </div>
                
                <Button variant="cta" size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6 mb-3 sm:mb-4 animate-pulse-glow" onClick={handleCTAClick}>
                  Quero Começar Agora
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Pagamento 100% seguro e protegido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto px-4">
          <p className="text-xl sm:text-2xl font-display text-foreground mb-3 sm:mb-4">
            Daqui 8 semanas você vai olhar no espelho e{" "}
            <span className="text-accent">agradecer por ter começado hoje.</span>
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Não deixe para depois. Seu corpo merece essa transformação. 💪
          </p>
        </div>
      </div>
    </section>;
};
export default CTA;