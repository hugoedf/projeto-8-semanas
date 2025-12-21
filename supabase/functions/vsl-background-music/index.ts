import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Prompt para música cinematográfica minimalista
const MUSIC_PROMPT = `Minimalist cinematic ambient music. 
Slow, atmospheric, emotional. 
Soft piano notes with subtle strings. 
Dark, introspective mood. 
No percussion, no drums. 
Perfect for a motivational video about personal transformation and fitness. 
Gentle tension building throughout. 
60 BPM, very calm and focused.`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Tenta buscar do cache primeiro
    const { data: cachedFile, error: cacheError } = await supabase.storage
      .from("vsl-cache")
      .download("vsl-background-music-v1.mp3");

    if (cachedFile && !cacheError) {
      console.log("Música de fundo encontrada no cache");
      const audioBuffer = await cachedFile.arrayBuffer();
      const audioBase64 = base64Encode(audioBuffer);

      return new Response(
        JSON.stringify({ audioContent: audioBase64, cached: true }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Gera nova música via ElevenLabs
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY não configurada");
    }

    console.log("Gerando música de fundo cinematográfica...");

    const response = await fetch("https://api.elevenlabs.io/v1/music", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: MUSIC_PROMPT,
        duration_seconds: 180, // 3 minutos para cobrir a VSL
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ElevenLabs:", errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Música gerada com sucesso, tamanho:", audioBuffer.byteLength);

    // Cache no storage
    try {
      const { error: uploadError } = await supabase.storage
        .from("vsl-cache")
        .upload("vsl-background-music-v1.mp3", new Uint8Array(audioBuffer), {
          contentType: "audio/mpeg",
          upsert: true,
        });

      if (uploadError) {
        console.error("Erro ao fazer cache:", uploadError);
      } else {
        console.log("Música salva no cache");
      }
    } catch (e) {
      console.error("Erro ao salvar cache:", e);
    }

    const audioBase64 = base64Encode(audioBuffer);

    return new Response(
      JSON.stringify({ audioContent: audioBase64, cached: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Erro na função:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
