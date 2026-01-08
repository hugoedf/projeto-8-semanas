import { Target, Clock, Brain, Check } from "lucide-react";

const profiles = [
  {
    icon: Target,
    title: "Está estagnado",
    description: "Treina há meses (ou anos) e o espelho não muda"
  },
  {
    icon: Clock,
    title: "Tem pouco tempo",
    description: "Precisa de um treino que funciona sem enrolação"
  },
  {
    icon: Brain,
    title: "Quer método científico",
    description: "Cansou de achismo e quer progressão real"
  }
];

const ForWho = () => {
  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight text-black leading-tight">
            Isso é pra você se...
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          {profiles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-4 bg-accent/5 border border-accent/10 rounded-xl p-4 sm:p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5">
            <Check className="w-5 h-5 text-accent" />
            <p className="text-sm sm:text-base font-semibold text-black">
              Se você se identificou, o Método 8X foi feito pra você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;