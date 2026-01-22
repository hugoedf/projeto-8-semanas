import React, { useState, useEffect } from "react";
import { CheckCircle2, Lock, X, AlertCircle, Zap } from "lucide-react";

const TIMER_STORAGE_KEY = "metodo8x_countdown_deadline";
const DURATION_24H = 24 * 60 * 60 * 1000;

interface MiniPreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // checkout real
}

const MiniPreCheckout = ({
  isOpen,
  onClose,
  onConfirm,
}: MiniPreCheckoutModalProps) => {
  const [step, setStep] = useState<"qualificacao" | "confirmacao">(
    "qualificacao"
  );

  const [qualificacao] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let deadline = localStorage.getItem(TIMER_STORAGE_KEY);

    if (!deadline) {
      const targetTime = Date.now() + DURATION_24H;
      localStorage.setItem(TIMER_STORAGE_KEY, targetTime.toString());
      deadline = targetTime.toString();
    }

    const targetTime = Number(deadline);

    const interval = setInterval(() => {
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleConfirm = () => {
    // 🔥 EVENTO CORRETO
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }

    // se tiver CAPI, esse é o ponto também

    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {!isExpired && timeLeft > 0 && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="text-xs font-black uppercase text-red-500">
                Promoção válida hoje
              </span>
            </div>
            <span className="text-xs font-mono text-red-500 font-black">
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {step === "qualificacao" ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black uppercase">
                Antes de começar
              </h2>
              <p className="text-sm text-gray-400">
                Responda 3 perguntas rápidas
              </p>
            </div>

            <button
              onClick={() => setStep("confirmacao")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl uppercase"
            >
              Continuar
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />

            <h2 className="text-2xl font-black text-center uppercase">
              Você está pronto
            </h2>

            <button
              onClick={handleConfirm}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-6 rounded-2xl uppercase"
            >
              Liberar meu acesso agora
            </button>

            <div className="text-center text-xs text-white/40 space-y-1">
              <div className="flex justify-center gap-1 items-center">
                <Lock className="w-3 h-3" /> Pagamento 100% seguro
              </div>
              <div className="flex justify-center gap-1 items-center text-red-500">
                <AlertCircle className="w-3 h-3" /> Últimas vagas hoje
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPreCheckout;
