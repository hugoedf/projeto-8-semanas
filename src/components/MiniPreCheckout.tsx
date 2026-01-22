import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, X, AlertCircle, Zap } from 'lucide-react';

const TIMER_STORAGE_KEY = 'metodo8x_countdown_deadline';
const DURATION_24H = 24 * 60 * 60 * 1000;

interface MiniPreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MiniPreCheckout = ({ isOpen, onClose, onConfirm }: MiniPreCheckoutModalProps) => {
  const [step, setStep] = useState<'qualificacao' | 'confirmacao'>('qualificacao');
  const [qualificacao, setQualificacao] = useState<{objetivo?: string; academia?: string; tempo?: string;}>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [vagas] = useState(12);

  useEffect(() => {
    let deadline = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!deadline) {
      const targetTime = new Date().getTime() + DURATION_24H;
      localStorage.setItem(TIMER_STORAGE_KEY, targetTime.toString());
      deadline = targetTime.toString();
    }
    const targetTime = parseInt(deadline, 10);
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;
      if (distance <= 0) { setTimeLeft(0); setIsExpired(true); return; }
      setTimeLeft(distance);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number | null) => {
    if (ms === null) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia && qualificacao.tempo) {
      setStep('confirmacao');
    } else {
      alert('Por favor, responda todas as perguntas');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>

        {!isExpired && (
          <div className="mb-6 flex items-center justify-between gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500 fill-red-500/20" />
              <span className="text-xs sm:text-sm font-black uppercase text-red-500">PROMOÇÃO VÁLIDA HOJE</span>
            </div>
            <span className="text-xs font-mono text-red-500 font-black">{formatTime(timeLeft)}</span>
          </div>
        )}

        {step === 'qualificacao' ? (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-black text-white uppercase">Antes de começar</h2>
              <p className="text-sm text-gray-400">Responda 3 perguntas rápidas:</p>
            </div>
            <div className="space-y-6">
              {/* Pergunta 1 */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Objetivo?</label>
                {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(l => (
                  <button key={l} onClick={() => setQualificacao({...qualificacao, objetivo: l})} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${qualificacao.objetivo === l ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{l}</button>
                ))}
              </div>
              {/* Pergunta 2 */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Academia?</label>
                {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(l => (
                  <button key={l} onClick={() => setQualificacao({...qualificacao, academia: l})} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${qualificacao.academia === l ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{l}</button>
                ))}
              </div>
              {/* Pergunta 3 */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Tempo de treino?</label>
                {['🆕 Iniciante', '📈 Intermediário', '🔥 Avançado'].map(l => (
                  <button key={l} onClick={() => setQualificacao({...qualificacao, tempo: l})} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${qualificacao.tempo === l ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{l}</button>
                ))}
              </div>
            </div>
            <button onClick={handleQualificacaoSubmit} className="w-full bg-green-500 text-white font-black py-6 rounded-2xl uppercase">CONTINUAR</button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-black text-white uppercase">Você está pronto!</h2>
            </div>
            <button onClick={onConfirm} className="w-full bg-green-500 text-white font-black py-6 rounded-2xl uppercase">LIBERAR MEU ACESSO AGORA</button>
            <div className="text-center space-y-2">
              <div className="text-white/30 text-[10px] font-black uppercase tracking-widest"><Lock className="w-3 h-3 inline mr-1" /> Pagamento Seguro</div>
              <div className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse"><AlertCircle className="w-3 h-3 inline mr-1" /> Restam apenas {vagas} vagas</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MiniPreCheckout;
