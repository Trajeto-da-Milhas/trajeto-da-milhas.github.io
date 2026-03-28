import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de eventos
export type VideoEventType = 'play' | 'pause' | 'ended' | 'cta_click';

export interface VideoEvent {
  id?: string;
  video_url: string;
  event_type: VideoEventType;
  watched_seconds?: number;
  total_duration?: number;
  user_session_id: string;
  created_at?: string;
}

// Gerar ID de sessão único para o usuário
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('trajeto_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('trajeto_session_id', sessionId);
  }
  return sessionId;
};

// Registrar evento de vídeo no Supabase
export const trackVideoEvent = async (event: VideoEvent) => {
  try {
    const { data, error } = await supabase
      .from('video_events')
      .insert([
        {
          ...event,
          user_session_id: event.user_session_id || getSessionId(),
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) {
      console.error('Erro ao registrar evento:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Erro na conexão com Supabase:', err);
    return null;
  }
};

// Obter métricas agregadas de um vídeo
export const getVideoMetrics = async (videoUrl: string) => {
  try {
    // Total de visualizações (plays)
    const { count: totalViews } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'play');

    // Total de conclusões (ended)
    const { count: completedViews } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'ended');

    // Total de cliques no CTA
    const { count: ctaClicks } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'cta_click');

    // Calcular tempo médio assistido
    const { data: watchedData } = await supabase
      .from('video_events')
      .select('watched_seconds, total_duration')
      .eq('video_url', videoUrl)
      .eq('event_type', 'ended');

    let averageWatchTime = 0;
    let averageRetention = 0;

    if (watchedData && watchedData.length > 0) {
      const totalWatched = watchedData.reduce((sum, event) => sum + (event.watched_seconds || 0), 0);
      averageWatchTime = Math.round(totalWatched / watchedData.length);

      const retentions = watchedData.map(event => 
        ((event.watched_seconds || 0) / (event.total_duration || 1)) * 100
      );
      averageRetention = retentions.reduce((sum, r) => sum + r, 0) / retentions.length;
    }

    const ctr = totalViews && totalViews > 0 ? ((ctaClicks || 0) / totalViews) * 100 : 0;

    return {
      videoUrl,
      totalViews: totalViews || 0,
      completedViews: completedViews || 0,
      averageWatchTime,
      ctaClicks: ctaClicks || 0,
      ctr: Math.round(ctr * 10) / 10,
      averageRetention: Math.round(averageRetention),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Erro ao buscar métricas:', err);
    return null;
  }
};

// Monitorar mudanças em tempo real
export const subscribeToVideoEvents = (videoUrl: string, callback: (data: any) => void) => {
  const subscription = supabase
    .from(`video_events:video_url=eq.${videoUrl}`)
    .on('*', (payload) => {
      callback(payload);
    })
    .subscribe();

  return subscription;
};
