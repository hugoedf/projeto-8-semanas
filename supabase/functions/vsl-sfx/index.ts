import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SFX timings para a VSL de 110 segundos
// Baseado nas marcações do script
const SFX_TIMELINE = [
  { time: 0, type: "hit", prompt: "Deep impact hit, cinematic bass drop, very short, powerful" },
  { time: 18, type: "whoosh", prompt: "Quick cinematic whoosh transition sound, subtle" },
  { time: 32, type: "hit", prompt: "Low frequency impact hit, dramatic, short punch" },
  { time: 45, type: "whoosh", prompt: "Soft swoosh sound effect, transitional, clean" },
  { time: 58, type: "riser", prompt: "Cinematic tension riser, building anticipation, 3 seconds" },
  { time: 72, type: "hit", prompt: "Powerful sub bass impact, cinematic boom, authoritative" },
  { time: 85, type: "whoosh", prompt: "Fast whoosh sweep sound, dynamic, energetic" },
  { time: 95, type: "riser", prompt: "Epic cinematic riser building to climax, motivational, 4 seconds" },
  { time: 105, type: "hit", prompt: "Final impact hit, decisive, powerful bass drop, closure" },
];

const CACHE_FILE_NAME = "vsl-sfx-pack-v2.json";
const BUCKET_NAME = "vsl-cache";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Tenta buscar do cache primeiro
    console.log("🔍 Verificando cache de SFX...");
    
    const { data: cachedFile } = await supabase.storage
      .from(BUCKET_NAME)
      .download(CACHE_FILE_NAME);

    if (cachedFile) {
      console.log("✅ SFX encontrados no cache");
      const text = await cachedFile.text();
      const sfxData = JSON.parse(text);
      
      return new Response(
        JSON.stringify({ ...sfxData, cached: true }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Gera novos SFX via ElevenLabs
    console.log("🎵 Gerando SFX via ElevenLabs...");
    
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY não configurada");
    }

    const sfxResults: Array<{
      time: number;
      type: string;
      audioContent: string;
    }> = [];

    // Gera cada SFX individualmente
    for (const sfx of SFX_TIMELINE) {
      console.log(`🔊 Gerando ${sfx.type} para ${sfx.time}s...`);
      
      try {
        const response = await fetch(
          "https://api.elevenlabs.io/v1/sound-generation",
          {
            method: "POST",
            headers: {
              "xi-api-key": ELEVENLABS_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: sfx.prompt,
              duration_seconds: sfx.type === "riser" ? 4 : 1.5,
              prompt_influence: 0.5,
            }),
          }
        );

        if (!response.ok) {
          console.error(`❌ Erro ao gerar ${sfx.type}:`, await response.text());
          continue;
        }

        const audioBuffer = await response.arrayBuffer();
        const audioBase64 = base64Encode(audioBuffer);
        
        sfxResults.push({
          time: sfx.time,
          type: sfx.type,
          audioContent: audioBase64,
        });
        
        console.log(`✅ ${sfx.type} gerado (${Math.round(audioBuffer.byteLength / 1024)}KB)`);
        
        // Pequeno delay entre requisições para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (e) {
        console.error(`❌ Erro ao gerar ${sfx.type}:`, e);
      }
    }

    console.log(`📦 Total de ${sfxResults.length} SFX gerados`);

    const sfxData = {
      timeline: sfxResults,
      totalDuration: 110,
      generatedAt: new Date().toISOString(),
    };

    // Cache no storage
    try {
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(CACHE_FILE_NAME, JSON.stringify(sfxData), {
          contentType: "application/json",
          upsert: true,
        });

      if (uploadError) {
        console.error("⚠️ Erro ao fazer cache:", uploadError);
      } else {
        console.log("✅ SFX salvos no cache");
      }
    } catch (e) {
      console.error("⚠️ Erro ao salvar cache:", e);
    }

    return new Response(
      JSON.stringify({ ...sfxData, cached: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("❌ Erro na função:", error);
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
