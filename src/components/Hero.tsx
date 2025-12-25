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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-16 pb-20">
      {/* Background overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-6">
            <Zap className="w-4 h-4" />
            <span>MÉTODO 8X</span>
          </div>
          
          {/* Título Principal - Centralizado */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-white tracking-tight mb-6">
            Um sistema de treino baseado em ciência para gerar{" "}
            <span className="text-accent">hipertrofia real</span>{" "}
            com progressão clara e execução guiada.
          </h1>
          
          {/* Subtítulo de apoio */}
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-gray-300 mb-8">
            Em <span className="text-accent font-semibold">8 semanas</span>, você deixa de treinar no escuro e passa a aplicar estímulos que realmente funcionam — <span className="text-white font-medium">sem estagnação, sem improviso.</span>
          </p>
          
          {/* VSL Player - Mobile */}
          <div className="relative w-full max-w-[300px] mx-auto lg:hidden mb-8">
            <div className="absolute inset-0 bg-accent/25 rounded-2xl blur-[50px]" />
            <VSLPlayer onVideoEnd={handleVSLEnd} />
          </div>
          
          {/* VSL Player - Desktop */}
          <div className="hidden lg:block relative w-full max-w-lg mx-auto mb-10">
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-[60px] scale-90" />
            <div className="relative z-10">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* CTA com destaque visual */}
          <div className={`transition-all duration-500 ${vslEnded ? 'scale-105' : ''}`}>
            <Button 
              variant="cta" 
              size="lg" 
              onClick={handleCTAClick} 
              className={`text-sm sm:text-lg px-8 sm:px-12 py-6 sm:py-7 font-bold tracking-wide shadow-xl shadow-accent/30 uppercase rounded-full ${vslEnded ? 'animate-pulse-glow ring-2 ring-accent/50' : 'animate-pulse-glow'}`}
            >
              QUERO TREINAR COM MÉTODO
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          {/* Prova social + preço */}
          <p className="text-sm text-gray-400 mt-6">
            <span className="text-gray-300 font-medium">+500 pessoas já aplicaram</span>
            <span className="mx-3 text-gray-600">•</span>
            <span className="text-accent font-bold text-lg">R$19,90</span>
            <span className="mx-3 text-gray-600">•</span>
            <span>Menos que uma refeição</span>
          </p>
          
          {/* Micro-compromisso */}
          <p className="text-gray-500 text-sm mt-10 italic">
            Se você já treina, mas sente que poderia estar evoluindo mais, continue.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-60">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
