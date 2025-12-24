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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

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

// Hook for zoom + floating animation (AppShowcase mockup)
export const useZoomFloatAnimation = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
  };

  // Add floating class after zoom completes
  const floatClassName = isVisible ? 'animate-float' : '';

  return { ref, isVisible, style, floatClassName };
};

// Hook for stamp effect (Guarantee seal)
export const useStampAnimation = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const style: React.CSSProperties = isVisible 
    ? {} 
    : { opacity: 0, transform: 'scale(1.3)' };

  const className = isVisible ? 'animate-stamp' : 'opacity-0';

  return { ref, isVisible, style, className };
};
