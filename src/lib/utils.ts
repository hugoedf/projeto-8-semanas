import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constrói URL de checkout da Hotmart com todos os parâmetros de rastreamento.
 * Gera e persiste um tracking_id caso ainda não exista, e captura UTMs tanto
 * do localStorage quanto da URL atual.
 */
export function buildHotmartCheckoutUrl(baseUrl: string): string {
  // Garantir um tracking_id válido
  let trackingId = localStorage.getItem('visitor_id');
  if (!trackingId) {
    trackingId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('visitor_id', trackingId);
  }

  // Base de parâmetros
  const params: Record<string, string> = { tracking_id: trackingId };
  const urlParams = new URLSearchParams(window.location.search);
  const trackingParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',     // incluído
    'fbclid',
    'gclid',
    'ttclid',
    'msclkid'
  ];

  // Preencher com valores do localStorage ou da query string
  trackingParams.forEach((param) => {
    const storageValue = localStorage.getItem(param);
    const urlValue = urlParams.get(param);
    const value = storageValue || urlValue || undefined;
    if (value) {
      params[param] = value;
    }
  });

  // Construir query string codificada
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Aplicar separador correto (? ou &)
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
}
