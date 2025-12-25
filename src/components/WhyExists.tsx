import { Zap } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(16,100%,60%,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
              A ORIGEM
            </span>
          </div>
          
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-accent">
              Por que o Método 8X existe
            </h2>
          </div>
          
          <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-accent/30">
            <p className="text-white/70 text-base sm:text-lg mb-6 text-center" style={{ lineHeight: '1.8' }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            <div className="flex items-start gap-4 bg-accent/10 border-2 border-accent/40 rounded-xl p-5 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 border border-accent/50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <p className="text-white text-base sm:text-lg font-medium" style={{ lineHeight: '1.7' }}>
                Era falta de um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-white/80 text-base sm:text-lg text-center" style={{ lineHeight: '1.8' }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-semibold">sem improviso</span>, <span className="text-accent font-semibold">sem achismo</span> e <span className="text-accent font-semibold">sem depender de motivação.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;