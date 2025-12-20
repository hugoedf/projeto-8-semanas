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
  text: string; // Copy de impacto (fiel ao áudio mas otimizado)
  image: string;
  mood: "pain" | "insight" | "solution" | "offer" | "cta";
}

/*
ROTEIRO VSL COMPLETO (~165 segundos):
Dividido em segmentos curtos para legenda estilo Netflix.
Cada segmento = 1-2 linhas, sincronizado com o áudio.
*/

const segments: Segment[] = [
  // === DOR (0-15s) ===
  { id: 1, startTime: 0, endTime: 3.5, text: "Você treina há meses, talvez anos.", image: frustration, mood: "pain" },
  { id: 2, startTime: 3.5, endTime: 7, text: "Segue planilhas, assiste vídeos,", image: frustration, mood: "pain" },
  { id: 3, startTime: 7, endTime: 10, text: "tenta fazer tudo certo.", image: frustration, mood: "pain" },
  { id: 4, startTime: 10, endTime: 13, text: "Mas quando olha no espelho,", image: frustration, mood: "pain" },
  { id: 5, startTime: 13, endTime: 16, text: "a frustração bate: cadê o resultado?", image: frustration, mood: "pain" },

  // === AGITAÇÃO (16-35s) ===
  { id: 6, startTime: 16, endTime: 20, text: "A verdade é que 90% das pessoas", image: gymElite, mood: "pain" },
  { id: 7, startTime: 20, endTime: 24, text: "treinam no modo automático.", image: gymElite, mood: "pain" },
  { id: 8, startTime: 24, endTime: 28, text: "Fazem os exercícios, completam as séries,", image: gymElite, mood: "pain" },
  { id: 9, startTime: 28, endTime: 32, text: "mas não entendem o que realmente", image: scienceFiber, mood: "insight" },
  { id: 10, startTime: 32, endTime: 36, text: "faz o músculo crescer.", image: scienceFiber, mood: "insight" },
  { id: 11, startTime: 36, endTime: 38, text: "E por isso, ficam estagnados.", image: frustration, mood: "pain" },

  // === VIRADA (38-52s) ===
  { id: 12, startTime: 38, endTime: 41, text: "Eu também passei por isso.", image: gymElite, mood: "insight" },
  { id: 13, startTime: 41, endTime: 45, text: "Até entender que hipertrofia", image: scienceProtein, mood: "insight" },
  { id: 14, startTime: 45, endTime: 48, text: "não é sobre treinar mais.", image: scienceProtein, mood: "insight" },
  { id: 15, startTime: 48, endTime: 52, text: "É sobre treinar com estratégia.", image: scienceHologram, mood: "insight" },
  { id: 16, startTime: 52, endTime: 55, text: "Com ciência. Com intenção.", image: scienceHologram, mood: "insight" },

  // === SOLUÇÃO (55-75s) ===
  { id: 17, startTime: 55, endTime: 59, text: "Imagina chegar na academia", image: gymElite, mood: "solution" },
  { id: 18, startTime: 59, endTime: 63, text: "sabendo exatamente o que fazer.", image: scienceHologram, mood: "solution" },
  { id: 19, startTime: 63, endTime: 67, text: "Qual exercício priorizar.", image: scienceHologram, mood: "solution" },
  { id: 20, startTime: 67, endTime: 71, text: "Quantas séries. Qual cadência.", image: scienceFiber, mood: "solution" },
  { id: 21, startTime: 71, endTime: 75, text: "Quanto tempo descansar.", image: scienceFiber, mood: "solution" },
  { id: 22, startTime: 75, endTime: 79, text: "Tudo baseado no que a ciência", image: scienceProtein, mood: "solution" },
  { id: 23, startTime: 79, endTime: 82, text: "já provou que funciona.", image: scienceProtein, mood: "solution" },

  // === MÉTODO 8X (82-100s) ===
  { id: 24, startTime: 82, endTime: 85, text: "Isso é o Método 8X.", image: appDevice, mood: "offer" },
  { id: 25, startTime: 85, endTime: 89, text: "Um e-book completo", image: appDevice, mood: "offer" },
  { id: 26, startTime: 89, endTime: 93, text: "com 8 semanas de treino estruturado,", image: appDevice, mood: "offer" },
  { id: 27, startTime: 93, endTime: 97, text: "mais um aplicativo exclusivo", image: appDevice, mood: "offer" },
  { id: 28, startTime: 97, endTime: 101, text: "que guia cada treino seu.", image: appDevice, mood: "offer" },
  { id: 29, startTime: 101, endTime: 104, text: "Sem achismos. Sem improviso.", image: scienceHologram, mood: "offer" },

  // === CONTEÚDO (104-125s) ===
  { id: 30, startTime: 104, endTime: 108, text: "O que você vai aprender:", image: scienceHologram, mood: "solution" },
  { id: 31, startTime: 108, endTime: 112, text: "os 4 pilares da hipertrofia", image: scienceFiber, mood: "solution" },
  { id: 32, startTime: 112, endTime: 115, text: "que ninguém te ensinou.", image: scienceFiber, mood: "solution" },
  { id: 33, startTime: 115, endTime: 119, text: "Os 7 erros que sabotam seus resultados.", image: frustration, mood: "pain" },
  { id: 34, startTime: 119, endTime: 123, text: "A técnica que maximiza cada repetição.", image: scienceProtein, mood: "solution" },
  { id: 35, startTime: 123, endTime: 127, text: "E um plano de 8 semanas", image: appDevice, mood: "offer" },
  { id: 36, startTime: 127, endTime: 130, text: "testado e aprovado.", image: appDevice, mood: "offer" },

  // === OFERTA (130-150s) ===
  { id: 37, startTime: 130, endTime: 134, text: "E o melhor:", image: appDevice, mood: "offer" },
  { id: 38, startTime: 134, endTime: 138, text: "tudo isso por apenas", image: appDevice, mood: "offer" },
  { id: 39, startTime: 138, endTime: 142, text: "19 reais e 90 centavos.", image: appDevice, mood: "cta" },
  { id: 40, startTime: 142, endTime: 146, text: "Menos que um suplemento", image: gymElite, mood: "offer" },
  { id: 41, startTime: 146, endTime: 149, text: "que você compra todo mês.", image: gymElite, mood: "offer" },
  { id: 42, startTime: 149, endTime: 153, text: "Com garantia de 7 dias.", image: appDevice, mood: "cta" },
  { id: 43, startTime: 153, endTime: 157, text: "Se não gostar, devolvo seu dinheiro.", image: appDevice, mood: "cta" },
  { id: 44, startTime: 157, endTime: 160, text: "Sem perguntas.", image: appDevice, mood: "cta" },

  // === DECISÃO (160-175s) ===
  { id: 45, startTime: 160, endTime: 164, text: "Você pode continuar treinando", image: frustration, mood: "pain" },
  { id: 46, startTime: 164, endTime: 168, text: "do mesmo jeito", image: frustration, mood: "pain" },
  { id: 47, startTime: 168, endTime: 172, text: "e esperando resultados diferentes.", image: frustration, mood: "pain" },
  { id: 48, startTime: 172, endTime: 176, text: "Ou pode dar o primeiro passo agora", image: gymElite, mood: "cta" },
  { id: 49, startTime: 176, endTime: 180, text: "e finalmente ter controle", image: scienceHologram, mood: "cta" },
  { id: 50, startTime: 180, endTime: 184, text: "sobre sua evolução.", image: scienceHologram, mood: "cta" },

  // === CTA FINAL (184s+) ===
  { id: 51, startTime: 184, endTime: 188, text: "Clica no botão abaixo.", image: appDevice, mood: "cta" },
  { id: 52, startTime: 188, endTime: 999, text: "Seu futuro eu agradece.", image: gymElite, mood: "cta" },
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
    // Permite ajuste fino sem UI: adicione ?captionOffset=0.6 na URL (segundos)
    const captionOffset = Number(
      new URLSearchParams(window.location.search).get("captionOffset") ?? "0"
    );
    const t = Math.max(0, currentTime + (Number.isFinite(captionOffset) ? captionOffset : 0));

    const newSegment = segments.find((seg) => t >= seg.startTime && t < seg.endTime);

    if (newSegment && newSegment.id !== activeSegmentId) {
      // Transição de texto
      setTextVisible(false);
      setTimeout(() => {
        setActiveSegmentId(newSegment.id);
        setTextVisible(true);
      }, 100);

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
  const isCta = activeSegment.mood === "cta";
  const isPrice = activeSegment.id === 39;

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
            // Mais claro para combinar com a página e permitir ver o visual
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

      {/* === HIGH-TECH OVERLAYS (suaves) === */}

      {/* Gradient base (menos dark) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />

      {/* Scan lines effect (bem sutil) */}
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

      {/* Vignette (bem leve) */}
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

      {/* === SUBTITLE CONTAINER (Netflix style) === */}
      <div className="absolute bottom-16 left-0 right-0 px-4 sm:px-8 md:px-16 z-20">
        <div
          className={`text-center transition-all duration-150 ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {/* Subtitle text */}
          <div className="inline-block max-w-4xl">
            <div className="inline-block rounded-md bg-black/35 backdrop-blur-[2px] px-4 py-2">
              <p
                className={`font-sans font-semibold leading-relaxed text-white ${
                  isPrice
                    ? "text-3xl sm:text-4xl md:text-5xl text-accent"
                    : "text-lg sm:text-xl md:text-2xl"
                }`}
                style={{
                  textShadow: `
                    0 0 10px rgba(0,0,0,0.85),
                    0 2px 4px rgba(0,0,0,0.85),
                    0 4px 10px rgba(0,0,0,0.55)
                  `,
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
      {activeSegment.id >= 51 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
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
