import React, { useState } from 'react';
import { Upload, Loader2, Check, AlertCircle, Video } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface VideoUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

/**
 * Componente de Upload Direto de Vídeo para Supabase Storage
 * Sem dependências externas, sem presets complicados.
 * Funciona 100% com o seu próprio banco de dados.
 */
const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess, label = "Upload de Vídeo" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('video/')) {
      setError('Por favor, selecione um arquivo de vídeo válido.');
      return;
    }

    // Validar tamanho (máx 200MB no Supabase Free Tier)
    if (file.size > 200 * 1024 * 1024) {
      setError('Vídeo muito grande. Máximo: 200MB.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      // 1. Criar um nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      // 2. Fazer upload para o Supabase Storage (Bucket 'media')
      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        
        if (uploadError.message.includes('bucket not found')) {
          setError('Erro: Bucket "media" não foi criado. Verifique o painel do Supabase.');
        } else if (uploadError.message.includes('CORS') || uploadError.message.includes('cors')) {
          setError('Erro de CORS: O navegador bloqueou o upload. Tente novamente em alguns segundos.');
        } else if (uploadError.message.includes('Payload too large')) {
          setError('Arquivo muito grande. Máximo: 200MB.');
        } else {
          setError(`Erro: ${uploadError.message}`);
        }
        setIsUploading(false);
        return;
      }

      // 3. Obter a URL pública do arquivo
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      if (publicUrl) {
        onUploadSuccess(publicUrl);
        setSuccess(true);
        setProgress(100);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Falha ao gerar link do vídeo.');
      }
    } catch (err) {
      console.error('Upload exception:', err);
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 p-4 bg-[#0A1221] border border-[#00D4FF]/10 rounded-xl">
      <div className="flex items-center gap-2 text-[#00D4FF] mb-1">
        <Video size={16} />
        <label className="text-sm font-bold uppercase tracking-wider">{label}</label>
      </div>
      
      <div className="relative">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload-input"
          disabled={isUploading}
        />
        <label
          htmlFor="video-upload-input"
          className={`flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-xl border-2 border-dashed transition-all cursor-pointer
            ${isUploading ? 'bg-gray-800/50 border-gray-700 cursor-not-allowed' : 
              success ? 'bg-green-500/10 border-green-500 text-green-500' :
              error ? 'bg-red-500/10 border-red-500 text-red-500' :
              'bg-[#0D1526] border-[#00D4FF]/20 hover:border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/5'}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <div className="text-center">
                <span className="block font-bold">Enviando Vídeo...</span>
                <span className="text-xs opacity-70">Processando arquivo ({progress}%)</span>
              </div>
            </>
          ) : success ? (
            <>
              <Check size={24} />
              <span className="font-bold">Vídeo Salvo com Sucesso!</span>
            </>
          ) : error ? (
            <>
              <AlertCircle size={24} />
              <div className="text-center px-4">
                <span className="block font-bold leading-tight">{error}</span>
                <span className="text-[10px] opacity-70 mt-1 block">Clique para tentar novamente</span>
              </div>
            </>
          ) : (
            <>
              <Upload size={24} />
              <div className="text-center">
                <span className="block font-bold">Selecione seu Vídeo</span>
                <span className="text-xs opacity-60">Máximo 200MB (MP4, WebM, MOV)</span>
              </div>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default VideoUpload;
