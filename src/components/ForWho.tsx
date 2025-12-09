import { UserCheck, TrendingUp, Dumbbell } from "lucide-react";

const audience = [
  {
    icon: UserCheck,
    title: "Iniciantes",
    description: "Querem fazer certo desde o primeiro dia"
  },
  {
    icon: TrendingUp,
    title: "Intermediários",
    description: "Estagnaram e querem romper o platô"
  },
  {
    icon: Dumbbell,
    title: "Avançados",
    description: "Querem treinar com estratégia real"
  }
];

const ForWho = () => {
  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 text-foreground leading-tight">
            Para quem é o{" "}
            <span className="text-gradient">Método 8x</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Pessoas que desejam hipertrofia baseada em ciência e querem treinar com clareza e propósito.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="card-premium rounded-xl p-6 sm:p-8 hover-lift animate-fade-in text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 sm:mb-5 mx-auto group-hover:bg-accent/15 group-hover:border-accent/30 transition-all duration-300">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-accent" />
                </div>
                <h3 className="font-display text-lg sm:text-xl mb-2 sm:mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Box */}
        <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto px-4">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-accent/20">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-3">
              Se você se identificou com pelo menos um desses perfis…
            </p>
            <p className="text-accent text-xl sm:text-2xl font-display font-bold">
              👉 O Método 8X foi feito para você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
