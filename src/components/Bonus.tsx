import { Gift, Rocket, Lock } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";

const Bonus = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-3xl">
        
        {/* Badge - mais discreto */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Gift className="w-4 h-4" />
            Bônus Exclusivo
          </span>
        </div>

        {/* Headline - hierarquia refinada */}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-snug mb-12 sm:mb-14 animate-fade-in">
          O método já está pronto.
          <br />
          <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
            Agora ele é executado com você.
          </span>
        </h2>

        {/* App Mockup Hero - compacto */}
        <div className="flex flex-col items-center mb-10 sm:mb-14 animate-fade-in">
          
          {/* Mockup com glow */}
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-orange-500/15 rounded-[2.5rem] blur-[50px] scale-110" />
            <div className="absolute inset-0 bg-accent/15 rounded-[2.5rem] blur-[80px] scale-125 animate-pulse" />
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-950 rounded-[2rem] p-2.5 sm:p-3 w-[180px] sm:w-[220px] shadow-2xl shadow-black/50 border border-white/10">
              <div className="rounded-[1.5rem] overflow-hidden">
                <img 
                  src={appMockup} 
                  alt="App 8X" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-950 rounded-full" />
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-accent/30">
              GRÁTIS
            </div>
          </div>

          {/* App title - mais compacto */}
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-lg sm:text-xl text-white">App 8X</span>
          </div>
          
          <p className="text-sm sm:text-base text-accent font-medium mb-4">
            Execução guiada do Método 8X
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-gray-500 text-xs sm:text-sm">
            <span>Sem improviso</span>
            <span className="text-accent/40">•</span>
            <span>Sem interpretação errada</span>
            <span className="text-accent/40">•</span>
            <span>Sem desvio do método</span>
          </div>
        </div>

        {/* Pain point - texto menor e respirado */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-md mx-auto">
            A maioria não falha por falta de método.
            <span className="text-gray-300 font-medium"> Falha porque executa sem clareza.</span>
          </p>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-300">
            <p>👉 O App resolve a execução.</p>
            <p>👉 O Método sustenta a decisão.</p>
          </div>
          
          <p className="text-accent text-xs sm:text-sm font-medium mt-3 opacity-80">
            Um sem o outro quebra o processo.
          </p>
        </div>

        {/* Lista de benefícios - cards mais leves */}
        <div className="mb-10 sm:mb-14 animate-fade-in">
          <p className="text-sm text-gray-400 text-center mb-5">
            Com o App, você executa exatamente o que está no método:
          </p>
          
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-lg mx-auto">
            {[
              { yes: "Treinos definidos", no: "Sem montar sozinho" },
              { yes: "Alimentação aplicada", no: "Sem calcular" },
              { yes: "Técnicas no tempo certo", no: "Sem improvisar" },
              { yes: "Progresso visível", no: "Sem achismo" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white/[0.04] rounded-lg p-3 border border-white/5"
              >
                <p className="text-xs sm:text-sm text-white flex items-center gap-1.5 mb-1">
                  <span className="text-green-400 text-[10px]">✔</span> 
                  <span>{item.yes}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1.5 pl-4">
                  <span className="text-red-400/50 text-[10px]">✕</span> 
                  <span>{item.no}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning - discreto */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <p className="text-xs sm:text-sm text-amber-400/80">
            ⚠️ Sem entendimento, a execução quebra.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            É o entendimento que sustenta a consistência.
          </p>
        </div>

        {/* Valor - destaque forte para conversão */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in bg-gradient-to-r from-accent/10 via-orange-500/10 to-accent/10 rounded-2xl py-5 px-6 border border-accent/20">
          <p className="text-gray-500 text-xs mb-1">
            Valor real: <span className="line-through">R$ 97</span>
          </p>
          <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
            🎁 Incluído grátis com o Método 8X
          </p>
        </div>

        {/* Fechamento - frase de impacto */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <div className="text-gray-500 text-xs sm:text-sm mb-5 space-y-0.5">
            <p>Execute com direção. Execute com consciência.</p>
            <p className="text-gray-300">Execute o método — não apenas o treino.</p>
          </div>
          
          <p className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
            Quem só executa, começa.
            <br />
            <span className="bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
              Quem entende, continua até o resultado.
            </span>
          </p>
        </div>

        {/* Acesso exclusivo - pill compacto */}
        <div className="flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/[0.03] rounded-full px-4 py-2 border border-white/5">
            <Lock className="w-3.5 h-3.5 text-accent/70" />
            <p className="text-gray-500 text-[10px] sm:text-xs">
              🔐 Acesso exclusivo • Individual • Validado
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bonus;
