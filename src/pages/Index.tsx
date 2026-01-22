import Hero from "@/components/Hero";
import WhyExists from "@/components/WhyExists";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Bonus from "@/components/Bonus";
import DecisionBlock from "@/components/DecisionBlock";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotifications from "@/components/SocialProofNotifications";

// ✅ NOVO: Importar componentes de urgência
import UrgencyBanner from "@/components/UrgencyBanner";
import UrgencyInternal from "@/components/UrgencyInternal";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* ✅ NOVO: Banner de urgência fixo no topo */}
      <UrgencyBanner />

      {/* FLUXO DE PERSUASÃO OTIMIZADO */}
      
      {/* 1. HEADLINE - Promessa Impactante (CTA VERDE #1) */}
      <Hero />
      
      {/* 2. SUSTENTAÇÃO - Autoridade + Ciência */}
      <WhyExists />
      
      {/* 3. DORES - Conexão Emocional */}
      <Problems />
      
      {/* 4. BENEFÍCIOS - O que você conquista em 8 semanas */}
      <Benefits />
      
      {/* 5. PROVA SOCIAL - Depoimentos */}
      <Testimonials />
      
      {/* 6. BÔNUS EXCLUSIVOS */}
      <Bonus />
      
      {/* 7. DECISÃO - Contraste emocional */}
      <DecisionBlock />
      
      {/* 8. GARANTIA */}
      <Guarantee />
      
      {/* ✅ NOVO: Urgência narrativa entre Garantia e CTA final */}
      <UrgencyInternal />
      
      {/* 9. CTA FINAL - Ancoragem e Preço (CTA VERDE #2) */}
      <CTA />
      
      {/* 10. FAQ - Últimas objeções */}
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
