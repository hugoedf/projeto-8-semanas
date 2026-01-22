import React, { useState } from "react";
import { Check, Lock, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const PreCheckout = () => {
  const [step, setStep] = useState<'qualificacao' | 'confirmacao'>('qualificacao');
  const [qualificacao, setQualificacao] = useState<{objetivo?: string; academia?: string; tempo?: string;}>({});

  const handleQualificacaoSubmit = () => {
    if (qualificacao.objetivo && qualificacao.academia && qualificacao.tempo) { setStep('confirmacao'); }
    else { alert('Por favor, responda todas as perguntas'); }
  };

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    window.location.href = buildHotmartCheckoutUrl(baseUrl );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl sm:text-4xl text-white text-center mb-8 font-black uppercase">Você está a <span className="text-green-500">8 semanas</span> de mudar seu corpo</h1>
        
        {step === 'qualificacao' ? (
          <div className="space-y-6 bg-white/5 border border-white/10 rounded-3xl p-8">
            {/* Pergunta 1 */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Objetivo?</label>
              {['💪 Ganhar massa muscular', '✨ Definir e perder gordura', '⚡ Aumentar força'].map(l => (
                <button key={l} onClick={() => setQualificacao({...qualificacao, objetivo: l})} className={`w-full text-left p-4 rounded-xl border transition-all ${qualificacao.objetivo === l ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>{l}</button>
              ))}
            </div>
            {/* Pergunta 2 */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Academia?</label>
              {['✅ Sim, treino regularmente', '🤔 Às vezes', '❌ Não, treino em casa'].map(l => (
                <button key={l} onClick={() => setQualificacao({...qualificacao, academia: l})} className={`w-full text-left p-4 rounded-xl border transition-all ${qualificacao.academia === l ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>{l}</button>
              ))}
            </div>
            {/* Pergunta 3 */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Tempo de treino?</label>
              {['🆕 Iniciante', '📈 Intermediário', '🔥 Avançado'].map(l => (
                <button key={l} onClick={() => setQualificacao({...qualificacao, tempo: l})} className={`w-full text-left p-4 rounded-xl border transition-all ${qualificacao.tempo === l ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>{l}</button>
              ))}
            </div>
            <Button onClick={handleQualificacaoSubmit} className="w-full bg-green-500 py-6 font-bold rounded-2xl">CONTINUAR</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              {["Treino estruturado", "Progressão definida", "App + Ebook", "Garantia 7 dias"].map(i => (
                <div key={i} className="flex items-center gap-3 text-white"><Check className="text-green-500" /> {i}</div>
              ))}
            </div>
            <Button onClick={handleCTAClick} className="w-full bg-green-500 py-8 text-xl font-black rounded-2xl">IR PARA PAGAMENTO SEGURO <ArrowRight className="ml-2" /></Button>
            <p className="text-white/50 text-center text-sm"><Clock className="inline w-4 h-4 mr-1" /> Leva menos de 1 minuto</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PreCheckout;
