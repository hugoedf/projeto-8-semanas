import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    <div className="relative w-full max-w-lg mx-auto">
      {/* Player Container */}
      <div className="relative aspect-video bg-fitness-darker rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Background with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-fitness-brown via-fitness-dark to-fitness-darker">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(18,100%,58%,0.08),transparent_70%)]" />
        </div>

        {/* Waveform visualization (simplified) */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-accent rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Center Play Button / Loading */}
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/30"
            >
              {isLoading ? (
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent-foreground animate-spin" />
              ) : (
                <Play className="w-10 h-10 sm:w-12 sm:h-12 text-accent-foreground ml-1" fill="currentColor" />
              )}
              
              {/* Pulse ring */}
              {!isLoading && (
                <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
              )}
            </button>
          </div>
        )}

        {/* Thumbnail Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-0">
            <p className="text-white/60 text-sm font-medium tracking-wide uppercase">
              Clique para assistir
            </p>
          </div>
        )}

        {/* Content when playing */}
        {hasStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Volume2 className="w-8 h-8 text-accent" />
            </div>
            <p className="text-white/90 text-lg font-display font-bold mb-2">
              MÉTODO 8X
            </p>
            <p className="text-white/60 text-sm">
              {isPlaying ? "Reproduzindo..." : hasEnded ? "Vídeo finalizado" : "Pausado"}
            </p>
          </div>
        )}

        {/* Controls Bar - Only show after started */}
        {hasStarted && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress Bar */}
            <div 
              className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-accent rounded-full relative transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  )}
                </button>

                {hasEnded && (
                  <button
                    onClick={restart}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </button>
                )}

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <div className="text-white/70 text-sm font-medium tabular-nums">
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
