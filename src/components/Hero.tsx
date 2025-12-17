import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-ebook-mockup.png";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
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
    trackInitiateCheckout(97, 'BRL');

    // 5. Abrir checkout em nova aba
    window.location.href = checkoutUrl;
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsla(20,15%,15%,0.4),transparent_40%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 py-20 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in px-1 sm:px-0 flex flex-col lg:block">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm mb-2 sm:mb-4 order-1 mx-auto lg:mx-0 shadow-lg shadow-accent/10">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>MÉTODO 8X: FISIOLOGIA PROGRESSIVA</span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-white break-words order-2 tracking-tight">
              A CIÊNCIA QUE TRANSFORMA ESTÍMULOS EM{" "}
              <span className="text-accent drop-shadow-[0_0_20px_hsla(18,100%,58%,0.4)]">HIPERTROFIA REAL</span>
            </h1>
            
            <h2 className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-white/85 font-normal order-3 font-sans">Um protocolo de 8 semanas baseado na fisiologia da adaptação muscular. Criado para romper o platô e construir um físico denso e forte — sem treinar no achismo</h2>
            
            {/* Image - Only visible on mobile */}
            <div className="relative animate-fade-in w-full max-w-[300px] mx-auto lg:hidden order-4 my-8" style={{
            animationDelay: "0.2s"
          }}>
              <div className="absolute inset-0 bg-accent/25 rounded-3xl blur-[60px]" />
              <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift drop-shadow-2xl" src="/lovable-uploads/c1941b90-f63e-4025-b105-03df2eac90b0.png" />
            </div>
            
            <div className="space-y-5 sm:space-y-6 order-5">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full">
                <div className="flex flex-col items-center lg:items-start gap-1.5">
                  <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-sm sm:text-base md:text-lg px-6 sm:px-10 py-5 sm:py-7 animate-pulse-glow w-full sm:w-auto font-bold tracking-wide shadow-xl shadow-accent/30 uppercase">
                    QUERO O MÉTODO 8X AGORA 
                    <ArrowRight className="ml-2 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <span className="font-medium text-sm text-white/60">Por apenas <span className="text-accent">R$ 19,90</span> — menos que uma mensalidade de academia</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 justify-center lg:justify-start pt-2 sm:pt-4 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                  <span className="font-medium">100% Digital</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                  <span className="font-medium">Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                  <span className="font-medium">Garantia de 7 Dias</span>
                </div>
              </div>
              
              
            </div>
          </div>
          
          {/* Image - Only visible on desktop */}
          <div className="hidden lg:flex justify-center relative animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-[80px] scale-90" />
            <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full max-w-lg h-auto rounded-2xl shadow-2xl hover-lift drop-shadow-2xl" src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
        <div className="w-7 h-11 border-2 border-accent/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5">
          <div className="w-1.5 h-3 bg-accent rounded-full shadow-lg shadow-accent/50" />
        </div>
      </div>
    </section>;
};
export default Hero;