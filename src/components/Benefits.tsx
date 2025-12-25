import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar, type LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
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
    <section className="py-20 sm:py-28 bg-accent relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_40%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Badge de contexto */}
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            O SISTEMA
          </span>
        </div>
        
        {/* Título - centralizado */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-white">
            Tudo que realmente importa para{" "}
            <span className="underline underline-offset-4 decoration-2">evoluir</span> — sem complicação.
          </h2>
        </div>
        
        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.75} />
                </div>
                
                {/* Text content */}
                <h3 className="font-display font-bold text-foreground text-base sm:text-lg mb-2 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm" style={{ lineHeight: '1.7' }}>
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
