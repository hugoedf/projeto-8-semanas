import { UserCheck, Clock, TrendingDown, Dumbbell, Target } from "lucide-react";
const audience = [{
  icon: UserCheck,
  title: "Iniciantes",
  description: "Começando do zero e quer fazer certo desde o início"
}, {
  icon: Clock,
  title: "Pessoas sem tempo",
  description: "Treinos eficientes que cabem na sua rotina"
}, {
  icon: TrendingDown,
  title: "Quem está estagnado",
  description: "Treina há meses mas não vê mais resultados"
}, {
  icon: Dumbbell,
  title: "Praticantes avançados",
  description: "Quer técnicas avançadas para romper platôs"
}, {
  icon: Target,
  title: "Foco em hipertrofia",
  description: "Deseja construir massa muscular de verdade"
}];
const ForWho = () => {
  return <section className="py-12 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 px-2">
            Para quem é o{" "}
            <span className="text-gradient">Método 8x</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Este ebook foi criado para pessoas como você, que querem resultados reais
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {audience.map((item, index) => {
          const Icon = item.icon;
          return <div key={index} className="bg-card border border-border rounded-xl p-5 sm:p-6 hover-lift animate-fade-in text-center" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                </div>
                <h3 className="font-display text-base sm:text-lg mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>;
        })}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center max-w-3xl mx-auto px-4">
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Se você se identificou com pelo menos um perfil acima...
            </p>
            <p className="text-accent text-lg sm:text-xl font-bold">
              Este ebook foi feito especialmente para você! 💪
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default ForWho;