import { Smartphone, Utensils, Brain, TrendingUp, Lock, Zap } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const features = [
  {
    icon: Smartphone,
    title: "Treinos Guiados",
    description: "Semana a semana, tudo pronto. Só seguir."
  },
  {
    icon: Utensils,
    title: "Guia Nutricional",
    description: "O que comer, quando e por quê. Simples assim."
  },
  {
    icon: Brain,
    title: "Metodologias Aplicadas",
    description: "Técnicas avançadas no momento certo."
  },
  {
    icon: TrendingUp,
    title: "Progresso Visual",
    description: "Veja sua evolução semana após semana."
  }
];

const Bonus = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#FF6B35]/20 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-accent/50 bg-accent/15 shadow-lg shadow-accent/30 animate-pulse-glow">
              🎁 Bônus Exclusivo
            </span>
          </div>
          
          {/* Header - Mobile Optimized */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-5 tracking-tight leading-tight text-white">
            <span className="block">Não precisa ler.</span>
            <span className="text-accent block">Só executar.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            O <span className="text-accent font-semibold">App 8X</span> faz o trabalho por você.
          </p>
        </div>

        {/* Core Concept - Compact for Mobile */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-16 animate-fade-in">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-accent mb-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">A Diferença</span>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                <span className="block mb-1">Método 8X = Conhecimento</span>
                <span className="block text-accent font-bold">App 8X = Execução</span>
              </p>
            </div>
          </div>
        </div>

        {/* App Mockup - Mobile Optimized */}
        <div className="flex justify-center mb-10 sm:mb-16 animate-fade-in">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/40 rounded-[2.5rem] blur-[50px] sm:blur-[60px] scale-125" />
            <div className="absolute inset-0 bg-accent/25 rounded-[2.5rem] blur-[80px] sm:blur-[100px] scale-150" />
            
            {/* Phone */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700 rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-4 max-w-[240px] sm:max-w-[300px] mx-auto shadow-2xl shadow-accent/20">
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-600/50 shadow-inner">
                <img 
                  src={appMockup} 
                  alt="App 8X" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* GRÁTIS Badge */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-gradient-to-r from-accent to-accent/90 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-sm sm:text-base font-bold shadow-xl shadow-accent/50 animate-pulse-glow border border-white/20">
              GRÁTIS
            </div>

            {/* Value indicator */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-black/70 border border-white/10 px-3 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
              <span className="text-gray-500 line-through mr-1.5">R$ 97</span>
              <span className="text-accent font-bold">R$ 0</span>
            </div>
          </div>
        </div>

        {/* Features Grid - Mobile First */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto mb-10 sm:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-black/40 border border-white/10 hover:border-accent/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover-lift animate-fade-in group shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300 border border-accent/20">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <h3 className="font-display text-sm sm:text-base mb-1.5 sm:mb-2 text-white tracking-tight font-semibold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Anchoring - Simplified for Mobile */}
        <div className="max-w-lg mx-auto mb-8 sm:mb-12 animate-fade-in">
          <div className="backdrop-blur-xl bg-accent/10 border-2 border-accent/40 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-2xl shadow-accent/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/15 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <p className="text-gray-400 mb-2 text-xs sm:text-sm uppercase tracking-wider font-medium">
                Valor real do App:
              </p>
              <p className="text-lg sm:text-2xl font-medium text-gray-500 mb-4 sm:mb-6">
                <span className="line-through">R$ 97,00</span>
              </p>
              <div className="bg-accent/20 border-2 border-accent/50 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-6 inline-block shadow-lg shadow-accent/20">
                <p className="text-xs sm:text-sm text-gray-300 mb-1 uppercase tracking-wide">Hoje:</p>
                <p className="text-3xl sm:text-5xl font-black text-accent animate-pulse-glow">
                  GRÁTIS
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2">
                  com o Método 8X
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Phrase - Clean & Punchy */}
        <div className="text-center mb-6 sm:mb-10 animate-fade-in">
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-10 py-4 sm:py-6">
            <p className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white">
              <span className="block sm:inline">Leia se quiser.</span>
              <span className="block sm:inline text-accent"> Execute mesmo sem ler.</span>
            </p>
          </div>
        </div>

        {/* Exclusivity Badge - Compact */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 text-gray-400 text-xs sm:text-sm backdrop-blur-xl bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/10 shadow-sm">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
            <span>Acesso exclusivo por compra</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
