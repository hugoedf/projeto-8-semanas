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
    {/* Mockup de celular premium */}
    <div className="relative bg-gray-900 rounded-[2.5rem] p-2.5 shadow-[0_30px_80px_-20px_hsla(0,0%,0%,0.5)] hover:shadow-[0_40px_100px_-20px_hsla(18,100%,58%,0.25)] transition-all duration-500 hover:-translate-y-2 border border-accent/10">
      {/* Notch do celular */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />
      
      {/* Tela do celular */}
      <div className="relative rounded-[2rem] overflow-hidden bg-[#0b141a]">
        {/* Badge de destaque */}
        <div className="absolute top-5 left-4 z-10">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white bg-accent backdrop-blur-sm px-4 py-2 rounded-full shadow-[0_8px_20px_hsla(18,100%,58%,0.4)]">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 pt-20">
          <p className="text-white text-base font-semibold" style={{ lineHeight: '1.6' }}>
            {testimonial.description}
          </p>
        </div>
      </div>
      
      {/* Barra inferior do celular */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-24 sm:py-32 bg-muted relative overflow-hidden">
      {/* Glow laranja de fundo - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-accent/12 rounded-full blur-[150px] opacity-70" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-50" />
      </div>
      
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header com separação visual */}
        <div className="testimonials-header text-center max-w-[700px] mx-auto mb-16">
          {/* Badge Superior - Enhanced */}
          <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-accent/20 mb-8">
            <MessageCircle className="w-5 h-5 text-accent" />
            <span className="uppercase text-sm font-bold tracking-[0.15em] text-accent">
              Resultados Reais
            </span>
          </div>
          
          {/* Introdução preparatória - Bloco de Impacto */}
          <div className="impact-block mb-10">
            <p className="text-slate-500 text-lg sm:text-xl mb-1.5">
              Pessoas que já treinavam.
            </p>
            <p className="text-slate-500 text-lg sm:text-xl mb-1.5">
              Pessoas que estavam estagnadas.
            </p>
            <p className="text-foreground font-semibold text-lg sm:text-xl">
              Pessoas que só precisavam de um método claro.
            </p>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 tracking-[-0.03em] font-extrabold">
            Quem já aplicou o Método 8X está{" "}
            <span className="text-gradient drop-shadow-[0_0_30px_hsla(18,100%,58%,0.3)]">transformando o físico — e a mente.</span>
          </h2>
          
          <p className="text-muted-foreground text-lg sm:text-xl" style={{ lineHeight: '1.75' }}>
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
        
        {/* Badge de transformações - Enhanced */}
        <div className="mt-16 sm:mt-24 flex justify-center">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_hsla(0,0%,0%,0.12)] border border-accent/10 px-12 py-10 text-center max-w-md">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 text-accent font-extrabold px-6 py-3 rounded-full mb-6 border border-accent/15 shadow-[0_0_30px_hsla(18,100%,58%,0.15)]">
              <Users className="w-5 h-5" />
              <span className="text-lg">+500 transformações</span>
            </div>
            <p className="text-slate-500 text-base mb-3" style={{ lineHeight: '1.75' }}>
              E esse número cresce toda semana.
            </p>
            <p className="text-foreground font-bold text-base" style={{ lineHeight: '1.75' }}>
              Pessoas reais. Resultados reais. Método comprovado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
