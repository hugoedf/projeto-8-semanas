const painPoints = [
  "Treina pesado, mas o corpo não acompanha",
  "Segue uma rotina, mas o shape parece sempre igual",
  "Passam semanas, meses… e nada muda",
  "Vê outras pessoas evoluindo mais rápido fazendo menos"
];

const explanationPoints = [
  { text: "O verdadeiro problema é", highlight: "treinar sem método." },
  { text: "Sem progressão clara, o corpo se adapta e", highlight: "para de responder." },
  { text: "Repetir os mesmos estímulos cria", highlight: "estagnação." },
  { text: "Cansa, ocupa tempo… mas", highlight: "não gera evolução real." }
];

const Problems = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          
          {/* 1️⃣ Headline provocativa */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-8 tracking-tight text-foreground animate-fade-in">
            Você treina, se esforça…<br />
            <span className="text-accent">e mesmo assim não vê resultado?</span>
          </h2>
          
          {/* 2️⃣ Lista de dores reais */}
          <div className="flex flex-col gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {painPoints.map((point, index) => (
              <p 
                key={index} 
                className="text-muted-foreground text-base sm:text-lg"
              >
                – {point}
              </p>
            ))}
          </div>
          
          {/* 3️⃣ Subtítulo de ruptura */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-foreground font-semibold text-lg sm:text-xl">
              O problema <span className="text-accent">não é falta de esforço.</span>
            </p>
          </div>
          
          {/* 4️⃣ Explicação lógica da dor */}
          <div className="flex flex-col gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {explanationPoints.map((point, index) => (
              <p 
                key={index}
                className="text-muted-foreground text-base sm:text-lg"
              >
                {point.text} <span className="text-foreground font-medium">{point.highlight}</span>
              </p>
            ))}
          </div>
          
          {/* 5️⃣ Fechamento de autoridade */}
          <div className="pt-6 border-t border-border/40 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-muted-foreground text-base sm:text-lg mb-2">
              A maioria das pessoas treina assim por anos.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mb-2">
              Não porque não querem evoluir —
            </p>
            <p className="text-foreground font-medium text-base sm:text-lg">
              mas porque ninguém ensinou um <span className="text-accent">sistema estruturado, progressivo e aplicável.</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Problems;