import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, X, AlertCircle } from 'lucide-react';

interface MiniPreCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MiniPreCheckout = ({ isOpen, onClose, onConfirm }: MiniPreCheckoutProps) => {
  const [step, setStep] = useState<'qualificacao' | 'confirmacao'>('qualificacao');
  const [vagas, setVagas] = useState(12);
  const [qualificacao, setQualificacao] = useState<{
    objetivo?: string;
    academia?: string;
  }>({});

  // Efeito para simular escassez real
  useEffect(() => {
    const interval = setInterval(() => {
      setVagas(prev => (prev > 3 ? prev - 1 : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia) {
      setStep('confirmacao');
    } else {
      alert('Por favor, responda todas as perguntas para continuar.');
    }
  };

  const handleConfirm = () => {
    onConfirm();
    // Resetar para o estado inicial após fechar
    setTimeout(() => {
      setStep('qualificacao');
      setQualificacao({});
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-accent/20 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_0_50px_rgba(255,87,34,0.15)] max-h-[90vh] overflow-y-auto animate-scale-in">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {step === 'qualificacao' ? (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tighter">
                Antes de começar
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                Responda 2 perguntas rápidas para garantir que o Método 8X é perfeito pra você:
              </p>
            </div>

            <div className="space-y-6">
              {/* Pergunta 1 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block">
                  Qual seu principal objetivo?
                </label>
                <div className="space-y-2">
                  {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, objetivo: label })}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                        qualificacao.objetivo === label 
                          ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className={`font-bold text-sm ${qualificacao.objetivo === label ? 'text-green-400' : 'text-white/70'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block">
                  Acesso a academia?
                </label>
                <div className="space-y-2">
                  {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, academia: label })}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                        qualificacao.academia === label 
                          ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className={`font-bold text-sm ${qualificacao.academia === label ? 'text-green-400' : 'text-white/70'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleQualificacaoSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg py-6 rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase tracking-tight"
            >
              CONTINUAR
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tighter">
                Você está pronto!
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-medium">
                O Método 8X foi feito exatamente para o seu perfil.
              </p>
            </div>

            <div className="space-y-3 bg-white/5 p-5 rounded-3xl border border-white/5">
              {[
                "Treino estruturado por 8 semanas",
                "Progressão definida (sem improviso)",
                "Aplicativo + Ebook inclusos",
                "Garantia incondicional de 7 dias"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg py-6 rounded-2xl transition-all shadow-xl shadow-green-500/20 uppercase tracking-tight"
              >
                LIBERAR MEU ACESSO AGORA
              </button>
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Lock className="w-3 h-3" /> Pagamento 100% Seguro
                </div>
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
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
