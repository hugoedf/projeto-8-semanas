import { X, AlertTriangle, ArrowDown, Target, RotateCcw, TrendingDown, Clock, Flame } from "lucide-react";
const painPoints = [{
  text: "Treina duro há meses e nada muda no espelho?",
  icon: X
}, {
  text: "Cada treino é improviso e perda de tempo?",
  icon: Clock
}, {
  text: "Já gastou dinheiro em treinos, ebooks ou suplementos que não funcionaram?",
  icon: TrendingDown
}, {
  text: "Perde motivação e autoestima porque os resultados não aparecem?",
  icon: RotateCcw
}];
const explanationPoints = [{
  text: "O problema nunca foi",
  highlight: "falta de esforço.",
  followUp: "É treinar sem um sistema que força o corpo a responder. Sem isso, ele se adapta — e para de evoluir.",
  icon: Target
}, {
  text: "Sem progressão estruturada,",
  highlight: "o corpo estagna.",
  followUp: "Não importa quanta força você faça. Estímulo repetido = zero crescimento.",
  icon: RotateCcw
}, {
  text: "Você perde tempo, energia e",
  highlight: "motivação.",
  icon: TrendingDown
}, {
  text: "E o pior: a cada semana que passa,",
  highlight: "a frustração só aumenta.",
  icon: Clock
}];
const Problems = () => {
  return <section className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsla(0,70%,50%,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,hsla(0,70%,50%,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Headline */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-4 text-2xl">
              Se você se identifica com<br />
              <span className="text-red-500">algum desses problemas</span>,<br />
              você não está sozinho:
            </h2>
          </div>
          
          {/* Pain Points Cards - Premium White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-12">
            {painPoints.map((point, index) => <div key={index} className="group relative bg-white p-6 lg:p-7 shadow-2xl shadow-black/20 hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 rounded-sm">
                {/* Red accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-t-2xl" />
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 border-2 border-red-200 flex items-center justify-center group-hover:bg-red-100 group-hover:border-red-300 transition-colors">
                    <point.icon className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg font-semibold leading-relaxed pt-2">
                    {point.text}
                  </p>
                </div>
              </div>)}
          </div>

          {/* Agitação da dor */}
          <div className="bg-red-950/50 border border-red-500/40 rounded-2xl p-6 sm:p-8 mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-bold text-sm uppercase tracking-widest">Atenção</span>
              <Flame className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-red-200 text-lg sm:text-xl font-bold">
              Cada dia sem esse método é mais uma semana perdida e esforço jogado fora.
            </p>
          </div>
          
          {/* Visual connector */}
          
          
          {/* A Verdade Container */}
          
          
        </div>
      </div>
    </section>;
};
export default Problems;