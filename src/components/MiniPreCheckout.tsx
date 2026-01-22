import React, { useState, useEffect } from "react";
import { CheckCircle2, Lock, X, AlertCircle, Zap } from "lucide-react";

const TIMER_STORAGE_KEY = "metodo8x_countdown_deadline";
const DURATION_24H = 24 * 60 * 60 * 1000;

interface MiniPreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MiniPreCheckout = ({
  isOpen,
  onClose,
  onConfirm,
}: MiniPreCheckoutModalProps) => {
  const [step, setStep] = useState<"qualificacao" | "confirmacao">(
    "qualificacao"
  );

  const [qualificacao, setQualificacao] = useState<{
    objetivo?: string;
    academia?: string;
    tempo?: string;
  }>({});

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [vagas] = useState(12);

  /* =============================
     TIMER — MOBILE SAFE
  ============================== */
  useEffect(() => {
    if (!isOpen) return;

    let deadline: number;

    try {
      const stored = localStorage.getItem(TIMER_STORAGE_KEY);
      if (stored) {
        deadline = Number(stored);
      } else {
        deadline = Date.now() + DURATION_24H;
        localStorage.setItem(TIMER_STORAGE_KEY, deadline.toString());
      }
    } catch {
      // fallback WebView
      deadline = Date.now() + DURATION_24H;
    }

    const updateTimer = () => {
      const now = Date.now();
      const distance = deadline - now;

      if (distance <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        return;
      }
      setTimeLeft(distance);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (ms: number | null) => {
    if (ms === null) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia && qualificacao.tempo) {
      setStep("confirmacao");
    } else {
      alert("Por favor, responda todas as perguntas");
    }
  };

  const handleConfirm = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }

    onConfirm();
    setStep("qualificacao");
    setQualificacao({});
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/90"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="relative w-full max-w-md bg-black border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
        style={{
          maxHeight: "min(90vh, calc(100vh - 32px))",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* ✅ CORRIGIDO: Banner de urgência responsivo para mobile */}
        {!isExpired && (
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-black uppercase text-red-500 whitespace-nowrap">
                Promoção válida hoje
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-red-500 font-black">
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {/* STEP 1: QUALIFICAÇÃO */}
        {step === "qualificacao" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                Antes de começar
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Responda 3 perguntas rápidas para garantir que o Método 8X é perfeito pra você:
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Pergunta 1 */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest block">
                  Qual seu principal objetivo?
                </label>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    "💪 Ganhar massa muscular",
                    "✨ Definir e perder gordura",
                    "⚡ Aumentar força",
                  ].map((label) => (
                    <button
                      key={label}
                      onClick={() =>
                        setQualificacao({ ...qualificacao, objetivo: label })
                      }
                      className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm ${
                        qualificacao.objetivo === label
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="text-white font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest block">
                  Acesso a academia?
                </label>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    "✅ Sim, treino regularmente",
                    "🤔 Às vezes",
                    "❌ Não, treino em casa",
                  ].map((label) => (
                    <button
                      key={label}
                      onClick={() =>
                        setQualificacao({ ...qualificacao, academia: label })
                      }
                      className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm ${
                        qualificacao.academia === label
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="text-white font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 3 */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest block">
                  Quanto tempo para treinar por dia?
                </label>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    "⏱️ Menos de 30 minutos",
                    "⏰ 30-60 minutos",
                    "🏋️ 60-90 minutos",
                    "💪 Mais de 90 minutos",
                  ].map((label) => (
                    <button
                      key={label}
                      onClick={() =>
                        setQualificacao({ ...qualificacao, tempo: label })
                      }
                      className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm ${
                        qualificacao.tempo === label
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="text-white font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleQualificacaoSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase whitespace-nowrap overflow-hidden text-sm sm:text-base"
            >
              Continuar
            </button>
          </div>
        )}

        {/* STEP 2: CONFIRMAÇÃO */}
        {step === "confirmacao" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="flex justify-center mb-2 sm:mb-3">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                Você está pronto!
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                O Método 8X foi feito exatamente para você.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 bg-white/5 p-3 sm:p-4 rounded-lg sm:rounded-2xl border border-white/5">
              {[
                "Treino estruturado por 8 semanas",
                "Progressão definida (sem improviso)",
                "Aplicativo + Ebook inclusos",
                "Garantia incondicional de 7 dias",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-xs sm:text-sm font-bold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleConfirm}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase whitespace-nowrap overflow-hidden text-sm sm:text-base"
              >
                Liberar meu acesso agora
              </button>

              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 sm:gap-2 text-white/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                  <Lock className="w-3 h-3 flex-shrink-0" /> Pagamento 100% Seguro
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-red-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" /> Restam apenas {vagas} vagas hoje
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPreCheckout;
