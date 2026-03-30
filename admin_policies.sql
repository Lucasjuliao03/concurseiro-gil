-- ==========================================
-- CORREÇÃO DE POLÍTICAS DE RLS PARA ADMIN
-- Execute este script no SQL Editor do Supabase
-- ==========================================

-- 1. APAGAR AS POLÍTICAS ANTIGAS (que causaram o erro 500)
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage edicts" ON public.edicts;
DROP POLICY IF EXISTS "Admins can manage subjects" ON public.subjects;
DROP POLICY IF EXISTS "Admins can manage edict_subjects" ON public.edict_subjects;
DROP POLICY IF EXISTS "Admins can manage topics" ON public.topics;
DROP POLICY IF EXISTS "Admins can manage exam_boards" ON public.exam_boards;
DROP POLICY IF EXISTS "Admins can manage questions" ON public.questions;
DROP POLICY IF EXISTS "Admins can manage flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Admins can manage summaries" ON public.summaries;
DROP POLICY IF EXISTS "Admins can manage motivational_messages" ON public.motivational_messages;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- 2. CRIAR FUNÇÃO SEGURA PARA VERIFICAR ADMIN (Evita o loop infinito / erro 500)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Roda ignorando o RLS, evitando o loop infinito
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- 3. CRIAR AS NOVAS POLÍTICAS USANDO A FUNÇÃO SEGURA
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage edicts" ON public.edicts FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage subjects" ON public.subjects FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage edict_subjects" ON public.edict_subjects FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage topics" ON public.topics FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage exam_boards" ON public.exam_boards FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage questions" ON public.questions FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage flashcards" ON public.flashcards FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage summaries" ON public.summaries FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage motivational_messages" ON public.motivational_messages FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
