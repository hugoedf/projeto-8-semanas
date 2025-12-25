import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Borda de destaque estilo certificado */}
          <div className="border-2 border-dashed border-accent/60 rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4">
            <div className="card-dark-glass p-5 sm:p-8 md:p-10 lg:p-14 rounded-xl sm:rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
                <div className="text-center md:text-left order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 sm:gap-2.5 text-accent font-semibold text-xs uppercase tracking-widest px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full border border-accent/40 bg-accent/10 mb-4 sm:mb-5 md:mb-7 shadow-lg shadow-accent/10">
                    <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span>Garantia Total</span>
                  </div>
                  
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 md:mb-5 text-white tracking-tight leading-tight">
                    Garantia Incondicional de{" "}
                    <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">7 Dias</span>
                  </h2>
                  
                  <p className="text-white/80 leading-relaxed mb-4 sm:mb-5 md:mb-7 text-xs sm:text-sm md:text-base">
                    Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor. Sem risco. Sem complicação.
                  </p>
                  
                  <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                    <div className="flex items-center md:items-start gap-2.5 sm:gap-3 justify-center md:justify-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 drop-shadow-sm" />
                      <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium">
                        Sem risco
                      </p>
                    </div>
                    <div className="flex items-center md:items-start gap-2.5 sm:gap-3 justify-center md:justify-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 drop-shadow-sm" />
                      <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium">
                        Sem complicação
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center order-1 md:order-2">
                  <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72">
                    <div className="absolute inset-0 bg-accent/25 rounded-full blur-[40px] sm:blur-[50px]" />
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
      </div>
    </section>
  );
};

export default Guarantee;
