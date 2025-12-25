import { AlertTriangle, Target, RotateCcw, TrendingDown, Clock } from "lucide-react";

const painPoints = [
  { text: "Treina pesado, mas o corpo não acompanha", emphasis: "pesado" },
  { text: "Segue uma rotina, mas o shape parece sempre igual", emphasis: "sempre igual" },
  { text: "Passam semanas, meses… e nada muda", emphasis: "nada muda" },
  { text: "Vê outras pessoas evoluindo mais rápido fazendo menos", emphasis: "fazendo menos" }
];

const explanationPoints = [
  { 
    text: "O verdadeiro problema é", 
    highlight: "treinar sem método.", 
    followUp: "Quando você entende isso, a culpa sai de cena — e entra clareza sobre o que realmente precisa ser feito.",
    icon: Target
  },
  { text: "Sem progressão clara, o corpo se adapta e", highlight: "para de responder.", icon: RotateCcw },
  { text: "Repetir os mesmos estímulos cria", highlight: "estagnação.", icon: TrendingDown },
  { text: "Cansa, ocupa tempo… mas", highlight: "não gera evolução real.", icon: Clock }
];

const Problems = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary relative overflow-hidden">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Headline provocativa */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground leading-tight mb-2">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-accent">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional */}
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <p className="text-muted-foreground text-base sm:text-lg mb-3" style={{ lineHeight: '1.8' }}>
              E o pior não é treinar pesado. É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-muted-foreground/80 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo, mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* Pain Points - Cards com borda laranja */}
          <div className="space-y-3 mb-14">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg border border-border/50 border-l-2 border-l-accent p-4 flex items-center gap-4 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-accent" strokeWidth={2} />
                </div>
                <p className="text-muted-foreground text-sm sm:text-base flex-1">
                  {point.text.split(point.emphasis).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="font-semibold text-foreground">{point.emphasis}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          
          {/* Bloco de explicação */}
          <div className="bg-card border border-accent/20 rounded-xl p-6 sm:p-8">
            {/* Headline */}
            <div className="text-center mb-6">
              <p className="text-foreground font-display text-xl sm:text-2xl leading-snug tracking-tight">
                O problema <span className="text-accent font-bold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação */}
            <div className="space-y-4 mb-6">
              {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-sm sm:text-base" style={{ lineHeight: '1.7' }}>
                        {point.text}{" "}
                        <span className="text-foreground font-medium">{point.highlight}</span>
                      </p>
                      {point.followUp && (
                        <p className="text-muted-foreground/70 text-sm mt-1.5" style={{ lineHeight: '1.6' }}>
                          {point.followUp}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Fechamento */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm sm:text-base mb-1.5">
                A maioria das pessoas treina assim por anos. Não porque não querem evoluir —
              </p>
              <p className="text-foreground font-medium text-sm sm:text-base">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent">sistema estruturado, progressivo e aplicável.</span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;
