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
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(16,100%,60%,0.1),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Badge de contexto */}
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
            O SISTEMA
          </span>
        </div>
        
        {/* Título - Laranja */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-accent">
            O que muda na sua vida em{" "}
            <span className="text-white">8 semanas</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
            Não é só sobre ganhar músculo. É sobre treinar com método.
          </p>
        </div>
        
        {/* Grid de benefícios - Cards escuros com borda laranja */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-xl p-5 sm:p-6 border-2 border-accent/30 hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.75} />
                </div>
                
                {/* Text content */}
                <h3 className="font-display font-bold text-accent text-base sm:text-lg mb-2 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm" style={{ lineHeight: '1.7' }}>
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
