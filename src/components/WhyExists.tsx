import { Lightbulb, Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 gradient-hero relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(18,100%,58%,0.06),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight text-center sm:text-left">
              Por que o <span className="text-accent">Método 8X</span> existe
            </h2>
          </div>
          
          {/* Premium White Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 lg:p-10 shadow-2xl shadow-black/40">
            <div className="space-y-7">
              {/* Primeiro parágrafo */}
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
              </p>
              
              {/* Destaque visual para a solução */}
              <div className="flex items-start gap-4 bg-accent/5 border border-accent/15 rounded-xl p-5 sm:p-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <p className="text-black text-base sm:text-lg lg:text-xl font-medium pt-2">
                  Era falta de um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span> no dia a dia.
                </p>
              </div>
              
              {/* Segundo parágrafo */}
              <p className="text-black text-base sm:text-lg lg:text-xl font-medium">
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