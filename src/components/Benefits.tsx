import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

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
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 px-2 tracking-tight text-foreground leading-tight">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Não é só sobre ganhar músculo. É sobre treinar com método, sair do escuro e finalmente ver resultados que realmente transformam seu corpo e sua confiança.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 hover-lift group shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-2 text-foreground tracking-tight font-medium">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
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