import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, AlertTriangle, X, Check } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
const DecisionBlock = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
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
  const negativePoints = ["Continuar estagnado, frustrado e invisível", "Escondendo o corpo na praia e em fotos", "Sentir que cada ida à academia é esforço jogado fora", "Ser o cara que 'treina mas não parece'"];
  const positivePoints = ["Corpo que responde, confiança e evolução visível", "Resultados aparecendo no espelho toda segunda-feira", "Ouvir pessoas perguntando o que você está fazendo", "Finalmente ser o cara que evolui de verdade"];
  return <section className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,hsla(18,100%,50%,0.12),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Tension Builder */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full border border-accent/40 bg-accent/15 mb-8 shadow-lg shadow-accent/20">
              <AlertTriangle className="w-4 h-4" />
              <span>Momento de Decisão</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Daqui a 8 semanas, você pode estar{" "}
              <span className="text-accent">no mesmo lugar…</span>
            </h2>
            
            <p className="text-white/70 text-xl sm:text-2xl max-w-2xl mx-auto">
              Ou ser o cara que finalmente <span className="text-white font-bold">domina seu corpo</span> e impressiona todo mundo.
            </p>
          </div>

          {/* The Choice - Visual Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-12">
            
            {/* Option 1 - Without Method */}
            <div className="bg-red-950/30 backdrop-blur-sm border border-red-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-400" />
              <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                <X className="w-5 h-5" />
                Continuar no mesmo caminho
              </div>
              <ul className="space-y-4">
                {negativePoints.map((point, index) => <li key={index} className="flex items-start gap-3 text-white/60 text-base sm:text-lg">
                    <span className="text-red-400 mt-1 flex-shrink-0">✗</span>
                    <span>{point}</span>
                  </li>)}
              </ul>
            </div>

            {/* Option 2 - With Method */}
            <div className="bg-accent/10 backdrop-blur-sm border border-accent/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-accent/20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-accent/70" />
              <div className="text-accent text-sm font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Seguir o Método 8X
              </div>
              <ul className="space-y-4">
                {positivePoints.map((point, index) => <li key={index} className="flex items-start gap-3 text-white text-base sm:text-lg">
                    <span className="text-accent mt-1 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Emotional Close */}
          <div className="text-center mb-10">
            <p className="text-white/70 sm:text-xl mb-2 text-base">
              Você já provou que tem disciplina. Agora, prove o que seu corpo é capaz de fazer com ciência.
            </p>
            <p className="text-white font-bold text-xl sm:text-2xl">
              Só falta o <span className="text-accent">método certo</span> para transformar esforço em resultado.
            </p>
          </div>

          {/* CTA Block */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-5 mb-4">
              <span className="text-white/40 line-through text-2xl">R$ 97</span>
              <span className="text-accent font-display sm:text-6xl font-bold drop-shadow-[0_0_30px_hsla(18,100%,55%,0.5)] text-3xl">R$ 19,90</span>
            </div>
            
            <p className="text-white/50 text-base mb-6">
              Preço baixo porque o foco é execução, não volume de conteúdo.
            </p>
            
            <Button variant="cta" size="cta" onClick={handleCTAClick} className="w-full mb-5 shadow-2xl shadow-accent/40 text-lg py-6">
              Comprar agora  
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-white/40 text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Acesso imediato · Garantia de 7 dias · Risco zero</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>;
};
export default DecisionBlock;