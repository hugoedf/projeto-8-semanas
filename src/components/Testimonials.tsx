import whatsapp1 from "@/assets/testimonials/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/testimonials/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/testimonials/whatsapp-3.jpeg";
import whatsapp4 from "@/assets/testimonials/whatsapp-4.jpeg";
import whatsapp5 from "@/assets/testimonials/whatsapp-5.jpeg";
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
}, {
  src: whatsapp5,
  highlight: "Método real",
  description: "Na segunda semana já sentiu diferença na força"
}];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonialImages[0] }) => (
  <div className="group">
    {/* Mockup de celular minimalista */}
    <div className="relative bg-[#1a1a1a] rounded-[2rem] p-2 shadow-2xl shadow-black/40 hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-1">
      {/* Notch do celular */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-b-xl z-20" />
      
      {/* Tela do celular */}
      <div className="relative rounded-[1.5rem] overflow-hidden bg-[#0b141a]">
        {/* Badge de destaque */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg shadow-accent/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {testimonial.highlight}
          </span>
        </div>
        
        {/* Imagem */}
        <img 
          src={testimonial.src} 
          alt={`Depoimento WhatsApp - ${testimonial.highlight}`} 
          className="w-full h-auto object-cover" 
          loading="lazy" 
          decoding="async" 
        />
        
        {/* Gradient overlay com descrição - mais compacto */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-8">
          <p className="text-white/95 text-xs font-medium leading-snug">
            {testimonial.description}
          </p>
        </div>
      </div>
      
      {/* Barra inferior do celular */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-18 bg-[#F5F5F5] relative overflow-hidden">
      {/* Glow laranja de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px] opacity-50" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          {/* Introdução consolidada - hierarquia clara */}
          <p className="text-muted-foreground text-base sm:text-lg mb-1.5">
            Pessoas que já treinavam. Pessoas estagnadas. Todas com algo em comum:
          </p>
          <p className="text-foreground font-semibold text-lg sm:text-xl mb-4">
            Só precisavam de um método claro.
          </p>
          
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 px-2 tracking-tight">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Conversas reais de quem está aplicando o método
          </p>
        </div>
        
        {/* Mobile: Carousel */}
        <div className="sm:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {testimonialImages.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-3 basis-[85%]">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 h-9 w-9 bg-card border-border/60" />
              <CarouselNext className="static translate-y-0 h-9 w-9 bg-card border-border/60" />
            </div>
          </Carousel>
        </div>

        {/* Desktop: Grid - 5 colunas para 5 depoimentos */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 max-w-7xl mx-auto">
          {testimonialImages.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Badge de transformações com frase de impacto */}
        <div className="mt-10 sm:mt-12 text-center px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 border border-accent/20 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-full px-4 py-2 shadow-lg shadow-accent/30 mb-3">
              <span className="font-bold text-base sm:text-lg">+500 transformações</span>
            </div>
            <p className="text-foreground font-semibold text-base sm:text-lg mb-1">
              E esse número cresce toda semana.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Pessoas reais. Resultados reais. Método comprovado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;