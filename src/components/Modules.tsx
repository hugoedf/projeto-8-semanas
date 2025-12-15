import { BookOpen } from "lucide-react";
const modules = [{
  number: "01",
  title: "Fundamentos da Hipertrofia",
  description: "A base científica do ganho de massa muscular. Entenda como o músculo se adapta e cresce, e como aplicar isso no treino."
}, {
  number: "02",
  title: "Avaliação e Objetivos",
  description: "Aprenda a avaliar seu ponto de partida, definir metas realistas e escolher a estratégia correta. Você aprende a se avaliar — não depende de acompanhamento externo."
}, {
  number: "03",
  title: "Treinos Estruturados (8 Semanas)",
  description: "Programação completa com progressão lógica para gerar adaptação real semana após semana."
}, {
  number: "04",
  title: "Nutrição Estratégica",
  description: "Como estruturar sua alimentação para hipertrofia de forma prática, sem extremismos."
}, {
  number: "05",
  title: "Sono, Recuperação e Performance",
  description: "Entenda como recuperação, descanso e rotina influenciam diretamente seus resultados."
}, {
  number: "06",
  title: "Técnicas Avançadas de Intensificação",
  description: "Drop-set, rest-pause, negativas e outras técnicas — quando usar, como usar e quando evitar."
}, {
  number: "07",
  title: "Mentalidade e Disciplina",
  description: "Como desenvolver constância, foco e uma mentalidade alinhada à evolução contínua."
}, {
  number: "08",
  title: "Autoacompanhamento e Ajustes",
  description: "Você aprende a medir sua própria evolução, identificar estagnações e saber quando ajustar treino, volume ou intensidade. O método ensina você a se acompanhar ao longo do processo."
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
            É um protocolo que te ensina a executar, analisar e ajustar sua própria evolução.
          </p>
        </div>
      </div>
    </section>;
};
export default Modules;