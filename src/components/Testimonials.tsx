import { Star, Quote, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const testimonials = [{
  name: "Lucas M.",
  age: 28,
  location: "São Paulo, SP",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  highlight: "Resultados rápidos e consistentes",
  text: "Em 6 semanas já senti meu corpo mudando de verdade. O app me guia e me motiva, sem depender da minha vontade.",
  result: "Transformação visível"
}, {
  name: "Camila S.",
  age: 25,
  location: "Rio de Janeiro, RJ",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  highlight: "Método completo e científico",
  text: "O método é completo, científico e fácil de seguir. A clareza de saber exatamente o que fazer fez toda a diferença.",
  result: "Corpo respondendo em 6 semanas"
}, {
  name: "Pedro T.",
  age: 32,
  location: "Belo Horizonte, MG",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  highlight: "Finalmente evolução real",
  text: "Quebrei meu recorde na quinta semana. Não era genética, era método. A progressão estruturada é o diferencial.",
  result: "Recordes pessoais batidos"
}, {
  name: "André Luiz",
  age: 29,
  location: "Curitiba, PR",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  highlight: "Do improviso pro controle total",
  text: "Antes improvisava, agora sigo o app e vejo evolução toda semana. Acabou a sensação de estar perdido na academia.",
  result: "Força aumentando toda semana"
}, {
  name: "Ricardo Santos",
  age: 26,
  location: "Brasília, DF",
  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
  highlight: "Saí da estagnação",
  text: "8 meses sem evoluir nada. Mesma carga, mesmo shape, mesma frustração. Na quinta semana do método, quebrei todos os meus recordes.",
  result: "Recordes pessoais batidos"
}];
const TestimonialCard = ({
  testimonial
}: {
  testimonial: typeof testimonials[0];
}) => <div className="group bg-white rounded-2xl p-6 shadow-xl shadow-black/10 border border-gray-100 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 h-full">
    {/* Header com foto e info */}
    <div className="flex items-center gap-4 mb-5">
      <div className="relative">
        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-3 border-accent/30 shadow-lg" loading="lazy" />
        <div className="absolute -bottom-1 -right-1 bg-accent text-white rounded-full p-1.5 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-base">{testimonial.name}, {testimonial.age}</h4>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {testimonial.location}
        </p>
        <div className="flex gap-0.5 mt-1.5">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
        </div>
      </div>
    </div>

    {/* Badge de destaque */}
    <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-4 py-1.5 mb-4">
      <span className="text-sm font-bold">{testimonial.highlight}</span>
    </div>

    {/* Depoimento */}
    <div className="relative mb-5">
      <Quote className="absolute -top-1 -left-1 w-8 h-8 text-accent/15" />
      <p className="text-gray-700 text-base leading-relaxed pl-5">
        "{testimonial.text}"
      </p>
    </div>

    {/* Resultado */}
    <div className="pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-bold text-green-600">{testimonial.result}</span>
      </div>
    </div>
  </div>;
const Testimonials = () => {
  return <section className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-accent/10 rounded-full blur-[150px] opacity-40" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-2 tracking-tight text-white text-2xl">
            Mais de <span className="text-accent">500 pessoas</span> já transformaram{" "}
            <span className="text-gradient">seus treinos e corpos</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Veja o que está acontecendo com quem decidiu aplicar ciência, não motivação.
          </p>
        </div>
        
        {/* Carrossel Mobile */}
        <div className="block lg:hidden">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-3">
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="pl-3 basis-full sm:basis-1/2">
                  <div className="p-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white/10 border-white/20 text-white hover:bg-accent hover:text-white hover:border-accent" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white/10 border-white/20 text-white hover:bg-accent hover:text-white hover:border-accent" />
            </div>
          </Carousel>
        </div>
        
        {/* Grid Desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => <TestimonialCard key={index} testimonial={testimonial} />)}
          </div>
          
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
            {testimonials.slice(3, 5).map((testimonial, index) => <TestimonialCard key={index + 3} testimonial={testimonial} />)}
          </div>
        </div>
        
        {/* Badge de transformações */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 bg-accent text-white rounded-full px-6 py-3 shadow-2xl shadow-accent/40">
            <span className="font-bold text-lg sm:text-xl">+500 transformações comprovadas</span>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;