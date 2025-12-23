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
    // 1. Base URL do checkout da Hotmart
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';

    // 2. Construir URL completa com todos os parâmetros de rastreamento
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    // 3. Log detalhado ANTES do redirecionamento
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

    // 4. Disparar evento de InitiateCheckout
    trackInitiateCheckout(19.90, 'BRL');

    // 5. Abrir checkout em nova aba
    window.location.href = checkoutUrl;
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in px-1 sm:px-0 flex flex-col lg:block">
            
            {/* Badge minimalista */}
            <div className="inline-flex items-center gap-2 text-accent font-medium text-xs uppercase tracking-wider mb-6 order-1 mx-auto lg:mx-0">
              <Zap className="w-4 h-4" />
              <span>MÉTODO 8X</span>
            </div>
            
            {/* Título - mantido conforme solicitado */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] text-white order-2 tracking-tight mb-6">
              A CIÊNCIA QUE TRANSFORMA ESTÍMULOS EM{" "}
              <span className="text-accent">HIPERTROFIA REAL</span>
            </h1>
            
            {/* Subtítulo mais persuasivo e direto */}
            <p className="text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 text-white/80 order-3 mb-8">
              Você não precisa treinar mais. Precisa treinar com <span className="text-white font-medium">método, execução guiada e progressão clara</span> por 8 semanas.
            </p>
            
            {/* VSL Player - Mobile only */}
            <div className="relative w-full max-w-[340px] mx-auto lg:hidden order-4 mb-8">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-[50px]" />
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
            
            {/* CTA Section - Limpo e focado */}
            <div className={`order-5 space-y-4 transition-all duration-500 ${vslEnded ? 'scale-105' : ''}`}>
              <Button 
                variant="cta" 
                size="lg" 
                onClick={handleCTAClick} 
                className={`text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 w-full sm:w-auto font-bold tracking-wide shadow-xl shadow-accent/25 uppercase ${vslEnded ? 'animate-pulse-glow ring-2 ring-accent/50' : 'animate-pulse-glow'}`}
              >
                QUERO COMEÇAR AGORA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              {/* Preço + Oferta - Uma linha só */}
              <p className="text-sm sm:text-base text-white/70">
                <span className="text-accent font-semibold">R$ 19,90</span>
                <span className="mx-2">•</span>
                <span>E-book + App 8X incluso</span>
                <span className="mx-2">•</span>
                <span>Garantia de 7 dias</span>
              </p>
            </div>
          </div>
          
          {/* VSL Player - Desktop only */}
          <div className="hidden lg:flex justify-center relative animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="absolute inset-0 bg-accent/15 rounded-3xl blur-[60px] scale-90" />
            <div className="relative z-10 w-full max-w-lg">
              <VSLPlayer onVideoEnd={handleVSLEnd} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - mais sutil */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-60">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;
