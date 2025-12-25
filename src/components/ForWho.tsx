import { UserCheck, TrendingUp, Dumbbell, X } from "lucide-react";

const audience = [
  { icon: UserCheck, title: "Iniciantes", description: "Querem fazer certo desde o primeiro dia" },
  { icon: TrendingUp, title: "Intermediários", description: "Estagnaram e querem romper o platô" },
  { icon: Dumbbell, title: "Avançados", description: "Querem treinar com método" }
];

const notFor = ["Procura milagre", "Não quer seguir um plano", "Não treina com regularidade"];

const ForWho = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(16,100%,60%,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">QUALIFICAÇÃO</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-accent">
            Para quem é o <span className="text-white">Método 8X?</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>Pessoas que buscam hipertrofia baseada em ciência.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto mb-10">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-[#1a1a1a] backdrop-blur-sm border-2 border-accent/30 rounded-xl p-6 text-center hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2 text-accent tracking-tight">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-white/70 text-base sm:text-lg mb-10">
          Se você se identificou com pelo menos um desses perfis, <span className="text-accent font-semibold">o Método 8X foi feito para você.</span>
        </p>
        
        <div className="max-w-xl mx-auto">
          <div className="bg-[#1a1a1a]/60 border border-white/10 rounded-xl p-6">
            <p className="text-white/60 text-sm sm:text-base text-center mb-5">O Método 8X <span className="font-medium text-white">não é para quem:</span></p>
            <div className="space-y-3">
              {notFor.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <p className="text-white/50 text-sm">{item}</p>
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