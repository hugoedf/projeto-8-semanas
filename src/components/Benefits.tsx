import { Dumbbell, Target, TrendingUp, Zap } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
const benefits = [{
  icon: Dumbbell,
  title: "Cada treino com propósito",
  description: "Você entra na academia sabendo exatamente o que fazer — e sai sabendo que funcionou."
}, {
  icon: Target,
  title: "Resultados visíveis",
  description: "Quando você segue progressão real, o espelho e a força respondem semana após semana."
}, {
  icon: TrendingUp,
  title: "Estagnação quebrada",
  description: "O método força o corpo a continuar evoluindo — sem platô, sem travamento."
}, {
  icon: Zap,
  title: "Menos tempo, mais resultado",
  description: "45-60min de treino focado entrega mais que 2h de improviso na academia."
}];
const Benefits = () => {
  const parallaxOffset = useParallax({
    speed: 0.05
  });
  return <section className="py-12 sm:py-16 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(18,100%,58%,0.04),transparent_50%)]" style={{
      transform: `translateY(${parallaxOffset * 0.4}px)`
    }} />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 lg:mb-10 max-w-2xl mx-auto">
          
          
        </div>
        
        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return;
        })}
        </div>
      </div>
    </section>;
};
export default Benefits;