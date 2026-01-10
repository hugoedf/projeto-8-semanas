import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { ArrowRight, Check, Shield, Smartphone, Zap, Lock } from "lucide-react";
const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (HERO) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };
  const miniBullets = [{
    icon: Smartphone,
    text: "Treino guiado passo a passo no app"
  }, {
    icon: Zap,
    text: "Nutrição estratégica e recuperação inteligente"
  }, {
    icon: Check,
    text: "Resultados previsíveis semana a semana"
  }, {
    icon: Shield,
    text: "Risco zero: teste por 7 dias"
  }];
  return <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Gradient overlays - pure black base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsla(18,100%,50%,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,hsla(18,100%,50%,0.06),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-6 sm:pb-12 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-7xl mx-auto w-full">

          {/* Content Column */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start order-2 lg:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-2 mb-4 shadow-lg shadow-accent/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">+500 Transformações Reais</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.1] text-white tracking-tight mb-4 px-1 sm:px-0">
              8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/80 mb-5 px-1 sm:px-0 font-medium">
              Descubra o método científico que transforma esforço em resultado visível no espelho
            </p>

            {/* Mockup */}
            <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto mb-5">
              {/* Orange Glow - subtle and elegant */}
              <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.25)_0%,transparent_60%)] blur-[50px] rounded-2xl" />

              {/* Mockup Image */}
              <img src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" alt="Método 8X - Transformação Garantida" className="relative z-20 w-full h-auto object-contain transform scale-110 drop-shadow-2xl" />
            </div>

            {/* Definição / reforço de autoridade abaixo do mockup */}
            <p className="text-white/70 text-center lg:text-left mb-5 max-w-lg px-1 sm:px-0">
              Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para <span className="text-accent font-bold">garantir evolução</span>.
            </p>

            {/* Mini Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 w-full max-w-lg">
              {miniBullets.map((bullet, index) => {
              const Icon = bullet.icon;
              return;
            })}
            </div>

            {/* CTA Desktop - GREEN (Decision Button #1) */}
            <div className="hidden lg:flex flex-col items-start gap-3 w-full max-w-lg">
              <Button onClick={handleCTAClick} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-lg py-6 font-bold" size="cta">
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
      </div>

      {/* CTA Mobile - Fixed Bottom - GREEN (Decision Button #1) */}
      <div className="lg:hidden w-full px-4 pb-6 relative z-20">
        <div className="max-w-md mx-auto space-y-3">
          <Button onClick={handleCTAClick} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 hover:scale-[1.02] transition-all text-base py-5 font-bold" size="cta">
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex opacity-60 z-10">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;