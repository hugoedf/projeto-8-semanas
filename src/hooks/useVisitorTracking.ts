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
  referrer: string;
  landingPage: string;
  device: 'mobile' | 'tablet' | 'desktop';
  region?: string;
  age?: number;
}

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

  /**
   * Inicializa o tracking do visitante
   */
  const initializeVisitorTracking = async () => {
    try {
      // 1. Obter ou gerar visitorId
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_id', visitorId);
      }

      // 2. Detectar device
      const device = detectDevice();

      // 3. Coletar UTMs da URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source') || localStorage.getItem('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || undefined,
        utm_id: urlParams.get('utm_id') || localStorage.getItem('utm_id') || undefined,
        utm_term: urlParams.get('utm_term') || localStorage.getItem('utm_term') || undefined,
        utm_content: urlParams.get('utm_content') || localStorage.getItem('utm_content') || undefined,
      };

      // Persistir UTMs
      Object.entries(utmData).forEach(([key, value]) => {
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
          const regionData = await fetchRegion();
          region = regionData;
          localStorage.setItem('region', region);
        } catch (error) {
          console.error('Erro ao obter região:', error);
          region = 'not_provided';
          localStorage.setItem('region', region);
        }
      }

      // 6. Idade (placeholder - será preenchido pela Hotmart)
      const age = localStorage.getItem('age') ? parseInt(localStorage.getItem('age')!) : undefined;

      // 7. Montar objeto completo
      const data: VisitorData = {
        visitorId,
        ...utmData,
        referrer: referrer!,
        landingPage: landingPage!,
        device,
        region,
        age,
      };

      setVisitorData(data);

      // 8. Salvar no banco de dados (upsert)
      await saveVisitorData(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar visitor tracking:', error);
      setIsLoading(false);
    }
  };

  /**
   * Detecta o tipo de dispositivo
   */
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

  /**
   * Busca região via ipapi.co
   */
  const fetchRegion = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Falha ao obter região');
      
      const data = await response.json();
      // Retorna cidade, estado, país
      return `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`.trim();
    } catch (error) {
      console.error('Erro ao buscar região:', error);
      return 'not_provided';
    }
  };

  /**
   * Salva dados do visitante no banco de dados
   */
  const saveVisitorData = async (data: VisitorData) => {
    try {
      const { error } = await supabase
        .from('visitor_tracking')
        .upsert({
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
          age: data.age || null,
        }, {
          onConflict: 'visitor_id'
        });

      if (error) {
        console.error('Erro ao salvar dados do visitante:', error);
      } else {
        console.log('Dados do visitante salvos com sucesso');
      }
    } catch (error) {
      console.error('Exceção ao salvar dados do visitante:', error);
    }
  };

  /**
   * Retorna os dados do visitante
   */
  const getVisitorData = (): VisitorData | null => {
    return visitorData;
  };

  /**
   * Atualiza a idade do visitante (quando recebido da Hotmart)
   */
  const updateAge = async (age: number) => {
    if (!visitorData) return;

    localStorage.setItem('age', age.toString());
    const updatedData = { ...visitorData, age };
    setVisitorData(updatedData);

    // Atualizar no banco
    await saveVisitorData(updatedData);
  };

  return {
    visitorData,
    isLoading,
    getVisitorData,
    updateAge,
  };
};
