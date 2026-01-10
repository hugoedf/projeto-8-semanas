import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniPreCheckoutModal } from './MiniPreCheckoutModal';
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
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero">
        
        <div className="relative z-10 w-full max-w-4xl text-center">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">
                +500 Transformações Reais
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05] text-white tracking-tight mb-3">
            8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
          </h1>

          {/* Subheadline OTIMIZADA */}
          <p className="text-lg sm:text-xl lg:text-2xl leading-snug text-white/80 mb-4 font-medium">
            Treino pronto, passo a passo, para você só executar e ver resultado no espelho
          </p>

          {/* Fechamento de promessa */}
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para{' '}
            <span className="text-accent font-bold">garantir evolução</span>.
          </p>

          {/* CTA PRINCIPAL */}
          <div className="hidden lg:flex flex-col items-center gap-3 w-full max-w-lg mx-auto mb-10">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-lg py-6 font-bold"
              size="cta"
            >
              Quero parar de improvisar no treino
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex items-center justify-center gap-3 text-white/60 text-xs">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
              <span>|</span>
              <span>✅ Acesso Imediato</span>
              <span>|</span>
              <span>🛡️ 7 Dias de Garantia</span>
            </div>

            <p className="text-red-400 text-sm font-medium">
              ⚠️ Enquanto você hesita, outros estão evoluindo.
            </p>
          </div>

          {/* Mockup (AGORA APÓS CTA) */}
          <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.2)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            <img
              src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png"
              alt="Método 8X"
              className="relative z-20 w-full h-auto object-contain scale-105 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CTA MOBILE FIXO */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 px-4 pb-6 z-20">
        <Button
          onClick={handleCTAClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 text-base py-5 font-bold"
        >
          Quero parar de improvisar no treino
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      <MiniPreCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Hero;
