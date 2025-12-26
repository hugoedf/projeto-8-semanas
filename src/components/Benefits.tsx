import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
const benefits = [{
  icon: Dumbbell,
  title: "Você sabe o que fazer",
  description: "Cada exercício tem propósito. Zero dúvida, zero improviso."
}, {
  icon: Target,
  title: "Você vê progresso real",
  description: "Semana a semana, o espelho e a força confirmam."
}, {
  icon: TrendingUp,
  title: "Você quebra a estagnação",
  description: "Técnicas que forçam seu corpo a continuar evoluindo."
}, {
  icon: Apple,
  title: "Você come sem neura",
  description: "Nutrição simples que funciona, sem frescura."
}, {
  icon: Shield,
  title: "Você treina sem lesão",
  description: "Execução correta. Sem se machucar, sem parar."
}, {
  icon: Zap,
  title: "Você economiza tempo",
  description: "Treinos eficientes. Resultados máximos no menor tempo."
}, {
  icon: Brain,
  title: "Você tem clareza mental",
  description: "Saber o que fazer elimina a ansiedade do treino."
}, {
  icon: Calendar,
  title: "Você mantém consistência",
  description: "Um plano claro de 8 semanas que você consegue seguir."
}];
const Benefits = () => {
  const parallaxOffset = useParallax({
    speed: 0.05
  });
  return <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Subtle gradient overlay with parallax */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" style={{
      transform: `translateY(${parallaxOffset * 0.4}px)`
    }} />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-black/40 mb-5">
            ​
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] mb-6 tracking-tight text-black leading-[1.1]">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          <p className="text-black/60 text-lg sm:text-xl mb-5 max-w-2xl mx-auto">
            Não é só sobre ganhar músculo.
            <span className="font-medium text-black"> É sobre treinar com método e finalmente ver resultados.</span>
          </p>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          // Make first two cards span 2 columns on large screens
          const isLarge = index < 2;
          return <div key={index} className={`group relative bg-white rounded-2xl p-6 lg:p-7 border border-black/[0.06] shadow-sm hover:border-accent/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${isLarge ? 'lg:col-span-2' : ''}`}>
                {/* Icon container */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-accent" strokeWidth={1.5} />
                </div>
                
                {/* Text content */}
                <h3 className="font-display text-lg lg:text-xl font-bold text-black tracking-tight mb-2">
                  {benefit.title}
                </h3>
                <p className="text-black/60 text-sm lg:text-base leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>;
        })}
        </div>
        
        {/* Bottom insight */}
        <div className="text-center mt-14 lg:mt-16 max-w-2xl mx-auto">
          <p className="text-black/40 text-sm sm:text-base">
            Treinar muda completamente quando você entra na academia sabendo exatamente o que fazer — <span className="text-black/60 font-medium">o treino deixa de ser ansiedade e vira execução.</span>
          </p>
        </div>
      </div>
    </section>;
};
export default Benefits;