import { BookOpen } from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Fundamentos da Hipertrofia",
    description: "Entenda a ciência por trás do ganho de massa muscular e os princípios que regem o crescimento."
  },
  {
    number: "02",
    title: "Avaliação e Objetivos",
    description: "Como avaliar seu estado atual e estabelecer metas realistas e alcançáveis."
  },
  {
    number: "03",
    title: "Treinos Estruturados 8 Semanas",
    description: "Programação completa de treinos progressivos adaptados ao seu nível."
  },
  {
    number: "04",
    title: "Nutrição Estratégica para Hipertrofia",
    description: "Aprenda a calcular e estruturar sua dieta para maximizar ganhos."
  },
  {
    number: "05",
    title: "Sono, Recuperação e Performance",
    description: "Os pilares esquecidos que fazem toda diferença nos resultados."
  },
  {
    number: "06",
    title: "Técnicas Avançadas e Intensificação",
    description: "Drop-set, rest-pause, negativas e outras técnicas para romper platôs."
  },
  {
    number: "07",
    title: "Mentalidade e Disciplina",
    description: "Como desenvolver a consistência necessária para transformar seu corpo."
  },
  {
    number: "08",
    title: "Acompanhamento e Ajustes",
    description: "Como monitorar progresso e fazer ajustes inteligentes no caminho."
  },
];

const Modules = () => {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-accent font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
              Conteúdo Completo
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl mb-4 text-primary-foreground">
            Conheça o conteúdo do{" "}
            <span className="text-accent">Projeto 8 Semanas</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            8 módulos completos que vão te guiar do básico ao avançado
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
                    <span className="font-display text-2xl font-bold text-accent">
                      {module.number}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl mb-2 text-primary-foreground flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    {module.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-primary-foreground/90 font-semibold text-lg">
            + Planilhas de treino editáveis e guias de execução ilustrados
          </p>
        </div>
      </div>
    </section>
  );
};

export default Modules;
