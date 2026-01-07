import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Shield } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useState, useEffect } from "react";

const CTA = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();

  // URGÊNCIA: Contador regressivo
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (CTA FINAL) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsla(18,100%,58%,0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main CTA Card */}
        <div className="max-w-2xl mx-auto">
          {/* URGÊNCIA: Banner com contador */}
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl px-6 py-4 flex items-center gap-3 justify-center">
            <Clock className="w-5 h-5 text-red-500 animate-pulse flex-shrink-0" />
            <div className="text-center">
              <p className="text-red-500 font-bold text-base sm:text-lg">
                ⏰ Oferta expira em: <span className="font-mono text-lg">{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
              </p>
              <p className="text-red-400 text-xs sm:text-sm mt-1">Garanta seu acesso agora antes que as vagas acabem</p>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-accent/30 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl shadow-black/50">
            {/* Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white text-center mb-6">
              Pronto para sua <span className="text-accent">transformação?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/80 text-center mb-8">
              Acesso completo ao método 8x + App + Primeiros treinos + Suporte
            </p>

            {/* ESCASSEZ: Vagas limitadas */}
            <div className="mb-8 bg-yellow-500/15 border border-yellow-500/40 rounded-lg px-6 py-4 text-center">
              <p className="text-yellow-300 font-bold text-base sm:text-lg">
                ⚠️ <span className="text-yellow-200">Restam apenas 47 vagas</span> nesta turma
              </p>
              <p className="text-yellow-400/80 text-sm mt-2">Próxima turma abre em 30 dias</p>
            </div>

            {/* Price Section */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <p className="text-white/60 text-sm line-through">De R$ 197,00</p>
                <p className="text-4xl sm:text-5xl font-black text-accent">R$ 19,90</p>
                <p className="text-white/70 text-sm mt-2">Investimento único (sem mensalidades)</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3 mb-10 bg-white/5 rounded-lg p-6">
              <p className="text-white font-semibold text-sm sm:text-base mb-4">✓ O que você recebe:</p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base">Acesso ao app com 8 semanas de treino estruturado</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base">Progressão automática baseada em seu desempenho</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base">Primeiros treinos liberados imediatamente</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base">Suporte via WhatsApp com a equipe</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm sm:text-base">Comunidade exclusiva de 500+ alunos</span>
                </div>
              </div>
            </div>

            {/* Main CTA Button */}
            <Button
              variant="cta"
              size="cta"
              onClick={handleCTAClick}
              className="w-full mb-6 shadow-2xl shadow-accent/40 hover:scale-105 transition-transform text-base sm:text-lg py-6 sm:py-7"
            >
              🚀 COMEÇAR MINHA TRANSFORMAÇÃO - R$ 19,90
              <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
            </Button>

            {/* Guarantee Section */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-6 py-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-bold text-sm sm:text-base">
                    7 Dias de Garantia 100%
                  </p>
                  <p className="text-green-400/80 text-xs sm:text-sm mt-1">
                    Se não gostar, devolvemos seu dinheiro sem perguntas. Sem risco!
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <p className="text-white/60 text-xs sm:text-sm text-center mt-8">
              ✅ 500+ homens transformados • ⭐ 4.9/5 de avaliação • 📱 App disponível para iOS e Android
            </p>
          </div>

          {/* Alternative CTA */}
          <div className="text-center mt-8">
            <p className="text-white/70 text-sm mb-4">Tem dúvidas? Fale com a gente:</p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-semibold"
            >
              💬 Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
