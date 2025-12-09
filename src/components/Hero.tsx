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
    trackInitiateCheckout(97, 'BRL');
    window.open(checkoutUrl, "_blank");
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(15,100%,59%,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsla(20,80%,40%,0.06),transparent_40%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0 flex flex-col lg:block">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-2 order-1 mx-auto lg:mx-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>MÉTODO 8X: FISIOLOGIA PROGRESSIVA</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground order-2 tracking-tight">
              A CIÊNCIA QUE TRANSFORMA ESTÍMULOS EM{" "}
              <span className="text-accent">HIPERTROFIA REAL</span>
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-muted-foreground font-normal order-3 font-sans">
              O protocolo de 8 semanas baseado nos ciclos naturais de adaptação muscular, criado para romper o platô e construir um físico denso, forte e resistente — sem treinar no achismo.
            </h2>
            
            {/* Image - Mobile Only */}
            <div className="relative animate-fade-in w-full max-w-[320px] mx-auto lg:hidden order-4 my-8" style={{
            animationDelay: "0.2s"
          }}>
              <div className="absolute inset-0 bg-accent/15 rounded-3xl blur-[60px]" />
              <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl animate-float" src="/lovable-uploads/27a81dc2-1bf2-4070-99d4-1676e2b14ea3.png" />
            </div>
            
            {/* CTA Section */}
            <div className="space-y-5 order-5">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 w-full">
                <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-sm sm:text-base md:text-lg px-8 sm:px-10 py-5 sm:py-7 animate-pulse-glow w-full sm:w-auto font-bold shadow-lg">
                  QUERO O MÉTODO 8X AGORA 
                  <ArrowRight className="ml-2 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 justify-center lg:justify-start pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>100% Digital</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Garantia de 7 Dias</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image - Desktop Only */}
          <div className="hidden lg:block relative animate-fade-in w-full max-w-lg mx-auto lg:max-w-none" style={{
          animationDelay: "0.2s"
        }}>
            <div className="absolute inset-0 bg-accent/15 rounded-3xl blur-[80px]" />
            <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift animate-float" src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
        <div className="w-7 h-12 border-2 border-accent/40 rounded-full flex items-start justify-center p-2.5">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;