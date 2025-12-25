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
        {/* Badge de contexto */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-accent bg-accent/10 px-3 py-1.5 rounded-full">
            O Conteúdo
          </span>
        </div>
        
        <div className="text-center mb-10 sm:mb-12 max-w-[650px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-white px-2 tracking-[-0.02em] leading-tight">
            8 semanas. <span className="text-accent">Tudo que você precisa.</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg text-left sm:text-center" style={{ lineHeight: '1.75' }}>
            Sem enrolação. Só o essencial para você evoluir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="card-dark-glass p-4 sm:p-5 md:p-6 hover-lift transition-all duration-300 rounded-xl sm:rounded-2xl border border-white/5 hover:border-accent/20"
            >
              <div className="flex items-start gap-3 sm:gap-4 sm:flex-col">
                {/* Número do módulo */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/15 flex items-center justify-center border border-accent/30">
                  <span className="font-display text-base sm:text-lg font-bold text-accent">
                    {module.number}
                  </span>
                </div>
                
                {/* Conteúdo - alinhado à esquerda */}
                <div className="flex-1 text-left">
                  <h3 className="font-display text-sm sm:text-base md:text-lg text-white tracking-tight leading-tight font-medium mb-1">
                    {module.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;