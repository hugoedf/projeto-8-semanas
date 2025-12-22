import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CTAVisibilityContextType {
  ctaVisible: boolean;
  reportVideoTime: (seconds: number) => void;
}

const CTAVisibilityContext = createContext<CTAVisibilityContextType>({
  ctaVisible: false,
  reportVideoTime: () => {},
});

export const useCTAVisibility = () => useContext(CTAVisibilityContext);

interface CTAVisibilityProviderProps {
  children: ReactNode;
}

export const CTAVisibilityProvider = ({ children }: CTAVisibilityProviderProps) => {
  // CTAs always visible now - no waiting for video
  const [ctaVisible, setCtaVisible] = useState(true);
  const [ctaIntensified, setCtaIntensified] = useState(false);

  const reportVideoTime = useCallback((seconds: number) => {
    // Intensify CTA after 10s of video (pulse stronger, etc)
    if (seconds >= 10 && !ctaIntensified) {
      setCtaIntensified(true);
      console.log('🎯 CTAs intensificados após 10s de reprodução do vídeo');
    }
  }, [ctaIntensified]);

  return (
    <CTAVisibilityContext.Provider value={{ ctaVisible, reportVideoTime }}>
      {children}
    </CTAVisibilityContext.Provider>
  );
};
