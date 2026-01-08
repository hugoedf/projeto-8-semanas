/**
 * Componente: UrgencyInternal
 * 
 * ⚠️ INSTRUÇÕES DE INSTALAÇÃO:
 * 
 * 1. Copie este arquivo para: src/components/UrgencyInternal.tsx
 * 
 * 2. Abra src/pages/Index.tsx e adicione o import:
 *    import UrgencyInternal from "@/components/UrgencyInternal";
 * 
 * 3. Localize esta seção:
 *    <Guarantee />
 *    <DecisionBlock />
 * 
 * 4. Mude para:
 *    <Guarantee />
 *    <UrgencyInternal />
 *    <DecisionBlock />
 * 
 * 5. Salve e teste
 */

import { Clock, AlertCircle, TrendingUp } from "lucide-react";

const UrgencyInternal = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 section-dark-premium relative overflow-hidden">
      {/* Animated accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header com ícone */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent animate-pulse" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent/80">
              ⏰ CADA DIA QUE PASSA
            </span>
          </div>
          
          {/* Main headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Você está <span className="text-accent drop-shadow-[0_0_15px_hsla(18,100%,58%,0.3)]">perdendo uma oportunidade</span>
          </h2>
          
          {/* Body text - Urgency narrative */}
          <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed text-center">
              Você já sabe o problema. Já sabe a causa. Já viu os resultados de outras pessoas.
            </p>
            
            <p className="text-white/80 text-base sm:text-lg leading-relaxed text-center">
              A única coisa que falta é você <span className="text-accent font-bold">COMEÇAR AGORA</span>.
            </p>
            
            <div className="card-dark-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Mas aqui está a verdade que ninguém quer ouvir: <span className="text-white font-semibold">enquanto você lê isso, mais uma semana passa</span>. Mais uma semana de treino sem progressão. Mais uma semana de frustração. Mais uma semana sendo o cara que "treina mas não parece".
              </p>
            </div>
          </div>
          
          {/* The contrast: What you could have */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {/* Left: What happens if you wait */}
            <div className="card-dark-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-red-500/20">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-400/80 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-400/80">Se você esperar</span>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Daqui a 8 semanas, você estará no mesmo lugar. Mesma frustração. Mesma estagnação. Mesma dúvida.
              </p>
            </div>
            
            {/* Right: What happens if you start now */}
            <div className="card-dark-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-accent/30 bg-accent/[0.03]">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent/80 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent/80">Se você começar AGORA</span>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Daqui a 8 semanas: +2-3cm de braço, +5-10kg de força, confiança de quem domina o próprio corpo.
              </p>
            </div>
          </div>
          
          {/* The real cost of waiting */}
          <div className="card-dark-glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl mb-10 sm:mb-12">
            <h3 className="text-white font-display text-xl sm:text-2xl md:text-3xl mb-5 sm:mb-6 tracking-tight">
              O custo real de esperar:
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 sm:gap-4 text-white/70">
                <span className="text-accent font-bold text-lg mt-0.5 flex-shrink-0">→</span>
                <span className="text-sm sm:text-base leading-relaxed">Mais 8 semanas de esforço sem retorno</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 text-white/70">
                <span className="text-accent font-bold text-lg mt-0.5 flex-shrink-0">→</span>
                <span className="text-sm sm:text-base leading-relaxed">Mais frustração acumulada</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 text-white/70">
                <span className="text-accent font-bold text-lg mt-0.5 flex-shrink-0">→</span>
                <span className="text-sm sm:text-base leading-relaxed">Mais tempo perdido sendo "o cara que treina mas não parece"</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 text-white/70">
                <span className="text-accent font-bold text-lg mt-0.5 flex-shrink-0">→</span>
                <span className="text-sm sm:text-base leading-relaxed">Mais dúvida sobre sua capacidade de mudar</span>
              </li>
            </ul>
          </div>
          
          {/* The final push */}
          <div className="text-center space-y-4 sm:space-y-5">
            <p className="text-white/60 text-base sm:text-lg">
              O preço pode mudar. A oportunidade pode não voltar. Mas o tempo?
            </p>
            <p className="text-accent font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-[0_0_15px_hsla(18,100%,58%,0.2)]">
              Esse está passando AGORA.
            </p>
          </div>
          
        </div>
      </div>
      
      {/* Animated accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default UrgencyInternal;
