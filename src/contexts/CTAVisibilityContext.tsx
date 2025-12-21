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
  const [ctaVisible, setCtaVisible] = useState(false);

  const reportVideoTime = useCallback((seconds: number) => {
    if (seconds >= 10 && !ctaVisible) {
      setCtaVisible(true);
      console.log('🎯 CTAs liberados após 10s de reprodução do vídeo');
    }
  }, [ctaVisible]);

  return (
    <CTAVisibilityContext.Provider value={{ ctaVisible, reportVideoTime }}>
      {children}
    </CTAVisibilityContext.Provider>
  );
};
