import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  age?: number;
}

// Flag para evitar múltiplos inserts
let hasTracked = false;

/**
 * Hook para gerenciar tracking persistente de visitantes
 * Gera um visitorId único e coleta dados enriquecidos
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

      // 5. Obter região via ipapi.co (apenas se não tiver)
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

      // 6. Montar objeto completo
      const data: VisitorData = {
        visitorId,
        ...trackingData,
        referrer: referrer!,
        landingPage: landingPage!,
        device,
        region,
      };

      setVisitorData(data);

      // 7. Salvar no banco apenas se for novo visitante e não tiver sido salvo ainda
      if (isNewVisitor && !hasTracked) {
        hasTracked = true;
        await insertVisitorData(data);
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
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Falha ao obter região');
      
      const data = await response.json();
      return `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`.trim() || 'not_provided';
    } catch {
      return 'not_provided';
    }
  };

  /**
   * INSERT simples - sem upsert, sem onConflict
   */
  const insertVisitorData = async (data: VisitorData) => {
    try {
      const { error } = await supabase
        .from('visitor_tracking')
        .insert({
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
        });

      if (error) {
        console.error('Erro ao salvar visitante:', error);
      } else {
        console.log('Visitante salvo com sucesso:', data.visitorId);
      }
    } catch (error) {
      console.error('Exceção ao salvar visitante:', error);
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
