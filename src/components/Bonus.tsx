import { Gift, Rocket, Lock } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const Bonus = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Badge */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-flex items-center gap-2.5 text-accent font-bold text-sm uppercase tracking-[0.2em] px-6 py-3 rounded-full bg-accent/10 border border-accent/30 shadow-[0_0_30px_-5px] shadow-accent/20">
            <Gift className="w-5 h-5" />
            Bônus Exclusivo
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center leading-[1.15] mb-16 sm:mb-20 animate-fade-in">
          O método já está pronto.
          <br />
          <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
            Agora ele é executado com você.
          </span>
        </h2>

        {/* App Mockup Hero */}
        <div className="flex flex-col items-center mb-16 sm:mb-20 animate-fade-in">
          
          {/* Mockup with enhanced glow */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-orange-500/20 rounded-[3rem] blur-[60px] scale-110" />
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-[100px] scale-125 animate-pulse" />
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2.5rem] p-3 sm:p-4 w-[220px] sm:w-[280px] shadow-2xl shadow-black/50 border border-white/10">
              <div className="rounded-[2rem] overflow-hidden">
                <img 
                  src={appMockup} 
                  alt="App 8X" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-950 rounded-full" />
            </div>
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-accent/30">
              GRÁTIS
            </div>
          </div>

          {/* App title */}
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-accent" />
            <span className="font-display font-bold text-2xl sm:text-3xl text-white">App 8X</span>
          </div>
          
          <p className="text-lg sm:text-xl text-accent font-semibold mb-6">
            Execução guiada do Método 8X
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-gray-400 text-sm sm:text-base">
            <span>Sem improviso.</span>
            <span className="hidden sm:block text-accent/50">•</span>
            <span>Sem interpretação errada.</span>
            <span className="hidden sm:block text-accent/50">•</span>
            <span>Sem desvio do método.</span>
          </div>
        </div>

        {/* Pain point */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 max-w-xl mx-auto">
            A maioria das pessoas não falha por falta de método.
            <br />
            <span className="text-white font-medium">Falha porque executa sem clareza — ou para cedo demais.</span>
          </p>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-8 bg-white/5 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 border border-white/10">
            <p className="text-sm sm:text-base text-white">
              👉 O App 8X resolve a execução.
            </p>
            <p className="text-sm sm:text-base text-white">
              👉 O Método 8X sustenta a decisão de continuar.
            </p>
          </div>
          
          <p className="text-accent font-semibold mt-6 text-sm sm:text-base">
            Um sem o outro quebra o processo.
          </p>
        </div>

        {/* Lista de benefícios */}
        <div className="mb-14 sm:mb-18 animate-fade-in">
          <p className="text-base sm:text-lg font-semibold text-white text-center mb-8">
            Com o App 8X, você executa exatamente o que está no método:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { yes: "Treinos definidos", no: "Nada de montar por conta própria" },
              { yes: "Alimentação aplicada", no: "Nada de calcular ou adaptar" },
              { yes: "Técnicas no tempo certo", no: "Nada de estudar fora de contexto" },
              { yes: "Progresso visível", no: "Nada de achismo" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/30 transition-colors"
              >
                <p className="text-sm sm:text-base text-white flex items-start gap-2 mb-2">
                  <span className="text-green-400 flex-shrink-0">✔️</span> 
                  <span>{item.yes}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-start gap-2 pl-6">
                  <span className="text-red-400/70 flex-shrink-0">❌</span> 
                  <span>{item.no}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="text-center mb-14 sm:mb-18 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl px-6 sm:px-8 py-5 border border-amber-500/20">
            <p className="text-amber-400 font-semibold text-sm sm:text-base mb-1">
              ⚠️ Sem entendimento, a execução quebra.
            </p>
            <p className="text-white text-sm sm:text-base">
              É o entendimento que sustenta a consistência.
            </p>
          </div>
        </div>

        {/* Valor */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <p className="text-gray-400 text-sm sm:text-base mb-2">
            💰 Valor real do App 8X: <span className="line-through">R$ 97</span>
          </p>
          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
            🎁 Incluído gratuitamente com o Método 8X
          </p>
        </div>

        {/* Fechamento */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="space-y-1 text-gray-400 text-sm sm:text-base mb-8">
            <p>Execute com direção.</p>
            <p>Execute com consciência.</p>
            <p className="text-white font-medium">Execute o método — não apenas o treino.</p>
          </div>
          
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight">
            Quem só executa, começa.
            <br />
            <span className="bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
              Quem entende o método, continua até o resultado.
            </span>
          </p>
        </div>

        {/* Acesso exclusivo */}
        <div className="flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-5 sm:px-6 py-3 border border-white/10">
            <Lock className="w-4 h-4 text-accent" />
            <div className="text-left">
              <p className="text-white text-xs sm:text-sm font-medium">
                🔐 Acesso exclusivo e protegido
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs">
                Liberado apenas para compradores. Individual. Validado. Não transferível.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
