import { useEffect } from 'react';

const VISITS_KEY = 'portfolio_visits_log';

export interface VisitData {
  id: string;
  page: string;
  timestamp: string;
  userAgent: string;
  language: string;
  platform: string;
}

export const useVisitorTracking = (pagePath: string) => {
  useEffect(() => {
    // Evita contar a mesma view múltiplas vezes num reload imediato
    const lastTrackTimestamp = sessionStorage.getItem(`lastTrack_${pagePath}`);
    const now = Date.now();
    
    if (lastTrackTimestamp && now - parseInt(lastTrackTimestamp) < 10000) {
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

    const storedVisitsStr = localStorage.getItem(VISITS_KEY) || '[]';
    try {
      const storedVisits: VisitData[] = JSON.parse(storedVisitsStr);
      storedVisits.push(newVisit);
      // Mantém apenas as últimas 1000 visitas para não estourar o limite local
      if (storedVisits.length > 1000) {
        storedVisits.shift();
      }
      localStorage.setItem(VISITS_KEY, JSON.stringify(storedVisits));
    } catch (e) {
      console.error('Erro ao salvar tracking de visita:', e);
    }
  }, [pagePath]);
};
