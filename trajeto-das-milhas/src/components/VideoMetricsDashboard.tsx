import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, Play, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import {
  getVideoMetrics,
  getRetentionChartData,
  getDeviceStats,
  getConversionStats,
  VideoMetrics,
  RetentionDataPoint,
  DeviceAnalytic,
} from '../services/videoAnalytics';

interface VideoMetricsDashboardProps {
  videoUrl: string;
}

const VideoMetricsDashboard: React.FC<VideoMetricsDashboardProps> = ({ videoUrl }) => {
  const [metrics, setMetrics] = useState<VideoMetrics | null>(null);
  const [retentionData, setRetentionData] = useState<RetentionDataPoint[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceAnalytic[]>([]);
  const [conversionData, setConversionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cores para gráficos
  const COLORS = ['#00D4FF', '#7B2FFF', '#FF006E', '#FB5607', '#FFBE0B'];

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const [metricsData, retentionData, deviceData, conversionData] = await Promise.all([
          getVideoMetrics(videoUrl),
          getRetentionChartData(videoUrl),
          getDeviceStats(videoUrl),
          getConversionStats(videoUrl),
        ]);

        setMetrics(metricsData);
        setRetentionData(retentionData);
        setDeviceData(deviceData);
        setConversionData(conversionData);
      } catch (error) {
        console.error('Erro ao carregar métricas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();

    // Recarregar a cada 30 segundos
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, [videoUrl]);

  if (loading || !metrics) {
    return (
      <div className="w-full p-6 bg-[#0A1128] rounded-xl border border-[#00D4FF]/20">
        <div className="text-center text-[#8BA3C0]">Carregando métricas...</div>
      </div>
    );
  }

  // Calcular taxa de play (blur views vs play clicks)
  const playRate = metrics.blurViews > 0 
    ? ((metrics.totalViews / metrics.blurViews) * 100).toFixed(1)
    : '0';

  // Calcular taxa de conclusão
  const completionRate = metrics.totalViews > 0
    ? ((metrics.completedViews / metrics.totalViews) * 100).toFixed(1)
    : '0';

  return (
    <div className="w-full space-y-6 p-6 bg-[#0A1128] rounded-xl border border-[#00D4FF]/20">
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#00D4FF] mb-2">📊 Métricas do Vídeo</h2>
        <p className="text-[#8BA3C0] text-sm">Análise em tempo real de engajamento e conversão</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card: Visualizações Desfocadas */}
        <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#8BA3C0] text-sm font-semibold">Visualizações</span>
            <Eye className="w-5 h-5 text-[#00D4FF]" />
          </div>
          <div className="text-3xl font-bold text-[#00D4FF]">{metrics.blurViews}</div>
          <p className="text-[#8BA3C0] text-xs mt-1">Pessoas que viram o vídeo desfocado</p>
        </div>

        {/* Card: Cliques no Play */}
        <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#8BA3C0] text-sm font-semibold">Play Clicks</span>
            <Play className="w-5 h-5 text-[#7B2FFF]" />
          </div>
          <div className="text-3xl font-bold text-[#7B2FFF]">{metrics.totalViews}</div>
          <p className="text-[#8BA3C0] text-xs mt-1">Taxa de Play: <span className="text-[#00D4FF] font-bold">{playRate}%</span></p>
        </div>

        {/* Card: Conclusões */}
        <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#8BA3C0] text-sm font-semibold">Conclusões</span>
            <CheckCircle className="w-5 h-5 text-[#00FF88]" />
          </div>
          <div className="text-3xl font-bold text-[#00FF88]">{metrics.completedViews}</div>
          <p className="text-[#8BA3C0] text-xs mt-1">Taxa de Conclusão: <span className="text-[#00D4FF] font-bold">{completionRate}%</span></p>
        </div>

        {/* Card: Cliques no CTA */}
        <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#8BA3C0] text-sm font-semibold">CTA Clicks</span>
            <Zap className="w-5 h-5 text-[#FFBE0B]" />
          </div>
          <div className="text-3xl font-bold text-[#FFBE0B]">{metrics.ctaClicks}</div>
          <p className="text-[#8BA3C0] text-xs mt-1">CTR: <span className="text-[#00D4FF] font-bold">{metrics.ctr.toFixed(2)}%</span></p>
        </div>
      </div>

      {/* Gráfico de Retenção */}
      {retentionData.length > 0 && (
        <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20">
          <h3 className="text-lg font-bold text-[#00D4FF] mb-4">📈 Gráfico de Retenção</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00D4FF20" />
              <XAxis 
                dataKey="second_position" 
                stroke="#8BA3C0"
                label={{ value: 'Posição do Vídeo (%)', position: 'insideBottomRight', offset: -5 }}
              />
              <YAxis 
                stroke="#8BA3C0"
                label={{ value: 'Espectadores', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #00D4FF' }}
                labelStyle={{ color: '#00D4FF' }}
              />
              <Line 
                type="monotone" 
                dataKey="viewer_count" 
                stroke="#00D4FF" 
                dot={{ fill: '#00D4FF', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Análise por Dispositivo */}
      {deviceData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20">
            <h3 className="text-lg font-bold text-[#00D4FF] mb-4">📱 Análise por Dispositivo</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="total_sessions"
                  nameKey="device_type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #00D4FF' }}
                  labelStyle={{ color: '#00D4FF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de Dispositivos */}
          <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20">
            <h3 className="text-lg font-bold text-[#00D4FF] mb-4">📊 Detalhes por Dispositivo</h3>
            <div className="space-y-3">
              {deviceData.map((device, index) => (
                <div key={index} className="p-3 bg-[#0A1221] rounded-lg border border-[#00D4FF]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00D4FF] font-semibold capitalize">{device.device_type}</span>
                    <span className="text-[#8BA3C0] text-sm">{device.total_sessions} sessões</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#8BA3C0]">Plays:</span>
                      <span className="text-[#00D4FF] ml-2 font-bold">{device.play_clicks}</span>
                    </div>
                    <div>
                      <span className="text-[#8BA3C0]">Conclusões:</span>
                      <span className="text-[#00FF88] ml-2 font-bold">{device.completed_views}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#8BA3C0]">Taxa de Conclusão:</span>
                      <span className="text-[#FFBE0B] ml-2 font-bold">{device.completion_rate?.toFixed(1) || '0'}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas Gerais */}
      <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00D4FF]/20">
        <h3 className="text-lg font-bold text-[#00D4FF] mb-4">⏱️ Estatísticas Gerais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-[#8BA3C0] text-sm">Tempo Médio Assistido</span>
            <div className="text-2xl font-bold text-[#00D4FF] mt-1">{metrics.averageWatchTime}s</div>
          </div>
          <div>
            <span className="text-[#8BA3C0] text-sm">Retenção Média</span>
            <div className="text-2xl font-bold text-[#7B2FFF] mt-1">{metrics.averageRetention.toFixed(1)}%</div>
          </div>
          <div>
            <span className="text-[#8BA3C0] text-sm">Taxa de Conversão (CTR)</span>
            <div className="text-2xl font-bold text-[#FFBE0B] mt-1">{metrics.ctr.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      {/* Última Atualização */}
      <div className="text-xs text-[#8BA3C0] text-center">
        Última atualização: {new Date(metrics.lastUpdated).toLocaleTimeString('pt-BR')}
      </div>
    </div>
  );
};

export default VideoMetricsDashboard;
