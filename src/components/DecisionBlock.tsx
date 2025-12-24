const DecisionBlock = () => {
  return (
    <section className="py-12 sm:py-16 bg-muted/50">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card/80 border border-border/60 rounded-2xl p-8 sm:p-10">
            <p className="text-muted-foreground text-base sm:text-lg mb-5 leading-relaxed">
              Não é sobre fazer mais esforço. É sobre finalmente direcionar o esforço certo.
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl mb-3">
              A decisão é simples:
            </p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
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
