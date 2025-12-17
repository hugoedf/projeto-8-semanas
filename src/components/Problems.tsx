import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
const problems = ["Treinos aleatórios e sem progressão", "Falta de estratégia semanal", "Execução inconsistente", "Falta de disciplina e constância", "Dificuldade para saber se está evoluindo", "Acreditar que suplemento resolve tudo"];
const Problems = () => {
  return <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Você treina… mas sente que algo{" "}
            <span className="text-accent">não está encaixando?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => <div key={index} className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 hover-lift animate-fade-in shadow-sm hover:shadow-md transition-all duration-300" style={{
          animationDelay: `${index * 0.08}s`
        }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-destructive/10 flex items-center justify-center shadow-inner">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed pt-2">
                  {problem}
                </p>
              </div>
            </div>)}
        </div>
        
        <div className="text-center mt-12 sm:mt-14 px-4">
          <p className="text-base sm:text-lg text-muted-foreground mb-3">
            Não é falta de esforço.
          </p>
          <p className="text-base sm:text-lg font-semibold text-foreground mb-8">
            É falta de método.
          </p>
          <div className="bg-accent/8 border border-accent/25 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-lg shadow-accent/5 mb-8">
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              <strong className="text-accent">O Método 8X existe para resolver isso.</strong><br />
              Um protocolo direto, estratégico e fundamentado em fisiologia, criado para quem quer treinar com clareza, propósito e progressão real.
            </p>
          </div>
          
          <Button variant="cta" size="default" onClick={() => document.getElementById('modules-section')?.scrollIntoView({
          behavior: 'smooth'
        })} className="text-sm sm:text-base px-6 sm:px-8 py-4 font-semibold tracking-wide shadow-md shadow-accent/20 mt-4 mb-2">
            VER COMO O MÉTODO 8X FUNCIONA
          </Button>
        </div>
      </div>
    </section>;
};
export default Problems;