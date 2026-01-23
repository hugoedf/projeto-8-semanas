import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, X, AlertCircle, Zap } from 'lucide-react';

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

  // LÓGICA DE ESCASSEZ PERSISTENTE E DINÂMICA
  useEffect(() => {
    // 1. Tentar recuperar vagas salvas ou definir inicial
    const savedVagas = localStorage.getItem('metodo8x_vagas');
    const lastUpdate = localStorage.getItem('metodo8x_vagas_time');
    const now = Date.now();

    let currentVagas = savedVagas ? parseInt(savedVagas) : 12;

    // 2. Se passou muito tempo desde o último acesso, reduzir vagas automaticamente
    if (lastUpdate) {
      const diffMinutes = Math.floor((now - parseInt(lastUpdate)) / 60000);
      if (diffMinutes > 0) {
        currentVagas = Math.max(3, currentVagas - Math.floor(diffMinutes / 5)); // Reduz 1 vaga a cada 5 min
      }
    }

    setVagas(currentVagas);
    localStorage.setItem('metodo8x_vagas', currentVagas.toString());
    localStorage.setItem('metodo8x_vagas_time', now.toString());

    // 3. Intervalo para reduzir enquanto o usuário está na página
    const interval = setInterval(() => {
      setVagas(prev => {
        const newVal = prev > 3 ? prev - 1 : prev;
        localStorage.setItem('metodo8x_vagas', newVal.toString());
        return newVal;
      });
    }, 45000); // Reduz a cada 45 segundos de tela aberta

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia) {
      setStep('confirmacao');
    } else {
      alert('Por favor, responda todas as perguntas para continuar.');
    }
  };

  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => {
      setStep('qualificacao');
      setQualificacao({});
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#050505] border border-accent/30 rounded-[3rem] p-6 sm:p-10 shadow-[0_0_80px_rgba(255,87,34,0.2)] max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        
        {/* Badge de Urgência Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent px-6 py-2 rounded-full shadow-xl z-10 whitespace-nowrap">
          <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
            <Zap className="w-3 h-3 fill-white" /> Vagas Limitadas: {vagas} Restantes
          </span>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>
        
        {step === 'qualificacao' ? (
          <div className="space-y-8 pt-4">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-none uppercase tracking-tighter">
                Análise de   
 <span className="text-accent">Perfil</span>
              </h2>
              <p className="text-sm text-white/50 font-medium">
                Responda rápido para validar seu acesso:
              </p>
            </div>

            <div className="space-y-6">
              {/* Pergunta 1 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block ml-2">
                  Qual seu principal objetivo?
                </label>
                <div className="space-y-2">
                  {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, objetivo: label })}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 ${
                        qualificacao.objetivo === label 
                          ? 'border-accent bg-accent/10 shadow-[0_0_30px_rgba(255,87,34,0.15)]' 
                          : 'border-white/5 bg-white/[0.03] hover:bg-white/[0.08]'
                      }`}
                    >
                      <span className={`font-black text-sm sm:text-base ${qualificacao.objetivo === label ? 'text-white' : 'text-white/60'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block ml-2">
                  Acesso a academia?
                </label>
                <div className="space-y-2">
                  {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(label => (
                    <button
                      key={label}
                      onClick={() => setQualificacao({ ...qualificacao, academia: label })}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 ${
                        qualificacao.academia === label 
                          ? 'border-accent bg-accent/10 shadow-[0_0_30px_rgba(255,87,34,0.15)]' 
                          : 'border-white/5 bg-white/[0.03] hover:bg-white/[0.08]'
                      }`}
                    >
                      <span className={`font-black text-sm sm:text-base ${qualificacao.academia === label ? 'text-white' : 'text-white/60'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleQualificacaoSubmit}
              className="w-full bg-gradient-to-r from-accent to-[#FF7043] hover:brightness-110 text-white font-black text-xl py-7 rounded-2xl transition-all shadow-[0_15px_40px_rgba(255,87,34,0.3)] uppercase tracking-tight"
            >
              CONTINUAR
            </button>
          </div>
        ) : (
          <div className="space-y-8 pt-4">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/50">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-none uppercase tracking-tighter">
                Perfil   
 <span className="text-green-500">Aprovado!</span>
              </h2>
              <p className="text-sm text-white/50 font-medium">
                O Método 8X é exatamente o que você precisa.
              </p>
            </div>

            <div className="space-y-3 bg-white/[0.03] p-6 rounded-[2rem] border border-white/5">
              {[
                "Treino estruturado por 8 semanas",
                "Progressão definida (sem improviso)",
                "Aplicativo + Ebook inclusos",
                "Garantia incondicional de 7 dias"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-white/90 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:brightness-110 text-white font-black text-xl py-7 rounded-2xl transition-all shadow-[0_15px_40px_rgba(34,197,94,0.3)] uppercase tracking-tight"
              >
                LIBERAR MEU ACESSO
              </button>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                  <Lock className="w-3 h-3" /> Transação Criptografada
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                    <AlertCircle className="w-3 h-3" /> Restam apenas {vagas} vagas hoje
                  </div>
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
