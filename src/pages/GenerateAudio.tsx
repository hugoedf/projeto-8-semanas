import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Volume2 } from "lucide-react";
import { toast } from "sonner";

const VSL_SCRIPT = `Para.
Antes de fechar esse vídeo, me responde uma coisa.

Quantos meses você já treina…
sem ver diferença real no espelho?

Se você chegou até aqui, é porque alguma coisa não está funcionando.
E não é falta de esforço.

Você acorda cedo, vai pra academia, faz os exercícios, completa as séries, sai suado…
Repete tudo de novo na semana seguinte.

Mas o corpo continua o mesmo.

E a pior parte não é nem isso.

É olhar para o lado e ver outros caras evoluindo,
com menos tempo de treino do que você.

E aí vem a pergunta que fica martelando na cabeça:
"O que eu estou fazendo de errado?"

Agora presta atenção nisso.

O problema não é esforço.
Não é genética.
Não é suplemento.

O problema é que você está treinando no escuro.
Sem estratégia.
Sem entender o que realmente faz o músculo crescer.

E aqui está a verdade que quase ninguém te explica:

Treinar mais não resolve.

Você pode passar horas dentro da academia
e ainda assim não construir um grama de músculo.

Porque hipertrofia não é sobre quantidade.
É sobre precisão.

Cada repetição precisa ter intenção.
Cada série precisa ter um propósito.
Cada descanso tem um tempo certo.

Isso não é achismo.
Isso é ciência.

Daqui a pouco, eu vou te mostrar como aplicar isso no seu treino.
Mas antes, você precisa entender uma coisa importante:

A maioria das pessoas até sabe o que fazer.
O problema é executar certo, toda semana, sem improviso.

E é exatamente aí que quase todo mundo trava.

Foi por isso que esse sistema foi criado.

Um método simples, estruturado e aplicável,
que transforma conhecimento em execução real.

Um sistema que te guia treino após treino,
sem precisar adivinhar, sem depender de motivação.

É isso que o Método 8X entrega.

Mas deixa eu ser claro:

Você não está comprando um milagre.
Você está entrando em um sistema.

Um e-book com 8 semanas de treino estruturado,
explicando o porquê de cada estímulo.

E um aplicativo que guia sua execução,
exercício por exercício, série por série,
sem improviso, sem dúvida.

Você aprende os pilares da hipertrofia que a maioria ignora
e corrige os erros que sabotam seu progresso há meses.

E agora vem a parte importante.

Você não precisa decidir tudo agora.
Você não precisa acreditar.

Você só precisa testar.

O acesso é imediato.
Você aplica no seu treino
e sente a diferença na prática.

E o investimento?

Menos do que você gasta em um pote de suplemento
que, sozinho, não resolve nada.

R$ 19,90.

Com 7 dias de garantia.
Se não fizer sentido pra você,
eu devolvo cada centavo.
Sem perguntas. Sem burocracia.

Então agora é simples.

Ou você continua treinando do mesmo jeito,
esperando que algo mude…

Ou você dá o próximo passo
e para de treinar no escuro.

Se isso fez sentido pra você,
o acesso está logo abaixo.

Clica e começa a aplicar no seu próximo treino.`;

export default function GenerateAudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateAudio = async () => {
    setIsGenerating(true);
    toast.info("Gerando áudio... Isso pode levar alguns minutos.");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-vsl-audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: VSL_SCRIPT }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao gerar áudio");
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      toast.success("Áudio gerado com sucesso!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao gerar áudio");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "vsl-metodo-8x.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerador de Áudio VSL
          </h1>
          <p className="text-muted-foreground">
            Clique no botão abaixo para gerar o áudio da VSL
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            {!audioUrl ? (
              <Button
                onClick={generateAudio}
                disabled={isGenerating}
                size="lg"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando áudio...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    Gerar Áudio
                  </>
                )}
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full">
                <audio controls src={audioUrl} className="w-full" />
                <Button onClick={downloadAudio} size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  Baixar MP3
                </Button>
              </div>
            )}
          </div>

          {isGenerating && (
            <p className="text-sm text-muted-foreground text-center">
              O áudio está sendo gerado pela ElevenLabs. Aguarde...
            </p>
          )}
        </div>

        <div className="bg-muted/30 rounded-xl p-4 max-h-64 overflow-y-auto">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Script da VSL:
          </h3>
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
            {VSL_SCRIPT}
          </pre>
        </div>
      </div>
    </div>
  );
}
