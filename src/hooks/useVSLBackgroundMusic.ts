import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseVSLBackgroundMusicOptions {
  isPlaying: boolean;
  volume?: number;
}

export const useVSLBackgroundMusic = ({ isPlaying, volume = 0.15 }: UseVSLBackgroundMusicOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega e toca a música de fundo
  useEffect(() => {
    const loadAndPlayMusic = async () => {
      if (!isPlaying) {
        // Para a música quando o vídeo para
        if (audioRef.current) {
          audioRef.current.pause();
        }
        return;
      }

      // Se já está pronto, apenas toca
      if (audioRef.current && isReady) {
        audioRef.current.volume = volume;
        try {
          await audioRef.current.play();
        } catch (e) {
          console.log("Música de fundo: erro ao reproduzir", e);
        }
        return;
      }

      // Carrega a música pela primeira vez
      if (!isReady && !isLoading) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vsl-background-music`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Erro ao carregar música: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.audioContent) {
            // Cria elemento de áudio com data URI
            const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
            const audio = new Audio(audioUrl);
            audio.loop = true;
            audio.volume = volume;
            
            audioRef.current = audio;
            setIsReady(true);

            // Tenta tocar
            try {
              await audio.play();
            } catch (e) {
              console.log("Música de fundo: autoplay bloqueado, tentará novamente", e);
            }
          }
        } catch (e) {
          console.error("Erro ao carregar música de fundo:", e);
          setError(e instanceof Error ? e.message : "Erro desconhecido");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAndPlayMusic();
  }, [isPlaying, isReady, isLoading, volume]);

  // Atualiza volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isLoading,
    isReady,
    error,
  };
};

export default useVSLBackgroundMusic;
