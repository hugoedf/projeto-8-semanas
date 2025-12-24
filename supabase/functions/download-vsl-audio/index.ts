import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CACHE_BUCKET = "vsl-cache";
const CACHE_FILE_NAME = "vsl-audio-v2.mp3";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Downloading VSL audio for export...");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Busca o áudio do cache
    const { data: audioData, error: downloadError } = await supabase.storage
      .from(CACHE_BUCKET)
      .download(CACHE_FILE_NAME);

    if (downloadError || !audioData) {
      console.error("❌ Audio not found in cache:", downloadError);
      return new Response(
        JSON.stringify({ error: "Áudio não encontrado. Gere a VSL primeiro." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const audioBuffer = await audioData.arrayBuffer();
    const audioSize = Math.round(audioBuffer.byteLength / 1024);
    console.log(`✅ Audio ready for download: ${audioSize} KB`);

    // Retorna o MP3 com headers de download
    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="metodo-8x-vsl-narration.mp3"`,
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Download error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
