import { X } from "lucide-react";

const problems = [
  "Falta de estratégia nos treinos",
  "Dieta inconsistente e sem planejamento",
  "Falta de constância e disciplina",
  "Não sabe se está evoluindo",
  "Treinos aleatórios sem progressão",
  "Acredita que suplementos resolvem tudo",
];

const Problems = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Você se identifica com algum desses{" "}
            <span className="text-accent">problemas?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se você respondeu SIM para pelo menos um, este ebook foi feito para você.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-foreground font-medium leading-relaxed">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-foreground">
            É hora de <span className="text-accent">mudar isso de vez.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
