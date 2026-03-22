import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Eye, ArrowLeft, LogOut, Clock, Smartphone, LayoutDashboard, Settings, Activity, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisitData } from '@/hooks/useVisitorTracking';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    // Auth Check
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      setLocation('/admin');
      return;
    }

    const stored = localStorage.getItem('portfolio_visits_log');
    if (stored) {
      try {
        setVisits(JSON.parse(stored));
      } catch (e) {}
    }
  }, [setLocation]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setLocation('/admin');
  };

  const totalVisits = visits.length;
  const uniqueUsers = new Set(visits.map(v => v.userAgent)).size;
  
  // Prepare Daily Data for Line/Area chart
  const visitsByDate = visits.reduce((acc, visit) => {
    // Format to short date
    const date = new Date(visit.timestamp).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(visitsByDate).map(date => ({
    name: date,
    Visitas: visitsByDate[date],
  })).slice(-14); // Last 14 days for a wider chart

  const isMobile = (ua: string) => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const mobileCount = visits.filter(v => isMobile(v.userAgent)).length;
  const desktopCount = totalVisits - mobileCount;

  const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button 
      onClick={() => setActiveTab(label)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
      {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <aside className="w-72 hidden md:flex flex-col border-r border-border/40 bg-card/30 backdrop-blur-xl">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            Admin<span className="text-muted-foreground font-normal">Panel</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4 mt-2">Navegação</div>
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} />
          <NavItem icon={Globe} label="Tráfego" active={activeTab === 'Tráfego'} />
          <NavItem icon={Users} label="Audiência" active={activeTab === 'Audiência'} />
          
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4 mt-8">Configurações</div>
          <NavItem icon={Settings} label="Ajustes" active={activeTab === 'Ajustes'} />
        </div>

        <div className="p-4 border-t border-border/40">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation('/')} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Portfólio
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">AJ Assunção</p>
              <p className="text-xs text-muted-foreground mt-1">Administrador</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              AJ
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Performance Geral</h1>
              <p className="text-muted-foreground mt-1 text-sm">Acompanhe as métricas de tráfego do seu portfólio em tempo real.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Visitas Totais</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalVisits}</div>
                    <div className="text-xs text-emerald-500 font-medium mt-1 inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <Activity className="w-3 h-3" /> Ao vivo
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-blue-500/30 transition-colors shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Visitantes Únicos</CardTitle>
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{uniqueUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">Dispositivos detectados</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-amber-500/30 transition-colors shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Mobile vs Desktop</CardTitle>
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Smartphone className="w-4 h-4 text-amber-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mobileCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">Acessos via celular</p>
                    {/* Small progress bar */}
                    <div className="w-full h-1.5 bg-secondary rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${totalVisits ? (mobileCount/totalVisits)*100 : 0}%` }} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-emerald-500/30 transition-colors shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Último Acesso</CardTitle>
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Clock className="w-4 h-4 text-emerald-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-base font-bold truncate mt-2">
                      {visits.length > 0 
                        ? new Date(visits[visits.length - 1].timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) 
                        : 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {visits.length > 0 
                        ? new Date(visits[visits.length - 1].timestamp).toLocaleDateString('pt-BR') 
                        : 'Sem dados'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Chart Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Tráfego Recente</CardTitle>
                      <CardDescription>Volume de visualizações de página na última quinzena</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Live tracking
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {chartData.length > 0 ? (
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                          <XAxis 
                            dataKey="name" 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value) => `${value}`}
                          />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderRadius: '12px', 
                              border: '1px solid hsl(var(--border))',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                            labelStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: '13px', marginBottom: '8px' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="Visitas" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorVisitas)" 
                            activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[350px] flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border/50 rounded-2xl bg-muted/10">
                      <Activity className="w-10 h-10 mb-4 opacity-20" />
                      <p className="font-medium">Nenhum dado capturado ainda.</p>
                      <p className="text-sm mt-1">Acesse o portfólio como usuário para gerar métricas.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
