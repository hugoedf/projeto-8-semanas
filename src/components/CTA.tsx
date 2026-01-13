import React, { useState } from 'react';
import { ArrowRight, Zap, Check, Clock, Lock, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniPreCheckout from './MiniPreCheckout';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  const benefits = [
    'Acesso ao aplicativo completo',
    'Ebook com todos os exercícios',
    'Progressão garantida em 8 semanas',
    'Suporte via comunidade privada',
  ];

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section id="cta-section" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* TÍTULO NO TOPO - IGUAL À FOTO */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
              Transforme seu corpo em <span className="text-accent font-black">8 semanas</span>
            </h2>
            <p className="text-black/50 mt-4 text-lg max-w-2xl mx-auto">
              O método científico para quem não tem tempo a perder com treinos que não funcionam.
            </p>
          </div>

          {/* LAYOUT DE DUAS COLUNAS (DESKTOP) / UMA COLUNA (MOBILE) */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* COLUNA ESQUERDA: MOCKUP (A FOTO DO PRODUTO) */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full" />
                <img 
                  src="/lovable-uploads/4e8b313a-0782-4511-b347-23fcf4854df7.png" 
                  alt="Método 8X Mockup" 
                  className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* COLUNA DIREITA: O CARD DE VENDA (A CAIXINHA BRANCA) */}
            <div className="w-full lg:w-1/2 max-w-md">
              <div className="bg-white border border-black/5 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                
                {/* Badge Interno */}
                <div className="mb-6">
                  <span className="text-accent text-xs uppercase tracking-widest font-black bg-accent/5 px-3 py-1 rounded-full">
                    Acesso Imediato
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl mb-4 tracking-tight text-black leading-tight font-bold">
                  Comece agora. Veja resultados em 8 semanas.
                </h3>
                
                <p className="text-black/60 text-sm mb-6 leading-relaxed">
                  Menos que uma refeição — e evita semanas de treino jogadas fora.
                </p>
                
                {/* Checklist de Benefícios */}
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" strokeWidth={3} />
                      <span className="text-black/80 text-sm sm:text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Preço com Ancoragem */}
                <div className="border-t border-black/5 pt-6 mb-8">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-black/30 line-through text-xl font-bold">R$ 97</span>
                    <span className="text-accent font-display text-4xl sm:text-5xl font-black">R$ 19,90</span>
                  </div>
                  <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">
                    Pagamento único · Sem mensalidades
                  </p>
                </div>

                {/* BOTÃO VERDE CAMPEÃO */}
                <Button 
                  onClick={handleCTAClick} 
                  className="w-full bg-green-500 hover:bg-green-600 text-white mb-4 shadow-xl shadow-green-500/20 text-lg py-7 font-black rounded-xl transition-all" 
                >
                  GARANTIR MEU ACESSO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Segurança e Garantia */}
                <div className="flex items-center justify-center gap-4 text-black/30 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Seguro</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 7 Dias</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal de confirmação */}
      <MiniPreCheckout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};
