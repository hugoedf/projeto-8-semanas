import { Star, BadgeCheck } from "lucide-react";

const testimonials = [{
  name: "Carlos R.",
  age: "28 anos",
  city: "São Paulo",
  text: "Em 4 semanas ganhei 2cm de braço. O App 8X me guiou treino por treino. Só executar.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  result: "+2cm de braço",
  verified: true
}, {
  name: "Mariana S.",
  age: "32 anos",
  city: "Belo Horizonte",
  text: "3 anos travada no mesmo shape. Em 6 semanas saí do platô. Melhor investimento.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  result: "Saiu do platô",
  verified: true
}, {
  name: "Rafael M.",
  age: "25 anos",
  city: "Rio de Janeiro",
  text: "Com o App 8X, abro e executo. Sem dúvida, sem improviso. Meu shape mudou.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  result: "+4kg massa magra",
  verified: true
}, {
  name: "Juliana C.",
  age: "29 anos",
  city: "Curitiba",
  text: "Nutrição + App foi a combinação perfeita. Vi resultado no espelho em 3 semanas.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  result: "-5% gordura",
  verified: true
}];

const Testimonials = () => {
  return (
    <section className="py-14 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* Header - Centralizado */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in max-w-xl mx-auto">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl mb-3 tracking-tight px-2">
            Quem aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando.</span>
          </h2>
        </div>
        
        {/* Depoimentos - Vertical no mobile */}
        <div className="flex flex-col gap-4 max-w-md mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:max-w-7xl sm:gap-5">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 hover-lift animate-fade-in shadow-sm hover:shadow-lg transition-all duration-300" 
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Badge de resultado + Verificado */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  📈 {testimonial.result}
                </span>
                {testimonial.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-500">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verificado
                  </span>
                )}
              </div>
              
              {/* Estrelas */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Texto - Curto e legível */}
              <p className="text-foreground mb-4 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>
              
              {/* Info do usuário */}
              <div className="pt-3 border-t border-border/60 flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-accent/30"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.age} — {testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Resumo - Centralizado */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-card border border-border/80 rounded-2xl px-6 py-4 shadow-md">
            <div className="flex -space-x-2">
              {testimonials.map((t, i) => (
                <img 
                  key={i} 
                  src={t.avatar} 
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-card object-cover"
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center">
                <span className="text-xs font-bold text-accent">+</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">+500 transformações</p>
              <p className="text-xs text-muted-foreground">Avaliação média: 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
