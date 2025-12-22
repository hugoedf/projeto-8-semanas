import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get events overview
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
      if (event.value) totalValue += parseFloat(event.value);
    });

    // Calculate funnel
    const pageViews = eventCounts['PageView'] || 0;
    const viewContent = eventCounts['ViewContent'] || 0;
    const initiateCheckout = eventCounts['InitiateCheckout'] || 0;
    const purchases = eventCounts['Purchase'] || 0;

    // Calculate conversion rate
    const conversionRate = pageViews > 0 ? ((purchases / pageViews) * 100).toFixed(2) : '0.00';

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

    const last7DaysCount = last7Days.length;
    const prev7DaysCount = prev7Days.length;
    const weekOverWeekChange = prev7DaysCount > 0 
      ? (((last7DaysCount - prev7DaysCount) / prev7DaysCount) * 100).toFixed(1)
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

    // Check for unusual spikes
    if (parseFloat(weekOverWeekChange) > 100) {
      alerts.push({
        type: 'spike',
        message: `Aumento de ${weekOverWeekChange}% nos eventos em relação à semana anterior`,
        severity: 'warning'
      });
    }

    // Check for low conversion rate
    if (pageViews > 100 && parseFloat(conversionRate) < 1) {
      alerts.push({
        type: 'low_conversion',
        message: 'Taxa de conversão abaixo de 1%',
        severity: 'warning'
      });
    }

    // Check for no recent events
    const today = new Date().toISOString().split('T')[0];
    if (!dailyEvents[today] || Object.values(dailyEvents[today]).reduce((a, b) => a + b, 0) === 0) {
      alerts.push({
        type: 'no_events',
        message: 'Nenhum evento registrado hoje',
        severity: 'info'
      });
    }

    // Format daily data for charts
    const chartData = Object.entries(dailyEvents)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, counts]) => ({
        date,
        PageView: counts['PageView'] || 0,
        ViewContent: counts['ViewContent'] || 0,
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
        pageViews,
        viewContent,
        initiateCheckout,
        purchases,
        dropoffs: {
          viewToCheckout: viewContent > 0 ? ((1 - initiateCheckout / viewContent) * 100).toFixed(1) : '0',
          checkoutToPurchase: initiateCheckout > 0 ? ((1 - purchases / initiateCheckout) * 100).toFixed(1) : '0'
        }
      },
      performance: {
        trend,
        weekOverWeekChange: parseFloat(weekOverWeekChange),
        last7Days: last7DaysCount,
        prev7Days: prev7DaysCount
      },
      alerts,
      chartData,
      lastUpdated: new Date().toISOString()
    };

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
