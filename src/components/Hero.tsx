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

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl =
      'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';

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
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">
               Você treina, se esforça, mas seu corpo não responde?
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[1.8rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] text-white tracking-tight mb-4">
            8 semanas para{' '}
            <span className="text-accent">músculos que todo mundo nota</span> — sem
            improviso, sem perda de tempo
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 font-medium">
            Treino pronto, passo a passo, para você executar sem improviso
e finalmente ver resultado no espelho
          </p>

          {/* Mockup */}
          <div className="relative w-full max-w-md mx-auto mb-8">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.25)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            <img
              src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png"
              alt="Método 8X"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 max-w-lg mx-auto">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 font-bold shadow-2xl shadow-green-500/40 transition-all"
            >
              Acessar o Método 8X agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Microcopy */}
            <div className="flex items-center justify-center gap-3 text-white/60 text-xs flex-wrap">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pagamento Seguro
              </span>
              <span className="hidden sm:inline">|</span>
              <span>✅ Acesso Imediato</span>
              <span className="hidden sm:inline">|</span>
              <span>🛡️ 7 Dias de Garantia</span>
            </div>

            {/* Urgência leve */}
            <p className="text-red-400 text-sm font-medium mt-2">
              ⚠️ Enquanto você hesita, outras pessoas já estão vendo resultado no espelho.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      <MiniPreCheckout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Hero;
