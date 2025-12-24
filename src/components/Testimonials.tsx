import whatsapp1 from "@/assets/testimonials/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/testimonials/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/testimonials/whatsapp-3.jpeg";
import whatsapp4 from "@/assets/testimonials/whatsapp-4.jpeg";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonialImages = [{
  src: whatsapp1,
  highlight: "Treino em 50min",
  description: "De 2h enrolando para 50min executando"
}, {
  src: whatsapp2,
  highlight: "Melhor que consultoria",
  description: "Material mais completo que consultorias de R$200"
}, {
  src: whatsapp3,
  highlight: "Pump absurdo",
  description: "Progressão que quebra mesmo quem já treina pesado"
}, {
  src: whatsapp4,
  highlight: "Clareza total",
  description: "De 1h30 enrolando para 45min de treino focado"
}];

const TestimonialCard = ({ testimonial, style }: { testimonial: typeof testimonialImages[0]; style?: React.CSSProperties }) => (
  <div className="group" style={style}>
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[#0b141a] hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          ✨ {testimonial.highlight}
        </span>
      </div>
      <img src={testimonial.src} alt={`Depoimento WhatsApp - ${testimonial.highlight}`} className="w-full h-auto object-cover" loading="lazy" decoding="async" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
        <p className="text-white/90 text-sm font-medium">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getItemStyle } = useStaggeredAnimation(testimonialImages.length, 100);
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div 
          ref={titleRef}
          className="text-center mb-12 sm:mb-14"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 px-2 tracking-tight">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Conversas reais de quem está aplicando o método
          </p>
        </div>
        
        {/* Mobile: Carousel */}
        <div className="sm:hidden" ref={cardsRef}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {testimonialImages.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 basis-[85%]">
                  <TestimonialCard testimonial={testimonial} style={getItemStyle(index)} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 h-8 w-8" />
              <CarouselNext className="static translate-y-0 h-8 w-8" />
            </div>
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div ref={cardsRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {testimonialImages.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} style={getItemStyle(index)} />
          ))}
        </div>
        
        <div 
          ref={badgeRef}
          className="mt-12 sm:mt-14 text-center px-4"
          style={{
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-card border border-border/80 rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto max-w-sm sm:max-w-none shadow-md">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-accent to-accent/60 border-2 border-card flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-accent">+</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground text-sm sm:text-base">+500 transformações</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Veja o que nossos alunos estão dizendo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;