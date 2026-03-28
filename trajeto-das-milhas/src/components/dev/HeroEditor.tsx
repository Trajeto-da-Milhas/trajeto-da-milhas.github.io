import React from 'react';
import { useDraft } from './AdminPanel';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import { Play, Link, Award } from 'lucide-react';

const HeroEditor: React.FC = () => {
  const { draft, updateDraft } = useDraft();
  const { hero } = draft;

  const handleChange = (field: string, value: any) => {
    updateDraft({
      ...draft,
      hero: { ...hero, [field]: value }
    });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    handleChange('stats', newStats);
  };

  return (
    <EditorSection 
      title="Hero" 
      description="A primeira impressão do seu site. Configure o título, vídeo e CTA principal."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField 
          label="Badge (Texto Pequeno)" 
          value={hero.badge} 
          onChange={(val) => handleChange('badge', val)}
          placeholder="Ex: 🔥 Vagas Limitadas"
        />
        <InputField 
          label="Texto do Botão (CTA)" 
          value={hero.ctaText} 
          onChange={(val) => handleChange('ctaText', val)}
          placeholder="Ex: Entrar no Grupo VIP"
        />
      </div>

      <TextAreaField 
        label="Título Principal" 
        value={hero.title} 
        onChange={(val) => handleChange('title', val)}
        placeholder="O título de impacto da sua página"
      />

      <TextAreaField 
        label="Título Principal (Mobile)" 
        value={hero.titleMobile || hero.title} 
        onChange={(val) => handleChange('titleMobile', val)}
        placeholder="Título otimizado para dispositivos móveis (deixe em branco para usar o título principal)"
      />

      <TextAreaField 
        label="Subtítulo" 
        value={hero.subtitle} 
        onChange={(val) => handleChange('subtitle', val)}
        placeholder="Uma breve descrição persuasiva"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField 
          label="URL do Vídeo (YouTube Embed)" 
          value={hero.videoUrl} 
          onChange={(val) => handleChange('videoUrl', val)}
          placeholder="https://www.youtube.com/embed/..."
          icon={<Play size={14} />}
          preview={
            <iframe 
              src={hero.videoUrl} 
              className="w-full h-full" 
              title="Preview"
            />
          }
        />
        <InputField 
          label="Link do Botão (CTA)" 
          value={hero.ctaLink} 
          onChange={(val) => handleChange('ctaLink', val)}
          placeholder="#pricing"
          icon={<Link size={14} />}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00D4FF] font-bold">
          <Award size={14} /> ESTATÍSTICAS (STATS)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hero.stats.map((stat, index) => (
            <div key={index} className="p-4 bg-[#0D1526] border border-white/5 rounded-xl space-y-4">
              <InputField 
                label={`Valor ${index + 1}`} 
                value={stat.value} 
                onChange={(val) => handleStatChange(index, 'value', val)}
                placeholder="Ex: 10.000+"
              />
              <InputField 
                label={`Rótulo ${index + 1}`} 
                value={stat.label} 
                onChange={(val) => handleStatChange(index, 'label', val)}
                placeholder="Ex: Membros"
              />
            </div>
          ))}
        </div>
      </div>
    </EditorSection>
  );
};

export default HeroEditor;
