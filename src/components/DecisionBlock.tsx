import React, { useState } from 'react';
import { X, Check, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniPreCheckoutModal } from './MiniPreCheckoutModal';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const DecisionBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const negativePoints = [
    "Continuar treinando no escuro",
    "Mais 8 semanas de esforço sem resultado",
    "Perder para quem já começou",
    "Ficar ouvindo desculpas suas mesma",
    "Acordar daqui 2 meses no mesmo lugar"
  ];

  const positivePoints = [
    "Treino estruturado que funciona",
    "Progressão que você consegue acompanhar",
    "Resultados visíveis em 8 semanas",
    "Ouvir pessoas perguntando o que você está fazendo",
    "Finalmente ser o cara que evolui de verdade"
  ];

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (DECISION BLOCK - APÓS CONFIRMAÇÃO NO MODAL) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section className="py-12 sm:py-16 bg-black relative overflow-hidden">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,hsla(18,100%,50%,0.10),transparent_60%)]" />
        
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Tension Builder */}
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-5">
                Daqui a 8 semanas, você pode estar{" "}
                <span className="text-accent">no mesmo lugar…</span>
              </h2>
              
              <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto">
                Ou ser o cara que finalmente <span className="text-white font-bold">domina seu corpo</span> e impressiona todo mundo.
              </p>
            </div>

            {/* The Choice - Visual Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-10">
              
              {/* Option 1 - Without Method */}
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-5 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400" />
                <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Continuar no mesmo caminho
                </div>
                <ul className="space-y-3">
                  {negativePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/60 text-sm sm:text-base">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Option 2 - With Method */}
              <div className="bg-accent/10 border border-accent/40 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-xl shadow-accent/15">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/70" />
                <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Seguir o Método 8X
                </div>
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

            {/* Emotional Close */}
            <div className="text-center mb-8">
              <p className="text-white/70 text-sm sm:text-lg mb-2">
                Você já provou que tem disciplina. Agora, prove o que seu corpo é capaz de fazer com ciência.
              </p>
              <p className="text-white font-bold text-lg sm:text-xl">
                Só falta o <span className="text-accent">método certo</span> para transformar esforço em resultado.
              </p>
            </div>

            {/* CTA Block - GREEN button (agora abre modal) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 text-center max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-white/40 line-through text-xl">R$ 97</span>
                <span className="text-accent font-display text-3xl sm:text-5xl font-bold drop-shadow-[0_0_25px_hsla(18,100%,55%,0.4)]">R$ 19,90</span>
              </div>
              
              <p className="text-white/50 text-sm mb-5">
                Preço baixo porque o foco é execução, não volume de conteúdo.
              </p>
              
              {/* GREEN button - agora abre modal */}
              <Button 
                variant="cta" 
                size="cta" 
                onClick={handleCTAClick} 
                className="w-full mb-4 shadow-xl shadow-accent/30 text-base py-5 bg-green-500 hover:bg-green-600 text-white"
              >
                Comprar agora  
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-white/40 text-xs flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Acesso imediato · Garantia de 7 dias · Risco zero</span>
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Modal de confirmação */}
      <MiniPreCheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default DecisionBlock;
