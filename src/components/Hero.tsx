import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight, Check, Shield, Smartphone, Zap } from "lucide-react";
const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const parallaxOffset = useParallax({
    speed: 0.08
  });
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
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsla(18,100%,50%,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,hsla(18,100%,50%,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-8 sm:pb-16 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto w-full">

          {/* Content Column */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start order-2 lg:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-4 py-2 mb-6 shadow-lg shadow-accent/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">+500 Transformações Reais</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.1] text-white tracking-tight mb-5 px-1 sm:px-0">
              8 semanas para <span className="text-accent">músculos que todo mundo nota</span> — sem improviso, sem perda de tempo
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/80 mb-6 px-1 sm:px-0 font-medium">
              Descubra o método científico que transforma esforço em resultado visível no espelho
            </p>

            {/* Mockup */}
            <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto mb-6">
              {/* Glow / Background */}
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,55%,0.3)_0%,transparent_55%)] blur-[40px] rounded-2xl" />

              {/* Mockup Image */}
              <img src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" alt="Método 8X - Transformação Garantida" className="relative z-20 w-full h-auto object-contain transform scale-110 drop-shadow-2xl" />
            </div>

            {/* Definição / reforço de autoridade abaixo do mockup */}
            <p className="text-white/70 text-center lg:text-left mb-6 max-w-lg px-1 sm:px-0">
              Um sistema comprovado que combina fisiologia, progressão estruturada e acompanhamento inteligente para <span className="text-accent font-bold">garantir evolução</span>.
            </p>

            {/* Mini Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 w-full max-w-lg">
              {miniBullets.map((bullet, index) => {})}
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:flex flex-col items-start gap-4 w-full max-w-lg">
              <Button variant="cta" size="cta" onClick={handleCTAClick} className="w-full shadow-2xl shadow-accent/40 hover:scale-[1.02] transition-transform text-lg py-6">
                Acessar o Método 8X agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Frase psicológica abaixo do botão */}
              <p className="text-red-300 text-sm sm:text-base font-medium mt-2">
                ⚠️ Enquanto você hesita, outros estão evoluindo. <span className="text-red-200 font-bold">Cada dia sem método é tempo perdido e frustração acumulada.</span>
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* CTA Mobile - Fixed Bottom */}
      <div className="lg:hidden w-full px-4 pb-8 relative z-20">
        <div className="max-w-md mx-auto space-y-4">
          <Button variant="cta" size="cta" onClick={handleCTAClick} className="w-full shadow-2xl shadow-accent/40 hover:scale-[1.02] transition-transform text-base py-5">
            Acessar o Método 8X agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-red-300 text-sm sm:text-base font-medium text-center">
            ⚠️ Enquanto você hesita, outros estão evoluindo. 
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex opacity-60 z-10">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;