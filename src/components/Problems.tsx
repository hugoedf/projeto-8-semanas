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
    <section className="py-20 sm:py-24 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Badge de contexto */}
          <div className="text-center mb-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-accent bg-accent/10 px-3 py-1.5 rounded-full">
              A Dor
            </span>
          </div>
          
          {/* 1️⃣ Headline provocativa - centralizado */}
          <div className="text-center mb-5 sm:mb-6 max-w-[650px] mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-foreground leading-tight">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-accent mt-1.5">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional - ALINHADO À ESQUERDA para leitura natural */}
          <div className="max-w-[650px] mx-auto mb-8 sm:mb-10">
            <p className="text-slate-600 text-sm sm:text-base mb-3 text-left" style={{ lineHeight: '1.75' }}>
              E o pior não é treinar pesado. É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-slate-500 text-sm sm:text-base text-left" style={{ lineHeight: '1.75' }}>
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo, mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ Pain Points - Cards compactos */}
          <div className="space-y-2.5 sm:space-y-3 mb-10 sm:mb-12">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                  <div className="flex items-center gap-3 p-3.5 sm:p-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={2} />
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base flex-1 text-left" style={{ lineHeight: '1.5' }}>
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
          
          {/* 3️⃣ A VERDADE - Bloco Unificado (momento-chave) */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-5 sm:p-6 md:p-8">
            {/* Badge + Headline unidos */}
            <div className="text-center mb-5 sm:mb-6">
              <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.12em] mb-3">
                A verdade
              </span>
              <p className="text-foreground font-display text-lg sm:text-xl md:text-2xl leading-snug tracking-[-0.02em]">
                O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação fluida - espaçamento menor entre itens */}
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
              {explanationPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 text-sm sm:text-base" style={{ lineHeight: '1.65' }}>
                        {point.text}{" "}
                        <span className="text-slate-900 font-semibold">{point.highlight}</span>
                      </p>
                      {point.followUp && (
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 pl-2.5 border-l-2 border-accent/20" style={{ lineHeight: '1.6' }}>
                          {point.followUp}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Fechamento */}
            <div className="bg-slate-50 rounded-lg p-4 sm:p-5">
              <p className="text-slate-600 text-sm sm:text-base mb-2" style={{ lineHeight: '1.65' }}>
                A maioria das pessoas treina assim por anos. Não porque não querem evoluir —
              </p>
              <p className="text-slate-900 font-semibold text-sm sm:text-base" style={{ lineHeight: '1.65' }}>
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