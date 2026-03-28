// Serviço de Analytics com Supabase como backend
// Todos os dados são 100% REAIS e globais - SEM SIMULAÇÕES

import { trackVideoEvent, getVideoMetrics as getSupabaseMetrics, getSessionId } from './supabaseClient';

export interface VideoMetrics {
  videoUrl: string;
  totalViews: number;
  completedViews: number;
  averageWatchTime: number;
  ctaClicks: number;
  ctr: number;
  averageRetention: number;
  lastUpdated: string;
}

// Registrar evento de play REAL
export const trackVideoPlay = async (videoUrl: string) => {
  if (!videoUrl) return;
  console.log(`[Analytics] Registrando Play Real para: ${videoUrl}`);
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'play',
    user_session_id: getSessionId(),
  });
};

// Registrar evento de conclusão REAL
export const trackVideoCompleted = async (videoUrl: string, watchedSeconds: number, totalDuration: number) => {
  if (!videoUrl) return;
  console.log(`[Analytics] Registrando Conclusão Real para: ${videoUrl}`);
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'ended',
    watched_seconds: Math.round(watchedSeconds),
    total_duration: Math.round(totalDuration),
    user_session_id: getSessionId(),
  });
};

// Registrar clique no CTA REAL
export const trackCTAClick = async (videoUrl: string) => {
  if (!videoUrl) return;
  console.log(`[Analytics] Registrando Clique no CTA Real para o vídeo: ${videoUrl}`);
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'cta_click',
    user_session_id: getSessionId(),
  });
};

// Obter métricas 100% REAIS do Supabase
export const getVideoMetrics = async (videoUrl: string): Promise<VideoMetrics> => {
  if (!videoUrl) {
    return {
      videoUrl: '',
      totalViews: 0,
      completedViews: 0,
      averageWatchTime: 0,
      ctaClicks: 0,
      ctr: 0,
      averageRetention: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  const metrics = await getSupabaseMetrics(videoUrl);
  
  // Retorna apenas o que estiver no banco de dados, sem fallbacks falsos
  if (!metrics) {
    return {
      videoUrl,
      totalViews: 0,
      completedViews: 0,
      averageWatchTime: 0,
      ctaClicks: 0,
      ctr: 0,
      averageRetention: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  return metrics;
};

// Função de demo REMOVIDA para garantir integridade dos dados
export const generateDemoMetrics = async (videoUrl: string) => {
  return getVideoMetrics(videoUrl);
};
