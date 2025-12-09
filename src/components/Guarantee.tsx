import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-16 sm:py-24 gradient-hero relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(15,100%,59%,0.06),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-14 animate-fade-in border border-accent/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
              {/* Content */}
              <div className="text-center md:text-left order-2 md:order-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-5 sm:mb-6">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Garantia Total</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 text-foreground leading-tight">
                  Garantia incondicional de{" "}
                  <span className="text-accent">7 dias.</span>
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                  Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm text-left">
                      Sem risco
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm text-left">
                      Sem complicação
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Badge Image */}
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72">
                  <div className="absolute inset-0 bg-accent/15 rounded-full blur-[50px]" />
                  <img
                    src={guaranteeBadge}
                    alt="Selo de Garantia 7 Dias"
                    className="relative z-10 w-full h-full object-contain animate-pulse-glow"
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
