import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VSLSlides from "./VSLSlides";

interface VSLPlayerProps {
  onVideoEnd?: () => void;
  onProgress?: (progress: number) => void;
}

const VSLPlayer = ({ onVideoEnd, onProgress }: VSLPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Track milestones for analytics
  const milestonesRef = useRef<Set<number>>(new Set());

  const loadAudio = async () => {
    if (audioLoaded && audioRef.current) return;
    
    setIsLoading(true);
    console.log('🎙️ Loading VSL audio...');

    try {
      const response = await fetch(
        `https://kfddlytvdzqwopongnew.supabase.co/functions/v1/elevenlabs-vsl`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load audio');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Create audio from base64
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        console.log('✅ Audio loaded, duration:', audio.duration);
      });

      audio.addEventListener('timeupdate', () => {
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(audio.currentTime);
        onProgress?.(currentProgress);

        // Track milestones
        const milestones = [25, 50, 75, 100];
        milestones.forEach(milestone => {
          if (currentProgress >= milestone && !milestonesRef.current.has(milestone)) {
            milestonesRef.current.add(milestone);
            console.log(`📊 VSL milestone: ${milestone}%`);
          }
        });
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setHasEnded(true);
        onVideoEnd?.();
        console.log('🏁 VSL ended');
      });

      audioRef.current = audio;
      setAudioLoaded(true);
      setIsLoading(false);

      // Auto-play after loading
      audio.play();
      setIsPlaying(true);
      setHasStarted(true);

    } catch (error) {
      console.error('❌ Error loading VSL:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erro ao carregar o vídeo",
        description: "Tente novamente em alguns instantes.",
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      loadAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
      milestonesRef.current.clear();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
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
              <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-wider mb-3 text-center"
                 style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                MÉTODO <span className="text-accent">8X</span>
              </p>
              <p className="text-white/50 text-sm tracking-widest uppercase">
                O Método que vai mudar seus resultados
              </p>
            </div>
          </>
        )}

        {/* Center Play Button - Premium minimal */}
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 hover:border-accent/80 bg-black/40 hover:bg-accent/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:scale-110"
              style={{
                boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 group-hover:text-accent transition-colors" fill="currentColor" />
              )}
              
              {/* Subtle pulse ring */}
              {!isLoading && (
                <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
              )}
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

        {/* Controls Bar - Minimal and elegant */}
        {hasStarted && (
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
            {/* Progress Bar - Thin and elegant */}
            <div 
              className="w-full h-1 bg-white/10 rounded-full mb-4 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-accent rounded-full relative transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg transform scale-0 group-hover:scale-100" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white/90" />
                  ) : (
                    <Play className="w-4 h-4 text-white/90 ml-0.5" fill="currentColor" />
                  )}
                </button>

                {hasEnded && (
                  <button
                    onClick={restart}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4 text-white/90" />
                  </button>
                )}

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white/90" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white/90" />
                  )}
                </button>
              </div>

              <div className="text-white/50 text-xs font-medium tabular-nums tracking-wider">
                {formatTime(currentTime)} / {formatTime(duration || 165)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Pulse after video ends */}
      {hasEnded && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-accent animate-bounce">
          <span className="text-sm font-medium">↓ Aproveite a oferta abaixo</span>
        </div>
      )}
    </div>
  );
};

export default VSLPlayer;
