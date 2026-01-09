import { Dumbbell, Target, TrendingUp, Zap, Heart, Brain, Shield, Flame } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
const tangibleBenefits = [{
  icon: Dumbbell,
  title: "Hipertrofia Real",
  description: "Ganho de massa muscular equilibrado e consistente.",
  keyword: "Força"
}, {
  icon: Target,
  title: "Quebra de Platôs",
  description: "Elimine a estagnação. Seu corpo evolui toda semana.",
  keyword: "Evolução"
}, {
  icon: TrendingUp,
  title: "Força e Densidade",
  description: "Mais do que estética — você sente a diferença.",
  keyword: "Hipertrofia"
}, {
  icon: Zap,
  title: "Treino Guiado",
  description: "Clareza total. Sem improviso, sem perda de tempo.",
  keyword: "Consistência"
}];
const emotionalBullets = [{
  icon: Flame,
  text: "Corpo que responde no espelho"
}, {
  icon: TrendingUp,
  text: "Mais força, definição e densidade"
}, {
  icon: Brain,
  text: "Clareza total na execução"
}, {
  icon: Heart,
  text: "Evolução previsível toda semana"
}];
const Benefits = () => {
  const parallaxOffset = useParallax({
    speed: 0.05
  });
  return <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" style={{
      transform: `translateY(${parallaxOffset * 0.4}px)`
    }} />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="font-display sm:text-4xl md:text-5xl mb-4 tracking-tight text-black leading-tight text-2xl">
            O que você conquista em <span className="text-accent">8 semanas</span>
          </h2>
          <p className="text-gray-600 sm:text-xl text-base">O que o espelho vai te mostrar em 8 semanas:</p>
        </div>
        
        {/* 4 Cards Horizontais - Benefícios Tangíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-12">
          {tangibleBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return <div key={index} className="group relative bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-lg shadow-black/5 hover:shadow-xl hover:border-accent/30 hover:-translate-y-2 transition-all duration-300">
                {/* Keyword badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-accent font-bold text-xs uppercase tracking-wider bg-accent/10 px-2 py-1 rounded-full">
                    {benefit.keyword}
                  </span>
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-xl font-bold text-black tracking-tight mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>;
        })}
        </div>

        {/* Emotional Benefits - Visual Bullets */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 border border-gray-100 max-w-4xl mx-auto">
          <p className="text-gray-900 font-display text-xl sm:text-2xl font-bold mb-6 text-center">
            O que você vai <span className="text-accent">sentir</span>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emotionalBullets.map((bullet, index) => <div key={index} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <bullet.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-gray-800 text-base font-semibold">
                  ⚡ {bullet.text}
                </span>
              </div>)}
          </div>
        </div>
        
      </div>
    </section>;
};
export default Benefits;