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
  const [qualificacao, setQualificacao] = useState<{
    objetivo?: string;
    academia?: string;
    tempo?: string;
  }>({});
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [vagas] = useState(12);

  useEffect(() => {
    let deadline = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!deadline) {
      const targetTime = new Date().getTime() + DURATION_24H;
      localStorage.setItem(TIMER_STORAGE_KEY, targetTime.toString());
      deadline = targetTime.toString();
    }
    const targetTime = parseInt(deadline, 10);
    const interval = setInterval(() => {
      const distance = targetTime - new Date().getTime();
      if (distance <= 0) { setTimeLeft(0); return; }
      setTimeLeft(distance);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia && qualificacao.tempo) {
      setStep('confirmacao');
    } else {
      alert('Por favor, responda todas as perguntas');
    }
  };

  const handleConfirm = () => {
    onConfirm();
    setStep('qualificacao');
    setQualificacao({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
        
        {step === 'qualificacao' ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase text-center">Antes de começar</h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase block">Qual seu principal objetivo?</label>
                <div className="space-y-2">
                  {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(label => (
                    <button key={label} onClick={() => setQualificacao({...qualificacao, objetivo: label})} className={`w-full text-left p-4 rounded-xl border-2 ${qualificacao.objetivo === label ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase block">Acesso a academia?</label>
                <div className="space-y-2">
                  {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(label => (
                    <button key={label} onClick={() => setQualificacao({...qualificacao, academia: label})} className={`w-full text-left p-4 rounded-xl border-2 ${qualificacao.academia === label ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase block">Tempo de treino?</label>
                <div className="space-y-2">
                  {['🆕 Iniciante', '🏋️ Intermediário', '🔥 Avançado'].map(label => (
                    <button key={label} onClick={() => setQualificacao({...qualificacao, tempo: label})} className={`w-full text-left p-4 rounded-xl border-2 ${qualificacao.tempo === label ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleQualificacaoSubmit} className="w-full bg-green-500 text-white font-black py-6 rounded-2xl uppercase">CONTINUAR</button>
          </div>
        ) : (
          <div className="space-y-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <h2 className="text-2xl font-black text-white uppercase">Você está pronto!</h2>
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
              {["Treino estruturado por 8 semanas", "Progressão definida", "Aplicativo + Ebook inclusos", "Garantia incondicional de 7 dias"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
            <button onClick={handleConfirm} className="w-full bg-green-500 text-white font-black py-6 rounded-2xl uppercase">LIBERAR MEU ACESSO AGORA</button>
            <div className="flex flex-col items-center gap-2 text-[10px] font-black uppercase text-red-500 animate-pulse">
              <AlertCircle className="w-3 h-3" /> Restam apenas {vagas} vagas hoje
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPreCheckout;
