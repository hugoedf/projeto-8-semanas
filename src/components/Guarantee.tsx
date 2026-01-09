import { Shield, CheckCircle, Clock } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(45,100%,50%,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Content */}
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 mb-6 shadow-lg shadow-amber-400/10">
                  <Shield className="w-4 h-4" />
                  <span>O risco é todo meu</span>
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-white tracking-tight leading-tight">
                  7 dias para testar.{" "}
                  <span className="text-amber-400">Risco zero.</span>
                </h2>
                
                <p className="text-white/80 leading-relaxed mb-6 text-base sm:text-lg">
                  Acesse tudo. Aplique o método. Sinta a diferença no seu treino. Se em 7 dias você não sentir que valeu cada centavo, devolvo 100% do valor. <span className="text-white font-semibold">Sem perguntas, sem burocracia.</span>
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-white/90 text-base sm:text-lg text-left font-medium">
                      Você não arrisca nada — eu assumo o risco
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-white/90 text-base sm:text-lg text-left font-medium">
                      Devolução imediata, sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-[60px]" />
                  <img
                    src={guaranteeBadge}
                    alt="Selo de Garantia 7 Dias"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
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