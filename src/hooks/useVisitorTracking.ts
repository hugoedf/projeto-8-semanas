import { useEffect, useState } from 'react';

export interface VisitorData {
  visitorId: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_id?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
  msclkid?: string;
  referrer: string;
  landingPage: string;
  device: 'mobile' | 'tablet' | 'desktop';
  region?: string;
}

// Global singleton state to prevent multiple initializations
let globalVisitorData: VisitorData | null = null;
let initializationPromise: Promise<VisitorData> | null = null;
let hasTracked = false;

// Edge function URL - uses environment variable
const VISITOR_TRACKING_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/visitor-tracking`;

const detectDevice = (): 'mobile' | 'tablet' | 'desktop' => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  return 'desktop';
};

const fetchRegion = async (): Promise<string> => {
  // Check localStorage first to avoid network call
  const cachedRegion = localStorage.getItem('region');
  if (cachedRegion) {
    return cachedRegion;
  }
  
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/geo`);
    if (!response.ok) throw new Error('Falha ao obter região');
    
    const data = await response.json();
    const region = data.region || 'not_provided';
    localStorage.setItem('region', region);
    return region;
  } catch {
    localStorage.setItem('region', 'not_provided');
    return 'not_provided';
  }
};

const sendToEdgeFunction = async (data: VisitorData) => {
  try {
    const response = await fetch(VISITOR_TRACKING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitor_id: data.visitorId,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_id: data.utm_id || null,
        utm_term: data.utm_term || null,
        utm_content: data.utm_content || null,
        referrer: data.referrer,
        landing_page: data.landingPage,
        device: data.device,
        region: data.region || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro ao enviar tracking:', errorData);
    } else {
      console.log('Visitante rastreado com sucesso via Edge Function');
    }
  } catch (error) {
    console.error('Exceção ao enviar tracking:', error);
  }
};

// Singleton initialization function
const initializeVisitorData = async (): Promise<VisitorData> => {
  // Return cached data if available
  if (globalVisitorData) {
    return globalVisitorData;
  }
  
  // Return existing promise if initialization is in progress
  if (initializationPromise) {
    return initializationPromise;
  }
  
  // Start new initialization
  initializationPromise = (async () => {
    try {
      // 1. Get or generate visitorId
      let visitorId = localStorage.getItem('visitor_id');
      const isNewVisitor = !visitorId;
      
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      // 2. Detect device
      const device = detectDevice();

      // 3. Collect UTMs and clickIDs from URL
      const urlParams = new URLSearchParams(window.location.search);
      const trackingData = {
        utm_source: urlParams.get('utm_source') || localStorage.getItem('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || undefined,
        utm_id: urlParams.get('utm_id') || localStorage.getItem('utm_id') || undefined,
        utm_term: urlParams.get('utm_term') || localStorage.getItem('utm_term') || undefined,
        utm_content: urlParams.get('utm_content') || localStorage.getItem('utm_content') || undefined,
        fbclid: urlParams.get('fbclid') || localStorage.getItem('fbclid') || undefined,
        gclid: urlParams.get('gclid') || localStorage.getItem('gclid') || undefined,
        ttclid: urlParams.get('ttclid') || localStorage.getItem('ttclid') || undefined,
        msclkid: urlParams.get('msclkid') || localStorage.getItem('msclkid') || undefined,
      };

      // Persist tracking params
      Object.entries(trackingData).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });

      // 4. Collect landing page and referrer (only on first visit)
      let landingPage = localStorage.getItem('landing_page');
      let referrer = localStorage.getItem('referrer');
      
      if (!landingPage) {
        landingPage = window.location.href;
        referrer = document.referrer || 'direct';
        localStorage.setItem('landing_page', landingPage);
        localStorage.setItem('referrer', referrer);
      }

      // 5. Get region (uses cache internally)
      const region = await fetchRegion();

      // 6. Build complete object
      const data: VisitorData = {
        visitorId,
        ...trackingData,
        referrer: referrer!,
        landingPage: landingPage!,
        device,
        region,
      };

      // Cache globally
      globalVisitorData = data;

      // 7. Send to Edge Function (only for new visitors)
      if (isNewVisitor && !hasTracked) {
        hasTracked = true;
        // Use requestIdleCallback to avoid blocking
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => sendToEdgeFunction(data));
        } else {
          setTimeout(() => sendToEdgeFunction(data), 100);
        }
      }

      return data;
    } catch (error) {
      console.error('Erro ao inicializar visitor tracking:', error);
      throw error;
    }
  })();
  
  return initializationPromise;
};

/**
 * Hook para gerenciar tracking persistente de visitantes
 * Uses global singleton to prevent multiple API calls
 */
export const useVisitorTracking = () => {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(globalVisitorData);
  const [isLoading, setIsLoading] = useState(!globalVisitorData);

  useEffect(() => {
    // If already initialized, use cached data
    if (globalVisitorData) {
      setVisitorData(globalVisitorData);
      setIsLoading(false);
      return;
    }

    // Initialize using singleton
    initializeVisitorData()
      .then((data) => {
        setVisitorData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const getVisitorData = (): VisitorData | null => {
    return visitorData;
  };

  return {
    visitorData,
    isLoading,
    getVisitorData,
  };
};
