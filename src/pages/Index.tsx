import { useEffect } from "react";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import Modules from "@/components/Modules";
import Testimonials from "@/components/Testimonials";
import ForWho from "@/components/ForWho";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { DiagnosticPanel } from "@/components/DiagnosticPanel";

const Index = () => {
  const { trackPageView } = useMetaPixel();

  useEffect(() => {
    trackPageView();
  }, []);
  
  return (
    <main className="min-h-screen">
      <Hero />
      <Problems />
      <Benefits />
      <Modules />
      <Testimonials />
      <ForWho />
      <Guarantee />
      <section className="py-12 sm:py-16 bg-muted">
        <div className="container mx-auto px-5 sm:px-6 text-center animate-fade-in">
          <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            Se você continuar treinando do mesmo jeito, nada muda.<br />
            Se aplicar um método, o corpo responde.
          </p>
        </div>
      </section>
      <CTA />
      <Footer />
      
      {/* Painel de diagnóstico - apenas em desenvolvimento */}
      {import.meta.env.DEV && <DiagnosticPanel />}
    </main>
  );
};

export default Index;
