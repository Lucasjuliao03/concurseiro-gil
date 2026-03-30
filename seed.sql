-- =========================================================
-- SEED DATA COMPLETO — Concurseiro Gil
-- Execute este script no SQL Editor do Supabase
-- =========================================================

-- =========================================================
-- 1. CURSOS
-- =========================================================
INSERT INTO public.courses (id, name, description) VALUES
  (1, 'PMMG - Polícia Militar de Minas Gerais', 'Concurso para Soldado e Oficial da PMMG'),
  (2, 'PCMG - Polícia Civil de Minas Gerais', 'Concurso para Investigador e Escrivão da PCMG'),
  (3, 'PRF - Polícia Rodoviária Federal', 'Concurso para Policial Rodoviário Federal')
ON CONFLICT DO NOTHING;

-- =========================================================
-- 2. EDITAIS
-- =========================================================
INSERT INTO public.edicts (id, course_id, name, year, is_active) VALUES
  (1, 1, 'CFSD PMMG 2026', 2026, true),
  (2, 2, 'Investigador PCMG 2026', 2026, true),
  (3, 3, 'PRF 2026', 2026, true)
ON CONFLICT DO NOTHING;

-- =========================================================
-- 3. MATÉRIAS (subjects)
-- =========================================================
INSERT INTO public.subjects (id, name, description) VALUES
  (1, 'Direito Penal', 'Código Penal, crimes, penas e teoria do delito'),
  (2, 'Direito Constitucional', 'Constituição Federal, direitos e garantias'),
  (3, 'Legislação Especial', 'Leis penais especiais: Maria da Penha, Drogas, ECA, Hediondos'),
  (4, 'Direito Administrativo', 'Princípios, atos administrativos, licitação'),
  (5, 'Direitos Humanos', 'DUDH, sistema interamericano, tratados'),
  (6, 'Português', 'Gramática, interpretação e redação')
ON CONFLICT DO NOTHING;

-- =========================================================
-- 4. VÍNCULO EDITAL → MATÉRIAS
-- =========================================================
INSERT INTO public.edict_subjects (edict_id, subject_id, exam_weight, question_count, sort_order) VALUES
  (1, 1, 2.0, 10, 1), (1, 2, 2.0, 8, 2), (1, 3, 1.5, 6, 3),
  (1, 4, 1.5, 6, 4), (1, 5, 1.0, 5, 5), (1, 6, 1.5, 5, 6),
  (2, 1, 2.0, 10, 1), (2, 2, 2.0, 8, 2), (2, 3, 1.5, 6, 3),
  (2, 4, 1.5, 6, 4), (2, 5, 1.0, 5, 5), (2, 6, 1.5, 5, 6),
  (3, 1, 2.0, 10, 1), (3, 2, 2.0, 8, 2), (3, 3, 1.5, 6, 3),
  (3, 4, 1.5, 6, 4), (3, 5, 1.0, 5, 5), (3, 6, 1.5, 5, 6)
ON CONFLICT DO NOTHING;

-- =========================================================
-- 5. TEMAS (topics)
-- =========================================================
INSERT INTO public.topics (id, subject_id, name, sort_order) VALUES
  -- Direito Penal
  (1, 1, 'Teoria do Crime', 1),
  (2, 1, 'Excludentes de Ilicitude', 2),
  (3, 1, 'Crimes contra a Pessoa', 3),
  (4, 1, 'Crimes contra o Patrimônio', 4),
  (5, 1, 'Crimes contra a Administração', 5),
  (6, 1, 'Penas', 6),
  -- Direito Constitucional
  (7, 2, 'Princípios Fundamentais', 1),
  (8, 2, 'Direitos e Garantias Fundamentais', 2),
  (9, 2, 'Remédios Constitucionais', 3),
  (10, 2, 'Segurança Pública', 4),
  -- Legislação Especial
  (11, 3, 'Lei Maria da Penha', 1),
  (12, 3, 'ECA', 2),
  (13, 3, 'Lei de Drogas', 3),
  (14, 3, 'Crimes Hediondos', 4),
  -- Direito Administrativo
  (15, 4, 'Princípios', 1),
  (16, 4, 'Atos Administrativos', 2),
  (17, 4, 'Licitação', 3),
  (18, 4, 'Poderes Administrativos', 4),
  -- Direitos Humanos
  (19, 5, 'Gerações de Direitos', 1),
  (20, 5, 'Sistema Interamericano', 2),
  (21, 5, 'DUDH', 3),
  (22, 5, 'Pacto de San José', 4),
  -- Português
  (23, 6, 'Crase', 1),
  (24, 6, 'Concordância', 2),
  (25, 6, 'Pronomes', 3),
  (26, 6, 'Figuras de Linguagem', 4)
ON CONFLICT DO NOTHING;

-- =========================================================
-- 6. BANCAS
-- =========================================================
INSERT INTO public.exam_boards (id, name) VALUES
  (1, 'FGV'),
  (2, 'CESPE/CEBRASPE'),
  (3, 'FUMARC'),
  (4, 'IBFC')
ON CONFLICT DO NOTHING;

-- =========================================================
-- 7. QUESTÕES (52 questões do mock original)
-- =========================================================
INSERT INTO public.questions (edict_id, subject_id, topic_id, question_type, difficulty, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, source_year, is_active, status) VALUES
-- Direito Penal: Excludentes
(1, 1, 2, 'banca', 'easy', 'Quais são as causas excludentes de ilicitude previstas no art. 23 do Código Penal?',
 'Estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito',
 'Coação irresistível, obediência hierárquica e embriaguez acidental',
 'Erro de tipo, erro de proibição e coação moral irresistível',
 'Desistência voluntária, arrependimento eficaz e crime impossível',
 'Inimputabilidade penal e ausência de dolo', 'A',
 'As excludentes de ilicitude estão no art. 23 do CP: estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito.', 2024, true, 'published'),

(1, 1, 2, 'banca', 'medium', 'Sobre a legítima defesa (art. 25 do CP), é correto afirmar que:',
 'É necessário que a agressão já tenha cessado para sua configuração',
 'Exige agressão injusta, atual ou iminente, usando moderadamente dos meios necessários',
 'Só pode ser invocada por agentes de segurança pública',
 'Não admite excesso em nenhuma hipótese',
 'Permite o uso desproporcional da força em qualquer situação', 'B',
 'A legítima defesa exige agressão injusta, atual ou iminente, a direito seu ou de outrem, usando moderadamente dos meios necessários.', 2023, true, 'published'),

(1, 1, 1, 'banca', 'medium', 'Segundo a teoria tripartida do crime adotada pelo STF, crime é:',
 'Fato típico e culpável',
 'Fato típico, ilícito e culpável',
 'Fato típico e antijurídico apenas',
 'Conduta dolosa ou culposa',
 'Ação contrária à moral', 'B',
 'A teoria tripartida define crime como fato típico, ilícito (antijurídico) e culpável.', 2024, true, 'published'),

(1, 1, 1, 'banca', 'medium', 'São elementos do fato típico:',
 'Dolo, culpa e preterdolo',
 'Imputabilidade, potencial consciência e exigibilidade',
 'Conduta, resultado, nexo causal e tipicidade',
 'Autoria, materialidade e prova',
 'Competência, finalidade e forma', 'C',
 'Os elementos do fato típico são: conduta, resultado, nexo causal e tipicidade.', 2023, true, 'published'),

(1, 1, 3, 'banca', 'hard', 'Sobre o crime de homicídio qualificado, é CORRETO:',
 'Não é considerado crime hediondo',
 'A pena é de 6 a 20 anos',
 'O feminicídio é uma das qualificadoras e é crime hediondo',
 'O privilégio exclui todas as qualificadoras',
 'Só admite dolo direto', 'C',
 'O feminicídio (art. 121, §2º, VI) é qualificadora do homicídio e é crime hediondo.', 2024, true, 'published'),

(1, 1, 3, 'banca', 'medium', 'A lesão corporal é considerada GRAVE quando resulta em:',
 'Morte da vítima',
 'Incapacidade para ocupações habituais por mais de 30 dias',
 'Cicatriz visível no rosto',
 'Dor momentânea',
 'Hematomas leves', 'B',
 'A lesão corporal grave (art. 129, §1º) inclui incapacidade para ocupações habituais por mais de 30 dias, perigo de vida, debilidade permanente ou aceleração do parto.', 2023, true, 'published'),

(1, 1, 4, 'banca', 'easy', 'A principal diferença entre furto e roubo é:',
 'O valor do bem subtraído',
 'A presença ou ausência de violência ou grave ameaça',
 'O horário em que o crime é cometido',
 'A quantidade de agentes envolvidos',
 'O tipo de bem subtraído', 'B',
 'O furto (art. 155) é a subtração sem violência, enquanto o roubo (art. 157) emprega violência ou grave ameaça.', 2024, true, 'published'),

(1, 1, 4, 'banca', 'medium', 'Latrocínio é:',
 'Roubo seguido de lesão corporal leve',
 'Furto com emprego de arma',
 'Roubo seguido de morte, com pena de 20 a 30 anos',
 'Extorsão mediante sequestro',
 'Estelionato qualificado', 'C',
 'Latrocínio (art. 157, §3º): roubo com resultado morte. Pena: 20 a 30 anos. Crime hediondo.', 2024, true, 'published'),

(1, 1, 5, 'banca', 'medium', 'A diferença entre corrupção ativa e passiva é:',
 'A ativa é mais grave que a passiva',
 'Na passiva o funcionário solicita/recebe vantagem; na ativa o particular oferece',
 'Ambas são praticadas apenas por funcionários públicos',
 'A passiva não é crime',
 'A ativa exige violência', 'B',
 'Corrupção passiva (art. 317): funcionário solicita ou recebe. Corrupção ativa (art. 333): particular oferece ou promete.', 2023, true, 'published'),

(1, 1, 6, 'banca', 'easy', 'Os regimes de cumprimento de pena para réu primário são:',
 'Apenas fechado e aberto',
 'Fechado (>8 anos), semiaberto (>4 e ≤8) e aberto (≤4 anos)',
 'Determinados pelo juiz sem critério legal',
 'Apenas semiaberto',
 'Não existem regimes distintos', 'B',
 'Para réu primário: fechado (pena >8 anos), semiaberto (>4 a 8 anos), aberto (≤4 anos) — art. 33 do CP.', 2024, true, 'published'),

-- Direito Constitucional
(1, 2, 7, 'banca', 'easy', 'Os fundamentos da República Federativa do Brasil (Art. 1º CF) são:',
 'Legalidade, impessoalidade, moralidade, publicidade e eficiência',
 'Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e livre iniciativa, pluralismo político',
 'Construir sociedade justa, garantir desenvolvimento, erradicar pobreza',
 'Independência, autodeterminação, não-intervenção',
 'Liberdade, igualdade e fraternidade', 'B',
 'Os fundamentos estão no art. 1º (SO-CI-DI-VA-PLU): soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, e pluralismo político.', 2024, true, 'published'),

(1, 2, 7, 'banca', 'easy', 'Os objetivos fundamentais da República (Art. 3º CF) incluem:',
 'Manter a ordem e a segurança',
 'Construir uma sociedade livre, justa e solidária',
 'Garantir a soberania nacional',
 'Defender a propriedade privada',
 'Assegurar o pluralismo político', 'B',
 'Os objetivos (CON-GA-ER-PRO): construir sociedade livre/justa/solidária, garantir desenvolvimento, erradicar pobreza, promover o bem de todos.', 2023, true, 'published'),

(1, 2, 9, 'banca', 'medium', 'O remédio constitucional que protege o direito de locomoção é:',
 'Mandado de Segurança',
 'Habeas Corpus',
 'Habeas Data',
 'Ação Popular',
 'Mandado de Injunção', 'B',
 'Habeas Corpus protege o direito de ir e vir (locomoção), previsto no art. 5º, LXVIII da CF.', 2024, true, 'published'),

(1, 2, 10, 'banca', 'medium', 'Segundo o art. 144 da CF, a polícia ostensiva e preservação da ordem pública é função:',
 'Da Polícia Federal',
 'Da Polícia Civil',
 'Das Polícias Militares',
 'Da Guarda Municipal',
 'Da Polícia Rodoviária Federal', 'C',
 'Art. 144, §5º CF: às PMs cabe a polícia ostensiva e a preservação da ordem pública.', 2024, true, 'published'),

(1, 2, 8, 'banca', 'hard', 'O racismo é crime:',
 'Afiançável e prescritível',
 'Inafiançável e imprescritível',
 'Inafiançável e prescritível',
 'Afiançável e imprescritível',
 'Dependente da gravidade do caso', 'B',
 'Racismo (art. 5º, XLII CF): crime inafiançável e IMPRESCRITÍVEL.', 2023, true, 'published'),

(1, 2, 8, 'banca', 'medium', 'Sobre a inviolabilidade do domicílio (art. 5º, XI), durante a NOITE só se pode ingressar em caso de:',
 'Mandado judicial',
 'Flagrante delito, desastre ou para prestar socorro',
 'Qualquer autorização policial',
 'Investigação criminal',
 'Ordem do Ministério Público', 'B',
 'À noite: apenas flagrante, desastre ou socorro. Mandado judicial só vale durante o DIA.', 2024, true, 'published'),

-- Legislação Especial
(1, 3, 11, 'banca', 'easy', 'As formas de violência previstas na Lei Maria da Penha (Lei 11.340/06) são:',
 'Apenas física e psicológica',
 'Física, psicológica, sexual, patrimonial e moral',
 'Apenas física, sexual e moral',
 'Física y patrimonial',
 'Psicológica e econômica', 'B',
 'A Lei Maria da Penha prevê 5 formas de violência no art. 7º: física, psicológica, sexual, patrimonial e moral.', 2024, true, 'published'),

(1, 3, 12, 'banca', 'easy', 'No ECA, a diferença entre criança e adolescente é:',
 'Criança: até 14 anos; Adolescente: 14 a 18 anos',
 'Criança: até 12 anos incompletos; Adolescente: 12 a 18 anos',
 'Não há diferença legal',
 'Criança: até 10 anos; Adolescente: 10 a 16 anos',
 'Criança: até 16 anos; Adolescente: 16 a 21 anos', 'B',
 'Art. 2º do ECA: criança até 12 anos incompletos; adolescente de 12 a 18 anos.', 2023, true, 'published'),

(1, 3, 13, 'banca', 'medium', 'Sobre o uso pessoal de drogas (art. 28 da Lei 11.343), é CORRETO:',
 'A pena é de 6 meses a 2 anos de prisão',
 'Não há pena privativa de liberdade',
 'O usuário responde por tráfico privilegiado',
 'A pena é de multa apenas',
 'O fato é atípico', 'B',
 'Art. 28: uso pessoal NÃO tem pena privativa de liberdade. Penas: advertência, serviço comunitário, medida educativa.', 2024, true, 'published'),

(1, 3, 14, 'banca', 'medium', 'São crimes hediondos:',
 'Furto e estelionato',
 'Injúria e calúnia',
 'Homicídio qualificado, latrocínio, estupro e tráfico de drogas',
 'Lesão leve e ameaça',
 'Desacato e desobediência', 'C',
 'Crimes hediondos (Lei 8.072/90): homicídio qualificado, latrocínio, extorsão qualificada, estupro, tráfico, entre outros.', 2024, true, 'published'),

-- Direito Administrativo
(1, 4, 15, 'banca', 'easy', 'Os princípios expressos da Administração Pública (LIMPE) são:',
 'Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência',
 'Liberdade, Igualdade, Moderação, Proporcionalidade e Economia',
 'Legitimidade, Independência, Motivação, Participação e Ética',
 'Licitações, Instrumentalidade, Mérito, Precaução e Equidade',
 'Legalismo, Imparcialidade, Motivação, Probidade e Eficácia', 'A',
 'Art. 37, caput da CF: LIMPE — Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.', 2024, true, 'published'),

(1, 4, 16, 'banca', 'medium', 'Os elementos do ato administrativo (CO-FI-FO-MO-OB) são:',
 'Controle, Fiscalização, Formulário, Motivação e Obediência',
 'Competência, Finalidade, Forma, Motivo e Objeto',
 'Consciência, Fidúcia, Formação, Moralidade e Obrigação',
 'Coordenação, Finalidade, Formalismo, Modulação e Objetividade',
 'Competência, Fiscalização, Forma, Município e Órgão', 'B',
 'Elementos do ato administrativo: Competência, Finalidade, Forma, Motivo e Objeto.', 2023, true, 'published'),

(1, 4, 17, 'banca', 'medium', 'As modalidades de licitação na Lei 14.133/2021 são:',
 'Concorrência, tomada de preços, convite, concurso e leilão',
 'Pregão, concorrência, concurso, leilão e diálogo competitivo',
 'Apenas pregão eletrônico',
 'Cotação, pregão e concorrência',
 'Convite, concurso e dispensa', 'B',
 'A Nova Lei de Licitações (14.133/2021) prevê: pregão, concorrência, concurso, leilão e diálogo competitivo.', 2024, true, 'published'),

(1, 4, 18, 'banca', 'medium', 'São poderes administrativos:',
 'Legislativo, Executivo e Judiciário',
 'Vinculado, Discricionário, Hierárquico, Disciplinar, Regulamentar e de Polícia',
 'Apenas poder de polícia e poder regulamentar',
 'Poder constituinte e poder derivado',
 'Poder moderador e poder neutro', 'B',
 'Poderes administrativos: Vinculado, Discricionário, Hierárquico, Disciplinar, Regulamentar e de Polícia.', 2023, true, 'published'),

-- Direitos Humanos
(1, 5, 19, 'banca', 'medium', 'As gerações de direitos humanos são:',
 'Apenas direitos civis e políticos',
 '1ª (liberdade), 2ª (igualdade), 3ª (fraternidade), 4ª (pluralismo)',
 'Apenas 1ª e 2ª gerações',
 'Direitos naturais e positivos',
 'Direitos absolutos e relativos', 'B',
 '1ª: civis/políticos (liberdade). 2ª: sociais/econômicos (igualdade). 3ª: difusos (fraternidade). 4ª: tecnológicos (pluralismo).', 2024, true, 'published'),

(1, 5, 20, 'banca', 'medium', 'Os órgãos do Sistema Interamericano de Direitos Humanos são:',
 'ONU e UNESCO',
 'Comissão Interamericana (Washington) e Corte Interamericana (San José)',
 'Tribunal Penal Internacional e OEA',
 'Apenas a Corte Interamericana',
 'Conselho de Segurança e Assembleia Geral', 'B',
 'O SIDH é composto pela Comissão (sede Washington, recebe petições) e Corte (sede San José, sentenças vinculantes).', 2023, true, 'published'),

(1, 5, 21, 'banca', 'easy', 'A DUDH de 1948 possui quantos artigos?',
 '10 artigos',
 '20 artigos',
 '30 artigos',
 '50 artigos',
 '100 artigos', 'C',
 'A Declaração Universal dos Direitos Humanos (1948) possui 30 artigos.', 2024, true, 'published'),

(1, 5, 22, 'banca', 'medium', 'Quando o Brasil ratificou o Pacto de San José da Costa Rica?',
 '1969',
 '1988',
 '1992',
 '2000',
 '2010', 'C',
 'O Pacto de San José (CADH) foi assinado em 1969 e ratificado pelo Brasil em 1992 (Decreto 678/92).', 2023, true, 'published'),

-- Português
(1, 6, 23, 'banca', 'medium', 'A crase é obrigatória na frase:',
 'Ele foi a Roma',
 'Chegamos às 14 horas',
 'Refiro-me a ela',
 'Ela saiu a cavalo',
 'Foram a uma festa', 'B',
 'A crase é obrigatória antes de horas: "Chegamos às 14 horas".', 2024, true, 'published'),

(1, 6, 24, 'banca', 'easy', 'O verbo HAVER no sentido de existir é:',
 'Pessoal, concordando com o sujeito',
 'Impessoal, ficando sempre na 3ª pessoa do singular',
 'Usado apenas no plural',
 'Conjugado normalmente',
 'Flexionado conforme o predicado', 'B',
 'Haver (existir) é impessoal: "Havia muitas pessoas" (e não "Haviam").', 2023, true, 'published'),

(1, 6, 25, 'banca', 'hard', 'A próclise (pronome antes do verbo) é obrigatória quando há:',
 'Início de frase',
 'Palavra negativa, pronome relativo ou conjunção subordinativa',
 'Imperativo afirmativo',
 'Verbo no futuro do presente',
 'Pausa ou vírgula', 'B',
 'Próclise é obrigatória com: palavras negativas, pronomes relativos, conjunções subordinativas, advérbios.', 2024, true, 'published'),

(1, 6, 26, 'banca', 'easy', 'A diferença entre metáfora e comparação é:',
 'Não há diferença',
 'A metáfora é implícita (sem "como"); a comparação é explícita (com "como")',
 'A metáfora usa "como" e a comparação não',
 'Ambas são iguais gramaticalmente',
 'A metáfora é uma hipérbole', 'B',
 'Metáfora: comparação implícita (sem "como"). Comparação: explícita (com "como").', 2023, true, 'published');

-- =========================================================
-- 8. FLASHCARDS (24 flashcards)
-- =========================================================
INSERT INTO public.flashcards (edict_id, subject_id, topic_id, front_text, back_text, difficulty, status, is_active) VALUES
-- Direito Penal
(1, 1, 2, 'Quais são as excludentes de ilicitude previstas no art. 23 do CP?', '1. Estado de necessidade\n2. Legítima defesa\n3. Estrito cumprimento do dever legal\n4. Exercício regular de direito', 'easy', 'published', true),
(1, 1, 5, 'Diferença entre corrupção ativa e passiva?', 'PASSIVA (art. 317): Funcionário público solicita ou recebe vantagem indevida.\n\nATIVA (art. 333): Particular oferece ou promete vantagem indevida ao funcionário.', 'medium', 'published', true),
(1, 1, 1, 'Quais os elementos do fato típico?', '1. Conduta (ação ou omissão)\n2. Resultado\n3. Nexo causal\n4. Tipicidade', 'easy', 'published', true),
(1, 1, 6, 'Quais os regimes de cumprimento de pena?', 'FECHADO: pena > 8 anos\nSEMIABERTO: pena > 4 e ≤ 8 anos\nABERTO: pena ≤ 4 anos\n\n(Para réu primário, art. 33 CP)', 'medium', 'published', true),
-- Direito Constitucional
(1, 2, 7, 'Fundamentos da República (Art. 1º CF)?', 'I - Soberania\nII - Cidadania\nIII - Dignidade da pessoa humana\nIV - Valores sociais do trabalho e da livre iniciativa\nV - Pluralismo político\n\nMnemônico: SO-CI-DI-VA-PLU', 'easy', 'published', true),
(1, 2, 7, 'Objetivos fundamentais da República (Art. 3º CF)?', 'I - Construir uma sociedade livre, justa e solidária\nII - Garantir o desenvolvimento nacional\nIII - Erradicar a pobreza e reduzir desigualdades\nIV - Promover o bem de todos, sem preconceitos\n\nMnemônico: CON-GA-ER-PRO', 'easy', 'published', true),
(1, 2, 9, 'Quais são os remédios constitucionais?', '1. Habeas Corpus (liberdade de locomoção)\n2. Habeas Data (dados pessoais)\n3. Mandado de Segurança (direito líquido e certo)\n4. Mandado de Injunção (falta de norma regulamentadora)\n5. Ação Popular (ato lesivo ao patrimônio público)', 'medium', 'published', true),
(1, 2, 10, 'Órgãos de segurança pública (Art. 144 CF)?', 'I - Polícia Federal\nII - Polícia Rodoviária Federal\nIII - Polícias Civis\nIV - Polícias Militares e Corpos de Bombeiros\nV - Polícias Penais', 'easy', 'published', true),
-- Legislação Especial
(1, 3, 11, 'Formas de violência na Lei Maria da Penha?', 'Art. 7º da Lei 11.340/2006:\n1. Física\n2. Psicológica\n3. Sexual\n4. Patrimonial\n5. Moral', 'easy', 'published', true),
(1, 3, 12, 'Diferença entre criança e adolescente no ECA?', 'CRIANÇA: até 12 anos incompletos\nADOLESCENTE: de 12 a 18 anos\n\n(Art. 2º da Lei 8.069/90)', 'easy', 'published', true),
(1, 3, 13, 'Penas para uso pessoal de drogas (Art. 28)?', 'NÃO há pena privativa de liberdade!\n\nPenas:\n1. Advertência sobre efeitos\n2. Prestação de serviços à comunidade\n3. Medida educativa de comparecimento a programa', 'medium', 'published', true),
(1, 3, 14, 'Quais crimes são hediondos?', 'Rol da Lei 8.072/90:\n• Homicídio qualificado\n• Latrocínio\n• Extorsão qualificada\n• Estupro\n• Estupro de vulnerável\n• Epidemia com resultado morte\n• Genocídio\n• E outros...', 'medium', 'published', true),
-- Direito Administrativo
(1, 4, 15, 'Princípios expressos (LIMPE)?', 'L - Legalidade\nI - Impessoalidade\nM - Moralidade\nP - Publicidade\nE - Eficiência\n\n(Art. 37, caput, CF/88)', 'easy', 'published', true),
(1, 4, 16, 'Elementos do ato administrativo?', '1. Competência (CO)\n2. Finalidade (FI)\n3. Forma (FO)\n4. Motivo (MO)\n5. Objeto (OB)\n\nMnemônico: CO-FI-FO-MO-OB', 'medium', 'published', true),
(1, 4, 17, 'Modalidades na Lei 14.133/2021?', '1. Pregão\n2. Concorrência\n3. Concurso\n4. Leilão\n5. Diálogo competitivo\n\nExtintas: tomada de preços e convite', 'medium', 'published', true),
(1, 4, 18, 'Quais são os poderes administrativos?', '1. Poder Vinculado\n2. Poder Discricionário\n3. Poder Hierárquico\n4. Poder Disciplinar\n5. Poder Regulamentar\n6. Poder de Polícia', 'medium', 'published', true),
-- Direitos Humanos
(1, 5, 19, 'Quais são as gerações de direitos humanos?', '1ª Geração: Direitos civis e políticos (liberdade)\n2ª Geração: Direitos sociais, econômicos e culturais (igualdade)\n3ª Geração: Direitos difusos e coletivos (fraternidade)\n4ª Geração: Direitos tecnológicos (pluralismo)', 'medium', 'published', true),
(1, 5, 20, 'Órgãos do Sistema Interamericano de DH?', '1. Comissão Interamericana (sede: Washington)\n   - Recebe petições individuais\n   - Emite recomendações\n\n2. Corte Interamericana (sede: San José)\n   - Jurisdição contenciosa e consultiva\n   - Sentenças vinculantes', 'medium', 'published', true),
(1, 5, 21, 'Características da DUDH de 1948?', '• Resolução da Assembleia Geral da ONU\n• Não é tratado (soft law)\n• 30 artigos\n• Universalidade dos direitos\n• Indivisibilidade\n• Interdependência', 'easy', 'published', true),
(1, 5, 22, 'Quando o Brasil ratificou o Pacto de San José?', '• Assinado em 1969\n• Brasil ratificou em 1992\n• Aceitou a jurisdição da Corte IDH em 1998\n• Internalizado pelo Decreto 678/92', 'medium', 'published', true),
-- Português
(1, 6, 23, 'Quando usar crase?', 'USAR quando:\n• Preposição ''a'' + artigo ''a'': Fui à escola\n• Antes de horas: Às 14 horas\n• Locuções femininas: À medida que\n\nNÃO USAR:\n• Antes de masculino\n• Antes de verbo\n• Antes de pronomes de tratamento\n• Antes de cidade sem determinante', 'medium', 'published', true),
(1, 6, 24, 'Verbo "haver" no sentido de existir?', 'IMPESSOAL: fica na 3ª pessoa do singular\n\n✅ Havia muitas pessoas\n❌ Haviam muitas pessoas\n\n✅ Deve haver soluções\n❌ Devem haver soluções', 'easy', 'published', true),
(1, 6, 25, 'Quando usar próclise, mesóclise e ênclise?', 'PRÓCLISE (antes): palavra negativa, pronome relativo, conjunção subordinativa\n\nMESOCLISE (meio): verbo no futuro do presente ou futuro do pretérito\n\nÊNCLISE (depois): início de frase, após pausa, imperativo afirmativo', 'hard', 'published', true),
(1, 6, 26, 'Diferença entre metáfora e comparação?', 'METÁFORA: comparação implícita (sem ''como'')\n  Ex: ''A vida é uma viagem''\n\nCOMPARAÇÃO: comparação explícita (com ''como'')\n  Ex: ''A vida é como uma viagem''', 'easy', 'published', true);

-- =========================================================
-- 9. RESUMOS (conteúdo markdown estruturado)
-- =========================================================
INSERT INTO public.summaries (edict_id, subject_id, topic_id, title, format, content_markdown, sort_order, status, is_active) VALUES
-- Direito Penal
(1, 1, 1, 'Teoria do Crime', 'markdown', E'# Teoria do Crime\n\n## Conceito de Crime\nCrime é o **fato típico, ilícito e culpável** (conceito tripartido).\n\n**Fato típico**: conduta + resultado + nexo causal + tipicidade.\n**Ilicitude**: contrariedade ao ordenamento jurídico.\n**Culpabilidade**: juízo de reprovação sobre o agente.\n\n## Excludentes de Ilicitude (art. 23 CP)\n1. Estado de necessidade\n2. Legítima defesa\n3. Estrito cumprimento do dever legal\n4. Exercício regular de direito\n\n> ⚠️ O excesso (doloso ou culposo) é sempre punível.\n\n## Culpabilidade e Imputabilidade\n- **Menores de 18**: inimputáveis (presunção absoluta)\n- **Doença mental**: absolvição imprópria\n- **Embriaguez voluntária**: NÃO exclui imputabilidade', 1, 'published', true),

(1, 1, 3, 'Crimes contra a Pessoa', 'markdown', E'# Crimes contra a Pessoa\n\n## Homicídio (art. 121)\n- **Simples**: 6 a 20 anos\n- **Qualificado**: 12 a 30 anos (hediondo)\n- **Feminicídio**: qualificadora (Lei 13.104/2015)\n- **Culposo**: 1 a 3 anos\n\n## Lesão Corporal (art. 129)\n- **Leve**: 3 meses a 1 ano\n- **Grave**: incapacidade >30 dias, perigo de vida\n- **Gravíssima**: incapacidade permanente, perda de membro', 2, 'published', true),

(1, 1, 4, 'Crimes contra o Patrimônio', 'markdown', E'# Crimes contra o Patrimônio\n\n## Furto (art. 155)\nSubtração sem violência — 1 a 4 anos.\n\n## Roubo (art. 157)\nSubtração com violência ou grave ameaça — 4 a 10 anos.\n\n## Latrocínio (art. 157, §3º)\nRoubo + morte — 20 a 30 anos (hediondo).\n\n## Estelionato (art. 171)\nVantagem ilícita por fraude — 1 a 5 anos.', 3, 'published', true),

-- Direito Constitucional
(1, 2, 7, 'Princípios Fundamentais', 'markdown', E'# Princípios Fundamentais\n\n## Fundamentos da República (Art. 1º)\nMnemônico: **SO-CI-DI-VA-PLU**\n- Soberania\n- Cidadania\n- Dignidade da pessoa humana\n- Valores sociais do trabalho e da livre iniciativa\n- Pluralismo político\n\n## Objetivos Fundamentais (Art. 3º)\nMnemônico: **CON-GA-ER-PRO**\n- Construir sociedade livre, justa e solidária\n- Garantir o desenvolvimento nacional\n- Erradicar pobreza e desigualdades\n- Promover o bem de todos', 1, 'published', true),

(1, 2, 8, 'Direitos e Garantias Fundamentais', 'markdown', E'# Direitos e Garantias Fundamentais\n\n## Art. 5º — Direitos Individuais\nGarantias: vida, liberdade, igualdade, segurança, propriedade.\n\n### Remédios Constitucionais\n- **Habeas Corpus**: locomoção\n- **Habeas Data**: dados pessoais\n- **Mandado de Segurança**: direito líquido e certo\n- **Mandado de Injunção**: falta de norma\n- **Ação Popular**: patrimônio público\n\n### Crimes especiais\n- Racismo: inafiançável + **imprescritível**\n- Tortura/tráfico/terrorismo: inafiançáveis', 2, 'published', true),

(1, 2, 10, 'Segurança Pública', 'markdown', E'# Segurança Pública (Art. 144)\n\nÓrgãos:\n- **Polícia Federal**: polícia judiciária da União\n- **PRF**: patrulhamento de rodovias federais\n- **Polícia Civil**: polícia judiciária dos estados\n- **Polícia Militar**: ostensiva e ordem pública\n- **Polícias Penais**: segurança de presídios\n\n> Guardas municipais protegem bens e serviços do Município.', 3, 'published', true),

-- Legislação Especial
(1, 3, 11, 'Lei Maria da Penha', 'markdown', E'# Lei Maria da Penha (11.340/2006)\n\n## Formas de Violência (Art. 7º)\n1. Física\n2. Psicológica (crime autônomo desde 2021)\n3. Sexual\n4. Patrimonial\n5. Moral\n\n## Medidas Protetivas\n- Afastamento do lar\n- Proibição de aproximação\n- Descumprimento é **crime** (art. 24-A)', 1, 'published', true),

(1, 3, 13, 'Lei de Drogas', 'markdown', E'# Lei de Drogas (11.343/2006)\n\n## Uso (art. 28)\nSem pena privativa de liberdade.\nPenas: advertência, serviço comunitário.\n\n## Tráfico (art. 33)\n5 a 15 anos — hediondo.\n\n## Tráfico privilegiado (§4º)\nPrimário + bons antecedentes → redução de 1/6 a 2/3.\n**NÃO é hediondo** (STF).', 2, 'published', true),

-- Direito Administrativo
(1, 4, 15, 'Princípios da Administração Pública', 'markdown', E'# Princípios da Administração Pública\n\n## LIMPE (Art. 37 CF)\n- **L**egalidade\n- **I**mpessoalidade\n- **M**oralidade\n- **P**ublicidade\n- **E**ficiência (EC 19/1998)\n\n## Princípios Implícitos\nRazoabilidade, proporcionalidade, autotutela, motivação, segurança jurídica.', 1, 'published', true),

(1, 4, 16, 'Atos Administrativos', 'markdown', E'# Atos Administrativos\n\n## Elementos (CO-FI-FO-MO-OB)\n- **Competência**: quem pode praticar\n- **Finalidade**: interesse público\n- **Forma**: como se exterioriza\n- **Motivo**: pressupostos de fato e direito\n- **Objeto**: conteúdo do ato\n\n## Atributos\n1. Presunção de legitimidade\n2. Autoexecutoriedade\n3. Imperatividade\n4. Tipicidade', 2, 'published', true),

-- Direitos Humanos
(1, 5, 21, 'Declaração Universal dos Direitos Humanos', 'markdown', E'# DUDH (1948)\n\n- 30 artigos\n- Resolução da ONU (soft law)\n- Universalidade, indivisibilidade, interdependência\n\nArt. 1º: "Todos nascem livres e iguais em dignidade e direitos."', 1, 'published', true),

(1, 5, 20, 'Sistema Interamericano de DH', 'markdown', E'# Sistema Interamericano\n\n## Comissão (Washington)\n- Recebe petições individuais\n- Recomendações não vinculantes\n\n## Corte (San José)\n- Sentenças vinculantes\n- Brasil desde 1998\n\n## Pacto de San José (CADH)\n- Ratificado pelo Brasil em 1992\n- Decreto 678/92', 2, 'published', true),

-- Português
(1, 6, 24, 'Concordância Verbal', 'markdown', E'# Concordância Verbal\n\n## Regras Essenciais\n- Haver (existir): impessoal → singular\n- Fazer (tempo): impessoal → singular\n- Sujeito composto antes do verbo: plural\n- QUE: concorda com antecedente\n- QUEM: 3ª pessoa do singular', 1, 'published', true),

(1, 6, 23, 'Crase', 'markdown', E'# Crase\n\nUsa crase:\n- Antes de femininos com artigo: *Fui à escola*\n- Antes de horas: *Às 14h*\n- Locuções femininas: *à medida que*\n\nNão usa:\n- Antes de masculino, verbo ou pronome\n- Dica: troque por masculino → se "ao" aparece, há crase', 2, 'published', true);

-- =========================================================
-- 10. NÍVEIS DE GAMIFICAÇÃO
-- =========================================================
INSERT INTO public.levels (level_number, title, min_xp) VALUES
  (1, 'Recruta', 0),
  (2, 'Soldado', 200),
  (3, 'Cabo', 500),
  (4, 'Sargento', 1000),
  (5, 'Subtenente', 2000),
  (6, 'Tenente', 3500),
  (7, 'Capitão', 5500),
  (8, 'Major', 8000),
  (9, 'Coronel', 12000),
  (10, 'Delegado', 18000)
ON CONFLICT DO NOTHING;

-- =========================================================
-- 11. CONQUISTAS
-- =========================================================
INSERT INTO public.achievements (code, title, description, achievement_type, xp_reward, is_active) VALUES
  ('first_question', 'Primeira Questão', 'Respondeu sua primeira questão', 'questions', 10, true),
  ('ten_streak', '10 Acertos Seguidos', 'Acertou 10 questões seguidas', 'accuracy', 50, true),
  ('hundred_questions', '100 Questões', 'Respondeu 100 questões', 'questions', 100, true),
  ('week_streak', 'Semana Firme', 'Estudou 7 dias seguidos', 'streak', 75, true),
  ('first_mock', 'Primeiro Simulado', 'Completou seu primeiro simulado', 'simulados', 50, true),
  ('ninety_percent', 'Excelência', 'Atingiu 90% em uma matéria', 'accuracy', 100, true),
  ('fifty_flashcards', '50 Flashcards', 'Revisou 50 flashcards', 'flashcards', 50, true),
  ('all_summaries', 'Leitor Completo', 'Leu todos os resumos de uma matéria', 'summaries', 75, true)
ON CONFLICT DO NOTHING;

-- =========================================================
-- 12. MENSAGENS MOTIVACIONAIS
-- =========================================================
INSERT INTO public.motivational_messages (title, message) VALUES
  ('Continue firme!', 'Cada questão respondida é um passo mais perto da aprovação.'),
  ('Disciplina vence talento', 'Quem estuda todos os dias supera quem estuda só quando quer.'),
  ('Não desista!', 'Os concurseiros que passam são os que não pararam de estudar.'),
  ('Foco no edital', 'Estude o que cai, não o que gosta. A aprovação está no edital.'),
  ('Revisão é chave', 'Quem revisa retém. Quem não revisa esquece.'),
  ('Você consegue!', 'A farda está mais perto do que você imagina. Continue!')
ON CONFLICT DO NOTHING;
