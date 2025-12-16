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
  const {
    trackPageView
  } = useMetaPixel();
  useEffect(() => {
    trackPageView();
  }, []);
  return <main className="min-h-screen">
      <Hero />
      <Problems />
      <Benefits />
      <Modules />
      <Testimonials />
      <ForWho />
      <Guarantee />
      
      {/* Bloco de Decisão Final */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl font-display text-foreground leading-relaxed tracking-tight">
              Se você continuar treinando do mesmo jeito, <span className="text-accent">nada muda.</span><br />
              Se aplicar um método, <span className="text-accent">o corpo responde.</span>
            </p>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
      
      {/* Painel de diagnóstico - apenas em desenvolvimento */}
      {import.meta.env.DEV && <DiagnosticPanel />}
    </main>;
};
export default Index;