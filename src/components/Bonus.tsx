import {
  Smartphone,
  BookOpen,
  Zap,
  TrendingUp,
  Timer,
  BarChart3,
  Dumbbell
} from "lucide-react";

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
      description: "Descanso otimizado automaticamente"
    },
    {
      icon: TrendingUp,
      title: "Progressão de Cargas",
      description: "Evolução sem achismo"
    },
    {
      icon: BarChart3,
      title: "Acompanhamento",
      description: "Veja sua evolução semanal"
    }
  ];

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden gradient-hero">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">

        {/* Badge */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-accent/15 border border-accent/30">
            <Smartphone className="w-4 h-4" />
            Bônus Exclusivos
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight mb-2">
          Bônus Exclusivos ao  
          <br />
          <span className="text-accent">Garantir Hoje</span>
        </h2>

        <p className="text-white/60 text-center text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Tudo integrado no app + ebook para praticidade total.
        </p>

        {/* Três Bônus */}
        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-6">
          {/* Bônus 1 */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-bold text-base mb-0.5">
              1️⃣ Guia de Nutrição
            </h3>
            <p className="text-white/60 text-sm">
              Maximize resultados com alimentação inteligente para hipertrofia.
            </p>
          </div>

          {/* Bônus 2 */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-accent/20 flex items-center justify-center">
              <Timer className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-bold text-base mb-0.5">
              2️⃣ Checklist de Recuperação
            </h3>
            <p className="text-white/60 text-sm">
              Evite overtraining e acelere evolução com sono estratégico.
            </p>
          </div>

          {/* Bônus 3 */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center relative overflow-hidden">
            <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
              Novo
            </span>
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-accent/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-white font-bold text-base mb-0.5">
              3️⃣ Cronograma Semanal
            </h3>
            <p className="text-gray-300 text-sm">
              Passo a passo, do início ao final das 8 semanas.
            </p>
          </div>
        </div>

        {/* Features App */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 max-w-2xl mx-auto mb-6">
          <p className="text-white text-center text-sm font-semibold mb-3">
            No App 8X você recebe:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
                  <feature.icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">
                    {feature.title}
                  </p>
                  <p className="text-white/50 text-[11px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STAKES */}
        <p className="text-white/50 text-sm italic text-center mb-4">
          R$19,90 é pouco.  
          Continuar treinando errado é caro.
        </p>

        {/* Ancoragem externa */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 max-w-md mx-auto mb-4">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
            Quanto custa tentar sozinho?
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Personal trainer</span>
              <span className="line-through">R$300–600/mês</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Consultoria online</span>
              <span className="line-through">R$200–500/mês</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>8 semanas errando</span>
              <span className="line-through">Tempo + frustração</span>
            </div>
          </div>
        </div>

        {/* Stack de valor */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-white font-semibold text-sm text-center mb-3">
            O que você recebe ao entrar hoje:
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Método 8X Completo (Sistema + App)</span>
              <span>R$97</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Guia de Nutrição para Hipertrofia</span>
              <span>R$47</span>
            </div>
            <div className="flex justify-between text-white">
              <span>BÔNUS: Combustível 8X: 15 Receitas Anabólicas</span>
              <span className="text-accent font-semibold">R$37</span>
            </div>

            <div className="h-px bg-accent/30 my-2" />

            <div className="flex justify-between text-white font-semibold">
              <span>Valor real</span>
              <span className="line-through">R$181</span>
            </div>

            <div className="flex justify-between text-white font-bold text-lg">
              <span>Hoje</span>
              <span className="text-accent">R$19,90</span>
            </div>
          </div>
        </div>

        {/* Fechamento */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-5 py-2.5 border border-accent/25">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">
              Acesso vitalício — pague uma vez, use pra sempre
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
