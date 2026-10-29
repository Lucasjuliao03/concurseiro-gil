# SAFO — Plataforma de estudos para concursos

Aplicação web mobile-first para estudo por questões, flashcards e resumos, com cursos/editais, progresso, XP, patentes, sequência diária, conquistas e painel administrativo.

## Stack

- React 18, TypeScript e Vite
- Tailwind CSS e shadcn/ui
- Supabase Auth, PostgreSQL, RPC e Row Level Security
- TanStack Query
- Vitest e Testing Library
- PWA com service worker

## Requisitos

- Node.js 22 LTS ou superior
- npm 10 ou superior
- Um projeto Supabase
- Supabase CLI para aplicar as migrações

## Configuração local

```bash
npm ci
cp .env.example .env
```

Preencha `.env` com a URL e a chave publicável do projeto Supabase. Nunca coloque `service_role` em variáveis `VITE_*`: todo valor `VITE_*` é incorporado ao JavaScript entregue ao navegador.

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publicavel
```

Depois, vincule o projeto e aplique as migrações na ordem versionada:

```bash
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase db push
```

O arquivo `seed.sql` contém conteúdo inicial opcional. Aplique-o somente depois das migrações e apenas em um ambiente que possa receber esses dados.

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f seed.sql
```

Inicie o frontend:

```bash
npm run dev
```

## Validação obrigatória

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm audit --omit=dev
```

O build não substitui o typecheck. O pipeline de produção deve executar todos os comandos acima.

## Segurança e integridade

- O cliente nunca recebe o gabarito antes da resposta.
- Correção, XP, streak, produtividade e conquistas são calculados em RPCs transacionais.
- O limite gratuito é vitalício e também é validado no banco.
- Perfis e histórico de estudo possuem RLS por usuário; administradores são validados no banco.
- HTML de resumos é sanitizado antes da renderização.
- A chave `service_role` nunca é necessária no frontend.

Não reintroduza escrita direta nas tabelas de progresso. Os fluxos de estudo devem usar `record_question_answer`, `record_flashcard_review` e `record_summary_view`.

## Promoção para produção

1. Faça backup do banco.
2. Aplique as migrações primeiro.
3. Valide cadastro, confirmação de e-mail e login em staging.
4. Teste aluno pendente, aluno aprovado, acesso expirado e administrador.
5. Teste o limite de 10 atividades e 2 resumos.
6. Só então publique o frontend correspondente.

A migração `202608300001_production_hardening.sql` remove a antiga função arbitrária de XP e substitui políticas permissivas. O frontend novo depende dessas RPCs; não publique apenas um dos lados.

## Diagnóstico de curso sem material

O acesso ao material segue esta cadeia: `perfil do usuário → curso → edital ativo → matéria vinculada → conteúdo publicado`. No painel:

1. Confirme o curso do aluno em **Usuários → Curso**.
2. Confirme que o curso possui pelo menos um edital ativo.
3. Em **Estrutura → Vincular**, associe as matérias ao edital.
4. Confirme que questões, flashcards e resumos estão publicados e vinculados ao mesmo edital.

Se a API retornar `PGRST202` para `get_study_questions`, `get_my_usage` ou `record_*`, o frontend e o banco estão em versões diferentes. Aplique `supabase db push` antes de testar novamente. As consultas do aluno são armazenadas em cache por curso e o cache é apagado ao trocar de conta.

## Estrutura principal

```text
src/
  components/       layouts e componentes visuais
  contexts/         autenticação e notificações
  hooks/            consultas e mutações Supabase
  pages/            área do aluno
  pages/admin/      painel administrativo
  services/         regras de acesso e estatísticas
  test/             testes unitários
supabase/migrations/
  202608300000_baseline.sql
  202608300001_production_hardening.sql
```

## Exclusão de usuários

O frontend bloqueia contas, mas não apaga identidades de `auth.users`. Exclusão definitiva exige uma Edge Function ou backend confiável usando `service_role`, com confirmação e trilha de auditoria. Nunca exponha essa chave no navegador.
