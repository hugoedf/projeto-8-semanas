import { X, AlertTriangle, ArrowDown, Target, RotateCcw, TrendingDown, Clock } from "lucide-react";

const painPoints = [
  "Você treina há meses — e o espelho continua igual",
  "Faz força, sua, dedica tempo — mas o shape não responde",
  "Vê outros evoluindo com metade do esforço que você faz",
  "Já tentou de tudo, mas nada parece funcionar de verdade"
];

const explanationPoints = [{
  text: "O problema nunca foi",
  highlight: "falta de esforço.",
  followUp: "É treinar sem um sistema que força o corpo a responder. Sem isso, ele se adapta — e para de evoluir.",
  icon: Target
}, {
  text: "Sem progressão estruturada,",
  highlight: "o corpo estagna.",
  followUp: "Não importa quanta força você faça. Estímulo repetido = zero crescimento.",
  icon: RotateCcw
}, {
  text: "Você perde tempo, energia e",
  highlight: "motivação.",
  icon: TrendingDown
}, {
  text: "E o pior: a cada semana que passa,",
  highlight: "a frustração só aumenta.",
  icon: Clock
}];

const Problems = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(18,100%,58%,0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div className="text-center mb-10 lg:mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground mb-4">
              ​
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1]">
              Você treina, se esforça…<br />
              <span className="text-accent">e mesmo assim não vê resultado?</span>
            </h2>
          </div>
          
          {/* Introdução emocional */}
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-foreground font-medium text-lg sm:text-xl">
              E o pior não é treinar pesado.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 leading-relaxed">
              É sentir que o esforço não está voltando em forma de resultado.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
              Provavelmente você já saiu da academia com a sensação de ter feito tudo certo…{" "}
              <span className="text-foreground font-medium">mas sem a certeza de que aquilo realmente estava funcionando.</span>
            </p>
          </div>
          
          {/* 2️⃣ Grid de Cards Premium - Dores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-14">
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
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="w-px h-10 bg-gradient-to-b from-border to-accent/40" />
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-accent" />
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
          
          {/* 3️⃣ Container Hero - A Verdade */}
          <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-border mb-12">
            {/* Subtle orange glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-accent/5 to-transparent rounded-3xl blur-xl opacity-60" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2.5 bg-accent/8 border border-accent/20 rounded-full px-4 py-2 mb-5">
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
                
                <div className="space-y-4">
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
                            <p className="text-gray-500 text-sm sm:text-base mt-2 pl-4 border-l-2 border-accent/25">
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
          <div className="text-center mb-10">
            <div className="inline-block bg-gray-50 border border-border rounded-2xl px-6 sm:px-8 py-5 max-w-2xl">
              <p className="text-muted-foreground text-base sm:text-lg italic leading-relaxed">
                "Quanto mais tempo você treina errado, mais difícil fica sair da estagnação.{" "}
                <span className="text-foreground font-medium not-italic">O corpo se adapta ao erro — e para de responder.</span>"
              </p>
            </div>
          </div>
          
          {/* 5️⃣ Fechamento */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-border max-w-2xl mx-auto">
              <p className="text-gray-600 text-base sm:text-lg">
                A maioria das pessoas treina assim por anos.
                <br />
                Não porque não querem evoluir —
              </p>
              <p className="text-gray-900 font-medium text-lg sm:text-xl mt-4">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent underline decoration-accent/40 underline-offset-4 decoration-2">
                  sistema estruturado, progressivo e aplicável.
                </span>
              </p>
              {/* Micro-gatilho de identificação */}
              <p className="text-muted-foreground text-sm mt-4 italic">
                Continuar assim também é uma escolha.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;