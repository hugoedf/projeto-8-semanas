import { X, AlertTriangle, ArrowDown, Target, RotateCcw, TrendingDown, Clock } from "lucide-react";

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
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-14 lg:mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground mb-6">
              ​
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1]">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-accent mt-3">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional - hierarquia visual clara */}
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-5">
            <p className="text-muted-foreground text-base sm:text-lg">
              E o pior não é treinar pesado.
            </p>
            <p className="text-foreground font-semibold text-xl sm:text-2xl leading-snug">
              É sentir que o esforço não está<br className="hidden sm:block" /> voltando em forma de <span className="text-accent">resultado.</span>
            </p>
            <p className="text-muted-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Você já saiu da academia com a sensação de ter feito tudo certo… <span className="text-foreground/70">mas sem certeza de que aquilo realmente funcionava.</span>
            </p>
          </div>
          
          {/* 2️⃣ Grid de Cards Premium - Dores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-20">
            {painPoints.map((point, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-6 lg:p-7 border border-border hover:border-red-300 hover:shadow-lg transition-all duration-300 shadow-sm">
                {/* Red accent indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-red-400/50 rounded-l-2xl" />
                
                <div className="flex items-start gap-4 pl-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-foreground/90 text-base sm:text-lg font-medium leading-relaxed pt-2">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual connector */}
          <div className="flex flex-col items-center gap-4 mb-20">
            <div className="w-px h-16 bg-gradient-to-b from-border to-accent/40" />
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
              <ArrowDown className="w-6 h-6 text-accent" />
            </div>
            <div className="w-px h-10 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
          
          {/* 3️⃣ Container Hero - A Verdade */}
          <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-border mb-16">
            {/* Subtle orange glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-accent/5 to-transparent rounded-3xl blur-xl opacity-60" />
            
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
                    return (
                      <div key={index} className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center relative z-10">
                          <IconComponent className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-gray-600 text-base sm:text-lg">
                            {point.text}{" "}
                            <span className="text-gray-900 font-semibold">{point.highlight}</span>
                          </p>
                          {point.followUp && (
                            <p className="text-gray-500 text-sm sm:text-base mt-3 pl-4 border-l-2 border-accent/25">
                              {point.followUp}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Insight Quote */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gray-50 border border-border rounded-2xl px-8 sm:px-10 py-7 max-w-2xl">
              <p className="text-muted-foreground text-base sm:text-lg italic leading-relaxed">
                "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
                <span className="text-foreground font-medium not-italic">se adaptar… e parar de evoluir.</span>"
              </p>
            </div>
          </div>
          
          {/* 5️⃣ Fechamento - ritmo de leitura melhorado */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-border max-w-2xl mx-auto space-y-4">
              <p className="text-muted-foreground text-sm sm:text-base">
                A maioria das pessoas treina assim por anos.
              </p>
              <p className="text-foreground/80 text-base sm:text-lg">
                Não porque não querem evoluir —
              </p>
              <p className="text-foreground font-semibold text-lg sm:text-xl pt-2">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent underline decoration-accent/30 underline-offset-4 decoration-2">
                  sistema estruturado, progressivo e aplicável.
                </span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;