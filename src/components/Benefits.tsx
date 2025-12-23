import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Saber o que fazer",
    description: "Chega de perder tempo com treinos aleatórios."
  },
  {
    icon: Target,
    title: "Ver progresso real",
    description: "Semana a semana, diferença no espelho."
  },
  {
    icon: TrendingUp,
    title: "Quebrar estagnação",
    description: "Técnicas que forçam evolução contínua."
  },
  {
    icon: Apple,
    title: "Comer sem neura",
    description: "Nutrição simples que funciona."
  },
  {
    icon: Shield,
    title: "Treinar sem lesão",
    description: "Execução correta, sem risco."
  },
  {
    icon: Zap,
    title: "Economizar tempo",
    description: "Treinos eficientes, resultados máximos."
  },
  {
    icon: Brain,
    title: "Ter clareza mental",
    description: "Saber exatamente o que fazer."
  },
  {
    icon: Calendar,
    title: "Manter consistência",
    description: "Plano de 8 semanas que você segue."
  },
];

const Benefits = () => {
  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* Header - Centralizado */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in max-w-lg mx-auto">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 tracking-tight px-2">
            O que muda na sua vida em{" "}
            <span className="text-gradient">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Não é só sobre ganhar músculo. É sobre treinar com confiança.
          </p>
        </div>
        
        {/* Lista de benefícios - Vertical no mobile */}
        <div className="flex flex-col gap-3 max-w-md mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:max-w-4xl sm:gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 bg-card border border-border/80 rounded-xl px-4 py-4 sm:flex-col sm:items-start sm:p-5 hover-lift animate-fade-in shadow-sm hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="sm:mt-3">
                  <h3 className="font-display text-sm sm:text-base text-foreground tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
