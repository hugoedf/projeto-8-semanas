import { Lightbulb, Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          
          {/* Card Único Unificado */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-100">
            
            {/* Badge Superior */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <span className="uppercase text-xs font-bold tracking-[0.15em] text-accent">
                Por que o Método 8X existe
              </span>
            </div>
            
            {/* Narrativa fluida como história */}
            <div className="space-y-5 sm:space-y-6">
              <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
                Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
              </p>
              
              {/* Destaque da solução */}
              <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <p className="text-foreground text-base sm:text-lg font-medium pt-1.5" style={{ lineHeight: '1.7' }}>
                  Era falta de um sistema <span className="text-accent font-semibold">simples</span>, <span className="text-accent font-semibold">progressivo</span> e <span className="text-accent font-semibold">aplicável</span> no dia a dia.
                </p>
              </div>
              
              <p className="text-foreground text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
                O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-semibold">sem improviso</span>, <span className="text-accent font-semibold">sem achismo</span> e <span className="text-accent font-semibold">sem depender de motivação.</span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;