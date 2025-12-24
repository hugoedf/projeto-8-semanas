import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// VSL Script - Roteiro otimizado para conversão extrema (1:50)
// Marcações de SFX e pausas para pós-produção
const VSL_SCRIPT = `
Para.

Antes de fechar esse vídeo, me responde uma coisa: quantos meses você já treina... sem ver diferença real no espelho?

Se você tá aqui, é porque algo não tá funcionando. E eu sei exatamente o que é.

Você acorda cedo. Vai pra academia. Faz os exercícios. Completa as séries. Sai suado. Repete tudo de novo na semana seguinte. Mas o corpo? Continua o mesmo.

E a pior parte? Você vê outros caras evoluindo. Com menos tempo de treino que você. E fica se perguntando: o que eu tô fazendo de errado?

Eu vou te contar.

O problema não é esforço. Não é genética. Não é suplemento.

O problema é que você treina no escuro. Sem estratégia. Sem entender o que realmente faz o músculo crescer.

E aqui tá a verdade que ninguém te conta: treinar mais não resolve. Você pode passar horas na academia e não construir um grama de músculo. Porque hipertrofia não é sobre quantidade. É sobre precisão.

Cada repetição tem que ter intenção. Cada série precisa de um propósito. Cada descanso tem um tempo ideal. Isso não é achismo. É ciência.

E é exatamente isso que o Método 8X entrega.

Um e-book completo com 8 semanas de treino estruturado. Mais um aplicativo que guia cada sessão sua. Exercício por exercício. Série por série. Sem improvisar. Sem dúvida.

Você vai aprender os 4 pilares da hipertrofia que 90% das pessoas ignora. Os 7 erros que sabotam seu progresso. E a técnica que transforma cada repetição em resultado.

E quanto custa tudo isso? Menos do que você gasta num pote de whey que não vai resolver nada sozinho.

19 reais e 90 centavos. Com garantia de 7 dias.

Se não funcionar pra você, devolvo cada centavo. Sem perguntas.

Agora você tem duas escolhas.

Continuar treinando do mesmo jeito, esperando um resultado diferente. Ou clicar no botão abaixo e finalmente assumir o controle da sua evolução.

A decisão é sua. Mas o tempo não para.

Clica agora.
`;

const CACHE_FILE_NAME = 'vsl-audio-v2.mp3';
const BUCKET_NAME = 'vsl-cache';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to get cached audio first
    console.log('🔍 Checking for cached audio...');
    
    const { data: cachedFile } = await supabase.storage
      .from(BUCKET_NAME)
      .download(CACHE_FILE_NAME);

    if (cachedFile) {
      console.log('✅ Found cached audio, returning...');
      
      const arrayBuffer = await cachedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Audio = btoa(binary);
      
      console.log('📦 Cached audio size:', Math.round(arrayBuffer.byteLength / 1024), 'KB');

      return new Response(
        JSON.stringify({
          audioContent: base64Audio,
          duration: 110,
          script: VSL_SCRIPT.trim(),
          cached: true
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // No cache found, generate new audio
    console.log('🎙️ No cache found, generating new audio...');
    
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    
    if (!ELEVENLABS_API_KEY) {
      console.error('❌ ELEVENLABS_API_KEY not configured');
      throw new Error('ELEVENLABS_API_KEY is not configured');
    }

    console.log('📝 Script length:', VSL_SCRIPT.length, 'characters');

    // Voice ID: Roger - voz masculina profissional em português
    const voiceId = 'CwhRBWXzGAHq8TQ4Fs17';

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: VSL_SCRIPT,
          model_id: 'eleven_multilingual_v2',
          output_format: 'mp3_44100_128',
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.8,
            style: 0.4,
            use_speaker_boost: true,
            speed: 0.95,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    console.log('✅ Audio generated successfully');

    const audioBuffer = await response.arrayBuffer();
    
    // Cache the audio in Supabase Storage
    console.log('💾 Caching audio to storage...');
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(CACHE_FILE_NAME, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('⚠️ Failed to cache audio:', uploadError.message);
      // Continue anyway, just log the error
    } else {
      console.log('✅ Audio cached successfully');
    }

    // Convert to base64
    const uint8Array = new Uint8Array(audioBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64Audio = btoa(binary);

    console.log('📦 Audio size:', Math.round(audioBuffer.byteLength / 1024), 'KB');

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        duration: 110, // ~1:50
        script: VSL_SCRIPT.trim(),
        cached: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error generating VSL audio:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
