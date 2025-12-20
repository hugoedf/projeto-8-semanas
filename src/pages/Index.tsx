import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import Modules from "@/components/Modules";
import Bonus from "@/components/Bonus";
import Testimonials from "@/components/Testimonials";
import ForWho from "@/components/ForWho";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { DiagnosticPanel } from "@/components/DiagnosticPanel";
import UrgencyBanner from "@/components/UrgencyBanner";
import IntermediateCTA from "@/components/IntermediateCTA";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  
  return (
    <main className="min-h-screen pt-10 sm:pt-11">
      <UrgencyBanner />
      <Hero />
      <Problems />
      <Benefits />
      <Modules />
      <Bonus />
      <Testimonials />
      <IntermediateCTA />
      <ForWho />
      <Guarantee />
      <CTA />
      <FAQ />
      <Footer />
      <FloatingCTA />
      
      {/* Painel de diagnóstico - apenas em desenvolvimento */}
      {import.meta.env.DEV && <DiagnosticPanel />}
    </main>
  );
};

export default Index;

