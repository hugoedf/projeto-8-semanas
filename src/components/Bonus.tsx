import { Smartphone, BookOpen, Zap, Target, TrendingUp, Timer, BarChart3, Dumbbell } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

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
    <section className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Badge */}
        <div className="text-center mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-accent/15 border border-accent/30">
            <Smartphone className="w-4 h-4" />
            O Sistema Completo
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight mb-3 animate-fade-in">
          Você não compra um e-book.<br />
          <span className="text-accent">Você entra em um Sistema.</span>
        </h2>

        <p className="text-gray-400 text-center text-sm sm:text-base mb-8 max-w-xl mx-auto animate-fade-in">
          Conhecimento sem execução é inútil. Por isso o Método 8X une os dois:
        </p>

        {/* Two Pillars */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 animate-fade-in">
          {/* Pilar 1 - E-book */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">E-book 8X</h3>
            <p className="text-accent text-xs uppercase tracking-wider mb-2">O Mapa</p>
            <p className="text-gray-400 text-sm">
              Conhecimento, técnicas avançadas e ciência — o "porquê" por trás de cada movimento.
            </p>
          </div>
          
          {/* Pilar 2 - App */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                Incluso
              </span>
            </div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/30 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">App 8X</h3>
            <p className="text-accent text-xs uppercase tracking-wider mb-2">O GPS</p>
            <p className="text-gray-300 text-sm">
              Execução guiada no celular — sem pensar, só seguir e progredir.
            </p>
          </div>
        </div>

        {/* App Features */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 max-w-2xl mx-auto mb-6 animate-fade-in">
          <p className="text-white text-center text-sm font-semibold mb-4">
            O que você recebe no App 8X:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">{feature.title}</p>
                  <p className="text-gray-500 text-[11px] leading-tight">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Anchoring */}
        <div className="text-center animate-fade-in">
          <p className="text-gray-500 text-xs mb-2">
            Apps de treino cobram <span className="line-through">R$29/mês</span>
          </p>
          <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-5 py-2.5 border border-accent/25">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">
              Aqui é <span className="text-accent">acesso vitalício</span>, incluso no sistema
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
