import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Criar cliente com configurações de timeout e retry
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  db: {
    schema: 'public',
  },
});

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

// Registrar evento de vídeo no Supabase (com tratamento silencioso de erros)
export const trackVideoEvent = async (event: VideoEvent) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  
  try {
    const { data, error } = await supabase
      .from('video_events')
      .insert([
        {
          ...event,
          user_session_id: event.user_session_id || getSessionId(),
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      // Log silencioso - não mostra erro ao usuário
      console.debug('Analytics: Evento não registrado (conexão indisponível)', error.message);
      return null;
    }

    return data;
  } catch (err) {
    // Falha silenciosa - não interrompe a experiência do usuário
    console.debug('Analytics: Erro de conexão (esperado em algumas situações)', err);
    return null;
  }
};

// Obter métricas agregadas de um vídeo (com fallback seguro)
export const getVideoMetrics = async (videoUrl: string) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    // Total de visualizações (plays)
    const { count: totalViews, error: error1 } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'play');

    if (error1) throw error1;

    // Total de conclusões (ended)
    const { count: completedViews, error: error2 } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'ended');

    if (error2) throw error2;

    // Total de cliques no CTA
    const { count: ctaClicks, error: error3 } = await supabase
      .from('video_events')
      .select('*', { count: 'exact', head: true })
      .eq('video_url', videoUrl)
      .eq('event_type', 'cta_click');

    if (error3) throw error3;

    // Calcular tempo médio assistido
    const { data: watchedData, error: error4 } = await supabase
      .from('video_events')
      .select('watched_seconds, total_duration')
      .eq('video_url', videoUrl)
      .eq('event_type', 'ended');

    if (error4) throw error4;

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
    // Retorna zero em vez de erro - garante que o painel não quebra
    console.debug('Analytics: Métricas indisponíveis (conexão com banco de dados)', err);
    return null;
  }
};

// Monitorar mudanças em tempo real (Sintaxe correta Supabase v2)
export const subscribeToVideoEvents = (videoUrl: string, callback: (payload: any) => void) => {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const channel = supabase
      .channel('video-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_events',
          filter: `video_url=eq.${videoUrl}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Analytics: Monitoramento em tempo real ativo');
        } else if (status === 'CHANNEL_ERROR') {
          console.debug('Analytics: Monitoramento em tempo real indisponível (esperado)');
        }
      });

    return channel;
  } catch (err) {
    console.debug('Analytics: Não foi possível ativar monitoramento em tempo real', err);
    return null;
  }
};
