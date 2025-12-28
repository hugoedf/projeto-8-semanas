import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-12 sm:py-18 section-dark-premium relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark-glass p-6 sm:p-8 md:p-10 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="text-center md:text-left order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/40 bg-accent/10 mb-4 sm:mb-5 shadow-lg shadow-accent/10">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>O risco é todo meu</span>
                  </div>
                  
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-white tracking-tight leading-tight">
                    7 dias para testar.{" "}
                    <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">Risco zero.</span>
                  </h2>
                  
                  <p className="text-white/80 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
                    Acesse tudo. Aplique o método. Sinta a diferença no seu treino. Se em 7 dias você não sentir que valeu cada centavo, devolvo 100% do valor. Sem perguntas, sem burocracia.
                  </p>
                  
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 drop-shadow-sm" />
                      <p className="text-white/80 text-sm sm:text-base text-left font-medium">
                        Você não arrisca nada — eu assumo o risco
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 drop-shadow-sm" />
                      <p className="text-white/80 text-sm sm:text-base text-left font-medium">
                        Devolução imediata, sem complicação
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center order-1 md:order-2">
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72">
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
