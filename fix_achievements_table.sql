-- =============================================
-- CORREÇÃO DA TABELA user_achievements
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- 1. Verificar se a tabela existe
SELECT table_name FROM information_schema.tables WHERE table_name = 'user_achievements';

-- 2. Se existir, dropar e recriar sem RLS (para testes)
DROP TABLE IF EXISTS user_achievements;

-- 3. Criar tabela SEM RLS
CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  notification_shown BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- 4. Criar índices
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- 5. IMPORTANTE: Não habilitar RLS (ou criar políticas corretas depois)
-- Por enquanto, deixar sem RLS para funcionar

-- 6. Comentários
COMMENT ON TABLE user_achievements IS 'Armazena conquistas desbloqueadas pelos usuários';
COMMENT ON COLUMN user_achievements.achievement_id IS 'ID da conquista (matching com ACHIEVEMENTS no código)';

-- 7. Verificar se a tabela foi criada
SELECT * FROM user_achievements LIMIT 5;
