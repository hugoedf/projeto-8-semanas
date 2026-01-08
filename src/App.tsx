import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import AppShowcase from "@/components/AppShowcase";
import Bonus from "@/components/Bonus";
import Testimonials from "@/components/Testimonials";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotifications from "@/components/SocialProofNotifications";
import DecisionBlock from "@/components/DecisionBlock";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problems />
      <Testimonials />
      <Benefits />
      <AppShowcase />
      <Bonus />
      <Guarantee />
      <DecisionBlock />
      <CTA />
      <FAQ />
      <Footer />
      <FloatingCTA />
      <WhatsAppButton />
      <ExitIntentPopup />
      <SocialProofNotifications />
    </main>
  );
};
