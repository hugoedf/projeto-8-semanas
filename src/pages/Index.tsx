import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import Modules from "@/components/Modules";
import Testimonials from "@/components/Testimonials";
import ForWho from "@/components/ForWho";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { DiagnosticPanel } from "@/components/DiagnosticPanel";

const Index = () => {
  
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
      <FAQ />
      <Footer />
      
      {/* Painel de diagnóstico - apenas em desenvolvimento */}
      {import.meta.env.DEV && <DiagnosticPanel />}
    </main>
  );
};

export default Index;
