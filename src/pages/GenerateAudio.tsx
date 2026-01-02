import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Loader2, Volume2, Lock, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    const storedSession = sessionStorage.getItem('audio_gen_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.expires && Date.now() < session.expires) {
          setSessionToken(session.token);
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('audio_gen_session');
        }
      } catch {
        sessionStorage.removeItem('audio_gen_session');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    
    try {
      // Use dashboard-events for password validation (same password)
      const { data: response, error: fetchError } = await supabase.functions.invoke('dashboard-events', {
        body: { password },
        method: 'POST',
      });

      if (fetchError) {
        if (fetchError.message?.includes('401') || fetchError.message?.includes('Unauthorized')) {
          setAuthError('Senha incorreta');
        } else {
          setAuthError('Erro ao validar senha. Tente novamente.');
        }
        return;
      }

      if (response?.sessionToken && response?.sessionExpires) {
        const sessionData = {
          token: response.sessionToken,
          expires: response.sessionExpires
        };
        sessionStorage.setItem('audio_gen_session', JSON.stringify(sessionData));
        setSessionToken(response.sessionToken);
      }
      
      setIsAuthenticated(true);
      setPassword('');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.code === 'UNAUTHORIZED' || err?.message?.includes('Unauthorized')) {
        setAuthError('Senha incorreta');
      } else {
        setAuthError('Erro ao conectar. Tente novamente.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('audio_gen_session');
    setSessionToken(null);
    setIsAuthenticated(false);
    setPassword('');
    setAudioUrl(null);
  };

  const generateAudio = async () => {
    if (!sessionToken) {
      toast.error("Sessão inválida. Faça login novamente.");
      handleLogout();
      return;
    }

    setIsGenerating(true);
    toast.info("Gerando áudio... Isso pode levar alguns minutos.");

    try {
      const response = await fetch(
        `https://kfddlytvdzqwopongnew.supabase.co/functions/v1/generate-vsl-audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-dashboard-token": sessionToken,
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-2xl">Gerador de Áudio</CardTitle>
            <p className="text-muted-foreground text-sm">Digite a senha para acessar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
                disabled={isLoggingIn}
              />
              {authError && (
                <p className="text-destructive text-sm text-center">{authError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validando...
                  </>
                ) : (
                  'Acessar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Gerador de Áudio VSL
            </h1>
            <p className="text-muted-foreground">
              Clique no botão abaixo para gerar o áudio da VSL
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
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
