import { useState, useEffect } from "react";

interface Slide {
  id: number;
  startTime: number;
  endTime: number;
  caption: string;
  highlightWords?: string[];
  visualMood: "pain" | "insight" | "solution" | "offer" | "cta";
}

// Legendas sincronizadas com o áudio - frases curtas e impactantes
const slides: Slide[] = [
  {
    id: 1,
    startTime: 0,
    endTime: 8,
    caption: "VOCÊ ESTÁ TREINANDO...",
    visualMood: "pain",
  },
  {
    id: 2,
    startTime: 8,
    endTime: 14,
    caption: "MAS NÃO ESTÁ EVOLUINDO.",
    highlightWords: ["EVOLUINDO"],
    visualMood: "pain",
  },
  {
    id: 3,
    startTime: 14,
    endTime: 22,
    caption: "CADÊ O RESULTADO?",
    highlightWords: ["RESULTADO"],
    visualMood: "pain",
  },
  {
    id: 4,
    startTime: 22,
    endTime: 30,
    caption: "90% DAS PESSOAS TREINAM NO ESCURO.",
    highlightWords: ["90%", "ESCURO"],
    visualMood: "pain",
  },
  {
    id: 5,
    startTime: 30,
    endTime: 38,
    caption: "FAZEM OS EXERCÍCIOS. COMPLETAM AS SÉRIES.",
    visualMood: "pain",
  },
  {
    id: 6,
    startTime: 38,
    endTime: 46,
    caption: "MAS NÃO ENTENDEM O QUE FAZ O MÚSCULO CRESCER.",
    highlightWords: ["MÚSCULO CRESCER"],
    visualMood: "insight",
  },
  {
    id: 7,
    startTime: 46,
    endTime: 54,
    caption: "NÃO É FALTA DE ESFORÇO.",
    highlightWords: ["ESFORÇO"],
    visualMood: "insight",
  },
  {
    id: 8,
    startTime: 54,
    endTime: 62,
    caption: "É FALTA DE MÉTODO.",
    highlightWords: ["MÉTODO"],
    visualMood: "insight",
  },
  {
    id: 9,
    startTime: 62,
    endTime: 72,
    caption: "HIPERTROFIA NÃO É SOBRE TREINAR MAIS.",
    highlightWords: ["TREINAR MAIS"],
    visualMood: "insight",
  },
  {
    id: 10,
    startTime: 72,
    endTime: 82,
    caption: "É SOBRE TREINAR COM ESTRATÉGIA.",
    highlightWords: ["ESTRATÉGIA"],
    visualMood: "solution",
  },
  {
    id: 11,
    startTime: 82,
    endTime: 92,
    caption: "IMAGINA SABER EXATAMENTE O QUE FAZER.",
    highlightWords: ["EXATAMENTE"],
    visualMood: "solution",
  },
  {
    id: 12,
    startTime: 92,
    endTime: 102,
    caption: "QUAL EXERCÍCIO. QUANTAS SÉRIES. QUANTO DESCANSAR.",
    visualMood: "solution",
  },
  {
    id: 13,
    startTime: 102,
    endTime: 112,
    caption: "TUDO BASEADO NO QUE A CIÊNCIA PROVOU.",
    highlightWords: ["CIÊNCIA"],
    visualMood: "solution",
  },
  {
    id: 14,
    startTime: 112,
    endTime: 120,
    caption: "MÉTODO 8X",
    highlightWords: ["8X"],
    visualMood: "offer",
  },
  {
    id: 15,
    startTime: 120,
    endTime: 128,
    caption: "8 SEMANAS. UM MÉTODO.",
    highlightWords: ["8 SEMANAS"],
    visualMood: "offer",
  },
  {
    id: 16,
    startTime: 128,
    endTime: 136,
    caption: "SEM ACHISMO. SEM CONFUSÃO.",
    visualMood: "offer",
  },
  {
    id: 17,
    startTime: 136,
    endTime: 144,
    caption: "VOCÊ SABE O QUE FAZER.",
    visualMood: "offer",
  },
  {
    id: 18,
    startTime: 144,
    endTime: 152,
    caption: "E EXECUTA DO JEITO CERTO.",
    highlightWords: ["JEITO CERTO"],
    visualMood: "offer",
  },
  {
    id: 19,
    startTime: 152,
    endTime: 160,
    caption: "APENAS R$ 19,90",
    highlightWords: ["R$ 19,90"],
    visualMood: "offer",
  },
  {
    id: 20,
    startTime: 160,
    endTime: 168,
    caption: "GARANTIA DE 7 DIAS.",
    highlightWords: ["7 DIAS"],
    visualMood: "offer",
  },
  {
    id: 21,
    startTime: 168,
    endTime: 180,
    caption: "COMECE HOJE.",
    highlightWords: ["HOJE"],
    visualMood: "cta",
  },
  {
    id: 22,
    startTime: 180,
    endTime: 200,
    caption: "SEU FUTURO EU VAI AGRADECER.",
    highlightWords: ["FUTURO"],
    visualMood: "cta",
  },
];

// Gradientes cinematográficos por mood
const moodGradients: Record<string, string> = {
  pain: "from-black via-zinc-900 to-black",
  insight: "from-black via-zinc-800 to-black",
  solution: "from-black via-zinc-900/90 to-black",
  offer: "from-black via-accent/10 to-black",
  cta: "from-black via-accent/20 to-black",
};

// Overlay styles por mood
const moodOverlays: Record<string, string> = {
  pain: "bg-gradient-to-t from-black/80 via-transparent to-black/60",
  insight: "bg-gradient-to-t from-black/70 via-transparent to-black/50",
  solution: "bg-gradient-to-br from-black/60 via-transparent to-black/40",
  offer: "bg-gradient-to-t from-black/50 via-transparent to-black/30",
  cta: "bg-gradient-to-t from-black/40 via-transparent to-black/20",
};

interface VSLSlidesProps {
  currentTime: number;
}

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevMood, setPrevMood] = useState<string>("pain");

  useEffect(() => {
    const newSlide = slides.find(
      (slide) => currentTime >= slide.startTime && currentTime < slide.endTime
    );
    
    if (newSlide && newSlide.id !== activeSlideId) {
      const currentSlide = slides.find((s) => s.id === activeSlideId);
      if (currentSlide) {
        setPrevMood(currentSlide.visualMood);
      }
      
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlideId(newSlide.id);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    }
  }, [currentTime, activeSlideId]);

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];

  const renderCaption = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) {
      return <span>{text}</span>;
    }

    let result = text;
    highlights.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="text-accent drop-shadow-[0_0_30px_hsl(var(--accent)/0.5)]">$1</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cinematic Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${moodGradients[activeSlide.visualMood]} transition-all duration-700`}
      />
      
      {/* Animated grain/noise overlay for cinematic feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Dynamic mood overlay */}
      <div className={`absolute inset-0 ${moodOverlays[activeSlide.visualMood]} transition-all duration-700`} />
      
      {/* Subtle animated glow for premium feel */}
      {activeSlide.visualMood === "cta" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,hsl(var(--accent)/0.15),transparent_50%)] animate-pulse" />
      )}

      {/* Caption Container */}
      <div 
        className={`absolute inset-0 flex items-center justify-center p-6 sm:p-10 transition-all duration-500 ${
          isTransitioning 
            ? 'opacity-0 blur-sm transform scale-95' 
            : 'opacity-100 blur-0 transform scale-100'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Caption */}
          <h1 
            className={`
              font-display font-black uppercase tracking-wide leading-tight
              text-white drop-shadow-2xl
              ${activeSlide.visualMood === "cta" 
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" 
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              }
            `}
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)",
              letterSpacing: activeSlide.visualMood === "cta" ? "0.05em" : "0.02em",
            }}
          >
            {renderCaption(activeSlide.caption, activeSlide.highlightWords)}
          </h1>

          {/* CTA indicator on final slides */}
          {activeSlide.visualMood === "cta" && activeSlide.id >= 21 && (
            <div className="mt-8 sm:mt-12 animate-bounce">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 mx-auto border-2 border-accent/60 rounded-full flex items-center justify-center"
                style={{
                  boxShadow: "0 0 30px hsl(var(--accent)/0.3)",
                }}
              >
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator - subtle bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div 
          className="h-full bg-accent/60 transition-all duration-300"
          style={{ 
            width: `${((activeSlide.id) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default VSLSlides;
