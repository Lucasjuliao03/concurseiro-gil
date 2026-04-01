-- =============================================
-- TABELA: user_achievements
-- =============================================
-- Esta tabela armazena as conquistas desbloqueadas pelos usuários

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  notification_shown BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- Index para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- =============================================
-- RLS (Row Level Security)
-- =============================================

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver suas próprias conquistas
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Admin pode ver todas as conquistas
CREATE POLICY "Admin can view all achievements" ON user_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- =============================================
-- COMENTÁRIOS
-- =============================================

COMMENT ON TABLE user_achievements IS 'Armazena as conquistas desbloqueadas pelos usuários';
COMMENT ON COLUMN user_achievements.achievement_id IS 'ID da conquista (matching com ACHIEVEMENTS no código)';
COMMENT ON COLUMN user_achievements.notification_shown IS 'Se a notificação de conquista já foi exibida';
