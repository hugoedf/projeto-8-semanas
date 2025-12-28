const modules = [{
  number: "01",
  title: "Ciência do crescimento",
  description: "Entenda como o músculo cresce — e por que você estava travado."
}, {
  number: "02",
  title: "Seu diagnóstico",
  description: "Identifique exatamente onde você está e o que precisa mudar."
}, {
  number: "03",
  title: "Plano de 8 semanas",
  description: "Treino estruturado, dia a dia. Sem achismo, só execução."
}, {
  number: "04",
  title: "Nutrição funcional",
  description: "O mínimo necessário para crescer — sem neura, sem dieta maluca."
}, {
  number: "05",
  title: "Recuperação inteligente",
  description: "Descanse certo e acelere os resultados. Menos é mais."
}, {
  number: "06",
  title: "Técnicas de ruptura",
  description: "Ferramentas avançadas para quando o corpo teimar em estagnar."
}, {
  number: "07",
  title: "Mentalidade de execução",
  description: "Construa o hábito que te leva até o fim — sem abandonar no meio."
}, {
  number: "08",
  title: "Ajustes e correções",
  description: "Saiba ler seu corpo e fazer mudanças no momento certo."
}];
const Modules = () => {
  return <section id="modules-section" className="py-14 sm:py-20 lg:py-24 gradient-hero relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsla(18,100%,58%,0.06),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 lg:mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-3">
            ​
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-white tracking-tight leading-[1.1]">
            8 semanas. <span className="text-accent">Tudo que você precisa.</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-lg mx-auto">
            Sem enrolação. Só o essencial para você evoluir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-6xl mx-auto">
          {modules.map((module, index) => <div key={index} className="group relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/25 group-hover:bg-accent/15 transition-colors">
                  <span className="font-display text-lg font-bold text-accent">
                    {module.number}
                  </span>
                </div>
                <h3 className="font-display text-lg lg:text-xl text-white tracking-tight leading-tight font-semibold">
                  {module.title}
                </h3>
                <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                  {module.description}
                </p>
              </div>
              
              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>)}
        </div>
      </div>
    </section>;
};
export default Modules;