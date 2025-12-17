import { BookOpen } from "lucide-react";
const modules = [{
  number: "01",
  title: "Entenda como o músculo cresce",
  description: "A base que faz qualquer treino fazer sentido."
}, {
  number: "02",
  title: "Descubra seu ponto de partida",
  description: "Aprenda a se avaliar e definir metas realistas — sem depender de ninguém."
}, {
  number: "03",
  title: "8 semanas de treino pronto",
  description: "Progressão semanal clara para você saber exatamente o que fazer."
}, {
  number: "04",
  title: "Coma certo sem complicação",
  description: "Nutrição prática e eficiente para ganhar músculo."
}, {
  number: "05",
  title: "Descanse para crescer",
  description: "Como sono e recuperação aceleram seus resultados."
}, {
  number: "06",
  title: "Técnicas para intensificar",
  description: "Drop-set, rest-pause e mais — quando e como usar."
}, {
  number: "07",
  title: "Mentalidade que não falha",
  description: "Construa constância e foco para nunca mais abandonar."
}, {
  number: "08",
  title: "Saiba quando ajustar",
  description: "Aprenda a medir evolução e corrigir o rumo sozinho."
}];
const Modules = () => {
  return <section className="py-16 sm:py-24 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-5">
            <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm shadow-lg shadow-accent/10">CONTEÚDO COMPLETO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 text-white px-2 tracking-tight">
            O Conteúdo do{" "}
            <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">Método 8X</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto px-4 leading-relaxed">8 módulos que te ensinam a executar, avaliar e ajustar sua evolução — com ciência e método.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {modules.map((module, index) => <div key={index} className="card-dark-glass p-5 sm:p-7 hover-lift animate-fade-in transition-all duration-300" style={{
          animationDelay: `${index * 0.08}s`
        }}>
              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/10">
                    <span className="font-display text-xl sm:text-2xl font-bold text-accent">
                      {module.number}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-display text-base sm:text-lg mb-2 text-white flex items-start gap-2.5 tracking-tight">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="break-words">{module.title}</span>
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed break-words">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
        
        <div className="text-center mt-12 sm:mt-16 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              <span className="text-accent font-semibold">O Método 8X não é um treino pronto.</span><br />
              É o conhecimento que faz qualquer treino funcionar.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Modules;