-- Script Geral de Correção de Vínculo de Curso e Validação de Colunas (Fix Error 500)

-- Passo 1: Garantir que as colunas essenciais existam em 'profiles'
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='course_id') THEN
        ALTER TABLE public.profiles ADD COLUMN course_id integer REFERENCES public.courses(id) ON DELETE SET NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='active_until') THEN
        ALTER TABLE public.profiles ADD COLUMN active_until timestamp with time zone;
    END IF;
END $$;

-- Passo 2: Atualizar a trigger de cadastro com tratamento de erros super seguro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_course_id integer;
BEGIN
  -- Bloco interno seguro para converter o ID do curso (evita crash do banco)
  BEGIN
    v_course_id := NULLIF(new.raw_user_meta_data->>'course_id', '')::integer;
  EXCEPTION WHEN OTHERS THEN
    v_course_id := NULL;
  END;

  -- Inserção no perfil
  INSERT INTO public.profiles (id, username, full_name, role, is_active, course_id)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    false, -- Sempre começa inativo para teste/limitado
    v_course_id
  );
  RETURN new;
END;
$$;
