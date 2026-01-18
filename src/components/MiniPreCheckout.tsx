import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, Clock, X, AlertCircle, Zap, Users } from 'lucide-react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

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
  
  // Usando o hook de cronômetro persistente e sincronizado
  const { formattedTime, isExpired } = useCountdownTimer();
  const [vagas, setVagas] = useState(12);

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

        {/* Badge de Urgência Real e Sincronizada */}
        {!isExpired && (
          <div className="mb-6 flex items-center justify-between gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500 fill-red-500/20" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-red-500">
                PROMOÇÃO VÁLIDA HOJE
              </span>
            </div>
            <span className="text-xs font-mono text-red-500 font-black">
              {formattedTime}
            </span>
          </div>
        )}

        {/* STEP 1: QUALIFICAÇÃO */}
        {step === 'qualificacao' && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                Antes de começar
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                Responda 3 perguntas rápidas para garantir que o Método 8X é perfeito pra você:
              </p>
            </div>

            <div className="space-y-6">
              {/* Pergunta 1 */}
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest block">
                  Qual seu principal objetivo?
                </label>
                <div className="space-y-2">
                  {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, objetivo: label })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        qualificacao.objetivo === label ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <span className="text-white font-bold text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest block">
                  Acesso a academia?
                </label>
                <div className="space-y-2">
                  {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, academia: label })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        qualificacao.academia === label ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <span className="text-white font-bold text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleQualificacaoSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-6 rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase whitespace-nowrap overflow-hidden"
            >
              CONTINUAR
            </button>
          </div>
        )}

        {/* STEP 2: CONFIRMAÇÃO */}
        {step === 'confirmacao' && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                Você está pronto!
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                O Método 8X foi feito exatamente para você.
              </p>
            </div>

            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              {["Treino estruturado por 8 semanas", "Progressão definida (sem improviso)", "Aplicativo + Ebook inclusos", "Garantia incondicional de 7 dias"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleConfirm}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-6 rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase whitespace-nowrap overflow-hidden"
              >
                LIBERAR MEU ACESSO AGORA
              </button>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Pagamento 100% Seguro
                </div>
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <AlertCircle className="w-3 h-3" /> Restam apenas {vagas} vagas hoje
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
