import { X, AlertCircle, ChevronDown } from "lucide-react";
import { useStaggeredAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

const painPoints = [
  { text: "Treina pesado", emphasis: "mas o corpo não acompanha" },
  { text: "Segue uma rotina", emphasis: "mas o shape parece sempre igual" },
  { text: "Passam semanas, meses…", emphasis: "e nada muda" },
  { text: "Vê outras pessoas evoluindo mais rápido", emphasis: "fazendo menos" }
];

const explanationPoints = [
  { text: "O verdadeiro problema é", highlight: "treinar sem método." },
  { text: "Sem progressão clara, o corpo se adapta e", highlight: "para de responder." },
  { text: "Repetir os mesmos estímulos cria", highlight: "estagnação." },
  { text: "Cansa, ocupa tempo…", highlight: "mas não gera evolução real." }
];

const Problems = () => {
  const { ref: headlineRef, isVisible: headlineVisible } = useScrollAnimation();
  const { ref: painRef, isVisible: painVisible, getItemStyle: getPainStyle } = useStaggeredAnimation(painPoints.length, 100);
  const { ref: truthRef, isVisible: truthVisible } = useScrollAnimation();
  const { ref: explanationRef, isVisible: explanationVisible, getItemStyle: getExplanationStyle } = useStaggeredAnimation(explanationPoints.length, 80);
  const { ref: closingRef, isVisible: closingVisible } = useScrollAnimation();

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Layered background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-muted/60 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* ══════════════ HEADLINE BLOCK ══════════════ */}
          <div 
            ref={headlineRef}
            className="text-center mb-16 sm:mb-20"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: headlineVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <p className="text-muted-foreground text-sm sm:text-base uppercase tracking-[0.2em] mb-4 sm:mb-6">
              Talvez você se identifique
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1] mb-4">
              Você treina, se esforça…
            </h2>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              <span className="text-accent">e mesmo assim não vê resultado?</span>
            </p>
          </div>
          
          {/* ══════════════ PAIN POINTS GRID ══════════════ */}
          <div ref={painRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-16 sm:mb-20">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-card hover:border-destructive/30 hover:shadow-lg hover:shadow-destructive/5"
                style={getPainStyle(index)}
              >
                {/* Number indicator */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                
                <p className="text-foreground/70 text-base sm:text-lg leading-relaxed">
                  {point.text}
                </p>
                <p className="text-foreground font-semibold text-lg sm:text-xl mt-1">
                  {point.emphasis}
                </p>
              </div>
            ))}
          </div>
          
          {/* ══════════════ VISUAL DIVIDER ══════════════ */}
          <div 
            className="flex flex-col items-center gap-4 mb-16 sm:mb-20"
            style={{
              opacity: painVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.5s'
            }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent/40 to-accent/60" />
            <ChevronDown className="w-6 h-6 text-accent animate-bounce" />
          </div>
          
          {/* ══════════════ TRUTH REVELATION ══════════════ */}
          <div 
            ref={truthRef}
            className="text-center mb-12 sm:mb-16"
            style={{
              opacity: truthVisible ? 1 : 0,
              transform: truthVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-2.5 mb-6">
              <AlertCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">A verdade</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              O problema <span className="text-accent font-bold">não é falta de esforço.</span>
            </h3>
          </div>
          
          {/* ══════════════ EXPLANATION CARDS ══════════════ */}
          <div 
            ref={explanationRef}
            className="space-y-4 sm:space-y-5 mb-16 sm:mb-20"
          >
            {explanationPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-card/60 backdrop-blur-sm border-l-4 border-accent/40 rounded-r-xl px-5 sm:px-6 py-4 sm:py-5 hover:border-accent/70 transition-colors duration-300"
                style={getExplanationStyle(index)}
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2.5" />
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {point.text}{" "}
                  <span className="text-foreground font-semibold">{point.highlight}</span>
                </p>
              </div>
            ))}
          </div>
          
          {/* ══════════════ CLOSING STATEMENT ══════════════ */}
          <div 
            ref={closingRef}
            className="text-center relative"
            style={{
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            {/* Decorative quotes */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-accent/10 font-serif select-none">
              "
            </div>
            
            <div className="max-w-xl mx-auto bg-gradient-to-b from-card/80 to-card/40 border border-border/50 rounded-3xl p-8 sm:p-10">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                A maioria das pessoas treina assim por anos.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                Não porque não querem evoluir —
              </p>
              
              <div className="w-12 h-px bg-accent/50 mx-auto mb-6" />
              
              <p className="text-foreground font-medium text-lg sm:text-xl md:text-2xl leading-relaxed">
                mas porque ninguém ensinou um{" "}
                <span className="text-accent relative">
                  sistema estruturado, progressivo e aplicável.
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30" />
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