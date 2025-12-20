import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VSLSlides from "./VSLSlides";

interface VSLPlayerProps {
  onVideoEnd?: () => void;
  onProgress?: (progress: number) => void;
}

type PlayerPhase = "idle" | "loading" | "playing" | "ended";

const VSLPlayer = ({ onVideoEnd, onProgress }: VSLPlayerProps) => {
  const [phase, setPhase] = useState<PlayerPhase>("idle");
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const firedSfxRef = useRef<Set<string>>(new Set());
  const { toast } = useToast();

  // Track milestones for analytics
  const milestonesRef = useRef<Set<number>>(new Set());

  const playImpactSfx = (type: "hit" | "spark") => {
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextCtor) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextCtor();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state !== "running") {
        // Requires user gesture (we call this after click)
        ctx.resume().catch(() => undefined);
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Super sutil, para não competir com a voz
      if (type === "hit") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.exponentialRampToValueAtTime(1240, now + 0.08);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch {
      // no-op
    }
  };

  const startPlayback = async () => {
    if (phase !== "idle") return;

    setPhase("loading");

    try {
      // Pré-aquece AudioContext (para SFX) com gesto do usuário
      playImpactSfx("spark");

      const response = await fetch(
        `https://kfddlytvdzqwopongnew.supabase.co/functions/v1/elevenlabs-vsl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load audio");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Create audio from base64
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      audio.preload = "auto";

      audio.addEventListener("timeupdate", () => {
        const d = audio.duration || 0;
        const currentProgress = d > 0 ? (audio.currentTime / d) * 100 : 0;
        setCurrentTime(audio.currentTime);
        onProgress?.(currentProgress);

        const milestones = [25, 50, 75, 100];
        milestones.forEach((milestone) => {
          if (currentProgress >= milestone && !milestonesRef.current.has(milestone)) {
            milestonesRef.current.add(milestone);
            console.log(`📊 VSL milestone: ${milestone}%`);
          }
        });

        // SFX sutis (impacto sem poluição)
        // preço (~127s) | garantia (~138s) | CTA final (~166s)
        const sfxCues: Array<{ key: string; t: number; type: "hit" | "spark" }> = [
          { key: "price", t: 127, type: "hit" },
          { key: "guarantee", t: 138, type: "spark" },
          { key: "cta", t: 166, type: "hit" },
        ];
        sfxCues.forEach((cue) => {
          if (audio.currentTime >= cue.t && !firedSfxRef.current.has(cue.key)) {
            firedSfxRef.current.add(cue.key);
            playImpactSfx(cue.type);
          }
        });
      });

      audio.addEventListener("ended", () => {
        setPhase("ended");
        onVideoEnd?.();
        console.log("🏁 VSL ended");
      });

      audioRef.current = audio;

      // Só inicia quando o áudio estiver pronto para tocar (evita começar “quebrando”)
      await new Promise<void>((resolve) => {
        const done = () => resolve();
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("loadeddata", done, { once: true });
        audio.load();
      });

      setPhase("playing");

      try {
        await audio.play();
      } catch {
        // Se o browser bloquear autoplay, pedimos novo toque (sem UI extra durante o vídeo)
        setPhase("idle");
        toast({
          title: "Toque para iniciar",
          description: "Seu navegador precisa de um toque para liberar o áudio.",
        });
      }
    } catch (error) {
      console.error("❌ Error loading VSL:", error);
      setPhase("idle");
      toast({
        variant: "destructive",
        title: "Erro ao carregar o vídeo",
        description: "Tente novamente em alguns instantes.",
      });
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => undefined);
        audioCtxRef.current = null;
      }
    };
  }, []);

  const hasStarted = phase === "playing" || phase === "ended";

  // Modo calibração: ?calibrate=1 na URL
  const isCalibrating = new URLSearchParams(window.location.search).get("calibrate") === "1";

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Painel de calibração */}
      {isCalibrating && hasStarted && (
        <div className="fixed top-4 left-4 z-50 bg-black/90 text-white px-4 py-2 rounded-lg font-mono text-lg border border-accent/50">
          ⏱️ <span className="text-accent font-bold">{currentTime.toFixed(2)}s</span>
        </div>
      )}

      {/* Player Container - Cinematic aspect ratio */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        {/* VSL Slides - Synchronized visuals */}
        {hasStarted && <VSLSlides currentTime={currentTime} />}

        {/* Pre-start overlay - Cinematic */}
        {!hasStarted && (
          <>
            {/* Dark cinematic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,0.9)_100%)]" />

            {/* Subtle accent glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,hsl(var(--accent)/0.08),transparent_50%)]" />

            {/* Pre-start content - Clean and minimal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-6">
              <p
                className="text-white/90 text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-wider mb-3 text-center"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
              >
                MÉTODO <span className="text-accent">8X</span>
              </p>
              <p className="text-white/50 text-sm tracking-widest uppercase">
                O Método que vai mudar seus resultados
              </p>
            </div>
          </>
        )}

        {/* Start button (sem loader visível) */}
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={startPlayback}
              disabled={phase === "loading"}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 hover:border-accent/80 bg-black/40 hover:bg-accent/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:scale-110 disabled:opacity-70 disabled:hover:scale-100"
              style={{
                boxShadow:
                  "0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
              aria-label="Iniciar vídeo"
            >
              <Play
                className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 group-hover:text-accent transition-colors"
                fill="currentColor"
              />

              {/* Pulse ring sutil (não é loader) */}
              <span
                className={`absolute inset-0 rounded-full border border-white/20 opacity-30 ${
                  phase === "loading" ? "" : "animate-ping"
                }`}
              />
            </button>
          </div>
        )}

        {/* Thumbnail text - Minimal */}
        {!hasStarted && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-0">
            <p className="text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase">
              Clique para assistir
            </p>
          </div>
        )}
      </div>

      {/* CTA Pulse after video ends */}
      {phase === "ended" && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-accent animate-bounce">
          <span className="text-sm font-medium">↓ Aproveite a oferta abaixo</span>
        </div>
      )}
    </div>
  );
};

export default VSLPlayer;

