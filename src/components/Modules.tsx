import { BookOpen } from "lucide-react";
const modules = [{
  number: "01",
  title: "Fundamentos da Hipertrofia",
  description: "A base científica do ganho muscular e como aplicar isso no treino."
}, {
  number: "02",
  title: "Avaliação e Objetivos",
  description: "Entenda seu nível e defina suas metas de forma realista. Você aprende a se avaliar sem acompanhamento externo."
}, {
  number: "03",
  title: "Treinos Estruturados (8 Semanas)",
  description: "Progressão lógica e semanal para evolução real."
}, {
  number: "04",
  title: "Nutrição Estratégica",
  description: "Como comer de forma prática e eficiente para hipertrofia."
}, {
  number: "05",
  title: "Sono, Recuperação e Performance",
  description: "A base invisível do crescimento: recuperação e descanso."
}, {
  number: "06",
  title: "Técnicas Avançadas de Intensificação",
  description: "Drop-set, rest-pause, negativas e como aplicar de forma segura."
}, {
  number: "07",
  title: "Mentalidade e Disciplina",
  description: "Construção de constância, foco e disciplina para evolução contínua."
}, {
  number: "08",
  title: "Autoacompanhamento e Ajustes",
  description: "Como medir sua evolução e fazer ajustes conforme necessário. O método ensina você a se acompanhar e corrigir o curso."
}];
const Modules = () => {
  return <section className="py-16 sm:py-24 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-5">
            <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm shadow-lg shadow-accent/10">
              📘 Conteúdo Completo

            </span>
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
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto px-4 leading-relaxed">
            O Método 8X não é acompanhamento individual.<br />
            É um protocolo para autoavaliação e ajustes contínuos.
          </p>
        </div>
      </div>
    </section>;
};
export default Modules;