import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-dashboard-token",
};

const DASHBOARD_PASSWORD = Deno.env.get("DASHBOARD_PASSWORD");

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 generations per hour
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms
const MAX_TEXT_LENGTH = 50000; // 50k characters max

function checkRateLimit(tokenId: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(tokenId);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(tokenId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// Validate session token (same as dashboard-events)
async function validateSessionToken(token: string): Promise<boolean> {
  if (!token || !DASHBOARD_PASSWORD) return false;
  
  const parts = token.split(':');
  if (parts.length !== 3) return false;
  
  const [expiresStr, randomHex, providedSignature] = parts;
  const expires = parseInt(expiresStr, 10);
  
  // Check expiry
  if (isNaN(expires) || Date.now() > expires) {
    return false;
  }
  
  // Validate format
  if (!/^[0-9a-f]{32}$/.test(randomHex) || !/^[0-9a-f]{64}$/.test(providedSignature)) {
    return false;
  }
  
  // Verify signature
  const data = `dashboard_session:${expires}:${randomHex}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(DASHBOARD_PASSWORD),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const expectedSignature = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Constant-time comparison
  if (providedSignature.length !== expectedSignature.length) return false;
  let result = 0;
  for (let i = 0; i < providedSignature.length; i++) {
    result |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  
  return result === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Validate session token
    const sessionToken = req.headers.get("x-dashboard-token");
    
    if (!sessionToken) {
      console.error("Missing session token");
      return new Response(
        JSON.stringify({ error: "Não autorizado - faça login" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValid = await validateSessionToken(sessionToken);
    if (!isValid) {
      console.error("Invalid or expired session token");
      return new Response(
        JSON.stringify({ error: "Sessão inválida ou expirada" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Session token validated successfully");

    // 2. Check rate limit (using token expiry as identifier)
    const tokenId = sessionToken.split(':')[0];
    if (!checkRateLimit(tokenId)) {
      console.error("Rate limit exceeded");
      return new Response(
        JSON.stringify({ error: "Limite excedido - máx 5 gerações por hora" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Validate input
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Texto é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Texto muito longo - máximo ${MAX_TEXT_LENGTH} caracteres` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Call ElevenLabs API
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "ELEVENLABS_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Using Brian voice - professional male voice good for VSL
    const voiceId = "nPczCjzI2devNBz1zQrb"; // Brian

    console.log("Generating audio for text length:", text.length);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          output_format: "mp3_44100_128",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
            speed: 1.0,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs error:", errorText);
      return new Response(
        JSON.stringify({ error: `Erro na API ElevenLabs: ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Audio generated successfully, size:", audioBuffer.byteLength);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "attachment; filename=vsl-audio.mp3",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
