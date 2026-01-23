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

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyExists />
      <Problems />
      <Benefits />
      <Testimonials />
      <Bonus />
      <DecisionBlock />
      <Guarantee />
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

export default Index;
