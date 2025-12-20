import { useState, useEffect } from "react";

// Importar imagens cinematográficas
import moodPain from "@/assets/vsl-mood-pain.jpg";
import moodInsight from "@/assets/vsl-mood-insight.jpg";
import moodSolution from "@/assets/vsl-mood-solution.jpg";
import moodOffer from "@/assets/vsl-mood-offer.jpg";
import moodCta from "@/assets/vsl-mood-cta.jpg";

interface Slide {
  id: number;
  startTime: number;
  endTime: number;
  caption: string;
  highlightWords?: string[];
  visualMood: "pain" | "insight" | "solution" | "offer" | "cta";
}

// Legendas sincronizadas com o áudio do roteiro (~165 segundos total)
// Baseado no script: "Você treina há meses..."
const slides: Slide[] = [
  // === BLOCO 1: DOR (0-22s) ===
  // "Você treina há meses, talvez anos. Segue planilhas, assiste vídeos, tenta fazer tudo certo."
  {
    id: 1,
    startTime: 0,
    endTime: 5,
    caption: "VOCÊ TREINA HÁ MESES...",
    visualMood: "pain",
  },
  {
    id: 2,
    startTime: 5,
    endTime: 10,
    caption: "TALVEZ ANOS.",
    visualMood: "pain",
  },
  // "Mas quando olha no espelho, a frustração bate: cadê o resultado?"
  {
    id: 3,
    startTime: 10,
    endTime: 16,
    caption: "MAS CADÊ O RESULTADO?",
    highlightWords: ["RESULTADO"],
    visualMood: "pain",
  },
  {
    id: 4,
    startTime: 16,
    endTime: 22,
    caption: "A FRUSTRAÇÃO BATE.",
    highlightWords: ["FRUSTRAÇÃO"],
    visualMood: "pain",
  },

  // === BLOCO 2: AGITAÇÃO (22-42s) ===
  // "A verdade é que 90% das pessoas treinam no modo automático."
  {
    id: 5,
    startTime: 22,
    endTime: 28,
    caption: "90% DAS PESSOAS",
    highlightWords: ["90%"],
    visualMood: "pain",
  },
  {
    id: 6,
    startTime: 28,
    endTime: 34,
    caption: "TREINAM NO MODO AUTOMÁTICO.",
    highlightWords: ["AUTOMÁTICO"],
    visualMood: "pain",
  },
  // "Fazem os exercícios, completam as séries, mas não entendem o que realmente faz o músculo crescer."
  {
    id: 7,
    startTime: 34,
    endTime: 42,
    caption: "MAS NÃO ENTENDEM O QUE FAZ O MÚSCULO CRESCER.",
    highlightWords: ["MÚSCULO CRESCER"],
    visualMood: "insight",
  },

  // === BLOCO 3: INSIGHT (42-62s) ===
  // "Eu também passei por isso. Até entender que hipertrofia não é sobre treinar mais."
  {
    id: 8,
    startTime: 42,
    endTime: 48,
    caption: "EU TAMBÉM PASSEI POR ISSO.",
    visualMood: "insight",
  },
  {
    id: 9,
    startTime: 48,
    endTime: 54,
    caption: "HIPERTROFIA NÃO É SOBRE TREINAR MAIS.",
    highlightWords: ["TREINAR MAIS"],
    visualMood: "insight",
  },
  // "É sobre treinar com estratégia. Com ciência. Com intenção."
  {
    id: 10,
    startTime: 54,
    endTime: 62,
    caption: "É SOBRE TREINAR COM ESTRATÉGIA.",
    highlightWords: ["ESTRATÉGIA"],
    visualMood: "insight",
  },

  // === BLOCO 4: SOLUÇÃO (62-90s) ===
  // "Imagina chegar na academia sabendo exatamente o que fazer."
  {
    id: 11,
    startTime: 62,
    endTime: 70,
    caption: "IMAGINA SABER EXATAMENTE O QUE FAZER.",
    highlightWords: ["EXATAMENTE"],
    visualMood: "solution",
  },
  // "Qual exercício priorizar. Quantas séries. Qual cadência. Quanto tempo descansar."
  {
    id: 12,
    startTime: 70,
    endTime: 80,
    caption: "CADA EXERCÍCIO. CADA SÉRIE. CADA DESCANSO.",
    visualMood: "solution",
  },
  // "Tudo baseado no que a ciência já provou que funciona."
  {
    id: 13,
    startTime: 80,
    endTime: 90,
    caption: "BASEADO NO QUE A CIÊNCIA PROVOU.",
    highlightWords: ["CIÊNCIA"],
    visualMood: "solution",
  },

  // === BLOCO 5: MÉTODO 8X (90-115s) ===
  // "Isso é o Método 8X."
  {
    id: 14,
    startTime: 90,
    endTime: 96,
    caption: "ISSO É O MÉTODO 8X.",
    highlightWords: ["8X"],
    visualMood: "offer",
  },
  // "Um e-book completo com 8 semanas de treino estruturado"
  {
    id: 15,
    startTime: 96,
    endTime: 104,
    caption: "8 SEMANAS DE TREINO ESTRUTURADO.",
    highlightWords: ["8 SEMANAS"],
    visualMood: "offer",
  },
  // "mais um aplicativo exclusivo que guia cada treino seu. Sem achismos. Sem improviso."
  {
    id: 16,
    startTime: 104,
    endTime: 115,
    caption: "SEM ACHISMO. SEM IMPROVISO.",
    visualMood: "offer",
  },

  // === BLOCO 6: O QUE VOCÊ VAI APRENDER (115-135s) ===
  // "O que você vai aprender: os 4 pilares da hipertrofia..."
  {
    id: 17,
    startTime: 115,
    endTime: 122,
    caption: "OS 4 PILARES DA HIPERTROFIA.",
    highlightWords: ["4 PILARES"],
    visualMood: "offer",
  },
  // "Os 7 erros que sabotam seus resultados."
  {
    id: 18,
    startTime: 122,
    endTime: 128,
    caption: "OS 7 ERROS QUE TE SABOTAM.",
    highlightWords: ["7 ERROS"],
    visualMood: "offer",
  },
  // "E um plano de 8 semanas testado e aprovado."
  {
    id: 19,
    startTime: 128,
    endTime: 135,
    caption: "UM PLANO TESTADO E APROVADO.",
    highlightWords: ["TESTADO"],
    visualMood: "offer",
  },

  // === BLOCO 7: OFERTA (135-155s) ===
  // "E o melhor: tudo isso por apenas 19 reais e 90 centavos."
  {
    id: 20,
    startTime: 135,
    endTime: 142,
    caption: "TUDO ISSO POR APENAS",
    visualMood: "offer",
  },
  {
    id: 21,
    startTime: 142,
    endTime: 148,
    caption: "R$ 19,90",
    highlightWords: ["R$ 19,90"],
    visualMood: "offer",
  },
  // "Com garantia de 7 dias."
  {
    id: 22,
    startTime: 148,
    endTime: 155,
    caption: "GARANTIA DE 7 DIAS.",
    highlightWords: ["7 DIAS"],
    visualMood: "offer",
  },

  // === BLOCO 8: CTA (155-175s) ===
  // "Você pode continuar treinando do mesmo jeito..."
  {
    id: 23,
    startTime: 155,
    endTime: 162,
    caption: "VOCÊ PODE CONTINUAR IGUAL...",
    visualMood: "cta",
  },
  // "Ou pode dar o primeiro passo agora."
  {
    id: 24,
    startTime: 162,
    endTime: 168,
    caption: "OU DAR O PRIMEIRO PASSO AGORA.",
    highlightWords: ["PRIMEIRO PASSO"],
    visualMood: "cta",
  },
  // "Clica no botão abaixo. Seu futuro eu agradece."
  {
    id: 25,
    startTime: 168,
    endTime: 175,
    caption: "CLICA NO BOTÃO ABAIXO.",
    highlightWords: ["BOTÃO"],
    visualMood: "cta",
  },
  {
    id: 26,
    startTime: 175,
    endTime: 200,
    caption: "SEU FUTURO EU VAI AGRADECER.",
    highlightWords: ["FUTURO"],
    visualMood: "cta",
  },
];

// Mapear moods para imagens
const moodImages: Record<string, string> = {
  pain: moodPain,
  insight: moodInsight,
  solution: moodSolution,
  offer: moodOffer,
  cta: moodCta,
};

interface VSLSlidesProps {
  currentTime: number;
}

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImage, setCurrentImage] = useState(moodPain);
  const [nextImage, setNextImage] = useState(moodPain);
  const [imageTransitioning, setImageTransitioning] = useState(false);

  useEffect(() => {
    const newSlide = slides.find(
      (slide) => currentTime >= slide.startTime && currentTime < slide.endTime
    );
    
    if (newSlide && newSlide.id !== activeSlideId) {
      const currentSlide = slides.find((s) => s.id === activeSlideId);
      const newMood = newSlide.visualMood;
      const currentMood = currentSlide?.visualMood;
      
      // Transição de imagem se mudou o mood
      if (currentMood !== newMood) {
        setNextImage(moodImages[newMood]);
        setImageTransitioning(true);
        setTimeout(() => {
          setCurrentImage(moodImages[newMood]);
          setImageTransitioning(false);
        }, 600);
      }
      
      // Transição de texto
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlideId(newSlide.id);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
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
        `<span class="text-accent drop-shadow-[0_0_40px_hsl(var(--accent)/0.6)]">$1</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Background Image Layer - Current */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${imageTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) saturate(0.8)',
        }}
      />
      
      {/* Background Image Layer - Next (for crossfade) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${imageTransitioning ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${nextImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) saturate(0.8)',
        }}
      />

      {/* Slow zoom/pan animation overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35) saturate(0.7)',
          animation: 'slowZoom 30s ease-in-out infinite alternate',
        }}
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Subtle accent glow for CTA */}
      {activeSlide.visualMood === "cta" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,hsl(var(--accent)/0.15),transparent_50%)] animate-pulse" />
      )}

      {/* Caption Container */}
      <div 
        className={`absolute inset-0 flex items-center justify-center p-8 sm:p-12 transition-all duration-400 ${
          isTransitioning 
            ? 'opacity-0 blur-sm transform translate-y-4' 
            : 'opacity-100 blur-0 transform translate-y-0'
        }`}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Caption */}
          <h1 
            className={`
              font-display font-black uppercase leading-[1.1] tracking-tight
              text-white
              ${activeSlide.visualMood === "cta" || activeSlide.id === 21
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" 
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              }
            `}
            style={{
              textShadow: `
                0 2px 10px rgba(0,0,0,0.9),
                0 4px 30px rgba(0,0,0,0.8),
                0 8px 60px rgba(0,0,0,0.6)
              `,
              letterSpacing: "-0.02em",
            }}
          >
            {renderCaption(activeSlide.caption, activeSlide.highlightWords)}
          </h1>

          {/* CTA arrow indicator on final slide */}
          {activeSlide.id >= 25 && (
            <div className="mt-10 sm:mt-14">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto border-2 border-accent rounded-full flex items-center justify-center animate-bounce"
                style={{
                  boxShadow: "0 0 40px hsl(var(--accent)/0.4), inset 0 0 20px hsl(var(--accent)/0.1)",
                }}
              >
                <svg 
                  className="w-7 h-7 sm:w-8 sm:h-8 text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Minimal progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-accent/80 to-accent transition-all duration-300 ease-out"
          style={{ 
            width: `${((activeSlide.id) / slides.length) * 100}%` 
          }}
        />
      </div>

      {/* CSS for slow zoom animation */}
      <style>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1) translateX(0);
          }
          100% {
            transform: scale(1.1) translateX(-2%);
          }
        }
      `}</style>
    </div>
  );
};

export default VSLSlides;
