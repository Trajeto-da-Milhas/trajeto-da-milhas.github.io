import React from 'react';
import { useDraft } from './AdminPanel';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import EditorSection from './EditorSection';
import ImageUpload from './ImageUpload';
import { User, Image, Award, Plus, Trash2 } from 'lucide-react';

const AboutEditor: React.FC = () => {
  const { draft, updateDraft } = useDraft();
  const { about } = draft;

  const handleChange = (field: string, value: any) => {
    updateDraft({
      ...draft,
      about: { ...about, [field]: value }
    });
  };

  const handleBadgeChange = (field: string, value: string) => {
    handleChange('experienceBadge', { ...about.experienceBadge, [field]: value });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...(about.achievements || [])];
    newAchievements[index] = value;
    handleChange('achievements', newAchievements);
  };

  const addAchievement = () => {
    handleChange('achievements', [...(about.achievements || []), 'Nova Conquista']);
  };

  const removeAchievement = (index: number) => {
    handleChange('achievements', (about.achievements || []).filter((_, i) => i !== index));
  };

  return (
    <EditorSection 
      title="Quem é" 
      description="Reforce a autoridade do Anderson Nascimento contando sua trajetória e conquistas."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField 
          label="Título da Seção" 
          value={about.title} 
          onChange={(val) => handleChange('title', val)}
          placeholder="Ex: Quem é Anderson Nascimento?"
          icon={<User size={14} />}
        />
        <InputField 
          label="Subtítulo / Cargo" 
          value={about.subtitle} 
          onChange={(val) => handleChange('subtitle', val)}
          placeholder="Ex: Especialista em Milhas"
        />
      </div>

      <TextAreaField 
        label="Descrição da Trajetória" 
        value={about.description} 
        onChange={(val) => handleChange('description', val)}
        placeholder="Conte a história e autoridade do especialista"
        rows={8}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <InputField 
          label="URL da Foto de Perfil" 
          value={about.imageUrl} 
          onChange={(val) => handleChange('imageUrl', val)}
          placeholder="https://images.unsplash.com/..."
          icon={<Image size={14} />}
          preview={
            <img 
              src={about.imageUrl} 
              className="w-full h-full object-cover" 
              alt="Anderson Nascimento"
              referrerPolicy="no-referrer"
            />
          }
        />
        <div className="pb-1">
          <ImageUpload 
            label="Fazer Upload da Foto" 
            onUploadSuccess={(url) => handleChange('imageUrl', url)} 
          />
        </div>
      </div>

      {/* Experience Badge Editor */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00D4FF] font-bold">
          <Award size={14} /> SELO DE EXPERIÊNCIA (BADGE)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Valor (Ex: 10+)" 
            value={about.experienceBadge?.value || ''} 
            onChange={(val) => handleBadgeChange('value', val)}
            placeholder="10+"
          />
          <InputField 
            label="Texto (Ex: ANOS DE EXP.)" 
            value={about.experienceBadge?.label || ''} 
            onChange={(val) => handleBadgeChange('label', val)}
            placeholder="ANOS DE EXP."
          />
        </div>
      </div>

      {/* Achievements Editor */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00D4FF] font-bold">
            <Award size={14} /> LISTA DE CONQUISTAS
          </div>
          <button 
            onClick={addAchievement}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 rounded-lg hover:bg-[#00D4FF] hover:text-[#050A14] transition-all font-bold text-[10px]"
          >
            <Plus size={12} /> ADICIONAR CONQUISTA
          </button>
        </div>
        <div className="space-y-4">
          {(about.achievements || []).map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="flex-1">
                <InputField 
                  label={`Conquista ${index + 1}`} 
                  value={achievement} 
                  onChange={(val) => handleAchievementChange(index, val)}
                  placeholder="Ex: Mentor de Milhares de Alunos"
                />
              </div>
              <button 
                onClick={() => removeAchievement(index)}
                className="mt-6 p-2 text-[#8BA3C0] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </EditorSection>
  );
};

export default AboutEditor;
