const modules = [
  { number: "01", title: "Como o músculo cresce", description: "A base que faz tudo fazer sentido — sem enrolação." },
  { number: "02", title: "Seu ponto de partida", description: "Descubra onde você está e para onde vai." },
  { number: "03", title: "8 semanas de treino", description: "O plano completo. Só seguir." },
  { number: "04", title: "Alimentação simples", description: "Coma para crescer, sem complicação." },
  { number: "05", title: "Descanso estratégico", description: "Recuperação que acelera resultados." },
  { number: "06", title: "Técnicas avançadas", description: "Quebre a estagnação quando precisar." },
  { number: "07", title: "Mentalidade forte", description: "Nunca mais abandonar no meio." },
  { number: "08", title: "Ajuste fino", description: "Saiba quando e como corrigir." }
];

const Modules = () => {
  return (
    <section id="modules-section" className="py-20 sm:py-28 bg-background">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6">
        
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 text-foreground tracking-tight">
            8 semanas. <span className="text-accent">Tudo que você precisa.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
            Sem enrolação. Só o essencial para você evoluir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-3">
                {/* Número do módulo */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="font-display text-base font-bold text-accent">
                    {module.number}
                  </span>
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1">
                  <h3 className="font-display text-base text-foreground tracking-tight font-semibold mb-1">
                    {module.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
