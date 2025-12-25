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
    <section id="modules-section" className="py-20 sm:py-24 md:py-28 gradient-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 max-w-[650px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-white px-2 tracking-[-0.02em] leading-tight">
            8 semanas. <span className="text-accent">Tudo que você precisa.</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
            Sem enrolação. Só o essencial para você evoluir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="card-dark-glass p-5 sm:p-6 hover-lift transition-all duration-300 rounded-2xl border border-transparent hover:border-accent/20"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/30">
                  <span className="font-display text-lg font-bold text-accent">
                    {module.number}
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg text-white tracking-tight leading-tight font-medium">
                  {module.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
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