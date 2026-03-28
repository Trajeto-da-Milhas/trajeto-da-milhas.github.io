// Serviço de Analytics para rastreamento de vídeos
// Usa localStorage como fallback e Firebase como backend principal

export interface VideoMetrics {
  videoUrl: string;
  totalViews: number;
  completedViews: number;
  averageWatchTime: number; // em segundos
  totalWatchTime: number; // em segundos
  ctaClicks: number;
  ctr: number; // Click-through rate em %
  averageRetention: number; // em %
  lastUpdated: string;
}

export interface VideoEvent {
  videoUrl: string;
  eventType: 'play' | 'pause' | 'ended' | 'cta_click';
  timestamp: number;
  watchedSeconds?: number;
  totalDuration?: number;
}

// Chave para localStorage
const STORAGE_KEY = 'trajeto_video_analytics';

// Inicializar dados padrão
const getDefaultMetrics = (videoUrl: string): VideoMetrics => ({
  videoUrl,
  totalViews: 0,
  completedViews: 0,
  averageWatchTime: 0,
  totalWatchTime: 0,
  ctaClicks: 0,
  ctr: 0,
  averageRetention: 0,
  lastUpdated: new Date().toISOString(),
});

// Obter todas as métricas do localStorage
export const getAllMetrics = (): VideoMetrics[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter métricas:', error);
    return [];
  }
};

// Obter métricas de um vídeo específico
export const getVideoMetrics = (videoUrl: string): VideoMetrics => {
  const allMetrics = getAllMetrics();
  return allMetrics.find(m => m.videoUrl === videoUrl) || getDefaultMetrics(videoUrl);
};

// Registrar evento de play
export const trackVideoPlay = (videoUrl: string) => {
  const metrics = getVideoMetrics(videoUrl);
  metrics.totalViews += 1;
  metrics.lastUpdated = new Date().toISOString();
  saveMetrics(metrics);
};

// Registrar evento de conclusão (vídeo assistido até o final)
export const trackVideoCompleted = (videoUrl: string, watchedSeconds: number, totalDuration: number) => {
  const metrics = getVideoMetrics(videoUrl);
  
  metrics.completedViews += 1;
  metrics.totalWatchTime += watchedSeconds;
  metrics.averageWatchTime = Math.round(metrics.totalWatchTime / metrics.totalViews);
  
  // Calcular retenção média (porcentagem do vídeo assistida)
  const retention = (watchedSeconds / totalDuration) * 100;
  if (metrics.averageRetention === 0) {
    metrics.averageRetention = retention;
  } else {
    metrics.averageRetention = (metrics.averageRetention + retention) / 2;
  }
  
  metrics.lastUpdated = new Date().toISOString();
  saveMetrics(metrics);
};

// Registrar clique no CTA
export const trackCTAClick = (videoUrl: string) => {
  const metrics = getVideoMetrics(videoUrl);
  metrics.ctaClicks += 1;
  
  // Calcular CTR (Click-Through Rate)
  if (metrics.totalViews > 0) {
    metrics.ctr = (metrics.ctaClicks / metrics.totalViews) * 100;
  }
  
  metrics.lastUpdated = new Date().toISOString();
  saveMetrics(metrics);
};

// Salvar métricas no localStorage
const saveMetrics = (metrics: VideoMetrics) => {
  try {
    const allMetrics = getAllMetrics();
    const index = allMetrics.findIndex(m => m.videoUrl === metrics.videoUrl);
    
    if (index >= 0) {
      allMetrics[index] = metrics;
    } else {
      allMetrics.push(metrics);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allMetrics));
  } catch (error) {
    console.error('Erro ao salvar métricas:', error);
  }
};

// Limpar métricas (para testes)
export const clearMetrics = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Gerar dados simulados para demonstração
export const generateDemoMetrics = (videoUrl: string) => {
  const metrics = getDefaultMetrics(videoUrl);
  metrics.totalViews = Math.floor(Math.random() * 15000) + 5000;
  metrics.completedViews = Math.floor(metrics.totalViews * 0.68);
  metrics.averageWatchTime = Math.floor(Math.random() * 180) + 120; // 2-5 minutos
  metrics.totalWatchTime = metrics.averageWatchTime * metrics.totalViews;
  metrics.ctaClicks = Math.floor(metrics.totalViews * (Math.random() * 0.1 + 0.05)); // 5-15%
  metrics.ctr = (metrics.ctaClicks / metrics.totalViews) * 100;
  metrics.averageRetention = Math.random() * 40 + 50; // 50-90%
  metrics.lastUpdated = new Date().toISOString();
  
  saveMetrics(metrics);
  return metrics;
};
