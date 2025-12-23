import { X, CheckCircle2, Smartphone } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const painPoints = [
  "Você treina pesado, mas o espelho não muda",
  "Faz de tudo, mas continua no mesmo shape há meses", 
  "Cansou de ver os outros evoluindo enquanto você patina"
];

const Problems = () => {
  return (
    <section className="py-14 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* BLOCO DE DOR - Centralizado e legível */}
        <div className="text-center mb-14 sm:mb-20 animate-fade-in max-w-lg mx-auto">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-6 tracking-tight text-foreground px-2">
            Se identificou com <span className="text-accent">alguma dessas?</span>
          </h2>
          
          {/* Lista vertical de dor */}
          <div className="flex flex-col gap-3 mb-6">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3.5 text-left"
              >
                <X className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium text-foreground leading-snug">{point}</span>
              </div>
            ))}
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            <span className="font-semibold text-foreground">O problema não é você.</span> É treinar sem um método que funciona.
          </p>
        </div>

        {/* APP 8X - Execução guiada */}
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-lg text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-accent" />
              <span className="text-accent font-bold text-xs uppercase tracking-wider">INCLUSO GRÁTIS</span>
            </div>
            
            {/* Título */}
            <h3 className="font-display text-lg sm:text-2xl mb-4 tracking-tight leading-tight px-2">
              O método ensina <span className="text-accent">o que fazer.</span><br />
              O App garante que você <span className="text-accent">faça certo.</span>
            </h3>
            
            {/* Imagem do App - Centralizada */}
            <div className="flex justify-center my-6">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-[40px] scale-110" />
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2rem] p-2.5 w-[160px] sm:w-[200px] shadow-xl border border-white/10">
                  <div className="rounded-[1.5rem] overflow-hidden">
                    <img 
                      src={appMockup} 
                      alt="App 8X - Execução Guiada" 
                      className="w-full h-auto" 
                      width={200} 
                      height={280} 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Texto explicativo - Alívio cognitivo */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 px-2">
              Chega de decorar planilha ou ficar perdido na academia. Você abre o app, vê o treino do dia e executa — <span className="text-foreground font-medium">cada repetição no seu ritmo.</span>
            </p>
            
            {/* Benefícios verticais */}
            <div className="flex flex-col gap-2.5">
              {["Treino do dia pronto", "Acompanha sua evolução", "Zero improviso"].map((item, i) => (
                <div 
                  key={i} 
                  className="inline-flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2.5 text-sm text-accent font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
