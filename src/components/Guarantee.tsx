import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.jpg";

const Guarantee = () => {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 md:p-12 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Garantia Total</span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl mb-4 text-primary-foreground">
                  Garantia de{" "}
                  <span className="text-accent">7 Dias</span>
                </h2>
                
                <p className="text-primary-foreground/80 leading-relaxed mb-6">
                  Experimente o ebook por 7 dias. Se não estiver satisfeito, 
                  devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-sm">
                      Satisfação total ou seu dinheiro de volta
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-sm">
                      Sem complicação, sem burocracia
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-primary-foreground/80 text-sm">
                      Risco zero para você
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
                  <img
                    src={guaranteeBadge}
                    alt="Selo de Garantia 7 Dias"
                    className="relative z-10 w-64 h-64 object-contain animate-pulse-glow"
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
