import { useState, useEffect } from "react";

// Importar todas as imagens cinematográficas
import moodPain1 from "@/assets/vsl-mood-pain.jpg";
import moodPain2 from "@/assets/vsl-pain-2.jpg";
import moodPain3 from "@/assets/vsl-pain-3.jpg";
import moodInsight1 from "@/assets/vsl-mood-insight.jpg";
import moodInsight2 from "@/assets/vsl-insight-2.jpg";
import moodSolution1 from "@/assets/vsl-mood-solution.jpg";
import moodSolution2 from "@/assets/vsl-solution-2.jpg";
import moodSolution3 from "@/assets/vsl-solution-3.jpg";
import moodOffer1 from "@/assets/vsl-mood-offer.jpg";
import moodOffer2 from "@/assets/vsl-offer-2.jpg";
import moodCta from "@/assets/vsl-mood-cta.jpg";

interface Slide {
  id: number;
  startTime: number;
  endTime: number;
  caption: string;
  highlightWords?: string[];
  image: string;
}

/*
ROTEIRO VSL COMPLETO (velocidade 0.95 = ~165 segundos):

[0-15s] Parágrafo 1:
"Você treina há meses, talvez anos. Segue planilhas, assiste vídeos, tenta fazer tudo certo. 
Mas quando olha no espelho, a frustração bate: cadê o resultado?"

[15-35s] Parágrafo 2:
"A verdade é que 90% das pessoas treinam no modo automático. Fazem os exercícios, completam as séries, 
mas não entendem o que realmente faz o músculo crescer. E por isso, ficam estagnados."

[35-52s] Parágrafo 3:
"Eu também passei por isso. Até entender que hipertrofia não é sobre treinar mais. 
É sobre treinar com estratégia. Com ciência. Com intenção."

[52-75s] Parágrafo 4:
"Imagina chegar na academia sabendo exatamente o que fazer. Qual exercício priorizar. 
Quantas séries. Qual cadência. Quanto tempo descansar. Tudo baseado no que a ciência já provou que funciona."

[75-95s] Parágrafo 5:
"Isso é o Método 8X. Um e-book completo com 8 semanas de treino estruturado, 
mais um aplicativo exclusivo que guia cada treino seu. Sem achismos. Sem improviso."

[95-120s] Parágrafo 6:
"O que você vai aprender: os 4 pilares da hipertrofia que ninguém te ensinou. 
Os 7 erros que sabotam seus resultados. A técnica que maximiza cada repetição. 
E um plano de 8 semanas testado e aprovado."

[120-145s] Parágrafo 7:
"E o melhor: tudo isso por apenas 19 reais e 90 centavos. Menos que um suplemento que você compra todo mês. 
Com garantia de 7 dias. Se não gostar, devolvo seu dinheiro. Sem perguntas."

[145-160s] Parágrafo 8:
"Você pode continuar treinando do mesmo jeito e esperando resultados diferentes. 
Ou pode dar o primeiro passo agora e finalmente ter controle sobre sua evolução."

[160-170s] Parágrafo 9:
"Clica no botão abaixo. Seu futuro eu agradece."
*/

const slides: Slide[] = [
  // === PARÁGRAFO 1: DOR INICIAL (0-15s) ===
  {
    id: 1,
    startTime: 0,
    endTime: 4,
    caption: "VOCÊ TREINA HÁ MESES, TALVEZ ANOS.",
    image: moodPain1,
  },
  {
    id: 2,
    startTime: 4,
    endTime: 11,
    caption: "SEGUE PLANILHAS, ASSISTE VÍDEOS, TENTA FAZER TUDO CERTO.",
    image: moodPain2,
  },
  {
    id: 3,
    startTime: 11,
    endTime: 15,
    caption: "MAS NO ESPELHO... CADÊ O RESULTADO?",
    highlightWords: ["RESULTADO"],
    image: moodPain3,
  },

  // === PARÁGRAFO 2: AGITAÇÃO (15-35s) ===
  {
    id: 4,
    startTime: 15,
    endTime: 22,
    caption: "A VERDADE É QUE 90% TREINAM NO MODO AUTOMÁTICO.",
    highlightWords: ["90%", "AUTOMÁTICO"],
    image: moodPain2,
  },
  {
    id: 5,
    startTime: 22,
    endTime: 30,
    caption: "FAZEM OS EXERCÍCIOS, COMPLETAM AS SÉRIES...",
    image: moodPain1,
  },
  {
    id: 6,
    startTime: 30,
    endTime: 34,
    caption: "MAS NÃO ENTENDEM O QUE FAZ O MÚSCULO CRESCER.",
    highlightWords: ["MÚSCULO", "CRESCER"],
    image: moodInsight1,
  },
  {
    id: 7,
    startTime: 34,
    endTime: 35,
    caption: "E POR ISSO, FICAM ESTAGNADOS.",
    highlightWords: ["ESTAGNADOS"],
    image: moodPain3,
  },

  // === PARÁGRAFO 3: INSIGHT (35-52s) ===
  {
    id: 8,
    startTime: 35,
    endTime: 39,
    caption: "EU TAMBÉM PASSEI POR ISSO.",
    image: moodInsight1,
  },
  {
    id: 9,
    startTime: 39,
    endTime: 45,
    caption: "ATÉ ENTENDER QUE HIPERTROFIA NÃO É SOBRE TREINAR MAIS.",
    highlightWords: ["HIPERTROFIA", "TREINAR MAIS"],
    image: moodInsight2,
  },
  {
    id: 10,
    startTime: 45,
    endTime: 52,
    caption: "É SOBRE TREINAR COM ESTRATÉGIA. COM CIÊNCIA. COM INTENÇÃO.",
    highlightWords: ["ESTRATÉGIA", "CIÊNCIA", "INTENÇÃO"],
    image: moodInsight2,
  },

  // === PARÁGRAFO 4: SOLUÇÃO (52-75s) ===
  {
    id: 11,
    startTime: 52,
    endTime: 60,
    caption: "IMAGINA CHEGAR NA ACADEMIA SABENDO EXATAMENTE O QUE FAZER.",
    highlightWords: ["EXATAMENTE"],
    image: moodSolution1,
  },
  {
    id: 12,
    startTime: 60,
    endTime: 68,
    caption: "QUAL EXERCÍCIO PRIORIZAR. QUANTAS SÉRIES. QUAL CADÊNCIA.",
    image: moodSolution2,
  },
  {
    id: 13,
    startTime: 68,
    endTime: 75,
    caption: "QUANTO DESCANSAR... TUDO BASEADO NO QUE A CIÊNCIA PROVOU.",
    highlightWords: ["CIÊNCIA"],
    image: moodSolution3,
  },

  // === PARÁGRAFO 5: MÉTODO 8X (75-95s) ===
  {
    id: 14,
    startTime: 75,
    endTime: 80,
    caption: "ISSO É O MÉTODO 8X.",
    highlightWords: ["8X"],
    image: moodOffer1,
  },
  {
    id: 15,
    startTime: 80,
    endTime: 88,
    caption: "UM E-BOOK COMPLETO COM 8 SEMANAS DE TREINO ESTRUTURADO.",
    highlightWords: ["8 SEMANAS"],
    image: moodOffer2,
  },
  {
    id: 16,
    startTime: 88,
    endTime: 95,
    caption: "E UM APLICATIVO EXCLUSIVO QUE GUIA CADA TREINO. SEM ACHISMO. SEM IMPROVISO.",
    highlightWords: ["SEM ACHISMO", "SEM IMPROVISO"],
    image: moodOffer1,
  },

  // === PARÁGRAFO 6: CONTEÚDO (95-120s) ===
  {
    id: 17,
    startTime: 95,
    endTime: 104,
    caption: "O QUE VOCÊ VAI APRENDER: OS 4 PILARES DA HIPERTROFIA QUE NINGUÉM TE ENSINOU.",
    highlightWords: ["4 PILARES"],
    image: moodSolution2,
  },
  {
    id: 18,
    startTime: 104,
    endTime: 111,
    caption: "OS 7 ERROS QUE SABOTAM SEUS RESULTADOS.",
    highlightWords: ["7 ERROS", "RESULTADOS"],
    image: moodSolution3,
  },
  {
    id: 19,
    startTime: 111,
    endTime: 120,
    caption: "A TÉCNICA QUE MAXIMIZA CADA REPETIÇÃO. E UM PLANO DE 8 SEMANAS TESTADO E APROVADO.",
    highlightWords: ["MAXIMIZA", "TESTADO"],
    image: moodOffer2,
  },

  // === PARÁGRAFO 7: OFERTA (120-145s) ===
  {
    id: 20,
    startTime: 120,
    endTime: 128,
    caption: "E O MELHOR: TUDO ISSO POR APENAS 19 REAIS E 90 CENTAVOS.",
    highlightWords: ["APENAS"],
    image: moodOffer1,
  },
  {
    id: 21,
    startTime: 128,
    endTime: 132,
    caption: "R$ 19,90",
    highlightWords: ["R$ 19,90"],
    image: moodOffer1,
  },
  {
    id: 22,
    startTime: 132,
    endTime: 138,
    caption: "MENOS QUE UM SUPLEMENTO QUE VOCÊ COMPRA TODO MÊS.",
    image: moodOffer2,
  },
  {
    id: 23,
    startTime: 138,
    endTime: 145,
    caption: "GARANTIA DE 7 DIAS. SE NÃO GOSTAR, DEVOLVO SEU DINHEIRO. SEM PERGUNTAS.",
    highlightWords: ["7 DIAS", "DEVOLVO"],
    image: moodOffer2,
  },

  // === PARÁGRAFO 8: DECISÃO (145-160s) ===
  {
    id: 24,
    startTime: 145,
    endTime: 153,
    caption: "VOCÊ PODE CONTINUAR TREINANDO DO MESMO JEITO...",
    highlightWords: ["CONTINUAR"],
    image: moodPain2,
  },
  {
    id: 25,
    startTime: 153,
    endTime: 160,
    caption: "OU DAR O PRIMEIRO PASSO AGORA E TER CONTROLE DA SUA EVOLUÇÃO.",
    highlightWords: ["PRIMEIRO PASSO", "CONTROLE"],
    image: moodCta,
  },

  // === PARÁGRAFO 9: CTA FINAL (160s+) ===
  {
    id: 26,
    startTime: 160,
    endTime: 164,
    caption: "CLICA NO BOTÃO ABAIXO.",
    highlightWords: ["BOTÃO"],
    image: moodCta,
  },
  {
    id: 27,
    startTime: 164,
    endTime: 999,
    caption: "SEU FUTURO EU AGRADECE.",
    highlightWords: ["FUTURO"],
    image: moodCta,
  },
];

interface VSLSlidesProps {
  currentTime: number;
}

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [activeSlideId, setActiveSlideId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(slides[0].image);
  const [nextImage, setNextImage] = useState(slides[0].image);
  const [imageTransitioning, setImageTransitioning] = useState(false);

  useEffect(() => {
    const newSlide = slides.find(
      (slide) => currentTime >= slide.startTime && currentTime < slide.endTime
    );
    
    if (newSlide && newSlide.id !== activeSlideId) {
      const currentSlide = slides.find((s) => s.id === activeSlideId);
      
      // Transição de imagem se mudou a imagem
      if (currentSlide?.image !== newSlide.image) {
        setNextImage(newSlide.image);
        setImageTransitioning(true);
        setTimeout(() => {
          setDisplayedImage(newSlide.image);
          setImageTransitioning(false);
        }, 400);
      }
      
      // Transição de texto - mais rápida para melhor sincronização
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlideId(newSlide.id);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 30);
      }, 80);
    }
  }, [currentTime, activeSlideId]);

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];
  const isCtaSlide = activeSlide.id >= 25;
  const isPriceSlide = activeSlide.id === 21;

  const renderCaption = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) {
      return <span>{text}</span>;
    }

    let result = text;
    highlights.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="text-accent drop-shadow-[0_0_40px_hsl(var(--accent)/0.7)]">$1</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Background Image Layer - Current */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${imageTransitioning ? 'opacity-0 scale-102' : 'opacity-100 scale-100'}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${displayedImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35) saturate(0.7)',
          }}
        />
      </div>
      
      {/* Background Image Layer - Next (for crossfade) */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${imageTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-102'}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${nextImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35) saturate(0.7)',
          }}
        />
      </div>

      {/* Slow Ken Burns effect layer */}
      <div 
        className="absolute inset-0 animate-kenBurns"
        style={{
          backgroundImage: `url(${displayedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(0.6)',
          opacity: 0.6,
        }}
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/80" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Accent glow for CTA slides */}
      {isCtaSlide && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,hsl(var(--accent)/0.2),transparent_50%)] animate-pulse" />
      )}

      {/* Caption Container */}
      <div 
        className={`absolute inset-0 flex items-center justify-center p-6 sm:p-10 md:p-16 transition-all duration-200 ease-out ${
          isTransitioning 
            ? 'opacity-0 blur-sm transform translate-y-2' 
            : 'opacity-100 blur-0 transform translate-y-0'
        }`}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Caption */}
          <h1 
            className={`
              font-display font-black uppercase leading-[1.05] tracking-tight
              text-white
              ${isPriceSlide 
                ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" 
                : isCtaSlide
                  ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" 
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              }
            `}
            style={{
              textShadow: `
                0 2px 8px rgba(0,0,0,0.95),
                0 4px 25px rgba(0,0,0,0.9),
                0 8px 50px rgba(0,0,0,0.7)
              `,
              letterSpacing: "-0.02em",
            }}
          >
            {renderCaption(activeSlide.caption, activeSlide.highlightWords)}
          </h1>

          {/* CTA arrow indicator on final slides */}
          {activeSlide.id >= 26 && (
            <div className="mt-10 sm:mt-14">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto border-2 border-accent rounded-full flex items-center justify-center animate-bounce"
                style={{
                  boxShadow: "0 0 50px hsl(var(--accent)/0.5), inset 0 0 25px hsl(var(--accent)/0.15)",
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
          className="h-full bg-gradient-to-r from-accent/70 to-accent transition-all duration-150 ease-out"
          style={{ 
            width: `${((activeSlide.id) / slides.length) * 100}%` 
          }}
        />
      </div>

      {/* CSS for Ken Burns animation */}
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.08) translate(-1%, -1%);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }
        .animate-kenBurns {
          animation: kenBurns 25s ease-in-out infinite;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default VSLSlides;
