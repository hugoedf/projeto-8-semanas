import { Target } from "lucide-react";

const DecisionBlock = () => {
  return (
    <section className="decision-section bg-slate-50 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Badge de capítulo */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2.5 uppercase text-xs font-bold tracking-[0.15em] text-accent">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-accent" />
            </div>
            Decisão Simples
          </span>
        </div>
        
        {/* Card de decisão premium */}
        <div className="decision-card">
          {/* Intro suave */}
          <p className="text-slate-500 text-base sm:text-lg mb-6" style={{ lineHeight: '1.8' }}>
            Você pode continuar tentando sozinho.
          </p>
          
          {/* Bloco de impacto interno */}
          <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-7 mb-8">
            <p className="text-slate-600 text-base sm:text-lg mb-4" style={{ lineHeight: '1.8' }}>
              Não é sobre fazer mais esforço.
            </p>
            <p className="text-foreground font-semibold text-lg sm:text-xl" style={{ lineHeight: '1.7' }}>
              É sobre finalmente direcionar o esforço certo.
            </p>
          </div>
          
          {/* Fechamento de decisão */}
          <p className="text-slate-500 text-lg sm:text-xl mb-4">
            A decisão é simples:
          </p>
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground leading-tight tracking-[-0.02em]">
            continuar tentando no escuro ou seguir um{" "}
            <span className="text-accent">método estruturado que funciona.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
