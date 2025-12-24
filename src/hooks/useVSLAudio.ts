import { useState, useRef, useCallback, useEffect } from "react";

interface SFXItem {
  time: number;
  type: string;
  audioContent: string;
}

interface VSLAudioState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  narrationLoaded: boolean;
  sfxLoaded: boolean;
}

export const useVSLAudio = () => {
  const [state, setState] = useState<VSLAudioState>({
    isLoading: false,
    isReady: false,
    error: null,
    narrationLoaded: false,
    sfxLoaded: false,
  });

  const narrationRef = useRef<HTMLAudioElement | null>(null);
  const sfxAudiosRef = useRef<Map<number, HTMLAudioElement>>(new Map());
  const sfxTimelineRef = useRef<SFXItem[]>([]);
  const lastPlayedSfxRef = useRef<Set<number>>(new Set());
  const isPlayingRef = useRef(false);

  // Carrega a narração via edge function
  const loadNarration = useCallback(async () => {
    console.log("🎙️ Carregando narração VSL...");
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-vsl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Narration failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Cria audio element com data URI
      const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
      audio.preload = "auto";
      
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error("Failed to load narration audio"));
        audio.load();
      });

      narrationRef.current = audio;
      console.log("✅ Narração carregada");
      
      return true;
    } catch (error) {
      console.error("❌ Erro ao carregar narração:", error);
      throw error;
    }
  }, []);

  // Carrega os SFX via edge function
  const loadSFX = useCallback(async () => {
    console.log("🔊 Carregando SFX...");
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vsl-sfx`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`SFX failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      sfxTimelineRef.current = data.timeline || [];
      
      // Pre-carrega todos os SFX como Audio elements
      for (const sfx of sfxTimelineRef.current) {
        const audio = new Audio(`data:audio/mpeg;base64,${sfx.audioContent}`);
        audio.volume = 0.7; // SFX um pouco mais baixo que narração
        audio.preload = "auto";
        sfxAudiosRef.current.set(sfx.time, audio);
      }

      console.log(`✅ ${sfxTimelineRef.current.length} SFX carregados`);
      
      return true;
    } catch (error) {
      console.error("⚠️ Erro ao carregar SFX (continuando sem eles):", error);
      // SFX são opcionais, não falha se não carregar
      return false;
    }
  }, []);

  // Inicializa todo o áudio
  const initialize = useCallback(async () => {
    if (state.isLoading || state.isReady) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Carrega narração e SFX em paralelo
      const [narrationSuccess, sfxSuccess] = await Promise.all([
        loadNarration(),
        loadSFX().catch(() => false), // SFX são opcionais
      ]);

      setState({
        isLoading: false,
        isReady: narrationSuccess,
        error: narrationSuccess ? null : "Falha ao carregar narração",
        narrationLoaded: narrationSuccess,
        sfxLoaded: sfxSuccess,
      });

      console.log("🎬 Sistema de áudio VSL pronto");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setState({
        isLoading: false,
        isReady: false,
        error: errorMessage,
        narrationLoaded: false,
        sfxLoaded: false,
      });
    }
  }, [state.isLoading, state.isReady, loadNarration, loadSFX]);

  // Toca SFX no tempo correto
  const checkAndPlaySFX = useCallback((currentTime: number) => {
    if (!isPlayingRef.current) return;

    // Verifica cada SFX no timeline
    for (const sfx of sfxTimelineRef.current) {
      // Toca se estamos dentro de 0.5s do tempo marcado e ainda não tocou
      if (
        currentTime >= sfx.time &&
        currentTime < sfx.time + 0.5 &&
        !lastPlayedSfxRef.current.has(sfx.time)
      ) {
        const audio = sfxAudiosRef.current.get(sfx.time);
        if (audio) {
          console.log(`🔊 SFX ${sfx.type} @ ${sfx.time}s`);
          audio.currentTime = 0;
          audio.play().catch(e => console.warn("SFX play failed:", e));
          lastPlayedSfxRef.current.add(sfx.time);
        }
      }
    }
  }, []);

  // Inicia playback sincronizado
  const play = useCallback(async () => {
    if (!narrationRef.current || !state.isReady) {
      console.warn("Áudio não está pronto");
      return false;
    }

    try {
      isPlayingRef.current = true;
      lastPlayedSfxRef.current.clear();
      await narrationRef.current.play();
      console.log("▶️ Áudio VSL iniciado");
      return true;
    } catch (error) {
      console.error("Erro ao iniciar áudio:", error);
      isPlayingRef.current = false;
      return false;
    }
  }, [state.isReady]);

  // Pausa playback
  const pause = useCallback(() => {
    if (narrationRef.current) {
      narrationRef.current.pause();
      isPlayingRef.current = false;
    }
  }, []);

  // Atualiza tempo (sincroniza com vídeo)
  const syncToTime = useCallback((time: number) => {
    if (narrationRef.current && Math.abs(narrationRef.current.currentTime - time) > 0.5) {
      narrationRef.current.currentTime = time;
    }
    checkAndPlaySFX(time);
  }, [checkAndPlaySFX]);

  // Retorna tempo atual do áudio
  const getCurrentTime = useCallback(() => {
    return narrationRef.current?.currentTime || 0;
  }, []);

  // Retorna duração total
  const getDuration = useCallback(() => {
    return narrationRef.current?.duration || 110;
  }, []);

  // Ajusta volume
  const setVolume = useCallback((volume: number) => {
    if (narrationRef.current) {
      narrationRef.current.volume = volume;
    }
    // SFX mantém volume relativo
    sfxAudiosRef.current.forEach(audio => {
      audio.volume = volume * 0.7;
    });
  }, []);

  // Callback quando narração termina
  const onEnded = useCallback((callback: () => void) => {
    if (narrationRef.current) {
      narrationRef.current.onended = callback;
    }
  }, []);

  // Callback para timeupdate
  const onTimeUpdate = useCallback((callback: (time: number) => void) => {
    if (narrationRef.current) {
      narrationRef.current.ontimeupdate = () => {
        const time = narrationRef.current?.currentTime || 0;
        checkAndPlaySFX(time);
        callback(time);
      };
    }
  }, [checkAndPlaySFX]);

  // Cleanup
  useEffect(() => {
    return () => {
      narrationRef.current?.pause();
      sfxAudiosRef.current.forEach(audio => audio.pause());
      sfxAudiosRef.current.clear();
    };
  }, []);

  return {
    state,
    initialize,
    play,
    pause,
    syncToTime,
    getCurrentTime,
    getDuration,
    setVolume,
    onEnded,
    onTimeUpdate,
    isPlaying: isPlayingRef.current,
  };
};
