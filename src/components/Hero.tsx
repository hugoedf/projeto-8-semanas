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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-gray-900 pt-16 pb-24">
      {/* Background overlays for depth - Enhanced */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsla(18,100%,58%,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,hsla(18,100%,58%,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.015%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge - Enhanced */}
          <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/30 rounded-full px-5 py-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>MÉTODO 8X</span>
          </div>
          
          {/* Título Principal - Maior e mais Bold */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white tracking-tight mb-8 font-extrabold">
            Um sistema de treino baseado em ciência para gerar{" "}
            <span className="text-accent drop-shadow-[0_0_30px_hsla(18,100%,58%,0.5)]">hipertrofia real</span>{" "}
            com progressão clara e execução guiada.
          </h1>
          
          {/* Subtítulo de apoio - Enhanced */}
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-gray-300 mb-10">
            Em <span className="text-accent font-bold">8 semanas</span>, você deixa de treinar no escuro e passa a aplicar estímulos que realmente funcionam — <span className="text-white font-semibold">sem estagnação, sem improviso.</span>
          </p>
          
          {/* VSL Player - Mobile - Enhanced Frame */}
          <div className="relative w-full max-w-[320px] mx-auto lg:hidden mb-10">
            <div className="absolute -inset-4 bg-accent/30 rounded-3xl blur-[60px]" />
            <div className="relative z-10 vsl-frame rounded-2xl overflow-hidden">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* VSL Player - Desktop - Enhanced Frame */}
          <div className="hidden lg:block relative w-full max-w-xl mx-auto mb-12">
            <div className="absolute -inset-6 bg-accent/25 rounded-[2rem] blur-[80px]" />
            <div className="relative z-10 vsl-frame rounded-3xl overflow-hidden">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
          
          {/* CTA com destaque visual - Enhanced */}
          <div className={`transition-all duration-500 ${vslEnded ? 'scale-105' : ''}`}>
            <Button 
              variant="cta" 
              size="xl" 
              onClick={handleCTAClick} 
              className={`text-base sm:text-xl px-10 sm:px-16 py-7 sm:py-8 tracking-wide rounded-full ${vslEnded ? 'animate-pulse-glow ring-2 ring-accent/50' : 'animate-pulse-glow'}`}
            >
              QUERO TREINAR COM MÉTODO
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
          
          {/* Prova social + preço - Enhanced */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <span className="text-gray-300 font-semibold text-base">+500 pessoas já aplicaram</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-accent font-extrabold text-2xl drop-shadow-[0_0_20px_hsla(18,100%,58%,0.4)]">R$19,90</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-gray-400 text-base">Menos que uma refeição</span>
          </div>
          
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
