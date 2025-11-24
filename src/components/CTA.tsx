import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Lock } from "lucide-react";
import gymTraining from "@/assets/gym-training.jpg";

const benefits = [
  "8 módulos completos de treino e nutrição",
  "Planilhas editáveis de acompanhamento",
  "Técnicas avançadas de hipertrofia",
  "Guia de nutrição estratégica",
  "Mentalidade e disciplina",
  "Acesso vitalício ao conteúdo",
  "Atualizações gratuitas",
  "Garantia de 7 dias",
];

const CTA = () => {
  const handleCTAClick = () => {
    window.open("https://pay.hotmart.com/O103097031O", "_blank");
  };

  return (
    <section id="cta-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <img
                  src={gymTraining}
                  alt="Treino de Hipertrofia"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="mb-6">
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">
                    Oferta Especial
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl mt-2 mb-4">
                    Tudo o que você precisa para transformar seu corpo
                  </h2>
                </div>
                
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-muted-foreground line-through text-2xl">
                      R$ 197,00
                    </span>
                    <span className="text-accent font-display text-5xl font-bold">
                      R$ 97,00
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ou 12x de R$ 9,70 no cartão
                  </p>
                </div>
                
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full text-lg py-6 mb-4 animate-pulse-glow"
                  onClick={handleCTAClick}
                >
                  Quero Começar Agora
                  <ArrowRight className="ml-2" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Pagamento 100% seguro e protegido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-2xl font-display text-foreground mb-4">
            Daqui 8 semanas você vai olhar no espelho e{" "}
            <span className="text-accent">agradecer por ter começado hoje.</span>
          </p>
          <p className="text-lg text-muted-foreground">
            Não deixe para depois. Seu corpo merece essa transformação. 💪
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
