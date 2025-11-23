import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Eduardo",
    age: "28 anos",
    text: "Em 4 semanas já vi diferença no meu peitoral e braços. Os treinos são desafiadores mas totalmente possíveis de fazer.",
    rating: 5,
  },
  {
    name: "Mariana Silva",
    age: "32 anos",
    text: "Nunca tinha treinado com tanta clareza. O ebook é objetivo e me ensinou a montar meus próprios treinos.",
    rating: 5,
  },
  {
    name: "Rafael Santos",
    age: "25 anos",
    text: "Simples, direto e eficiente. Finalmente entendi o que fazer na academia para crescer de verdade.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    age: "29 anos",
    text: "A parte de nutrição foi um diferencial. Aprendi a comer para crescer sem complicação.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Quem já seguiu o método{" "}
            <span className="text-gradient">está transformando</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos alunos têm a dizer sobre o Projeto 8 Semanas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed text-sm italic">
                "{testimonial.text}"
              </p>
              
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">★</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">+500 transformações</p>
              <p className="text-sm text-muted-foreground">Avaliação média: 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
