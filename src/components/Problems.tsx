import { useStaggeredAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

const painPoints = [
  { before: "Treina pesado,", emphasis: "mas o corpo não acompanha." },
  { before: "Segue uma rotina,", emphasis: "mas o shape parece sempre igual." },
  { before: "Passam semanas, meses…", emphasis: "e nada muda." },
  { before: "Vê outras pessoas evoluindo", emphasis: "mais rápido fazendo menos." }
];

const insightPoints = [
  { text: "Treinar sem método", result: "gera adaptação." },
  { text: "Sem progressão clara", result: "o corpo para de responder." },
  { text: "Repetir os mesmos estímulos", result: "cria estagnação." }
];

const Problems = () => {
  const { ref: headlineRef, isVisible: headlineVisible } = useScrollAnimation();
  const { ref: painRef, isVisible: painVisible, getItemStyle: getPainStyle } = useStaggeredAnimation(painPoints.length, 120);
  const { ref: insightRef, isVisible: insightVisible, getItemStyle: getInsightStyle } = useStaggeredAnimation(insightPoints.length, 100);
  const { ref: closingRef, isVisible: closingVisible } = useScrollAnimation();

  return (
    <section className="py-24 sm:py-32 md:py-40 bg-background relative">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-xl mx-auto">
          
          {/* Headline - Clean & Direct */}
          <div 
            ref={headlineRef}
            className="text-center mb-16 sm:mb-20"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: headlineVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground leading-snug">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-accent/90 mt-1">
              e mesmo assim não vê resultado?
            </p>
          </div>
          
          {/* Pain Points - Elegant Typography */}
          <div ref={painRef} className="space-y-6 sm:space-y-8 mb-20 sm:mb-24">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="text-center"
                style={getPainStyle(index)}
              >
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {point.before}
                </p>
                <p className="text-foreground font-medium text-lg sm:text-xl mt-0.5">
                  {point.emphasis}
                </p>
              </div>
            ))}
          </div>
          
          {/* Minimal Divider */}
          <div 
            className="flex justify-center mb-16 sm:mb-20"
            style={{
              opacity: painVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.3s'
            }}
          >
            <div className="w-12 h-px bg-border" />
          </div>
          
          {/* Insight Section */}
          <div 
            ref={insightRef}
            className="text-center mb-14 sm:mb-16"
            style={{
              opacity: insightVisible ? 1 : 0,
              transform: insightVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground/70 mb-3">
              A verdade
            </p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground">
              O problema{" "}
              <span className="text-accent">não é falta de esforço.</span>
            </p>
          </div>
          
          {/* Insight Points - Clean List */}
          <div className="space-y-5 sm:space-y-6 mb-16 sm:mb-20">
            {insightPoints.map((point, index) => (
              <div 
                key={index}
                className="text-center"
                style={getInsightStyle(index)}
              >
                <p className="text-muted-foreground text-base sm:text-lg">
                  {point.text}{" "}
                  <span className="text-foreground/80">→</span>{" "}
                  <span className="text-foreground font-medium">{point.result}</span>
                </p>
              </div>
            ))}
          </div>
          
          {/* Minimal Divider */}
          <div 
            className="flex justify-center mb-14 sm:mb-16"
            style={{
              opacity: insightVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.3s'
            }}
          >
            <div className="w-12 h-px bg-border" />
          </div>
          
          {/* Closing Statement */}
          <div 
            ref={closingRef}
            className="text-center"
            style={{
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              A maioria treina assim por anos.
              <br />
              Não porque não querem evoluir —
            </p>
            <p className="text-foreground text-lg sm:text-xl leading-relaxed">
              mas porque ninguém ensinou um{" "}
              <span className="text-accent font-medium">
                sistema estruturado.
              </span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;