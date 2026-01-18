import { Zap, RefreshCw, TrendingUp, Check, Smartphone, BookOpen } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Estímulo Otimizado", description: "Treinos que forçam adaptação toda semana", color: "accent" },
  { icon: RefreshCw, title: "Adaptação e Recuperação", description: "Descanso estratégico que maximiza crescimento", color: "accent" },
  { icon: TrendingUp, title: "Supercompensação", description: "Corpo mais forte, definido e resistente", color: "accent" }
];

const resultBullets = [
  "Corpo que evolui toda semana",
  "Treino guiado, sem improviso",
  "Crescimento muscular previsível" // Reduzido para melhor encaixe no mobile
];

const WhyMethodExists = () => {
  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Ajustado para Mobile */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="font-display text-xl sm:text-4xl md:text-5xl tracking-tight text-black leading-tight sm:leading-[1.1] mb-4">
              O Método 8X não é apenas um treino, <br className="hidden sm:block" />
              <span className="text-accent">é um sistema científico</span> que força <br className="hidden sm:block" />
              seu corpo a evoluir.
            </h2>
          </div>

          {/* 3 Pilares - Cards horizontais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                  <pillar.icon className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-bold text-black mb-1">
                  {pillar.title}
                </h3>
                <p className="text-black/60 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mini bullets de resultado - Otimizado para 1 coluna no mobile muito pequeno */}
          <div className="bg-gray-50/50 rounded-2xl p-5 border border-black/5 mb-8">
            <p className="text-black font-display text-md font-bold mb-4 text-center">
              Com o Método 8X, você conquista:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {resultBullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-2 bg-white border border-black/5 rounded-lg px-3 py-2 shadow-sm">
                  <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" strokeWidth={4} />
                  </div>
                  <span className="text-black/80 text-[13px] font-bold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Boxes de entrega - Compactados para Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-black">
                    Aplicativo + Ebook
                  </h4>
                  <p className="text-black/60 text-xs">
                    Saiba exatamente o que fazer e como fazer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-black">
                    Estrutura que dá Resultado
                  </h4>
                  <p className="text-black/60 text-xs">
                    A estrutura científica faz o trabalho por você.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMethodExists;
