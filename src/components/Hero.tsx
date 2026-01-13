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

  const handleCTAClick = () => {import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { ArrowRight, Check, Shield, Smartphone, Zap, Lock } from "lucide-react";
import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniPreCheckoutModal } from './MiniPreCheckoutModal';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (HERO) =====');
    console.log('✅ ===== CHECKOUT INICIADO (HERO - APÓS CONFIRMAÇÃO NO MODAL) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-black pt-4 sm:pt-8">
      {/* Gradient overlays - pure black base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsla(18,100%,50%,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,hsla(18,100%,50%,0.06),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center max-w-7xl mx-auto w-full">

          {/* Content Column */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start order-2 lg:order-1">
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-1.5 mb-3 shadow-lg shadow-accent/10">
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
            <h1 className="font-display text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05] text-white tracking-tight mb-3 px-1 sm:px-0">
              8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl leading-snug text-white/80 mb-4 px-1 sm:px-0 font-medium">
              Descubra o método científico que transforma esforço em resultado visível no espelho
            </p>

            {/* Mockup */}
            <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto mb-4">
              {/* Orange Glow - subtle and elegant */}
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.2)_0%,transparent_60%)] blur-[45px] rounded-2xl" />

              {/* Mockup Image */}
              <img src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" alt="Método 8X - Transformação Garantida" className="relative z-20 w-full h-auto object-contain transform scale-105 drop-shadow-2xl" />
            </div>
          {/* Headline */}
          <h1 className="font-display text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.05] text-white tracking-tight mb-3 px-1 sm:px-0 text-center">
            8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
          </h1>

            {/* Definição / reforço de autoridade abaixo do mockup */}
            <p className="text-white/70 text-center lg:text-left mb-4 max-w-lg px-1 sm:px-0">
              Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para <span className="text-accent font-bold">garantir evolução</span>.
            </p>
          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl leading-snug text-white/80 mb-8 px-1 sm:px-0 font-medium text-center">
            Descubra o método científico que transforma esforço em resultado visível no espelho
          </p>

            {/* CTA Desktop - GREEN (Decision Button #1) */}
            <div className="hidden lg:flex flex-col items-start gap-3 w-full max-w-lg">
              <Button onClick={handleCTAClick} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-lg py-6 font-bold" size="cta">
                Acessar o Método 8X agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
          {/* Mockup */}
          <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto mb-8">
            {/* Orange Glow - subtle and elegant */}
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.2)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            {/* Mockup Image */}
            <img src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" alt="Método 8X - Transformação Garantida" className="relative z-20 w-full h-auto object-contain transform scale-105 drop-shadow-2xl" />
          </div>

              {/* Microcopy under green button */}
              <div className="flex items-center justify-center gap-3 text-white/60 text-xs w-full">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
                <span>|</span>
                <span>✅ Acesso Imediato</span>
                <span>|</span>
                <span>🛡️ 7 Dias de Garantia</span>
              </div>
          {/* Definição / reforço de autoridade abaixo do mockup */}
          <p className="text-white/70 text-center lg:text-center mb-8 max-w-lg px-1 sm:px-0 mx-auto">
            Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para <span className="text-accent font-bold">garantir evolução</span>.
          </p>

              {/* Frase psicológica */}
              <p className="text-red-400 text-sm sm:text-base font-medium mt-1">
                ⚠️ Enquanto você hesita, outros estão evoluindo. <span className="text-red-300 font-bold">Cada dia sem método é tempo perdido.</span>
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
      </div>
      </section>

      {/* CTA Mobile - Fixed Bottom - GREEN (Decision Button #1) */}
      <div className="lg:hidden w-full px-4 pb-6 relative z-20">
      <div className="lg:hidden w-full px-4 pb-6 relative z-20 fixed bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto space-y-3">
          <Button onClick={handleCTAClick} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-base py-5 font-bold" size="cta">
          <Button 
            onClick={handleCTAClick} 
            className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-base py-5 font-bold" 
            size="cta"
          >
            Acessar o Método 8X agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
@@ -121,7 +129,15 @@ const Hero = () => {
          <div className="w-1 h-2.5 bg-white/30 rounded-full animate-bounce" />
        </div>
      </div>
    </section>;

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
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl );
    trackInitiateCheckout(19.9, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center">
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

          <h1 className="font-display text-[1.6rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.2rem] text-white tracking-tight mb-4">
            8 semanas para{' '}
            <span className="text-accent">músculos que todo mundo nota</span> — sem
            improviso, sem perda de tempo
          </h1>

          <p className="text-base sm:text-xl text-white/80 mb-6 sm:mb-10 font-medium">
            Treino pronto, passo a passo, para você só executar e ver resultado no espelho
            visível no espelho
           Treino pronto, passo a passo, para você só executar e ver resultado no espelho
          </p>

          <div className="relative w-full max-w-[280px] sm:max-w-md mx-auto mb-6 sm:mb-8">
            <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.25)_0%,transparent_60%)] blur-[45px] rounded-2xl" />
            <img
              src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png"
              alt="Método 8X"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
            Um sistema comprovado que combina fisiologia, progressão estruturada
            e acompanhamento inteligente para{' '}
            <span className="text-accent font-bold">garantir evolução</span>.
          </p>

          <div className="flex flex-col items-center gap-3 max-w-lg mx-auto">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 font-bold shadow-2xl shadow-green-500/40 transition-all"
            >
              Acessar o Método 8X agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex items-center justify-center gap-3 text-white/60 text-xs flex-wrap">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pagamento Seguro
              </span>
              <span className="hidden sm:inline">|</span>
              <span>✅ Acesso Imediato</span>
              <span className="hidden sm:inline">|</span>
              <span>🛡️ 7 Dias de Garantia</span>
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

