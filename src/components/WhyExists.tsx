import { Lightbulb, Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* BLOCO ÚNICO - Card Premium com narrativa fluida */}
        <div className="max-w-[720px] mx-auto bg-slate-50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
          
          {/* Badge Superior */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 uppercase text-xs font-bold tracking-[0.15em] text-accent">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-accent" />
              </div>
              Por que o Método 8X existe
            </span>
          </div>
          
          {/* Narrativa fluida - Um único bloco de história */}
          <div className="space-y-4 text-center">
            <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque interno sutil */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-base sm:text-lg font-medium text-left" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-semibold">simples</span>, <span className="text-accent font-semibold">progressivo</span> e <span className="text-accent font-semibold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-slate-700 text-base sm:text-lg font-medium" style={{ lineHeight: '1.8' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent">sem improviso</span>, <span className="text-accent">sem achismo</span> e <span className="text-accent">sem depender de motivação.</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
