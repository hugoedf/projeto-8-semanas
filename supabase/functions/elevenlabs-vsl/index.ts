import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// VSL Script - Roteiro otimizado para conversão (2:45)
const VSL_SCRIPT = `
Você treina há meses, talvez anos. Segue planilhas, assiste vídeos, tenta fazer tudo certo. Mas quando olha no espelho, a frustração bate: cadê o resultado?

A verdade é que 90% das pessoas treinam no modo automático. Fazem os exercícios, completam as séries, mas não entendem o que realmente faz o músculo crescer. E por isso, ficam estagnados.

Eu também passei por isso. Até entender que hipertrofia não é sobre treinar mais. É sobre treinar com estratégia. Com ciência. Com intenção.

Imagina chegar na academia sabendo exatamente o que fazer. Qual exercício priorizar. Quantas séries. Qual cadência. Quanto tempo descansar. Tudo baseado no que a ciência já provou que funciona.

Isso é o Método 8X. Um e-book completo com 8 semanas de treino estruturado, mais um aplicativo exclusivo que guia cada treino seu. Sem achismos. Sem improviso.

O que você vai aprender: os 4 pilares da hipertrofia que ninguém te ensinou. Os 7 erros que sabotam seus resultados. A técnica que maximiza cada repetição. E um plano de 8 semanas testado e aprovado.

E o melhor: tudo isso por apenas 19 reais e 90 centavos. Menos que um suplemento que você compra todo mês. Com garantia de 7 dias. Se não gostar, devolvo seu dinheiro. Sem perguntas.

Você pode continuar treinando do mesmo jeito e esperando resultados diferentes. Ou pode dar o primeiro passo agora e finalmente ter controle sobre sua evolução.

Clica no botão abaixo. Seu futuro eu agradece.
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    
    if (!ELEVENLABS_API_KEY) {
      console.error('❌ ELEVENLABS_API_KEY not configured');
      throw new Error('ELEVENLABS_API_KEY is not configured');
    }

    console.log('🎙️ Starting VSL audio generation...');
    console.log('📝 Script length:', VSL_SCRIPT.length, 'characters');

    // Voice ID: Roger - voz masculina profissional em português
    const voiceId = 'CwhRBWXzGAHq8TQ4Fs17'; // Roger - professional male voice

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
            speed: 0.95, // Slightly slower for clarity
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
    
    // Use Deno's built-in base64 encoding
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
        duration: 165, // ~2:45 estimated
        script: VSL_SCRIPT.trim()
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
