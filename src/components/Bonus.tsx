import { Gift, Rocket, BookOpen, CheckCircle2 } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const Bonus = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Subtle glow for app emphasis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-3xl">
        
        {/* Badge */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Gift className="w-4 h-4" />
            Bônus Exclusivo
          </span>
        </div>

        {/* 1. Headline curta */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center leading-tight mb-3 animate-fade-in">
          Para quem quer executar certo
          <br />
          <span className="text-muted-foreground font-medium">— e continuar até o resultado</span>
        </h2>

        {/* 2. Subheadline explicativa */}
        <p className="text-base sm:text-lg text-muted-foreground text-center mb-12 sm:mb-16 max-w-xl mx-auto leading-relaxed animate-fade-in">
          Você não precisa estudar para começar.
          <br />
          Mas precisa de estrutura para não parar no meio.
        </p>

        {/* App Mockup + Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12 sm:mb-16 animate-fade-in">
          
          {/* Mockup */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/10 rounded-[2.5rem] blur-[40px] scale-105" />
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-[2rem] p-2.5 sm:p-3 w-[200px] sm:w-[240px] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden">
                <img 
                  src={appMockup} 
                  alt="App 8X" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-950 rounded-full" />
            </div>
            <div className="absolute -top-2 -right-2 bg-accent text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              GRÁTIS
            </div>
          </div>

          {/* 3. Intro App 8X */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Rocket className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-xl sm:text-2xl text-foreground">App 8X</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
              O método em execução guiada.
            </p>
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-4">
              O App 8X existe para uma única função:
              <br />
              <strong className="text-accent">garantir que o método seja aplicado todos os dias, do jeito certo.</strong>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sem adaptação. Sem interpretação. Sem erro.
            </p>
          </div>
        </div>

        {/* 4. Frase âncora */}
        <div className="bg-muted/50 rounded-2xl p-5 sm:p-6 mb-12 sm:mb-16 border border-border/50 animate-fade-in">
          <p className="text-base sm:text-lg text-foreground text-center leading-relaxed">
            O e-book mostra o caminho.
            <br />
            <span className="text-accent font-semibold">O app impede você de sair dele.</span>
          </p>
        </div>

        {/* 5. Lista "abre e segue" */}
        <div className="mb-12 sm:mb-16 animate-fade-in">
          <p className="text-base sm:text-lg font-semibold text-foreground text-center mb-6">
            Com o App 8X, você apenas abre e segue:
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            {[
              { yes: "Treinos definidos", no: "Sem montar nada" },
              { yes: "Alimentação aplicada", no: "Sem calcular dieta" },
              { yes: "Técnicas ativadas no momento certo", no: "Sem estudar teoria" },
              { yes: "Progresso visível", no: "Sem dúvida se está funcionando" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-3 border border-border/30">
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-foreground flex items-center gap-2">
                    <span className="text-green-500">✔️</span> {item.yes}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
                    <span className="text-red-400">❌</span> {item.no}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Bloco de dor real */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
            A maioria das pessoas não falha por falta de método.
            <br />
            <span className="text-foreground font-medium">Falha porque decide demais — e executa de menos.</span>
          </p>
          <p className="text-base sm:text-lg text-accent font-semibold">
            É exatamente aqui que o App 8X entra.
          </p>
        </div>

        {/* 7. Reforço de continuidade */}
        <div className="bg-accent/5 rounded-2xl p-5 sm:p-6 mb-12 sm:mb-16 border border-accent/20 animate-fade-in">
          <p className="text-sm sm:text-base text-foreground text-center leading-relaxed">
            Ele remove decisões.
            <br />
            Reduz erros.
            <br />
            Sustenta a consistência.
            <br />
            <span className="text-accent font-semibold">Até o resultado aparecer.</span>
          </p>
        </div>

        {/* 8. Por que o e-book continua essencial */}
        <div className="mb-12 sm:mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-lg sm:text-xl text-foreground">
              Por que o e-book continua essencial?
            </span>
          </div>
          
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-4">
            Porque quem entende o método:
          </p>
          
          <ul className="space-y-2 max-w-sm mx-auto mb-6">
            {[
              "confia no processo",
              "reconhece progresso real",
              "não abandona nos dias difíceis",
            ].map((item, i) => (
              <li key={i} className="text-sm sm:text-base text-foreground flex items-center gap-2">
                <span className="text-accent">•</span> {item}
              </li>
            ))}
          </ul>

          <div className="text-center space-y-1">
            <p className="text-sm sm:text-base text-foreground">
              👉 O app executa.
            </p>
            <p className="text-sm sm:text-base text-foreground">
              👉 O e-book sustenta a decisão de continuar.
            </p>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4 italic">
            Eles não competem. Eles se completam.
          </p>
        </div>

        {/* 9. Como usar da forma correta */}
        <div className="bg-background rounded-2xl p-5 sm:p-6 mb-12 sm:mb-16 border border-border/50 shadow-sm animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="font-semibold text-base sm:text-lg text-foreground">
              A forma mais eficiente de usar:
            </span>
          </div>
          
          <ul className="space-y-2 max-w-sm mx-auto">
            {[
              "Comece agora pelo App 8X",
              "Leia o e-book no seu ritmo",
              "Execute com clareza, não no escuro",
            ].map((item, i) => (
              <li key={i} className="text-sm sm:text-base text-foreground flex items-center gap-2">
                <span className="text-accent">🔹</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 10. Ancoragem de valor */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-1">
            💰 Valor real do App 8X: <span className="line-through">R$ 97</span>
          </p>
          <p className="text-base sm:text-lg text-accent font-bold">
            🎁 Incluído gratuitamente nesta oferta
          </p>
        </div>

        {/* 11. Fechamento memorável */}
        <div className="text-center animate-fade-in">
          <p className="text-base sm:text-lg text-muted-foreground mb-2">
            Você pode ler depois.
            <br />
            <span className="text-foreground font-medium">Mas pode executar agora.</span>
          </p>
          
          <p className="text-xl sm:text-2xl font-display font-bold text-foreground mt-6">
            Quem só executa, começa.
            <br />
            <span className="text-accent">Quem entende o método, continua.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
