import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Card premium */}
          <div className="guarantee-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
              
              {/* Badge + Texto - Mobile: primeiro / Desktop: esquerda */}
              <div className="order-2 md:order-1">
                {/* Badge de contexto */}
                <div className="text-center md:text-left mb-5 sm:mb-6">
                  <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full bg-accent/10">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Garantia Total</span>
                  </span>
                </div>
                
                {/* Título - centralizado mobile, esquerda desktop */}
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-5 text-white tracking-[-0.02em] leading-tight text-center md:text-left">
                  Garantia Incondicional de{" "}
                  <span className="text-accent drop-shadow-[0_0_20px_hsla(18,100%,58%,0.35)]">7 Dias</span>
                </h2>
                
                {/* Descrição - alinhada à esquerda para leitura natural */}
                <p className="text-white/75 mb-5 sm:mb-6 text-sm sm:text-base text-left" style={{ lineHeight: '1.8' }}>
                  Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
                </p>
                
                {/* Checklist - alinhado à esquerda */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent/15 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <p className="text-white/85 text-sm sm:text-base font-medium">
                      Sem risco
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent/15 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <p className="text-white/85 text-sm sm:text-base font-medium">
                      Sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Badge de garantia - Mobile: primeiro / Desktop: direita */}
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                  {/* Glow suave atrás do badge */}
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-[30px] sm:blur-[40px] scale-110" />
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
