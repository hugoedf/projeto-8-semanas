import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Lock, Shield, CreditCard, Zap, Users, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniPreCheckoutModal } from './MiniPreCheckout';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { buildHotmartCheckoutUrl } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/useMetaPixel';

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vagas, setVagas] = useState(12);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  // Timer de urgência
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 24 * 60 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Benefícios COMPLETOS da versão antiga + melhorados
  const benefits = [
    "E-book + App 8X — o sistema completo",
    "8 semanas estruturadas — só seguir e executar",
    "Nutrição prática — sem dieta maluca",
    "Técnicas avançadas — para quebrar estagnação",
    "Acesso vitalício — seu para sempre",
    "Garantia de 7 dias — risco zero pra você"
  ];

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ CHECKOUT INICIADO (APÓS CONFIRMAÇÃO DO MINI-CHECKOUT)');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <section id="cta-section" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsla(18,100%,58%,0.06),transparent_50%)]" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* TÍTULO NO TOPO */}
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
            
            {/* COLUNA ESQUERDA: MOCKUP */}
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

            {/* COLUNA DIREITA: O CARD DE VENDA */}
            <div className="w-full lg:w-1/2 max-w-md">
              <div className="bg-white border border-black/5 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                
                {/* Badge Interno */}
                <div className="mb-6">
                  <span className="text-accent text-xs uppercase tracking-widest font-black bg-accent/5 px-3 py-1 rounded-full">
                    Acesso Imediato
                  </span>
                </div>

                {/* Headline Principal */}
                <h3 className="font-display text-2xl sm:text-3xl mb-4 tracking-tight text-black leading-tight font-bold">
                  Comece agora. Veja resultados em 8 semanas.
                </h3>
                
                {/* Subheadline */}
                <p className="text-black/60 text-sm mb-6 leading-relaxed">
                  Menos que uma refeição — e evita semanas de treino jogadas fora. Risco zero pra você.
                </p>
                
                {/* Checklist de Benefícios COMPLETO */}
                <div className="space-y-2.5 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-black/80 text-sm sm:text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Prova Social - NOVO */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-green-900 text-xs sm:text-sm font-bold">
                      +500 pessoas já transformaram seus treinos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="text-green-700 text-xs font-semibold">Avaliação média 4.9/5</span>
                  </div>
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

                {/* BOTÃO VERDE PRINCIPAL */}
                <Button 
                  onClick={handleCTAClick} 
                  className="w-full bg-green-500 hover:bg-green-600 text-white mb-4 shadow-xl shadow-green-500/20 text-lg py-7 font-black rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]" 
                >
                  GARANTIR MEU ACESSO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Urgência e Escassez - NOVO */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-red-600 text-xs font-bold">
                    <AlertCircle className="w-3 h-3" />
                    <span>Restam {vagas} vagas hoje</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Oferta por mais {formatTime(timeLeft)}</span>
                  </div>
                </div>

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

      {/* Modal de Pré-Checkout com Qualificação */}
      <MiniPreCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default CTA;
