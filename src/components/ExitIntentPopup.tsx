import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExitPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Detectar intenção de sair (movimento do mouse para fora)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Detectar tecla ESC (mobile/desktop)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Verificar se já foi mostrado nesta sessão
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) {
      setHasShown(true);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleConfirm = () => {
    window.location.href = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay escuro com blur */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal - Premium Design */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-12">
        <div className="relative w-full max-w-md bg-black border border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-orange-500/30 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Botão fechar - Premium */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Ícone de relógio - Premium com animação */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              {/* Círculo de fundo com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-orange-500/10 rounded-full border border-orange-500/40" />
              
              {/* Ícone com animação */}
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Headline - Premium */}
          <h2 className="text-center text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4 leading-tight">
            <span className="text-orange-500">Espera!</span> Você ia sair sem o método?
          </h2>

          {/* Descrição - Concisa e impactante */}
          <p className="text-center text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed font-medium">
            Se você fechar agora, volta a treinar no escuro. Mais um mês de esforço sem resultado.
          </p>

          {/* Aviso de urgência - Premium */}
          <div className="bg-gradient-to-r from-orange-500/15 to-orange-500/5 border border-orange-500/30 rounded-lg p-4 mb-6 sm:mb-8">
            <p className="text-center text-orange-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              Este preço não vai durar
            </p>
          </div>

          {/* Preço em destaque - Premium */}
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gray-500 text-xs sm:text-sm line-through mb-2 font-medium">De R$97</p>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <p className="text-4xl sm:text-5xl font-black text-orange-500">
                R$19,90
              </p>
            </div>
            <p className="text-orange-400 font-bold text-base sm:text-lg">79% OFF</p>
          </div>

          {/* CTA principal - Premium */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-base sm:text-lg font-bold py-4 sm:py-5 rounded-xl transition-all shadow-lg shadow-green-500/40 hover:shadow-green-500/60 mb-4 sm:mb-5"
          >
            ÚLTIMA CHANCE - GARANTIR ACESSO →
          </Button>

          {/* Microcopy com ícones - Premium */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-white/60 text-xs sm:text-sm flex-wrap mb-5 pb-5 border-b border-gray-800">
            <span className="flex items-center gap-1 hover:text-white/80 transition-colors">
              🔒 Pagamento Seguro
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="flex items-center gap-1 hover:text-white/80 transition-colors">
              ✅ Acesso Imediato
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="flex items-center gap-1 hover:text-white/80 transition-colors">
              🛡️ 7 Dias de Garantia
            </span>
          </div>

          {/* Opção de fechar - Premium */}
          <button
            onClick={handleClose}
            className="w-full text-center text-gray-500 hover:text-gray-300 text-xs sm:text-sm transition-colors font-medium py-2"
          >
            Não, prefiro continuar estagnado
          </button>
        </div>
      </div>
    </>
  );
};

export default ExitPopup;
