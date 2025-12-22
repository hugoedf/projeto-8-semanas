import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Event types for the full funnel
const FUNNEL_EVENTS = ['PageView', 'VSLStart', 'VSL15s', 'VSL30s', 'CTAClick', 'InitiateCheckout', 'Purchase'];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    console.log(`Fetching events for last ${days} days, since ${startDate.toISOString()}`);

    // Get events
    const { data: events, error: eventsError } = await supabase
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
    let totalValue = 0;

    events?.forEach((event) => {
      // Count by event type
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;

      // Count by day
      const day = new Date(event.event_time).toISOString().split('T')[0];
      if (!dailyEvents[day]) dailyEvents[day] = {};
      dailyEvents[day][event.event_name] = (dailyEvents[day][event.event_name] || 0) + 1;

      // Track unique visitors
      if (event.visitor_id) uniqueVisitors.add(event.visitor_id);

      // Sum values
      if (event.value) totalValue += parseFloat(String(event.value));
    });

    // Calculate full funnel with all stages
    const funnelData = {
      pageViews: eventCounts['PageView'] || 0,
      vslStart: eventCounts['VSLStart'] || 0,
      vsl15s: eventCounts['VSL15s'] || 0,
      vsl30s: eventCounts['VSL30s'] || 0,
      ctaClick: eventCounts['CTAClick'] || 0,
      initiateCheckout: eventCounts['InitiateCheckout'] || 0,
      purchases: eventCounts['Purchase'] || 0,
    };

    // Calculate conversion rates between stages
    const calcRate = (current: number, previous: number) => 
      previous > 0 ? ((current / previous) * 100).toFixed(1) : '0.0';
    
    const calcDropoff = (current: number, previous: number) =>
      previous > 0 ? ((1 - current / previous) * 100).toFixed(1) : '0.0';

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

    // Calculate conversion rate
    const conversionRate = funnelData.pageViews > 0 
      ? ((funnelData.purchases / funnelData.pageViews) * 100).toFixed(2) 
      : '0.00';

    // Calculate 7-day comparison
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const last7Days = events?.filter(e => new Date(e.event_time) >= sevenDaysAgo) || [];
    const prev7Days = events?.filter(e => {
      const date = new Date(e.event_time);
      return date >= fourteenDaysAgo && date < sevenDaysAgo;
    }) || [];

    // Calculate detailed weekly comparison by event type
    const last7EventCounts: Record<string, number> = {};
    const prev7EventCounts: Record<string, number> = {};
    let last7Value = 0;
    let prev7Value = 0;

    last7Days.forEach(e => {
      last7EventCounts[e.event_name] = (last7EventCounts[e.event_name] || 0) + 1;
      if (e.value) last7Value += parseFloat(String(e.value));
    });

    prev7Days.forEach(e => {
      prev7EventCounts[e.event_name] = (prev7EventCounts[e.event_name] || 0) + 1;
      if (e.value) prev7Value += parseFloat(String(e.value));
    });

    const last7DaysCount = last7Days.length;
    const prev7DaysCount = prev7Days.length;
    const weekOverWeekChange = prev7DaysCount > 0 
      ? (((last7DaysCount - prev7DaysCount) / prev7DaysCount) * 100).toFixed(1)
      : '0.0';

    // Calculate week over week for conversions
    const last7Purchases = last7EventCounts['Purchase'] || 0;
    const prev7Purchases = prev7EventCounts['Purchase'] || 0;
    const purchaseWoWChange = prev7Purchases > 0
      ? (((last7Purchases - prev7Purchases) / prev7Purchases) * 100).toFixed(1)
      : '0.0';

    const valueWoWChange = prev7Value > 0
      ? (((last7Value - prev7Value) / prev7Value) * 100).toFixed(1)
      : '0.0';

    // Calculate trend (last 3 days vs previous 3 days)
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

    // Calculate historical averages for alerts
    const avgDailyEvents = Object.keys(dailyEvents).length > 0
      ? (events?.length || 0) / Object.keys(dailyEvents).length
      : 0;
    
    const avgDailyConversions = Object.keys(dailyEvents).length > 0
      ? funnelData.purchases / Object.keys(dailyEvents).length
      : 0;

    // Calculate alerts
    const alerts: Array<{ type: string; message: string; severity: 'warning' | 'error' | 'info' }> = [];

    // Check for sudden drops
    if (parseFloat(weekOverWeekChange) < -30) {
      alerts.push({
        type: 'drop',
        message: `Queda de ${Math.abs(parseFloat(weekOverWeekChange))}% nos eventos em relação à semana anterior`,
        severity: 'error'
      });
    }

    // Check for conversion drop
    if (parseFloat(purchaseWoWChange) < -50 && prev7Purchases > 0) {
      alerts.push({
        type: 'conversion_drop',
        message: `Queda brusca de ${Math.abs(parseFloat(purchaseWoWChange))}% nas conversões em relação à semana anterior`,
        severity: 'error'
      });
    }

    // Check for unusual spikes
    if (parseFloat(weekOverWeekChange) > 100) {
      alerts.push({
        type: 'spike',
        message: `Pico anormal: aumento de ${weekOverWeekChange}% nos eventos em relação à semana anterior`,
        severity: 'warning'
      });
    }

    // Check for low conversion rate
    if (funnelData.pageViews > 100 && parseFloat(conversionRate) < 1) {
      alerts.push({
        type: 'low_conversion',
        message: 'Taxa de conversão abaixo de 1% - abaixo da média histórica',
        severity: 'warning'
      });
    }

    // Check for no recent events
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = dailyEvents[today] ? Object.values(dailyEvents[today]).reduce((a, b) => a + b, 0) : 0;
    if (todayEvents === 0) {
      alerts.push({
        type: 'no_events',
        message: 'Nenhum evento registrado hoje',
        severity: 'info'
      });
    }

    // Check for high funnel drop-off
    if (parseFloat(dropoffs.vslStartTo15s) > 70 && funnelData.vslStart > 10) {
      alerts.push({
        type: 'high_dropoff',
        message: `Alta desistência (${dropoffs.vslStartTo15s}%) entre início do VSL e 15 segundos`,
        severity: 'warning'
      });
    }

    // Format daily data for charts - include all event types
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

    const response = {
      overview: {
        totalEvents: events?.length || 0,
        uniqueVisitors: uniqueVisitors.size,
        totalValue,
        conversionRate: parseFloat(conversionRate),
        eventCounts
      },
      funnel: {
        ...funnelData,
        rates: funnelRates,
        dropoffs
      },
      performance: {
        trend,
        weekOverWeekChange: parseFloat(weekOverWeekChange),
        purchaseWoWChange: parseFloat(purchaseWoWChange),
        valueWoWChange: parseFloat(valueWoWChange),
        last7Days: last7DaysCount,
        prev7Days: prev7DaysCount,
        last7Purchases,
        prev7Purchases,
        last7Value,
        prev7Value,
        last7EventCounts,
        prev7EventCounts,
        avgDailyEvents: Math.round(avgDailyEvents),
        avgDailyConversions: avgDailyConversions.toFixed(2)
      },
      alerts,
      chartData,
      lastUpdated: new Date().toISOString()
    };

    console.log('Dashboard response generated successfully');

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
