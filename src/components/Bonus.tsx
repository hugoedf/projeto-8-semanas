import { Smartphone, BookOpen, Zap, TrendingUp, Timer, BarChart3, Dumbbell, Gift } from "lucide-react";

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
    <section className="py-10 sm:py-14 relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">
        <div>
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-accent/15 border border-accent/30">
              <Smartphone className="w-4 h-4" />
              O Sistema Completo
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight mb-2">
            Isso não é conteúdo.<br />
            <span className="text-accent">
              É o Método 8X completo com sistema, app e bônus.
            </span>
          </h2>

          <p className="text-white/60 text-center text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Conhecimento sem execução é inútil. Por isso o Método 8X une tudo o que você precisa para evoluir.
          </p>
        </div>

        <p className="text-white/50 text-sm text-center italic mb-4">
          Você não precisa decidir todo dia. Só executar.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-0.5">E-book 8X</h3>
            <p className="text-accent text-xs uppercase tracking-wider mb-1.5">O Mapa</p>
            <p className="text-white/60 text-sm">
              Estratégia, ciência e técnicas para entender exatamente por que o método funciona.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                Incluso
              </span>
            </div>
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-accent/30 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-white font-bold text-lg mb-0.5">App 8X</h3>
            <p className="text-accent text-xs uppercase tracking-wider mb-1.5">O GPS</p>
            <p className="text-gray-300 text-sm">
              Execução guiada no celular — sem pensar, só seguir e progredir.
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 max-w-2xl mx-auto mb-4">
          <p className="text-white text-center text-sm font-semibold mb-3">
            O que você recebe no App 8X:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    {feature.title}
                  </p>
                  <p className="text-white/50 text-[11px] leading-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BÔNUS */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 max-w-2xl mx-auto mb-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/25 flex items-center justify-center flex-shrink-0">
            <Gift className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm text-white">
            <span className="text-accent font-bold">BÔNUS INCLUSO HOJE:</span>{" "}
            E-book <strong>15 Receitas Anabólicas</strong> para acelerar seus resultados
            sem dietas impossíveis.
          </p>
        </div>

        <div className="text-center">
          <p className="text-white/60 text-sm italic mb-3">
            Sistema completo + App + E-book + Bônus — por menos que uma refeição.
          </p>

          <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-5 py-2.5 border border-accent/25">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">
              <span className="text-accent">Acesso vitalício</span> — pague uma vez, use pra sempre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
