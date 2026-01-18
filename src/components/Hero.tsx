import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Lock, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

// --- LÓGICA DE ESCASSEZ PERSISTENTE (REAL) ---
const COUNTDOWN_KEY = 'metodo8x_timer_vfinal_real';
const INITIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Horas

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = useCallback((expiryTime) => {
    const now = new Date().getTime();
    const difference = expiryTime - now;
    if (difference <= 0) {
      setIsExpired(true);
      return 0;
    }
    return difference;
  }, []);

  useEffect(() => {
    let expiryTime = localStorage.getItem(COUNTDOWN_KEY);
    let targetTime;

    if (!expiryTime) {
      targetTime = new Date().getTime() + INITIAL_DURATION_MS;
      localStorage.setItem(COUNTDOWN_KEY, targetTime.toString());
    } else {
      targetTime = parseInt(expiryTime, 10);
    }

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetTime);
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    trackInitiateCheckout(19.9, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden bg-[#0a0a0a]">
        {/* Background glow - Laranja (Accent) conforme seu layout real */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ea580c]/5 rounded-full blur-[120px] opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* HOOK DE IDENTIFICAÇÃO - Design Fiel (Borda Laranja, Fundo Escuro) */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#ea580c]/10 border border-[#ea580c]/30 rounded-full px-5 py-2">
              <div className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-pulse flex-shrink-0" />
              <span className="text-[#ea580c] font-black text-[10px] sm:text-xs uppercase tracking-[0.15em]">
                VOCÊ TREINA, SE ESFORÇA, MAS SEU CORPO NÃO RESPONDE?
              </span>
            </div>
          </div>

          {/* HEADLINE */}
          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white tracking-tight mb-6">
            8 semanas para{' '}
            <span className="text-[#ea580c]">músculos que todo mundo nota</span> — sem
            improviso e sem perda de tempo.
          </h1>

          {/* SUB-HEADLINE */}
          <p className="text-base sm:text-lg text-white/70 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            <strong>Treino pronto</strong>, passo a passo, para você <strong>sair da estagnação</strong> e ver <strong>resultado no espelho</strong> — sem improviso.
          </p>

          {/* BLOCO DA IMAGEM (MOCKUP) */}
          <div className="relative w-full max-w-md mx-auto mb-10">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.15)_0%,transparent_70%)] blur-[60px] rounded-2xl" />
            <img
              src="/lovable-uploads/Mockup.png"
              alt="Capa do e-book e aplicativo Método 8X"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(234,88,12,0.2)]"
            />
          </div>

          {/* --- ESCASSEZ ESTRATÉGICA (DESIGN DE ELITE & CRO) --- */}
          {!isExpired && (
            <div className="flex flex-col items-center mb-10 animate-fade-in">
              {/* Urgência Real */}
              <div className="flex items-center gap-2 text-[#ea580c] font-black text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-4">
                <Zap className="w-3.5 h-3.5 fill-[#ea580c]" />
                <span>PROMOÇÃO VÁLIDA HOJE: <span className="font-mono text-white ml-1">{formatTime(remainingTime)}</span></span>
              </div>
              
              {/* Bloco de Oferta (Minimalista e Integrado) */}
              <div className="flex flex-col items-center">
                <div className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">
                  De <span className="line-through">R$ 97,00</span> por apenas:
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-white text-4xl sm:text-6xl font-black tracking-tighter">R$ 19,90</span>
                  <div className="flex flex-col items-start">
                    <span className="bg-[#ea580c] text-black text-[10px] sm:text-xs font-black px-2 py-0.5 rounded leading-none">79% OFF</span>
                    <span className="text-[#ea580c]/40 text-[8px] font-bold uppercase mt-1 tracking-widest">Único</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA - Botão Verde Validado */}
          <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-lg sm:text-xl py-8 font-black shadow-[0_10px_40px_rgba(34,197,94,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ACESSAR O MÉTODO 8X AGORA
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>

            {/* MICROCOPY - Design Limpo */}
            <div className="flex items-center justify-center gap-4 text-white/30 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Pagamento Seguro
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Acesso Imediato</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>7 Dias de Garantia</span>
            </div>

            {/* FRASE VALIDADA (A SUA "FERIDA") - Design de Alerta */}
            <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-red-500/5 border border-red-500/10 rounded-lg">
              <span className="text-red-500 text-xs sm:text-sm font-bold">
                ⚠️ Enquanto você hesita, outras pessoas já estão evoluindo.
              </span>
            </div>
          </div>
        </div>
      </section>

      <MiniPreCheckout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Hero;
