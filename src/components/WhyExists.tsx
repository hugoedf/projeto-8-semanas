import { Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mx-auto">
          
          {/* Card Único - História fluida */}
          <div className="bg-slate-50 rounded-xl p-5 sm:p-7 md:p-8 border border-slate-100">
            
            {/* Título simples */}
            <p className="text-xs font-bold text-accent uppercase tracking-[0.12em] mb-4">
              Por que o Método 8X existe
            </p>
            
            {/* Narrativa fluida como história - sem fragmentação */}
            <p className="text-slate-600 text-sm sm:text-base mb-4" style={{ lineHeight: '1.75' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque da solução - integrado */}
            <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center mt-0.5">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <p className="text-foreground text-sm sm:text-base font-medium" style={{ lineHeight: '1.65' }}>
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