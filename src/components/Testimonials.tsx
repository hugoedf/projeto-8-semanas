import whatsapp1 from "@/assets/testimonials/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/testimonials/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/testimonials/whatsapp-3.jpeg";
import whatsapp4 from "@/assets/testimonials/whatsapp-4.jpeg";
import { Users, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonialImages = [
  { src: whatsapp1, highlight: "Treino em 50min", description: "De 2h enrolando para 50min executando" },
  { src: whatsapp2, highlight: "Melhor que consultoria", description: "Material mais completo que consultorias de R$200" },
  { src: whatsapp3, highlight: "Pump absurdo", description: "Progressão que quebra mesmo quem já treina pesado" },
  { src: whatsapp4, highlight: "Clareza total", description: "De 1h30 enrolando para 45min de treino focado" }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonialImages[0] }) => (
  <div className="group">
    {/* Mockup de celular */}
    <div className="relative bg-card rounded-[2rem] p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-accent/10">
      {/* Notch do celular */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-card rounded-b-xl z-20" />
      
      {/* Tela do celular */}
      <div className="relative rounded-[1.5rem] overflow-hidden bg-[#0b141a]">
        {/* Badge de destaque */}
        <div className="absolute top-4 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-foreground bg-accent px-3 py-1.5 rounded-full shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground animate-pulse" />
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
        
        {/* Gradient overlay com descrição */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 pt-16">
          <p className="text-foreground text-sm font-medium" style={{ lineHeight: '1.5' }}>
            {testimonial.description}
          </p>
        </div>
      </div>
      
      {/* Barra inferior do celular */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-muted-foreground/20 rounded-full" />
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary relative overflow-hidden">
      {/* Divider laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Glow laranja de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/8 rounded-full blur-[120px] opacity-60" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-[650px] mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="uppercase text-xs font-bold tracking-[0.12em] text-accent">
              Resultados Reais
            </span>
          </div>
          
          {/* Introdução preparatória */}
          <div className="mb-8">
            <p className="text-muted-foreground text-base sm:text-lg mb-1">
              Pessoas que já treinavam.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mb-1">
              Pessoas que estavam estagnadas.
            </p>
            <p className="text-foreground font-medium text-base sm:text-lg">
              Pessoas que só precisavam de um método claro.
            </p>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 tracking-tight font-bold">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-accent">transformando o físico — e a mente.</span>
          </h2>
          
          <p className="text-muted-foreground text-base sm:text-lg" style={{ lineHeight: '1.7' }}>
            Conversas reais de quem está aplicando o método
          </p>
        </div>
        
        {/* Mobile: Carousel */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {testimonialImages.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-3 basis-[85%]">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-5">
              <CarouselPrevious className="static translate-y-0 h-8 w-8 bg-card border-border" />
              <CarouselNext className="static translate-y-0 h-8 w-8 bg-card border-border" />
            </div>
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {testimonialImages.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Badge de transformações */}
        <div className="mt-14 flex justify-center">
          <div className="bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-center">
            <div className="inline-flex items-center gap-2 text-accent font-bold">
              <Users className="w-4 h-4" />
              <span className="text-base">+500 transformações</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Pessoas reais. Resultados reais. Método comprovado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
