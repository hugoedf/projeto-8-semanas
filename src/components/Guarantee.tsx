import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";
const Guarantee = () => {
  return <section className="py-20 sm:py-28 bg-accent relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_40%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge de contexto */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-[0.2em]">
              <Shield className="w-4 h-4" />
              GARANTIA TOTAL
            </span>
          </div>
          
          {/* Layout principal */}
          <div className="flex flex-col items-center text-center">
            
            {/* Badge de garantia - Selo dourado centralizado */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8">
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-[50px] scale-125" />
              <img src={guaranteeBadge} alt="Selo de Garantia 7 Dias" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
            </div>
            
            {/* Título */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 tracking-tight text-primary">
              Garantia Incondicional de{" "}
              <span className="underline underline-offset-4 decoration-2">7 Dias</span>
            </h2>
            
            {/* Descrição */}
            <p style={{
            lineHeight: '1.8'
          }} className="mb-8 text-base sm:text-lg max-w-xl text-primary">
              Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
            
            {/* Checklist */}
            <div className="flex flex-wrap justify-center gap-6 text-primary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-white text-base font-medium">
                  Sem risco
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-base font-medium text-primary">
                  Sem complicação
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Guarantee;