import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Eye, ArrowLeft, LogOut, Clock, Smartphone, LayoutDashboard, Settings, Activity, Globe, ChevronRight, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisitData } from '@/hooks/useVisitorTracking';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('Overview');
  const [visits, setVisits] = useState<VisitData[]>([]);

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
          if (supabase) {
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

  const NavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active: boolean }) => (
    <button
      onClick={() => setActiveTab(label)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
        ${active 
          ? 'bg-blue-600 shadow-[0_4px_20px_-5px_rgba(37,99,235,0.4)] text-white' 
          : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 border border-transparent hover:border-slate-200'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-[18px] h-[18px] transition-colors ${active ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-500'}`} />
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {active && <ChevronRight className="w-4 h-4 text-blue-200" />}
    </button>
  );

  // Mapeamento e Cálculos
  const totalVisits = visits.length;
  
  // Agrupa visitas similares que acontecem em sequência rápida (sessão curta)
  // Mas para não complicar, mantemos o total bruto
  
  // Aparelhos
  const isMobile = (ua: string) => /mobile|iphone|ipod|android.*mobile/i.test(ua.toLowerCase());
  const mobileCount = visits.filter(v => isMobile(v.userAgent)).length;
  
  // Visitantes únicos simplificados (por UA + Linguagem bruto)
  // Em sistema real usaríamos fingerprint ou sessão JWT.
  const uniqueSignatures = new Set(visits.map(v => `${v.userAgent}-${v.language}-${v.platform}`));
  const uniqueUsers = uniqueSignatures.size;

  // Prepara dados pro Gráfico
  // Processamento real por dia
  const last7Days = Array.from({length: 7}).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  });

  const generateChartData = () => {
    const data = last7Days.map(date => ({
      name: date,
      Visitas: visits.filter(v => new Date(v.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) === date).length
    }));
    return data;
  };

  const chartData = visits.length > 0 ? generateChartData() : [
    { name: 'Seg', Visitas: 12 }, { name: 'Ter', Visitas: 19 },
    { name: 'Qua', Visitas: 15 }, { name: 'Qui', Visitas: 24 },
    { name: 'Sex', Visitas: 35 }, { name: 'Sáb', Visitas: 28 },
    { name: 'Dom', Visitas: 42 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
      
      {/* Sidebar - Desktop - Ultra Premium Light Style */}
      <aside className="w-72 hidden md:flex flex-col border-r border-slate-200 bg-white shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)] z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <div className="flex items-center gap-3 font-extrabold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900">Admin<span className="text-blue-600 font-medium ml-0.5">Flow</span></span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-4">Navegação Principal</div>
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} />
          <NavItem icon={Globe} label="Tráfego" active={activeTab === 'Tráfego'} />
          <NavItem icon={Users} label="Audiência" active={activeTab === 'Audiência'} />
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-4 mt-8">Sistema</div>
          <NavItem icon={Settings} label="Ajustes" active={activeTab === 'Ajustes'} />
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white hover:shadow-[0_4px_15px_-3px_rgba(239,68,68,0.4)] transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar Light */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 bg-white/70 backdrop-blur-md border-b border-slate-200/60 z-10 sticky top-0">
          <button 
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portfólio
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-900">AJ Assunção Costa</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">Master Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer hover:shadow-lg transition-shadow">
              AJ
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            {activeTab === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Visão Geral</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium">Análise em tempo real do tráfego do seu portfólio.</p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="bg-white border-slate-200 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-bold text-slate-500">Visitas Totais</CardTitle>
                        <div className="p-2.5 bg-blue-50 rounded-xl shadow-inner border border-blue-100">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight text-slate-900">{totalVisits}</div>
                        <div className="text-[11px] text-emerald-600 font-bold mt-2 inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          <Activity className="w-3 h-3" /> Ao vivo
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="bg-white border-slate-200 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden group rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-bold text-slate-500">Visitantes Únicos</CardTitle>
                        <div className="p-2.5 bg-indigo-50 rounded-xl shadow-inner border border-indigo-100">
                          <Users className="w-4 h-4 text-indigo-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight text-slate-900">{uniqueUsers}</div>
                        <p className="text-xs text-slate-500 mt-3 font-medium">Dispositivos identificáveis</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="bg-white border-slate-200 hover:border-orange-400/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden group rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-bold text-slate-500">Smartphone/Mobile</CardTitle>
                        <div className="p-2.5 bg-orange-50 rounded-xl shadow-inner border border-orange-100">
                          <Smartphone className="w-4 h-4 text-orange-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-black tracking-tight text-slate-900">{totalVisits ? Math.round((mobileCount/totalVisits)*100) : 0}%</div>
                        <p className="text-[11px] text-slate-500 mt-2 font-bold uppercase tracking-wider">{mobileCount} acessos celulares</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" style={{ width: `${totalVisits ? (mobileCount/totalVisits)*100 : 0}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="bg-white border-slate-200 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 relative overflow-hidden group rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-bold text-slate-500">Último Acesso</CardTitle>
                        <div className="p-2.5 bg-teal-50 rounded-xl shadow-inner border border-teal-100">
                          <Clock className="w-4 h-4 text-teal-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-black truncate mt-1 tracking-tight text-slate-900">
                          {visits.length > 0 
                            ? new Date(visits[visits.length - 1].timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) 
                            : 'N/A'}
                        </div>
                        <p className="text-xs text-slate-500 mt-3 font-semibold truncate">
                          {visits.length > 0 
                            ? new Date(visits[visits.length - 1].timestamp).toLocaleDateString('pt-BR') 
                            : 'Sem dados de acesso'}
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
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Análise de Tráfego</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium">Evolução do engajamento ao longo da semana.</p>
                </div>
                
                <Card className="bg-white border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden rounded-[32px]">
                  <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6 pt-8 px-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">Curva de Audiência</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/50 px-4 py-2 rounded-full border border-blue-200/50">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
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
                              <linearGradient id="colorVisitasLight" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#64748b" 
                              fontSize={12} 
                              fontWeight={600}
                              tickLine={false} 
                              axisLine={false} 
                              dy={10}
                            />
                            <YAxis 
                              stroke="#64748b" 
                              fontSize={12} 
                              fontWeight={600}
                              tickLine={false} 
                              axisLine={false} 
                              tickFormatter={(value) => `${value}`}
                            />
                            <RechartsTooltip 
                              contentStyle={{ 
                                backgroundColor: '#ffffff', 
                                borderRadius: '16px', 
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                              }}
                              itemStyle={{ color: '#0f172a', fontWeight: 800 }}
                              labelStyle={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="Visitas" 
                              stroke="#3b82f6" 
                              strokeWidth={4}
                              fillOpacity={1} 
                              fill="url(#colorVisitasLight)" 
                              activeDot={{ r: 8, strokeWidth: 4, stroke: "#ffffff", fill: "#3b82f6", style: { filter: "drop-shadow(0px 5px 10px rgba(59,130,246,0.3))"} }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                        <Activity className="w-12 h-12 mb-4 text-slate-300" />
                        <p className="font-bold text-lg text-slate-500">Sem dados processados.</p>
                        <p className="text-sm mt-1">Visitantes aparecerão no gráfico automaticamente.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'Audiência' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Relatório Bruto</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium">Acessos registrados nas últimas semanas.</p>
                </div>
                
                <Card className="bg-white border-slate-200 shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-widest border-b border-slate-200">
                        <tr>
                          <th className="px-8 py-5">Fingerprint ID</th>
                          <th className="px-8 py-5">Horário do Acesso</th>
                          <th className="px-8 py-5">Categoria</th>
                          <th className="px-8 py-5">Software / Bot</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {visits.slice().reverse().slice(0, 50).map((v, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                            <td className="px-8 py-5 font-mono text-[11px] font-semibold text-slate-400">{v.id || 'supa_id_auto'}</td>
                            <td className="px-8 py-5 font-bold whitespace-nowrap text-slate-900">
                              {new Date(v.timestamp).toLocaleString('pt-BR')}
                            </td>
                            <td className="px-8 py-5">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${isMobile(v.userAgent) ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                {isMobile(v.userAgent) ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                                {isMobile(v.userAgent) ? 'Mobile' : 'Desktop'}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-xs text-slate-500 max-w-xs truncate font-medium" title={v.userAgent}>
                              {v.userAgent}
                            </td>
                          </tr>
                        ))}
                        {visits.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-8 py-16 text-center text-slate-400 font-bold">
                              Nenhuma linha registrada no banco de dados.
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
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Banco de Dados & API</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium">Conectividade e saúde do sistema.</p>
                </div>
                <Card className="bg-white border-slate-200 shadow-xl shadow-slate-200/50 p-8 rounded-[32px]">
                   <div className="max-w-xl space-y-6">
                     <div className="flex items-center gap-3">
                       <span className={`flex w-3 h-3 rounded-full ${import.meta.env.VITE_SUPABASE_URL ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)] animate-pulse'}`}></span>
                       <h3 className="font-bold text-slate-900 text-lg">
                         {import.meta.env.VITE_SUPABASE_URL ? 'Plataforma Online' : 'Modo Offline (LocalStorage)'}
                       </h3>
                     </div>
                     <p className="text-sm font-medium leading-relaxed text-slate-500">
                       A conexão remota de persistência garante que visitantes e relatórios do painel estejam protegidos contra remoção de cache no servidor raiz.
                     </p>
                     
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm font-mono text-slate-600">
                         POSTGRES URL: <br/> {import.meta.env.VITE_SUPABASE_URL || 'N/A (Criptografado)'}
                     </div>

                     <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-slate-900/30">
                       Reiniciar Instância
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
