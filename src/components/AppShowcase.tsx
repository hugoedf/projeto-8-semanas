import { Smartphone, Play, BarChart3, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const appFeatures = [
  { icon: Play, text: "Treino do dia pronto" },
  { icon: BarChart3, text: "Acompanha sua evolução" },
  { icon: Clock, text: "Zero improviso" }
];

const AppShowcase = () => {
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-20 bg-muted/50">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Transição persuasiva */}
        <div 
          ref={introRef}
          className="text-center mb-10 max-w-xl mx-auto"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <p className="text-muted-foreground text-base sm:text-lg">
            Tudo isso é possível com o <span className="text-foreground font-semibold">Método 8X</span>. 
            Mas saber o que fazer é só metade do caminho...
          </p>
          <p className="text-accent font-medium text-lg sm:text-xl mt-2">
            Você precisa executar.
          </p>
        </div>
        
        <div 
          ref={cardRef}
          className="max-w-4xl mx-auto"
          style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s'
          }}
        >
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video do App */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-[40px] scale-105" />
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2rem] p-2.5 w-[180px] sm:w-[220px] shadow-xl border border-white/10">
                    <div className="rounded-[1.5rem] overflow-hidden">
                      <video 
                        src="/videos/app-demo.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-auto"
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
                
                {/* Frase-chave */}
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-4 tracking-tight">
                  O método ensina <span className="text-accent">o que fazer.</span><br />
                  O App garante que você <span className="text-accent">faça certo.</span>
                </h3>
                
                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  Chega de decorar planilha ou ficar perdido na academia. Você abre o app, vê o treino do dia e executa — <span className="text-foreground font-medium">cada repetição no seu ritmo.</span>
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {appFeatures.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 text-xs text-accent font-medium"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {item.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;