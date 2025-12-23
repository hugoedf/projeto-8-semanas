import whatsapp1 from "@/assets/testimonials/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/testimonials/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/testimonials/whatsapp-3.jpeg";
import whatsapp4 from "@/assets/testimonials/whatsapp-4.jpeg";

const testimonialImages = [
  {
    src: whatsapp1,
    highlight: "Treino em 50min",
    description: "De 2h enrolando para 50min executando"
  },
  {
    src: whatsapp2,
    highlight: "Melhor que consultoria",
    description: "Material mais completo que consultorias de R$200"
  },
  {
    src: whatsapp3,
    highlight: "Pump absurdo",
    description: "Progressão que quebra mesmo quem já treina pesado"
  },
  {
    src: whatsapp4,
    highlight: "Clareza total",
    description: "De 1h30 enrolando para 45min de treino focado"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 sm:mb-14 animate-fade-in">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Conversas reais de quem está aplicando o método
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {testimonialImages.map((testimonial, index) => (
            <div 
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Container do print */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[#0b141a] hover:scale-[1.02] transition-transform duration-300">
                {/* Badge de destaque */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    ✨ {testimonial.highlight}
                  </span>
                </div>
                
                {/* Imagem do WhatsApp */}
                <img
                  src={testimonial.src}
                  alt={`Depoimento WhatsApp - ${testimonial.highlight}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient overlay no bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                  <p className="text-white/90 text-sm font-medium">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-14 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-card border border-border/80 rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto max-w-sm sm:max-w-none shadow-md">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-accent to-accent/60 border-2 border-card flex items-center justify-center text-white font-bold text-xs shadow-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-accent">+</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground text-sm sm:text-base">+500 transformações</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Resultados reais, conversas reais</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
