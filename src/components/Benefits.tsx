import { Dumbbell, Target, TrendingUp, Apple, Shield, Zap, Brain, Calendar, type LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  { icon: Dumbbell, title: "Você sabe o que fazer", description: "Cada exercício tem propósito. Zero dúvida, zero improviso." },
  { icon: Target, title: "Você vê progresso real", description: "Semana a semana, o espelho e a força confirmam." },
  { icon: TrendingUp, title: "Você quebra a estagnação", description: "Técnicas que forçam seu corpo a continuar evoluindo." },
  { icon: Apple, title: "Você come sem neura", description: "Nutrição simples que funciona, sem frescura." },
  { icon: Shield, title: "Você treina sem lesão", description: "Execução correta. Sem se machucar, sem parar." },
  { icon: Zap, title: "Você economiza tempo", description: "Treinos eficientes. Resultados máximos no menor tempo." },
  { icon: Brain, title: "Você tem clareza mental", description: "Saber o que fazer elimina a ansiedade do treino." },
  { icon: Calendar, title: "Você mantém consistência", description: "Um plano claro de 8 semanas que você consegue seguir." },
];

const Benefits = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary relative overflow-hidden">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Título */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-foreground">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
            Não é só sobre ganhar músculo. É sobre treinar com método.
          </p>
        </div>
        
        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-colors duration-300"
              >
                {/* Icon container */}
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
                </div>
                
                {/* Text content */}
                <h3 className="font-display font-semibold text-foreground text-base mb-1.5 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm" style={{ lineHeight: '1.6' }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
