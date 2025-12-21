import { useState, useEffect, useRef } from "react";

// BLOCO 1 — FRUSTRAÇÃO
import block1Frustration from "@/assets/vsl-block1-frustration.jpg";
import block1Stagnation from "@/assets/vsl-block1-stagnation.jpg";

// BLOCO 2 — CONFLITO  
import block2Autopilot from "@/assets/vsl-block2-autopilot.jpg";
import block2Confusion from "@/assets/vsl-block2-confusion.jpg";

// BLOCO 3 — VIRADA / CONSCIÊNCIA
import block3Focus from "@/assets/vsl-block3-focus.jpg";
import block3Awareness from "@/assets/vsl-block3-awareness.jpg";

// BLOCO 4 — MÉTODO / CONTROLE
import block4Technique from "@/assets/vsl-block4-technique.jpg";
import block4Control from "@/assets/vsl-block4-control.jpg";

// BLOCO 5 — RESULTADO
import block5Confidence from "@/assets/vsl-block5-confidence.jpg";
import block5Result from "@/assets/vsl-block5-result.jpg";

// BLOCO 6 — DECISÃO / CTA
import block6Cta from "@/assets/vsl-block6-cta.jpg";
import block6Decision from "@/assets/vsl-block6-decision.jpg";

interface Segment {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  image: string;
  block: number;
}

/*
ESTRUTURA DA NARRATIVA VISUAL — 6 BLOCOS
Sincronizável com áudio externo (~170 segundos total)

BLOCO 1 (0-25s) — FRUSTRAÇÃO
BLOCO 2 (25-45s) — CONFLITO  
BLOCO 3 (45-65s) — VIRADA
BLOCO 4 (65-100s) — MÉTODO
BLOCO 5 (100-145s) — RESULTADO/OFERTA
BLOCO 6 (145s+) — CTA FINAL
*/

const segments: Segment[] = [
  // === BLOCO 1 — FRUSTRAÇÃO (0-25s) ===
  {
    id: 1,
    startTime: 0,
    endTime: 8,
    text: "",
    image: block1Frustration,
    block: 1,
  },
  {
    id: 2,
    startTime: 8,
    endTime: 16,
    text: "",
    image: block1Stagnation,
    block: 1,
  },
  {
    id: 3,
    startTime: 16,
    endTime: 25,
    text: "",
    image: block1Frustration,
    block: 1,
  },

  // === BLOCO 2 — CONFLITO (25-45s) ===
  {
    id: 4,
    startTime: 25,
    endTime: 32,
    text: "",
    image: block2Autopilot,
    block: 2,
  },
  {
    id: 5,
    startTime: 32,
    endTime: 38,
    text: "",
    image: block2Confusion,
    block: 2,
  },
  {
    id: 6,
    startTime: 38,
    endTime: 45,
    text: "",
    image: block1Stagnation,
    block: 2,
  },

  // === BLOCO 3 — VIRADA / CONSCIÊNCIA (45-65s) ===
  {
    id: 7,
    startTime: 45,
    endTime: 52,
    text: "",
    image: block3Focus,
    block: 3,
  },
  {
    id: 8,
    startTime: 52,
    endTime: 58,
    text: "",
    image: block3Awareness,
    block: 3,
  },
  {
    id: 9,
    startTime: 58,
    endTime: 65,
    text: "",
    image: block3Focus,
    block: 3,
  },

  // === BLOCO 4 — MÉTODO / CONTROLE (65-100s) ===
  {
    id: 10,
    startTime: 65,
    endTime: 75,
    text: "",
    image: block4Technique,
    block: 4,
  },
  {
    id: 11,
    startTime: 75,
    endTime: 85,
    text: "",
    image: block4Control,
    block: 4,
  },
  {
    id: 12,
    startTime: 85,
    endTime: 92,
    text: "",
    image: block4Technique,
    block: 4,
  },
  {
    id: 13,
    startTime: 92,
    endTime: 100,
    text: "",
    image: block4Control,
    block: 4,
  },

  // === BLOCO 5 — RESULTADO / OFERTA (100-145s) ===
  {
    id: 14,
    startTime: 100,
    endTime: 110,
    text: "",
    image: block5Confidence,
    block: 5,
  },
  {
    id: 15,
    startTime: 110,
    endTime: 120,
    text: "",
    image: block5Result,
    block: 5,
  },
  {
    id: 16,
    startTime: 120,
    endTime: 130,
    text: "",
    image: block5Confidence,
    block: 5,
  },
  {
    id: 17,
    startTime: 130,
    endTime: 145,
    text: "",
    image: block5Result,
    block: 5,
  },

  // === BLOCO 6 — DECISÃO / CTA FINAL (145s+) ===
  {
    id: 18,
    startTime: 145,
    endTime: 155,
    text: "",
    image: block1Frustration,
    block: 6,
  },
  {
    id: 19,
    startTime: 155,
    endTime: 165,
    text: "",
    image: block6Cta,
    block: 6,
  },
  {
    id: 20,
    startTime: 165,
    endTime: 999,
    text: "",
    image: block6Decision,
    block: 6,
  },
];

interface VSLSlidesProps {
  currentTime: number;
  captionLeadSeconds?: number;
  captionFadeMs?: number;
}

const VSLSlides = ({
  currentTime,
  captionLeadSeconds = 0,
  captionFadeMs = 160,
}: VSLSlidesProps) => {
  const [activeSegmentId, setActiveSegmentId] = useState(1);
  const [displayedImage, setDisplayedImage] = useState(segments[0].image);
  const [nextImage, setNextImage] = useState(segments[0].image);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const prevImageRef = useRef(segments[0].image);

  useEffect(() => {
    const t = Math.max(0, currentTime + captionLeadSeconds);
    const newSegment = segments.find((seg) => t >= seg.startTime && t < seg.endTime);

    if (newSegment && newSegment.id !== activeSegmentId) {
      setActiveSegmentId(newSegment.id);

      // Transição de imagem cinematográfica
      if (prevImageRef.current !== newSegment.image) {
        setNextImage(newSegment.image);
        setImageTransitioning(true);
        setTimeout(() => {
          setDisplayedImage(newSegment.image);
          prevImageRef.current = newSegment.image;
          setImageTransitioning(false);
        }, 800); // Transição mais lenta e suave
      }
    }
  }, [currentTime, activeSegmentId, captionLeadSeconds]);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];
  const isCta = activeSegment.block === 6;
  const isResult = activeSegment.block === 5;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* === BACKGROUND LAYERS === */}

      {/* Current Image - with Ken Burns effect */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          imageTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
        }`}
        style={{
          animation: !imageTransitioning ? "kenBurns 12s ease-in-out infinite alternate" : "none",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${displayedImage})`,
            filter: "brightness(0.5) saturate(0.9) contrast(1.1)",
          }}
        />
      </div>

      {/* Next Image (crossfade) */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          imageTransitioning ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${nextImage})`,
            filter: "brightness(0.5) saturate(0.9) contrast(1.1)",
          }}
        />
      </div>

      {/* === OVERLAYS CINEMATOGRÁFICOS === */}

      {/* Gradient base - dark premium */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

      {/* Orange accent glow - sutil */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, hsl(25 95% 50% / 0.15), transparent 50%)",
        }}
      />

      {/* Vignette forte */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.85)_100%)]" />

      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Letterbox bars - cinematic aspect */}
      <div className="absolute top-0 left-0 right-0 h-[5%] bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-[5%] bg-black" />

      {/* CTA glow effect - only on final block */}
      {isCta && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: "radial-gradient(circle at 50% 70%, hsl(25 95% 50% / 0.08), transparent 45%)",
          }}
        />
      )}

      {/* Result block - warmer tone */}
      {isResult && (
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(30 40% 50% / 0.05) 100%)",
          }}
        />
      )}

      {/* === PROGRESS INDICATOR === */}
      <div className="absolute bottom-[5%] left-0 right-0 h-[2px] bg-white/5 z-30">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${(activeSegment.id / segments.length) * 100}%`,
            background: "linear-gradient(90deg, hsl(25 95% 50% / 0.3), hsl(25 95% 50% / 0.6))",
          }}
        />
      </div>

      {/* Block indicator - discreto */}
      <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {[1, 2, 3, 4, 5, 6].map((block) => (
          <div
            key={block}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              activeSegment.block >= block 
                ? "bg-orange-500/60" 
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-1%, -1%);
          }
        }
      `}</style>
    </div>
  );
};

export default VSLSlides;
