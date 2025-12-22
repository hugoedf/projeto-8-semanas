import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCw,
  Eye,
  ShoppingCart,
  DollarSign,
  Users,
  Minus,
  Play,
  Clock,
  MousePointer,
  ArrowRight,
  Activity
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface DashboardData {
  overview: {
    totalEvents: number;
    uniqueVisitors: number;
    totalValue: number;
    conversionRate: number;
    eventCounts: Record<string, number>;
  };
  funnel: {
    pageViews: number;
    vslStart: number;
    vsl15s: number;
    vsl30s: number;
    ctaClick: number;
    initiateCheckout: number;
    purchases: number;
    rates: {
      pageToVslStart: string;
      vslStartTo15s: string;
      vsl15sTo30s: string;
      vsl30sToCta: string;
      ctaToCheckout: string;
      checkoutToPurchase: string;
      overallConversion: string;
    };
    dropoffs: {
      pageToVslStart: string;
      vslStartTo15s: string;
      vsl15sTo30s: string;
      vsl30sToCta: string;
      ctaToCheckout: string;
      checkoutToPurchase: string;
    };
  };
  performance: {
    trend: 'up' | 'down' | 'stable';
    weekOverWeekChange: number;
    purchaseWoWChange: number;
    valueWoWChange: number;
    last7Days: number;
    prev7Days: number;
    last7Purchases: number;
    prev7Purchases: number;
    last7Value: number;
    prev7Value: number;
    last7EventCounts: Record<string, number>;
    prev7EventCounts: Record<string, number>;
    avgDailyEvents: number;
    avgDailyConversions: string;
  };
  alerts: Array<{ type: string; message: string; severity: 'warning' | 'error' | 'info' }>;
  chartData: Array<{
    date: string;
    PageView: number;
    VSLStart: number;
    VSL15s: number;
    VSL30s: number;
    CTAClick: number;
    InitiateCheckout: number;
    Purchase: number;
    total: number;
  }>;
  lastUpdated: string;
}

const chartConfig = {
  PageView: { label: 'PageView', color: 'hsl(220, 70%, 50%)' },
  VSLStart: { label: 'VSL Start', color: 'hsl(280, 70%, 50%)' },
  VSL15s: { label: 'VSL 15s', color: 'hsl(200, 70%, 50%)' },
  VSL30s: { label: 'VSL 30s', color: 'hsl(160, 70%, 50%)' },
  CTAClick: { label: 'CTA Click', color: 'hsl(40, 70%, 50%)' },
  InitiateCheckout: { label: 'Checkout', color: 'hsl(340, 70%, 50%)' },
  Purchase: { label: 'Purchase', color: 'hsl(120, 70%, 50%)' },
  total: { label: 'Total', color: 'hsl(var(--accent))' },
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: response, error: fetchError } = await supabase.functions.invoke('dashboard-events', {
        body: null,
        method: 'GET',
      });

      if (fetchError) throw fetchError;
      setData(response);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  };

  const ChangeIndicator = ({ value, suffix = '%' }: { value: number; suffix?: string }) => {
    const isPositive = value > 0;
    const isNegative = value < 0;
    return (
      <span className={`text-sm font-medium ${
        isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'
      }`}>
        {isPositive ? '+' : ''}{value}{suffix}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-destructive" />
          <p className="text-destructive mb-4">{error || 'Erro desconhecido'}</p>
          <Button onClick={fetchData}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  // Prepare funnel data for visualization
  const funnelStages = [
    { name: 'PageView', label: 'Visualização', value: data.funnel.pageViews, icon: Eye },
    { name: 'VSLStart', label: 'VSL Start', value: data.funnel.vslStart, icon: Play },
    { name: 'VSL15s', label: 'VSL 15s', value: data.funnel.vsl15s, icon: Clock },
    { name: 'VSL30s', label: 'VSL 30s', value: data.funnel.vsl30s, icon: Clock },
    { name: 'CTAClick', label: 'CTA Click', value: data.funnel.ctaClick, icon: MousePointer },
    { name: 'Checkout', label: 'Checkout', value: data.funnel.initiateCheckout, icon: ShoppingCart },
    { name: 'Purchase', label: 'Compra', value: data.funnel.purchases, icon: DollarSign },
  ];

  const dropoffLabels: Record<string, { from: string; to: string; value: string }> = {
    pageToVslStart: { from: 'PageView', to: 'VSL Start', value: data.funnel.dropoffs.pageToVslStart },
    vslStartTo15s: { from: 'VSL Start', to: 'VSL 15s', value: data.funnel.dropoffs.vslStartTo15s },
    vsl15sTo30s: { from: 'VSL 15s', to: 'VSL 30s', value: data.funnel.dropoffs.vsl15sTo30s },
    vsl30sToCta: { from: 'VSL 30s', to: 'CTA', value: data.funnel.dropoffs.vsl30sToCta },
    ctaToCheckout: { from: 'CTA', to: 'Checkout', value: data.funnel.dropoffs.ctaToCheckout },
    checkoutToPurchase: { from: 'Checkout', to: 'Compra', value: data.funnel.dropoffs.checkoutToPurchase },
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard de Performance</h1>
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date(data.lastUpdated).toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-card border border-border rounded-lg overflow-hidden">
              {[1, 7, 14, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-2 text-sm transition-colors ${
                    days === d 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d === 1 ? 'Hoje' : `${d}d`}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <div className="space-y-2">
            {data.alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  alert.severity === 'error' 
                    ? 'bg-destructive/10 border-destructive/30' 
                    : alert.severity === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-accent/10 border-accent/30'
                }`}
              >
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.severity === 'error' 
                    ? 'text-destructive' 
                    : alert.severity === 'warning'
                    ? 'text-yellow-500'
                    : 'text-accent'
                }`} />
                <div>
                  <Badge variant="outline" className={`mb-1 ${
                    alert.severity === 'error' 
                      ? 'border-destructive/50 text-destructive' 
                      : alert.severity === 'warning'
                      ? 'border-yellow-500/50 text-yellow-500'
                      : 'border-accent/50 text-accent'
                  }`}>
                    {alert.type === 'drop' ? 'Queda' : 
                     alert.type === 'spike' ? 'Pico' :
                     alert.type === 'low_conversion' ? 'Conversão Baixa' :
                     alert.type === 'conversion_drop' ? 'Queda de Conversão' :
                     alert.type === 'high_dropoff' ? 'Alta Desistência' :
                     'Info'}
                  </Badge>
                  <p className={`text-sm ${
                    alert.severity === 'error' 
                      ? 'text-destructive' 
                      : alert.severity === 'warning'
                      ? 'text-yellow-500'
                      : 'text-foreground'
                  }`}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Visitantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.overview.uniqueVisitors.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.overview.totalEvents.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon trend={data.performance.trend} />
                <ChangeIndicator value={data.performance.weekOverWeekChange} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Conversões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.funnel.purchases}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ChangeIndicator value={data.performance.purchaseWoWChange} />
                <span className="text-xs text-muted-foreground">vs 7d ant.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Taxa Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {data.overview.conversionRate}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Valor Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                R$ {data.overview.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ChangeIndicator value={data.performance.valueWoWChange} />
                <span className="text-xs text-muted-foreground">vs 7d ant.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Funil de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Funnel Visualization */}
              <div className="grid grid-cols-7 gap-2">
                {funnelStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const percentage = data.funnel.pageViews > 0 
                    ? ((stage.value / data.funnel.pageViews) * 100)
                    : 0;
                  
                  return (
                    <div key={stage.name} className="text-center">
                      <div 
                        className="mx-auto mb-2 rounded-lg p-3 transition-all"
                        style={{
                          backgroundColor: `hsl(var(--accent) / ${0.1 + (percentage / 100) * 0.4})`,
                          borderWidth: 2,
                          borderColor: stage.name === 'Purchase' ? 'hsl(120, 70%, 50%)' : 'hsl(var(--border))'
                        }}
                      >
                        <Icon className={`w-5 h-5 mx-auto ${
                          stage.name === 'Purchase' ? 'text-green-500' : 'text-accent'
                        }`} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{stage.label}</p>
                      <p className="text-lg font-bold text-foreground">{stage.value}</p>
                      <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                    </div>
                  );
                })}
              </div>

              {/* Funnel Progress Bar */}
              <div className="space-y-3">
                {funnelStages.map((stage, idx) => {
                  const percentage = data.funnel.pageViews > 0 
                    ? ((stage.value / data.funnel.pageViews) * 100)
                    : 0;
                  
                  return (
                    <div key={stage.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{stage.label}</span>
                        <span className="font-medium">{stage.value} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            stage.name === 'Purchase' ? 'bg-green-500' : 'bg-accent'
                          }`}
                          style={{ width: `${percentage}%`, opacity: 0.5 + percentage / 200 }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dropoff Analysis */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Taxa de Desistência por Etapa</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {Object.entries(dropoffLabels).map(([key, { from, to, value }]) => (
                    <div key={key} className="bg-muted/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">{from} → {to}</p>
                      <p className={`text-xl font-bold ${
                        parseFloat(value) > 50 ? 'text-destructive' : 
                        parseFloat(value) > 30 ? 'text-yellow-500' : 'text-green-500'
                      }`}>{value}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Events Over Time */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Eventos por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chartData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="PageView" stroke={chartConfig.PageView.color} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="CTAClick" stroke={chartConfig.CTAClick.color} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Purchase" stroke={chartConfig.Purchase.color} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Events by Type */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Eventos por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={funnelStages.map(s => ({ 
                      name: s.label, 
                      value: s.value,
                      fill: s.name === 'Purchase' ? 'hsl(120, 70%, 50%)' : 'hsl(var(--accent))'
                    }))}
                    layout="vertical"
                  >
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Comparação Semanal (Últimos 7 dias vs 7 dias anteriores)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Total Events */}
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Total de Eventos</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{data.performance.last7Days}</p>
                    <p className="text-xs text-muted-foreground">Últimos 7d</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold text-muted-foreground">{data.performance.prev7Days}</p>
                    <p className="text-xs text-muted-foreground">7d anteriores</p>
                  </div>
                </div>
                <div className="mt-2">
                  <ChangeIndicator value={data.performance.weekOverWeekChange} />
                </div>
              </div>

              {/* Conversions */}
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Conversões</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{data.performance.last7Purchases}</p>
                    <p className="text-xs text-muted-foreground">Últimos 7d</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold text-muted-foreground">{data.performance.prev7Purchases}</p>
                    <p className="text-xs text-muted-foreground">7d anteriores</p>
                  </div>
                </div>
                <div className="mt-2">
                  <ChangeIndicator value={data.performance.purchaseWoWChange} />
                </div>
              </div>

              {/* Value */}
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Valor Gerado</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-xl font-bold text-foreground">R$ {data.performance.last7Value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground">Últimos 7d</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xl font-bold text-muted-foreground">R$ {data.performance.prev7Value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground">7d anteriores</p>
                  </div>
                </div>
                <div className="mt-2">
                  <ChangeIndicator value={data.performance.valueWoWChange} />
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="text-center p-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground mb-2">Tendência</p>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  data.performance.trend === 'up' 
                    ? 'bg-green-500/20' 
                    : data.performance.trend === 'down' 
                    ? 'bg-red-500/20'
                    : 'bg-muted'
                }`}>
                  <TrendIcon trend={data.performance.trend} />
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  data.performance.trend === 'up' 
                    ? 'text-green-500' 
                    : data.performance.trend === 'down' 
                    ? 'text-red-500'
                    : 'text-muted-foreground'
                }`}>
                  {data.performance.trend === 'up' ? 'Subindo' : 
                   data.performance.trend === 'down' ? 'Caindo' : 'Estável'}
                </p>
              </div>
            </div>

            {/* Averages */}
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Média diária de eventos</p>
                <p className="text-2xl font-bold text-foreground">{data.performance.avgDailyEvents}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Média diária de conversões</p>
                <p className="text-2xl font-bold text-foreground">{data.performance.avgDailyConversions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
