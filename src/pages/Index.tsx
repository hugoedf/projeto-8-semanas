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
      <CTA />
      <Footer />
      
      {/* Painel de diagnóstico - apenas para testes */}
      <DiagnosticPanel />
    </main>
  );
};

export default Index;
