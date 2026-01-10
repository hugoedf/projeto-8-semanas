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
    console.log('✅ ===== CHECKOUT INICIADO (HERO - APÓS CONFIRMAÇÃO NO MODAL) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-1.5 shadow-lg shadow-accent/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">+500 Transformações Reais</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05] text-white tracking-tight mb-3 px-1 sm:px-0 text-center">
            8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl leading-snug text-white/80 mb-8 px-1 sm:px-0 font-medium text-center">
            Descubra o método científico que transforma esforço em resultado visível no espelho
          </p>

          {/* Mockup */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto mb-8">
            {/* Orange Glow - subtle and elegant */}
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.2)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            {/* Mockup Image */}
            <img src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" alt="Método 8X - Transformação Garantida" className="relative z-20 w-full h-auto object-contain transform scale-105 drop-shadow-2xl" />
          </div>

          {/* Definição / reforço de autoridade abaixo do mockup */}
          <p className="text-white/70 text-center lg:text-center mb-8 max-w-lg px-1 sm:px-0 mx-auto">
            Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para <span className="text-accent font-bold">garantir evolução</span>.
          </p>

          {/* CTA Desktop - GREEN (Decision Button #1) */}
          <div className="hidden lg:flex flex-col items-center gap-3 w-full max-w-lg mx-auto">
            <Button 
              onClick={handleCTAClick} 
              className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-lg py-6 font-bold" 
              size="cta"
            >
              Acessar o Método 8X agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* Microcopy under green button */}
            <div className="flex items-center justify-center gap-3 text-white/60 text-xs w-full">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
              <span>|</span>
              <span>✅ Acesso Imediato</span>
              <span>|</span>
              <span>🛡️ 7 Dias de Garantia</span>
            </div>
            {/* Frase psicológica */}
            <p className="text-red-400 text-sm sm:text-base font-medium mt-1">
              ⚠️ Enquanto você hesita, outros estão evoluindo. <span className="text-red-300 font-bold">Cada dia sem método é tempo perdido.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Mobile - Fixed Bottom - GREEN (Decision Button #1) */}
      <div className="lg:hidden w-full px-4 pb-6 relative z-20 fixed bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto space-y-3">
          <Button 
            onClick={handleCTAClick} 
            className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-base py-5 font-bold" 
            size="cta"
          >
            Acessar o Método 8X agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          {/* Microcopy under green button */}
          <div className="flex items-center justify-center gap-2 text-white/60 text-[10px] flex-wrap">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
            <span>|</span>
            <span>✅ Acesso Imediato</span>
            <span>|</span>
            <span>🛡️ 7 Dias de Garantia</span>
          </div>
          
          <p className="text-red-400 text-sm font-medium text-center">
            ⚠️ Enquanto você hesita, outros estão evoluindo.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex opacity-40 z-10">
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/30 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Modal de confirmação */}
      <MiniPreCheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Hero;
