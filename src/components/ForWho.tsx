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
const notFor = ["Procura milagre", "Não quer seguir um plano", "Não treina com regularidade"];
const ForWho = () => {
  return <section className="py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-accent/70 mb-5">
            ​
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] mb-5 tracking-tight text-black leading-[1.1]">
            Para quem é o{" "}
            <span className="text-accent">Método 8X?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Pessoas que buscam hipertrofia baseada em ciência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {audience.map((item, index) => {
          const Icon = item.icon;
          return <div key={index} className="group bg-[#FAFAFA] border border-gray-100 rounded-2xl p-7 sm:p-8 text-center hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center mb-5 mx-auto group-hover:bg-accent/12 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-black tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>;
        })}
        </div>
        
        <div className="mt-14 lg:mt-16 text-center max-w-2xl mx-auto">
          <div className="bg-accent/8 border border-accent/20 rounded-2xl p-7 sm:p-8">
            <p className="text-lg sm:text-xl font-semibold text-black mb-3">
              Se você se identificou com pelo menos um desses perfis…
            </p>
            <p className="text-accent text-xl sm:text-2xl font-bold">
              O Método 8X foi feito para você.
            </p>
          </div>
        </div>
        
        {/* Bloco "Para quem NÃO é" */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 sm:p-6">
            <p className="text-gray-500 text-sm sm:text-base text-center mb-4">
              O Método 8X <span className="font-medium text-black">não é para quem:</span>
            </p>
            <div className="space-y-2.5">
              {notFor.map((item, index) => <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">{item}</p>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ForWho;