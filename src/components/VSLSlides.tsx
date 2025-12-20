import { useState, useEffect, useRef } from "react";

// Imagens HIGH-TECH + Academia
import scienceFiber from "@/assets/vsl-science-muscle-fiber.jpg";
import scienceHologram from "@/assets/vsl-science-hologram.jpg";
import scienceProtein from "@/assets/vsl-science-protein.jpg";
import gymElite from "@/assets/vsl-gym-elite.jpg";
import frustration from "@/assets/vsl-frustration.jpg";
import appDevice from "@/assets/vsl-app-device.jpg";

interface Segment {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  image: string;
}

/*
LEGENDAS = TRANSCRIÇÃO EXATA DO ÁUDIO
Script original (~78 segundos de fala, velocidade 0.95x ≈ 82s):

"Você treina há meses, talvez anos. Segue planilhas, assiste vídeos, tenta fazer tudo certo. Mas quando olha no espelho, a frustração bate: cadê o resultado?

A verdade é que 90% das pessoas treinam no modo automático. Fazem os exercícios, completam as séries, mas não entendem o que realmente faz o músculo crescer. E por isso, ficam estagnados.

Eu também passei por isso. Até entender que hipertrofia não é sobre treinar mais. É sobre treinar com estratégia. Com ciência. Com intenção.

Imagina chegar na academia sabendo exatamente o que fazer. Qual exercício priorizar. Quantas séries. Qual cadência. Quanto tempo descansar. Tudo baseado no que a ciência já provou que funciona.

Isso é o Método 8X. Um e-book completo com 8 semanas de treino estruturado, mais um aplicativo exclusivo que guia cada treino seu. Sem achismos. Sem improviso.

O que você vai aprender: os 4 pilares da hipertrofia que ninguém te ensinou. Os 7 erros que sabotam seus resultados. A técnica que maximiza cada repetição. E um plano de 8 semanas testado e aprovado.

E o melhor: tudo isso por apenas 19 reais e 90 centavos. Menos que um suplemento que você compra todo mês. Com garantia de 7 dias. Se não gostar, devolvo seu dinheiro. Sem perguntas.

Você pode continuar treinando do mesmo jeito e esperando resultados diferentes. Ou pode dar o primeiro passo agora e finalmente ter controle sobre sua evolução.

Clica no botão abaixo. Seu futuro eu agradece."
*/

const segments: Segment[] = [
  // === ABERTURA (0-12s) ===
  {
    id: 1,
    startTime: 0,
    endTime: 4,
    text: "Você treina há meses, talvez anos.",
    image: frustration,
  },
  {
    id: 2,
    startTime: 4,
    endTime: 8,
    text: "Segue planilhas, assiste vídeos, tenta fazer tudo certo.",
    image: frustration,
  },
  {
    id: 3,
    startTime: 8,
    endTime: 12,
    text: "Mas quando olha no espelho, a frustração bate: cadê o resultado?",
    image: frustration,
  },

  // === PROBLEMA (12-24s) ===
  {
    id: 4,
    startTime: 12,
    endTime: 16,
    text: "A verdade é que 90% das pessoas treinam no modo automático.",
    image: gymElite,
  },
  {
    id: 5,
    startTime: 16,
    endTime: 20,
    text: "Fazem os exercícios, completam as séries,",
    image: gymElite,
  },
  {
    id: 6,
    startTime: 20,
    endTime: 24,
    text: "mas não entendem o que realmente faz o músculo crescer.",
    image: scienceFiber,
  },
  {
    id: 7,
    startTime: 24,
    endTime: 27,
    text: "E por isso, ficam estagnados.",
    image: frustration,
  },

  // === VIRADA (27-38s) ===
  {
    id: 8,
    startTime: 27,
    endTime: 30,
    text: "Eu também passei por isso.",
    image: gymElite,
  },
  {
    id: 9,
    startTime: 30,
    endTime: 34,
    text: "Até entender que hipertrofia não é sobre treinar mais.",
    image: scienceProtein,
  },
  {
    id: 10,
    startTime: 34,
    endTime: 38,
    text: "É sobre treinar com estratégia. Com ciência. Com intenção.",
    image: scienceHologram,
  },

  // === SOLUÇÃO (38-52s) ===
  {
    id: 11,
    startTime: 38,
    endTime: 42,
    text: "Imagina chegar na academia sabendo exatamente o que fazer.",
    image: gymElite,
  },
  {
    id: 12,
    startTime: 42,
    endTime: 45,
    text: "Qual exercício priorizar.",
    image: scienceHologram,
  },
  {
    id: 13,
    startTime: 45,
    endTime: 48,
    text: "Quantas séries. Qual cadência.",
    image: scienceFiber,
  },
  {
    id: 14,
    startTime: 48,
    endTime: 52,
    text: "Quanto tempo descansar. Tudo baseado no que a ciência já provou que funciona.",
    image: scienceProtein,
  },

  // === MÉTODO (52-66s) ===
  {
    id: 15,
    startTime: 52,
    endTime: 55,
    text: "Isso é o Método 8X.",
    image: appDevice,
  },
  {
    id: 16,
    startTime: 55,
    endTime: 59,
    text: "Um e-book completo com 8 semanas de treino estruturado,",
    image: appDevice,
  },
  {
    id: 17,
    startTime: 59,
    endTime: 63,
    text: "mais um aplicativo exclusivo que guia cada treino seu.",
    image: appDevice,
  },
  {
    id: 18,
    startTime: 63,
    endTime: 66,
    text: "Sem achismos. Sem improviso.",
    image: scienceHologram,
  },

  // === CONTEÚDO (66-82s) ===
  {
    id: 19,
    startTime: 66,
    endTime: 70,
    text: "O que você vai aprender:",
    image: scienceHologram,
  },
  {
    id: 20,
    startTime: 70,
    endTime: 74,
    text: "os 4 pilares da hipertrofia que ninguém te ensinou.",
    image: scienceFiber,
  },
  {
    id: 21,
    startTime: 74,
    endTime: 77,
    text: "Os 7 erros que sabotam seus resultados.",
    image: frustration,
  },
  {
    id: 22,
    startTime: 77,
    endTime: 80,
    text: "A técnica que maximiza cada repetição.",
    image: scienceProtein,
  },
  {
    id: 23,
    startTime: 80,
    endTime: 84,
    text: "E um plano de 8 semanas testado e aprovado.",
    image: appDevice,
  },

  // === OFERTA (84-100s) ===
  {
    id: 24,
    startTime: 84,
    endTime: 88,
    text: "E o melhor: tudo isso por apenas",
    image: appDevice,
  },
  {
    id: 25,
    startTime: 88,
    endTime: 92,
    text: "19 reais e 90 centavos.",
    image: appDevice,
  },
  {
    id: 26,
    startTime: 92,
    endTime: 96,
    text: "Menos que um suplemento que você compra todo mês.",
    image: gymElite,
  },
  {
    id: 27,
    startTime: 96,
    endTime: 100,
    text: "Com garantia de 7 dias.",
    image: appDevice,
  },
  {
    id: 28,
    startTime: 100,
    endTime: 104,
    text: "Se não gostar, devolvo seu dinheiro. Sem perguntas.",
    image: appDevice,
  },

  // === DECISÃO (104-118s) ===
  {
    id: 29,
    startTime: 104,
    endTime: 109,
    text: "Você pode continuar treinando do mesmo jeito",
    image: frustration,
  },
  {
    id: 30,
    startTime: 109,
    endTime: 113,
    text: "e esperando resultados diferentes.",
    image: frustration,
  },
  {
    id: 31,
    startTime: 113,
    endTime: 118,
    text: "Ou pode dar o primeiro passo agora e finalmente ter controle sobre sua evolução.",
    image: gymElite,
  },

  // === CTA FINAL (118s+) ===
  {
    id: 32,
    startTime: 118,
    endTime: 121,
    text: "Clica no botão abaixo.",
    image: appDevice,
  },
  {
    id: 33,
    startTime: 121,
    endTime: 999,
    text: "Seu futuro eu agradece.",
    image: gymElite,
  },
];

interface VSLSlidesProps {
  currentTime: number;
}

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [activeSegmentId, setActiveSegmentId] = useState(1);
  const [displayedImage, setDisplayedImage] = useState(segments[0].image);
  const [nextImage, setNextImage] = useState(segments[0].image);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const prevImageRef = useRef(segments[0].image);

  useEffect(() => {
    const t = currentTime;

    const newSegment = segments.find((seg) => {
      return t >= seg.startTime && t < seg.endTime;
    });

    if (newSegment && newSegment.id !== activeSegmentId) {
      // Transição de texto
      setTextVisible(false);
      setTimeout(() => {
        setActiveSegmentId(newSegment.id);
        setTextVisible(true);
      }, 80);

      // Transição de imagem (só se mudou)
      if (prevImageRef.current !== newSegment.image) {
        setNextImage(newSegment.image);
        setImageTransitioning(true);
        setTimeout(() => {
          setDisplayedImage(newSegment.image);
          prevImageRef.current = newSegment.image;
          setImageTransitioning(false);
        }, 500);
      }
    }
  }, [currentTime, activeSegmentId]);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];
  const isPrice = activeSegment.id === 25;
  const isCta = activeSegment.id >= 32;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* === BACKGROUND LAYERS === */}

      {/* Current Image */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          imageTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${displayedImage})`,
            filter: "brightness(0.55) saturate(0.95)",
          }}
        />
      </div>

      {/* Next Image (crossfade) */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          imageTransitioning ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${nextImage})`,
            filter: "brightness(0.55) saturate(0.95)",
          }}
        />
      </div>

      {/* === OVERLAYS (suaves) === */}

      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />

      {/* Scan lines effect (sutil) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--accent) / 0.06) 2px,
            hsl(var(--accent) / 0.06) 4px
          )`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.7)_100%)]" />

      {/* HUD corner accents */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/25 opacity-50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-accent/25 opacity-50" />
      <div className="absolute bottom-20 left-4 w-16 h-16 border-l-2 border-b-2 border-accent/25 opacity-50" />
      <div className="absolute bottom-20 right-4 w-16 h-16 border-r-2 border-b-2 border-accent/25 opacity-50" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--accent) / 0.10) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--accent) / 0.10) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* CTA glow effect */}
      {isCta && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,hsl(var(--accent)/0.12),transparent_55%)] animate-pulse" />
      )}

      {/* === LEGENDA - POSIÇÃO FIXA NA PARTE INFERIOR === */}
      <div className="absolute bottom-4 left-0 right-0 px-4 sm:px-8 md:px-12 z-20">
        <div
          className={`text-center transition-opacity duration-100 ease-out ${
            textVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-block max-w-3xl">
            <div className="inline-block rounded bg-black/60 px-4 py-2">
              <p
                className={`font-sans font-semibold leading-snug text-white ${
                  isPrice
                    ? "text-2xl sm:text-3xl md:text-4xl text-accent"
                    : "text-base sm:text-lg md:text-xl"
                }`}
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  letterSpacing: "0.01em",
                }}
              >
                {activeSegment.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === CTA INDICATOR === */}
      {isCta && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
          <div
            className="w-12 h-12 border-2 border-accent/60 rounded-full flex items-center justify-center animate-bounce"
            style={{
              boxShadow:
                "0 0 30px hsl(var(--accent)/0.25), inset 0 0 15px hsl(var(--accent)/0.10)",
            }}
          >
            <svg
              className="w-6 h-6 text-accent"
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

      {/* === PROGRESS INDICATOR === */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-30">
        <div
          className="h-full bg-gradient-to-r from-accent/40 to-accent transition-all duration-200 ease-out"
          style={{ width: `${(activeSegment.id / segments.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VSLSlides;
