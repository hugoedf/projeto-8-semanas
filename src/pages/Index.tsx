import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import WhyExists from "@/components/WhyExists";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
import Bonus from "@/components/Bonus";
import Guarantee from "@/components/Guarantee";
import DecisionBlock from "@/components/DecisionBlock";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotifications from "@/components/SocialProofNotifications";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* FLUXO EMOCIONAL DE ALTA CONVERSÃO LOW TICKET */}
      
      {/* 1. HERO - Identificação imediata + Escassez real */}
      <Hero />
      
      {/* 2. DOR - Identificação emocional profunda */}
      <Problems />
      
      {/* 3. A CAUSA RAIZ - WhyExists condensado */}
      <WhyExists />
      
      {/* 4. PROVA SOCIAL - Depoimentos antes dos benefícios */}
      <Testimonials />
      
      {/* 5. BENEFÍCIOS - Apenas 4 pilares principais */}
      <Benefits />
      
      {/* 6. APP - Facilitador visual */}
      <AppShowcase />
      
      {/* 7. BÔNUS - Valor percebido */}
      <Bonus />
      
      {/* 8. GARANTIA - Remoção de risco */}
      <Guarantee />
      
      {/* 9. DECISÃO FINAL - Contraste máximo */}
      <DecisionBlock />
      
      {/* 10. CTA FINAL */}
      <CTA />
      
      {/* 11. FAQ - Apenas 5 objeções de compra */}
      <FAQ />
      
      <Footer />
      
      {/* Elementos de urgência e prova social */}
      <FloatingCTA />
      <WhatsAppButton />
      <ExitIntentPopup />
      <SocialProofNotifications />
    </main>
  );
};

export default Index;