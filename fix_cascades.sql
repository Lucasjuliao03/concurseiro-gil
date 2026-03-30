-- =========================================================
-- SCRIPT DE CORREÇÃO DE EXCLUSÃO (CASCATA)
-- Execute este script no SQL Editor do Supabase
-- Resolve o erro 409 (Conflict) ao excluir Matérias, Temas, etc.
-- =========================================================

-- 1. EDICTS (Editais dependem de courses)
ALTER TABLE public.edicts
  DROP CONSTRAINT IF EXISTS edicts_course_id_fkey;

ALTER TABLE public.edicts
  ADD CONSTRAINT edicts_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 2. EDICT_SUBJECTS (Vínculos dependem de edicts e subjects)
ALTER TABLE public.edict_subjects
  DROP CONSTRAINT IF EXISTS edict_subjects_edict_id_fkey,
  DROP CONSTRAINT IF EXISTS edict_subjects_subject_id_fkey;

ALTER TABLE public.edict_subjects
  ADD CONSTRAINT edict_subjects_edict_id_fkey FOREIGN KEY (edict_id) REFERENCES public.edicts(id) ON DELETE CASCADE,
  ADD CONSTRAINT edict_subjects_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE;

-- 3. TOPICS (Temas dependem de subjects)
ALTER TABLE public.topics
  DROP CONSTRAINT IF EXISTS topics_subject_id_fkey;

ALTER TABLE public.topics
  ADD CONSTRAINT topics_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE;

-- 4. QUESTIONS (Questões dependem de subjects, topics e edicts)
ALTER TABLE public.questions
  DROP CONSTRAINT IF EXISTS questions_subject_id_fkey,
  DROP CONSTRAINT IF EXISTS questions_topic_id_fkey,
  DROP CONSTRAINT IF EXISTS questions_edict_id_fkey;

ALTER TABLE public.questions
  ADD CONSTRAINT questions_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE,
  ADD CONSTRAINT questions_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE,
  ADD CONSTRAINT questions_edict_id_fkey FOREIGN KEY (edict_id) REFERENCES public.edicts(id) ON DELETE SET NULL; -- Manter questão sem edital específico as vezes

-- 5. FLASHCARDS (Depende de subjects e topics)
ALTER TABLE public.flashcards
  DROP CONSTRAINT IF EXISTS flashcards_subject_id_fkey,
  DROP CONSTRAINT IF EXISTS flashcards_topic_id_fkey,
  DROP CONSTRAINT IF EXISTS flashcards_edict_id_fkey;

ALTER TABLE public.flashcards
  ADD CONSTRAINT flashcards_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE,
  ADD CONSTRAINT flashcards_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE,
  ADD CONSTRAINT flashcards_edict_id_fkey FOREIGN KEY (edict_id) REFERENCES public.edicts(id) ON DELETE SET NULL;

-- 6. SUMMARIES (Depende de subjects e topics)
ALTER TABLE public.summaries
  DROP CONSTRAINT IF EXISTS summaries_subject_id_fkey,
  DROP CONSTRAINT IF EXISTS summaries_topic_id_fkey,
  DROP CONSTRAINT IF EXISTS summaries_edict_id_fkey;

ALTER TABLE public.summaries
  ADD CONSTRAINT summaries_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE,
  ADD CONSTRAINT summaries_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE,
  ADD CONSTRAINT summaries_edict_id_fkey FOREIGN KEY (edict_id) REFERENCES public.edicts(id) ON DELETE SET NULL;
