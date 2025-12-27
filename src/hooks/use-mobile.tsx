import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Use matchMedia result directly instead of reading innerWidth
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    // Initial value from matchMedia (no reflow)
    setIsMobile(mql.matches);
    
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
