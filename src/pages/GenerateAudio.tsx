import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Volume2 } from "lucide-react";
import { toast } from "sonner";

const VSL_SCRIPT = `PARA.
Não fecha esse vídeo ainda.

Quanto tempo você já treina…
indo pra academia certinho…
fazendo tudo "do jeito certo"…
sem ver diferença real no espelho?

E o pior nem é o esforço.

É olhar pro lado…
ver outros caras evoluindo com menos tempo…
e aquela pergunta começar a martelar na cabeça:

"O que eu tô fazendo de errado?"
Ou pior…
"Será que o problema sou eu?"

Presta atenção nisso.

O problema não é esforço.
Não é genética.
Não é suplemento.

O problema é que você está
treinando no escuro.

E daqui a pouco eu vou te mostrar
o erro mais comum,
que parece inofensivo…
mas trava o seu crescimento por meses.

Treinar mais não resolve.

Você pode passar horas na academia
e ainda assim não construir um grama de músculo.

Porque hipertrofia não é quantidade.
É precisão.

Não importa o quanto você se cansa.
Importa o que você estimula.

Cada repetição precisa de intenção.
Cada série tem um propósito.
Cada descanso tem um tempo certo.

Isso não é achismo.
É ciência aplicada do jeito certo.

A maioria das pessoas até sabe o que fazer.

O problema é executar certo,
toda semana,
sem improvisar.

E deixa eu ser claro com você:

não é falta de disciplina.
É falta de direção.

É exatamente aí que quase todo mundo trava.

Foi por isso que o Método 8X foi criado.

Um sistema simples e estruturado
que te guia treino após treino,
sem depender de motivação
e sem adivinhar o que fazer.

Você abre o treino…
e já sabe exatamente o que fazer.

Você recebe um e-book
com 8 semanas de treino estruturado
e um aplicativo que guia sua execução
exercício por exercício,
série por série.

Sem improviso.
Sem dúvida.

Você não precisa acreditar.

Só testar.

O investimento é R$19,90,
com 7 dias de garantia.

Se não fizer sentido pra você,
eu devolvo cada centavo.
Sem perguntas.

Agora é simples.

Ou você continua treinando no escuro…

ou começa a fazer diferente
já no próximo treino.

Clica no botão abaixo
e entra no Método 8X agora.`;

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
