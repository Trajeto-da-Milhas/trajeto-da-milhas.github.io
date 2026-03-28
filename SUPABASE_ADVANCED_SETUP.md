# Configuração Avançada do Supabase - Métricas Estilo VTurb/Panda Video

Este script configura um sistema de analytics de **alta precisão** com rastreamento segundo a segundo, similar ao VTurb e Panda Video.

## 🚀 Como Usar

1. Acesse seu painel do Supabase
2. Vá para **SQL Editor**
3. Cole o script abaixo e execute
4. Pronto! As métricas começarão a ser coletadas automaticamente

---

## 📋 Script SQL Completo

```sql
-- ============================================
-- TABELA 1: Eventos de Vídeo (Original Melhorada)
-- ============================================
DROP TABLE IF EXISTS video_events CASCADE;

CREATE TABLE video_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_url TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('play', 'pause', 'ended', 'cta_click', 'blur_view')),
  watched_seconds INTEGER,
  total_duration INTEGER,
  user_session_id TEXT NOT NULL,
  device_type TEXT DEFAULT 'desktop', -- 'mobile', 'tablet', 'desktop'
  browser_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_video_url ON video_events(video_url);
CREATE INDEX idx_event_type ON video_events(event_type);
CREATE INDEX idx_created_at ON video_events(created_at);
CREATE INDEX idx_session_id ON video_events(user_session_id);

-- ============================================
-- TABELA 2: Retenção Segundo a Segundo
-- ============================================
DROP TABLE IF EXISTS video_retention CASCADE;

CREATE TABLE video_retention (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_url TEXT NOT NULL,
  user_session_id TEXT NOT NULL,
  current_time FLOAT NOT NULL, -- Tempo do vídeo em segundos (ex: 15.5)
  total_duration INTEGER,
  device_type TEXT DEFAULT 'desktop',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_retention_video_url ON video_retention(video_url);
CREATE INDEX idx_retention_session_id ON video_retention(user_session_id);
CREATE INDEX idx_retention_current_time ON video_retention(current_time);

-- ============================================
-- TABELA 3: Sessões de Usuário
-- ============================================
DROP TABLE IF EXISTS user_sessions CASCADE;

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  video_url TEXT NOT NULL,
  device_type TEXT DEFAULT 'desktop',
  browser_info TEXT,
  blur_view_count INTEGER DEFAULT 0, -- Quantas vezes viu o vídeo desfocado
  play_count INTEGER DEFAULT 0, -- Quantas vezes clicou no play
  total_watch_time INTEGER DEFAULT 0, -- Total de segundos assistidos
  cta_clicked BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_session_id ON user_sessions(session_id);
CREATE INDEX idx_session_video_url ON user_sessions(video_url);

-- ============================================
-- TABELA 4: Agregações de Retenção (Para Gráficos)
-- ============================================
DROP TABLE IF EXISTS video_retention_aggregated CASCADE;

CREATE TABLE video_retention_aggregated (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_url TEXT NOT NULL,
  second_position FLOAT NOT NULL, -- Posição do vídeo (0-100%)
  viewer_count INTEGER DEFAULT 0, -- Quantas pessoas assistiram até este segundo
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(video_url, second_position)
);

CREATE INDEX idx_agg_video_url ON video_retention_aggregated(video_url);

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE video_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_retention ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_retention_aggregated ENABLE ROW LEVEL SECURITY;

-- Permitir inserções públicas (qualquer pessoa pode registrar eventos)
CREATE POLICY "Allow public inserts on video_events" ON video_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads on video_events" ON video_events
  FOR SELECT USING (true);

CREATE POLICY "Allow public inserts on video_retention" ON video_retention
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads on video_retention" ON video_retention
  FOR SELECT USING (true);

CREATE POLICY "Allow public inserts on user_sessions" ON user_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads on user_sessions" ON user_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public reads on video_retention_aggregated" ON video_retention_aggregated
  FOR SELECT USING (true);

-- ============================================
-- FUNÇÕES SQL PARA CÁLCULOS AUTOMÁTICOS
-- ============================================

-- Função para atualizar agregações de retenção
CREATE OR REPLACE FUNCTION update_retention_aggregated()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO video_retention_aggregated (video_url, second_position, viewer_count)
  SELECT 
    NEW.video_url,
    ROUND(NEW.current_time / NULLIF(NEW.total_duration, 0) * 100, 1),
    COUNT(DISTINCT user_session_id)
  FROM video_retention
  WHERE video_url = NEW.video_url
  GROUP BY video_url, ROUND(NEW.current_time / NULLIF(NEW.total_duration, 0) * 100, 1)
  ON CONFLICT (video_url, second_position) 
  DO UPDATE SET viewer_count = EXCLUDED.viewer_count, updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar agregações automaticamente
DROP TRIGGER IF EXISTS trigger_update_retention_aggregated ON video_retention;
CREATE TRIGGER trigger_update_retention_aggregated
AFTER INSERT ON video_retention
FOR EACH ROW
EXECUTE FUNCTION update_retention_aggregated();

-- ============================================
-- VIEWS PARA DASHBOARD
-- ============================================

-- View: Métricas Gerais de um Vídeo
CREATE OR REPLACE VIEW video_metrics_summary AS
SELECT 
  video_url,
  COUNT(DISTINCT CASE WHEN event_type = 'blur_view' THEN user_session_id END) as blur_views,
  COUNT(DISTINCT CASE WHEN event_type = 'play' THEN user_session_id END) as play_clicks,
  COUNT(DISTINCT CASE WHEN event_type = 'ended' THEN user_session_id END) as completed_views,
  COUNT(DISTINCT CASE WHEN event_type = 'cta_click' THEN user_session_id END) as cta_clicks,
  ROUND(
    COUNT(DISTINCT CASE WHEN event_type = 'cta_click' THEN user_session_id END)::NUMERIC / 
    NULLIF(COUNT(DISTINCT CASE WHEN event_type = 'play' THEN user_session_id END), 0) * 100, 2
  ) as ctr_percentage,
  ROUND(AVG(CASE WHEN event_type = 'ended' THEN watched_seconds ELSE NULL END)::NUMERIC, 0) as avg_watch_time,
  ROUND(
    AVG(CASE WHEN event_type = 'ended' AND total_duration > 0 
        THEN (watched_seconds::NUMERIC / total_duration * 100) 
        ELSE NULL END), 1
  ) as avg_retention_percentage
FROM video_events
GROUP BY video_url;

-- View: Taxa de Conversão por Segundo
CREATE OR REPLACE VIEW conversion_by_second AS
SELECT 
  ve.video_url,
  ROUND(ve.watched_seconds / NULLIF(ve.total_duration, 0) * 100, 1) as video_percentage,
  COUNT(DISTINCT CASE WHEN ve.event_type = 'cta_click' THEN ve.user_session_id END) as cta_clicks_at_second,
  COUNT(DISTINCT ve.user_session_id) as viewers_at_second
FROM video_events ve
WHERE ve.event_type IN ('ended', 'cta_click')
GROUP BY ve.video_url, ROUND(ve.watched_seconds / NULLIF(ve.total_duration, 0) * 100, 1)
ORDER BY ve.video_url, video_percentage;

-- View: Análise por Dispositivo
CREATE OR REPLACE VIEW device_analytics AS
SELECT 
  video_url,
  device_type,
  COUNT(DISTINCT user_session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN event_type = 'play' THEN user_session_id END) as play_clicks,
  COUNT(DISTINCT CASE WHEN event_type = 'ended' THEN user_session_id END) as completed_views,
  ROUND(
    COUNT(DISTINCT CASE WHEN event_type = 'ended' THEN user_session_id END)::NUMERIC / 
    NULLIF(COUNT(DISTINCT CASE WHEN event_type = 'play' THEN user_session_id END), 0) * 100, 2
  ) as completion_rate
FROM video_events
GROUP BY video_url, device_type;
```

---

## 📊 Depois de Executar o Script

Você terá acesso a:

1. **Tabela `video_events`** - Todos os eventos (play, pause, ended, cta_click, blur_view)
2. **Tabela `video_retention`** - Rastreamento segundo a segundo
3. **Tabela `user_sessions`** - Sessões de usuário com histórico completo
4. **View `video_metrics_summary`** - Resumo geral de métricas
5. **View `conversion_by_second`** - Taxa de conversão por segundo do vídeo
6. **View `device_analytics`** - Análise por tipo de dispositivo

---

## ✅ Próximas Etapas

1. Execute o script acima no SQL Editor do Supabase
2. Aguarde a confirmação de sucesso
3. O código React será atualizado para usar essas novas tabelas
4. As métricas começarão a ser coletadas automaticamente!

---

**Dúvidas?** Consulte a [documentação do Supabase](https://supabase.com/docs)
