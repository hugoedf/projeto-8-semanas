const DecisionBlock = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Card de decisão */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 sm:p-10">
            <p className="text-gray-400 text-base sm:text-lg mb-4" style={{ lineHeight: '1.8' }}>
              A decisão é simples:
            </p>
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
