import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCw,
  Eye,
  ShoppingCart,
  DollarSign,
  Users,
  Minus
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
  Bar
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
    viewContent: number;
    initiateCheckout: number;
    purchases: number;
    dropoffs: {
      viewToCheckout: string;
      checkoutToPurchase: string;
    };
  };
  performance: {
    trend: 'up' | 'down' | 'stable';
    weekOverWeekChange: number;
    last7Days: number;
    prev7Days: number;
  };
  alerts: Array<{ type: string; message: string; severity: 'warning' | 'error' | 'info' }>;
  chartData: Array<{
    date: string;
    PageView: number;
    ViewContent: number;
    InitiateCheckout: number;
    Purchase: number;
    total: number;
  }>;
  lastUpdated: string;
}

const chartConfig = {
  PageView: { label: 'PageView', color: 'hsl(var(--chart-1))' },
  ViewContent: { label: 'ViewContent', color: 'hsl(var(--chart-2))' },
  InitiateCheckout: { label: 'InitiateCheckout', color: 'hsl(var(--chart-3))' },
  Purchase: { label: 'Purchase', color: 'hsl(var(--chart-4))' },
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
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="bg-card border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value={7}>Últimos 7 dias</option>
              <option value={14}>Últimos 14 dias</option>
              <option value={30}>Últimos 30 dias</option>
            </select>
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
                className={`p-3 rounded-lg border flex items-center gap-3 ${
                  alert.severity === 'error' 
                    ? 'bg-destructive/10 border-destructive/30 text-destructive' 
                    : alert.severity === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                    : 'bg-accent/10 border-accent/30 text-accent'
                }`}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Total de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.overview.totalEvents.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon trend={data.performance.trend} />
                <span className={`text-sm ${
                  data.performance.weekOverWeekChange > 0 ? 'text-green-500' : 
                  data.performance.weekOverWeekChange < 0 ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {data.performance.weekOverWeekChange > 0 ? '+' : ''}{data.performance.weekOverWeekChange}% vs semana anterior
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Visitantes Únicos
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
                <ShoppingCart className="w-4 h-4" />
                Conversões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.funnel.purchases}
              </div>
              <p className="text-sm text-muted-foreground">
                Taxa: {data.overview.conversionRate}%
              </p>
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
              <div className="text-2xl font-bold text-accent">
                R$ {data.overview.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Funil de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Funnel Bars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">PageView</span>
                    <span className="font-medium">{data.funnel.pageViews}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ViewContent</span>
                    <span className="font-medium">{data.funnel.viewContent}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent/80 rounded-full" 
                      style={{ width: data.funnel.pageViews > 0 ? `${(data.funnel.viewContent / data.funnel.pageViews) * 100}%` : '0%' }} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">InitiateCheckout</span>
                    <span className="font-medium">{data.funnel.initiateCheckout}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent/60 rounded-full" 
                      style={{ width: data.funnel.pageViews > 0 ? `${(data.funnel.initiateCheckout / data.funnel.pageViews) * 100}%` : '0%' }} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purchase</span>
                    <span className="font-medium text-accent">{data.funnel.purchases}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: data.funnel.pageViews > 0 ? `${(data.funnel.purchases / data.funnel.pageViews) * 100}%` : '0%' }} 
                    />
                  </div>
                </div>
              </div>

              {/* Dropoff Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{data.funnel.dropoffs.viewToCheckout}%</p>
                  <p className="text-xs text-muted-foreground">Desistência ViewContent → Checkout</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{data.funnel.dropoffs.checkoutToPurchase}%</p>
                  <p className="text-xs text-muted-foreground">Desistência Checkout → Compra</p>
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
              <ChartContainer config={chartConfig} className="h-[250px]">
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
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={false}
                    />
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
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{
                    name: 'Eventos',
                    PageView: data.overview.eventCounts['PageView'] || 0,
                    ViewContent: data.overview.eventCounts['ViewContent'] || 0,
                    InitiateCheckout: data.overview.eventCounts['InitiateCheckout'] || 0,
                    Purchase: data.overview.eventCounts['Purchase'] || 0,
                  }]}>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="PageView" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="ViewContent" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="InitiateCheckout" fill="hsl(var(--chart-3))" />
                    <Bar dataKey="Purchase" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Comparação Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{data.performance.last7Days}</p>
                <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-muted-foreground">{data.performance.prev7Days}</p>
                <p className="text-sm text-muted-foreground">7 dias anteriores</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                data.performance.weekOverWeekChange > 0 
                  ? 'bg-green-500/20 text-green-500' 
                  : data.performance.weekOverWeekChange < 0 
                  ? 'bg-red-500/20 text-red-500'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <TrendIcon trend={data.performance.trend} />
                {data.performance.weekOverWeekChange > 0 ? '+' : ''}{data.performance.weekOverWeekChange}% de variação
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
