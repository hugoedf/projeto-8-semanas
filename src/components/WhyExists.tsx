import { Lightbulb, Zap, BookOpen } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="section-breathing bg-white section-divider">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          {/* Badge Superior centralizado */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2.5 uppercase text-xs font-bold tracking-[0.15em] text-accent">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              Por que o Método 8X existe
            </span>
          </div>
          
          {/* Título com tracking tight */}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground tracking-[-0.02em] text-center mb-10">
            Criado para quem já tentou de tudo
          </h2>
          
          {/* Bloco de Impacto - Introdução emocional */}
          <div className="impact-block mb-12">
            <p>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
          </div>
          
          {/* Destaque visual para a solução */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/[0.04] border border-slate-100 mb-10">
            <div className="flex items-start gap-4 bg-accent/5 border border-accent/15 rounded-xl p-5 sm:p-6">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-base sm:text-lg font-medium pt-2" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-semibold">simples</span>, <span className="text-accent font-semibold">progressivo</span> e <span className="text-accent font-semibold">aplicável</span> no dia a dia.
              </p>
            </div>
          </div>
          
          {/* Revelação - Bloco de impacto final */}
          <div className="revelation-block">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-[0.1em]">A missão</span>
            </div>
            <p className="text-foreground text-base sm:text-lg font-medium" style={{ lineHeight: '1.75' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent">sem improviso</span>, <span className="text-accent">sem achismo</span> e <span className="text-accent">sem depender de motivação.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
