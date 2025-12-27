import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react";
import vslThumbnail from "@/assets/vsl-thumbnail.jpg";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
interface VSLPlayerProps {
  onVideoEnd?: () => void;
  onProgress?: (progress: number) => void;
}
const VSLPlayer = ({
  onVideoEnd,
  onProgress
}: VSLPlayerProps) => {
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
  const {
    reportVideoTime
  } = useCTAVisibility();
  const {
    visitorData
  } = useVisitorTracking();

  // VSL Event Tracking - tracks sent to avoid duplicates
  const vslEventsTrackedRef = useRef<{
    VSLStart: boolean;
    VSL15s: boolean;
    VSL30s: boolean;
  }>({
    VSLStart: false,
    VSL15s: false,
    VSL30s: false
  });

  // Generate unique event ID
  const generateEventId = useCallback((): string => {
    const base = visitorData?.visitorId || 'unknown';
    return `${base}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, [visitorData?.visitorId]);

  // Send VSL event via meta-conversions edge function (bypasses RLS)
  const sendVSLEvent = useCallback(async (eventName: 'VSLStart' | 'VSL15s' | 'VSL30s') => {
    // Check if already tracked
    if (vslEventsTrackedRef.current[eventName]) {
      console.log(`VSL Event ${eventName} already tracked, skipping`);
      return;
    }

    // Mark as tracked immediately to prevent race conditions
    vslEventsTrackedRef.current[eventName] = true;
    const eventId = generateEventId();
    const device = /mobile|android|iphone|ipad/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    console.log(`📊 VSL Event: ${eventName}`, {
      eventId,
      visitorId: visitorData?.visitorId
    });
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventName,
          eventId,
          eventSourceUrl: window.location.href,
          visitorId: visitorData?.visitorId || null,
          device,
          fbp: localStorage.getItem('_fbp') || undefined,
          fbc: localStorage.getItem('_fbc') || undefined
        })
      });
      if (!response.ok) {
        console.error(`VSL Event ${eventName} failed:`, response.status);
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
      videoRef.current.muted = false;
      await videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
      setIsMuted(false);
      console.log("▶️ Playback iniciado");
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };
  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (!video.paused && !video.ended) {
      // Pause video and GUARANTEE no other media keeps playing in background
      video.pause();
      video.muted = true;
      setIsMuted(true);
      setIsPlaying(false);

      // Safety net: stop/mute any other media elements (prevents “áudio fantasma”)
      document.querySelectorAll<HTMLMediaElement>('audio, video').forEach(el => {
        try {
          if (el !== video) {
            el.pause();
          }
          el.muted = true;
        } catch {
          // ignore
        }
      });
      return;
    }
    try {
      // Mobile-first: always ensure we are not muted when user explicitly hits play.
      video.muted = false;
      await video.play();
      setIsMuted(false);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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

  // Keep React state in sync with the real media element state (prevents UI/audio desync)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setIsMuted(video.muted);
      console.log('▶️ Vídeo iniciado');

      // Send VSLStart event
      sendVSLEvent('VSLStart');
    };
    const handlePause = () => {
      setIsPlaying(false);
      // If user paused, ensure audio is truly off
      video.muted = true;
      setIsMuted(true);
    };
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    // NO AUTOPLAY - user must click consciously to start video
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
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
    const currentProgress = videoDuration > 0 ? videoCurrentTime / videoDuration * 100 : 0;
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
    percentMilestones.forEach(milestone => {
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
  return <div ref={containerRef} className="relative w-full max-w-3xl mx-auto group" onMouseMove={handleMouseMove} onMouseLeave={() => isPlaying && setShowControls(false)}>
      {/* Player Container */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* LCP Image - Video thumbnail with high priority */}
        {!hasStarted && <img src={vslThumbnail} alt="VSL Thumbnail" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" decoding="async" />}
        
        {/* Video Element with format fallback - preload metadata for faster LCP */}
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" poster={vslThumbnail} playsInline webkit-playsinline="true" x-webkit-airplay="allow" preload="metadata" controlsList="nodownload nofullscreen noremoteplayback" disablePictureInPicture onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onCanPlay={() => console.log('📱 Vídeo pronto para reproduzir')}>
          <source src="/videos/vsl-main.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Pre-start overlay - CLEAN, STANDARD PLAY BUTTON */}
        {!hasStarted && <>
            {/* Subtle vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.75)_100%)]" />

            {/* Hook text */}
            <div className="absolute top-4 sm:top-8 left-0 right-0 text-center z-20 px-4">
              <p className="text-white text-base sm:text-xl font-bold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,1)] uppercase">
                SEU TREINO NÃO FUNCIONA.
              </p>
            </div>

            {/* Standard play button - clean and simple */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button onClick={startPlayback} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg" aria-label="Iniciar vídeo">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" />
              </button>
            </div>

            {/* Simple audio indicator */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center z-20 px-4">
              <p className="text-white/60 text-[10px] sm:text-xs flex items-center justify-center gap-1.5">
                <Volume2 className="w-3 h-3" />
                <span>Ative o som</span>
              </p>
            </div>
          </>}


        {/* Invisible click area for play/pause only (when video has started) */}
        {hasStarted && <div className="absolute inset-0 cursor-pointer" onClick={togglePlayPause}>
            {/* Center play button only when paused */}
            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-accent/50 transition-all hover:scale-110" aria-label="Reproduzir">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </button>
              </div>}
          </div>}
      </div>

      {/* CTA Pulse after video ends */}
      {hasEnded && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-accent animate-bounce" />}
    </div>;
};
export default VSLPlayer;