import { X, AlertCircle, ArrowDown, Clock, Target, RotateCcw, TrendingDown } from "lucide-react";
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
  return <section className="section-spacing bg-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-muted/40 pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-12">
            
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-accent mt-2">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional */}
          <div className="text-center mb-14 max-w-xl mx-auto">
            <p className="text-muted-foreground text-base sm:text-lg">
              E o pior não é treinar pesado.
            </p>
            <p className="text-foreground font-medium text-lg sm:text-xl mt-3">
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mt-5">
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo… mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ Grid de Floating Cards - Dores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-16">
            {painPoints.map((point, index) => <div key={index} className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 border-l-4 border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed pt-1.5">
                    {point}
                  </p>
                </div>
              </div>)}
          </div>
          
          {/* Visual connector */}
          <div className="flex flex-col items-center gap-3 mb-16">
            <div className="w-px h-12 bg-gradient-to-b from-border to-accent/30" />
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-accent" />
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-accent/30 to-transparent" />
          </div>
          
          {/* 3️⃣ Container Hero - A Verdade */}
          <div className="solution-hero-box mb-14">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2.5 bg-accent/8 border border-accent/20 rounded-full px-5 py-2 mb-6">
                <AlertCircle className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-[0.2em]">A verdade</span>
              </div>
              <p className="text-foreground font-display text-xl sm:text-2xl md:text-3xl leading-snug">
                O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação com linha conectora */}
            <div className="relative">
              {/* Linha vertical conectora */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent hidden sm:block" />
              
              <div className="space-y-6">
                {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return <div key={index} className="flex items-start gap-4 sm:gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center relative z-10">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-muted-foreground text-base sm:text-lg">
                          {point.text}{" "}
                          <span className="text-foreground font-semibold">{point.highlight}</span>
                        </p>
                        {point.followUp && <p className="text-muted-foreground text-sm sm:text-base mt-2.5 pl-4 border-l-2 border-accent/25">
                            {point.followUp}
                          </p>}
                      </div>
                    </div>;
              })}
              </div>
            </div>
          </div>
          
          {/* Insight Quote */}
          <div className="text-center mb-16">
            <div className="inline-block bg-card border border-border/60 rounded-2xl px-8 py-6 max-w-xl shadow-sm">
              <p className="text-muted-foreground text-base sm:text-lg italic">
                "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
                <span className="text-foreground font-medium not-italic">se adaptar… e parar de evoluir.</span>"
              </p>
            </div>
          </div>
          
          {/* 5️⃣ Fechamento */}
          <div className="text-center">
            <div className="card-premium p-8 sm:p-10 max-w-xl mx-auto border border-border/50">
              <p className="text-muted-foreground text-base sm:text-lg">
                A maioria das pessoas treina assim por anos.
                <br />
                Não porque não querem evoluir —
              </p>
              <p className="text-foreground font-medium text-lg sm:text-xl mt-6">
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