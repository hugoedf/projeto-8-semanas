import { useEffect, useRef, useState, useCallback } from "react";

interface VSLAudioVisualLayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

// Momentos-chave para efeitos (baseado no roteiro ~165s)
const KEY_MOMENTS = {
  // Bloco 1: Dor/Frustração (0-25s)
  intro: { start: 0, end: 5 },
  frustration: { start: 5, end: 25 },
  
  // Bloco 2: Conflito (25-50s)
  conflict: { start: 25, end: 50 },
  
  // Bloco 3: Virada (50-75s)
  turningPoint: { start: 50, end: 75 },
  
  // Bloco 4: Método (75-110s)
  method: { start: 75, end: 110 },
  
  // Bloco 5: Resultado (110-140s)
  result: { start: 110, end: 140 },
  
  // Bloco 6: CTA (140-165s)
  cta: { start: 140, end: 165 },
};

// Timestamps para efeitos de impacto
const IMPACT_TIMESTAMPS = [
  5,    // "cadê o resultado?"
  25,   // "modo automático"
  50,   // "Eu também passei por isso"
  75,   // "Imagina chegar na academia"
  95,   // "Isso é o Método 8X"
  120,  // "19 reais e 90"
  140,  // "Clica no botão"
  160,  // Final
];

const VSLAudioVisualLayer = ({ isPlaying, currentTime, duration }: VSLAudioVisualLayerProps) => {
  const [showFlash, setShowFlash] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [zoomPulse, setZoomPulse] = useState(false);
  const lastImpactRef = useRef<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Determina a fase atual baseado no tempo
  const getCurrentPhase = useCallback(() => {
    if (currentTime < 25) return "tension";
    if (currentTime < 50) return "conflict";
    if (currentTime < 75) return "hope";
    if (currentTime < 110) return "revelation";
    if (currentTime < 140) return "triumph";
    return "urgency";
  }, [currentTime]);

  // Efeitos de impacto nos momentos-chave
  useEffect(() => {
    if (!isPlaying) return;

    const currentImpact = IMPACT_TIMESTAMPS.find(
      (ts) => Math.abs(currentTime - ts) < 0.5 && ts !== lastImpactRef.current
    );

    if (currentImpact !== undefined) {
      lastImpactRef.current = currentImpact;
      
      // Flash rápido
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 100);
      
      // Efeito de impacto
      setShowImpact(true);
      setTimeout(() => setShowImpact(false), 300);
      
      // Zoom pulse
      setZoomPulse(true);
      setTimeout(() => setZoomPulse(false), 400);
      
      // Glitch ocasional (fases de tensão)
      if (currentTime < 50 || currentTime > 140) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }
  }, [currentTime, isPlaying]);

  const phase = getCurrentPhase();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Flash de transição */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-100 ${
          showFlash ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Efeito de impacto (ondas) */}
      {showImpact && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[200%] h-[200%] rounded-full border-4 border-accent/40 animate-ping" />
          <div className="absolute w-[150%] h-[150%] rounded-full border-2 border-white/20 animate-ping" style={{ animationDelay: "50ms" }} />
        </div>
      )}

      {/* Zoom pulse effect */}
      <div
        className={`absolute inset-0 transition-transform duration-400 ${
          zoomPulse ? "scale-[1.02]" : "scale-100"
        }`}
        style={{ transformOrigin: "center" }}
      />

      {/* Glitch effect */}
      {glitchActive && (
        <>
          <div className="absolute inset-0 bg-red-500/10 animate-pulse" style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)" }} />
          <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" style={{ clipPath: "polygon(0 33%, 100% 33%, 100% 66%, 0 66%)", animationDelay: "50ms" }} />
          <div className="absolute inset-0 bg-green-500/10 animate-pulse" style={{ clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)", animationDelay: "100ms" }} />
        </>
      )}

      {/* Partículas flutuantes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${(i * 7 + currentTime * 2) % 100}%`,
              top: `${(i * 11 + Math.sin(currentTime * 0.5 + i) * 10 + 50) % 100}%`,
              opacity: isPlaying ? 0.3 + Math.sin(currentTime + i) * 0.2 : 0,
              transform: `scale(${0.5 + Math.sin(currentTime * 0.3 + i) * 0.5})`,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          />
        ))}
      </div>

      {/* Linhas de energia animadas */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {/* Linha horizontal superior */}
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeDasharray="10 5"
          style={{
            strokeDashoffset: -currentTime * 50,
            opacity: phase === "tension" || phase === "urgency" ? 0.5 : 0.2,
          }}
        />
        {/* Linha horizontal inferior */}
        <line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeDasharray="10 5"
          style={{
            strokeDashoffset: currentTime * 50,
            opacity: phase === "tension" || phase === "urgency" ? 0.5 : 0.2,
          }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Vinheta dinâmica baseada na fase */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: phase === "tension" || phase === "conflict"
            ? "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)"
            : phase === "urgency"
            ? "radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,100,0,0.1) 70%, rgba(0,0,0,0.6) 100%)"
            : "radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Brilho accent pulsante durante revelação/CTA */}
      {(phase === "revelation" || phase === "triumph" || phase === "urgency") && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 60%, hsl(var(--accent) / ${
              0.05 + Math.sin(currentTime * 2) * 0.03
            }), transparent 60%)`,
          }}
        />
      )}

      {/* Bordas luminosas na fase de CTA */}
      {phase === "urgency" && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-pulse" />
        </>
      )}

      {/* Scanlines sutis */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
        }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "grain 0.5s steps(10) infinite",
        }}
      />

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(2%, 2%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-2%, 2%); }
          60% { transform: translate(2%, -2%); }
          70% { transform: translate(0%, 2%); }
          80% { transform: translate(-2%, 0%); }
          90% { transform: translate(2%, 1%); }
        }
      `}</style>
    </div>
  );
};

export default VSLAudioVisualLayer;
