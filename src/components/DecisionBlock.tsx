const DecisionBlock = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(18,100%,58%,0.1),transparent_60%)]" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge de contexto */}
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">
            VOCÊ PODE CONTINUAR TENTANDO SOZINHO
          </span>
          
          {/* Texto de apoio */}
          <div className="mb-8">
            <p className="text-gray-400 text-lg sm:text-xl mb-3" style={{ lineHeight: '1.8' }}>
              Não é sobre fazer mais esforço.
            </p>
            <p className="text-white font-semibold text-lg sm:text-xl" style={{ lineHeight: '1.8' }}>
              É sobre finalmente direcionar o esforço certo.
            </p>
          </div>
          
          {/* Card de decisão */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 sm:p-10">
            <p className="text-gray-500 text-base mb-4">A decisão é simples:</p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-tight tracking-tight">
              Continuar tentando no escuro ou seguir um{" "}
              <span className="text-accent font-bold">método estruturado que funciona.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionBlock;
