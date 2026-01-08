/**
 * Componente: WhyMethodExists (Restaurado)
 * 
 * ⚠️ INSTRUÇÕES DE INSTALAÇÃO:
 * 
 * 1. Copie este arquivo para: src/components/WhyMethodExists.tsx
 * 
 * 2. Abra src/pages/Index.tsx e SUBSTITUA a seção WhyExists:
 * 
 *    ANTES:
 *    import WhyExists from "@/components/WhyExists";
 *    ...
 *    <WhyExists />
 * 
 *    DEPOIS:
 *    import WhyMethodExists from "@/components/WhyMethodExists";
 *    ...
 *    <WhyMethodExists />
 * 
 * 3. Salve e teste
 */

const WhyMethodExists = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 sm:mb-12 lg:mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Por que o <span className="text-accent">Método 8X</span> existe
            </h2>
          </div>

          {/* Main narrative - The origin story */}
          <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12 lg:mb-14">
            
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Durante anos, vi pessoas treinando com <span className="font-semibold text-foreground">dedicação real</span>. Acordando cedo, abrindo mão de compromissos, entrando pesado toda semana.
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              E mesmo assim, ficavam travadas. Meses passavam e o corpo não respondia.
            </p>

            {/* The problem identified */}
            <div className="card-premium p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-l-4 border-accent bg-accent/5">
              <p className="text-base sm:text-lg text-foreground font-semibold mb-3">
                O problema não era a pessoa.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Era o que o mercado oferecia: <span className="font-semibold">treinos genéricos, planos que funcionam na teoria mas travam na prática</span>, informação demais e execução de menos.
              </p>
            </div>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Faltava um sistema simples, progressivo e aplicável.
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Algo que transformasse <span className="font-semibold text-foreground">conhecimento em ação diária</span> — sem precisar decorar nada, sem depender de motivação, sem improvisar.
            </p>

          </div>

          {/* The solution - Why it was created */}
          <div className="section-dark-premium p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl mb-10 sm:mb-12 lg:mb-14">
            
            <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 tracking-tight">
              O Método 8X nasceu para resolver exatamente isso:
            </h3>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              <span className="text-accent font-semibold">Transformar treino em execução guiada</span>, com progressão clara semana a semana — sem achismo, sem tentativa e erro, sem depender de força de vontade.
            </p>

          </div>

          {/* The insight - Why 8 weeks matters */}
          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 sm:mb-12 lg:mb-14">
            
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground mb-5 sm:mb-6 tracking-tight">
              O que muda quando você segue um método por <span className="text-accent">8 semanas</span>:
            </h3>

            <p className="text-foreground/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Não é só sobre ganhar músculo. É sobre <span className="font-semibold text-foreground">executar com progressão real</span> — e ver o resultado aparecer semana após semana.
            </p>

            {/* The transformation points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 border border-accent/30">
                    <span className="text-accent font-bold text-sm sm:text-base">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Cada treino com propósito</h4>
                  <p className="text-foreground/70 text-sm sm:text-base">Você entra na academia sabendo o que fazer — e sai sabendo que funcionou.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 border border-accent/30">
                    <span className="text-accent font-bold text-sm sm:text-base">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Resultados que você vê</h4>
                  <p className="text-foreground/70 text-sm sm:text-base">Quando você segue progressão, o espelho e a força respondem.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 border border-accent/30">
                    <span className="text-accent font-bold text-sm sm:text-base">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Estagnação quebrada</h4>
                  <p className="text-foreground/70 text-sm sm:text-base">O método força o corpo a continuar evoluindo — sem platô.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 border border-accent/30">
                    <span className="text-accent font-bold text-sm sm:text-base">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Menos tempo, mais resultado</h4>
                  <p className="text-foreground/70 text-sm sm:text-base">45-60min de treino focado entrega mais que 2h de improviso.</p>
                </div>
              </div>

            </div>

          </div>

          {/* The core insight */}
          <div className="space-y-6 sm:space-y-8">
            
            <div className="card-premium p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Treinar muda completamente quando você entra na academia sabendo exatamente o que fazer — o treino deixa de ser ansiedade e vira execução.
              </p>
            </div>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              E é exatamente aí que a maioria trava.
            </p>

            <div className="section-dark-premium p-8 sm:p-10 rounded-2xl sm:rounded-3xl">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                <span className="text-white font-semibold">Saber o que fazer é fácil.</span> Executar certo, toda semana, é o difícil.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMethodExists;
