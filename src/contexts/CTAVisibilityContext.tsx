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
  // CTA hidden until 5 seconds of video playback
  const [ctaVisible, setCtaVisible] = useState(false);
  const [ctaIntensified, setCtaIntensified] = useState(false);

  const reportVideoTime = useCallback((seconds: number) => {
    // Show CTA after 5s of video
    if (seconds >= 5 && !ctaVisible) {
      setCtaVisible(true);
      console.log('🎯 CTA visível após 5s de reprodução do vídeo');
    }
    // Intensify CTA after 10s of video (pulse stronger, etc)
    if (seconds >= 10 && !ctaIntensified) {
      setCtaIntensified(true);
      console.log('🎯 CTAs intensificados após 10s de reprodução do vídeo');
    }
  }, [ctaVisible, ctaIntensified]);

  return (
    <CTAVisibilityContext.Provider value={{ ctaVisible, reportVideoTime }}>
      {children}
    </CTAVisibilityContext.Provider>
  );
};
