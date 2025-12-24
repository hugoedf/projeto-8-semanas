import { UserCheck, TrendingUp, Dumbbell, X } from "lucide-react";

const audience = [{
  icon: UserCheck,
  title: "Iniciantes",
  description: "Querem fazer certo desde o primeiro dia"
}, {
  icon: TrendingUp,
  title: "Intermediários",
  description: "Estagnaram e querem romper o platô"
}, {
  icon: Dumbbell,
  title: "Avançados",
  description: "Querem treinar com método"
}];

const notFor = [
  "Procura milagre",
  "Não quer seguir um plano",
  "Não treina com regularidade"
];

const ForWho = () => {
  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Para quem é o{" "}
            <span className="text-gradient">Método 8X?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 hover-lift text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 mx-auto shadow-inner">
                  <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-accent" />
                </div>
                <h3 className="font-display text-lg sm:text-xl mb-2.5 text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 sm:mt-14 text-center max-w-3xl mx-auto px-4">
          <div className="bg-accent/8 border border-accent/25 rounded-2xl p-6 sm:p-8 shadow-lg shadow-accent/5">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2.5">
              Se você se identificou com pelo menos um desses perfis…
            </p>
            <p className="text-accent text-lg sm:text-xl font-bold">
              👉 O Método 8X foi feito para você.
            </p>
          </div>
        </div>
        
        {/* Bloco "Para quem NÃO é" - Filtro de comprador */}
        <div className="mt-12 sm:mt-14 max-w-xl mx-auto">
          <div className="bg-muted/30 border border-border/40 rounded-xl p-5 sm:p-6">
            <p className="text-muted-foreground text-sm sm:text-base text-center mb-4">
              O Método 8X <span className="font-medium text-foreground">não é para quem:</span>
            </p>
            <div className="space-y-2">
              {notFor.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
