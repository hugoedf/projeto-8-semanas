import { X } from "lucide-react";

const problems = [
  "Treinos aleatórios e sem progressão",
  "Falta de estratégia semanal",
  "Execução inconsistente",
  "Falta de disciplina e constância",
  "Não sabe se está evoluindo",
  "Acreditar que suplemento resolve tudo",
];

const Problems = () => {
  return (
    <section className="py-16 sm:py-24 gradient-section relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsla(15,100%,59%,0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 px-2 text-foreground leading-tight">
            Você treina… mas sente que algo{" "}
            <span className="text-accent">não está encaixando?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Se pelo menos UM desses pontos parece familiar, você está a um passo de destravar sua evolução:
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-premium rounded-xl p-5 sm:p-6 hover-lift animate-fade-in group"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center group-hover:bg-destructive/15 transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed pt-2">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16 px-4">
          <div className="inline-block glass rounded-2xl px-6 sm:px-8 py-5 sm:py-6">
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              👉 Nada disso é culpa sua.
            </p>
            <p className="text-base sm:text-lg font-semibold text-foreground">
              Sem ciência e sem método, é impossível evoluir de forma consistente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
