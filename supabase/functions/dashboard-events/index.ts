import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const DASHBOARD_PASSWORD = Deno.env.get('DASHBOARD_PASSWORD');

// Security: Validate password strength on startup
const MIN_PASSWORD_LENGTH = 8;

// Session token configuration
const TOKEN_EXPIRY_MS = 3600000; // 1 hour
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 900000; // 15 minutes

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://11d22b42-f1d4-448a-bb0a-b307793705e3.lovableproject.com',
  'https://guiadotreino.com.br',
  'https://www.guiadotreino.com.br',
];

const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.includes('.lovable.app')) return true;
  if (origin.includes('.lovableproject.com')) return true;
  if (origin.startsWith('http://localhost:')) return true;
  return false;
};

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lockoutUntil: number }>();

function checkLoginRateLimit(ip: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  
  if (!record) {
    loginAttempts.set(ip, { count: 1, lockoutUntil: 0 });
    return { allowed: true };
  }
  
  // Check if in lockout period
  if (record.lockoutUntil > now) {
    return { allowed: false, remainingTime: Math.ceil((record.lockoutUntil - now) / 1000) };
  }
  
  // Reset if lockout expired
  if (record.lockoutUntil > 0 && record.lockoutUntil <= now) {
    record.count = 1;
    record.lockoutUntil = 0;
    return { allowed: true };
  }
  
  record.count++;
  
  // Trigger lockout if too many attempts
  if (record.count > MAX_LOGIN_ATTEMPTS) {
    record.lockoutUntil = now + LOGIN_LOCKOUT_MS;
    console.warn(`Login lockout triggered for IP: ${ip.substring(0, 8)}...`);
    return { allowed: false, remainingTime: Math.ceil(LOGIN_LOCKOUT_MS / 1000) };
  }
  
  return { allowed: true };
}

function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-dashboard-token',
};

// Generate HMAC-based session token
async function generateSessionToken(): Promise<{ token: string; expires: number }> {
  const expires = Date.now() + TOKEN_EXPIRY_MS;
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));
  const randomHex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const data = `dashboard_session:${expires}:${randomHex}`;
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(DASHBOARD_PASSWORD),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return { token: `${expires}:${randomHex}:${signatureHex}`, expires };
}

// Validate session token
async function validateSessionToken(token: string): Promise<boolean> {
  if (!token || !DASHBOARD_PASSWORD) return false;
  
  const parts = token.split(':');
  if (parts.length !== 3) return false;
  
  const [expiresStr, randomHex, providedSignature] = parts;
  const expires = parseInt(expiresStr, 10);
  
  // Check expiry
  if (isNaN(expires) || Date.now() > expires) {
    return false;
  }
  
  // Validate format
  if (!/^[0-9a-f]{32}$/.test(randomHex) || !/^[0-9a-f]{64}$/.test(providedSignature)) {
    return false;
  }
  
  // Verify signature
  const data = `dashboard_session:${expires}:${randomHex}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(DASHBOARD_PASSWORD),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const expectedSignature = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Constant-time comparison
  if (providedSignature.length !== expectedSignature.length) return false;
  let result = 0;
  for (let i = 0; i < providedSignature.length; i++) {
    result |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  
  return result === 0;
}

// Constant-time string comparison for password
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Get client IP
function getClientIP(req: Request): string {
  return req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
}

// Helper functions
const calcRate = (current: number, previous: number) => 
  previous > 0 ? ((current / previous) * 100).toFixed(1) : '0.0';

const calcDropoff = (current: number, previous: number) =>
  previous > 0 ? ((1 - current / previous) * 100).toFixed(1) : '0.0';

const calcWoWChange = (current: number, previous: number) =>
  previous > 0 ? (((current - previous) / previous) * 100).toFixed(1) : '0.0';

// Aggregate events by dimension
function aggregateByDimension(events: any[], dimension: string) {
  const aggregated: Record<string, { events: number; conversions: number; value: number }> = {};
  
  events.forEach(event => {
    const key = event[dimension] || 'unknown';
    if (!aggregated[key]) {
      aggregated[key] = { events: 0, conversions: 0, value: 0 };
    }
    aggregated[key].events++;
    if (event.event_name === 'Purchase') {
      aggregated[key].conversions++;
      aggregated[key].value += parseFloat(String(event.value || 0));
    }
  });

  return Object.entries(aggregated).map(([name, data]) => ({
    name,
    ...data,
    conversionRate: data.events > 0 ? ((data.conversions / data.events) * 100).toFixed(2) : '0.00',
  })).sort((a, b) => b.events - a.events);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  
  // Validate origin
  const origin = req.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    console.warn(`Blocked request from origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Server configuration check
    if (!DASHBOARD_PASSWORD) {
      console.error('DASHBOARD_PASSWORD secret not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error', code: 'CONFIG_ERROR' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate password strength
    if (DASHBOARD_PASSWORD.length < MIN_PASSWORD_LENGTH) {
      console.error('DASHBOARD_PASSWORD is too weak');
      return new Response(
        JSON.stringify({ error: 'Server configuration error', code: 'CONFIG_ERROR' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let isAuthenticated = false;
    let isLoginRequest = false;
    
    // Check for session token first (preferred method)
    const sessionToken = req.headers.get('x-dashboard-token');
    if (sessionToken) {
      isAuthenticated = await validateSessionToken(sessionToken);
      if (!isAuthenticated) {
        console.log('Dashboard: Invalid or expired session token');
        return new Response(
          JSON.stringify({ error: 'Session expired', code: 'SESSION_EXPIRED' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.log('Dashboard: Session validated');
    }
    
    // If no token, check for password login
    if (!isAuthenticated && req.method === 'POST') {
      // Check login rate limit
      const rateLimit = checkLoginRateLimit(clientIP);
      if (!rateLimit.allowed) {
        console.warn(`Login blocked for IP: ${clientIP.substring(0, 8)}... (lockout)`);
        return new Response(
          JSON.stringify({ 
            error: `Too many attempts. Try again in ${rateLimit.remainingTime} seconds`,
            code: 'RATE_LIMITED' 
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        const body = await req.clone().json();
        const providedPassword = body?.password;
        
        if (providedPassword && typeof providedPassword === 'string') {
          isLoginRequest = true;
          
          // Validate password with constant-time comparison
          if (secureCompare(providedPassword, DASHBOARD_PASSWORD)) {
            isAuthenticated = true;
            resetLoginAttempts(clientIP);
            console.log('Dashboard: Password validated');
          } else {
            console.log('Dashboard: Invalid password');
            return new Response(
              JSON.stringify({ error: 'Unauthorized', code: 'UNAUTHORIZED' }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch {
        // Body parsing failed
      }
    }
    
    if (!isAuthenticated) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', code: 'UNAUTHORIZED' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const daysParam = url.searchParams.get('days') || '30';
    const days = Math.min(Math.max(parseInt(daysParam) || 30, 1), 90); // Limit to 1-90 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    console.log(`Dashboard: Fetching events for last ${days} days`);

    const supabaseService = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: events, error: eventsError } = await supabaseService
      .from('meta_events')
      .select('*')
      .gte('event_time', startDate.toISOString())
      .order('event_time', { ascending: false });

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch events' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${events?.length || 0} events`);

    // Calculate metrics
    const eventCounts: Record<string, number> = {};
    const dailyEvents: Record<string, Record<string, number>> = {};
    const uniqueVisitors = new Set<string>();
    const visitorsWithVSLStart = new Set<string>();
    const visitorsWith15s = new Set<string>();
    const visitorsWith30s = new Set<string>();
    const visitorsWithCTA = new Set<string>();
    let totalValue = 0;

    events?.forEach((event) => {
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
      
      const day = new Date(event.event_time).toISOString().split('T')[0];
      if (!dailyEvents[day]) dailyEvents[day] = {};
      dailyEvents[day][event.event_name] = (dailyEvents[day][event.event_name] || 0) + 1;

      if (event.visitor_id) {
        uniqueVisitors.add(event.visitor_id);
        if (event.event_name === 'VSLStart') visitorsWithVSLStart.add(event.visitor_id);
        if (event.event_name === 'VSL15s') visitorsWith15s.add(event.visitor_id);
        if (event.event_name === 'VSL30s') visitorsWith30s.add(event.visitor_id);
        if (event.event_name === 'CTAClick') visitorsWithCTA.add(event.visitor_id);
      }
      if (event.value) totalValue += parseFloat(String(event.value));
    });

    // Full funnel data
    const funnelData = {
      pageViews: eventCounts['PageView'] || 0,
      vslStart: eventCounts['VSLStart'] || 0,
      vsl15s: eventCounts['VSL15s'] || 0,
      vsl30s: eventCounts['VSL30s'] || 0,
      ctaClick: eventCounts['CTAClick'] || 0,
      initiateCheckout: eventCounts['InitiateCheckout'] || 0,
      purchases: eventCounts['Purchase'] || 0,
    };

    const funnelRates = {
      pageToVslStart: calcRate(funnelData.vslStart, funnelData.pageViews),
      vslStartTo15s: calcRate(funnelData.vsl15s, funnelData.vslStart),
      vsl15sTo30s: calcRate(funnelData.vsl30s, funnelData.vsl15s),
      vsl30sToCta: calcRate(funnelData.ctaClick, funnelData.vsl30s),
      ctaToCheckout: calcRate(funnelData.initiateCheckout, funnelData.ctaClick),
      checkoutToPurchase: calcRate(funnelData.purchases, funnelData.initiateCheckout),
      overallConversion: calcRate(funnelData.purchases, funnelData.pageViews),
    };

    const dropoffs = {
      pageToVslStart: calcDropoff(funnelData.vslStart, funnelData.pageViews),
      vslStartTo15s: calcDropoff(funnelData.vsl15s, funnelData.vslStart),
      vsl15sTo30s: calcDropoff(funnelData.vsl30s, funnelData.vsl15s),
      vsl30sToCta: calcDropoff(funnelData.ctaClick, funnelData.vsl30s),
      ctaToCheckout: calcDropoff(funnelData.initiateCheckout, funnelData.ctaClick),
      checkoutToPurchase: calcDropoff(funnelData.purchases, funnelData.initiateCheckout),
    };

    // Weekly comparison
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const last7Days = events?.filter(e => new Date(e.event_time) >= sevenDaysAgo) || [];
    const prev7Days = events?.filter(e => {
      const date = new Date(e.event_time);
      return date >= fourteenDaysAgo && date < sevenDaysAgo;
    }) || [];

    let last7Value = 0, prev7Value = 0;
    let last7Purchases = 0, prev7Purchases = 0;

    last7Days.forEach(e => {
      if (e.event_name === 'Purchase') {
        last7Purchases++;
        last7Value += parseFloat(String(e.value || 0));
      }
    });

    prev7Days.forEach(e => {
      if (e.event_name === 'Purchase') {
        prev7Purchases++;
        prev7Value += parseFloat(String(e.value || 0));
      }
    });

    // Trend calculation
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const last3Days = events?.filter(e => new Date(e.event_time) >= threeDaysAgo) || [];
    const prev3Days = events?.filter(e => {
      const date = new Date(e.event_time);
      return date >= sixDaysAgo && date < threeDaysAgo;
    }) || [];

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (last3Days.length > prev3Days.length * 1.1) trend = 'up';
    else if (last3Days.length < prev3Days.length * 0.9) trend = 'down';

    // Analytics by dimension
    const byPlatform = aggregateByDimension(events || [], 'publisher_platform');
    const byPlacement = aggregateByDimension(events || [], 'placement');
    const byDevice = aggregateByDimension(events || [], 'device');
    const byOS = aggregateByDimension(events || [], 'os');
    const byCountry = aggregateByDimension(events || [], 'country');
    const byRegion = aggregateByDimension(events || [], 'region');
    const byCity = aggregateByDimension(events || [], 'city');
    const bySource = aggregateByDimension(events || [], 'utm_source');
    const byCampaign = aggregateByDimension(events || [], 'utm_campaign');

    // Generate alerts
    const alerts: Array<{ type: string; message: string; severity: 'warning' | 'error' | 'info' }> = [];
    const weekOverWeekChange = parseFloat(calcWoWChange(last7Days.length, prev7Days.length));
    const purchaseWoWChange = parseFloat(calcWoWChange(last7Purchases, prev7Purchases));

    if (weekOverWeekChange < -30) {
      alerts.push({
        type: 'drop',
        message: `Queda de ${Math.abs(weekOverWeekChange)}% nos eventos vs semana anterior`,
        severity: 'error'
      });
    }

    if (purchaseWoWChange < -50 && prev7Purchases > 0) {
      alerts.push({
        type: 'conversion_drop',
        message: `Queda brusca de ${Math.abs(purchaseWoWChange)}% nas conversões`,
        severity: 'error'
      });
    }

    if (weekOverWeekChange > 100) {
      alerts.push({
        type: 'spike',
        message: `Pico anormal: +${weekOverWeekChange}% nos eventos`,
        severity: 'warning'
      });
    }

    const avgConversionRate = funnelData.pageViews > 0 
      ? (funnelData.purchases / funnelData.pageViews) * 100 
      : 0;

    byPlacement.forEach(p => {
      if (p.events > 50 && parseFloat(p.conversionRate) < avgConversionRate * 0.5) {
        alerts.push({
          type: 'placement_underperform',
          message: `Posicionamento "${p.name}" com conversão ${p.conversionRate}% (abaixo da média)`,
          severity: 'warning'
        });
      }
    });

    byRegion.forEach(r => {
      if (r.events > 20 && parseFloat(r.conversionRate) > avgConversionRate * 1.5) {
        alerts.push({
          type: 'region_opportunity',
          message: `Região "${r.name}" com conversão ${r.conversionRate}% acima da média - oportunidade!`,
          severity: 'info'
        });
      }
    });

    const today = new Date().toISOString().split('T')[0];
    const todayEvents = dailyEvents[today] ? Object.values(dailyEvents[today]).reduce((a, b) => a + b, 0) : 0;
    if (todayEvents === 0) {
      alerts.push({
        type: 'no_events',
        message: 'Nenhum evento registrado hoje',
        severity: 'info'
      });
    }

    // Chart data
    const chartData = Object.entries(dailyEvents)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, counts]) => ({
        date,
        PageView: counts['PageView'] || 0,
        VSLStart: counts['VSLStart'] || 0,
        VSL15s: counts['VSL15s'] || 0,
        VSL30s: counts['VSL30s'] || 0,
        CTAClick: counts['CTAClick'] || 0,
        InitiateCheckout: counts['InitiateCheckout'] || 0,
        Purchase: counts['Purchase'] || 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0)
      }));

    const avgDailyEvents = Object.keys(dailyEvents).length > 0
      ? Math.round((events?.length || 0) / Object.keys(dailyEvents).length)
      : 0;

    // Engagement metrics
    const vslPlayRate = uniqueVisitors.size > 0 
      ? ((visitorsWithVSLStart.size / uniqueVisitors.size) * 100).toFixed(1)
      : '0.0';
    const vslRetention15s = visitorsWithVSLStart.size > 0
      ? ((visitorsWith15s.size / visitorsWithVSLStart.size) * 100).toFixed(1)
      : '0.0';
    const vslRetention30s = visitorsWithVSLStart.size > 0
      ? ((visitorsWith30s.size / visitorsWithVSLStart.size) * 100).toFixed(1)
      : '0.0';
    const vslToCTARate = visitorsWithVSLStart.size > 0
      ? ((visitorsWithCTA.size / visitorsWithVSLStart.size) * 100).toFixed(1)
      : '0.0';
    const avgEventsPerVisitor = uniqueVisitors.size > 0
      ? ((events?.length || 0) / uniqueVisitors.size).toFixed(1)
      : '0.0';
    const bounceRate = uniqueVisitors.size > 0
      ? (((uniqueVisitors.size - visitorsWithVSLStart.size) / uniqueVisitors.size) * 100).toFixed(1)
      : '0.0';

    // Generate session token for login requests
    let sessionTokenData = null;
    if (isLoginRequest) {
      sessionTokenData = await generateSessionToken();
    }

    const response = {
      ...(sessionTokenData && { 
        sessionToken: sessionTokenData.token,
        sessionExpires: sessionTokenData.expires 
      }),
      overview: {
        totalEvents: events?.length || 0,
        uniqueVisitors: uniqueVisitors.size,
        totalValue,
        conversionRate: parseFloat(calcRate(funnelData.purchases, funnelData.pageViews)),
        eventCounts
      },
      funnel: {
        ...funnelData,
        rates: funnelRates,
        dropoffs
      },
      engagement: {
        vslPlayRate,
        vslRetention15s,
        vslRetention30s,
        vslToCTARate,
        avgEventsPerVisitor,
        bounceRate,
        visitorsWithVSLStart: visitorsWithVSLStart.size,
        visitorsWith15s: visitorsWith15s.size,
        visitorsWith30s: visitorsWith30s.size,
        visitorsWithCTA: visitorsWithCTA.size,
      },
      performance: {
        trend,
        weekOverWeekChange,
        purchaseWoWChange: parseFloat(calcWoWChange(last7Purchases, prev7Purchases)),
        valueWoWChange: parseFloat(calcWoWChange(last7Value, prev7Value)),
        last7Days: last7Days.length,
        prev7Days: prev7Days.length,
        last7Purchases,
        prev7Purchases,
        last7Value,
        prev7Value,
        avgDailyEvents,
        avgDailyConversions: Object.keys(dailyEvents).length > 0 
          ? (funnelData.purchases / Object.keys(dailyEvents).length).toFixed(2)
          : '0.00'
      },
      analytics: {
        byPlatform,
        byPlacement,
        byDevice,
        byOS,
        byCountry,
        byRegion,
        byCity,
        bySource,
        byCampaign,
      },
      alerts,
      chartData,
      lastUpdated: new Date().toISOString()
    };

    console.log('Dashboard response generated');

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Dashboard error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
