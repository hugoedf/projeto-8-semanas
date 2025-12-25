const DecisionBlock = () => {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Card de decisão - impacto máximo mas compacto */}
        <div className="decision-card">
          {/* Badge simples */}
          <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.12em] mb-4">
            Decisão Simples
          </span>
          
          {/* Intro */}
          <p className="text-slate-500 text-sm sm:text-base mb-5" style={{ lineHeight: '1.7' }}>
            Você pode continuar tentando sozinho.
          </p>
          
          {/* Bloco de impacto interno */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 mb-5">
            <p className="text-slate-600 text-sm sm:text-base mb-2" style={{ lineHeight: '1.7' }}>
              Não é sobre fazer mais esforço.
            </p>
            <p className="text-foreground font-semibold text-base sm:text-lg" style={{ lineHeight: '1.6' }}>
              É sobre finalmente direcionar o esforço certo.
            </p>
          </div>
          
          {/* Fechamento de decisão */}
          <p className="text-slate-500 text-sm sm:text-base mb-2">
            A decisão é simples:
          </p>
          <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground leading-tight tracking-[-0.02em]">
            continuar tentando no escuro ou seguir um{" "}
            <span className="text-accent">método estruturado que funciona.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
