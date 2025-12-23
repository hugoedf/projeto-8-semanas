import { BookOpen } from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Como o músculo cresce",
    description: "A base que faz tudo fazer sentido — sem enrolação."
  },
  {
    number: "02",
    title: "Seu ponto de partida",
    description: "Descubra onde você está e para onde vai."
  },
  {
    number: "03",
    title: "8 semanas de treino",
    description: "O plano completo. Só seguir."
  },
  {
    number: "04",
    title: "Alimentação simples",
    description: "Coma para crescer, sem complicação."
  },
  {
    number: "05",
    title: "Descanso estratégico",
    description: "Recuperação que acelera resultados."
  },
  {
    number: "06",
    title: "Técnicas avançadas",
    description: "Quebre a estagnação quando precisar."
  },
  {
    number: "07",
    title: "Mentalidade forte",
    description: "Nunca mais abandonar no meio."
  },
  {
    number: "08",
    title: "Ajuste fino",
    description: "Saiba quando e como corrigir."
  }
];

const Modules = () => {
  return (
    <section id="modules-section" className="py-12 sm:py-16 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 text-white px-2 tracking-tight">
            8 semanas. <span className="text-accent">Tudo que você precisa.</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
            Sem enrolação. Só o essencial para você evoluir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="card-dark-glass p-4 sm:p-5 hover-lift animate-fade-in transition-all duration-300" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
