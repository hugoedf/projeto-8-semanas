import { BookOpen } from "lucide-react";
const modules = [{
  number: "01",
  title: "Fundamentos da Hipertrofia",
  description: "Ciência aplicada ao ganho de massa."
}, {
  number: "02",
  title: "Avaliação e Objetivos",
  description: "Entenda seu nível e metas reais."
}, {
  number: "03",
  title: "Treinos 8 Semanas",
  description: "Estratégia progressiva para evolução constante."
}, {
  number: "04",
  title: "Nutrição Estratégica",
  description: "Como comer para crescer de verdade."
}, {
  number: "05",
  title: "Sono e Recuperação",
  description: "Os pilares ignorados que aceleram resultados."
}, {
  number: "06",
  title: "Técnicas Avançadas",
  description: "Drop-set, rest-pause e intensificação."
}, {
  number: "07",
  title: "Mentalidade",
  description: "Constância, foco e disciplina."
}, {
  number: "08",
  title: "Acompanhamento",
  description: "Como medir e ajustar para evoluir sempre."
}];
const Modules = () => {
  return <section className="py-12 sm:py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/10">
              Conteúdo Completo
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 text-primary-foreground px-2">
            Conheça o conteúdo do{" "}
            <span className="text-accent">Método 8x </span>
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto px-4">
            8 módulos completos que vão te guiar do básico ao avançado
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {modules.map((module, index) => <div key={index} className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-4 sm:p-6 hover-lift animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
                    <span className="font-display text-xl sm:text-2xl font-bold text-accent">
                      {module.number}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-xl mb-1 sm:mb-2 text-primary-foreground flex items-start gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 sm:mt-1 flex-shrink-0" />
                    <span className="break-words">{module.title}</span>
                  </h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed break-words">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Modules;