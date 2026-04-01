-- =============================================
-- VERIFICAÇÃO E CORREÇÃO DE ACESSO
-- Execute no Supabase SQL Editor
-- =============================================

-- 1. Verificar se todas as tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Verificar se a tabela topics existe e tem dados
SELECT COUNT(*) as total_topics FROM topics;

-- 3. Verificar se a tabela questions existe e tem dados
SELECT COUNT(*) as total_questions FROM questions;

-- 4. Verificar se a tabela user_question_stats existe
SELECT COUNT(*) as total_stats FROM user_question_stats;

-- 5. Para testar RLS, verificar policies de uma tabela
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'topics';

-- 6. Se quiser desabilitar RLS temporariamente para testar (execute apenas para debug):
-- ALTER TABLE topics DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_question_stats DISABLE ROW LEVEL SECURITY;

-- 7. Criar policies mais permissivas para leitura:
DROP POLICY IF EXISTS "Permissive select for all topics" ON topics;
CREATE POLICY "Permissive select for all topics" ON topics
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permissive select for all questions" ON questions;
CREATE POLICY "Permissive select for all questions" ON questions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permissive select for all question_stats" ON user_question_stats;
CREATE POLICY "Permissive select for all question_stats" ON user_question_stats
    FOR SELECT USING (true);

-- 8. Para profiles (o erro 406 é geralmente nesse):
DROP POLICY IF EXISTS "Permissive select for all profiles" ON profiles;
CREATE POLICY "Permissive select for all profiles" ON profiles
    FOR SELECT USING (true);
