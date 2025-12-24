const WhyExists = () => {
  return (
    <section className="py-14 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Título editorial */}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground text-center mb-6 tracking-tight">
            Por que o <span className="text-accent">Método 8X</span> existe
          </h2>
          
          {/* Texto limpo - bloco editorial */}
          <div className="bg-card/60 border border-border/60 rounded-2xl p-6 sm:p-8">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              Depois de observar por anos pessoas treinando pesado, se dedicando e mesmo assim ficando estagnadas, ficou claro que o problema não era falta de esforço —{" "}
              <span className="text-foreground font-medium">era falta de um sistema simples, progressivo e aplicável no dia a dia.</span>
            </p>
            <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium">
              O Método 8X nasceu para resolver exatamente isso: transformar conhecimento em execução, sem improviso, sem achismo e sem depender de motivação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
