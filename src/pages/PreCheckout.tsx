import { Check, Lock, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const PreCheckout = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl );
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
        <h1 className="font-display text-2xl sm:text-4xl text-white text-center mb-4 leading-tight">
          Você está a <span className="text-accent">8 semanas</span> de parar de errar no treino
        </h1>
        <p className="text-white/70 text-center mb-8">Antes de liberar seu acesso, confirme se isso faz sentido pra você:</p>
        <div className="space-y-3 mb-8">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-white text-base">{item}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleCTAClick} className="w-full bg-green-500 hover:bg-green-600 text-white py-6 font-bold text-lg">
          IR PARA PAGAMENTO SEGURO <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PreCheckout;
