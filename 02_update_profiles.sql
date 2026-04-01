-- Adicionando course_id e active_until na tabela profiles

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS course_id integer REFERENCES public.courses(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS active_until timestamp with time zone;

-- Criando uma função/trigger para atualizar automaticamente is_active baseado no active_until (opcional)
-- Ou apenas trataremos na logica do aplicativo.

-- Precisamos confirmar se a view do admin_users pega active_until e course_id.
-- Atualize as politicas SE necessario.
