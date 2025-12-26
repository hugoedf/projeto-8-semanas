import { useEffect, useState } from 'react';

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

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile()) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const multiplier = direction === 'up' ? -1 : 1;
      setOffset(scrollY * speed * multiplier);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return offset;
};

// Hook for element-based parallax (relative to viewport)
export const useElementParallax = (elementRef: React.RefObject<HTMLElement>, speed = 0.1) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile()) return;

    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into viewport the element is
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // Subtle offset based on scroll position
      setOffset((clampedProgress - 0.5) * 100 * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, speed]);

  return offset;
};
