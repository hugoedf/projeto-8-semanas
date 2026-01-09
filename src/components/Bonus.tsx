import { Smartphone, BookOpen, Zap, TrendingUp, Timer, BarChart3, Dumbbell, Gift } from "lucide-react";
const Bonus = () => {
  const appFeatures = [{
    icon: Dumbbell,
    title: "8 Semanas Programadas",
    description: "Treino pronto, dia a dia"
  }, {
    icon: Timer,
    title: "Timer Inteligente",
    description: "Descanso otimizado"
  }, {
    icon: TrendingUp,
    title: "Progressão de Cargas",
    description: "Evolução sem achismo"
  }, {
    icon: BarChart3,
    title: "Acompanhamento",
    description: "Evolução semanal"
  }];
  const bonuses = [{
    icon: BookOpen,
    title: "Guia de Nutrição",
    description: "Alimentação inteligente para hipertrofia"
  }, {
    icon: Timer,
    title: "Checklist de Recuperação",
    description: "Evite overtraining e acelere evolução"
  }, {
    icon: BarChart3,
    title: "Cronograma Semanal",
    description: "Passo a passo das 8 semanas",
    isNew: true
  }];
  return <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsla(18,100%,58%,0.05),transparent_50%)]" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-5 py-2.5 mb-6">
            <Gift className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold text-sm uppercase tracking-widest">Bônus Exclusivos</span>
          </div>
          
          <h2 className="font-display sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 text-2xl">
            Tudo que você precisa para<br />
            <span className="text-accent">resultados máximos</span> — incluso hoje
          </h2>
        </div>

        {/* Bônus Cards */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {bonuses.map((bonus, index) => <div key={index} className={`relative bg-gray-50 border ${bonus.isNew ? 'border-accent/40 bg-accent/5' : 'border-gray-200'} rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
              {bonus.isNew && <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-full font-bold shadow-lg">
                  Novo
                </span>}
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${bonus.isNew ? 'bg-accent/20' : 'bg-accent/10'} flex items-center justify-center`}>
                <bonus.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {bonus.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {bonus.description}
              </p>
            </div>)}
        </div>

        {/* App Features */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-accent" />
            <p className="text-white text-xl font-bold">
              No App 8X você recebe:
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {appFeatures.map((feature, index) => <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">
                  {feature.title}
                </p>
                <p className="text-white/50 text-xs">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>

        {/* Micro reforço */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 sm:p-8 text-center mb-10">
          <p className="text-gray-800 sm:text-xl font-semibold text-base">
            Sozinhos, esses bônus já valem mais que o preço do método — <br className="hidden sm:block" />
            mas você leva <span className="text-accent font-bold">tudo por R$19,90.</span>
          </p>
        </div>

        {/* Stack de valor */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 max-w-xl mx-auto">
          <p className="text-gray-900 font-bold text-lg text-center mb-6">
            O que você recebe ao entrar hoje:
          </p>

          <div className="space-y-3 text-base mb-6">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Método 8X Completo (Sistema + App)</span>
              <span className="font-semibold">R$97</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Guia de Nutrição para Hipertrofia</span>
              <span className="font-semibold">R$47</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold">
              <span className="text-sm">BÔNUS: Combustível 8X: 15 Receitas</span>
              <span className="text-accent">R$37</span>
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="flex justify-between text-gray-900 font-bold text-lg">
              <span>Valor real</span>
              <span className="line-through text-gray-400">R$181</span>
            </div>

            <div className="flex justify-between text-gray-900 font-bold text-2xl">
              <span>Hoje</span>
              <span className="text-accent">R$19,90</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-accent/10 rounded-full px-5 py-3 border border-accent/25">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm font-bold text-gray-900">
              Acesso vitalício — pague uma vez, use pra sempre
            </p>
          </div>
        </div>

      </div>
    </section>;
};
export default Bonus;