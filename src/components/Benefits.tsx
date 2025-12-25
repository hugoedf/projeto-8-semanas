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
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 px-2 tracking-tight text-foreground leading-tight">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Não é só sobre ganhar músculo.<br />
            <span className="font-medium text-foreground">É sobre treinar com método e finalmente ver resultados.</span>
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-3 sm:mt-4 px-2">
            Treinar muda completamente quando você entra na academia sabendo exatamente o que fazer — o treino deixa de ser ansiedade e vira execução.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border/80 rounded-xl p-4 sm:p-5 md:p-6 shadow-md shadow-black/5 hover:shadow-lg transition-all duration-300 flex items-start gap-3 sm:gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                  <h3 className="font-display text-sm sm:text-base md:text-lg mb-1 sm:mb-1.5 text-foreground tracking-tight font-medium">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
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
