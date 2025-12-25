import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge de contexto - Laranja */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em]">
              <Shield className="w-4 h-4" />
              GARANTIA TOTAL
            </span>
          </div>
          
          {/* Layout principal */}
          <div className="flex flex-col items-center text-center">
            
            {/* Badge de garantia - Selo com borda laranja */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-[40px] scale-110" />
              <div className="relative z-10 w-full h-full rounded-full border-4 border-accent/50 overflow-hidden flex items-center justify-center">
                <img
                  src={guaranteeBadge}
                  alt="Selo de Garantia 7 Dias"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Título - Laranja */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 text-accent tracking-tight">
              Garantia Incondicional de{" "}
              <span className="text-[#1a1a1a]">7 Dias</span>
            </h2>
            
            {/* Descrição - Preto */}
            <p className="text-[#1a1a1a]/70 mb-8 text-base sm:text-lg max-w-xl" style={{ lineHeight: '1.8' }}>
              Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
            
            {/* Checklist - Laranja */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  Sem risco
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  Sem complicação
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
