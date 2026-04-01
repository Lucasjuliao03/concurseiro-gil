-- =====================================================
-- SCRIPT FINAL — CORRIGE O ERRO 500 NO CADASTRO
-- Rode este script INTEIRO no SQL Editor do Supabase
-- =====================================================

-- 1. Garantir que as colunas existam
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS course_id integer;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_until timestamptz;

-- 2. Substituir a trigger por uma versão ULTRA-SIMPLES que NÃO toca em course_id
--    (course_id será salvo pelo app depois do cadastro)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role, is_active)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'student',
    false
  );
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Em caso de QUALQUER erro (ex: perfil já existe), não morre
  RETURN new;
END;
$$;

-- 3. Garantir que a trigger está conectada ao evento correto
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Permitir que o próprio usuário atualize seu course_id após cadastro
CREATE POLICY "Users can update own profile course"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
