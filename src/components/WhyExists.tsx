/**
 * Componente: WhyMethodExists (EXATO como na imagem)
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
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-8 sm:mb-10 lg:mb-12 tracking-tight leading-[1.1]">
            Por que o Método <span className="text-accent">8X</span> existe
          </h2>

          {/* Main narrative */}
          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Durante anos, vi pessoas treinando com dedicação real. Acordando cedo, abrindo mão de compromissos, entrando pesado toda semana.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              E mesmo assim, ficavam travadas. Meses passavam e o corpo não respondia.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              O problema não era a pessoa.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Era o que o mercado oferecia: treinos genéricos, planos que funcionam na teoria mas travam na prática, informação demais e execução de menos.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Faltava um sistema simples, progressivo e aplicável.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Algo que transformasse conhecimento em ação diária — sem precisar decorar nada, sem depender de motivação, sem improvisar.
            </p>

            <p className="text-white text-base sm:text-lg leading-relaxed font-semibold">
              O Método 8X nasceu para resolver exatamente isso:
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Transformar treino em execução guiada, com progressão clara semana a semana — sem achismo, sem tentativa e erro, sem depender de força de vontade.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMethodExists;
