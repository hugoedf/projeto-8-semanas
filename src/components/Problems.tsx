import { X, AlertTriangle, ArrowDown, Target, RotateCcw, TrendingDown, Clock } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
const painPoints = ["Treina pesado, mas o corpo não acompanha", "Segue uma rotina, mas o shape parece sempre igual", "Passam semanas, meses… e nada muda", "Vê outras pessoas evoluindo mais rápido fazendo menos"];
const explanationPoints = [{
  text: "O verdadeiro problema é",
  highlight: "treinar sem método.",
  followUp: "Quando você entende isso, a culpa sai de cena — e entra clareza sobre o que realmente precisa ser feito.",
  icon: Target
}, {
  text: "Sem progressão clara, o corpo se adapta e",
  highlight: "para de responder.",
  icon: RotateCcw
}, {
  text: "Repetir os mesmos estímulos cria",
  highlight: "estagnação.",
  icon: TrendingDown
}, {
  text: "Cansa, ocupa tempo… mas",
  highlight: "não gera evolução real.",
  icon: Clock
}];
const Problems = () => {
  const parallaxOffset = useParallax({ speed: 0.06 });
  
  return <section className="py-20 sm:py-28 lg:py-32 gradient-hero relative overflow-hidden">
      {/* Subtle texture overlay with parallax */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(0,0%,100%,0.03),transparent_50%)]"
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
      />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-14 lg:mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-6">
              ​
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-accent mt-3">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-white/50 text-lg sm:text-xl">
              E o pior não é treinar pesado.
            </p>
            <p className="text-white font-medium text-xl sm:text-2xl mt-4">
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-white/50 text-base sm:text-lg mt-6 leading-relaxed">
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo… mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ Grid de Cards Premium - Dores (Apple Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-20">
            {painPoints.map((point, index) => <div key={index} className="group relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 lg:p-7 border border-white/[0.06] hover:border-red-500/30 hover:bg-white/[0.05] transition-all duration-300">
                {/* Red accent indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-red-600/50 rounded-l-2xl" />
                
                <div className="flex items-start gap-4 pl-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/15 transition-colors">
                    <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                  </div>
                  <p className="text-white/90 text-base sm:text-lg font-medium leading-relaxed pt-2">
                    {point}
                  </p>
                </div>
              </div>)}
          </div>
          
          {/* Visual connector */}
          <div className="flex flex-col items-center gap-4 mb-20">
            <div className="w-px h-16 bg-gradient-to-b from-white/10 to-accent/40" />
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
              <ArrowDown className="w-6 h-6 text-accent" />
            </div>
            <div className="w-px h-10 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
          
          {/* 3️⃣ Container Hero - A Verdade */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl shadow-black/40 mb-16">
            {/* Subtle orange glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-accent/10 to-transparent rounded-3xl blur-xl opacity-60" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2.5 bg-accent/8 border border-accent/20 rounded-full px-5 py-2.5 mb-7">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-[0.2em]">A verdade</span>
                </div>
                <p className="text-gray-900 font-display text-2xl sm:text-3xl md:text-4xl leading-snug">
                  O problema <span className="text-accent font-bold">não é falta de esforço.</span>
                </p>
              </div>
              
              {/* Explicação com linha conectora */}
              <div className="relative max-w-2xl mx-auto">
                {/* Linha vertical conectora */}
                <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent/30 via-accent/15 to-transparent hidden sm:block" />
                
                <div className="space-y-6">
                  {explanationPoints.map((point, index) => {
                  const IconComponent = point.icon;
                  return <div key={index} className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center relative z-10">
                          <IconComponent className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-gray-600 text-base sm:text-lg">
                            {point.text}{" "}
                            <span className="text-gray-900 font-semibold">{point.highlight}</span>
                          </p>
                          {point.followUp && <p className="text-gray-500 text-sm sm:text-base mt-3 pl-4 border-l-2 border-accent/25">
                              {point.followUp}
                            </p>}
                        </div>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Insight Quote */}
          <div className="text-center mb-16">
            <div className="inline-block bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-8 sm:px-10 py-7 max-w-2xl">
              <p className="text-white/60 text-base sm:text-lg italic leading-relaxed">
                "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
                <span className="text-white font-medium not-italic">se adaptar… e parar de evoluir.</span>"
              </p>
            </div>
          </div>
          
          {/* 5️⃣ Fechamento */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl max-w-2xl mx-auto">
              <p className="text-gray-600 text-base sm:text-lg">
                A maioria das pessoas treina assim por anos.
                <br />
                Não porque não querem evoluir —
              </p>
              <p className="text-gray-900 font-medium text-lg sm:text-xl mt-6">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent underline decoration-accent/40 underline-offset-4 decoration-2">
                  sistema estruturado, progressivo e aplicável.
                </span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>;
};
export default Problems;