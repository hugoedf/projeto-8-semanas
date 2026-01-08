import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import ForWho from "@/components/ForWho";
import WhyExists from "@/components/WhyExists";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
import Testimonials from "@/components/Testimonials";
import Bonus from "@/components/Bonus";
import Guarantee from "@/components/Guarantee";
import UrgencyInternal from "@/components/UrgencyInternal";  {/* ← NOVO */}
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
      {/* FLUXO EMOCIONAL DE ALTA CONVERSÃO */}
      
      {/* 1. HERO - Promessa + Escassez */}
      <Hero />
      
      {/* 2. DOR - Conexão emocional */}
      <Problems />
      
      {/* 3. IDENTIFICAÇÃO - "Isso é pra mim" */}
      <ForWho />
      
      {/* 4. A CAUSA RAIZ - Por que você não tem resultados */}
      <WhyExists />
      
      {/* 5. BENEFÍCIOS - Os 4 pilares de resultado */}
      <Benefits />
      
      {/* 6. APP - O diferencial tecnológico */}
      <AppShowcase />
      
      {/* 7. PROVA SOCIAL - Resultados reais */}
      <Testimonials />
      
      {/* 8. BÔNUS + GARANTIA - Valor + Segurança */}
      <Bonus />
      <Guarantee />
      
      {/* 8.5 URGÊNCIA INTERNA - Força a ação AGORA */}
      <UrgencyInternal />  {/* ← NOVO */}
      
      {/* 9. DECISÃO FINAL - Contraste emocional */}
      <DecisionBlock />
      
      {/* 10. OFERTA FINAL - CTA de impacto */}
      <CTA />
      
      {/* 11. FAQ - Últimas objeções */}
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
