import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  result: string;
  text: string;
  image?: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Carlos Silva",
      result: "+3kg de músculo em 8 semanas",
      text: "Comecei sem saber por onde começar. O app me deu clareza total. Cada treino é progressivo e eu vejo os resultados no espelho e na balança. Recomendo demais!",
      image: "/testimonials/carlos-silva.jpg"
    },
    {
      name: "João Pereira",
      result: "Saiu da estagnação em 4 semanas",
      text: "Treinava há 2 anos sem evoluir. O método 8x me mostrou exatamente o que eu estava fazendo errado. Agora estou evoluindo toda semana!",
      image: "/testimonials/joao-pereira.jpg"
    },
    {
      name: "Lucas Martins",
      result: "Ganhou força e definição",
      text: "O app é muito intuitivo. Não preciso ficar pensando no que treinar. Tudo pronto, progressivo e funciona! Meu corpo mudou muito.",
      image: "/testimonials/lucas-martins.jpg"
    },
    {
      name: "Felipe Costa",
      result: "+4kg de músculo + definição",
      text: "Finalmente um método que faz sentido. Não é só treino aleatório. Tem progressão, tem ciência, tem resultado!",
      image: "/testimonials/felipe-costa.jpg"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black/40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsla(18,100%,58%,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Veja o que <span className="text-accent">+500 homens</span> conquistaram
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            Depoimentos reais de clientes que transformaram seu corpo em 8 semanas
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:border-accent/30 transition-all duration-300 hover:bg-white/10 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 mb-6 inline-block">
                <p className="text-accent font-semibold text-xs sm:text-sm">
                  ✓ {testimonial.result}
                </p>
              </div>

              {/* Author Info with Photo */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {testimonial.image && (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-accent mb-2">500+</p>
            <p className="text-xs sm:text-sm text-white/70">Homens Transformados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-accent mb-2">4.9★</p>
            <p className="text-xs sm:text-sm text-white/70">Avaliação Média</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-accent mb-2">98%</p>
            <p className="text-xs sm:text-sm text-white/70">Taxa de Satisfação</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-accent mb-2">8 sem</p>
            <p className="text-xs sm:text-sm text-white/70">Tempo Médio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
