const DecisionBlock = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* BLOCO DE DECISÃO - Impacto máximo */}
        <div className="decision-card">
          
          {/* Intro suave */}
          <p className="text-slate-500 text-base sm:text-lg mb-4" style={{ lineHeight: '1.8' }}>
            Você pode continuar tentando sozinho.
          </p>
          
          {/* Bloco de impacto interno */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-6 mb-6">
            <p className="text-slate-600 text-base mb-2" style={{ lineHeight: '1.8' }}>
              Não é sobre fazer mais esforço.
            </p>
            <p className="text-foreground font-semibold text-lg sm:text-xl" style={{ lineHeight: '1.7' }}>
              É sobre finalmente direcionar o esforço certo.
            </p>
          </div>
          
          {/* Badge inline sutil */}
          <span className="inline-block uppercase text-xs font-bold tracking-[0.15em] text-accent mb-4">
            Decisão Simples
          </span>
          
          {/* Fechamento de decisão */}
          <p className="text-slate-500 text-base sm:text-lg mb-2">
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
