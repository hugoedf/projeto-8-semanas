import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constrói URL de checkout da Hotmart com todos os parâmetros de rastreamento
 * Captura automaticamente do localStorage: tracking_id, UTMs e clickIDs
 */
export function buildHotmartCheckoutUrl(baseUrl: string): string {
  // Capturar tracking_id (visitorId/eventId)
  const trackingId = localStorage.getItem('visitor_id') || 'unknown';
  
  // Capturar todos os parâmetros de rastreamento do localStorage
  const params: Record<string, string> = {
    tracking_id: trackingId,
  };

  // Lista de parâmetros para capturar
  const trackingParams = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'ttclid',
    'msclkid'
  ];

  // Adicionar parâmetros que existem no localStorage
  trackingParams.forEach(param => {
    const value = localStorage.getItem(param);
    if (value) {
      params[param] = value;
    }
  });

  // Construir query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Adicionar à URL base (verificar se já tem query params)
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
}
