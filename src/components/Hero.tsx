import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { useParallax } from "@/hooks/useParallax";
import LiveViewers from "@/components/LiveViewers";

const Hero = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  const { ctaVisible } = useCTAVisibility();
  const parallaxOffset = useParallax({ speed: 0.08 });

  // URGÊNCIA REAL
  const [urgencyData, setUrgencyData] = useState({
    timeLeft: { hours: 24, minutes: 0, seconds: 0 },
    vagasRestantes: 47,
  });

  useEffect(() => {
    const TEMPO_INICIAL_MS = 24 * 60 * 60 * 1000; // 24h
    const VAGAS_INICIAIS = 47;
    const STORAGE_KEY = 'metodo8x_urgency_timestamp';

    let primeiraVisitaTimestamp = localStorage.getItem(STORAGE_KEY);
    if (!primeiraVisitaTimestamp) {
      primeiraVisitaTimestamp = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, primeiraVisitaTimestamp);
    }

    const atualizarUrgencia = () => {
      const agora = Date.now();
      const primeiraVisita = parseInt(primeiraVisitaTimestamp!);
      const tempoDecorrido = agora - primeiraVisita;

      const tempoRestante = Math.max(0, TEMPO_INICIAL_MS - tempoDecorrido);
      const horas = Math.floor(tempoRestante / (1000 * 60 * 60));
      const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

      const vagasUsadas = Math.floor(tempoDecorrido / (30 * 60 * 1000));
      const vagasRestantes = Math.max(1, VAGAS_INICIAIS - vagasUsadas);

      setUrgencyData({ timeLeft: { hours: horas, minutes: minutos, seconds: segundos }, vagasRestantes });
    };

    atualizarUrgencia();
    const interval = setInterval(atualizarUrgencia, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);

    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden section-dark-premium">
      {/* Background overlays for depth */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.1),transparent_60%)]"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />

      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-7xl mx-auto w-full">
          
          {/* Content Column */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start">
            <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 lg:mb-6 font-mono text-center lg:text-left">
              Transformação em 8 Semanas
            </p>

            <h1 className="font-display text-[1.65rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-[2.6rem] lg:leading-[1.15] text-white tracking-tight mb-4 sm:mb-6 px-1 sm:px-0">
              Em <span className="text-accent">8 semanas</span>, conquiste <span className="text-accent">músculos reais</span>, força de verdade e <span className="text-accent">definição</span> que aparece no espelho — sem depender de motivação.
            </h1>

            <p className="text-base sm:text-lg lg:text-[1.125rem] leading-relaxed max-w-xl text-white/75 mb-6 lg:mb-8 px-1 sm:px-0">
              <span className="text-white font-semibold">Pare de contar com motivação.</span> — Use um <span className="text-accent font-semibold">protocolo baseado em Fisiologia Progressiva</span> e veja <span className="text-white font-medium">resultados previsíveis toda semana</span>.
            </p>

            {/* Mockup Image - Mobile */}
            <div className="relative w-full max-w-[340px] mx-auto lg:hidden mb-5">
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.3)_0%,hsla(18,100%,55%,0.15)_45%,transparent_70%)] blur-[35px] rounded-[40px]" />
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,60%,0.4)_0%,transparent_60%)] blur-[25px] rounded-2xl" />
              <div className="relative z-10 rounded-xl overflow-hidden ring-1 ring-accent/20 shadow-lg">
                <img 
                  src="/images/4e8b313a-0782-4511-b347-23fcf48.png" 
                  alt="Mockup do Método 8X" 
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>

            {/* CTA - Mobile */}
            <div className="w-full max-w-[340px] mx-auto lg:hidden text-center space-y-4">
              <p className="text-white/70 text-sm italic">
                Se esforço sozinho funcionasse, seu corpo já teria mudado.
              </p>

              <Button
                variant="cta"
                size="cta"
                onClick={handleCTAClick}
                className="w-full shadow-xl shadow-accent/30 hover:scale-[1.02] transition-transform text-base py-5"
              >
                Acessar o Método 8X agora
              </Button>

              <div className="space-y-1.5 text-white/60 text-xs">
                <p>✔ App + método completo</p>
                <p>✔ 8 semanas estruturadas, passo a passo</p>
                <p>✔ Garantia de 7 dias — risco zero</p>
              </div>
            </div>
          </div>

          {/* Mockup - Desktop */}
          <div className="hidden lg:flex flex-col justify-center items-center relative animate-fade-in" style={{ animationDelay: "0.15s", transform: `translateY(${parallaxOffset * 0.3}px)` }}>
            <div className="absolute -inset-16 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.5)_0%,hsla(18,100%,50%,0.22)_35%,transparent_65%)] blur-[60px] rounded-[60px]" />
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.35)_0%,transparent_55%)] blur-[35px] rounded-2xl" />
            <div className="relative z-10 w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-accent/15 shadow-2xl shadow-black/40">
                <img 
                  src="/images/4e8b313a-0782-4511-b347-23fcf48.png" 
                  alt="Mockup do Método 8X" 
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>

            {/* CTA - Desktop */}
            <div className="relative z-10 w-full max-w-lg mt-6 text-center space-y-4">
              <p className="text-white/70 text-sm italic">
                Se esforço sozinho funcionasse, seu corpo já teria mudado.
              </p>

              <Button
                variant="cta"
                size="cta"
                onClick={handleCTAClick}
                className="w-full shadow-xl shadow-accent/30 hover:scale-[1.02] transition-transform text-base py-5"
              >
                Acessar o Método 8X agora
              </Button>

              <div className="flex justify-center gap-6 text-white/60 text-xs">
                <p>✔ App + método completo</p>
                <p>✔ 8 semanas estruturadas</p>
                <p>✔ Garantia de 7 dias</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex opacity-60 z-10">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
