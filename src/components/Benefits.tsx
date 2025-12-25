import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar, type LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  size?: "normal" | "large";
}

const benefits: Benefit[] = [
  {
    icon: Dumbbell,
    title: "Você sabe o que fazer",
    description: "Cada exercício tem propósito. Zero dúvida, zero improviso.",
    size: "large"
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
    description: "Nutrição simples que funciona, sem frescura.",
    size: "large"
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

const BenefitCard = ({ benefit, index }: { benefit: Benefit; index: number }) => {
  const Icon = benefit.icon;
  const isLarge = benefit.size === "large";
  
  return (
    <div
      className={`
        group relative bg-white rounded-2xl shadow-md shadow-black/[0.04] border border-slate-100
        hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/[0.1] hover:border-accent/20
        transition-all duration-300 ease-out overflow-hidden
        ${isLarge ? "sm:col-span-2 sm:row-span-1" : ""}
      `}
    >
      {/* Gradient hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className={`relative p-6 sm:p-7 ${isLarge ? "sm:flex sm:items-center sm:gap-6" : ""}`}>
        {/* Icon container - Large and prominent */}
        <div className={`
          flex-shrink-0 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/15
          flex items-center justify-center mb-4
          group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-300
          ${isLarge ? "w-14 h-14 sm:w-16 sm:h-16 sm:mb-0" : "w-12 h-12 sm:w-14 sm:h-14"}
        `}>
          <Icon className={`text-accent ${isLarge ? "w-7 h-7 sm:w-8 sm:h-8" : "w-6 h-6 sm:w-7 sm:h-7"}`} strokeWidth={1.75} />
        </div>
        
        {/* Text content */}
        <div className="flex-1">
          <h3 className={`
            font-display font-bold text-slate-900 tracking-[-0.02em] mb-1.5
            ${isLarge ? "text-lg sm:text-xl" : "text-base sm:text-lg"}
          `}>
            {benefit.title}
          </h3>
          <p className={`
            text-slate-600
            ${isLarge ? "text-base" : "text-sm sm:text-base"}
          `} style={{ lineHeight: '1.7' }}>
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Título - próximo dos cards */}
        <div className="text-center mb-10 sm:mb-12 max-w-[650px] mx-auto">
          {/* Badge de contexto */}
          <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.15em] mb-4">
            O Sistema
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-[-0.02em] text-foreground">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base" style={{ lineHeight: '1.75' }}>
            Não é só sobre ganhar músculo. É sobre treinar com método.
          </p>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
