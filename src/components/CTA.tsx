import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Zap, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const benefits = [
    "Treino estruturado por 8 semanas",
    "Progressão de carga definida",
    "Acesso ao App exclusivo",
    "Suporte para dúvidas",
    "Garantia de 7 dias"
  ];

  const handleCTAClick = () => setIsModalOpen(true);

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl );
    trackInitiateCheckout(19.9, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
              Transforme seu corpo em <span className="text-accent font-black">8 semanas</span>
            </h2>
          </div>
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            <div className="w-full max-w-md">
              <div className="bg-white border border-black/5 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                <div className="mb-6 text-center">
                  <span className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-black bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                    <Zap className="w-4 h-4" /> Acesso Imediato ao App
                  </span>
                </div>
                <div className="space-y-2.5 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-black/80 text-sm sm:text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/5 pt-6 mb-6 text-center">
                  <div className="flex items-baseline justify-center gap-3 mb-1">
                    <span className="text-black/30 line-through text-xl font-bold">R$ 97</span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-black">R$ 19,90</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-900 font-bold text-sm">⏰ Preço promocional por tempo limitado ({formatTime(timeLeft)})</p>
                  </div>
                </div>
                <Button
                  onClick={handleCTAClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white mb-3 shadow-xl shadow-green-500/20 text-sm sm:text-lg py-5 font-black rounded-xl flex items-center justify-center gap-2"
                >
                  QUERO COMEÇAR POR R$ 19,90 <ArrowRight className="w-5 h-5" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-black/50 text-[10px]">
                  <Lock className="w-3 h-3" /> Pagamento Seguro | 🛡️ 7 Dias de Garantia
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MiniPreCheckout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmPurchase} />
    </>
  );
};
export default CTA;
