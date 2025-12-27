import { Lightbulb, Zap, Target, TrendingUp } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 section-dark-premium relative overflow-hidden">
      {/* Enhanced orange glow for visual warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(18,100%,58%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight text-center sm:text-left">
              Por que o <span className="text-accent">Método 8X</span> existe
            </h2>
          </div>
          
          {/* Premium Glass Card */}
          <div className="card-dark-glass p-8 sm:p-10 lg:p-12 rounded-3xl">
            <div className="space-y-8">
              
              {/* O Problema Real */}
              <div className="space-y-4">
                <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                  Durante anos, vi pessoas treinando com dedicação real. Acordando cedo, abrindo mão de compromissos, entrando pesado toda semana.
                </p>
                <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                  E mesmo assim, ficavam travadas. Meses passavam e o corpo não respondia.
                </p>
              </div>

              {/* O que o mercado oferece */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg mb-2">
                      O problema não era a pessoa.
                    </p>
                    <p className="text-white/70 text-sm sm:text-base">
                      Era o que o mercado oferecia: treinos genéricos, planos que funcionam na teoria mas travam na prática, informação demais e execução de menos.
                    </p>
                  </div>
                </div>
              </div>

              {/* A Solução */}
              <div className="flex items-start gap-4 bg-accent/10 border border-accent/30 rounded-xl p-5 sm:p-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent drop-shadow-sm" />
                </div>
                <div>
                  <p className="text-white text-base sm:text-lg lg:text-xl font-medium mb-2">
                    Faltava um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span>.
                  </p>
                  <p className="text-white/70 text-sm sm:text-base">
                    Algo que transformasse conhecimento em ação diária — sem precisar decorar nada, sem depender de motivação, sem improvisar.
                  </p>
                </div>
              </div>

              {/* Resultado */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium text-base sm:text-lg">
                    O Método 8X nasceu para resolver exatamente isso:
                  </p>
                  <p className="text-white/80 text-sm sm:text-base mt-1">
                    Transformar treino em execução guiada, com progressão clara semana a semana — sem achismo, sem tentativa e erro, sem depender de força de vontade.
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

export default WhyExists;
