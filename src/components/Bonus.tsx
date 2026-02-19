import {
  Smartphone,
  BookOpen,
  Zap,
  TrendingUp,
  Timer,
  BarChart3,
  Dumbbell,
  Gift,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Bonus = () => {
  const appFeatures = [
    { icon: Dumbbell, title: "8 Semanas Programadas", description: "Treino pronto, dia a dia" },
    { icon: Timer, title: "Timer Inteligente", description: "Descanso otimizado" },
    { icon: TrendingUp, title: "Progressão de Cargas", description: "Evolução sem achismo" },
    { icon: BarChart3, title: "Acompanhamento", description: "Evolução semanal" }
  ];

  const bonuses = [
    { icon: BookOpen, title: "Guia de Nutrição", description: "Alimentação inteligente para hipertrofia" },
    { icon: Timer, title: "Checklist de Recuperação", description: "Evite overtraining e acelere evolução" },
    { icon: BarChart3, title: "Cronograma Semanal", description: "Passo a passo das 8 semanas", isNew: true }
  ];

// Defina os caminhos das imagens de telas do app
const appImages = [
  "/lovable-uploads/app-01.jpeg",
  "/lovable-uploads/app-02.jpeg",
  "/lovable-uploads/app-03.jpeg",
  "/lovable-uploads/app-04.jpeg",
];


  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsla(18,100%,58%,0.04),transparent_50%)]" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-2 mb-5">
            <Gift className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold text-sm uppercase tracking-widest">Bônus Exclusivos</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-3">
            Tudo que você precisa para<br />
            <span className="text-accent">resultados máximos,</span> incluso hoje
          </h2>
        </div>

        {/* Bônus Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {bonuses.map((bonus, index) => (
            <div key={index} className={`relative bg-white border ${bonus.isNew ? 'border-accent/40 bg-accent/5' : 'border-black/10'} rounded-xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
              {bonus.isNew && (
                <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-accent text-white px-2 py-1 rounded-full font-bold shadow-lg">
                  Novo
                </span>
              )}
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${bonus.isNew ? 'bg-accent/20' : 'bg-accent/10'} flex items-center justify-center`}>
                <bonus.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-black font-bold text-base mb-1">
                {bonus.title}
              </h3>
              <p className="text-black/60 text-sm">
                {bonus.description}
              </p>
            </div>
          ))}
        </div>

        {/* App Features */}
        <div className="bg-black rounded-2xl p-5 sm:p-7 mb-8">
          <div className="flex items-center justify-center gap-3 mb-5">
            <Smartphone className="w-5 h-5 text-accent" />
            <p className="text-white text-lg font-bold">
              No App 8X você recebe:
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {appFeatures.map((feature, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-accent" />
                </div>
                <p className="text-white text-sm font-semibold mb-0.5 text-center">
                  {feature.title}
                </p>
                <p className="text-white/50 text-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Micro reforço */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 sm:p-6 text-center mb-8">
          <p className="text-black text-base sm:text-lg font-semibold">
            Sozinhos, esses bônus já valem mais que o preço do método — <br className="hidden sm:block" />
            mas você leva <span className="text-accent font-bold">tudo por R$19,90.</span>
          </p>
        </div>

        {/* Stack de valor */}
        <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-7 shadow-lg shadow-black/5 max-w-xl mx-auto mb-8">
          <p className="text-black font-bold text-base text-center mb-5">
            O que você recebe ao entrar hoje:
          </p>

          <div className="space-y-2.5 text-sm mb-5">
            <div className="flex justify-between text-black/70">
              <span>Método 8X Completo (Sistema + App)</span>
              <span className="font-semibold">R$97</span>
            </div>
            <div className="flex justify-between text-black/70">
              <span>Guia de Nutrição para Hipertrofia</span>
              <span className="font-semibold">R$47</span>
            </div>
            <div className="flex justify-between text-black font-bold">
              <span>BÔNUS: Combustível 8X: 15 Receitas</span>
              <span className="text-accent">R$37</span>
            </div>

            <div className="h-px bg-black/10 my-3" />

            <div className="flex justify-between text-black font-bold text-base">
              <span>Valor real</span>
              <span className="line-through text-black/40">R$181</span>
            </div>

            <div className="flex justify-between text-black font-bold text-xl">
              <span>Hoje</span>
              <span className="text-accent">R$19,90</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-accent/10 rounded-full px-4 py-2.5 border border-accent/25">
            <Zap className="w-4 h-4 text-accent" />
            <p className="text-sm font-bold text-black">
              Acesso vitalício — pague uma vez, use pra sempre
            </p>
          </div>
        </div>

       {/* Carrossel de imagens do app (padrão player) */}
<div className="mt-8">
  {/* Headline curto + instrução */}
  <div className="text-center mb-4">
    <p className="text-black font-bold text-lg">
      Veja o App 8X por dentro
    </p>
    <p className="text-black/60 text-sm">
      Arraste para o lado <span className="font-bold">→</span>
    </p>
  </div>

  <Carousel opts={{ align: "start", loop: true }} className="w-full">
    <CarouselContent className="-ml-3 snap-x snap-mandatory touch-pan-x">
      {appImages.map((image, index) => (
        <CarouselItem
          key={index}
          className="
            pl-3
            basis-[88%] sm:basis-1/2 lg:basis-1/3
            snap-center
          "
        >
          <div className="relative">
            {/* “Card” da imagem */}
            <div className="rounded-2xl border border-black/10 bg-white shadow-lg overflow-hidden">
              <div className="p-3 sm:p-4">
                <img
                  src={image}
                  alt={`Tela do app ${index + 1}`}
                  loading="lazy"
                  className="
                    w-full
                    rounded-xl
                    border border-black/10
                    bg-black/[0.02]
                    max-h-[520px] sm:max-h-[560px]
                    object-contain
                  "
                />
              </div>

              {/* legenda curta (opcional, mas ajuda percepção) */}
              <div className="px-4 pb-4">
                <p className="text-black/70 text-xs font-semibold">
                  Tela {index + 1} • App 8X
                </p>
              </div>
            </div>

            {/* “Peek” cue: gradiente na direita pra sugerir mais */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent rounded-r-2xl" />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Controles menores e mais discretos */}
    <div className="flex justify-center gap-3 mt-5">
      <CarouselPrevious className="relative inset-auto translate-y-0 bg-white border border-black/10 text-black hover:bg-accent hover:text-white hover:border-accent shadow-sm" />
      <CarouselNext className="relative inset-auto translate-y-0 bg-white border border-black/10 text-black hover:bg-accent hover:text-white hover:border-accent shadow-sm" />
    </div>
  </Carousel>
</div>


      </div>
    </section>
  );
};

export default Bonus;
