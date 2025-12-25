import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Sparkles } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const IntermediateCTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { ctaVisible } = useCTAVisibility();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (INTERMEDIATE CTA) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('================================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className={`py-24 sm:py-32 bg-white relative overflow-hidden transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(18,100%,58%,0.06),transparent_60%)]" />
      
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge - Enhanced */}
          <span className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/25 rounded-full px-5 py-2 text-accent font-bold text-sm uppercase tracking-[0.2em] mb-8">
            <Sparkles className="w-5 h-5" />
            DECISÃO SIMPLES
          </span>

          {/* Headline emocional - Enhanced */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight text-foreground font-extrabold">
            Você pode continuar tentando sozinho.<br />
            <span className="text-accent drop-shadow-[0_0_25px_hsla(18,100%,58%,0.4)]">Ou pode seguir um caminho que funciona.</span>
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-xl mx-auto" style={{ lineHeight: '1.8' }}>
            +500 pessoas já aplicaram o método. O método está comprovado. A única pergunta é: quando você vai começar? 
          </p>

          {/* Preço com ancoragem - Enhanced */}
          <div className="flex items-center justify-center gap-5 mb-10">
            <span className="text-gray-400 line-through text-xl">R$ 97</span>
            <span className="text-accent font-display text-5xl sm:text-6xl font-extrabold drop-shadow-[0_0_40px_hsla(18,100%,58%,0.5)]">R$ 19,90</span>
          </div>

          {/* Botão - Enhanced */}
          <Button 
            variant="cta" 
            size="xl" 
            onClick={handleCTAClick} 
            className="text-base sm:text-lg px-12 py-7 tracking-wide mb-10 rounded-full"
          >
            GARANTIR MINHA VAGA AGORA
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>

          {/* Trust badges - Enhanced */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-base text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default IntermediateCTA;
