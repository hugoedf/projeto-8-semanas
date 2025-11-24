import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-ebook-mockup.png";

const Hero = () => {
  const scrollToCTA = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-fitness-beige via-fitness-cream to-fitness-accent">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(145,128,98,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="text-fitness-charcoal font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-fitness-charcoal/20 bg-fitness-tan/50">
                Método Científico Comprovado
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-fitness-charcoal">
              Transforme Seu Corpo em{" "}
              <span className="text-fitness-charcoal font-black">8 Semanas</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Com o treino de hipertrofia inteligente que{" "}
              <span className="text-accent font-semibold">realmente funciona</span>
            </p>
            
            <div className="space-y-4">
              <p className="text-base md:text-lg text-foreground/80 max-w-xl">
                Método completo, objetivo e 100% aplicável — baseado em ciência, 
                feito para quem quer <strong>resultados reais</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button 
                  variant="cta" 
                  size="lg"
                  onClick={scrollToCTA}
                  className="text-lg px-8 py-6 animate-pulse-glow"
                >
                  Quero Transformar Meu Corpo Agora
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 text-sm text-muted-foreground">
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
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-fitness-tan/40 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="Mockup do Ebook Projeto 8 Semanas"
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl hover-lift"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
