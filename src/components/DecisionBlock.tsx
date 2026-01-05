import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const DecisionBlock = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (DECISION BLOCK) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('================================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="py-12 sm:py-18 section-dark-premium relative overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,hsla(18,100%,58%,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Tension Builder */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest px-3 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Momento de Decisão</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-4">
              Daqui a 8 semanas, você pode estar{" "}
              <span className="text-accent">no mesmo lugar.</span>
            </h2>
            
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
              Ou pode ter um shape que finalmente reflete o esforço que você coloca.
            </p>
          </div>

          {/* The Choice - Visual Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Option 1 - Without Method */}
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/60 to-red-500/20" />
              <div className="text-red-400/80 text-sm font-semibold uppercase tracking-wider mb-3">
                Continuar sozinho
              </div>
              <ul className="space-y-2.5 text-white/50 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-red-400/70 mt-0.5">✗</span>
                  <span>Mais meses de esforço sem retorno</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/70 mt-0.5">✗</span>
                  <span>Mesma frustração ao olhar no espelho</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/70 mt-0.5">✗</span>
                  <span>Improviso eterno, sem progressão real</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/70 mt-0.5">✗</span>
                  <span>Tempo e energia desperdiçados</span>
                </li>
              </ul>
            </div>

            {/* Option 2 - With Method */}
            <div className="bg-accent/[0.08] backdrop-blur-sm border border-accent/25 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-lg shadow-accent/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50" />
              <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                Seguir o Método 8X
              </div>
              <ul className="space-y-2.5 text-white/80 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Resultados visíveis em 8 semanas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Clareza total sobre o que fazer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Progressão científica e comprovada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Cada treino com propósito real</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Emotional Close */}
          <div className="text-center mb-8">
            <p className="text-white/70 text-base sm:text-lg mb-1.5">
              Você já provou que tem disciplina. Já mostrou que quer evoluir.
            </p>
            <p className="text-white font-medium text-lg sm:text-xl">
              Só falta o <span className="text-accent">método certo</span> para transformar esforço em resultado.
            </p>
          </div>

          {/* CTA Block */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-white/40 line-through text-xl">R$ 97</span>
              <span className="text-accent font-display text-4xl sm:text-5xl font-bold drop-shadow-[0_0_25px_hsla(18,100%,58%,0.4)]">R$ 19,90</span>
            </div>
            
            <p className="text-white/50 text-sm mb-5">
              Preço baixo porque o foco é execução, não volume de conteúdo.
            </p>
            
            <Button 
              variant="cta" 
              size="cta" 
              onClick={handleCTAClick} 
              className="w-full sm:w-auto mb-4"
            >
              ASSUMIR O CONTROLE DO MEU TREINO
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-white/40 text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Acesso imediato · Garantia de 7 dias · Risco zero</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
