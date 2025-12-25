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
    <section className="py-14 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header - próximo dos cards */}
        <div className="text-center max-w-[550px] mx-auto mb-8 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight text-foreground">
            Para quem é o{" "}
            <span className="text-gradient">Método 8X?</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        {/* Grid de perfis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto mb-8 sm:mb-10">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border/60 rounded-xl p-5 sm:p-6 hover-lift text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-1.5 text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Texto de identificação - simples, não bloco de impacto */}
        <p className="text-center text-slate-600 text-sm sm:text-base mb-8 sm:mb-10">
          Se você se identificou com pelo menos um desses perfis,{" "}
          <span className="text-accent font-semibold">o Método 8X foi feito para você.</span>
        </p>
        
        {/* Bloco "Para quem NÃO é" - Filtro de comprador */}
        <div className="max-w-xl mx-auto">
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
