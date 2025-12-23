import { BadgeCheck, Check } from "lucide-react";

const testimonials = [{
  name: "Carlos R.",
  age: "28 anos — São Paulo",
  text: "Comprei achando que era mais um e-book genérico. Em 4 semanas ganhei 2cm de braço. E o App 8X? Me guiou treino por treino sem eu ter que pensar. Só executar.",
  result: "+2cm de braço",
  time: "14:32"
}, {
  name: "Mariana S.",
  age: "32 anos — Belo Horizonte",
  text: "3 anos travada no mesmo shape. O Método me mostrou onde eu errava. O App organizou minha rotina. Em 6 semanas saí do platô. Melhor investimento que fiz.",
  result: "Saiu do platô",
  time: "09:47"
}, {
  name: "Rafael M.",
  age: "25 anos — Rio de Janeiro",
  text: "Eu desperdiçava tempo criando treino. Com o App 8X, abro e executo. Sem dúvida, sem improviso. Meu shape mudou porque parei de adivinhar e comecei a seguir.",
  result: "+4kg massa magra",
  time: "18:15"
}, {
  name: "Juliana C.",
  age: "29 anos — Curitiba",
  text: "A nutrição do método + o App pra acompanhar foi a combinação perfeita. Vi resultado no espelho em 3 semanas. Antes eu planejava. Agora eu faço.",
  result: "-5% gordura",
  time: "21:03"
}];

const WhatsAppMessage = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  return (
    <div 
      className="animate-fade-in" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* WhatsApp Chat Container */}
      <div className="bg-[#0b141a] rounded-2xl overflow-hidden shadow-xl border border-white/5">
        {/* WhatsApp Header */}
        <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold text-sm">
            {testimonial.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm">{testimonial.name}</span>
              <BadgeCheck className="w-4 h-4 text-[#00a884]" />
            </div>
            <span className="text-[#8696a0] text-xs">{testimonial.age}</span>
          </div>
        </div>
        
        {/* Chat Background */}
        <div 
          className="p-4 min-h-[200px] relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: '#0b141a'
          }}
        >
          {/* Result Badge - Como mensagem recebida */}
          <div className="flex justify-start mb-3">
            <div className="bg-[#1f2c34] rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
              <span className="text-[#00a884] text-xs font-medium">📈 Resultado: {testimonial.result}</span>
            </div>
          </div>
          
          {/* Main Message Bubble */}
          <div className="flex justify-end">
            <div className="bg-[#005c4b] rounded-lg rounded-br-none px-3 py-2 max-w-[90%] relative shadow-md">
              <p className="text-white text-sm leading-relaxed pr-12">
                {testimonial.text}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[#8696a0] text-[10px]">{testimonial.time}</span>
                <div className="flex -space-x-1">
                  <Check className="w-3 h-3 text-[#53bdeb]" />
                  <Check className="w-3 h-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
            Veja o que nossos alunos estão dizendo
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <WhatsAppMessage key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
        
        <div className="mt-12 sm:mt-14 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-card border border-border/80 rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto max-w-sm sm:max-w-none shadow-md">
            <div className="flex -space-x-2">
              {testimonials.map((t, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-accent to-accent/60 border-2 border-card flex items-center justify-center text-white font-bold text-xs shadow-sm"
                >
                  {t.name.charAt(0)}
                </div>
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-accent">+</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground text-sm sm:text-base">+500 transformações</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avaliação média: 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
