import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";
import { useScrollAnimation, useStampAnimation } from "@/hooks/useScrollAnimation";

const Guarantee = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: sealRef, isVisible: sealVisible, className: stampClassName } = useStampAnimation();
  
  return (
    <section className="py-16 sm:py-24 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={contentRef}
            className="card-dark-glass p-7 sm:p-10 md:p-14"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2.5 text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 mb-5 sm:mb-7 shadow-lg shadow-accent/10">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Garantia Total</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 text-white tracking-tight leading-tight">
                  Garantia Incondicional de{" "}
                  <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">7 Dias</span>
                </h2>
                
                <p className="text-white/80 leading-relaxed mb-5 sm:mb-7 text-sm sm:text-base">
                  Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor. Sem risco. Sem complicação.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 drop-shadow-sm" />
                    <p className="text-white/80 text-sm sm:text-base text-left font-medium">
                      Sem risco
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 drop-shadow-sm" />
                    <p className="text-white/80 text-sm sm:text-base text-left font-medium">
                      Sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center order-1 md:order-2">
                <div 
                  ref={sealRef}
                  className={`relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 ${stampClassName}`}
                >
                  <div className="absolute inset-0 bg-accent/25 rounded-full blur-[50px]" />
                  <img
                    src={guaranteeBadge}
                    alt="Selo de Garantia 7 Dias"
                    className="relative z-10 w-full h-full object-contain glow-accent-strong drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
