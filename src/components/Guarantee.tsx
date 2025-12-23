import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-14 sm:py-24 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="card-dark-glass p-6 sm:p-10 animate-fade-in">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-accent/40 bg-accent/10 mb-6 shadow-lg shadow-accent/10">
              <Shield className="w-4 h-4" />
              <span>Garantia Total</span>
            </div>
            
            {/* Selo de garantia - Centralizado */}
            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                <div className="absolute inset-0 bg-accent/25 rounded-full blur-[40px]" />
                <img
                  src={guaranteeBadge}
                  alt="Selo de Garantia 7 Dias"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Título */}
            <h2 className="font-display text-xl sm:text-3xl mb-4 text-white tracking-tight leading-tight">
              Garantia Incondicional de{" "}
              <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">7 Dias</span>
            </h2>
            
            {/* Texto */}
            <p className="text-white/80 leading-relaxed mb-6 text-sm sm:text-base px-2">
              Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
            
            {/* Benefícios - Vertical */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <div className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/90 text-sm font-medium">Sem risco</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/90 text-sm font-medium">Sem complicação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
