import { Zap } from "lucide-react";
const WhyExists = () => {
  return <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.08),transparent_70%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Badge de contexto */}
          
          
          {/* Header centralizado */}
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
              Por que o Método 8X existe
            </h2>
          </div>
          
          {/* Card Único - História fluida */}
          <div className="backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800 bg-[#151313]">
            
            {/* Narrativa fluida como história */}
            <p className="text-gray-400 text-base sm:text-lg mb-6 text-center" style={{
            lineHeight: '1.8'
          }}>
              Depois de anos vendo pessoas se dedicarem de verdade — treinando pesado, abrindo mão de tempo e mesmo assim ficando estagnadas — ficou claro que o problema não era esforço.
            </p>
            
            {/* Destaque da solução - integrado */}
            <div className="flex items-start gap-4 border border-accent/20 rounded-xl p-5 mb-6 bg-primary">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <p className="text-white text-base sm:text-lg font-medium" style={{
              lineHeight: '1.7'
            }}>
                Era falta de um sistema <span className="text-accent font-bold">simples</span>, <span className="text-accent font-bold">progressivo</span> e <span className="text-accent font-bold">aplicável</span> no dia a dia.
              </p>
            </div>
            
            <p className="text-gray-300 text-base sm:text-lg text-center" style={{
            lineHeight: '1.8'
          }}>
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, <span className="text-accent font-semibold">sem improviso</span>, <span className="text-accent font-semibold">sem achismo</span> e <span className="text-accent font-semibold">sem depender de motivação.</span>
            </p>
            
          </div>
        </div>
      </div>
    </section>;
};
export default WhyExists;