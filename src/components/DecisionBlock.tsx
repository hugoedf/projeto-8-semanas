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
          <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground leading-tight tracking-[-0.02em]">
            Continuar tentando no escuro ou seguir um{" "}
            <span className="text-accent">método estruturado que funciona.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
