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
  return <section id="modules-section" className="py-12 sm:py-16 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 text-white px-2 tracking-tight">
            8 módulos. <span className="text-accent">8 semanas.</span> Resultado real.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {modules.map((module, index) => <div key={index} className="card-dark-glass p-4 sm:p-5 hover-lift animate-fade-in transition-all duration-300" style={{
          animationDelay: `${index * 0.05}s`
        }}>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center border border-accent/30">
                  <span className="font-display text-base font-bold text-accent">
                    {module.number}
                  </span>
                </div>
                <h3 className="font-display text-sm sm:text-base text-white tracking-tight leading-tight">
                  {module.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Modules;