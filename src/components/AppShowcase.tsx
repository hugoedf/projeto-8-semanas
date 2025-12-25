import { Smartphone, Play, BarChart3, Clock } from "lucide-react";

const appFeatures = [
  { icon: Play, text: "Treino do dia pronto" },
  { icon: BarChart3, text: "Acompanha sua evolução" },
  { icon: Clock, text: "Zero improviso" }
];

const AppShowcase = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(16,100%,60%,0.1),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-accent font-semibold text-lg sm:text-xl mb-4">E é exatamente aí que a maioria das pessoas trava.</p>
          <p className="text-white/70 text-base sm:text-lg mb-2" style={{ lineHeight: '1.8' }}>A maioria das pessoas sabe o que deveria fazer.</p>
          <p className="text-white font-medium text-base sm:text-lg" style={{ lineHeight: '1.8' }}>O problema é executar certo, toda semana, sem improviso.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-6 sm:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/30 rounded-[2rem] blur-[50px] scale-105" />
                  <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-[2rem] p-2.5 w-[200px] sm:w-[240px] shadow-2xl border-2 border-accent/50">
                    <div className="rounded-[1.5rem] overflow-hidden">
                      <video src="/videos/app-demo.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-xs uppercase tracking-[0.2em]">INCLUSO GRÁTIS</span>
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-5 tracking-tight text-accent">
                  O método ensina <span className="text-white">o que fazer.</span><br />
                  O App garante que você <span className="text-white">faça certo.</span>
                </h3>
                
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  Chega de decorar planilha ou ficar perdido na academia. Você abre o app, vê o treino do dia e executa — <span className="text-white font-medium">cada repetição no seu ritmo.</span>
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {appFeatures.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <span key={i} className="inline-flex items-center gap-2 bg-accent/15 border-2 border-accent/40 rounded-full px-4 py-2 text-sm text-accent font-medium">
                        <Icon className="w-4 h-4" />
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