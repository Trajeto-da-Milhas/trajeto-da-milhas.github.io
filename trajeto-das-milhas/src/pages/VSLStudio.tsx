import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, BarChart3, Video, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoMetricsDashboard from '../components/VideoMetricsDashboard';
import { useContent } from '../context/ContentContext';

const VSLStudio: React.FC = () => {
  const { content } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'player' | 'metrics' | 'upload'>('player');
  const [videoUrl, setVideoUrl] = useState(content.hero.videoUrl);

  // Sincronizar videoUrl quando o conteudo muda
  useEffect(() => {
    if (content.hero.videoUrl) {
      setVideoUrl(content.hero.videoUrl);
    }
  }, [content.hero.videoUrl]);

  return (
    <div className="min-h-screen bg-[#0A1128] text-white">
      {/* Header */}
      <div className="border-b border-[#00D4FF]/20 bg-[#050A14] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dev')}
                className="p-2 hover:bg-[#00D4FF]/10 rounded-lg transition-colors text-[#8BA3C0] hover:text-[#00D4FF]"
                aria-label="Voltar ao Painel Admin"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="p-2 bg-[#00D4FF]/10 rounded-lg">
                <Video className="w-6 h-6 text-[#00D4FF]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#00D4FF]">VSL Studio</h1>
                <p className="text-xs text-[#8BA3C0]">Modo Desenvolvimento - Ferramentas de VSL</p>
              </div>
            </div>
            <div className="text-xs text-[#8BA3C0] bg-[#0D1526] px-3 py-1 rounded-full">
              DEV MODE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#00D4FF]/20 bg-[#0A1128]/50 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('player')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all ${
                activeTab === 'player'
                  ? 'border-[#00D4FF] text-[#00D4FF]'
                  : 'border-transparent text-[#8BA3C0] hover:text-[#00D4FF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Player de Teste
              </div>
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all ${
                activeTab === 'metrics'
                  ? 'border-[#00D4FF] text-[#00D4FF]'
                  : 'border-transparent text-[#8BA3C0] hover:text-[#00D4FF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard de Métricas
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all ${
                activeTab === 'upload'
                  ? 'border-[#00D4FF] text-[#00D4FF]'
                  : 'border-transparent text-[#8BA3C0] hover:text-[#00D4FF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Gerenciar Vídeo
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Player Tab */}
        {activeTab === 'player' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#00D4FF] mb-2">Player de Teste</h2>
              <p className="text-[#8BA3C0] mb-6">
                Visualize e teste o comportamento do seu vídeo VSL com todas as funcionalidades ativadas.
              </p>
            </div>

            {/* Player Container */}
            <div className="max-w-4xl mx-auto">
              <VideoPlayer src={videoUrl} title="VSL Studio Test" />
            </div>

            {/* Player Info */}
            <div className="max-w-4xl mx-auto bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 p-6">
              <h3 className="text-lg font-bold text-[#00D4FF] mb-4">ℹ️ Informações do Player</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#8BA3C0]">URL do Vídeo:</span>
                  <p className="text-[#00D4FF] font-mono break-all text-xs mt-1">{videoUrl}</p>
                </div>
                <div>
                  <span className="text-[#8BA3C0]">Comportamento:</span>
                  <p className="text-[#00D4FF] mt-1">
                    Autoplay mutado com desfoque → Clique no play → Som ativado → Reinicia ao final
                  </p>
                </div>
                <div>
                  <span className="text-[#8BA3C0]">Rastreamento:</span>
                  <p className="text-[#00D4FF] mt-1">✓ Retenção segundo a segundo</p>
                </div>
                <div>
                  <span className="text-[#8BA3C0]">Controles:</span>
                  <p className="text-[#00D4FF] mt-1">Play/Pause, Mute/Unmute, Fullscreen</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#00D4FF] mb-2">Dashboard de Métricas</h2>
              <p className="text-[#8BA3C0] mb-6">
                Análise em tempo real de engajamento, retenção e conversão do seu vídeo VSL.
              </p>
            </div>

            {/* Dashboard */}
            <VideoMetricsDashboard videoUrl={videoUrl} />

            {/* Info Box */}
            <div className="bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 p-6">
              <h3 className="text-lg font-bold text-[#00D4FF] mb-4">📊 Como as Métricas Funcionam</h3>
              <ul className="space-y-3 text-sm text-[#8BA3C0]">
                <li className="flex gap-3">
                  <span className="text-[#00D4FF] font-bold">1.</span>
                  <span><strong>Visualizações:</strong> Contabiliza quantas pessoas viram o vídeo desfocado na página.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF] font-bold">2.</span>
                  <span><strong>Play Clicks:</strong> Quantas pessoas clicaram no botão central para ativar o som.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF] font-bold">3.</span>
                  <span><strong>Retenção:</strong> Gráfico mostrando em qual segundo as pessoas abandonam o vídeo.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF] font-bold">4.</span>
                  <span><strong>Conversão (CTR):</strong> Taxa de cliques no CTA em relação ao total de plays.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF] font-bold">5.</span>
                  <span><strong>Análise por Dispositivo:</strong> Entenda se seu público é Mobile ou Desktop.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#00D4FF] mb-2">Gerenciar Vídeo</h2>
              <p className="text-[#8BA3C0] mb-6">
                Faça upload de um novo vídeo ou altere a URL do vídeo atual.
              </p>
            </div>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Current Video */}
              <div className="bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 p-6">
                <h3 className="text-lg font-bold text-[#00D4FF] mb-4">Vídeo Atual</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#8BA3C0] mb-2">URL do Vídeo:</label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full bg-[#0A1128] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#00D4FF] placeholder-[#8BA3C0]/50 focus:outline-none focus:border-[#00D4FF]"
                      placeholder="https://exemplo.com/video.mp4"
                    />
                  </div>
                  <button className="w-full bg-[#00D4FF] text-[#050A14] py-3 rounded-lg font-bold hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all">
                    Atualizar URL
                  </button>
                </div>
              </div>

              {/* Upload New Video */}
              <div className="bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 p-6">
                <h3 className="text-lg font-bold text-[#00D4FF] mb-4">Fazer Upload de Novo Vídeo</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#00D4FF]/30 rounded-lg p-8 text-center hover:border-[#00D4FF]/60 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-[#00D4FF] mx-auto mb-3" />
                    <p className="text-[#8BA3C0] mb-2">Clique ou arraste um arquivo de vídeo</p>
                    <p className="text-xs text-[#8BA3C0]/50">MP4, WebM, Ogg - Máximo 500MB</p>
                  </div>
                  <p className="text-xs text-[#8BA3C0] text-center">
                    O vídeo será enviado para o Supabase e a URL será atualizada automaticamente.
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="bg-[#0D1526] rounded-lg border border-[#00D4FF]/20 p-6">
                <h3 className="text-lg font-bold text-[#00D4FF] mb-4">💡 Dicas</h3>
                <ul className="space-y-2 text-sm text-[#8BA3C0]">
                  <li>• Recomendamos vídeos entre 2-5 minutos para melhor retenção.</li>
                  <li>• Use formato MP4 para melhor compatibilidade.</li>
                  <li>• Certifique-se de que o vídeo tem áudio claro e de qualidade.</li>
                  <li>• Teste o vídeo na aba "Player de Teste" antes de publicar.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VSLStudio;
