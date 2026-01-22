import React, { useEffect, useState } from "react";
import { CheckCircle2, Lock, X, AlertCircle, Zap } from "lucide-react";

const TIMER_KEY = "metodo8x_deadline";
const DURATION_24H = 24 * 60 * 60 * 1000;

interface MiniPreCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // redireciona para checkout
}

const MiniPreCheckout = ({
  isOpen,
  onClose,
  onConfirm,
}: MiniPreCheckoutProps) => {
  const [step, setStep] = useState<"qualificacao" | "confirmacao">(
    "qualificacao"
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [expired, setExpired] = useState(false);

  /* =============================
     TIMER — PC + MOBILE SAFE
  ============================== */
  useEffect(() => {
    if (!isOpen) return;

    let deadline: number;

    try {
      const stored = localStorage.getItem(TIMER_KEY);
      if (stored) {
        deadline = Number(stored);
      } else {
        deadline = Date.now() + DURATION_24H;
        localStorage.setItem(TIMER_KEY, deadline.toString());
      }
    } catch {
      // fallback WebView (Instagram / FB)
      deadline = Date.now() + DURATION_24H;
    }

    const interval = setInterval(() => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  /* =============================
     CONFIRMAÇÃO / EVENTO META
  ============================== */
  const handleConfirm = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }

    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-black p-6 shadow-2xl"
        style={{
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        {/* TIMER */}
        {!expired && timeLeft > 0 && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 p-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-red-500" />
              <span className="text-xs font-black uppercase text-red-500">
                Condição válida hoje
              </span>
            </div>
            <span className="text-xs font-mono font-black text-red-500">
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {/* STEP 1 */}
        {step === "qualificacao" && (
          <div className="space-y-8 text-center">
            <div>
              <h2 className="text-2xl font-black uppercase">
                Antes de continuar
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Confirme para liberar o acesso
              </p>
            </div>

            <button
              onClick={() => setStep("confirmacao")}
              className="w-full rounded-2xl bg-green-500 py-5 font-black uppercase text-white hover:bg-green-600"
            >
              Continuar
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === "confirmacao" && (
          <div className="space-y-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />

            <h2 className="text-2xl font-black uppercase">
              Acesso liberado
            </h2>

            <button
              onClick={handleConfirm}
              className="w-full rounded-2xl bg-green-500 py-6 font-black uppercase text-white hover:bg-green-600"
            >
              Ir para o checkout
            </button>

            <div className="space-y-1 text-xs text-white/40">
              <div className="flex justify-center items-center gap-1">
                <Lock className="h-3 w-3" /> Pagamento 100% seguro
              </div>
              <div className="flex justify-center items-center gap-1 text-red-500">
                <AlertCircle className="h-3 w-3" /> Condição ativa hoje
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPreCheckout;
