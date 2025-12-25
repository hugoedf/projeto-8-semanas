import { X, AlertCircle, ArrowDown, Clock, Target, RotateCcw, TrendingDown } from "lucide-react";

const painPoints = [
  "Treina pesado, mas o corpo não acompanha",
  "Segue uma rotina, mas o shape parece sempre igual",
  "Passam semanas, meses… e nada muda",
  "Vê outras pessoas evoluindo mais rápido fazendo menos"
];

const explanationPoints = [
  { 
    text: "O verdadeiro problema é", 
    highlight: "treinar sem método.", 
    followUp: "Quando você entende isso, a culpa sai de cena — e entra clareza sobre o que realmente precisa ser feito.",
    icon: Target
  },
  { 
    text: "Sem progressão clara, o corpo se adapta e", 
    highlight: "para de responder.",
    icon: RotateCcw
  },
  { 
    text: "Repetir os mesmos estímulos cria", 
    highlight: "estagnação.",
    icon: TrendingDown
  },
  { 
    text: "Cansa, ocupa tempo… mas", 
    highlight: "não gera evolução real.",
    icon: Clock
  }
];

const Problems = () => {
  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/50 pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-accent mt-2">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional antes das dores */}
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              E o pior não é treinar pesado.
            </p>
            <p className="text-foreground font-medium text-lg sm:text-xl mt-2">
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo… mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ Lista de dores reais - Grid de Cards 2 colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="relative bg-card rounded-xl px-5 py-5 sm:py-6 shadow-lg shadow-black/8 hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-destructive"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive" strokeWidth={2.5} />
                  </div>
                  <p className="text-foreground text-sm sm:text-base font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual break - Arrow indicator com destaque */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
              <div className="relative w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center shadow-lg">
                <ArrowDown className="w-6 h-6 text-accent animate-bounce" />
              </div>
            </div>
          </div>
          
          {/* 3️⃣ Container de Destaque - A Verdade */}
          <div className="bg-muted/40 border border-border rounded-2xl p-6 sm:p-8 mb-10 max-w-xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-6 py-2.5 mb-5 shadow-sm">
                <AlertCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-widest">A verdade</span>
              </div>
              <p className="text-foreground font-display text-xl sm:text-2xl md:text-3xl leading-relaxed">
                O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação com ícones */}
            <div className="space-y-5">
              {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        {point.text}{" "}
                        <span className="text-foreground font-semibold bg-accent/10 px-1 rounded">{point.highlight}</span>
                      </p>
                      {point.followUp && (
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-2 border-l-2 border-accent/30 pl-3">
                          {point.followUp}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Insight destacado visualmente */}
          <div className="text-center mb-12">
            <div className="bg-muted/40 border-l-4 border-accent/60 rounded-r-xl px-6 py-5 max-w-xl mx-auto">
              <p className="text-muted-foreground text-base sm:text-lg italic leading-relaxed">
                "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
                <span className="text-foreground font-medium not-italic">se adaptar… e parar de evoluir.</span>"
              </p>
            </div>
          </div>
          
          {/* 5️⃣ Fechamento de autoridade */}
          <div className="text-center">
            <div className="max-w-lg mx-auto bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border/40">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                A maioria das pessoas treina assim por anos.
                <br />
                Não porque não querem evoluir —
              </p>
              <p className="text-foreground font-medium text-lg sm:text-xl mt-5 leading-relaxed">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent underline decoration-accent/40 underline-offset-4 decoration-2">
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