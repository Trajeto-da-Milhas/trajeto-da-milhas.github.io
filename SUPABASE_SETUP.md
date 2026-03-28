# Configuração do Supabase para Métricas Reais

Este projeto agora rastreia **métricas REAIS** de todos os usuários usando Supabase como banco de dados backend.

## ⚡ Quick Start

### 1. Criar Conta no Supabase
- Acesse [supabase.com](https://supabase.com)
- Clique em "Start your project"
- Crie uma nova organização e projeto
- Copie a **URL do projeto** e a **Chave Pública (anon key)**

### 2. Configurar Variáveis de Ambiente
Edite o arquivo `.env` na raiz do projeto:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

### 3. Criar Tabela de Eventos no Supabase

No painel do Supabase, vá para **SQL Editor** e execute este comando:

```sql
CREATE TABLE video_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_url TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('play', 'pause', 'ended', 'cta_click')),
  watched_seconds INTEGER,
  total_duration INTEGER,
  user_session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_video_url ON video_events(video_url);
CREATE INDEX idx_event_type ON video_events(event_type);
CREATE INDEX idx_created_at ON video_events(created_at);
```

### 4. Configurar Row Level Security (RLS)

Execute este comando para permitir inserções públicas:

```sql
ALTER TABLE video_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON video_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads" ON video_events
  FOR SELECT USING (true);
```

### 5. Pronto! 🎉

Agora todos os eventos de vídeo serão rastreados automaticamente:
- **Play**: Quando um usuário clica no vídeo
- **Ended**: Quando o vídeo termina (captura tempo assistido)
- **CTA Click**: Quando alguém clica no botão de compra

## 📊 Visualizar Dados

No painel do Supabase, vá para **Table Editor** e selecione `video_events` para ver todos os dados em tempo real.

## 🔍 Métricas Disponíveis

O painel de desenvolvimento (modo dev) agora mostra:
- **Visualizações**: Total de plays
- **Retenção Média**: Porcentagem média do vídeo assistida
- **Tempo Médio**: Tempo médio de visualização
- **CTR**: Taxa de conversão (cliques no botão / total de plays)

## 🚀 Próximas Etapas (Opcional)

Para dados ainda mais robustos, você pode:
1. Integrar Google Analytics 4
2. Adicionar rastreamento de scroll
3. Criar dashboards customizados no Supabase

---

**Dúvidas?** Consulte a [documentação do Supabase](https://supabase.com/docs)
