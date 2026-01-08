import Hero from "@/components/Hero";
import WhyExists from "@/components/WhyExists";
import Problems from "@/components/Problems";
import ForWho from "@/components/ForWho";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
import Testimonials from "@/components/Testimonials";
import Bonus from "@/components/Bonus";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import DecisionBlock from "@/components/DecisionBlock";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotifications from "@/components/SocialProofNotifications";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* FLUXO DE PERSUASÃO OTIMIZADO */}
      
      {/* 1. HEADLINE - Promessa Impactante */}
      <Hero />
      
      {/* 2. SUSTENTAÇÃO - Autoridade + Ciência (Fisiologia Progressiva) */}
      <WhyExists />
      
      {/* 3. DORES - Conexão Emocional */}
      <Problems />
      
      {/* 4. IDENTIFICAÇÃO - "Isso é pra mim" */}
      <ForWho />
      
      {/* 5. BENEFÍCIOS - O que você conquista em 8 semanas */}
      <Benefits />
      
      {/* 6. APP - Diferencial Tecnológico */}
      <AppShowcase />
      
      {/* 7. PROVA SOCIAL - Depoimentos */}
      <Testimonials />
      
      {/* 8. BÔNUS EXCLUSIVOS */}
      <Bonus />
      
      {/* 9. GARANTIA */}
      <Guarantee />
      
      {/* 10. ANCORAGEM E PREÇO */}
      <CTA />
      
      {/* 11. URGÊNCIA / DECISÃO FINAL */}
      <DecisionBlock />
      
      {/* 12. FAQ - Últimas objeções */}
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