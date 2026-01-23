import { X, Clock, TrendingDown, RotateCcw, Flame, Target } from "lucide-react";

const painPoints = [
  { text: "Treina duro há meses e nada muda no espelho?", icon: X },
  { text: "Cada treino é improviso e perda de tempo?", icon: Clock },
  { text: "Já gastou dinheiro em treinos, ebooks ou suplementos que não funcionaram?", icon: TrendingDown },
  { text: "Perde motivação e autoestima porque os resultados não aparecem?", icon: RotateCcw }
];

const Problems = () => {
  return (
    <section className="py-12 sm:py-16 bg-black relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(0,70%,50%,0.06),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Headline */}
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-[1.1] mb-3">
              Se você se identifica com<br />
              <span className="text-red-500">algum desses problemas</span>,<br />
              você não está sozinho:
            </h2>
          </div>
          
          {/* Pain Points Cards - Premium White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {painPoints.map((point, index) => (
              <div key={index} className="group relative bg-white p-5 lg:p-6 shadow-xl shadow-black/20 hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 rounded-xl">
                {/* Red accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-t-xl" />
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 border-2 border-red-200 flex items-center justify-center group-hover:bg-red-100 group-hover:border-red-300 transition-colors">
                    <point.icon className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-black text-sm sm:text-base font-semibold leading-relaxed pt-1.5">
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

                    {/* Agitação da dor */}
          <div className="bg-red-950/50 border border-red-500/40 rounded-xl p-5 sm:p-6 text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold text-sm uppercase tracking-widest">Atenção</span>
              <Flame className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-red-200 text-base sm:text-lg font-bold">
              Cada dia sem esse método é mais uma semana perdida e esforço jogado fora.
            </p>
          </div>

          {/* FRASE-PONTE (O Pulo do Gato) */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed italic">
              "Esses problemas não acontecem por falta de esforço. Eles acontecem porque a maioria treina sem um método científico."
            </p>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Problems;
