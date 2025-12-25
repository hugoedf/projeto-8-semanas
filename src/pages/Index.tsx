import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import WhyExists from "@/components/WhyExists";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
import Modules from "@/components/Modules";
import Bonus from "@/components/Bonus";
import Testimonials from "@/components/Testimonials";
import ForWho from "@/components/ForWho";
import Guarantee from "@/components/Guarantee";
import DecisionBlock from "@/components/DecisionBlock";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { DiagnosticPanel } from "@/components/DiagnosticPanel";
import IntermediateCTA from "@/components/IntermediateCTA";
import FloatingCTA from "@/components/FloatingCTA";
const Index = () => {
  return <main className="min-h-screen">
      <Hero />
      {/* 1. DOR - Identificação emocional */}
      <Problems />
      {/* 2. CONEXÃO HUMANA - Por que existe */}
      <WhyExists />
      {/* 3. SOLUÇÃO - O que o método oferece */}
      <Benefits />
      {/* 4. FACILITADOR - App como ferramenta */}
      <AppShowcase />
      {/* 5. CONTEÚDO - O que está incluso */}
      <Modules />
      <Bonus />
      {/* 6. PROVA SOCIAL */}
      <Testimonials />
      <IntermediateCTA />
      {/* 7. QUALIFICAÇÃO + GARANTIA */}
      <ForWho />
      <Guarantee className="text-primary" />
      {/* 8. BLOCO DE DECISÃO */}
      <DecisionBlock />
      {/* 9. CTA FINAL */}
      <CTA />
      <FAQ />
      <Footer />
      <FloatingCTA />
      
      {/* Painel de diagnóstico - apenas em desenvolvimento */}
      {import.meta.env.DEV && <DiagnosticPanel />}
    </main>;
};
export default Index;