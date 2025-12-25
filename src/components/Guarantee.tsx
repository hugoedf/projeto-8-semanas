import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge de contexto */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em]">
              <Shield className="w-4 h-4" />
              GARANTIA TOTAL
            </span>
          </div>
          
          {/* Layout principal */}
          <div className="flex flex-col items-center text-center">
            
            {/* Badge de garantia - Selo dourado centralizado */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-[40px] scale-110" />
              <img
                src={guaranteeBadge}
                alt="Selo de Garantia 7 Dias"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Título */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 text-white tracking-tight">
              Garantia Incondicional de{" "}
              <span className="text-accent">7 Dias</span>
            </h2>
            
            {/* Descrição */}
            <p className="text-gray-400 mb-8 text-base sm:text-lg max-w-xl" style={{ lineHeight: '1.8' }}>
              Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
            
            {/* Checklist */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <p className="text-white text-base font-medium">
                  Sem risco
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <p className="text-white text-base font-medium">
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
