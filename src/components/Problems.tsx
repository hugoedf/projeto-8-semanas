import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const problems = [
  "Você treina, mas sente que não evolui.",
  "Faz força, mas o corpo não responde.",
  "Já tentou mudar treino, mas continua travado.",
];

const Problems = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Você treina… mas sente que algo{" "}
            <span className="text-accent">não está encaixando?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 hover-lift animate-fade-in shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-destructive/10 flex items-center justify-center shadow-inner">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed pt-2">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 px-4 max-w-3xl mx-auto">
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-8">
            <p>
              Treinar com constância não garante evolução.<br />
              Muitas pessoas se dedicam, aumentam a carga e mantêm a frequência — mas não veem mudanças reais no corpo.
            </p>
            <p>
              Isso acontece porque evolução não depende apenas de esforço, mas de <strong className="text-foreground">estímulos organizados</strong>.<br />
              Volume, intensidade e recuperação precisam conversar entre si.
            </p>
            <p>
              Quando isso não acontece, o corpo se adapta — e para de responder.<br />
              Você treina certo, mas na ordem errada. Aumenta a carga sem dar tempo de recuperação. Ou faz tudo "certinho", mas sem progressão real.
            </p>
            <p>
              A sensação é de estagnação, mesmo com disciplina.<br />
              Parece que algo está faltando — e está.
            </p>
            <p className="font-semibold text-foreground">
              O problema não é falta de esforço.<br />
              É falta de método.
            </p>
          </div>
          
          <div className="bg-accent/8 border border-accent/25 rounded-2xl p-6 sm:p-8 shadow-lg shadow-accent/5 mb-8">
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              <strong className="text-accent">O Método 8X organiza esses pontos em um sistema simples, progressivo e aplicável</strong> para quem quer evoluir de forma consistente.
            </p>
          </div>
          
          <div className="text-center">
            <Button 
              variant="cta" 
              size="lg" 
              onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 animate-pulse-glow font-semibold tracking-wide shadow-xl shadow-accent/30"
            >
              Começar agora por R$19,90
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
