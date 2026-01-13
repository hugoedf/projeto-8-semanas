import { Dumbbell, Target, TrendingUp, Zap, Heart, Brain, Flame } from "lucide-react";

const tangibleBenefits = [
  { icon: Dumbbell, title: "Hipertrofia Real", description: "Ganho de massa muscular equilibrado e consistente.", keyword: "Força" },
  { icon: Target, title: "Quebra de Platôs", description: "Elimine a estagnação. Seu corpo evolui toda semana.", keyword: "Evolução" },
  { icon: TrendingUp, title: "Força e Densidade", description: "Mais do que estética — você sente a diferença.", keyword: "Hipertrofia" },
  { icon: Zap, title: "Treino Guiado", description: "Clareza total. Sem improviso, sem perda de tempo.", keyword: "Consistência" }
];

const emotionalBullets = [
  { icon: Flame, text: "Corpo que responde no espelho" },
  { icon: TrendingUp, text: "Mais força, definição e densidade" },
  { icon: Brain, text: "Clareza total na execução" },
  { icon: Heart, text: "Evolução previsível toda semana" }
];

const Benefits = () => {
  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-black leading-tight">
            O que você conquista em <span className="text-accent">8 semanas</span>
          </h2>
        </div>
        
        {/* 4 Cards Horizontais - Benefícios Tangíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10">
          {tangibleBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="group relative bg-white rounded-2xl p-5 lg:p-6 border border-black/5 shadow-lg shadow-black/5 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                {/* Keyword badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-accent font-bold text-xs uppercase tracking-wider bg-accent/10 px-2 py-1 rounded-full">
                    {benefit.keyword}
                  </span>
                </div>
                
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-lg font-bold text-black tracking-tight mb-2">
                  {benefit.title}
                </h3>
                <p className="text-black/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Emotional Benefits - Visual Bullets */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg shadow-black/5 border border-black/5 max-w-4xl mx-auto">
          <p className="text-black font-display text-lg sm:text-xl font-bold mb-5 text-center">
            O que você vai <span className="text-accent">sentir</span>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emotionalBullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-3 bg-white border border-black/5 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <bullet.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-black/80 text-sm font-semibold">
                  ⚡ {bullet.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Benefits;
