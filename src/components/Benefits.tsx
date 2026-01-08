import { Dumbbell, Target, TrendingUp, Zap } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const benefits = [
  {
    icon: Dumbbell,
    title: "Ganho de massa equilibrado",
    description: "Força + volume em harmonia. Resultados reais que aparecem no espelho e na balança."
  },
  {
    icon: Target,
    title: "Quebra de platôs",
    description: "Elimine a estagnação de uma vez. Seu corpo vai ser forçado a evoluir toda semana."
  },
  {
    icon: TrendingUp,
    title: "Força, densidade e resistência",
    description: "Mais do que estética — você vai sentir a diferença em cada repetição."
  },
  {
    icon: Zap,
    title: "Clareza total na academia",
    description: "Treino guiado, sem improviso. Economia de tempo com progressão inteligente."
  }
];

const Benefits = () => {
  const parallaxOffset = useParallax({ speed: 0.05 });
  
  return (
    <section className="py-12 sm:py-16 bg-[#FAFAFA] relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" 
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }} 
      />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 lg:mb-10 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight text-black leading-tight">
            O que você conquista em <span className="text-accent">8 semanas</span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg">
            Não é sobre treinar duro, é sobre treinar certo.
          </p>
        </div>
        
        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-5 lg:p-6 border border-black/[0.06] shadow-sm hover:border-accent/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-lg lg:text-xl font-bold text-black tracking-tight mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-black/60 text-sm lg:text-base leading-relaxed">
                  {benefit.description}
                </p>
                
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;