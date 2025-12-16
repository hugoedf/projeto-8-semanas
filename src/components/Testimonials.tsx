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
  return <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
        </div>
        
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <p className="text-base sm:text-lg text-muted-foreground font-medium">
            Não é motivação.<br />
            É aplicação do método.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-card border border-border/80 rounded-2xl p-6 sm:p-7 hover-lift animate-fade-in shadow-sm hover:shadow-lg transition-all duration-300" style={{
          animationDelay: `${index * 0.08}s`
        }}>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent drop-shadow-sm" />)}
              </div>
              
              <p className="text-foreground mb-5 leading-relaxed text-sm italic">
                "{testimonial.text}"
              </p>
              
              <div className="pt-4 border-t border-border/60">
                <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>)}
        </div>
        
        <div className="mt-12 sm:mt-14 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-card border border-border/80 rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto max-w-sm sm:max-w-none shadow-md">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center shadow-sm">
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