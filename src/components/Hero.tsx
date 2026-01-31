import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const handleCTAClick = () => setIsModalOpen(true);

  const handleConfirmPurchase = () => {
    const baseUrl =
      'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    trackInitiateCheckout(19.9, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:py-20 overflow-hidden gradient-hero">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* HULK DE IDENTIFICAÇÃO */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="inline-flex items-center bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 max-w-full">
              <span
                className="
                  text-accent font-black uppercase
                  whitespace-nowrap
                  tracking-normal sm:tracking-wide md:tracking-wider
                  max-w-[96vw]
                "
                style={{ fontSize: 'clamp(10px, 2.6vw, 15px)' }}
              >
                VOCÊ TREINA, SE ESFORÇA, MAS SEU CORPO NÃO RESPONDE?
              </span>
            </div>
          </div>

          {/* HEADLINE */}
          <h1 className="font-display text-[1.8rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] text-white tracking-tight mb-5 sm:mb-6">
            8 semanas para{' '}
            <span className="text-accent">
              músculos que todo mundo nota
            </span>{' '}
            — sem improviso e sem perda de tempo.
          </h1>

          {/* SUBHEADLINE */}
          <p className="text-lg sm:text-xl text-white/80 mb-7 sm:mb-9 font-medium max-w-3xl mx-auto leading-relaxed">
            <strong>Treino pronto</strong>, passo a passo, para você{' '}
            <strong>sair da estagnação</strong> e ver{' '}
            <strong>resultado no espelho</strong> — sem improviso.
          </p>

          {/* MOCKUP */}
          <div className="relative w-full max-w-[680px] sm:max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] h-[82%] bg-accent/20 rounded-full blur-[90px] opacity-30 pointer-events-none" />

           <img
  src="/lovable-uploads/Mockup.webp"
  alt="capa do e-book e aplicativo Método 8X"
  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
/>

          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 max-w-lg mx-auto">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 font-bold shadow-2xl shadow-green-500/40 transition-all flex items-center justify-center gap-2"
            >
              ACESSAR O MÉTODO 8X AGORA
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex items-center justify-center gap-3 text-white/70 text-xs flex-wrap">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pagamento Seguro
              </span>
              <span className="hidden sm:inline">|</span>
              <span>✅ Acesso Imediato</span>
              <span className="hidden sm:inline">|</span>
              <span>🛡️ 7 Dias de Garantia</span>
            </div>

            <p className="text-red-400 text-sm font-medium mt-3">
              ⚠️ Enquanto você hesita, outras pessoas já estão evoluindo
            </p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <MiniPreCheckout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Hero;
