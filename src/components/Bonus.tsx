import { Smartphone, BookOpen, Zap, TrendingUp, Timer, BarChart3, Dumbbell } from "lucide-react";

const Bonus = () => {
  const appFeatures = [
    {
      icon: Dumbbell,
      title: "8 Semanas Programadas",
      description: "Treino pronto, dia a dia"
    },
    {
      icon: Timer,
      title: "Timer Inteligente",
      description: "Descanso otimizado automático"
    },
    {
      icon: TrendingUp,
      title: "Progressão de Cargas",
      description: "Aumento automático, sem achismo"
    },
    {
      icon: BarChart3,
      title: "Acompanhamento",
      description: "Veja sua evolução semana a semana"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-gray-900 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(18,100%,58%,0.12),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Badge & Headline */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-6">
            <Smartphone className="w-4 h-4" />
            O SISTEMA COMPLETO
          </span>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            Isso não é só um e-book, e não é só um app.<br />
            <span className="text-accent">É um Sistema!</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto" style={{ lineHeight: '1.8' }}>
            Conhecimento sem execução é inútil. Por isso o Método 8X une os dois:
          </p>
        </div>

        {/* Two Pillars */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
          {/* Pilar 1 - E-book */}
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/15 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">E-book 8X</h3>
            <p className="text-accent text-xs uppercase tracking-[0.15em] font-bold mb-3">O Mapa</p>
            <p className="text-gray-400 text-sm" style={{ lineHeight: '1.7' }}>
              Conhecimento, técnicas avançadas e ciência — o "porquê" por trás de cada movimento.
            </p>
          </div>
          
          {/* Pilar 2 - App */}
          <div className="bg-accent/10 border-2 border-accent/40 rounded-xl p-6 text-center relative overflow-hidden hover:border-accent/60 transition-all duration-300">
            <div className="absolute top-3 right-3">
              <span className="text-[10px] uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-full font-bold">
                Incluso
              </span>
            </div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/20 flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">App 8X</h3>
            <p className="text-accent text-xs uppercase tracking-[0.15em] font-bold mb-3">O GPS</p>
            <p className="text-gray-300 text-sm" style={{ lineHeight: '1.7' }}>
              Execução guiada no celular — sem pensar, só seguir e progredir.
            </p>
          </div>
        </div>

        {/* App Features */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 max-w-2xl mx-auto mb-8">
          <p className="text-white text-center text-sm font-bold mb-5 uppercase tracking-wider">
            O que você recebe no App 8X:
          </p>
          <div className="grid grid-cols-2 gap-4">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{feature.title}</p>
                  <p className="text-gray-400 text-xs leading-tight mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Anchoring */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">
            Apps de treino cobram <span className="line-through">R$39,90/mês</span>
          </p>
          <div className="inline-flex items-center gap-3 bg-accent/15 rounded-full px-6 py-3 border border-accent/30">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">
              Aqui é <span className="text-accent font-bold">acesso vitalício</span>, incluso no sistema
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
