import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Check } from "lucide-react";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";
import VSLPlayer from "@/components/VSLPlayer";
import { useState, useEffect } from "react";
import { useCTAVisibility } from "@/contexts/CTAVisibilityContext";
import { useParallax } from "@/hooks/useParallax";
import LiveViewers from "@/components/LiveViewers";
const Hero = () => {
  const {
    trackInitiateCheckout
  } = useMetaPixel();
  const {
    visitorData
  } = useVisitorTracking();
  const [vslEnded, setVslEnded] = useState(false);
  const {
    ctaVisible
  } = useCTAVisibility();
  const parallaxOffset = useParallax({
    speed: 0.08
  });

  // URGÊNCIA REAL: Rastreia tempo decorrido desde primeira visita
  const [urgencyData, setUrgencyData] = useState({
    timeLeft: {
      hours: 24,
      minutes: 0,
      seconds: 0
    },
    vagasRestantes: 47
  });
  useEffect(() => {
    const TEMPO_INICIAL_MS = 24 * 60 * 60 * 1000; // 24 horas em ms
    const VAGAS_INICIAIS = 47;
    const STORAGE_KEY = 'metodo8x_urgency_timestamp';

    // Primeira visita: salva o timestamp
    let primeiraVisitaTimestamp = localStorage.getItem(STORAGE_KEY);
    if (!primeiraVisitaTimestamp) {
      primeiraVisitaTimestamp = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, primeiraVisitaTimestamp);
    }

    // Função para atualizar urgência
    const atualizarUrgencia = () => {
      const agora = Date.now();
      const primeiraVisita = parseInt(primeiraVisitaTimestamp!);
      const tempoDecorrido = agora - primeiraVisita;

      // Calcula tempo restante
      const tempoRestante = Math.max(0, TEMPO_INICIAL_MS - tempoDecorrido);
      const horas = Math.floor(tempoRestante / (1000 * 60 * 60));
      const minutos = Math.floor(tempoRestante % (1000 * 60 * 60) / (1000 * 60));
      const segundos = Math.floor(tempoRestante % (1000 * 60) / 1000);

      // Calcula vagas restantes baseado em tempo
      // A cada 30 minutos que passa, diminui 1 vaga
      const vagasUsadas = Math.floor(tempoDecorrido / (30 * 60 * 1000));
      const vagasRestantes = Math.max(1, VAGAS_INICIAIS - vagasUsadas);
      setUrgencyData({
        timeLeft: {
          hours: horas,
          minutes: minutos,
          seconds: segundos
        },
        vagasRestantes
      });
    };

    // Atualiza imediatamente
    atualizarUrgencia();

    // Atualiza a cada segundo
    const interval = setInterval(atualizarUrgencia, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleVSLEnd = () => {
    setVslEnded(true);
    console.log('📊 VSL completed - CTA emphasis activated');
  };
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (HERO) =====');
    console.log('🔗 URL final com rastreamento completo:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('📍 Parâmetros capturados:', {
      tracking_id: localStorage.getItem('visitor_id'),
      utm_source: localStorage.getItem('utm_source'),
      utm_medium: localStorage.getItem('utm_medium'),
      utm_campaign: localStorage.getItem('utm_campaign'),
      utm_term: localStorage.getItem('utm_term'),
      utm_content: localStorage.getItem('utm_content'),
      fbclid: localStorage.getItem('fbclid'),
      gclid: localStorage.getItem('gclid'),
      ttclid: localStorage.getItem('ttclid'),
      msclkid: localStorage.getItem('msclkid')
    });
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };
  return <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden section-dark-premium">
      {/* Background overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(18,100%,58%,0.1),transparent_60%)]" style={{
      transform: `translateY(${parallaxOffset * 0.5}px)`
    }} />
      
      {/* BANNER TOPO: Contador REAL + Vagas REAIS (Esticado) */}
      <div className="w-full bg-red-500/10 border-b border-red-500/30 px-4 sm:px-6 py-3 sm:py-4 relative z-20">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Clock className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
            <span className="text-red-500 font-semibold text-sm sm:text-base">
              Seu acesso promocional expira em: <span className="font-mono text-red-400">{String(urgencyData.timeLeft.hours).padStart(2, '0')}:{String(urgencyData.timeLeft.minutes).padStart(2, '0')}:{String(urgencyData.timeLeft.seconds).padStart(2, '0')}</span>
            </span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-red-500/20" />
          
          <div className="flex items-center gap-2 whitespace-nowrap">
            
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-7xl mx-auto w-full">
          {/* Content Column */}
          <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start">
            
            {/* Teaser */}
            <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 lg:mb-6 font-mono text-center lg:text-left">
              ⚡ Método Comprovado de Transformação Física
            </p>
            
            {/* TÍTULO PRINCIPAL */}
            <h1 className="font-display text-[1.65rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-[2.6rem] lg:leading-[1.15] text-white tracking-tight mb-4 sm:mb-6 px-1 sm:px-0">
              O Sistema de <span className="text-accent">8 Semanas</span> que Faz Seu Corpo <span className="text-accent">Crescer</span>, Ganhar <span className="text-accent">Força Real</span> e Eliminar o <span className="text-accent">Improviso</span>.
            </h1>

            {/* SUBTÍTULO - OTIMIZADO */}
            <p className="text-base sm:text-lg lg:text-[1.125rem] leading-relaxed max-w-xl text-white/75 mb-6 lg:mb-8 px-1 sm:px-0">
              Mais de <span className="text-white font-semibold">500 pessoas</span> já 
              <span className="text-white font-medium"> ganharam músculo e força</span> em 
              <span className="text-accent font-semibold"> 8 semanas</span> com um método 
              <span className="text-white font-medium"> estruturado e progressivo</span> — 
              <span className="text-white/80"> sem dietas extremas e sem achismo</span>.
            </p>

            
            {/* VSL Player - Mobile only */}
            <div className="relative w-full max-w-[340px] mx-auto lg:hidden mb-6">
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.3)_0%,hsla(18,100%,55%,0.15)_45%,transparent_70%)] blur-[35px] rounded-[40px]" />
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,60%,0.4)_0%,transparent_60%)] blur-[25px] rounded-2xl" />
              <div className="relative z-10 rounded-xl overflow-hidden ring-1 ring-accent/20 shadow-lg">
                <VSLPlayer onVideoEnd={handleVSLEnd} />
              </div>
            </div>
            
            {/* CTA Button */}
            <div className={`w-full sm:w-auto mb-4 sm:mb-6 ${vslEnded ? 'scale-105' : ''}`}>
              <Button variant="cta" size="cta" onClick={handleCTAClick} className={`w-full sm:w-auto shadow-2xl shadow-accent/40 ${vslEnded ? 'animate-pulse-glow ring-2 ring-accent/50' : 'animate-pulse-glow'} hover:scale-105 transition-transform text-base sm:text-lg py-6 sm:py-7`}>
                GARANTIR ACESSO AGORA - R$19,90
                <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
              </Button>
            </div>

            {/* ABAIXO DO CTA: Garantia + Benefícios */}
            <div className="w-full max-w-md lg:max-w-none space-y-2.5">
              <div className="flex items-center gap-2 text-white/85 text-xs sm:text-sm">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span><span className="font-semibold">7 dias de garantia 100%</span> - Seu dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-xs sm:text-sm">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span><span className="font-semibold">Acesso imediato ao app</span> + primeiros treinos</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-xs sm:text-sm">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span><span className="font-semibold">500+ pessoas</span> já transformadas com sucesso</span>
              </div>
            </div>

            {/* Live viewers + Micro-gatilho */}
            <div className="mt-6 lg:mt-8 space-y-3">
              <LiveViewers />
              <p className="text-white/50 text-sm sm:text-base italic">
                Fechar essa página mantém você treinando no escuro
              </p>
            </div>
          </div>
          
          {/* VSL Player Column - Right on desktop only */}
          <div className="hidden lg:flex justify-center relative animate-fade-in" style={{
          animationDelay: "0.15s",
          transform: `translateY(${parallaxOffset * 0.3}px)`
        }}>
            {/* Background glow for visual focus */}
            <div className="absolute -inset-16 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.5)_0%,hsla(18,100%,50%,0.22)_35%,transparent_65%)] blur-[60px] rounded-[60px]" />
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.35)_0%,transparent_55%)] blur-[35px] rounded-2xl" />
            <div className="relative z-10 w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-accent/15 shadow-2xl shadow-black/40">
                <VSLPlayer onVideoEnd={handleVSLEnd} />
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
    </section>;
};
export default Hero;