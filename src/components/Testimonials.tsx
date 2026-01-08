import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcos Vinícius",
    age: 31,
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    highlight: "3 anos travado. 4 semanas pra destravar.",
    text: "Eu treinava há 3 anos e estava travado no mesmo peso. Sempre achei que era genética. Em 4 semanas de Método 8X, minhas camisas começaram a apertar no braço. A clareza de saber exatamente o que fazer em cada treino mudou tudo. Pela primeira vez, eu sinto que o esforço tá valendo.",
    result: "Braço cresceu 2cm"
  },
  {
    name: "Felipe Augusto",
    age: 27,
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    highlight: "Minha namorada notou primeiro",
    text: "Eu olhava no espelho e não via diferença nenhuma. Tava quase desistindo da academia. Na terceira semana do método, minha namorada perguntou se eu tava fazendo algo diferente. Ela notou antes de mim. Isso me deu um gás absurdo pra continuar.",
    result: "Definição visível em 3 semanas"
  },
  {
    name: "Gustavo Henrique",
    age: 34,
    location: "Belo Horizonte, MG",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    highlight: "Perdi tempo e dinheiro com personal",
    text: "Já paguei R$350 por mês em personal. Fiz consultoria online de R$400. Nenhum me explicou a lógica da progressão como esse método de R$19,90 explica. Parece piada, mas é a verdade. Finalmente entendi por que eu não crescia.",
    result: "+6kg em 8 semanas"
  },
  {
    name: "André Luiz",
    age: 29,
    location: "Curitiba, PR",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    highlight: "Do improviso pro controle total",
    text: "Eu entrava na academia sem saber o que ia fazer. Improvisava todo dia. Agora abro o app, sei exatamente o exercício, a carga, as séries. Acabou a sensação de estar perdido. Meu corpo respondeu em 2 semanas porque finalmente tem estímulo certo.",
    result: "Supino subiu 15kg"
  },
  {
    name: "Ricardo Santos",
    age: 26,
    location: "Brasília, DF",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    highlight: "Saí da estagnação de 8 meses",
    text: "8 meses sem evoluir nada. Mesma carga, mesmo shape, mesma frustração. Eu já tava conformado que era meu limite genético. Na quinta semana do método, quebrei meu recorde no leg press. Não era genética. Era falta de método.",
    result: "Recordes pessoais batidos"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="group bg-white rounded-2xl p-5 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300">
    {/* Header com foto e info */}
    <div className="flex items-center gap-3 mb-4">
      <div className="relative">
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-accent/20"
          loading="lazy"
        />
        <div className="absolute -bottom-1 -right-1 bg-accent text-white rounded-full p-1">
          <Star className="w-3 h-3 fill-current" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}, {testimonial.age}</h4>
        <p className="text-muted-foreground text-xs">{testimonial.location}</p>
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
          ))}
        </div>
      </div>
    </div>

    {/* Badge de destaque */}
    <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-3 py-1 mb-3">
      <span className="text-xs font-semibold">{testimonial.highlight}</span>
    </div>

    {/* Depoimento */}
    <div className="relative">
      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-accent/20" />
      <p className="text-foreground/80 text-sm leading-relaxed pl-4">
        "{testimonial.text}"
      </p>
    </div>

    {/* Resultado */}
    <div className="mt-4 pt-3 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-green-600">{testimonial.result}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F5F5F5] relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px] opacity-50" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Micro-gatilho */}
        <div className="text-center mb-3">
          <span className="inline-block text-accent/80 text-sm font-medium italic">
            "Eles decidiram mudar. Você vai esperar o quê?"
          </span>
        </div>

        <div className="text-center mb-8 sm:mb-10">
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
            Homens reais. Resultados reais. Sem filtro, sem edição.
          </p>
        </div>
        
        {/* Grid de depoimentos - 2 colunas mobile, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Segunda linha - 2 cards centralizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-3xl mx-auto mt-4 lg:mt-5">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <TestimonialCard key={index + 3} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Badge de transformações */}
        <div className="mt-10 sm:mt-12 text-center px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 border border-accent/20 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-full px-4 py-2 shadow-lg shadow-accent/30 mb-3">
              <span className="font-bold text-base sm:text-lg">+500 transformações</span>
            </div>
            <p className="text-foreground font-semibold text-base sm:text-lg mb-1">
              Pessoas reais. Resultados reais. Método comprovado.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Por R$19,90 você testa. Por 7 dias você decide se vale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;