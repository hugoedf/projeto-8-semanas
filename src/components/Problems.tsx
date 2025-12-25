import { AlertTriangle, Target, RotateCcw, TrendingDown, Clock } from "lucide-react";

const painPoints = [
  {
    text: "Treina pesado, mas o corpo não acompanha",
    emphasis: "pesado"
  },
  {
    text: "Segue uma rotina, mas o shape parece sempre igual",
    emphasis: "sempre igual"
  },
  {
    text: "Passam semanas, meses… e nada muda",
    emphasis: "nada muda"
  },
  {
    text: "Vê outras pessoas evoluindo mais rápido fazendo menos",
    emphasis: "fazendo menos"
  }
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
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Badge de contexto */}
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
              A DOR
            </span>
          </div>
          
          {/* Headline provocativa - Laranja */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-accent leading-tight mb-2">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#1a1a1a]">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional - Preto */}
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-[#1a1a1a] text-base sm:text-lg mb-4" style={{ lineHeight: '1.8' }}>
              E o pior não é treinar pesado. É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-[#1a1a1a]/70 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo, mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* Pain Points - Cards com borda laranja */}
          <div className="space-y-3 mb-16">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border-2 border-accent/30 p-4 flex items-center gap-4 hover:shadow-lg hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <p className="text-[#1a1a1a] text-sm sm:text-base flex-1">
                  {point.text.split(point.emphasis).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="font-bold text-[#050505]">{point.emphasis}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          
          {/* A VERDADE - Bloco PRETO de destaque */}
          <div className="bg-[#050505] rounded-2xl p-6 sm:p-8 md:p-10">
            {/* Badge + Headline */}
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
                A VERDADE
              </span>
              <p className="text-accent font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight">
                O problema <span className="text-white font-bold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação fluida */}
            <div className="space-y-4 mb-8">
              {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm sm:text-base" style={{ lineHeight: '1.7' }}>
                        {point.text}{" "}
                        <span className="text-accent font-semibold">{point.highlight}</span>
                      </p>
                      {point.followUp && (
                        <p className="text-white/50 text-sm mt-2" style={{ lineHeight: '1.6' }}>
                          {point.followUp}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Fechamento */}
            <div className="bg-[#1a1a1a] border border-accent/20 rounded-xl p-5 text-center">
              <p className="text-white/70 text-sm sm:text-base mb-2">
                A maioria das pessoas treina assim por anos. Não porque não querem evoluir —
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
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
