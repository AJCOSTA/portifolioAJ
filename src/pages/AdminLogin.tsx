import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Tentativa com o Supabase Real-time
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      try {
        const { supabase } = await import('@/lib/supabase');
        if (supabase) {
          const { data, error } = await supabase
            .from('admin_config')
            .select('password')
            .limit(1);
            
          if (!error && data && data.length > 0) {
            if (data[0].password === password) {
              sessionStorage.setItem('adminAuth', 'true');
              setLocation('/admin/dashboard');
              return;
            } else {
              setError('Acesso negado. Senha não confere no Banco de Dados.');
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Erro na auth com supabase:", err);
      }
    }

    // Fallback: Se não tem Supabase App config, verifica o local
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      setLocation('/admin/dashboard');
    } else {
      setError('Acesso negado. Senha incorreta.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50 text-slate-900">
      {/* Background Decorativo Clean/Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e2e8f0,transparent_50%)] pointer-events-none" />
      <div className="absolute -left-20 top-20 w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-60" />
      <div className="absolute -right-20 bottom-20 w-72 h-72 bg-emerald-100 rounded-full blur-[100px] opacity-60" />

      <button 
        onClick={() => setLocation('/')} 
        className="absolute top-6 left-6 text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors z-10 font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao site
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md z-10">
        <Card className="shadow-2xl shadow-slate-200/50 border-white bg-white/70 backdrop-blur-xl p-2 sm:p-4 rounded-[28px]">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">Portal Administrativo</CardTitle>
              <CardDescription className="pt-2 text-slate-500 font-medium">Autentique-se de forma segura.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 mt-2">
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Sua senha secreta"
                  className="w-full flex h-14 rounded-xl border border-slate-200 bg-white px-4 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" size="lg" disabled={isLoading} className="w-full h-14 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white text-base">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar Painel'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
