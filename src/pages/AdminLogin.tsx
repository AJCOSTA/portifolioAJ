import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      setLocation('/admin/dashboard');
    } else {
      setError('Acesso negado. Senha incorreta.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
      
      <button 
        onClick={() => setLocation('/')} 
        className="absolute top-6 left-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao site
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md z-10">
        <Card className="shadow-2xl border-primary/10 bg-card/80 backdrop-blur-xl p-2 sm:p-4">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-inner">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">Área Administrativa</CardTitle>
              <CardDescription className="pt-2">Acesso restrito para gestão e métricas.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 mt-2">
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Senha de acesso"
                  className="w-full flex h-12 rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all focus:bg-background shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <p className="text-[10px] text-muted-foreground/60 text-right">Dica: admin123</p>
              </div>
              <Button type="submit" size="lg" className="w-full shadow-lg hover:shadow-primary/25 transition-all duration-300 rounded-xl font-medium">
                Acessar Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
