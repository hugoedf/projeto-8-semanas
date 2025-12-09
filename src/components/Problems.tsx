import { X } from "lucide-react";

const problems = [
  "Treinos aleatórios",
  "Falta de estratégia semanal",
  "Dúvidas sobre execução",
  "Falta de constância",
  "Dificuldade para saber se está evoluindo",
  "Acreditar que suplemento resolve tudo",
];

const Problems = () => {
  return (
    <section className="py-12 sm:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 px-2">
            Você treina, mas algo ainda parece{" "}
            <span className="text-accent">faltar:</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Se você se identificou com pelo menos UM desses pontos… O Método 8X foi criado para você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 sm:p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-base sm:text-lg font-semibold text-foreground">
            Se você se identificou... <span className="text-accent">O Método 8X foi criado para você.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
