import { Smartphone, Utensils, Brain, TrendingUp, Gift, Lock } from "lucide-react";
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
    description: "Acompanhamento claro por semana. Sensação de avanço real. Disciplina sem esforço mental."
  }
];

const Bonus = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Badge */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 shadow-sm">
              <Gift className="w-4 h-4" />
              Bônus Exclusivo
            </span>
          </div>
          
          {/* Header */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Você não precisa ler o e-book para{" "}
            <span className="text-gradient">aplicar o método.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            O App 8X entrega tudo pronto para execução.
          </p>
        </div>

        {/* Core Concept */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              O <span className="text-foreground font-semibold">Método 8X</span> é o conhecimento.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground">
              O <span className="text-accent font-semibold">App 8X</span> é a execução.
            </p>
          </div>
        </div>

        {/* App Mockup Placeholder + Features */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 max-w-6xl mx-auto">
          {/* App Mockup Real */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative">
              {/* Phone frame with real screenshot */}
              <div className="bg-card border border-border/80 rounded-[2.5rem] p-3 sm:p-4 max-w-[280px] mx-auto shadow-lg">
                <div className="rounded-[2rem] overflow-hidden border border-border/50">
                  <img 
                    src={appMockup} 
                    alt="App 8X - Sistema de Execução Guiada" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 lg:right-4 bg-accent text-accent-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse-glow">
                GRÁTIS
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="order-1 lg:order-2 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border/80 rounded-2xl p-6 sm:p-7 hover-lift animate-fade-in group shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300 shadow-inner">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg mb-2.5 text-foreground tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Anchoring */}
        <div className="max-w-xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="bg-card border border-accent/30 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <p className="text-muted-foreground mb-2 text-sm sm:text-base">
              Valor do App 8X:
            </p>
            <p className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              <span className="line-through text-muted-foreground/60">R$ 97,00</span>
            </p>
            <p className="text-lg sm:text-xl font-bold">
              Hoje: <span className="text-accent">GRÁTIS</span>{" "}
              <span className="text-foreground">para quem adquirir o Método 8X</span>
            </p>
          </div>
        </div>

        {/* Impact Phrase */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <p className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-foreground italic px-4">
            "Leia se quiser. Execute mesmo sem ler."
          </p>
        </div>

        {/* Exclusivity Badge */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2.5 text-muted-foreground text-sm sm:text-base bg-muted/50 px-5 py-3 rounded-full border border-border/80">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <span>Acesso exclusivo e individual — ativado por compra</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
