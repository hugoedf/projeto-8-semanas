import { Shield, CheckCircle } from "lucide-react";
import guaranteeBadge from "@/assets/guarantee-badge.png";

const Guarantee = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge de garantia - Selo dourado */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-6 mx-auto">
            <div className="absolute inset-0 bg-yellow-500/15 rounded-full blur-[30px] scale-110" />
            <img src={guaranteeBadge} alt="Selo de Garantia 7 Dias" className="relative z-10 w-full h-full object-contain" />
          </div>
          
          {/* Título */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 text-foreground tracking-tight">
            Garantia Incondicional de <span className="text-accent">7 Dias</span>
          </h2>
          
          {/* Descrição */}
          <p className="text-muted-foreground mb-6 text-base sm:text-lg max-w-lg mx-auto" style={{ lineHeight: '1.8' }}>
            Teste o método. Aplique. Sinta a diferença. Se não fizer sentido pra você, devolvemos 100% do valor.
          </p>
          
          {/* Checklist */}
          <div className="flex flex-wrap justify-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
              </div>
              <p className="text-foreground text-sm font-medium">Sem risco</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
              </div>
              <p className="text-foreground text-sm font-medium">Sem complicação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
