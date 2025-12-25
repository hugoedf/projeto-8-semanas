import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Você sabe o que fazer",
    description: "Cada exercício tem propósito. Zero dúvida, zero improviso."
  },
  {
    icon: Target,
    title: "Você vê progresso real",
    description: "Semana a semana, o espelho e a força confirmam."
  },
  {
    icon: TrendingUp,
    title: "Você quebra a estagnação",
    description: "Técnicas que forçam seu corpo a continuar evoluindo."
  },
  {
    icon: Apple,
    title: "Você come sem neura",
    description: "Nutrição simples que funciona, sem frescura."
  },
  {
    icon: Shield,
    title: "Você treina sem lesão",
    description: "Execução correta. Sem se machucar, sem parar."
  },
  {
    icon: Zap,
    title: "Você economiza tempo",
    description: "Treinos eficientes. Resultados máximos no menor tempo."
  },
  {
    icon: Brain,
    title: "Você tem clareza mental",
    description: "Saber o que fazer elimina a ansiedade do treino."
  },
  {
    icon: Calendar,
    title: "Você mantém consistência",
    description: "Um plano claro de 8 semanas que você consegue seguir."
  },
];

const Benefits = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-14 sm:mb-18 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 tracking-tight text-foreground">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-4">
            Não é só sobre ganhar músculo.
            <span className="font-medium text-foreground"> É sobre treinar com método e finalmente ver resultados.</span>
          </p>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Treinar muda completamente quando você entra na academia sabendo exatamente o que fazer — o treino deixa de ser ansiedade e vira execução.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card-premium group flex items-start gap-5"
              >
                {/* Icon container - Large and prominent */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                </div>
                
                {/* Text content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground tracking-tight mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
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