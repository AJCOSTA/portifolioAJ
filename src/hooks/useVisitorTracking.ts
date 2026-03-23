import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const VISITS_KEY = 'portfolio_visits_log';

export interface VisitData {
  id?: string;
  page: string;
  timestamp: string;
  userAgent: string;
  language: string;
  platform: string;
}

export const useVisitorTracking = (pagePath: string) => {
  useEffect(() => {
    const trackVisit = async () => {
      // Evita loops / múltiplas chamadas
      const lastTrackTimestamp = sessionStorage.getItem(`lastTrack_${pagePath}`);
      const now = Date.now();
      
      // Reduces deduplication window to 2s to allow easier tracking/testing while navigating
      if (lastTrackTimestamp && now - parseInt(lastTrackTimestamp) < 2000) {
        return;
      }
      
      sessionStorage.setItem(`lastTrack_${pagePath}`, now.toString());

      const generateId = () => Math.random().toString(36).substring(2, 15);

      const newVisit: VisitData = {
        id: generateId(),
        page: pagePath,
        timestamp: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        platform: window.navigator.platform || 'Unknown'
      };

      // Tenta enviar para o Supabase (se as chaves existirem no ambiente)
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        try {
          await supabase.from('visits').insert([{
            page: newVisit.page,
            user_agent: newVisit.userAgent,
            language: newVisit.language,
            platform: newVisit.platform
          }]);
        } catch (error) {
          console.error("Erro ao enviar visita para o Supabase", error);
        }
      }

      // Tenta gravar no LocalStorage como Backup / Cache Local
      const storedVisitsStr = localStorage.getItem(VISITS_KEY) || '[]';
      try {
        const storedVisits: VisitData[] = JSON.parse(storedVisitsStr);
        storedVisits.push(newVisit);
        // Mantém as últimas 1000 visitas localmente
        if (storedVisits.length > 500) {
          storedVisits.shift();
        }
        localStorage.setItem(VISITS_KEY, JSON.stringify(storedVisits));
      } catch (e) {
        console.error('Erro local:', e);
      }
    };

    trackVisit();
  }, [pagePath]);
};
