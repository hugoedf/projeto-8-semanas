import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DiagnosticResult {
  timestamp: string;
  step: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  data?: any;
}

export interface DiagnosticSummary {
  visitorId: string;
  ip: string;
  city: string;
  state: string;
  country: string;
  utms: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
  supabaseSuccess: boolean;
  metaCapiPageViewSuccess: boolean;
  metaCapiViewContentSuccess: boolean;
  metaFbtraceIds: string[];
  errors: string[];
  warnings: string[];
}

/**
 * Hook de diagnóstico para testar o funil completo de eventos
 * Usa prefixo TEST_ no visitor_id e envia eventos para Meta como teste
 */
export const useDiagnosticMode = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [summary, setSummary] = useState<DiagnosticSummary | null>(null);

  const addResult = useCallback((step: string, status: DiagnosticResult['status'], message: string, data?: any) => {
    const result: DiagnosticResult = {
      timestamp: new Date().toISOString(),
      step,
      status,
      message,
      data,
    };
    setResults(prev => [...prev, result]);
    
    // Log detalhado no console
    const logPrefix = `[DIAGNÓSTICO ${status.toUpperCase()}]`;
    const logStyle = status === 'success' ? 'color: green' : 
                     status === 'error' ? 'color: red' : 
                     status === 'warning' ? 'color: orange' : 'color: blue';
    
    console.log(`%c${logPrefix} ${step}: ${message}`, logStyle);
    if (data) {
      console.log('  Dados:', data);
    }
    
    return result;
  }, []);

  const runDiagnostic = useCallback(async () => {
    setIsRunning(true);
    setResults([]);
    setSummary(null);

    const errors: string[] = [];
    const warnings: string[] = [];
    const fbtraceIds: string[] = [];

    console.log('\n========================================');
    console.log('🔍 INICIANDO DIAGNÓSTICO DO FUNIL DE EVENTOS');
    console.log('========================================\n');

    // 1. Gerar visitor_id de teste
    const testVisitorId = `TEST_${crypto.randomUUID()}`;
    addResult('Visitor ID', 'info', `Gerado visitor_id de teste: ${testVisitorId}`);

    // 2. Detectar User Agent
    const userAgent = navigator.userAgent;
    addResult('User Agent', 'info', `Detectado: ${userAgent.substring(0, 100)}...`);

    // 3. Detectar dispositivo
    const ua = userAgent.toLowerCase();
    let device = 'desktop';
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      device = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      device = 'tablet';
    }
    addResult('Dispositivo', 'info', `Tipo detectado: ${device}`);

    // 4. Coletar UTMs
    const urlParams = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: urlParams.get('utm_source') || localStorage.getItem('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || localStorage.getItem('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || localStorage.getItem('utm_content') || undefined,
    };
    
    const hasUtms = Object.values(utms).some(v => v);
    if (hasUtms) {
      addResult('UTMs', 'success', 'UTMs detectadas', utms);
    } else {
      addResult('UTMs', 'warning', 'Nenhuma UTM detectada na URL ou localStorage');
      warnings.push('Nenhuma UTM detectada');
    }

    // 5. Obter IP e geolocalização via Edge Function
    let ip = 'not_provided';
    let city = 'not_provided';
    let state = 'not_provided';
    let country = 'not_provided';
    let region = 'not_provided';
    let latitude: number | null = null;
    let longitude: number | null = null;

    try {
      addResult('Geolocalização', 'info', 'Consultando Edge Function /geo para obter IP e localização...');
      
      const geoResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/geo`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const geoData = await geoResponse.json();
      
      if (geoData.success) {
        ip = geoData.ip || 'not_provided';
        city = geoData.city || 'not_provided';
        state = geoData.region || 'not_provided';
        country = geoData.country || 'not_provided';
        latitude = geoData.latitude;
        longitude = geoData.longitude;
        region = `${city}, ${state}, ${country}`;
        
        addResult('Geolocalização', 'success', `IP: ${ip} | Localização: ${region}`, {
          ip,
          city,
          state,
          country,
          latitude,
          longitude,
          timezone: geoData.timezone,
          org: geoData.org,
        });
      } else {
        throw new Error(geoData.error || 'Geo API error');
      }
    } catch (error) {
      addResult('Geolocalização', 'error', `Falha ao obter geolocalização: ${error}`);
      errors.push(`Geolocalização falhou: ${error}`);
      warnings.push('Usando valores padrão para geolocalização');
    }

    // 6. Salvar visitante de teste no Supabase
    let supabaseSuccess = false;
    try {
      addResult('Supabase INSERT', 'info', 'Tentando inserir visitante de teste no Supabase...');
      
      const insertData = {
        visitor_id: testVisitorId,
        utm_source: utms.utm_source || null,
        utm_medium: utms.utm_medium || null,
        utm_campaign: utms.utm_campaign || null,
        utm_term: utms.utm_term || null,
        utm_content: utms.utm_content || null,
        referrer: document.referrer || 'direct',
        landing_page: window.location.href,
        device: device,
        region: region,
      };

      const { data, error } = await supabase
        .from('visitor_tracking')
        .insert(insertData);

      if (error) {
        throw error;
      }

      supabaseSuccess = true;
      addResult('Supabase INSERT', 'success', 'Visitante de teste salvo com sucesso no Supabase', {
        visitor_id: testVisitorId,
        table: 'visitor_tracking',
      });
    } catch (error: any) {
      addResult('Supabase INSERT', 'error', `Falha ao salvar no Supabase: ${error.message || error}`, {
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      errors.push(`Supabase INSERT falhou: ${error.message}`);
    }

    // 7. Enviar PageView para Meta CAPI
    let metaPageViewSuccess = false;
    const pageViewEventId = `${testVisitorId}-${Date.now()}-pageview`;
    
    try {
      addResult('Meta CAPI PageView', 'info', 'Enviando evento PageView para Meta Conversions API...');
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName: 'PageView',
            eventParams: { test_mode: true },
            eventId: pageViewEventId,
            visitorId: testVisitorId,
            eventSourceUrl: window.location.href,
            utmData: utms,
            deviceInfo: { userAgent },
            userData: {},
          }),
        }
      );

      const result = await response.json();
      
      if (response.ok && result.success) {
        metaPageViewSuccess = true;
        const fbtrace = result.metaCAPI?.fbtrace_id || 'N/A';
        fbtraceIds.push(fbtrace);
        
        addResult('Meta CAPI PageView', 'success', `Evento PageView enviado com sucesso!`, {
          eventId: pageViewEventId,
          fbtrace_id: fbtrace,
          events_received: result.metaCAPI?.events_received,
          normalizedData: result.normalizedData,
        });
      } else {
        throw new Error(result.error || `Status ${response.status}`);
      }
    } catch (error: any) {
      addResult('Meta CAPI PageView', 'error', `Falha ao enviar PageView: ${error.message || error}`);
      errors.push(`Meta CAPI PageView falhou: ${error.message}`);
    }

    // 8. Enviar ViewContent para Meta CAPI
    let metaViewContentSuccess = false;
    const viewContentEventId = `${testVisitorId}-${Date.now()}-viewcontent`;
    
    try {
      addResult('Meta CAPI ViewContent', 'info', 'Enviando evento ViewContent para Meta Conversions API...');
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-conversions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName: 'ViewContent',
            eventParams: { 
              test_mode: true,
              content_name: 'Método 8X - Página de Vendas (TESTE)',
            },
            eventId: viewContentEventId,
            visitorId: testVisitorId,
            eventSourceUrl: window.location.href,
            utmData: utms,
            deviceInfo: { userAgent },
            userData: {},
          }),
        }
      );

      const result = await response.json();
      
      if (response.ok && result.success) {
        metaViewContentSuccess = true;
        const fbtrace = result.metaCAPI?.fbtrace_id || 'N/A';
        fbtraceIds.push(fbtrace);
        
        addResult('Meta CAPI ViewContent', 'success', `Evento ViewContent enviado com sucesso!`, {
          eventId: viewContentEventId,
          fbtrace_id: fbtrace,
          events_received: result.metaCAPI?.events_received,
          normalizedData: result.normalizedData,
        });
      } else {
        throw new Error(result.error || `Status ${response.status}`);
      }
    } catch (error: any) {
      addResult('Meta CAPI ViewContent', 'error', `Falha ao enviar ViewContent: ${error.message || error}`);
      errors.push(`Meta CAPI ViewContent falhou: ${error.message}`);
    }

    // 9. Resumo final
    const finalSummary: DiagnosticSummary = {
      visitorId: testVisitorId,
      ip,
      city,
      state,
      country,
      utms,
      supabaseSuccess,
      metaCapiPageViewSuccess: metaPageViewSuccess,
      metaCapiViewContentSuccess: metaViewContentSuccess,
      metaFbtraceIds: fbtraceIds,
      errors,
      warnings,
    };

    setSummary(finalSummary);

    console.log('\n========================================');
    console.log('📊 RESUMO DO DIAGNÓSTICO');
    console.log('========================================');
    console.log('Visitor ID (teste):', testVisitorId);
    console.log('IP detectado:', ip);
    console.log('Localização:', `${city}, ${state}, ${country}`);
    console.log('UTMs:', utms);
    console.log('Supabase INSERT:', supabaseSuccess ? '✅ SUCESSO' : '❌ FALHA');
    console.log('Meta CAPI PageView:', metaPageViewSuccess ? '✅ SUCESSO' : '❌ FALHA');
    console.log('Meta CAPI ViewContent:', metaViewContentSuccess ? '✅ SUCESSO' : '❌ FALHA');
    console.log('fbtrace_ids:', fbtraceIds);
    
    if (errors.length > 0) {
      console.log('\n❌ ERROS:');
      errors.forEach(e => console.log('  -', e));
    }
    
    if (warnings.length > 0) {
      console.log('\n⚠️ AVISOS:');
      warnings.forEach(w => console.log('  -', w));
    }
    
    console.log('\n========================================\n');

    const allSuccess = supabaseSuccess && metaPageViewSuccess && metaViewContentSuccess;
    addResult('DIAGNÓSTICO COMPLETO', allSuccess ? 'success' : 'warning', 
      allSuccess ? 'Todos os testes passaram!' : `Concluído com ${errors.length} erro(s) e ${warnings.length} aviso(s)`);

    setIsRunning(false);
    return finalSummary;
  }, [addResult]);

  return {
    runDiagnostic,
    isRunning,
    results,
    summary,
  };
};
