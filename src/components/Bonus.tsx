import { Gift, Rocket, Lock, Smartphone, CheckCircle2, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const Bonus = () => {
  const appFeatures = [
    {
      icon: Target,
      title: "Treinos Programados",
      description: "Cada sessão pronta, sem montar nada sozinho"
    },
    {
      icon: Zap,
      title: "Alimentação Aplicada",
      description: "Plano nutricional integrado, sem calcular macros"
    },
    {
      icon: TrendingUp,
      title: "Progresso Visível",
      description: "Acompanhe sua evolução semana a semana"
    },
    {
      icon: Sparkles,
      title: "Técnicas no Tempo Certo",
      description: "Sem improvisar, execução guiada passo a passo"
    }
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-36 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-5xl">
        
        {/* Badge */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/15 to-orange-500/15 border border-accent/30 shadow-lg shadow-accent/10">
            <Gift className="w-4 h-4 animate-pulse" />
            Bônus Exclusivo Incluído
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight mb-4 sm:mb-6 animate-fade-in">
          <span className="block sm:inline">Você não vai</span>
          <span className="block sm:inline"> apenas ler o método.</span>
          <br />
          <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_hsla(18,100%,58%,0.3)]">
            <span className="block sm:inline">Você vai executar</span>
            <span className="block sm:inline"> ele no celular.</span>
          </span>
        </h2>

        <p className="text-center text-gray-400 text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto animate-fade-in">
          Apresentamos o <span className="text-white font-semibold">App 8X</span> — seu treinador digital que transforma conhecimento em ação.
        </p>

        {/* Hero Section: App Mockup + Value Prop */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20 animate-fade-in">
          
          {/* App Mockup */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative">
              {/* Glows */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-orange-500/20 rounded-[3rem] blur-[60px] scale-110" />
              <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-[100px] scale-125 animate-pulse" />
              
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2.5rem] p-3 sm:p-4 w-[220px] sm:w-[280px] shadow-2xl shadow-black/60 border border-white/15">
                <div className="rounded-[2rem] overflow-hidden">
                  <img 
                    src={appMockup} 
                    alt="App 8X - Execução Guiada do Método" 
                    className="w-full h-auto"
                  />
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-950 rounded-full" />
              </div>
              
              {/* Badge GRÁTIS */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl shadow-accent/40 animate-pulse">
                100% GRÁTIS
              </div>
              
              {/* Floating elements */}
              <div className="absolute -left-4 top-1/3 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-white font-medium">Treino do dia</span>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/3 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-xs text-white font-medium">+12% força</span>
                </div>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="p-2.5 bg-accent/15 rounded-xl border border-accent/30">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">App 8X</h3>
            </div>
            
            <p className="text-accent font-semibold text-lg mb-6">
              Execução guiada do Método 8X
            </p>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-300 text-base leading-relaxed">
                A maioria não falha por falta de método. 
                <span className="text-white font-medium"> Falha porque executa sem clareza.</span>
              </p>
              <p className="text-gray-400 text-sm">
                O App 8X elimina a interpretação errada. Cada treino, cada refeição, cada técnica — tudo programado e sincronizado com o protocolo das 8 semanas.
              </p>
            </div>

            {/* Quick benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {["Sem improviso", "Sem desvio", "Sem achismo"].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 sm:mb-20 animate-fade-in">
          <p className="text-center text-gray-400 text-sm mb-6 sm:mb-8">
            Com o App 8X, você executa <span className="text-white">exatamente</span> o que está no método:
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {appFeatures.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="p-1.5 sm:p-2.5 bg-accent/10 rounded-lg sm:rounded-xl w-fit mb-2 sm:mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <h4 className="text-white font-semibold text-[11px] sm:text-sm mb-1 sm:mb-2 leading-tight">{feature.title}</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs leading-snug sm:leading-relaxed hidden sm:block">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison: Com App vs Sem App */}
        <div className="mb-16 sm:mb-20 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Sem App */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <p className="text-red-400/80 font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="text-lg">✕</span> Sem o App 8X
              </p>
              <ul className="space-y-2 text-gray-500 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-red-400/50 mt-0.5">•</span>
                  <span>Monta treino sozinho e erra a progressão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400/50 mt-0.5">•</span>
                  <span>Calcula macros e abandona em 2 semanas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400/50 mt-0.5">•</span>
                  <span>Improvisa técnicas e perde resultado</span>
                </li>
              </ul>
            </div>
            
            {/* Com App */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5">
              <p className="text-green-400/80 font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="text-lg">✔</span> Com o App 8X
              </p>
              <ul className="space-y-2 text-gray-300 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Treinos prontos com progressão automática</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Alimentação integrada sem cálculos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Execução guiada = resultado garantido</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Value Highlight */}
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-accent/15 via-orange-500/15 to-accent/15 rounded-3xl py-6 px-8 sm:px-12 border border-accent/25 shadow-xl shadow-accent/10">
            <p className="text-gray-500 text-xs mb-2">
              Valor real do App 8X: <span className="line-through">R$ 97</span>
            </p>
            <div className="flex items-center justify-center gap-3">
              <Gift className="w-6 h-6 text-accent" />
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
                Incluído GRÁTIS com o Método 8X
              </p>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Apenas para quem garantir o e-book hoje
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white leading-snug mb-4">
            Quem só executa, começa.
            <br />
            <span className="bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
              Quem entende o método e usa o App, transforma.
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            E-book + App 8X = Conhecimento + Execução Perfeita
          </p>
        </div>

        {/* Access Badge */}
        <div className="flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/[0.04] rounded-full px-5 py-2.5 border border-white/10">
            <Lock className="w-4 h-4 text-accent/70" />
            <p className="text-gray-400 text-xs sm:text-sm">
              🔐 Acesso exclusivo • Validação individual • Liberação imediata
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
