import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, Clock, X, AlertCircle, Zap, Users } from 'lucide-react';

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
  
  // Lógica de Urgência Real com Memória
  const TIMER_KEY = 'metodo8x_timer';
  const INITIAL_TIME = 15 * 60; // 15 minutos em segundos
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [vagas, setVagas] = useState(12);

  useEffect(() => {
    // Tenta recuperar o tempo já iniciado no navegador do usuário
    const savedTime = localStorage.getItem(TIMER_KEY);
    if (savedTime) {
      const remaining = parseInt(savedTime, 10);
      setTimeLeft(remaining > 0 ? remaining : 0);
    } else {
      localStorage.setItem(TIMER_KEY, INITIAL_TIME.toString());
    }
  }, []);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const nextValue = prev - 1;
        localStorage.setItem(TIMER_KEY, nextValue.toString());
        return nextValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Badge de Urgência */}
        <div className="mb-6 flex items-center justify-between gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-tight">
              A oferta expira em
            </span>
          </div>
          <span className="text-sm font-mono text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* STEP 1: QUALIFICAÇÃO */}
        {step === 'qualificacao' && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Antes de começar, deixa eu confirmar uma coisa
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                Responda 3 perguntas rápidas para garantir que o Método 8X é perfeito pra você:
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">
                Qual seu principal objetivo?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'ganhar', label: '💪 Ganhar massa muscular' },
                  { value: 'definir', label: '✨ Definir e perder gordura' },
                  { value: 'forca', label: '⚡ Aumentar força' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setQualificacao({ ...qualificacao, objetivo: option.value })}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      qualificacao.objetivo === option.value
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">
                Você tem acesso a uma academia?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'sim', label: '✅ Sim, treino regularmente' },
                  { value: 'as-vezes', label: '🤔 Às vezes' },
                  { value: 'nao', label: '❌ Não, treino em casa' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setQualificacao({ ...qualificacao, academia: option.value })}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      qualificacao.academia === option.value
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">
                Quanto tempo você pode dedicar por dia?
              </label>
              <div className="space-y-2">
                {[
                  { value: '30', label: '⏱️ 30 minutos' },
                  { value: '45', label: '⏱️ 45 minutos' },
                  { value: '60+', label: '⏱️ 1 hora ou mais' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setQualificacao({ ...qualificacao, tempo: option.value })}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      qualificacao.tempo === option.value
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={handleQualificacaoSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-black text-lg py-7 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-500/20"
              >
                CONTINUAR
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] sm:text-xs">
                <Clock className="w-3 h-3" />
                <span>Leva menos de 30 segundos</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONFIRMAÇÃO */}
        {step === 'confirmacao' && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Perfeito! Você está pronto
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                O Método 8X foi feito exatamente para você. Veja o que você vai receber:
              </p>
            </div>

            <div className="space-y-3">
              {[
                "✅ Treino estruturado por 8 semanas",
                "✅ Progressão definida (sem improviso)",
                "✅ Aplicativo + Ebook inclusos",
                "✅ Acesso imediato após a compra",
                "✅ Garantia incondicional de 7 dias"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-white text-xs sm:text-sm font-bold">
                  +500 pessoas já transformaram seus treinos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-400 text-xs">Avaliação média 4.9/5</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span className="text-white text-xs sm:text-sm font-bold">
                  Pagamento 100% seguro pela Hotmart
                </span>
              </div>
              <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
                Cancelamento simples em até 7 dias, sem burocracia
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-black text-lg py-7 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-500/20"
              >
                LIBERAR MEU ACESSO AO APP
              </button>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] sm:text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Leva menos de 1 minuto para concluir</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-red-500 text-[10px] sm:text-xs font-bold">
                  <AlertCircle className="w-3 h-3" />
                  <span>Restam {vagas} vagas hoje</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('qualificacao')}
              className="w-full text-center text-gray-400 hover:text-gray-300 text-xs transition-colors"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPreCheckout;
