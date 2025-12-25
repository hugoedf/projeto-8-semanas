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
    <section id="modules-section" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">O CONTEÚDO</span>
        </div>
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 text-accent tracking-tight">
            8 semanas. <span className="text-[#1a1a1a]">Tudo que você precisa.</span>
          </h2>
          <p className="text-[#1a1a1a]/70 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>Sem enrolação. Só o essencial para você evoluir.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div key={index} className="bg-white border-2 border-accent/30 rounded-xl p-5 hover:shadow-lg hover:border-accent hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-accent">{module.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base sm:text-lg text-accent tracking-tight font-semibold mb-1">{module.title}</h3>
                  <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{module.description}</p>
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