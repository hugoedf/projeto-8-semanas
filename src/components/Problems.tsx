import { X, CheckCircle2, Smartphone } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const painPoints = ["Estímulo errado", "Progressão confusa", "Execução inconsistente"];

const Problems = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* BLOCO DE DOR - Direto e visual */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-6 tracking-tight text-foreground">
            Você <span className="text-accent">não está falhando.</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground font-medium mb-6">
            Você está treinando sem um método claro.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 w-full sm:w-auto"
              >
                <X className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{point}</span>
              </div>
            ))}
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Resultado:</span> esforço alto, evolução baixa.
          </p>
        </div>

        {/* APP 8X - Como facilitador de execução */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Imagem do App */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-[40px] scale-105" />
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2rem] p-2.5 w-[180px] sm:w-[220px] shadow-xl border border-white/10">
                    <div className="rounded-[1.5rem] overflow-hidden">
                      <img 
                        src={appMockup} 
                        alt="App 8X - Execução Guiada" 
                        className="w-full h-auto" 
                        width={220} 
                        height={306} 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Texto - App como facilitador */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">INCLUSO GRÁTIS</span>
                </div>
                
                {/* Frase-chave conforme solicitado */}
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-4 tracking-tight">
                  O método ensina <span className="text-accent">o que fazer.</span><br />
                  O App garante que você <span className="text-accent">faça certo.</span>
                </h3>
                
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Chega de decorar planilha ou ficar perdido na academia. Você abre o app, vê o treino do dia e executa — <span className="text-foreground font-medium">cada repetição no seu ritmo.</span>
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {["Treino do dia pronto", "Acompanha sua evolução", "Zero improviso"].map((item, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 text-xs text-accent font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
