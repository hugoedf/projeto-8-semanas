import { createContext, useContext, useState, ReactNode } from "react";

interface VSLContextType {
  hasVSLEnded: boolean;
  setHasVSLEnded: (ended: boolean) => void;
}

const VSLContext = createContext<VSLContextType | undefined>(undefined);

export const VSLProvider = ({ children }: { children: ReactNode }) => {
  const [hasVSLEnded, setHasVSLEnded] = useState(false);

  return (
    <VSLContext.Provider value={{ hasVSLEnded, setHasVSLEnded }}>
      {children}
    </VSLContext.Provider>
  );
};

export const useVSLState = () => {
  const context = useContext(VSLContext);
  if (!context) {
    throw new Error("useVSLState must be used within a VSLProvider");
  }
  return context;
};
