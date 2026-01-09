import Hero from "@/components/Hero";
import WhyExists from "@/components/WhyExists";
import Problems from "@/components/Problems";
import ForWho from "@/components/ForWho";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
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
const Index = () => {
  return <main className="min-h-screen">
      {/* FLUXO DE PERSUASÃO OTIMIZADO */}
      
      {/* 1. HEADLINE - Promessa Impactante (SEM CTA) */}
      <Hero />
      
      {/* 2. SUSTENTAÇÃO - Autoridade + Ciência (Fisiologia Progressiva) */}
      <WhyExists />
      
      {/* 3. DORES - Conexão Emocional */}
      <Problems />
      
      {/* 5. IDENTIFICAÇÃO - "Isso é pra mim" */}
      
      
      {/* 6. BENEFÍCIOS - O que você conquista em 8 semanas */}
      <Benefits />
      
      {/* 7. APP - Diferencial Tecnológico */}
      
      
      {/* 8. PROVA SOCIAL - Depoimentos */}
      <Testimonials />
      
      {/* 9. BÔNUS EXCLUSIVOS */}
      <Bonus />
      
      {/* 10. DECISÃO - Contraste emocional */}
      <DecisionBlock />
      
      {/* 11. GARANTIA */}
      <Guarantee />
      
      {/* 12. CTA FINAL - Ancoragem e Preço */}
      <CTA />
      
      {/* 13. FAQ - Últimas objeções */}
      <FAQ />
      
      <Footer className="bg-primary" />
      
      {/* Elementos de urgência e prova social */}
      <FloatingCTA />
      <WhatsAppButton />
      <ExitIntentPopup />
      <SocialProofNotifications />
    </main>;
};
export default Index;