import { Smartphone, Utensils, Brain, TrendingUp, Lock, Zap } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const features = [
  {
    icon: Smartphone,
    title: "Treinos Guiados",
    description: "Treinos organizados por semanas com progressão automática. Nada de montar treino ou interpretar texto."
  },
  {
    icon: Utensils,
    title: "Guia Nutricional",
    description: "Diretrizes práticas: o que comer, quando e por quê. Sem cálculos complexos."
  },
  {
    icon: Brain,
    title: "Metodologias Aplicadas",
    description: "Técnicas avançadas já encaixadas no treino. Intensificação no momento certo."
  },
  {
    icon: TrendingUp,
    title: "Progresso Visual",
    description: "Acompanhamento claro por semana. Sensação de avanço real."
  }
];

const Bonus = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Badge */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <div className="inline-block mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-widest px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-accent/50 bg-accent/15 shadow-lg shadow-accent/20 animate-pulse-glow">
              🎁 Bônus Exclusivo
            </span>
          </div>
          
          {/* Header */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] mb-4 sm:mb-5 px-2 tracking-tight leading-tight">
            Você não precisa ler o e-book para{" "}
            <span className="text-gradient block sm:inline">aplicar o método.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            O <span className="text-accent font-semibold">App 8X</span> entrega tudo pronto para execução.
          </p>
        </div>

        {/* Core Concept - Enhanced */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="bg-gradient-to-br from-card via-card to-card/80 border border-accent/20 rounded-3xl p-7 sm:p-10 text-center shadow-xl shadow-accent/5 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-accent mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Conceito Central</span>
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-3 font-medium">
                O <span className="font-bold">Método 8X</span> é o conhecimento.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl">
                O <span className="text-accent font-bold">App 8X</span> é a <span className="text-accent font-bold">execução.</span>
              </p>
            </div>
          </div>
        </div>

        {/* App Mockup - Enhanced with glow */}
        <div className="flex justify-center mb-14 sm:mb-20 animate-fade-in">
          <div className="relative">
            {/* Glow effect behind phone */}
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-2xl scale-110 animate-pulse-glow" />
            
            {/* Phone frame with real screenshot */}
            <div className="relative bg-gradient-to-b from-card to-card/90 border-2 border-border/80 rounded-[2.5rem] p-3 sm:p-4 max-w-[280px] sm:max-w-[320px] mx-auto shadow-2xl">
              <div className="rounded-[2rem] overflow-hidden border border-border/50 shadow-inner">
                <img 
                  src={appMockup} 
                  alt="App 8X - Sistema de Execução Guiada" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Floating badge - More prominent */}
            <div className="absolute -top-4 -right-3 sm:-right-6 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold shadow-xl shadow-accent/30 animate-pulse-glow border border-accent-foreground/20">
              GRÁTIS
            </div>

            {/* Value indicator */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card border border-border/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg whitespace-nowrap">
              <span className="text-muted-foreground line-through mr-2">R$ 97</span>
              <span className="text-accent font-bold">R$ 0</span>
            </div>
          </div>
        </div>

        {/* Features Grid - 4 Cards Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto mb-14 sm:mb-18">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-card via-card to-card/80 border border-border/80 rounded-2xl p-6 sm:p-7 hover-lift animate-fade-in group shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:scale-110 transition-all duration-300 shadow-inner border border-accent/10">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-2.5 text-foreground tracking-tight font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Anchoring - Enhanced */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-14 animate-fade-in">
          <div className="bg-gradient-to-br from-accent/10 via-card to-accent/5 border-2 border-accent/30 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-accent/10 relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/15 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <p className="text-muted-foreground mb-3 text-sm sm:text-base uppercase tracking-wider font-medium">
                Valor do App 8X:
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5">
                <span className="line-through text-muted-foreground/50 mr-3">R$ 97,00</span>
              </p>
              <div className="bg-accent/20 border border-accent/30 rounded-2xl px-6 py-4 sm:py-5 inline-block">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Hoje: <span className="text-accent">GRÁTIS</span>
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  para quem adquirir o Método 8X
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Phrase - Enhanced */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <div className="inline-block bg-card/50 border border-border/50 rounded-2xl px-6 sm:px-10 py-5 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground italic">
              "Leia se quiser. <span className="text-accent">Execute mesmo sem ler.</span>"
            </p>
          </div>
        </div>

        {/* Exclusivity Badge */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2.5 text-muted-foreground text-sm sm:text-base bg-card/80 px-6 py-3.5 rounded-full border border-border/80 shadow-sm">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <span>Acesso exclusivo e individual — ativado por compra</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
