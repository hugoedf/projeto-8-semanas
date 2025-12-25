import { AlertTriangle, Target, RotateCcw, TrendingDown, Clock, ArrowDown, Lightbulb, Sparkles } from "lucide-react";

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
    <section className="section-breathing bg-slate-50 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* 1️⃣ Headline provocativa - Largura controlada */}
          <div className="text-center mb-14 sm:mb-16 max-w-[650px] mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-foreground leading-tight">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-accent mt-2">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Introdução emocional - Bloco de Impacto */}
          <div className="impact-block mb-16 sm:mb-20">
            <p className="text-slate-500 mb-3">
              E o pior não é treinar pesado.
            </p>
            <p className="text-foreground font-semibold text-lg sm:text-xl">
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-slate-500 mt-5">
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo… mas sem a certeza de que aquilo realmente estava funcionando.
            </p>
          </div>
          
          {/* 2️⃣ System Error Cards - Pain Points */}
          <div className="space-y-4 mb-16 sm:mb-20">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl border-l-4 border-red-500 shadow-md shadow-black/[0.04] hover:shadow-lg hover:shadow-black/[0.08] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  {/* Alert Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-red-500" strokeWidth={2} />
                  </div>
                  
                  {/* Text with emphasis */}
                  <p className="text-slate-700 text-base sm:text-lg flex-1" style={{ lineHeight: '1.6' }}>
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
          
          {/* Visual connector - Pausa visual */}
          <div className="visual-connector mb-12 sm:mb-16">
            <div className="line" />
            <div className="dot" />
            <div className="line opacity-50" />
          </div>
          
          {/* 3️⃣ Truth Revelation Box - Bloco de Revelação */}
          <div className="revelation-block mb-16 sm:mb-20">
            <div className="text-center mb-8">
              {/* Badge Superior - Uppercase, pequeno, tracking wide */}
              <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5 mb-6">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">A verdade</span>
              </div>
              <p className="text-foreground font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-[-0.02em]">
                O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
              </p>
            </div>
            
            {/* Explicação com linha conectora */}
            <div className="relative text-left">
              {/* Linha vertical conectora */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent hidden sm:block" />
              
              <div className="space-y-5">
                {explanationPoints.map((point, index) => {
                  const IconComponent = point.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-4 sm:gap-5"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center relative z-10">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.7' }}>
                          {point.text}{" "}
                          <span className="text-slate-900 font-semibold">{point.highlight}</span>
                        </p>
                        {point.followUp && (
                          <p className="text-slate-500 text-sm sm:text-base mt-2.5 pl-4 border-l-2 border-accent/25" style={{ lineHeight: '1.7' }}>
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
          
          {/* Insight Quote - Bloco de Impacto */}
          <div className="impact-block mb-16 sm:mb-20">
            <p className="text-slate-600 italic">
              "Sem um sistema claro, o corpo faz exatamente o que foi programado para fazer:{" "}
              <span className="text-slate-900 font-medium not-italic">se adaptar… e parar de evoluir.</span>"
            </p>
          </div>
          
          {/* 5️⃣ Fechamento - Bloco de Revelação */}
          <div className="revelation-block">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-[0.1em]">A solução</span>
            </div>
            <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
              A maioria das pessoas treina assim por anos.
              <br />
              Não porque não querem evoluir —
            </p>
            <p className="text-slate-900 font-semibold text-lg sm:text-xl mt-6" style={{ lineHeight: '1.75' }}>
              mas porque ninguém ensinou um{" "}
              <span className="text-accent underline decoration-accent/40 underline-offset-4 decoration-2">
                sistema estruturado, progressivo e aplicável.
              </span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;
