const DecisionBlock = () => {
  return (
    <section className="py-12 sm:py-16 section-dark-premium relative overflow-hidden">
      {/* Subtle orange accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsla(18,100%,58%,0.05),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10">
            <p className="text-white/70 text-base sm:text-lg mb-5 leading-relaxed">
              Não é sobre fazer mais esforço. É sobre finalmente direcionar o esforço certo.
            </p>
            <p className="text-white/70 text-lg sm:text-xl mb-3">
              A decisão é simples:
            </p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              continuar tentando no escuro ou seguir um{" "}
              <span className="text-accent">método estruturado que funciona.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
