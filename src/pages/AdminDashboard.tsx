import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Eye, ArrowLeft, LogOut, Clock, Smartphone, LayoutDashboard, Settings, Activity, Globe, ChevronRight, Monitor } from 'lucide-react';
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

    const fetchVisits = async () => {
      // Se tiver credenciais do Supabase, busca do banco em nuvem
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        try {
          // Import dinâmico do cliente para usar dentro do hook
          const { supabase } = await import('@/lib/supabase');
          const { data, error } = await supabase.from('visits').select('*').order('created_at', { ascending: true });
          
          if (!error && data) {
            // Mapping back from snake_case to VisitData format
            const mappedVisits = data.map(v => ({
              id: v.id,
              page: v.page,
              timestamp: v.created_at || v.timestamp,
              userAgent: v.user_agent,
              language: v.language,
              platform: v.platform
            }));
            setVisits(mappedVisits);
            return;
          }
        } catch (e) {
          console.error("Erro ao buscar Supabase:", e);
        }
      }
      
      // Fallback: LocalStorage
      const stored = localStorage.getItem('portfolio_visits_log');
      if (stored) {
        try {
          setVisits(JSON.parse(stored));
        } catch (e) {}
      }
    };

    fetchVisits();
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
      
      {/* Sidebar - Desktop - Ultra Premium SaaS Style */}
      <aside className="w-72 hidden md:flex flex-col border-r border-white/5 bg-[#030712]/80 backdrop-blur-2xl shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)] z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5 relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white">Admin<span className="text-muted-foreground font-medium ml-0.5">Flow</span></span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
          <div className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-3 px-4">Navegação Principal</div>
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} />
          <NavItem icon={Globe} label="Tráfego" active={activeTab === 'Tráfego'} />
          <NavItem icon={Users} label="Audiência" active={activeTab === 'Audiência'} />
          
          <div className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-3 px-4 mt-8">Sistema</div>
          <NavItem icon={Settings} label="Ajustes" active={activeTab === 'Ajustes'} />
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:shadow-[0_0_20px_-5px_rgba(248,113,113,0.3)] transition-all duration-300 border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Desconectar
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
            {activeTab === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
                  <p className="text-muted-foreground mt-1 text-sm">Resumo consolidado do desempenho do seu portfólio.</p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/30 transition-all duration-300 shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Visitas Totais</CardTitle>
                        <div className="p-2 bg-primary/15 rounded-xl">
                          <Eye className="w-4 h-4 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight">{totalVisits}</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-2 inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md">
                          <Activity className="w-3 h-3" /> Atualizado
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Visitantes Únicos</CardTitle>
                        <div className="p-2 bg-blue-500/15 rounded-xl">
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight">{uniqueUsers}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Dispositivos identificados</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-amber-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Proporção Mobile</CardTitle>
                        <div className="p-2 bg-amber-500/15 rounded-xl">
                          <Smartphone className="w-4 h-4 text-amber-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight">{totalVisits ? Math.round((mobileCount/totalVisits)*100) : 0}%</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">{mobileCount} acessos via celular</p>
                        <div className="w-full h-1.5 bg-secondary rounded-full mt-3 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${totalVisits ? (mobileCount/totalVisits)*100 : 0}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Último Acesso</CardTitle>
                        <div className="p-2 bg-emerald-500/15 rounded-xl">
                          <Clock className="w-4 h-4 text-emerald-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold truncate mt-1 tracking-tight">
                          {visits.length > 0 
                            ? new Date(visits[visits.length - 1].timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) 
                            : 'N/A'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium truncate">
                          {visits.length > 0 
                            ? new Date(visits[visits.length - 1].timestamp).toLocaleDateString('pt-BR') 
                            : 'Sem dados'}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Tráfego' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Análise de Tráfego</h1>
                  <p className="text-muted-foreground mt-1 text-sm">Volume de visualizações de página na última quinzena</p>
                </div>
                
                <Card className="bg-card/40 backdrop-blur-sm border-white/5 shadow-2xl overflow-hidden rounded-[24px]">
                  <CardHeader className="border-b border-border/20 bg-muted/10 pb-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold">Gráfico de Crescimento</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-xs font-semibold bg-background/50 px-4 py-2 rounded-full border border-white/10 shadow-inner">
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
                          <span className="w-2 h-2 rounded-full bg-primary relative" />
                          Tempo Real
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8">
                    {chartData.length > 0 ? (
                      <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
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
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
                              }}
                              itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
                              labelStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: '13px', marginBottom: '8px' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="Visitas" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={4}
                              fillOpacity={1} 
                              fill="url(#colorVisitas)" 
                              activeDot={{ r: 8, strokeWidth: 0, fill: "hsl(var(--primary))", style: { filter: "drop-shadow(0px 0px 5px rgba(59,130,246,0.8))"} }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/10 rounded-2xl bg-muted/5">
                        <Activity className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-semibold text-lg">Sem dados gráficos.</p>
                        <p className="text-sm mt-1">Navegue no portfólio para capturar o tráfego.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'Audiência' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Registro de Audiência</h1>
                  <p className="text-muted-foreground mt-1 text-sm">Histórico bruto detalhado das últimas visitas capturadas.</p>
                </div>
                
                <Card className="bg-card/40 backdrop-blur-sm border-white/5 shadow-2xl rounded-[24px] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/30 text-muted-foreground uppercase font-semibold text-xs tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Sessão ID</th>
                          <th className="px-6 py-4">Data / Hora</th>
                          <th className="px-6 py-4">Plataforma</th>
                          <th className="px-6 py-4">Navegador</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visits.slice().reverse().slice(0, 50).map((v, i) => (
                          <tr key={i} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{v.id}</td>
                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                              {new Date(v.timestamp).toLocaleString('pt-BR')}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${isMobile(v.userAgent) ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
                                {isMobile(v.userAgent) ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                                {isMobile(v.userAgent) ? 'Mobile' : 'Desktop'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground max-w-xs truncate" title={v.userAgent}>
                              {v.userAgent}
                            </td>
                          </tr>
                        ))}
                        {visits.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                              Nenhuma visita registrada no momento.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}
            
            {activeTab === 'Ajustes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                  <p className="text-muted-foreground mt-1 text-sm">Ajustes locais do Painel Administrativo.</p>
                </div>
                <Card className="bg-card/40 backdrop-blur-sm border-white/5 p-6 rounded-[24px]">
                   <div className="max-w-xl space-y-4">
                     <p className="text-sm leading-relaxed text-muted-foreground">
                       No momento, as configurações avançadas de integração com banco de dados em nuvem (como Supabase ou Firebase) não estão ativadas, este é um ambiente seguro que salva dados na memória do navegador.
                     </p>
                     <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed">
                       Conectar Banco de Dados PRO
                     </button>
                   </div>
                </Card>
              </motion.div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
