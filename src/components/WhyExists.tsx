/**
 * Componente: WhyMethodExists (Com Design Visual Exato)
 * 
 * ⚠️ INSTRUÇÕES DE INSTALAÇÃO:
 * 
 * 1. Copie este arquivo para: src/components/WhyMethodExists.tsx
 * 
 * 2. Abra src/pages/Index.tsx e SUBSTITUA:
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
    <section className="py-16 sm:py-20 lg:py-24 section-dark-premium relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Título Principal */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-12 sm:mb-14 lg:mb-16 tracking-tight leading-[1.1]">
            Por que o Método <span className="text-accent">8X</span> existe
          </h2>

          {/* Grid Layout - 2 colunas em desktop, 1 em mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Coluna Esquerda - Narrativa Principal */}
            <div className="space-y-5 sm:space-y-6">
              
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Durante anos, vi pessoas treinando com <span className="text-white font-semibold">dedicação real</span>. Acordando cedo, abrindo mão de compromissos, entrando pesado toda semana.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                E mesmo assim, ficavam travadas. Meses passavam e o corpo não respondia.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                O problema não era a pessoa.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Era o que o mercado oferecia: <span className="text-white font-semibold">treinos genéricos, planos que funcionam na teoria mas travam na prática</span>, informação demais e execução de menos.
              </p>

            </div>

            {/* Coluna Direita - Boxes Destacados */}
            <div className="space-y-5 sm:space-y-6">
              
              {/* Box 1 - Faltava um sistema */}
              <div className="card-dark-glass p-6 sm:p-7 rounded-2xl border border-accent/20">
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Faltava um sistema <span className="text-white font-semibold">simples, progressivo e aplicável</span>.
                </p>
              </div>

              {/* Box 2 - Algo que transformasse */}
              <div className="card-dark-glass p-6 sm:p-7 rounded-2xl border border-accent/20">
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Algo que transformasse <span className="text-white font-semibold">conhecimento em ação diária</span> — sem precisar decorar nada, sem depender de motivação, sem improvisar.
                </p>
              </div>

            </div>

          </div>

          {/* Divisor Visual */}
          <div className="my-10 sm:my-12 lg:my-14 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {/* Seção Final - Full Width */}
          <div className="space-y-6 sm:space-y-8">
            
            <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed font-semibold">
              O Método 8X nasceu para resolver exatamente isso:
            </p>

            <div className="card-dark-glass p-8 sm:p-10 lg:p-12 rounded-2xl border border-accent/30 bg-accent/[0.03]">
              <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                <span className="text-accent font-semibold">Transformar treino em execução guiada</span>, com progressão clara semana a semana — sem achismo, sem tentativa e erro, sem depender de força de vontade.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMethodExists;
