import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="section-breathing gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Card premium sem bordas duras */}
          <div className="guarantee-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                {/* Badge elegante */}
                <div className="inline-flex items-center gap-2.5 text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent/10 mb-5 sm:mb-7 shadow-lg shadow-accent/10">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Garantia Total</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 text-white tracking-tight leading-tight">
                  Garantia Incondicional de{" "}
                  <span className="text-accent drop-shadow-[0_0_20px_hsla(18,100%,58%,0.35)]">7 Dias</span>
                </h2>
                
                <p className="text-white/75 leading-relaxed mb-5 sm:mb-7 text-sm sm:text-base" style={{ lineHeight: '1.8' }}>
                  Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-white/85 text-sm sm:text-base text-left font-medium">
                      Sem risco
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-white/85 text-sm sm:text-base text-left font-medium">
                      Sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  {/* Glow suave atrás do badge */}
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-[40px] scale-110" />
                  <img
                    src={guaranteeBadge}
                    alt="Selo de Garantia 7 Dias"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 30px hsla(18, 100%, 58%, 0.25))' }}
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
