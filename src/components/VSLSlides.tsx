import { useState, useEffect } from "react";
import heroMockup from "@/assets/hero-ebook-mockup.png";
import appMockup from "@/assets/app-8x-mockup.jpeg";
import guaranteeBadge from "@/assets/guarantee-badge-final.png";

interface Slide {
  id: number;
  startTime: number;
  endTime: number;
  headline: string;
  subtext: string;
  highlightWords?: string[];
  emoji?: string;
  image?: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    startTime: 0,
    endTime: 20,
    headline: "Você treina há meses...",
    subtext: "Cadê o resultado?",
    highlightWords: ["meses", "resultado"],
    emoji: "😔",
    bgGradient: "from-red-900/50 via-fitness-dark to-black",
  },
  {
    id: 2,
    startTime: 20,
    endTime: 38,
    headline: "90% das pessoas",
    subtext: "treinam no modo automático",
    highlightWords: ["90%", "automático"],
    emoji: "❌",
    bgGradient: "from-orange-900/50 via-fitness-dark to-black",
  },
  {
    id: 3,
    startTime: 38,
    endTime: 55,
    headline: "Hipertrofia não é sobre treinar mais",
    subtext: "É sobre treinar com ESTRATÉGIA",
    highlightWords: ["ESTRATÉGIA"],
    emoji: "💡",
    bgGradient: "from-yellow-900/50 via-fitness-dark to-black",
  },
  {
    id: 4,
    startTime: 55,
    endTime: 80,
    headline: "Imagine saber EXATAMENTE",
    subtext: "o que fazer em cada treino",
    highlightWords: ["EXATAMENTE"],
    emoji: "🎯",
    bgGradient: "from-blue-900/50 via-fitness-dark to-black",
  },
  {
    id: 5,
    startTime: 80,
    endTime: 105,
    headline: "MÉTODO 8X",
    subtext: "E-book + Aplicativo Exclusivo",
    highlightWords: ["8X"],
    image: "product",
    bgGradient: "from-accent/40 via-fitness-dark to-black",
  },
  {
    id: 6,
    startTime: 105,
    endTime: 130,
    headline: "O que você vai dominar",
    subtext: "4 Pilares • 7 Erros • 8 Semanas",
    highlightWords: ["4", "7", "8"],
    emoji: "📚",
    bgGradient: "from-purple-900/50 via-fitness-dark to-black",
  },
  {
    id: 7,
    startTime: 130,
    endTime: 150,
    headline: "Apenas R$ 19,90",
    subtext: "Garantia incondicional de 7 dias",
    highlightWords: ["R$ 19,90", "7 dias"],
    image: "guarantee",
    bgGradient: "from-green-900/50 via-fitness-dark to-black",
  },
  {
    id: 8,
    startTime: 150,
    endTime: 200,
    headline: "Seu futuro eu agradece",
    subtext: "CLICA NO BOTÃO ABAIXO",
    highlightWords: ["futuro", "BOTÃO"],
    emoji: "🚀",
    bgGradient: "from-accent/60 via-fitness-dark to-black",
  },
];

interface VSLSlidesProps {
  currentTime: number;
}

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const newSlide = slides.find(
      (slide) => currentTime >= slide.startTime && currentTime < slide.endTime
    );
    
    if (newSlide && newSlide.id !== activeSlideId) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlideId(newSlide.id);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentTime, activeSlideId]);

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];

  const highlightText = (text: string, words?: string[]) => {
    if (!words || words.length === 0) return text;
    
    let result = text;
    words.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, `<span class="text-accent font-black">$1</span>`);
    });
    return result;
  };

  const renderImage = () => {
    if (activeSlide.image === "product") {
      return (
        <div className="flex items-center justify-center gap-4 mb-4 animate-[slideIn_0.6s_ease-out]">
          <img 
            src={heroMockup} 
            alt="E-book Método 8X" 
            className="h-28 sm:h-36 object-contain drop-shadow-2xl"
          />
          <img 
            src={appMockup} 
            alt="App Método 8X" 
            className="h-24 sm:h-32 object-contain drop-shadow-2xl"
          />
        </div>
      );
    }
    if (activeSlide.image === "guarantee") {
      return (
        <div className="flex items-center justify-center mb-4 animate-[slideIn_0.6s_ease-out]">
          <img 
            src={guaranteeBadge} 
            alt="Garantia de 7 dias" 
            className="h-24 sm:h-32 object-contain drop-shadow-2xl"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.bgGradient} transition-colors duration-500`} />
      
      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsla(18,100%,58%,0.15),transparent_60%)]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-md">
        
        {/* Emoji */}
        {activeSlide.emoji && !activeSlide.image && (
          <div 
            className="text-6xl sm:text-7xl mb-4 animate-[emojiBounce_2s_ease-in-out_infinite]"
            style={{ animationDelay: '0.3s' }}
          >
            {activeSlide.emoji}
          </div>
        )}

        {/* Image */}
        {activeSlide.image && renderImage()}

        {/* Headline */}
        <h2 
          className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white leading-tight mb-3 animate-[textReveal_0.5s_ease-out]"
          dangerouslySetInnerHTML={{ 
            __html: highlightText(activeSlide.headline, activeSlide.highlightWords) 
          }}
        />

        {/* Subtext */}
        <p 
          className="text-base sm:text-lg text-white/80 font-medium animate-[textReveal_0.5s_ease-out_0.2s_both]"
          dangerouslySetInnerHTML={{ 
            __html: highlightText(activeSlide.subtext, activeSlide.highlightWords) 
          }}
        />

        {/* CTA Arrow on last slide */}
        {activeSlide.id === 8 && (
          <div className="mt-6 animate-bounce">
            <div className="flex flex-col items-center text-accent">
              <span className="text-3xl">👇</span>
            </div>
          </div>
        )}
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              slide.id === activeSlideId 
                ? 'bg-accent w-4' 
                : slide.id < activeSlideId 
                  ? 'bg-accent/50' 
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VSLSlides;
