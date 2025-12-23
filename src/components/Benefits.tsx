import { Check, Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Treino inteligente",
    description: "Como aplicar estímulos corretos para gerar hipertrofia real."
  },
  {
    icon: Target,
    title: "Montagem estratégica",
    description: "Organizar seus treinos semanais para evitar estagnação."
  },
  {
    icon: TrendingUp,
    title: "Técnicas avançadas",
    description: "Drop-set, rest-pause, superséries e intensificação de forma segura e eficaz."
  },
  {
    icon: Apple,
    title: "Nutrição prática",
    description: "Comer do jeito certo para maximizar hipertrofia."
  },
  {
    icon: Shield,
    title: "Prevenção de lesões",
    description: "Execução correta e aquecimento estruturado para treinar sem parar."
  },
  {
    icon: Zap,
    title: "Acompanhamento real",
    description: "Acompanhe seu progresso semanal de maneira simples e objetiva."
  },
  {
    icon: Brain,
    title: "Mentalidade de disciplina",
    description: "Disciplina, foco e consistência."
  },
  {
    icon: Calendar,
    title: "Plano completo de 8 semanas",
    description: "Do dia 1 ao dia 56, passo a passo."
  },
];

const Benefits = () => {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 px-2 tracking-tight">
            O que você vai dominar em{" "}
            <span className="text-gradient">8 semanas:</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
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
                <p className="text-muted-foreground text-xs leading-relaxed hidden sm:block">
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
