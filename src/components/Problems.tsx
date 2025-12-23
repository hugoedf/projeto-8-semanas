import { X, CheckCircle2, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import appMockup from "@/assets/app-8x-mockup.jpeg";
const painPoints = ["Estímulo errado", "Progressão confusa", "Execução inconsistente"];
const Problems = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const {
    ctaVisible
  } = useCTAVisibility();
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (EARLY OFFER) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('=============================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };
  return <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* BLOCO DE DOR - Direto e visual */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-6 tracking-tight text-foreground">
            Você <span className="text-accent">não está falhando.</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground font-medium mb-6">
            Você está treinando sem um método claro.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {painPoints.map((point, index) => <div key={index} className="flex items-center justify-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 w-full sm:w-auto">
                <X className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{point}</span>
              </div>)}
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Resultado:</span> esforço alto, evolução baixa.
          </p>
        </div>

        {/* AJUSTE 3 - App 8X Antecipado */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Imagem do App */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-[40px] scale-105" />
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2rem] p-2.5 w-[180px] sm:w-[220px] shadow-xl border border-white/10">
                    <div className="rounded-[1.5rem] overflow-hidden">
                      <img src={appMockup} alt="App 8X - Execução Guiada" className="w-full h-auto" width={220} height={306} loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Texto */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">App 8X</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-4 tracking-tight">
                  O Método 8X vira <span className="text-accent">execução real</span> com o App 8X.
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Você abre, executa o treino do dia e acompanha sua evolução semana a semana — <span className="text-foreground font-medium">sem improviso.</span>
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {["Treinos prontos", "Progressão clara", "Sem achismo"].map((item, i) => <span key={i} className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 text-xs text-accent font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AJUSTE 4 - Oferta mais cedo */}
        <div className={`max-w-xl mx-auto text-center animate-fade-in transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
        </div>
      </div>
    </section>;
};
export default Problems;