import { Check, Lock, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const PreCheckout = () => {
  const { trackInitiateCheckout } = useMetaPixel();

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (PRE-CHECKOUT) =====');
    console.log('🔗 URL final:', checkoutUrl);
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  const checklist = [
    "Treino estruturado por 8 semanas",
    "Progressão definida (sem improviso)",
    "Aplicativo + Ebook inclusos",
    "Acesso imediato após a compra",
    "Garantia incondicional de 7 dias"
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        
        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white text-center mb-4 leading-tight">
          Você está a <span className="text-accent">8 semanas</span> de parar de errar no treino
        </h1>

        {/* Subheadline */}
        <p className="text-white/70 text-center text-base sm:text-lg mb-8">
          Antes de liberar seu acesso ao Método 8X, confirme se isso faz sentido pra você:
        </p>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
              </div>
              <span className="text-white text-base">{item}</span>
            </div>
          ))}
        </div>

        {/* Security Block */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">
                Pagamento processado com segurança pela Hotmart
              </p>
              <p className="text-white/50 text-sm">
                Cancelamento simples em até 7 dias, sem burocracia
              </p>
            </div>
          </div>
        </div>

        {/* GREEN CTA */}
        <Button 
          onClick={handleCTAClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 text-lg py-6 font-bold mb-3"
          size="cta"
        >
          IR PARA PAGAMENTO SEGURO
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Microcopy */}
        <p className="text-white/50 text-sm text-center flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          Leva menos de 1 minuto para concluir
        </p>

      </div>
    </div>
  );
};

export default PreCheckout;
