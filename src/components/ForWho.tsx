import { UserCheck, TrendingUp, Dumbbell, X } from "lucide-react";

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
    description: "Querem treinar com método"
  }
];

const notFor = [
  "Procura milagre",
  "Não quer seguir um plano",
  "Não treina com regularidade"
];

const ForWho = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight text-white">
            Para quem é o{" "}
            <span className="text-accent">Método 8X?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg" style={{ lineHeight: '1.8' }}>
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        {/* Grid de perfis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto mb-10">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2 text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Texto de identificação */}
        <p className="text-center text-gray-400 text-base sm:text-lg mb-10">
          Se você se identificou com pelo menos um desses perfis,{" "}
          <span className="text-accent font-semibold">o Método 8X foi feito para você.</span>
        </p>
        
        {/* Bloco "Para quem NÃO é" */}
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm sm:text-base text-center mb-5">
              O Método 8X <span className="font-medium text-white">não é para quem:</span>
            </p>
            <div className="space-y-3">
              {notFor.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-sm">{item}</p>
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
