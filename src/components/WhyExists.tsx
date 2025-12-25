import { Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[650px] mx-auto">
          
          {/* Header centralizado */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.15em] mb-4">
              A Origem
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-foreground">
              Por que o Método 8X existe
            </h2>
          </div>
          
          {/* Card Único - História fluida */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-md shadow-black/[0.04]">
            
            {/* Narrativa fluida como história - sem fragmentação */}
            <p className="text-slate-600 text-sm sm:text-base mb-5" style={{ lineHeight: '1.75' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque da solução - integrado */}
            <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-5 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/15 flex items-center justify-center mt-0.5">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-sm sm:text-base font-medium" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-semibold">simples</span>, <span className="text-accent font-semibold">progressivo</span> e <span className="text-accent font-semibold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-foreground text-sm sm:text-base" style={{ lineHeight: '1.75' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-semibold">sem improviso</span>, <span className="text-accent font-semibold">sem achismo</span> e <span className="text-accent font-semibold">sem depender de motivação.</span>
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;