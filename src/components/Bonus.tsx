import { Gift, Rocket, Lock, Smartphone, CheckCircle2, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import appMockup from "@/assets/app-8x-mockup.jpeg";
const Bonus = () => {
  const appFeatures = [{
    icon: Target,
    title: "Treinos Programados",
    description: "Cada sessão pronta, sem montar nada sozinho"
  }, {
    icon: Zap,
    title: "Alimentação Aplicada",
    description: "Plano nutricional integrado, sem calcular macros"
  }, {
    icon: TrendingUp,
    title: "Progresso Visível",
    description: "Acompanhe sua evolução semana a semana"
  }, {
    icon: Sparkles,
    title: "Técnicas no Tempo Certo",
    description: "Sem improvisar, execução guiada passo a passo"
  }];
  return <section className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Badge */}
        <div className="text-center mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-accent/15 border border-accent/30">
            <Gift className="w-4 h-4" />
            Incluso no seu acesso
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight mb-8 animate-fade-in">
          E-book + App 8X = <span className="text-accent">Método + Execução</span>
        </h2>

        {/* Comparison Grid - Compacto */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8 animate-fade-in">
          {/* Sem App */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400/80 font-semibold text-xs mb-2 flex items-center gap-2">
              <span>✕</span> Sem método
            </p>
            <ul className="space-y-1.5 text-gray-500 text-xs">
              <li>• Improvisa e erra a progressão</li>
              <li>• Abandona em 2 semanas</li>
            </ul>
          </div>
          
          {/* Com App */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400/80 font-semibold text-xs mb-2 flex items-center gap-2">
              <span>✔</span> Com Método 8X + App
            </p>
            <ul className="space-y-1.5 text-gray-300 text-xs">
              <li>• Execução guiada sem achismo</li>
              <li>• Progressão automática por 8 semanas</li>
            </ul>
          </div>
        </div>

        {/* Value */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-5 py-2.5 border border-accent/25">
            <Gift className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">
              App 8X incluso <span className="text-accent">GRÁTIS</span>
            </p>
          </div>
        </div>

      </div>
    </section>;
};
export default Bonus;