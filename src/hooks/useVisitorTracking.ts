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

// Flag para evitar múltiplos inserts
let hasTracked = false;

// Edge function URL
const VISITOR_TRACKING_URL = 'https://kfddlytvdzqwopongnew.supabase.co/functions/v1/visitor-tracking';

/**
 * Hook para gerenciar tracking persistente de visitantes
 * Gera um visitorId único e coleta dados enriquecidos
 * Dados são enviados para Edge Function segura (não diretamente ao banco)
 */
export const useVisitorTracking = () => {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeVisitorTracking();
  }, []);

  const initializeVisitorTracking = async () => {
    try {
      // 1. Obter ou gerar visitorId
      let visitorId = localStorage.getItem('visitor_id');
      const isNewVisitor = !visitorId;
      
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      // 2. Detectar device
      const device = detectDevice();

      // 3. Coletar UTMs e clickIDs da URL
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

      // Persistir parâmetros de rastreamento
      Object.entries(trackingData).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });

      // 4. Coletar landing page e referrer (apenas na primeira visita)
      let landingPage = localStorage.getItem('landing_page');
      let referrer = localStorage.getItem('referrer');
      
      if (!landingPage) {
        landingPage = window.location.href;
        referrer = document.referrer || 'direct';
        localStorage.setItem('landing_page', landingPage);
        localStorage.setItem('referrer', referrer);
      }

      // 5. Obter região via Edge Function geo (apenas se não tiver)
      let region = localStorage.getItem('region');
      if (!region) {
        try {
          region = await fetchRegion();
          localStorage.setItem('region', region);
        } catch {
          region = 'not_provided';
          localStorage.setItem('region', region);
        }
      }

      // 6. Montar objeto completo (SEM campo age)
      const data: VisitorData = {
        visitorId,
        ...trackingData,
        referrer: referrer!,
        landingPage: landingPage!,
        device,
        region,
      };

      setVisitorData(data);

      // 7. Enviar para Edge Function segura (apenas se for novo visitante)
      if (isNewVisitor && !hasTracked) {
        hasTracked = true;
        await sendToEdgeFunction(data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar visitor tracking:', error);
      setIsLoading(false);
    }
  };

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
    try {
      const response = await fetch('https://kfddlytvdzqwopongnew.supabase.co/functions/v1/geo');
      if (!response.ok) throw new Error('Falha ao obter região');
      
      const data = await response.json();
      return data.region || 'not_provided';
    } catch {
      return 'not_provided';
    }
  };

  /**
   * Envia dados para Edge Function segura
   * NÃO usa insert direto no Supabase
   */
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

  const getVisitorData = (): VisitorData | null => {
    return visitorData;
  };

  return {
    visitorData,
    isLoading,
    getVisitorData,
  };
};
