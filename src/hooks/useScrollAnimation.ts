import { useEffect, useRef, useState } from 'react';

type AnimationType = 'fadeUp' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'popIn' | 'stamp';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// 80% viewport threshold for mobile-first motion
const DEFAULT_ROOT_MARGIN = '0px 0px -20% 0px';

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = DEFAULT_ROOT_MARGIN, triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  // Default to visible for mobile safety - prevents elements from being hidden
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Reset to false initially only if observer is available
    if (!hasAnimated) {
      setIsVisible(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Safety timeout - ensure element becomes visible after 2s regardless
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref, isVisible };
};

// Animation configs by type - 400-600ms durations
const animationConfigs: Record<AnimationType, { from: React.CSSProperties; to: React.CSSProperties; duration: number }> = {
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(16px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    duration: 400,
  },
  slideLeft: {
    from: { opacity: 0, transform: 'translateX(-24px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    duration: 450,
  },
  slideRight: {
    from: { opacity: 0, transform: 'translateX(24px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    duration: 350,
  },
  zoomIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: 500,
  },
  popIn: {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: 350,
  },
  stamp: {
    from: { opacity: 0, transform: 'scale(1.3)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: 400,
  },
};

// Hook para animar múltiplos items com delay progressivo
export const useStaggeredAnimation = (
  itemCount: number, 
  baseDelay: number = 100, 
  animationType: AnimationType = 'fadeUp'
) => {
  const { ref, isVisible } = useScrollAnimation();
  const config = animationConfigs[animationType];
  
  const getItemStyle = (index: number): React.CSSProperties => ({
    ...(isVisible ? config.to : config.from),
    transition: `opacity ${config.duration}ms ease-out ${index * baseDelay}ms, transform ${config.duration}ms ease-out ${index * baseDelay}ms`,
  });

  const getItemClassName = (index: number): string => {
    if (!isVisible) return 'opacity-0';
    return '';
  };

  return { ref, isVisible, getItemStyle, getItemClassName };
};

// Hook for zoom + floating animation (AppShowcase mockup) - simplified for mobile
export const useZoomFloatAnimation = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  // Simple fade-in style, no transform that might cause issues
  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-out',
  };

  // Only add float class after visible - removed problematic zoom transform
  const floatClassName = isVisible ? 'animate-float' : '';

  return { ref, isVisible, style, floatClassName };
};

// Hook for stamp effect (Guarantee seal) - simplified for mobile
export const useStampAnimation = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  // Simple opacity transition, no scale transform
  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.4s ease-out',
  };

  const className = '';

  return { ref, isVisible, style, className };
};
