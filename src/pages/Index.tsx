import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
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
      {/* 1. DOR - Identificação emocional */}
      <Problems />
      {/* 2. SOLUÇÃO - O que o método oferece */}
      <Benefits />
      {/* 3. FACILITADOR - App como ferramenta */}
      <AppShowcase />
      {/* 4. CONTEÚDO - O que está incluso */}
      <Modules />
      <Bonus />
      {/* 5. PROVA SOCIAL */}
      <Testimonials />
      <IntermediateCTA />
      {/* 6. QUALIFICAÇÃO + GARANTIA */}
      <ForWho />
      <Guarantee />
      {/* 7. CTA FINAL */}
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

