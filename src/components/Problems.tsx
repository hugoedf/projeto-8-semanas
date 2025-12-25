import { AlertTriangle, Target, RotateCcw, TrendingDown, Clock, Lightbulb } from "lucide-react";

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
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-10 sm:mb-12 max-w-[650px] mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-foreground leading-tight">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-accent mt-2">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional - Texto leve, ponte */}
          <div className="text-center max-w-[580px] mx-auto mb-10 sm:mb-12">
            <p className="text-slate-500 mb-2 text-sm sm:text-base" style={{ lineHeight: '1.7' }}>
              E o pior não é treinar pesado.
            </p>
            <p className="text-slate-700 font-medium text-base sm:text-lg" style={{ lineHeight: '1.7' }}>
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-slate-500 mt-3 text-sm sm:text-base" style={{ lineHeight: '1.7' }}>
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo… mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ System Error Cards - Pain Points */}
          <div className="space-y-3 sm:space-y-4 mb-14 sm:mb-16">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl border-l-4 border-red-500 shadow-md shadow-black/[0.04] hover:shadow-lg hover:shadow-black/[0.08] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" strokeWidth={2} />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base flex-1" style={{ lineHeight: '1.6' }}>
                    {point.text.split(point.emphasis).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-bold text-slate-900">{point.emphasis}</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 3️⃣ A VERDADE - Bloco Unificado */}
          <div className="bg-white rounded-2xl shadow-lg shadow-black/[0.05] border border-slate-100 p-6 sm:p-8 md:p-10">
            {/* Badge A VERDADE */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5 mb-5">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">A verdade</span>
              </div>
              <p className="text-foreground font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-[-0.02em]">
                O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação fluida */}
            <div className="space-y-4 sm:space-y-5 mb-8">
              {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 text-sm sm:text-base" style={{ lineHeight: '1.7' }}>
                        {point.text}{" "}
                        <span className="text-slate-900 font-semibold">{point.highlight}</span>
                      </p>
                      {point.followUp && (
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 pl-3 border-l-2 border-accent/25" style={{ lineHeight: '1.7' }}>
                          {point.followUp}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Insight Quote - dentro do bloco */}
            <div className="border-t border-slate-100 pt-6 sm:pt-8 mb-6 sm:mb-8">
              <p className="text-slate-600 italic text-sm sm:text-base text-center" style={{ lineHeight: '1.7' }}>
                "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
                <span className="text-slate-900 font-medium not-italic">se adaptar… e parar de evoluir.</span>"
              </p>
            </div>
            
            {/* Fechamento - dentro do mesmo bloco */}
            <div className="bg-slate-50 rounded-xl p-5 sm:p-6">
              <p className="text-slate-600 text-sm sm:text-base mb-3" style={{ lineHeight: '1.7' }}>
                A maioria das pessoas treina assim por anos. Não porque não querem evoluir —
              </p>
              <p className="text-slate-900 font-semibold text-base sm:text-lg" style={{ lineHeight: '1.7' }}>
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