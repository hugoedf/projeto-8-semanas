import { Zap, RefreshCw, TrendingUp, Check, Smartphone, BookOpen } from "lucide-react";
const pillars = [{
  icon: Zap,
  title: "Estímulo Otimizado",
  description: "Treinos que forçam adaptação toda semana",
  color: "accent"
}, {
  icon: RefreshCw,
  title: "Adaptação e Recuperação",
  description: "Descanso estratégico que maximiza crescimento",
  color: "accent"
}, {
  icon: TrendingUp,
  title: "Supercompensação",
  description: "Corpo mais forte, definido e resistente",
  color: "accent"
}];
const resultBullets = ["Corpo que evolui toda semana", "Treino guiado, sem improviso", "Crescimento muscular previsível e consistente"];
const WhyMethodExists = () => {
  return <section className="py-16 sm:py-24 bg-[#F9F9F9] relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Zap className="w-4 h-4" />
              A Solução Científica
            </span>
            
            <h2 className="font-display sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900 leading-[1.1] mb-6 text-2xl">
              O Método 8X não é apenas mais um treino —<br />
              <span className="text-accent">é um sistema científico</span> que força<br />
              seu corpo a evoluir de forma previsível.
            </h2>
          </div>

          {/* 3 Pilares - Cards horizontais com ícones laranja */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
            {pillars.map((pillar, index) => <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <pillar.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display lg:text-2xl font-bold text-gray-900 mb-2 text-lg">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {pillar.description}
                </p>
              </div>)}
          </div>

          {/* Mini bullets de resultado */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/5 border border-gray-100 mb-12">
            <p className="text-gray-900 font-display text-xl sm:text-2xl font-bold mb-6 text-center">
              Com o Método 8X, você conquista:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {resultBullets.map((bullet, index) => <div key={index} className="flex items-center gap-3 bg-accent/5 border border-accent/15 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">{bullet}</span>
                </div>)}
            </div>
          </div>

          {/* Boxes de entrega */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/25 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-gray-900 mb-2">
                    Aplicativo + Ebook
                  </h4>
                  <p className="text-gray-600 text-base">
                    Tudo entregue em um aplicativo + ebook, para que você saiba exatamente o que fazer, quando e como.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/25 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-gray-900 mb-2">
                    Sem depender da motivação
                  </h4>
                  <p className="text-gray-600 text-base">
                    Você só precisa seguir o passo a passo e ver seu corpo responder. A estrutura faz o trabalho por você.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>;
};
export default WhyMethodExists;