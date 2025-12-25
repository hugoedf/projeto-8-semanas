import { UserCheck, TrendingUp, Dumbbell, X } from "lucide-react";

const audience = [
  { icon: UserCheck, title: "Iniciantes", description: "Querem fazer certo desde o primeiro dia" },
  { icon: TrendingUp, title: "Intermediários", description: "Estagnaram e querem romper o platô" },
  { icon: Dumbbell, title: "Avançados", description: "Querem treinar com método" }
];

const notFor = [
  "Procura milagre",
  "Não quer seguir um plano",
  "Não treina com regularidade"
];

const ForWho = () => {
  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(14,100%,60%,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-foreground">
            Para quem é o{" "}
            <span className="text-accent">Método 8X?</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        {/* Grid de perfis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-5 text-center hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-1.5 text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Texto de identificação */}
        <p className="text-center text-muted-foreground text-base sm:text-lg mb-8">
          Se você se identificou com pelo menos um desses perfis,{" "}
          <span className="text-accent font-medium">o Método 8X foi feito para você.</span>
        </p>
        
        {/* Bloco "Para quem NÃO é" */}
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-muted-foreground text-sm text-center mb-4">
              O Método 8X <span className="font-medium text-foreground">não é para quem:</span>
            </p>
            <div className="space-y-2.5">
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
