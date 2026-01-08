import { AlertTriangle } from "lucide-react";

const WhyExists = () => {
  return (
    <section className="py-10 sm:py-14 section-dark-premium relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(18,100%,58%,0.06),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">A Causa Raiz</span>
          </div>
          
          {/* Headline Direta */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-6 leading-tight">
            O problema <span className="text-accent">não é seu esforço</span>. É o sistema.
          </h2>
          
          {/* Bloco único de impacto */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
              Sem <span className="text-white font-semibold">progressão científica</span>, o corpo estagna. 
              Você treina, sua, se dedica — mas os resultados param.
            </p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
              Não é falta de vontade. É falta de <span className="text-accent font-semibold">método</span>.
            </p>
            
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
              <p className="text-white text-base sm:text-lg font-medium">
                O <span className="text-accent font-bold">Método 8X</span> existe para quebrar esse ciclo — 
                e fazer seu corpo voltar a responder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;