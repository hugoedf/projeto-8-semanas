import { useEffect, useState, useRef, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number; // 0.1 = subtle, 0.5 = medium, 1 = full
  direction?: 'up' | 'down';
}

// Check if mobile (disable parallax for performance)
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
};

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.15, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile()) return;

    const handleScroll = () => {
      // Cancel previous frame to avoid stacking
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only update if scroll changed significantly
        if (Math.abs(scrollY - lastScrollY.current) > 2) {
          lastScrollY.current = scrollY;
          const multiplier = direction === 'up' ? -1 : 1;
          setOffset(scrollY * speed * multiplier);
        }
      });
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, direction]);

  return offset;
};

// Hook for element-based parallax (relative to viewport)
export const useElementParallax = (elementRef: React.RefObject<HTMLElement>, speed = 0.1) => {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const cachedRect = useRef<{ top: number; height: number } | null>(null);
  const lastUpdate = useRef(0);

  // Cache rect on resize only
  const updateCachedRect = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      cachedRect.current = { top: rect.top + window.scrollY, height: rect.height };
    }
  }, [elementRef]);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile()) return;

    // Initial rect calculation
    updateCachedRect();

    const handleScroll = () => {
      // Throttle to 60fps max
      const now = performance.now();
      if (now - lastUpdate.current < 16) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        if (!cachedRect.current) return;
        
        lastUpdate.current = now;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        // Calculate position using cached values
        const elementTop = cachedRect.current.top - scrollY;
        const elementHeight = cachedRect.current.height;
        
        // Calculate how far into viewport the element is
        const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Subtle offset based on scroll position
        setOffset((clampedProgress - 0.5) * 100 * speed);
      });
    };

    const handleResize = () => {
      updateCachedRect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [elementRef, speed, updateCachedRect]);

  return offset;
};
