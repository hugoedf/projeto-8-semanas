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
    window.open(checkoutUrl, "_blank");
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-8 animate-fade-in px-2 sm:px-0 flex flex-col lg:block">
            <div className="inline-flex items-center gap-2 text-accent font-bold text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/10 mb-4 sm:mb-6 order-1 mx-auto lg:mx-0">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>MÉTODO 8X: A CIÊNCIA QUE TRANSFORMA</span>
            </div>
            
            <h1 className="font-display text-xl sm:text-4xl md:text-6xl leading-tight text-slate-50 break-words order-2 lg:text-4xl">
              MÉTODO 8X: A CIÊNCIA QUE TRANSFORMA{" "}
              <span className="text-accent">TREINOS EM RESULTADOS</span>
            </h1>
            
            <h2 className="sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-slate-50 font-normal order-3 font-sans md:text-base text-sm">
              O protocolo de 8 semanas baseado em Fisiologia Progressiva para romper o platô e construir um físico denso, forte e resistente.
            </h2>
            
            {/* Image - Only visible on mobile */}
            <div className="relative animate-fade-in w-full max-w-[280px] mx-auto lg:hidden order-4 my-6" style={{
            animationDelay: "0.2s"
          }}>
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
              <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift" src="/lovable-uploads/27a81dc2-1bf2-4070-99d4-1676e2b14ea3.png" />
            </div>
            
            <div className="space-y-4 sm:space-y-4 order-5">
              
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full">
                <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-xs sm:text-base md:text-lg px-3 sm:px-8 py-4 sm:py-6 animate-pulse-glow w-full sm:w-auto">
                  QUERO O MÉTODO 8X AGORA 
                  <ArrowRight className="ml-1 sm:ml-2 flex-shrink-0 w-3 h-3 sm:w-5 sm:h-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-center lg:justify-start pt-4 sm:pt-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>100% Digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Garantia 7 Dias</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image - Only visible on desktop */}
          <div className="hidden lg:block relative animate-fade-in w-full max-w-md mx-auto lg:max-w-none" style={{
          animationDelay: "0.2s"
        }}>
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
            <img alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift" src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;