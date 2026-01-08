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
            Ciência que garante <span className="text-accent">resultados reais</span>
          </h2>

          {/* Grid Layout - 2 colunas em desktop, 1 em mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Coluna Esquerda - Narrativa Principal */}
            <div className="space-y-5 sm:space-y-6">
              
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                O <span className="text-white font-semibold">Método 8X</span> não é apenas um treino aleatório. Ele é baseado em Fisiologia Progressiva, a ciência que mostra como o corpo realmente cresce.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                <span className="text-accent font-semibold">1️⃣ Estímulo Otimizado</span> – Treinos que desafiam o corpo de forma inteligente.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                <span className="text-accent font-semibold">2️⃣ Adaptação e Recuperação</span> – Descanso estratégico para crescimento muscular.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                <span className="text-accent font-semibold">3️⃣ Supercompensação</span> – O estágio em que seu corpo se torna mais forte e definido do que nunca.
              </p>

            </div>

            {/* Coluna Direita - Boxes Destacados */}
            <div className="space-y-5 sm:space-y-6">
              
              {/* Box 1 - Aplicativo + Ebook */}
              <div className="card-dark-glass p-6 sm:p-7 rounded-2xl border border-accent/20">
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Tudo entregue em um <span className="text-white font-semibold">aplicativo + ebook</span>, para que você saiba exatamente o que fazer, quando e como.
                </p>
              </div>

              {/* Box 2 - Sem depender de motivação */}
              <div className="card-dark-glass p-6 sm:p-7 rounded-2xl border border-accent/20">
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  <span className="text-white font-semibold">Sem depender da motivação do dia</span>. Você só precisa seguir o passo a passo e ver seu corpo responder.
                </p>
              </div>

            </div>

          </div>

          {/* Divisor Visual */}
          <div className="my-10 sm:my-12 lg:my-14 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {/* Seção Final - Full Width */}
          <div className="space-y-6 sm:space-y-8">
            
            <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed font-semibold">
              Treino estruturado. Progressão real. Resultados visíveis.
            </p>

            <div className="card-dark-glass p-8 sm:p-10 lg:p-12 rounded-2xl border border-accent/30 bg-accent/[0.03]">
              <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                <span className="text-accent font-semibold">Fisiologia Progressiva</span> é a ciência que força seu corpo a evoluir toda semana — sem achismo, sem tentativa e erro, sem improvisar.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMethodExists;
