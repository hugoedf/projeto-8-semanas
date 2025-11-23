import { Check, Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Treino de Hipertrofia Inteligente",
    description: "Aprenda a construir treinos que realmente geram resultados"
  },
  {
    icon: Target,
    title: "Montagem Estratégica",
    description: "Saiba exatamente como estruturar seus treinos semanais"
  },
  {
    icon: TrendingUp,
    title: "Técnicas Avançadas",
    description: "Drop-set, rest-pause, superseries e muito mais"
  },
  {
    icon: Apple,
    title: "Nutrição para Crescer",
    description: "Como comer para ganhar massa muscular de verdade"
  },
  {
    icon: Shield,
    title: "Previna Lesões",
    description: "Técnicas corretas e aquecimento adequado"
  },
  {
    icon: Zap,
    title: "Medir Evolução",
    description: "Acompanhe seu progresso semana a semana"
  },
  {
    icon: Brain,
    title: "Mentalidade Vencedora",
    description: "Desenvolva disciplina e constância"
  },
  {
    icon: Calendar,
    title: "Planejamento 8 Semanas",
    description: "Programa completo do dia 1 ao dia 56"
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-accent font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
              O Que Você Vai Aprender
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Tudo o que você precisa para{" "}
            <span className="text-gradient">transformar seu corpo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um guia completo com estratégias práticas e comprovadas cientificamente
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-accent font-semibold">
            <Check className="w-5 h-5" />
            <span>E muito mais conteúdo exclusivo dentro do ebook</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
