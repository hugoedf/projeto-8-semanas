import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import vslThumbnail from "@/assets/vsl-thumbnail.jpg";
import { useVSLBackgroundMusic } from "@/hooks/useVSLBackgroundMusic";

interface VSLPlayerProps {
  onVideoEnd?: () => void;
  onProgress?: (progress: number) => void;
}

const VSLPlayer = ({ onVideoEnd, onProgress }: VSLPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const milestonesRef = useRef<Set<number>>(new Set());

  // Hook para música de fundo minimalista
  const { isLoading: musicLoading } = useVSLBackgroundMusic({
    isPlaying: isPlaying && musicEnabled,
    volume: 0.12, // Volume baixo para não competir com narração
  });

  const startPlayback = async () => {
    if (!videoRef.current || isPlaying) return;
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const videoDuration = video.duration || 0;
    const videoCurrentTime = video.currentTime || 0;
    const currentProgress = videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0;
    
    onProgress?.(currentProgress);

    // Track milestones
    const milestones = [25, 50, 75, 100];
    milestones.forEach((milestone) => {
      if (currentProgress >= milestone && !milestonesRef.current.has(milestone)) {
        milestonesRef.current.add(milestone);
        console.log(`📊 VSL milestone: ${milestone}%`);
      }
    });
  };

  const handleEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
    onVideoEnd?.();
    console.log("🏁 VSL ended");
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Player Container */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* Video Element with format fallback */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          {/* MP4 first (best compatibility) */}
          <source src="/videos/vsl-main.mp4" type="video/mp4" />
          {/* MOV fallback (Safari/Apple devices) */}
          <source src="/videos/vsl-main.mov" type="video/quicktime" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Pre-start overlay */}
        {!isPlaying && !hasEnded && (
          <>
            {/* Thumbnail background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${vslThumbnail})` }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,0.9)_100%)]" />

            {/* Subtle accent glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,hsl(var(--accent)/0.08),transparent_50%)]" />

            {/* Pre-start content */}
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

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={startPlayback}
                className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 hover:border-accent/80 bg-black/40 hover:bg-accent/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:scale-110"
                style={{
                  boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
                }}
                aria-label="Iniciar vídeo"
              >
                <Play
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 group-hover:text-accent transition-colors"
                  fill="currentColor"
                />
                <span className="absolute inset-0 rounded-full border border-white/20 opacity-30 animate-ping" />
              </button>
            </div>

            {/* Click to watch text */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-0">
              <p className="text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase">
                Clique para assistir
              </p>
            </div>
          </>
        )}

        {/* Botão de toggle música (durante reprodução) */}
        {isPlaying && (
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label={musicEnabled ? "Desativar música de fundo" : "Ativar música de fundo"}
          >
            {musicEnabled ? (
              <Volume2 className="w-4 h-4 text-white/70" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/50" />
            )}
          </button>
        )}
      </div>

      {/* CTA Pulse after video ends */}
      {hasEnded && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-accent animate-bounce" />
      )}
    </div>
  );
};

export default VSLPlayer;
