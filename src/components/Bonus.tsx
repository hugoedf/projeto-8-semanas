import { Gift, Rocket, AlertTriangle, Lock } from "lucide-react";
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

        {/* 1. Headline */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center leading-tight mb-3 animate-fade-in">
          O método já está pronto.
          <br />
          <span className="text-accent">Agora ele é executado com você.</span>
        </h2>

        {/* App Mockup + Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 my-12 sm:my-16 animate-fade-in">
          
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

          {/* Intro App 8X */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Rocket className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-xl sm:text-2xl text-foreground">App 8X</span>
            </div>
            <p className="text-base sm:text-lg text-accent font-medium mb-4">
              Execução guiada do Método 8X
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Sem improviso.
              <br />
              Sem interpretação errada.
              <br />
              Sem desvio do que está no método.
            </p>
          </div>
        </div>

        {/* Bloco de dor */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
            A maioria das pessoas não falha por falta de método.
            <br />
            <span className="text-foreground font-medium">Falha porque executa sem clareza — ou para cedo demais.</span>
          </p>
        </div>

        {/* Frase âncora */}
        <div className="bg-muted/50 rounded-2xl p-5 sm:p-6 mb-12 sm:mb-16 border border-border/50 animate-fade-in">
          <p className="text-base sm:text-lg text-foreground text-center leading-relaxed">
            O App 8X resolve a execução.
            <br />
            <span className="text-accent font-semibold">O Método 8X sustenta a decisão de continuar.</span>
          </p>
        </div>

        {/* Lista "abre e segue" */}
        <div className="mb-12 sm:mb-16 animate-fade-in">
          <p className="text-base sm:text-lg font-semibold text-foreground text-center mb-6">
            Com o App 8X, você executa exatamente o que está no método:
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            {[
              { yes: "Treinos definidos conforme o método", no: "Nada de montar por conta própria" },
              { yes: "Alimentação aplicada conforme o método", no: "Nada de calcular ou adaptar" },
              { yes: "Técnicas no tempo certo", no: "Nada de estudar fora de contexto" },
              { yes: "Progresso visível", no: "Nada de achismo" },
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

        {/* Complemento método + app */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-sm sm:text-base text-foreground mb-1">
            👉 O método ensina o porquê.
          </p>
          <p className="text-sm sm:text-base text-foreground mb-4">
            👉 O app executa o como.
          </p>
          <p className="text-sm sm:text-base text-accent font-semibold">
            Um sem o outro quebra o processo.
          </p>
        </div>

        {/* Bloco Importante */}
        <div className="bg-destructive/5 rounded-2xl p-5 sm:p-6 mb-12 sm:mb-16 border border-destructive/20 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="font-semibold text-base sm:text-lg text-foreground">
              Importante
            </span>
          </div>
          
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-4">
            Quem não entende o método:
          </p>
          
          <ul className="space-y-2 max-w-sm mx-auto mb-4">
            {[
              "erra a execução",
              "perde referência",
              "abandona antes do resultado",
            ].map((item, i) => (
              <li key={i} className="text-sm sm:text-base text-foreground flex items-center justify-center gap-2">
                <span className="text-destructive">•</span> {item}
              </li>
            ))}
          </ul>

          <p className="text-sm sm:text-base text-foreground text-center font-medium">
            É o entendimento que sustenta a consistência.
          </p>
        </div>

        {/* Ancoragem de valor */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-1">
            💰 Valor real do App 8X: <span className="line-through">R$ 97</span>
          </p>
          <p className="text-base sm:text-lg text-accent font-bold">
            🎁 Incluído gratuitamente com o Método 8X
          </p>
        </div>

        {/* Fechamento */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-sm sm:text-base text-muted-foreground mb-1">
            Execute com direção.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-1">
            Execute com consciência.
          </p>
          <p className="text-sm sm:text-base text-foreground font-medium">
            Execute o método — não apenas o treino.
          </p>
        </div>

        {/* Frase final */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in">
          <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Quem só executa, começa.
            <br />
            <span className="text-accent">Quem entende o método, continua até o resultado.</span>
          </p>
        </div>

        {/* Acesso exclusivo */}
        <div className="bg-muted/30 rounded-2xl p-5 sm:p-6 border border-border/50 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-accent" />
            <span className="font-semibold text-sm sm:text-base text-foreground">
              Acesso exclusivo e protegido
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            O App 8X é liberado apenas para compradores do Método 8X.
            <br />
            O acesso é individual, validado e não transferível.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
