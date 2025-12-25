import { Lightbulb, Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[650px] mx-auto">
          {/* Badge Superior centralizado */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2.5 uppercase text-xs font-bold tracking-[0.15em] text-accent">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              Por que o Método 8X existe
            </span>
          </div>
          
          {/* Título com tracking tight */}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground tracking-[-0.02em] text-center mb-8">
            Criado para quem já tentou de tudo
          </h2>
          
          {/* Premium White Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/[0.05] border border-slate-100">
            <div className="space-y-6">
              {/* Primeiro parágrafo */}
              <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
                Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
              </p>
              
              {/* Destaque visual para a solução */}
              <div className="flex items-start gap-4 bg-accent/5 border border-accent/15 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <p className="text-foreground text-base sm:text-lg font-medium pt-1.5" style={{ lineHeight: '1.7' }}>
                  Era falta de um sistema <span className="text-accent">simples</span>, <span className="text-accent">progressivo</span> e <span className="text-accent">aplicável</span> no dia a dia.
                </p>
              </div>
              
              {/* Segundo parágrafo - missão */}
              <p className="text-foreground text-base sm:text-lg font-medium" style={{ lineHeight: '1.75' }}>
                O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, sem improviso, sem achismo e sem depender de motivação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
