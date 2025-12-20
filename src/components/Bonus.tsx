import { Smartphone, Utensils, Brain, TrendingUp, Sparkles } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const benefits = [
  {
    icon: Smartphone,
    title: "Abra e siga",
    description: "Sem montar treino"
  },
  {
    icon: Utensils,
    title: "Coma certo",
    description: "Sem calcular dieta"
  },
  {
    icon: Brain,
    title: "Aplique técnicas",
    description: "Sem estudar teoria"
  },
  {
    icon: TrendingUp,
    title: "Veja progresso",
    description: "Sem dúvida se funciona"
  }
];

const Bonus = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge - Elegant */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="w-3.5 h-3.5" />
            Bônus Exclusivo
          </span>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left: Copy */}
            <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mb-4 sm:mb-6">
                Você não precisa ler.
              </h2>
              
              {/* Subheadline */}
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                O <span className="text-accent font-semibold">App 8X</span> executa o método por você.
              </p>

              {/* Supporting phrase */}
              <div className="inline-block bg-foreground/5 rounded-xl px-5 py-3 mb-8 sm:mb-10">
                <p className="text-sm sm:text-base text-muted-foreground italic">
                  "O conhecimento está no método. A execução está no app."
                </p>
              </div>

              {/* Benefits - Clean Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-accent/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground text-sm sm:text-base leading-tight mb-0.5">
                            {benefit.title}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Value Anchoring - Discrete */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-base">
                <span className="text-muted-foreground">
                  Valor real: <span className="line-through">R$ 97</span>
                </span>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-full">
                  Incluído grátis
                </span>
              </div>
            </div>

            {/* Right: App Mockup */}
            <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
              <div className="relative">
                {/* Soft glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-[3rem] blur-[50px] scale-110" />
                
                {/* Phone frame */}
                <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 max-w-[260px] sm:max-w-[300px] shadow-2xl shadow-gray-900/30">
                  <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                    <img 
                      src={appMockup} 
                      alt="App 8X" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {/* Notch detail */}
                  <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-gray-950 rounded-full" />
                </div>

                {/* Floating badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-accent text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-accent/30">
                  GRÁTIS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Impact Phrase */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 animate-fade-in">
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
            Leia se quiser.{" "}
            <span className="text-accent">Execute mesmo sem ler.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
