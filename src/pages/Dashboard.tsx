import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
  Loader2,
  LogOut,
  Lock
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
  engagement: {
    vslPlayRate: string;
    vslRetention15s: string;
    vslRetention30s: string;
    vslToCTARate: string;
    avgEventsPerVisitor: string;
    bounceRate: string;
    visitorsWithVSLStart: number;
    visitorsWith15s: number;
    visitorsWith30s: number;
    visitorsWithCTA: number;
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

// Password is validated server-side via Edge Function
// Session token stored securely after server validation (no plaintext passwords)

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  
  // Store session token (not password) for subsequent requests
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Check if already authenticated (token stored in session)
  useEffect(() => {
    const storedSession = sessionStorage.getItem('dashboard_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        // Check if session is still valid
        if (session.expires && Date.now() < session.expires) {
          setSessionToken(session.token);
          setIsAuthenticated(true);
        } else {
          // Session expired, clear it
          sessionStorage.removeItem('dashboard_session');
        }
      } catch {
        sessionStorage.removeItem('dashboard_session');
      }
    }
  }, []);

  // Server-side password validation with token exchange
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    
    try {
      // Validate password on server and receive session token
      const { data: response, error: fetchError } = await supabase.functions.invoke('dashboard-events', {
        body: { password },
        method: 'POST',
      });

      if (fetchError) {
        // Check if it's an auth error
        if (fetchError.message?.includes('401') || fetchError.message?.includes('Unauthorized')) {
          setAuthError('Senha incorreta');
        } else {
          setAuthError('Erro ao validar senha. Tente novamente.');
        }
        return;
      }

      // Store session token (not password) after successful validation
      if (response?.sessionToken && response?.sessionExpires) {
        const sessionData = {
          token: response.sessionToken,
          expires: response.sessionExpires
        };
        sessionStorage.setItem('dashboard_session', JSON.stringify(sessionData));
        setSessionToken(response.sessionToken);
      }
      
      setIsAuthenticated(true);
      setData(response); // Use the data from the login request
      setPassword(''); // Clear password from state immediately
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.code === 'UNAUTHORIZED' || err?.message?.includes('Unauthorized')) {
        setAuthError('Senha incorreta');
      } else {
        setAuthError('Erro ao conectar. Tente novamente.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_session');
    setSessionToken(null);
    setIsAuthenticated(false);
    setPassword('');
    setData(null);
  };

  const fetchData = async () => {
    if (!sessionToken) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data: response, error: fetchError } = await supabase.functions.invoke('dashboard-events', {
        headers: { 'x-dashboard-token': sessionToken },
        method: 'POST',
        body: {},
      });

      if (fetchError) {
        // If session expired, force logout
        if (fetchError.message?.includes('401') || fetchError.message?.includes('SESSION_EXPIRED')) {
          handleLogout();
          return;
        }
        throw fetchError;
      }
      setData(response);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && sessionToken && !data) {
      fetchData();
    }
  }, [isAuthenticated, sessionToken]);
  
  // Refetch when days change
  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      fetchData();
    }
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

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-2xl">Dashboard Protegido</CardTitle>
            <p className="text-muted-foreground text-sm">Digite a senha para acessar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
                disabled={isLoggingIn}
              />
              {authError && (
                <p className="text-destructive text-sm text-center">{authError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validando...
                  </>
                ) : (
                  'Acessar Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
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
              Atualizado: {new Date(data.lastUpdated).toLocaleString('pt-BR')}
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
            <Button variant="outline" size="sm" onClick={handleLogout}>
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
        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
            <TabsTrigger value="funnel">Funil</TabsTrigger>
            <TabsTrigger value="platform">Plataforma</TabsTrigger>
            <TabsTrigger value="placement">Posicionamento</TabsTrigger>
            <TabsTrigger value="device">Dispositivo</TabsTrigger>
            <TabsTrigger value="region">Região</TabsTrigger>
            <TabsTrigger value="source">Origem</TabsTrigger>
          </TabsList>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Taxa de Play VSL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {data.engagement?.vslPlayRate || '0.0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.engagement?.visitorsWithVSLStart || 0} de {data.overview.uniqueVisitors} visitantes
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Retenção 15s
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {data.engagement?.vslRetention15s || '0.0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.engagement?.visitorsWith15s || 0} assistiram 15s+
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Retenção 30s
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {data.engagement?.vslRetention30s || '0.0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.engagement?.visitorsWith30s || 0} assistiram 30s+
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <MousePointer className="w-4 h-4" />
                    VSL → CTA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    {data.engagement?.vslToCTARate || '0.0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.engagement?.visitorsWithCTA || 0} clicaram no CTA
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Métricas de Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Eventos por Visitante</span>
                    <span className="text-lg font-bold text-foreground">
                      {data.engagement?.avgEventsPerVisitor || '0.0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Taxa de Bounce</span>
                    <span className={`text-lg font-bold ${parseFloat(data.engagement?.bounceRate || '0') > 50 ? 'text-red-500' : 'text-green-500'}`}>
                      {data.engagement?.bounceRate || '0.0'}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Média Diária de Eventos</span>
                    <span className="text-lg font-bold text-foreground">
                      {data.performance.avgDailyEvents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Média Diária de Conversões</span>
                    <span className="text-lg font-bold text-green-500">
                      {data.performance.avgDailyConversions}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Funil de Retenção VSL
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Visitantes', value: data.overview.uniqueVisitors, color: 'bg-blue-500' },
                    { label: 'Iniciaram VSL', value: data.engagement?.visitorsWithVSLStart || 0, color: 'bg-purple-500' },
                    { label: 'Assistiram 15s', value: data.engagement?.visitorsWith15s || 0, color: 'bg-yellow-500' },
                    { label: 'Assistiram 30s', value: data.engagement?.visitorsWith30s || 0, color: 'bg-orange-500' },
                    { label: 'Clicaram CTA', value: data.engagement?.visitorsWithCTA || 0, color: 'bg-green-500' },
                  ].map((item, idx) => {
                    const percentage = data.overview.uniqueVisitors > 0 
                      ? ((item.value / data.overview.uniqueVisitors) * 100)
                      : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.value.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                          <span className="font-medium text-foreground">{stage.value.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% do total</span>
                          {idx > 0 && (
                            <span className="text-red-400">
                              -{data.funnel.dropoffs[Object.keys(data.funnel.dropoffs)[idx - 1]]}% dropoff
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Weekly Comparison */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendIcon trend={data.performance.trend} />
                    Comparativo Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
                        <p className="text-2xl font-bold text-foreground">{data.performance.last7Days.toLocaleString('pt-BR')}</p>
                        <p className="text-xs text-muted-foreground">eventos</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">7 dias anteriores</p>
                        <p className="text-2xl font-bold text-foreground">{data.performance.prev7Days.toLocaleString('pt-BR')}</p>
                        <p className="text-xs text-muted-foreground">eventos</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Variação de eventos</span>
                        <ChangeIndicator value={data.performance.weekOverWeekChange} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Variação de compras</span>
                        <ChangeIndicator value={data.performance.purchaseWoWChange} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Variação de receita</span>
                        <ChangeIndicator value={data.performance.valueWoWChange} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-500">{data.performance.last7Purchases}</p>
                          <p className="text-xs text-muted-foreground">Compras (7d)</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-accent">
                            R$ {data.performance.last7Value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                          </p>
                          <p className="text-xs text-muted-foreground">Receita (7d)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Eventos ao Longo do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.chartData}>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="total" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Purchase" stroke="hsl(120, 70%, 50%)" strokeWidth={2} dot={false} />
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
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={Object.entries(data.overview.eventCounts).map(([name, count]) => ({ name, count }))}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={60} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
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
                    <LayoutGrid className="w-5 h-5" />
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
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.analytics.byPlatform.slice(0, 5)}
                          dataKey="events"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {data.analytics.byPlatform.slice(0, 5).map((_, index) => (
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
                <CardTitle className="text-lg">Performance por Posicionamento</CardTitle>
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
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.analytics.byPlacement.slice(0, 8)} layout="vertical">
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="events" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Conversões por Posicionamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.analytics.byPlacement.slice(0, 8)} layout="vertical">
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="conversions" fill="hsl(120, 70%, 50%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
                    Performance por Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.byOS} title="Sistema" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Mobile vs Desktop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8">
                  {data.analytics.byDevice.slice(0, 2).map((device, idx) => (
                    <div key={device.name} className="text-center p-6 bg-muted/30 rounded-lg">
                      {idx === 0 ? <Smartphone className="w-12 h-12 mx-auto mb-4 text-accent" /> : <Monitor className="w-12 h-12 mx-auto mb-4 text-accent" />}
                      <p className="text-xl font-bold text-foreground capitalize">{device.name}</p>
                      <p className="text-3xl font-bold text-accent mt-2">{device.events.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-muted-foreground">eventos</p>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-lg font-medium text-green-500">{device.conversions} conversões</p>
                        <p className="text-sm text-muted-foreground">Taxa: {device.conversionRate}%</p>
                      </div>
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
                  <CardTitle className="text-lg">Por Origem (UTM Source)</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable data={data.analytics.bySource} title="Origem" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Por Campanha (UTM Campaign)</CardTitle>
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