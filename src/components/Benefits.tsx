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
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-16">
          {/* Badge de contexto */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Transformação</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 px-2 tracking-tight text-foreground leading-tight">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Não é só sobre ganhar músculo. É sobre treinar com confiança.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Número sutil no canto */}
                <span className="absolute top-3 right-4 text-xs font-bold text-muted-foreground/40 font-display">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Ícone com glow sutil no hover */}
                <div className="relative w-12 h-12 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:border-accent/20 transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                
                <h3 className="font-display text-base sm:text-lg mb-2 text-foreground tracking-tight font-semibold">
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