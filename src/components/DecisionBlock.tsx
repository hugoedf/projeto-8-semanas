const DecisionBlock = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(16,100%,60%,0.1),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">VOCÊ PODE CONTINUAR TENTANDO SOZINHO</span>
          
          <div className="mb-8">
            <p className="text-white/70 text-lg sm:text-xl mb-3" style={{ lineHeight: '1.8' }}>Não é sobre fazer mais esforço.</p>
            <p className="text-white font-semibold text-lg sm:text-xl" style={{ lineHeight: '1.8' }}>É sobre finalmente direcionar o esforço certo.</p>
          </div>
          
          <div className="bg-[#1a1a1a] backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-8 sm:p-10">
            <p className="text-white/60 text-base mb-4">A decisão é simples:</p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-accent leading-tight tracking-tight">
              Continuar tentando no escuro ou seguir um <span className="text-white font-bold">método estruturado que funciona.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;