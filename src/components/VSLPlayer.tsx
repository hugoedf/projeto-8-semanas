import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Maximize } from "lucide-react";
import vslThumbnail from "@/assets/vsl-thumbnail.jpg";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { supabase } from "@/integrations/supabase/client";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

interface VSLPlayerProps {
  onVideoEnd?: () => void;
  onProgress?: (progress: number) => void;
}

const VSLPlayer = ({ onVideoEnd, onProgress }: VSLPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<Set<number>>(new Set());
  const controlsTimeoutRef = useRef<number | null>(null);
  const { reportVideoTime } = useCTAVisibility();
  const { visitorData } = useVisitorTracking();

  // VSL Event Tracking - tracks sent to avoid duplicates
  const vslEventsTrackedRef = useRef<{
    VSLStart: boolean;
    VSL15s: boolean;
    VSL30s: boolean;
  }>({
    VSLStart: false,
    VSL15s: false,
    VSL30s: false,
  });

  // Generate unique event ID
  const generateEventId = useCallback((): string => {
    const base = visitorData?.visitorId || 'unknown';
    return `${base}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, [visitorData?.visitorId]);

  // Send VSL event to meta_events table directly (not through password-protected dashboard)
  const sendVSLEvent = useCallback(async (eventName: 'VSLStart' | 'VSL15s' | 'VSL30s') => {
    // Check if already tracked
    if (vslEventsTrackedRef.current[eventName]) {
      console.log(`VSL Event ${eventName} already tracked, skipping`);
      return;
    }

    // Mark as tracked immediately to prevent race conditions
    vslEventsTrackedRef.current[eventName] = true;

    const eventId = generateEventId();
    console.log(`📊 VSL Event: ${eventName}`, { eventId, visitorId: visitorData?.visitorId });

    try {
      // Insert directly into meta_events table for dashboard tracking
      const { error } = await supabase.from('meta_events').insert({
        event_name: eventName,
        event_id: eventId,
        visitor_id: visitorData?.visitorId || null,
        page_url: window.location.href,
        device: /mobile|android|iphone|ipad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        event_time: new Date().toISOString(),
      });

      if (error) {
        console.error(`VSL Event ${eventName} failed:`, error);
      } else {
        console.log(`✅ VSL Event ${eventName} tracked`);
      }
    } catch (error) {
      console.error(`Error sending VSL event ${eventName}:`, error);
    }
  }, [generateEventId, visitorData?.visitorId]);

  const startPlayback = async () => {
    if (!videoRef.current || isPlaying) return;
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // Autoplay on mount with sound after 2 second delay to show thumbnail
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle when video actually starts playing - track VSLStart
    const handlePlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
      console.log('▶️ Vídeo iniciado');
      
      // Send VSLStart event
      sendVSLEvent('VSLStart');
    };

    video.addEventListener('play', handlePlay);

    const attemptAutoplay = async () => {
      try {
        // Play with sound - no fallback to muted
        video.muted = false;
        setIsMuted(false);
        await video.play();
        console.log('▶️ Autoplay iniciado com som');
      } catch (error) {
        console.log('⏸️ Autoplay bloqueado pelo navegador:', error);
      }
    };

    // 2 second delay to show thumbnail before autoplay
    const timer = setTimeout(attemptAutoplay, 2000);

    return () => {
      video.removeEventListener('play', handlePlay);
      clearTimeout(timer);
    };
  }, [sendVSLEvent]);

  // Block seeking via keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const videoDuration = video.duration || 0;
    const videoCurrentTime = video.currentTime || 0;
    const currentProgress = videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0;
    
    setProgress(currentProgress);
    setCurrentTime(videoCurrentTime);
    setDuration(videoDuration);
    onProgress?.(currentProgress);

    // Report video time for CTA visibility
    reportVideoTime(videoCurrentTime);

    // Track VSL milestones (15s and 30s)
    if (videoCurrentTime >= 15 && !vslEventsTrackedRef.current.VSL15s) {
      sendVSLEvent('VSL15s');
    }
    
    if (videoCurrentTime >= 30 && !vslEventsTrackedRef.current.VSL30s) {
      sendVSLEvent('VSL30s');
    }

    // Track percentage milestones (for logging only)
    const percentMilestones = [25, 50, 75, 100];
    percentMilestones.forEach((milestone) => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Player Container */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* LCP Image - Video thumbnail with high priority */}
        {!hasStarted && (
          <img
            src={vslThumbnail}
            alt="VSL Thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        )}
        
        {/* Video Element with format fallback - lazy loaded */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={vslThumbnail}
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onCanPlay={() => console.log('📱 Vídeo pronto para reproduzir')}
        >
          {/* MP4 first (best compatibility) */}
          <source src="/videos/vsl-main.mp4" type="video/mp4" />
          {/* MOV fallback (Safari/Apple devices) */}
          <source src="/videos/vsl-main.mov" type="video/quicktime" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Pre-start overlay */}
        {!hasStarted && (
          <>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.85)_100%)]" />

            {/* Texto provocativo no topo */}
            <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-0 px-4">
              <p className="text-white/80 text-xs sm:text-sm tracking-widest uppercase">
                O ERRO que 90% dos caras cometem no treino
              </p>
            </div>

            {/* Play button centralizado */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={startPlayback}
                className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/40 hover:border-accent bg-black/50 hover:bg-accent/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Iniciar vídeo"
              >
                <Play
                  className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1 group-hover:text-accent transition-colors"
                  fill="currentColor"
                />
                <span className="absolute inset-0 rounded-full border border-white/30 opacity-40 animate-ping" />
              </button>
            </div>

            {/* Micro-copy na base */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center z-0 px-4">
              <p className="text-accent/80 text-[10px] sm:text-xs">
                Assista os primeiros 30 segundos — pode mudar tudo
              </p>
            </div>
          </>
        )}


        {/* Custom Controls Overlay (when video has started) */}
        {hasStarted && (
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Center play/pause button */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlayPause}
            >
              {!isPlaying && (
                <button
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-accent/50 transition-all hover:scale-110"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </button>
              )}
            </div>

            {/* Bottom controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10">
              {/* Progress bar (read-only, no seeking) */}
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-3">
                <div 
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Time */}
                  <span className="text-white/70 text-xs font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Tela cheia"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
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