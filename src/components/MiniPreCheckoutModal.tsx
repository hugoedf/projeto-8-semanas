import React from 'react';
import { CheckCircle2, Lock, Clock, X } from 'lucide-react';
import { Button } from './ui/button';

interface MiniPreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const MiniPreCheckoutModal: React.FC<MiniPreCheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-8">
          {/* Headline */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Você está a 8 semanas de parar de errar no treino
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-medium">
              Antes de liberar seu acesso ao Método 8X, confirme se isso faz sentido pra você:
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              "Treino estruturado por 8 semanas",
              "Progressão definida (sem improviso)",
              "Aplicativo + Ebook inclusos",
              "Acesso imediato após a compra",
              "Garantia incondicional de 7 dias"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bloco de Segurança */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-500" />
              <span className="text-white text-xs sm:text-sm font-bold">
                Pagamento processado com segurança pela Hotmart
              </span>
            </div>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
              Cancelamento simples em até 7 dias, sem burocracia
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <Button
              onClick={onConfirm}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-black text-lg py-7 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-500/20"
            >
              IR PARA PAGAMENTO SEGURO
            </Button>

            {/* Microcopy */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] sm:text-xs">
              <Clock className="w-3 h-3" />
              <span>Leva menos de 1 minuto para concluir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
