-- Script para atualizar a trigger de criação de usuário do Supabase
-- Isso garante que o course_id escolhido no registro seja salvo automaticamente 
-- no perfil, contornando o bloqueio de RLS.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role, is_active, course_id)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    false,
    NULLIF(new.raw_user_meta_data->>'course_id', '')::integer
  );
  RETURN new;
END;
$$;
