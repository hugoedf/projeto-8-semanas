import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-ebook-mockup.png";
const Hero = () => {
  const handleCTAClick = () => {
    window.open("https://pay.hotmart.com/O103097031O", "_blank");
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 sm:px-6 md:px-8 py-16 sm:py-20 relative z-10 w-full max-w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in w-full px-2 sm:px-0">
            <div className="inline-block">
              <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-accent/30 bg-accent/10">
                Método Científico Comprovado
              </span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight text-slate-50 px-2 sm:px-0">
              Transforme Seu Corpo em{" "}
              <span className="text-gradient">8 Semanas</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl leading-relaxed max-w-2xl text-slate-50 mx-auto lg:mx-0 px-2 sm:px-0">
              Com o treino de hipertrofia inteligente que{" "}
              <span className="text-accent font-semibold">realmente funciona</span>
            </p>
            
            <div className="space-y-4 sm:space-y-4 w-full">
              <p className="text-sm sm:text-base md:text-lg max-w-xl text-slate-200 leading-relaxed mx-auto lg:mx-0 px-2 sm:px-0">
                Método completo, objetivo e 100% aplicável — baseado em ciência, 
                feito para quem quer <strong>resultados reais</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 sm:pt-4 w-full px-2 sm:px-0">
                <Button variant="cta" size="lg" onClick={handleCTAClick} className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 animate-pulse-glow w-full sm:w-auto whitespace-normal sm:whitespace-nowrap leading-tight">
                  Quero Transformar Meu Corpo Agora
                  <ArrowRight className="ml-2 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-center lg:justify-start pt-4 sm:pt-4 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>100% Digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Garantia 7 Dias</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-fade-in w-full max-w-md mx-auto lg:max-w-none mt-8 lg:mt-0 px-4 sm:px-0" style={{
          animationDelay: "0.2s"
        }}>
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
            <img src={heroImage} alt="Mockup do Ebook Projeto 8 Semanas" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;