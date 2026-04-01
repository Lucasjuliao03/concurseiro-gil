-- =============================================
-- CRIAÇÃO DA FUNÇÃO increment_xp
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- 1. Verificar se a função já existe
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'increment_xp';

-- 2. Criar a função se não existir
CREATE OR REPLACE FUNCTION increment_xp(user_id_arg UUID, xp_arg INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET xp_total = COALESCE(xp_total, 0) + xp_arg
  WHERE id = user_id_arg;
END;
$$;

-- 3. Permitir que usuários acessem a função
GRANT EXECUTE ON FUNCTION increment_xp TO anon;
GRANT EXECUTE ON FUNCTION increment_xp TO authenticated;
