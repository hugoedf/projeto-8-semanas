import { X, AlertTriangle } from "lucide-react";

const painPoints = [
  "Você treina pesado, mas o espelho não muda",
  "Faz de tudo, mas continua no mesmo shape há meses", 
  "Cansou de ver os outros evoluindo enquanto você patina"
];

const hiddenProblems = [
  "Treinar sem método é só cansar o corpo",
  "Repetir os mesmos exercícios mata sua evolução",
  "Sem progressão, seu corpo para de responder"
];

const Problems = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* BLOCO DE DOR - Expandido e emocional */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 tracking-tight text-foreground">
            Se identificou com <span className="text-accent">alguma dessas?</span>
          </h2>
          
          <div className="flex flex-col gap-3 mb-8 max-w-lg mx-auto">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-left"
              >
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base font-medium text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* O PROBLEMA REAL - Transição para solução */}
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">O problema real</span>
          </div>
          
          <p className="text-lg sm:text-xl text-foreground font-medium mb-6">
            <span className="text-accent">O problema não é você.</span><br />
            É treinar sem um método que funciona.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {hiddenProblems.map((problem, index) => (
              <div 
                key={index}
                className="bg-card border border-border/60 rounded-lg p-4 text-center"
              >
                <p className="text-sm text-muted-foreground">{problem}</p>
              </div>
            ))}
          </div>
          
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            A maioria dos caras na academia treina há anos e nunca sai do lugar. 
            Não porque são preguiçosos — <span className="text-foreground font-medium">porque ninguém ensinou o caminho certo.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;