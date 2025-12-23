import { Check, Gift, Smartphone, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";

const valueItems = [
  {
    icon: BookOpen,
    title: "E-book Método 8X",
    description: "8 semanas de treino com ciência e progressão",
    value: "R$ 47"
  },
  {
    icon: Smartphone,
    title: "App 8X",
    description: "Treino guiado no celular, dia a dia",
    value: "R$ 37"
  },
  {
    icon: TrendingUp,
    title: "Planilha de Progressão",
    description: "Acompanhe sua evolução semana a semana",
    value: "R$ 19"
  }
];

const ValueAnchor = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { ctaVisible } = useCTAVisibility();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    console.log('✅ ===== CHECKOUT INICIADO (VALUE ANCHOR) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('==============================================');

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  const totalValue = 103; // 47 + 37 + 19

  return (
    <section className={`py-12 sm:py-16 bg-background transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-accent/40 bg-accent/10 mb-4">
              <Gift className="w-3.5 h-3.5" />
              <span>VALOR REAL DO PACOTE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 tracking-tight">
              Veja o que você está{" "}
              <span className="text-gradient">levando hoje:</span>
            </h2>
          </div>

          {/* Value items */}
          <div className="space-y-3 mb-8">
            {valueItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-4 bg-card border border-border/80 rounded-xl p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm sm:text-base text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-muted-foreground line-through text-sm">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total vs Preço */}
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30 rounded-2xl p-6 text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Valor total</p>
                <span className="text-2xl sm:text-3xl text-muted-foreground line-through">R$ {totalValue}</span>
              </div>
              <div className="text-3xl text-accent">→</div>
              <div>
                <p className="text-xs text-accent uppercase tracking-wide mb-1 font-semibold">Hoje por apenas</p>
                <span className="text-4xl sm:text-5xl font-display font-bold text-accent">R$ 19,90</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 inline mr-1 text-accent" />
              Economia de <span className="text-foreground font-semibold">R$ {(totalValue - 19.90).toFixed(0)}</span>
            </p>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in">
            <Button 
              variant="cta" 
              size="lg" 
              onClick={handleCTAClick}
              className="text-xs sm:text-base px-6 sm:px-12 py-5 sm:py-6 animate-pulse-glow font-bold tracking-wide shadow-lg shadow-accent/30 uppercase mb-4 w-full sm:w-auto max-w-full whitespace-normal leading-tight"
            >
              <span className="flex-1 text-center">SIM! Quero começar a evoluir de verdade</span>
              <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Acesso imediato • Garantia de 7 dias • Pagamento 100% seguro
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueAnchor;
