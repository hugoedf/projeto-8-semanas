import { X, AlertCircle, ArrowDown } from "lucide-react";
import { useStaggeredAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

const painPoints = [
  "Treina pesado, mas o corpo não acompanha",
  "Segue uma rotina, mas o shape parece sempre igual",
  "Passam semanas, meses… e nada muda",
  "Vê outras pessoas evoluindo mais rápido fazendo menos"
];

const explanationPoints = [
  { text: "O verdadeiro problema é", highlight: "treinar sem método." },
  { text: "Sem progressão clara, o corpo se adapta e", highlight: "para de responder." },
  { text: "Repetir os mesmos estímulos cria", highlight: "estagnação." },
  { text: "Cansa, ocupa tempo… mas", highlight: "não gera evolução real." }
];

const Problems = () => {
  const { ref: headlineRef, isVisible: headlineVisible } = useScrollAnimation();
  const { ref: painRef, isVisible: painVisible, getItemStyle: getPainStyle } = useStaggeredAnimation(painPoints.length, 100, 'fadeUp');
  const { ref: explanationRef, isVisible: explanationVisible } = useScrollAnimation();
  const { ref: closingRef, isVisible: closingVisible } = useScrollAnimation();

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/50 pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* 1️⃣ Headline provocativa */}
          <div 
            ref={headlineRef}
            className="text-center mb-12"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: headlineVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-accent mt-2">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* 2️⃣ Lista de dores reais - Cards com impacto */}
          <div ref={painRef} className="space-y-3 mb-12">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 bg-destructive/5 border border-destructive/10 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-destructive/10 hover:border-destructive/20"
                style={getPainStyle(index)}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                <p className="text-foreground/90 text-base sm:text-lg font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
          
          {/* Visual break - Arrow indicator */}
          <div 
            className="flex justify-center mb-10"
            style={{
              opacity: painVisible ? 1 : 0,
              transform: painVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease-out 0.4s, transform 0.5s ease-out 0.4s'
            }}
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-accent animate-bounce" />
            </div>
          </div>
          
          {/* 3️⃣ Subtítulo de ruptura */}
          <div 
            ref={explanationRef}
            className="text-center mb-10"
            style={{
              opacity: explanationVisible ? 1 : 0,
              transform: explanationVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-4">
              <AlertCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">A verdade</span>
            </div>
            <p className="text-foreground font-display text-xl sm:text-2xl md:text-3xl">
              O problema <span className="text-accent font-semibold">não é falta de esforço.</span>
            </p>
          </div>
          
          {/* 4️⃣ Explicação lógica da dor */}
          <div 
            className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 mb-10"
            style={{
              opacity: explanationVisible ? 1 : 0,
              transform: explanationVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
            }}
          >
            <div className="space-y-4">
              {explanationPoints.map((point, index) => (
                <p 
                  key={index}
                  className="text-muted-foreground text-base sm:text-lg text-center"
                >
                  {point.text} <span className="text-foreground font-semibold">{point.highlight}</span>
                </p>
              ))}
            </div>
          </div>
          
          {/* 5️⃣ Fechamento de autoridade */}
          <div 
            ref={closingRef}
            className="text-center"
            style={{
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div className="max-w-lg mx-auto">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                A maioria das pessoas treina assim por anos.
                <br />
                Não porque não querem evoluir —
              </p>
              <p className="text-foreground font-medium text-lg sm:text-xl mt-4 leading-relaxed">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent underline decoration-accent/30 underline-offset-4">
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