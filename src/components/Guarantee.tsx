import { Shield, CheckCircle, Clock } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-12 sm:py-16 bg-black relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(45,100%,50%,0.06),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
              
              {/* Content */}
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 mb-5 shadow-lg shadow-amber-400/10">
                  <Shield className="w-4 h-4" />
                  <span>O risco é todo meu</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 text-white tracking-tight leading-tight">
                  7 dias para testar.{" "}
                  <span className="text-amber-400">Risco zero.</span>
                </h2>
                
                <p className="text-white/80 leading-relaxed mb-5 text-sm sm:text-base">
                  Acesse tudo. Aplique o método. Sinta a diferença no seu treino. Se em 7 dias você não sentir que valeu cada centavo, devolvo 100% do valor. <span className="text-white font-semibold">Sem perguntas, sem burocracia.</span>
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-white/90 text-sm sm:text-base text-left font-medium">
                      Você não arrisca nada — eu assumo o risco
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-white/90 text-sm sm:text-base text-left font-medium">
                      Devolução imediata, sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-[50px]" />
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
