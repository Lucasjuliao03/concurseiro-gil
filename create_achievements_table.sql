-- =============================================
-- CRIAÇÃO DA TABELA user_achievements
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- 1. Criar tabela se não existir
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  notification_shown BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Adicionar constraints
ALTER TABLE user_achievements 
  ADD CONSTRAINT fk_user_achievements_user 
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE user_achievements
  ADD CONSTRAINT unique_user_achievement 
  UNIQUE (user_id, achievement_id);

-- 3. Criar índices
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- 4. Desabilitar RLS temporariamente (ativar depois de criar políticas)
ALTER TABLE user_achievements DISABLE ROW LEVEL SECURITY;

-- 5. Inserir políticas para RLS (após habilitar)
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Politica: Usuários podem ver suas próprias conquistas
DROP POLICY IF EXISTS "users_can_view_own_achievements" ON user_achievements;
CREATE POLICY "users_can_view_own_achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Politica: Usuários podem inserir suas próprias conquistas
DROP POLICY IF EXISTS "users_can_insert_own_achievements" ON user_achievements;
CREATE POLICY "users_can_insert_own_achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politica: Admin pode ver todas as conquistas
DROP POLICY IF EXISTS "admins_can_view_all_achievements" ON user_achievements;
CREATE POLICY "admins_can_view_all_achievements" ON user_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- 6. Comentários
COMMENT ON TABLE user_achievements IS 'Armazena conquistas/metadatais desbloqueadas pelos usuários';
COMMENT ON COLUMN user_achievements.achievement_id IS 'ID da conquista (matching com ACHIEVEMENTS no código frontend)';
COMMENT ON COLUMN user_achievements.notification_shown IS 'Se a notificação de conquista já foi exibida ao usuário';
