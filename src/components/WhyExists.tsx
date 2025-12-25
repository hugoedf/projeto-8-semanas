import { Lightbulb, Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="section-spacing-sm bg-muted/40">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Título editorial com ícone */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground tracking-tight">
              Por que o <span className="text-accent">Método 8X</span> existe
            </h2>
          </div>
          
          {/* Container destacado - HERO Box */}
          <div className="relative">
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl scale-105" />
            
            {/* Main card with accent border glow */}
            <div className="solution-hero-box relative">
              {/* Decorative top line */}
              <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              
              <div className="space-y-6">
                {/* Primeiro parágrafo */}
                <p className="text-muted-foreground text-base sm:text-lg">
                  Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
                </p>
                
                {/* Destaque visual para a solução */}
                <div className="flex items-start gap-4 bg-accent/5 border border-accent/15 rounded-xl p-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-foreground text-base sm:text-lg font-medium pt-1.5">
                    Era falta de um sistema <span className="text-accent">simples</span>, <span className="text-accent">progressivo</span> e <span className="text-accent">aplicável</span> no dia a dia.
                  </p>
                </div>
                
                {/* Segundo parágrafo - missão */}
                <p className="text-foreground text-base sm:text-lg font-medium pt-1">
                  O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, sem improviso, sem achismo e sem depender de motivação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;