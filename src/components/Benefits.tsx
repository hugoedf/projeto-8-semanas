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
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-5">
            <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 shadow-sm">
              O Que Você Vai Aprender
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Tudo que realmente importa para{" "}
            <span className="text-gradient">evoluir — sem complicação.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-flex items-center gap-2.5 text-accent font-semibold text-sm sm:text-base bg-accent/5 px-5 py-3 rounded-full border border-accent/20">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>E muito mais conteúdo exclusivo dentro do ebook</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
