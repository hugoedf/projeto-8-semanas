import { Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Badge de contexto */}
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
              A ORIGEM
            </span>
          </div>
          
          {/* Header centralizado */}
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
              Por que o Método 8X existe
            </h2>
          </div>
          
          {/* Card Único - História fluida */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10">
            
            {/* Narrativa fluida como história */}
            <p className="text-gray-600 text-base sm:text-lg mb-6 text-center" style={{ lineHeight: '1.8' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque da solução - integrado */}
            <div className="flex items-start gap-4 bg-accent/10 border border-accent/30 rounded-xl p-5 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <p className="text-foreground text-base sm:text-lg font-medium" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-gray-700 text-base sm:text-lg text-center" style={{ lineHeight: '1.8' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-semibold">sem improviso</span>, <span className="text-accent font-semibold">sem achismo</span> e <span className="text-accent font-semibold">sem depender de motivação.</span>
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
