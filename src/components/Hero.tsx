import React, { useState } from 'react';
import { ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

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
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden gradient-hero">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* HOOK DE IDENTIFICAÇÃO */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-1.5 sm:px-6 sm:py-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse flex-shrink-0" />
              <span className="text-accent font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider">
                VOCÊ TREINA, SE ESFORÇA, MAS SEU CORPO NÃO RESPONDE?
              </span>
            </div>
          </div>

          {/* HEADLINE */}
          <h1 className="font-display text-[1.8rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] text-white tracking-tight mb-4">
            8 semanas para{' '}
            <span className="text-accent">músculos que todo mundo nota</span> — sem
            improviso e sem perda de tempo.
          </h1>

          {/* SUB-HEADLINE */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 font-medium max-w-3xl mx-auto leading-relaxed">
            <strong>Treino pronto</strong>, passo a passo, para você <strong>sair da estagnação</strong> e ver <strong>resultado no espelho</strong> — sem improviso.
          </p>

          {/* BLOCO DA IMAGEM */}
          <div className="relative w-full max-w-md mx-auto mb-12">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.25)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            <img
              src="/lovable-uploads/Mockup.png"
              alt="Capa do e-book e aplicativo Método 8X"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* CTA - BOTÃO EM CAIXA ALTA E LINHA ÚNICA NO MOBILE */}
          <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-lg py-7 font-black shadow-2xl shadow-green-500/40 transition-all whitespace-nowrap overflow-hidden"
            >
              ACESSAR O MÉTODO 8X AGORA
              <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
            </Button>

            {/* MICROCOPY - DESIGN ELEGANTE */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-white/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>✅ Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🛡️ 7 Dias de Garantia</span>
              </div>
            </div>

        {/* URGÊNCIA SUTIL */}
            <p className="text-red-400 text-sm font-medium mt-2">
              ⚠️ Enquanto você hesita, outras pessoas já estão evoluindo.
            </p>
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
