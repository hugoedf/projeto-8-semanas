import { Smartphone, Utensils, Brain, TrendingUp, Lock, Zap } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const features = [
  {
    icon: Smartphone,
    title: "Treinos Guiados",
    description: "Treinos organizados por semanas com progressão automática. Nada de montar treino ou interpretar texto."
  },
  {
    icon: Utensils,
    title: "Guia Nutricional",
    description: "Diretrizes práticas: o que comer, quando e por quê. Sem cálculos complexos."
  },
  {
    icon: Brain,
    title: "Metodologias Aplicadas",
    description: "Técnicas avançadas já encaixadas no treino. Intensificação no momento certo."
  },
  {
    icon: TrendingUp,
    title: "Progresso Visual",
    description: "Acompanhamento claro por semana. Sensação de avanço real."
  }
];

const Bonus = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Background glow effect - orange behind mockup area */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Badge */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <div className="inline-block mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-widest px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-accent/50 bg-accent/15 shadow-lg shadow-accent/30 animate-pulse-glow">
              🎁 Bônus Exclusivo
            </span>
          </div>
          
          {/* Header */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] mb-4 sm:mb-5 px-2 tracking-tight leading-tight text-white">
            Você não precisa ler o e-book para{" "}
            <span className="text-accent block sm:inline">aplicar o método.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed">
            O <span className="text-accent font-semibold">App 8X</span> entrega tudo pronto para execução.
          </p>
        </div>

        {/* Core Concept - Dark glassmorphism */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-10 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-accent mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Conceito Central</span>
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 font-medium">
                O <span className="font-bold">Método 8X</span> é o conhecimento.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-white">
                O <span className="text-accent font-bold">App 8X</span> é a <span className="text-accent font-bold">execução.</span>
              </p>
            </div>
          </div>
        </div>

        {/* App Mockup - Enhanced with strong orange glow */}
        <div className="flex justify-center mb-14 sm:mb-20 animate-fade-in">
          <div className="relative">
            {/* Strong orange glow effect behind phone - "lit" effect */}
            <div className="absolute inset-0 bg-accent/40 rounded-[3rem] blur-[60px] scale-125" />
            <div className="absolute inset-0 bg-accent/25 rounded-[3rem] blur-[100px] scale-150" />
            
            {/* Phone frame with real screenshot */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700 rounded-[2.5rem] p-3 sm:p-4 max-w-[280px] sm:max-w-[320px] mx-auto shadow-2xl shadow-accent/20">
              <div className="rounded-[2rem] overflow-hidden border border-gray-600/50 shadow-inner">
                <img 
                  src={appMockup} 
                  alt="App 8X - Sistema de Execução Guiada" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Floating badge - More prominent */}
            <div className="absolute -top-4 -right-3 sm:-right-6 bg-gradient-to-r from-accent to-accent/90 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold shadow-xl shadow-accent/50 animate-pulse-glow border border-white/20">
              GRÁTIS
            </div>

            {/* Value indicator */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-black/60 border border-white/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg whitespace-nowrap">
              <span className="text-gray-500 line-through mr-2">R$ 97</span>
              <span className="text-accent font-bold">R$ 0</span>
            </div>
          </div>
        </div>

        {/* Features Grid - 4 Cards with Dark Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto mb-14 sm:mb-18">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-black/40 border border-white/10 hover:border-accent/30 rounded-2xl p-6 sm:p-7 hover-lift animate-fade-in group shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-accent/30 group-hover:to-accent/10 group-hover:scale-110 transition-all duration-300 border border-accent/20">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-2.5 text-white tracking-tight font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Anchoring - Enhanced with dark theme */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-14 animate-fade-in">
          <div className="backdrop-blur-xl bg-accent/10 border-2 border-accent/40 rounded-3xl p-8 sm:p-10 text-center shadow-2xl shadow-accent/10 relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/15 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <p className="text-gray-400 mb-3 text-sm sm:text-base uppercase tracking-wider font-medium">
                Valor do App 8X:
              </p>
              <p className="text-xl sm:text-2xl font-medium text-gray-500 mb-5 sm:mb-6">
                <span className="line-through">R$ 97,00</span>
              </p>
              <div className="bg-accent/20 border-2 border-accent/50 rounded-2xl px-8 py-5 sm:py-6 inline-block shadow-lg shadow-accent/20">
                <p className="text-sm text-gray-300 mb-1 uppercase tracking-wide">Hoje:</p>
                <p className="text-4xl sm:text-5xl md:text-6xl font-black text-accent animate-pulse-glow">
                  GRÁTIS
                </p>
                <p className="text-sm sm:text-base text-gray-400 mt-2">
                  para quem adquirir o Método 8X
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Phrase - Enhanced */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-10 py-5 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white italic">
              "Leia se quiser. <span className="text-accent">Execute mesmo sem ler.</span>"
            </p>
          </div>
        </div>

        {/* Exclusivity Badge */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2.5 text-gray-400 text-sm sm:text-base backdrop-blur-xl bg-white/5 px-6 py-3.5 rounded-full border border-white/10 shadow-sm">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <span>Acesso exclusivo e individual — ativado por compra</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
