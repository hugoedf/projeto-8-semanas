import { Star } from "lucide-react";
const testimonials = [{
  name: "Carlos",
  age: "28",
  text: "Em 4 semanas já vi diferença no peitoral e braços.",
  rating: 5
}, {
  name: "Mariana",
  age: "32",
  text: "Nunca treinei com tanta clareza. O e-book é direto e objetivo.",
  rating: 5
}, {
  name: "Rafael",
  age: "25",
  text: "Simples e eficiente. Finalmente entendi como treinar de verdade.",
  rating: 5
}, {
  name: "Juliana",
  age: "29",
  text: "A parte de nutrição foi um divisor de águas pra mim.",
  rating: 5
}];
const Testimonials = () => {
  return <section className="py-12 sm:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4 px-2">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-card border border-border rounded-xl p-5 sm:p-6 hover-lift animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
              </div>
              
              <p className="text-foreground mb-3 sm:mb-4 leading-relaxed text-sm italic">
                "{testimonial.text}"
              </p>
              
              <div className="pt-3 sm:pt-4 border-t border-border">
                <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>)}
        </div>
        
        <div className="mt-8 sm:mt-12 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-card border border-border rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 w-full sm:w-auto max-w-sm sm:max-w-none">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">★</span>
                </div>)}
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground text-sm sm:text-base">+500 transformações</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avaliação média: 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;