const Benefits = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* Badge de contexto */}
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            O SISTEMA
          </span>
        </div>
        
        {/* Título principal */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
            O que muda na sua vida em{" "}
            <span className="text-accent">8 semanas:</span>
          </h2>
          
          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-2">
            Não é só sobre ganhar músculo.
          </p>
          
          {/* Frase de impacto */}
          <p className="text-lg sm:text-xl font-semibold text-foreground mb-8">
            É sobre treinar com método e finalmente ver resultados.
          </p>
          
          {/* Descrição */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>
            Treinar muda completamente quando você entra na academia sabendo exatamente o que fazer — o treino deixa de ser ansiedade e vira execução.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
