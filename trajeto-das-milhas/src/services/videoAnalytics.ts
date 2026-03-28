// Serviço de Analytics com Supabase como backend
// Todos os dados são REAIS e globais

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

// Registrar evento de play
export const trackVideoPlay = async (videoUrl: string) => {
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'play',
    user_session_id: getSessionId(),
  });
};

// Registrar evento de conclusão
export const trackVideoCompleted = async (videoUrl: string, watchedSeconds: number, totalDuration: number) => {
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'ended',
    watched_seconds: watchedSeconds,
    total_duration: totalDuration,
    user_session_id: getSessionId(),
  });
};

// Registrar clique no CTA
export const trackCTAClick = async (videoUrl: string) => {
  await trackVideoEvent({
    video_url: videoUrl,
    event_type: 'cta_click',
    user_session_id: getSessionId(),
  });
};

// Obter métricas REAIS do Supabase
export const getVideoMetrics = async (videoUrl: string): Promise<VideoMetrics | null> => {
  const metrics = await getSupabaseMetrics(videoUrl);
  
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

// Gerar dados de demonstração (REMOVIDO - só queremos dados reais!)
export const generateDemoMetrics = async (videoUrl: string) => {
  return getVideoMetrics(videoUrl);
};

// Limpar métricas (apenas para desenvolvimento)
export const clearMetrics = () => {
  console.warn('Função clearMetrics desabilitada - use o painel Supabase para gerenciar dados');
};
