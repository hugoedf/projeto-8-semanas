import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import VSLPlayer from "@/components/VSLPlayer";
import { useState } from "react";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { useParallax } from "@/hooks/useParallax";
const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const [vslEnded, setVslEnded] = useState(false);
  const {
    ctaVisible
  } = useCTAVisibility();
  const parallaxOffset = useParallax({
    speed: 0.08
  });
  const handleVSLEnd = () => {
    setVslEnded(true);
    console.log('📊 VSL completed - CTA emphasis activated');
  };
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (HERO) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('📍 Parâmetros capturados:', {
      tracking_id: localStorage.getItem('visitor_id'),
      utm_source: localStorage.getItem('utm_source'),
      utm_medium: localStorage.getItem('utm_medium'),
      utm_campaign: localStorage.getItem('utm_campaign'),
      utm_term: localStorage.getItem('utm_term'),
      utm_content: localStorage.getItem('utm_content'),
      fbclid: localStorage.getItem('fbclid'),
      gclid: localStorage.getItem('gclid'),
      ttclid: localStorage.getItem('ttclid'),
      msclkid: localStorage.getItem('msclkid')
    });
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };
  return <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden section-dark-premium pt-8 lg:pt-12">
      {/* Background overlays for depth with parallax */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.1),transparent_60%)]" style={{
      transform: `translateY(${parallaxOffset * 0.5}px)`
    }} />
      
      <div className="container mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-7xl mx-auto">
          {/* Content Column - Left on desktop, full width on mobile */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start order-1">
            
            {/* Teaser */}
            <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 lg:mb-4 font-mono">
              Quem treina duro não pode treinar no escuro
            </p>
            
            {/* Título Principal */}
            <h1 className="font-display text-[1.65rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-[2.6rem] lg:leading-[1.15] text-white tracking-tight mb-3 sm:mb-4 px-1 sm:px-0">
              Um sistema de treino baseado em ciência para gerar{" "}
              <span className="text-accent">hipertrofia real</span>, com progressão clara e execução guiada.
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-[1.125rem] leading-relaxed max-w-xl text-white/75 mb-5 lg:mb-6 px-1 sm:px-0">
              Em <span className="text-accent font-semibold">8 semanas</span>, você deixa de treinar no escuro e passa a aplicar estímulos que realmente funcionam — <span className="text-white font-medium">sem estagnação, sem improviso.</span>
            </p>
            
            {/* VSL Player - Mobile only */}
            <div className="relative w-full max-w-[340px] mx-auto lg:hidden mb-5 order-2">
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.3)_0%,hsla(18,100%,55%,0.15)_45%,transparent_70%)] blur-[35px] rounded-[40px]" />
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,60%,0.4)_0%,transparent_60%)] blur-[25px] rounded-2xl" />
              <div className="relative z-10 rounded-xl overflow-hidden ring-1 ring-accent/20 shadow-lg">
                <VSLPlayer onVideoEnd={handleVSLEnd} />
              </div>
            </div>
            
            {/* CTA Button */}
            <div className={`w-full sm:w-auto order-3 ${vslEnded ? 'scale-105' : ''}`}>
              <Button variant="cta" size="cta" onClick={handleCTAClick} className={`w-full sm:w-auto shadow-xl shadow-accent/25 ${vslEnded ? 'animate-pulse-glow-subtle ring-2 ring-accent/50' : 'animate-pulse-glow-subtle'}`}>
                Começar Agora por R$19,90
                <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
              </Button>
            </div>
            
            {/* Social Proof */}
            <p className="text-xs sm:text-sm text-white/65 mt-4 lg:mt-5 text-center lg:text-left order-4">
              <span className="text-white/85 font-medium">+500 pessoas já aplicaram</span>
              <span className="mx-2 text-white/30">•</span>
              <span>Teste por 7 dias sem risco</span>
              <span className="mx-2 text-white/30">•</span>
              <span>Compra 100% segura</span>
            </p>
          </div>
          
          {/* VSL Player Column - Right on desktop only */}
          <div className="hidden lg:flex justify-center relative animate-fade-in order-2" style={{
          animationDelay: "0.15s",
          transform: `translateY(${parallaxOffset * 0.3}px)`
        }}>
            {/* Background glow for visual focus */}
            <div className="absolute -inset-16 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.5)_0%,hsla(18,100%,50%,0.22)_35%,transparent_65%)] blur-[60px] rounded-[60px]" />
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.35)_0%,transparent_55%)] blur-[35px] rounded-2xl" />
            <div className="relative z-10 w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-accent/15 shadow-2xl shadow-black/40">
                <VSLPlayer onVideoEnd={handleVSLEnd} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Micro-compromisso */}
        <div className="max-w-2xl mx-auto mt-8 sm:mt-10 text-center">
          <p className="text-white/50 text-sm sm:text-base italic">
            Se você já treina e sente que está travado, isso é pra você.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-60">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;