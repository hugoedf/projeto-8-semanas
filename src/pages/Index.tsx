import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";

// Lazy load componentes abaixo da dobra para melhor performance
const Problems = lazy(() => import("@/components/Problems"));
const WhyExists = lazy(() => import("@/components/WhyExists"));
const Benefits = lazy(() => import("@/components/Benefits"));
const AppShowcase = lazy(() => import("@/components/AppShowcase"));
const Modules = lazy(() => import("@/components/Modules"));
const Bonus = lazy(() => import("@/components/Bonus"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const ForWho = lazy(() => import("@/components/ForWho"));
const Guarantee = lazy(() => import("@/components/Guarantee"));
const DecisionBlock = lazy(() => import("@/components/DecisionBlock"));
const CTA = lazy(() => import("@/components/CTA"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));
const DiagnosticPanel = lazy(() => import("@/components/DiagnosticPanel").then(m => ({ default: m.DiagnosticPanel })));
const IntermediateCTA = lazy(() => import("@/components/IntermediateCTA"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

// Fallback minimalista para lazy loading
const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
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
        <Guarantee />
        {/* 8. BLOCO DE DECISÃO */}
        <DecisionBlock />
        {/* 9. CTA FINAL */}
        <CTA />
        <FAQ />
        <Footer />
        <FloatingCTA />
        
        {/* Painel de diagnóstico - apenas em desenvolvimento */}
        {import.meta.env.DEV && <DiagnosticPanel />}
      </Suspense>
    </main>
  );
};

export default Index;
