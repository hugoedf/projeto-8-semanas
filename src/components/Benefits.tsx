import { Check, Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Treino Inteligente",
    description: "Aprenda como aplicar estímulos corretos para gerar hipertrofia real."
  },
  {
    icon: Target,
    title: "Montagem Estratégica",
    description: "Entenda como organizar seus treinos semanais de forma eficiente."
  },
  {
    icon: TrendingUp,
    title: "Técnicas Avançadas",
    description: "Drop-set, rest-pause, superséries e intensificação de forma segura."
  },
  {
    icon: Apple,
    title: "Nutrição para Crescer",
    description: "Comer do jeito certo para maximizar ganho de massa muscular."
  },
  {
    icon: Shield,
    title: "Previna Lesões",
    description: "Execução correta e aquecimento estruturado para treinar sem parar."
  },
  {
    icon: Zap,
    title: "Medir Evolução",
    description: "Acompanhe seu progresso semanal de maneira simples e prática."
  },
  {
    icon: Brain,
    title: "Mentalidade Vencedora",
    description: "Como desenvolver disciplina, foco e consistência."
  },
  {
    icon: Calendar,
    title: "Planejamento 8 Semanas",
    description: "Programa completo do dia 1 ao dia 56."
  },
];

const Benefits = () => {
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/10">
              O Que Você Vai Aprender
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 px-2">
            Tudo que realmente importa para{" "}
            <span className="text-gradient">evoluir — sem complicação.</span>
          </h2>
        
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-5 sm:p-6 hover-lift animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center px-4">
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm sm:text-base">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>E muito mais conteúdo exclusivo dentro do ebook</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
