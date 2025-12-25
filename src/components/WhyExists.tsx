import { Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(14,100%,60%,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
              Por que o Método 8X existe
            </h2>
          </div>
          
          {/* Card - História */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            
            {/* Narrativa */}
            <p className="text-muted-foreground text-base sm:text-lg mb-6 text-center" style={{ lineHeight: '1.8' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque da solução */}
            <div className="flex items-start gap-4 bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-base sm:text-lg font-medium" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-muted-foreground text-base sm:text-lg text-center" style={{ lineHeight: '1.8' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-medium">sem improviso</span>, <span className="text-accent font-medium">sem achismo</span> e <span className="text-accent font-medium">sem depender de motivação.</span>
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
