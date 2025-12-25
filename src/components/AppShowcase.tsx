import { Smartphone, Play, BarChart3, Clock } from "lucide-react";

const appFeatures = [
  { icon: Play, text: "Treino do dia pronto" },
  { icon: BarChart3, text: "Acompanha sua evolução" },
  { icon: Clock, text: "Zero improviso" }
];

const AppShowcase = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 bg-muted/50">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Transição persuasiva - Pausa visual */}
        <div className="text-center mb-10 sm:mb-12 max-w-[650px] mx-auto">
          <p className="text-accent font-medium text-lg sm:text-xl mb-4">
            E é exatamente aí que a maioria das pessoas trava.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg mb-2" style={{ lineHeight: '1.75' }}>
            A maioria das pessoas sabe o que deveria fazer.
          </p>
          <p className="text-foreground font-medium text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
            O problema é executar certo, toda semana, sem improviso.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video do App */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative animate-float">
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
