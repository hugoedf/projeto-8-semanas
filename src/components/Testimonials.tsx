import { Star } from "lucide-react";

const testimonials = [{
  name: "Carlos R.",
  age: "28 anos — São Paulo",
  text: "Comprei achando que era mais um e-book genérico. Em 4 semanas ganhei 2cm de braço. E o App 8X? Me guiou treino por treino sem eu ter que pensar. Só executar.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
}, {
  name: "Mariana S.",
  age: "32 anos — Belo Horizonte",
  text: "3 anos travada no mesmo shape. O Método me mostrou onde eu errava. O App organizou minha rotina. Em 6 semanas saí do platô. Melhor investimento que fiz.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
}, {
  name: "Rafael M.",
  age: "25 anos — Rio de Janeiro",
  text: "Eu desperdiçava tempo criando treino. Com o App 8X, abro e executo. Sem dúvida, sem improviso. Meu shape mudou porque parei de adivinhar e comecei a seguir.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
}, {
  name: "Juliana C.",
  age: "29 anos — Curitiba",
  text: "A nutrição do método + o App pra acompanhar foi a combinação perfeita. Vi resultado no espelho em 3 semanas. Antes eu planejava. Agora eu faço.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
}];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border/80 rounded-2xl p-6 sm:p-7 hover-lift animate-fade-in shadow-sm hover:shadow-lg transition-all duration-300" 
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent drop-shadow-sm" />
                ))}
              </div>
              
              <p className="text-foreground mb-5 leading-relaxed text-sm italic">
                "{testimonial.text}"
              </p>
              
              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-accent/30"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.age}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-14 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-card border border-border/80 rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto max-w-sm sm:max-w-none shadow-md">
            <div className="flex -space-x-2">
              {testimonials.map((t, i) => (
                <img 
                  key={i} 
                  src={t.avatar} 
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-card object-cover shadow-sm"
                />
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-accent">+</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground text-sm sm:text-base">+500 transformações</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avaliação média: 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
