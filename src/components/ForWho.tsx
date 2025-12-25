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
    <section className="py-14 sm:py-16 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header simples - próximo dos cards */}
        <div className="text-center mb-8 sm:mb-10 max-w-[580px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-[-0.02em] text-foreground">
            Para quem é o{" "}
            <span className="text-accent">Método 8X?</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: '1.7' }}>
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        {/* Grid de perfis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mb-10 sm:mb-12">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 hover-lift text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-1.5 text-foreground tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm" style={{ lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Bloco de identificação - texto leve, não bloco de impacto */}
        <div className="text-center max-w-md mx-auto mb-8 sm:mb-10">
          <p className="text-slate-600 text-base mb-1">
            Se você se identificou com pelo menos um desses perfis…
          </p>
          <p className="text-accent text-base sm:text-lg font-semibold">
            O Método 8X foi feito para você.
          </p>
        </div>
        
        {/* Bloco "Para quem NÃO é" - Filtro de comprador */}
        <div className="max-w-md mx-auto">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 sm:p-5">
            <p className="text-slate-500 text-sm text-center mb-3">
              O Método 8X <span className="font-medium text-foreground">não é para quem:</span>
            </p>
            <div className="space-y-2">
              {notFor.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-slate-500" />
                  </div>
                  <p className="text-slate-500 text-sm">{item}</p>
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
