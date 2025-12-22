import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Activity,
  Smartphone,
  Monitor,
  Globe,
  MapPin,
  LayoutGrid,
  LogOut,
  Loader2
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AnalyticsData {
  name: string;
  events: number;
  conversions: number;
  value: number;
  conversionRate: string;
}

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
    rates: Record<string, string>;
    dropoffs: Record<string, string>;
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
    avgDailyEvents: number;
    avgDailyConversions: string;
  };
  analytics: {
    byPlatform: AnalyticsData[];
    byPlacement: AnalyticsData[];
    byDevice: AnalyticsData[];
    byOS: AnalyticsData[];
    byCountry: AnalyticsData[];
    byRegion: AnalyticsData[];
    byCity: AnalyticsData[];
    bySource: AnalyticsData[];
    byCampaign: AnalyticsData[];
  };
  alerts: Array<{ type: string; message: string; severity: 'warning' | 'error' | 'info' }>;
  chartData: Array<Record<string, any>>;
  lastUpdated: string;
}

const chartConfig = {
  PageView: { label: 'PageView', color: 'hsl(220, 70%, 50%)' },
  VSLStart: { label: 'VSL Start', color: 'hsl(280, 70%, 50%)' },
  CTAClick: { label: 'CTA Click', color: 'hsl(40, 70%, 50%)' },
  Purchase: { label: 'Purchase', color: 'hsl(120, 70%, 50%)' },
  total: { label: 'Total', color: 'hsl(var(--accent))' },
};

const COLORS = ['hsl(220, 70%, 50%)', 'hsl(280, 70%, 50%)', 'hsl(40, 70%, 50%)', 'hsl(120, 70%, 50%)', 'hsl(0, 70%, 50%)', 'hsl(160, 70%, 50%)'];

export default function Dashboard() {
  const { user, loading: authLoading, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, isAuthenticated, navigate]);

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
    if (isAuthenticated) {
      fetchData();
    }
  }, [days, isAuthenticated]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

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

  const AnalyticsTable = ({ data, title }: { data: AnalyticsData[]; title: string }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">{title}</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Eventos</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Conversões</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Taxa</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Receita</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((item, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2 px-3 font-medium text-foreground capitalize">{item.name || 'Desconhecido'}</td>
              <td className="text-right py-2 px-3">{item.events.toLocaleString('pt-BR')}</td>
              <td className="text-right py-2 px-3 text-green-500">{item.conversions}</td>
              <td className="text-right py-2 px-3">
                <span className={`${parseFloat(item.conversionRate) > 2 ? 'text-green-500' : parseFloat(item.conversionRate) < 0.5 ? 'text-red-500' : 'text-foreground'}`}>
                  {item.conversionRate}%
                </span>
              </td>
              <td className="text-right py-2 px-3 text-accent">
                R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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

  const funnelStages = [
    { name: 'PageView', label: 'Visualização', value: data.funnel.pageViews, icon: Eye },
    { name: 'VSLStart', label: 'VSL Start', value: data.funnel.vslStart, icon: Play },
    { name: 'VSL15s', label: 'VSL 15s', value: data.funnel.vsl15s, icon: Clock },
    { name: 'VSL30s', label: 'VSL 30s', value: data.funnel.vsl30s, icon: Clock },
    { name: 'CTAClick', label: 'CTA Click', value: data.funnel.ctaClick, icon: MousePointer },
    { name: 'Checkout', label: 'Checkout', value: data.funnel.initiateCheckout, icon: ShoppingCart },
    { name: 'Purchase', label: 'Compra', value: data.funnel.purchases, icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard de Performance</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email} • Atualizado: {new Date(data.lastUpdated).toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {data.alerts.slice(0, 6).map((alert, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex items-start gap-3 ${
                  alert.severity === 'error' 
                    ? 'bg-destructive/10 border-destructive/30' 
                    : alert.severity === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-accent/10 border-accent/30'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  alert.severity === 'error' ? 'text-destructive' : 
                  alert.severity === 'warning' ? 'text-yellow-500' : 'text-accent'
                }`} />
                <p className={`text-xs ${
                  alert.severity === 'error' ? 'text-destructive' : 
                  alert.severity === 'warning' ? 'text-yellow-500' : 'text-foreground'
                }`}>{alert.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
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
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.overview.totalEvents.toLocaleString('pt-BR')}
              </div>
              <ChangeIndicator value={data.performance.weekOverWeekChange} />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Conversões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{data.funnel.purchases}</div>
              <ChangeIndicator value={data.performance.purchaseWoWChange} />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Taxa Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{data.overview.conversionRate}%</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Receita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                R$ {data.overview.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </div>
              <ChangeIndicator value={data.performance.valueWoWChange} />
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="funnel" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="funnel">Funil</TabsTrigger>
            <TabsTrigger value="platform">Plataforma</TabsTrigger>
            <TabsTrigger value="placement">Posicionamento</TabsTrigger>
            <TabsTrigger value="device">Dispositivo</TabsTrigger>
            <TabsTrigger value="region">Região</TabsTrigger>
            <TabsTrigger value="source">Origem</TabsTrigger>
          </TabsList>

          {/* Funnel Tab */}
          <TabsContent value="funnel" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Funnel Visualization */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Funil de Conversão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {funnelStages.map((stage, idx) => {
                    const Icon = stage.icon;
                    const percentage = data.funnel.pageViews > 0 
                      ? ((stage.value / data.funnel.pageViews) * 100)
                      : 0;
                    
                    return (
                      <div key={stage.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {stage.label}
                          </span>
                          <span className="font-medium">{stage.value} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              stage.name === 'Purchase' ? 'bg-green-500' : 'bg-accent'
                            }`}
                            style={{ width: `${percentage}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Weekly Comparison */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Comparação Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Eventos</p>
                      <p className="text-xl font-bold">{data.performance.last7Days}</p>
                      <p className="text-xs text-muted-foreground">vs {data.performance.prev7Days}</p>
                      <ChangeIndicator value={data.performance.weekOverWeekChange} />
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Conversões</p>
                      <p className="text-xl font-bold">{data.performance.last7Purchases}</p>
                      <p className="text-xs text-muted-foreground">vs {data.performance.prev7Purchases}</p>
                      <ChangeIndicator value={data.performance.purchaseWoWChange} />
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Receita</p>
                      <p className="text-lg font-bold">R$ {data.performance.last7Value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
                      <ChangeIndicator value={data.performance.valueWoWChange} />
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground mb-1">Tendência</p>
                      <TrendIcon trend={data.performance.trend} />
                      <p className="text-sm font-medium mt-1">
                        {data.performance.trend === 'up' ? 'Subindo' : 
                         data.performance.trend === 'down' ? 'Caindo' : 'Estável'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
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
                        <Line type="monotone" dataKey="PageView" stroke={chartConfig.PageView.color} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="CTAClick" stroke={chartConfig.CTAClick.color} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Purchase" stroke={chartConfig.Purchase.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Eventos por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={funnelStages.map(s => ({ name: s.label, value: s.value }))}
                        layout="vertical"
                      >
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Platform Tab */}
          <TabsContent value="platform" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Performance por Plataforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byPlatform} title="Plataforma" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição por Plataforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.analytics.byPlatform.filter(p => p.events > 0)}
                          dataKey="events"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {data.analytics.byPlatform.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Placement Tab */}
          <TabsContent value="placement" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  Performance por Posicionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsTable data={data.analytics.byPlacement} title="Posicionamento" />
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Eventos por Posicionamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.analytics.byPlacement.slice(0, 6)}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <ChartTooltip />
                        <Bar dataKey="events" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Conversões por Posicionamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.analytics.byPlacement.slice(0, 6)}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <ChartTooltip />
                        <Bar dataKey="conversions" fill="hsl(120, 70%, 50%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Device Tab */}
          <TabsContent value="device" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Performance por Dispositivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byDevice} title="Dispositivo" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Performance por Sistema Operacional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byOS} title="OS" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Comparação Mobile vs Desktop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {data.analytics.byDevice.slice(0, 2).map((device, idx) => (
                    <div key={idx} className="text-center p-6 bg-muted/30 rounded-lg">
                      {device.name === 'mobile' ? (
                        <Smartphone className="w-10 h-10 mx-auto mb-3 text-accent" />
                      ) : (
                        <Monitor className="w-10 h-10 mx-auto mb-3 text-accent" />
                      )}
                      <p className="text-lg font-bold capitalize">{device.name}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{device.events.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-muted-foreground">eventos</p>
                      <p className="text-xl font-bold text-green-500 mt-2">{device.conversions}</p>
                      <p className="text-sm text-muted-foreground">conversões ({device.conversionRate}%)</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Region Tab */}
          <TabsContent value="region" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Por País
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byCountry} title="País" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Por Estado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byRegion} title="Estado" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Por Cidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byCity} title="Cidade" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Source Tab */}
          <TabsContent value="source" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Performance por Fonte (UTM Source)</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.bySource} title="Fonte" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Performance por Campanha</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byCampaign} title="Campanha" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
