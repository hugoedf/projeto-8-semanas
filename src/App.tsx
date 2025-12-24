import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaPixelProvider } from "@/components/MetaPixelProvider";
import { CTAVisibilityProvider } from "@/contexts/CTAVisibilityContext";
import Index from "./pages/Index";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import VSLAssets from "./pages/VSLAssets";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MetaPixelProvider>
          <CTAVisibilityProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vsl-assets" element={<VSLAssets />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CTAVisibilityProvider>
        </MetaPixelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
