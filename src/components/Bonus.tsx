import { Smartphone, Utensils, Brain, TrendingUp, Gift, Lock } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Treinos Guiados",
    description: "Treinos organizados por semanas com progressão automática. Nada de montar treino ou interpretar texto."
  },
  {
    icon: Utensils,
    title: "Guia Nutricional",
    description: "Diretrizes práticas: o que comer, quando e por quê. Sem cálculos complexos."
  },
  {
    icon: Brain,
    title: "Metodologias Aplicadas",
    description: "Técnicas avançadas já encaixadas no treino. Intensificação no momento certo."
  },
  {
    icon: TrendingUp,
    title: "Progresso Visual",
    description: "Acompanhamento claro por semana. Sensação de avanço real. Disciplina sem esforço mental."
  }
];

const Bonus = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-fitness-dark/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fitness-red rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-fitness-red/20 to-primary/20 border border-fitness-red/30 text-fitness-red px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            Bônus Exclusivo
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Você não precisa ler o e-book para aplicar o método.
          </h2>
          <p className="text-xl md:text-2xl text-primary font-semibold">
            O App 8X entrega tudo pronto para execução.
          </p>
        </div>

        {/* Core Concept */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-fitness-dark/80 to-fitness-dark/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              O <span className="text-foreground font-semibold">Método 8X</span> é o conhecimento.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground">
              O <span className="text-primary font-semibold">App 8X</span> é a execução.
            </p>
          </div>
        </div>

        {/* App Mockup Placeholder + Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mockup Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Phone frame placeholder */}
              <div className="bg-gradient-to-br from-fitness-dark to-fitness-dark/80 border-2 border-primary/30 rounded-[3rem] p-4 max-w-[300px] mx-auto shadow-2xl shadow-primary/20">
                <div className="bg-muted/20 rounded-[2.5rem] aspect-[9/19] flex items-center justify-center">
                  <div className="text-center p-6">
                    <Smartphone className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">
                      Mockup do App 8X
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-2">
                      (Adicionar prints do app aqui)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 lg:right-0 bg-fitness-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-glow">
                GRÁTIS
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="order-1 lg:order-2 grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-fitness-dark/60 to-fitness-dark/40 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Anchoring */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-primary/10 via-fitness-red/10 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground mb-2">
              Valor do App 8X:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              <span className="line-through text-muted-foreground/60">R$ 97,00</span>
            </p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              Hoje: <span className="text-fitness-red">GRÁTIS</span> para quem adquirir o Método 8X
            </p>
          </div>
        </div>

        {/* Impact Phrase */}
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl font-display font-semibold text-foreground italic">
            "Leia se quiser. Execute mesmo sem ler."
          </p>
        </div>

        {/* Exclusivity Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-fitness-dark/60 border border-border/50 rounded-full px-6 py-3">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground text-sm">
              Acesso exclusivo e individual — ativado por compra
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
