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
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16 pb-24">
      {/* Background - Deep black with subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(14,100%,60%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-accent font-bold text-xs uppercase tracking-[0.15em] mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>MÉTODO 8X</span>
          </div>
          
          {/* Título Principal - Branco com alto contraste */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground tracking-tight mb-6 font-bold">
            Um sistema de treino baseado em ciência para gerar{" "}
            <span className="text-accent">hipertrofia real</span>{" "}
            com progressão clara e execução guiada.
          </h1>
          
          {/* Subtítulo - Cinza claro */}
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground mb-8">
            Em <span className="text-accent font-semibold">8 semanas</span>, você deixa de treinar no escuro e passa a aplicar estímulos que realmente funcionam — <span className="text-foreground font-medium">sem estagnação, sem improviso.</span>
          </p>
          
          {/* VSL Player - Mobile */}
          <div className="relative w-full max-w-[300px] mx-auto lg:hidden mb-8">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-[var(--shadow-vsl)]">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* VSL Player - Desktop - Moldura laranja */}
          <div className="hidden lg:block relative w-full max-w-lg mx-auto mb-10">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[var(--shadow-vsl)]">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* CTA - Proporcional e elegante */}
          <div className={`transition-all duration-300 ${vslEnded ? 'scale-[1.02]' : ''}`}>
            <Button 
              variant="cta" 
              size="lg" 
              onClick={handleCTAClick} 
              className="text-sm sm:text-base px-8 sm:px-10 rounded-full"
            >
              QUERO TREINAR COM MÉTODO
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          {/* Prova social + preço */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="text-muted-foreground text-sm">+500 pessoas já aplicaram</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-accent/50" />
            <span className="text-accent font-bold text-xl">R$19,90</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-accent/50" />
            <span className="text-muted-foreground text-sm">Menos que uma refeição</span>
          </div>
          
          {/* Micro-compromisso */}
          <p className="text-muted-foreground/60 text-sm mt-8 italic">
            Se você já treina, mas sente que poderia estar evoluindo mais, continue.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-40">
        <div className="w-5 h-8 border border-foreground/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-0.5 h-2 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
