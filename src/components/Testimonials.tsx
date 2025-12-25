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
        
        {/* Gradient overlay com descrição */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-16">
          <p className="text-white/95 text-sm font-medium" style={{ lineHeight: '1.6' }}>
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
    <section className="section-breathing bg-muted relative overflow-hidden">
      {/* Glow laranja de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] opacity-40" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header com separação visual */}
        <div className="testimonials-header text-center max-w-[650px] mx-auto">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/60 mb-6">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="uppercase text-xs font-bold tracking-[0.15em] text-accent">
              Resultados Reais
            </span>
          </div>
          
          {/* Introdução preparatória - Bloco de Impacto */}
          <div className="impact-block mb-8">
            <p className="text-slate-500 text-base sm:text-lg mb-1">
              Pessoas que já treinavam.
            </p>
            <p className="text-slate-500 text-base sm:text-lg mb-1">
              Pessoas que estavam estagnadas.
            </p>
            <p className="text-foreground font-medium text-base sm:text-lg">
              Pessoas que só precisavam de um método claro.
            </p>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-5 tracking-[-0.02em]">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient">transformando o físico — e a mente.</span>
          </h2>
          
          <p className="text-muted-foreground text-base sm:text-lg" style={{ lineHeight: '1.75' }}>
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

        {/* Desktop: Grid Simétrico */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto">
          {testimonialImages.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Badge de transformações - Elevado e centralizado */}
        <div className="mt-14 sm:mt-20 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.06] border border-slate-100/80 px-10 py-8 text-center max-w-md">
            <div className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-50 to-amber-50 text-accent font-bold px-5 py-2.5 rounded-full mb-5 border border-accent/10">
              <Users className="w-4.5 h-4.5" />
              <span className="text-base">+500 transformações</span>
            </div>
            <p className="text-slate-500 text-sm mb-2" style={{ lineHeight: '1.75' }}>
              E esse número cresce toda semana.
            </p>
            <p className="text-foreground font-semibold text-sm" style={{ lineHeight: '1.75' }}>
              Pessoas reais. Resultados reais. Método comprovado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
