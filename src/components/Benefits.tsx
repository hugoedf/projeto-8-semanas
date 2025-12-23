import { Check, Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Saber o que fazer",
    description: "Chega de perder tempo com treinos aleatórios. Cada exercício tem um propósito."
  },
  {
    icon: Target,
    title: "Ver progresso real",
    description: "Semana a semana, você vai sentir a diferença no espelho e na força."
  },
  {
    icon: TrendingUp,
    title: "Quebrar estagnação",
    description: "Técnicas que forçam seu corpo a continuar evoluindo."
  },
  {
    icon: Apple,
    title: "Comer sem neura",
    description: "Nutrição simples que funciona, sem frescura ou complicação."
  },
  {
    icon: Shield,
    title: "Treinar sem lesão",
    description: "Execução correta para não se machucar e não perder tempo parado."
  },
  {
    icon: Zap,
    title: "Economizar tempo",
    description: "Treinos eficientes. Resultados máximos no menor tempo."
  },
  {
    icon: Brain,
    title: "Ter clareza mental",
    description: "Saber exatamente o que fazer elimina a ansiedade do treino."
  },
  {
    icon: Calendar,
    title: "Manter consistência",
    description: "Um plano claro de 8 semanas que você consegue seguir."
  },
];

const Benefits = () => {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 px-2 tracking-tight">
            O que muda na sua vida em{" "}
            <span className="text-gradient">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Não é só sobre ganhar músculo. É sobre treinar com confiança.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border/80 rounded-xl p-4 sm:p-5 hover-lift animate-fade-in group shadow-sm hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-all duration-300">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <h3 className="font-display text-sm sm:text-base mb-1 text-foreground tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
