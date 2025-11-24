import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge-hq.png";

const Guarantee = () => {
  return (
    <section className="py-12 sm:py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6 sm:p-8 md:p-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/10 mb-4 sm:mb-6">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Garantia Total</span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-primary-foreground">
                  Garantia de{" "}
                  <span className="text-accent">7 Dias</span>
                </h2>
                
                <p className="text-primary-foreground/80 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Experimente o ebook por 7 dias. Se não estiver satisfeito, 
                  devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-xs sm:text-sm text-left">
                      Satisfação total ou seu dinheiro de volta
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-xs sm:text-sm text-left">
                      Sem complicação, sem burocracia
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-xs sm:text-sm text-left">
                      Risco zero para você
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
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
