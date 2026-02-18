import { Star, Quote, MapPin, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  name: string;
  age: number;
  location: string;
  image: string;
  // 1) Contexto rápido (identificação imediata)
  profile: string;
  // 2) O “gancho” do depoimento
  highlight: string;
  // 3) Prova narrada
  text: string;
  // 4) Resultado curto e específico (micro-prova)
  result: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Lucas M.",
    age: 28,
    location: "São Paulo, SP",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    profile: "Treinava, mas estagnava na progressão",
    highlight: "Resultados rápidos e consistentes",
    text: "Em 6 semanas já senti meu corpo mudando de verdade. O app me guia e me mantém no caminho, sem depender da minha vontade.",
    result: "Evolução visível em 6 semanas",
  },
  {
    name: "Camilo S.",
    age: 25,
    location: "Rio de Janeiro, RJ",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    profile: "Cansado de treino aleatório",
    highlight: "Método completo e prático",
    text: "Comprei achando que seria mais um treino. Em poucos dias já senti diferença no pump e na progressão. Se soubesse, tinha começado antes.",
    result: "Progressão já na 1ª semana",
  },
  {
    name: "Pedro T.",
    age: 32,
    location: "Belo Horizonte, MG",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    profile: "Travado e sem evolução por meses",
    highlight: "Finalmente evolução real",
    text: "Quebrei meu recorde na quinta semana. Não era genética, era método. A progressão estruturada é o diferencial.",
    result: "Recorde pessoal na 5ª semana",
  },
  {
    name: "André Luiz",
    age: 29,
    location: "Curitiba, PR",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    profile: "Saiu do improviso para o controle",
    highlight: "Do improviso pro controle total",
    text: "Antes eu improvisava. Agora sigo o app e vejo evolução toda semana. Acabou a sensação de estar perdido na academia.",
    result: "Força subindo semana a semana",
  },
  {
    name: "Ricardo Santos",
    age: 26,
    location: "Brasília, DF",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    profile: "8 meses travado na mesma carga",
    highlight: "Saí da estagnação",
    text: "Mesma carga, mesmo shape, mesma frustração. Na quinta semana do método, quebrei meus recordes.",
    result: "Quebra de platô na 5ª semana",
  },
];

function StarsRow() {
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
      ))}
    </div>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="group bg-white rounded-xl p-5 shadow-lg shadow-black/10 border border-black/5 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 h-full">
    {/* Header */}
    <div className="flex items-center gap-3 mb-3">
      <div className="relative">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-accent/30 shadow-lg"
          loading="lazy"
        />
        <div className="absolute -bottom-1 -right-1 bg-accent text-white rounded-full p-1 shadow-lg">
          <Star className="w-3 h-3 fill-current" />
        </div>
      </div>

      <div className="min-w-0">
        <h4 className="font-bold text-black text-sm truncate">
          {testimonial.name}, {testimonial.age}
        </h4>

        <p className="text-black/50 text-xs flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {testimonial.location}
        </p>

        <StarsRow />
      </div>
    </div>

    {/* Contexto (identificação rápida) */}
    <div className="text-xs text-black/60 mb-3">
      <span className="font-semibold text-black/70">Perfil:</span>{" "}
      {testimonial.profile}
    </div>

    {/* Badge de destaque */}
    <div className="inline-flex items-center gap-1 bg-accent/10 text-accent rounded-full px-3 py-1 mb-3">
      <span className="text-xs font-bold">{testimonial.highlight}</span>
    </div>

    {/* Depoimento */}
    <div className="relative mb-4">
      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-accent/15" />
      <p className="text-black/70 text-sm leading-relaxed pl-4">
        “{testimonial.text}”
      </p>
    </div>

    {/* Resultado (micro-prova) */}
    <div className="pt-3 border-t border-black/5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-green-600">
          {testimonial.result}
        </span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-4 px-2 tracking-tight text-white">
            Mais de <span className="text-accent">500 pessoas</span> já
            transformaram seus treinos e corpos
          </h2>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Veja o que acontece quando você para de improvisar e segue um método
            estruturado.
          </p>
        </div>

        {/* Carrossel Mobile */}
        <div className="block lg:hidden">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-3 basis-full sm:basis-1/2"
                >
                  <div className="p-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white/10 border-white/20 text-white hover:bg-accent hover:text-white hover:border-accent" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white/10 border-white/20 text-white hover:bg-accent hover:text-white hover:border-accent" />
            </div>
          </Carousel>
        </div>

        {/* Grid Desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 max-w-4xl mx-auto mt-5">
            {testimonials.slice(3, 5).map((testimonial, index) => (
              <TestimonialCard key={index + 3} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* CTA pós-prova (conversão) */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-full px-5 py-2.5 shadow-xl shadow-accent/40">
            <span className="font-bold text-base sm:text-lg">
              +500 transformações comprovadas
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <a
              href="#checkout"
              className="inline-flex items-center gap-2 bg-white text-black font-extrabold rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition"
            >
              Quero parar de improvisar
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-white/60 text-sm">
              Acesso imediato • 7 dias de garantia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
