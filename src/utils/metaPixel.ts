import { supabase } from "@/integrations/supabase/client";

// Declare fbq function
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface ConversionEventData {
  event_name: string;
  event_source_url: string;
  user_data?: {
    em?: string;
    ph?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
  };
}

// Helper to get fbp cookie
const getFbp = (): string | undefined => {
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
};

// Helper to get fbc cookie
const getFbc = (): string | undefined => {
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
};

// Send event to Meta Pixel (browser)
export const trackPixelEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};

// Send event to Conversions API (server-side via Edge Function)
export const trackConversionEvent = async (
  eventName: string,
  userData?: UserData,
  customData?: { currency?: string; value?: number; [key: string]: any }
) => {
  try {
    const eventData: ConversionEventData = {
      event_name: eventName,
      event_source_url: window.location.href,
      user_data: {
        client_user_agent: navigator.userAgent,
        fbp: getFbp(),
        fbc: getFbc(),
      },
    };

    if (userData?.email) {
      eventData.user_data!.em = userData.email.toLowerCase().trim();
    }

    if (userData?.phone) {
      eventData.user_data!.ph = userData.phone.replace(/\D/g, '');
    }

    if (customData) {
      eventData.custom_data = customData;
    }

    const { data, error } = await supabase.functions.invoke('meta-conversion', {
      body: eventData,
    });

    if (error) {
      console.error('Error sending conversion event:', error);
      return { success: false, error };
    }

    console.log('Conversion event sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in trackConversionEvent:', error);
    return { success: false, error };
  }
};

// Track both pixel and conversion API
export const trackEvent = (
  eventName: string,
  userData?: UserData,
  customData?: any
) => {
  // Track on browser
  trackPixelEvent(eventName, customData);
  
  // Track on server
  trackConversionEvent(eventName, userData, customData);
};

// Common events
export const trackPageView = () => {
  trackPixelEvent('PageView');
};

export const trackPurchase = (value: number, currency = 'BRL', userData?: UserData) => {
  trackEvent('Purchase', userData, { value, currency });
};

export const trackLead = (userData?: UserData) => {
  trackEvent('Lead', userData);
};

export const trackAddToCart = (value?: number, currency = 'BRL', contentName?: string) => {
  trackEvent('AddToCart', undefined, { value, currency, content_name: contentName });
};

export const trackInitiateCheckout = (value?: number, currency = 'BRL') => {
  trackEvent('InitiateCheckout', undefined, { value, currency });
};
