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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 group flex items-start gap-4 sm:gap-5"
              >
                {/* Icon container - Large and prominent */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                </div>
                
                {/* Text content */}
                <div className="flex-1 pt-0.5">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-gray-900 tracking-tight mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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