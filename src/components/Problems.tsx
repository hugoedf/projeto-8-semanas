import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  {
    title: "Você não sabe se está fazendo certo",
    description: "Entra na academia, faz os exercícios… mas não tem certeza se a execução está certa. E quando você não sabe, o músculo não responde."
  },
  {
    title: "O treino virou rotina sem propósito",
    description: "Você repete os mesmos exercícios, na mesma ordem, com o mesmo peso. O corpo se adaptou. O resultado parou."
  },
  {
    title: "Falta método, sobra improviso",
    description: "Cada dia é um treino diferente — sem progressão, sem lógica, sem direção. É como dirigir sem mapa e esperar chegar em algum lugar."
  },
  {
    title: "O espelho não muda",
    description: "Você treina há meses, mas o reflexo continua o mesmo. E a frustração só cresce."
  }
];

const Problems = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="problems" 
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div 
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-6">
          Você treina, se esforça…<br />
          e mesmo assim não vê resultado?
        </h2>
        
        {/* Introdução emocional */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-foreground font-medium text-lg sm:text-xl">
            E o pior não é treinar pesado.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
            É sentir que o esforço não está voltando em forma de resultado.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg mt-6 leading-relaxed">
            Provavelmente você já saiu da academia com a sensação de ter feito tudo certo…<br />
            <span className="text-foreground font-medium">mas sem a certeza de que aquilo realmente estava funcionando.</span>
          </p>
        </div>

        {/* Lista de problemas */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className={`bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card/70`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fechamento emocional */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-muted-foreground text-lg">
            Se você se identificou com pelo menos um desses pontos,
          </p>
          <p className="text-foreground font-medium text-xl mt-2">
            o problema não é falta de esforço. É falta de método.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
