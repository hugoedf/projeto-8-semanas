import React, { useState } from 'react';
import { ArrowRight, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const DecisionBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();

  const negativePoints = [
    "Treinar sem saber se está evoluindo",
    "Ficar estagnado no mesmo peso/corpo",
    "Gastar horas na academia sem rumo",
    "Desperdiçar dinheiro com suplementos inúteis"
  ];

  const positivePoints = [
    "Saber exatamente o que fazer todo dia",
    "Ver mudanças reais no espelho toda semana",
    "Treinos curtos, intensos e eficientes",
    "Método validado por ciência e prática"
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
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-5">
                Daqui a 8 semanas, você pode estar <span className="text-accent">no mesmo lugar…</span>
              </h2>
              <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto">
                Ou ser o cara que finalmente <span className="text-white font-bold">domina seu corpo</span> e impressiona todo mundo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-10">
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-5 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400" />
                <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><X className="w-5 h-5" /> Continuar no mesmo caminho</div>
                <ul className="space-y-3">
                  {negativePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/60 text-sm sm:text-base">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent/10 border border-accent/40 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-xl shadow-accent/15">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/70" />
                <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Seguir o Método 8X</div>
                <ul className="space-y-3">
                  {positivePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-white text-sm sm:text-base">
                      <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 text-center max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-white/40 line-through text-xl">R$ 97</span>
                <span className="text-accent font-display text-3xl sm:text-5xl font-bold">R$ 19,90</span>
              </div>
              <Button variant="cta" size="cta" onClick={handleCTAClick} className="w-full mb-4 bg-green-500 hover:bg-green-600 text-white">
                Comprar agora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-white/40 text-xs flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> Acesso imediato · Garantia de 7 dias</p>
            </div>
          </div>
        </div>
      </section>
      <MiniPreCheckout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmPurchase} />
    </>
  );
};
export default DecisionBlock;
