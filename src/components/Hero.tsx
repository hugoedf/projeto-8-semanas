import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import VSLPlayer from "@/components/VSLPlayer";
import { useState } from "react";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const Hero = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const [vslEnded, setVslEnded] = useState(false);
  const { ctaVisible } = useCTAVisibility();

  const handleVSLEnd = () => {
    setVslEnded(true);
    console.log('📊 VSL completed - CTA emphasis activated');
  };

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (HERO) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16 pb-24">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/30 rounded-full px-5 py-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8">
            <Zap className="w-4 h-4" />
            <span>MÉTODO 8X</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground tracking-tight mb-8 font-extrabold">
            Um sistema de treino baseado em ciência para gerar{" "}
            <span className="text-accent">hipertrofia real</span>{" "}
            com progressão clara e execução guiada.
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-gray-600 mb-10">
            Em <span className="text-accent font-bold">8 semanas</span>, você deixa de treinar no escuro e passa a aplicar estímulos que realmente funcionam — <span className="text-foreground font-semibold">sem estagnação, sem improviso.</span>
          </p>
          
          {/* Watch CTA */}
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            ▶ Assista ao vídeo
          </p>
          
          {/* VSL Player - Mobile */}
          <div className="relative w-full max-w-[340px] mx-auto lg:hidden mb-10">
            <div className="absolute -inset-4 bg-accent/30 rounded-2xl blur-[40px]" />
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-accent shadow-[0_0_60px_hsla(18,100%,60%,0.4)]">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* VSL Player - Desktop */}
          <div className="hidden lg:block relative w-full max-w-xl mx-auto mb-12">
            <div className="absolute -inset-6 bg-accent/25 rounded-3xl blur-[50px]" />
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-accent shadow-[0_0_80px_hsla(18,100%,60%,0.5)]">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`transition-all duration-500 ${vslEnded ? 'scale-105' : ''}`}>
            <Button 
              variant="cta" 
              size="lg" 
              onClick={handleCTAClick} 
              className={`${vslEnded ? 'animate-pulse' : ''}`}
            >
              QUERO TREINAR COM MÉTODO
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          {/* Social Proof + Price */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <span className="text-gray-600 font-medium text-sm">+500 pessoas já aplicaram</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-accent font-bold text-xl">R$19,90</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-gray-500 text-sm">Menos que uma refeição</span>
          </div>
          
          {/* Micro-commitment */}
          <p className="text-gray-400 text-sm mt-10 italic">
            Se você já treina, mas sente que poderia estar evoluindo mais, continue.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-60">
        <div className="w-6 h-10 border border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
