import { Flashcard } from "@/types/study";

export const flashcards: Flashcard[] = [
  // === DIREITO PENAL ===
  { id: "f1", subjectId: "1", topic: "Excludentes de Ilicitude", front: "Quais são as excludentes de ilicitude previstas no art. 23 do CP?", back: "1. Estado de necessidade\n2. Legítima defesa\n3. Estrito cumprimento do dever legal\n4. Exercício regular de direito" },
  { id: "f2", subjectId: "1", topic: "Crimes contra a Administração", front: "Diferença entre corrupção ativa e passiva?", back: "PASSIVA (art. 317): Funcionário público solicita ou recebe vantagem indevida.\n\nATIVA (art. 333): Particular oferece ou promete vantagem indevida ao funcionário." },
  { id: "f3", subjectId: "1", topic: "Teoria do Crime", front: "Quais os elementos do fato típico?", back: "1. Conduta (ação ou omissão)\n2. Resultado\n3. Nexo causal\n4. Tipicidade" },
  { id: "f4", subjectId: "1", topic: "Penas", front: "Quais os regimes de cumprimento de pena?", back: "FECHADO: pena > 8 anos\nSEMIABERTO: pena > 4 e ≤ 8 anos\nABERTO: pena ≤ 4 anos\n\n(Para réu primário, art. 33 CP)" },

  // === DIREITO CONSTITUCIONAL ===
  { id: "f5", subjectId: "2", topic: "Princípios Fundamentais", front: "Fundamentos da República (Art. 1º CF)?", back: "I - Soberania\nII - Cidadania\nIII - Dignidade da pessoa humana\nIV - Valores sociais do trabalho e da livre iniciativa\nV - Pluralismo político\n\nMnemônico: SO-CI-DI-VA-PLU" },
  { id: "f6", subjectId: "2", topic: "Princípios Fundamentais", front: "Objetivos fundamentais da República (Art. 3º CF)?", back: "I - Construir uma sociedade livre, justa e solidária\nII - Garantir o desenvolvimento nacional\nIII - Erradicar a pobreza e reduzir desigualdades\nIV - Promover o bem de todos, sem preconceitos\n\nMnemônico: CON-GA-ER-PRO" },
  { id: "f7", subjectId: "2", topic: "Remédios Constitucionais", front: "Quais são os remédios constitucionais?", back: "1. Habeas Corpus (liberdade de locomoção)\n2. Habeas Data (dados pessoais)\n3. Mandado de Segurança (direito líquido e certo)\n4. Mandado de Injunção (falta de norma regulamentadora)\n5. Ação Popular (ato lesivo ao patrimônio público)" },
  { id: "f8", subjectId: "2", topic: "Segurança Pública", front: "Órgãos de segurança pública (Art. 144 CF)?", back: "I - Polícia Federal\nII - Polícia Rodoviária Federal\nIII - Polícias Civis\nIV - Polícias Militares e Corpos de Bombeiros\nV - Polícias Penais" },

  // === LEGISLAÇÃO ESPECIAL ===
  { id: "f9", subjectId: "3", topic: "Lei Maria da Penha", front: "Formas de violência na Lei Maria da Penha?", back: "Art. 7º da Lei 11.340/2006:\n1. Física\n2. Psicológica\n3. Sexual\n4. Patrimonial\n5. Moral" },
  { id: "f10", subjectId: "3", topic: "ECA", front: "Diferença entre criança e adolescente no ECA?", back: "CRIANÇA: até 12 anos incompletos\nADOLESCENTE: de 12 a 18 anos\n\n(Art. 2º da Lei 8.069/90)" },
  { id: "f11", subjectId: "3", topic: "Lei de Drogas", front: "Penas para uso pessoal de drogas (Art. 28)?", back: "NÃO há pena privativa de liberdade!\n\nPenas:\n1. Advertência sobre efeitos\n2. Prestação de serviços à comunidade\n3. Medida educativa de comparecimento a programa" },
  { id: "f12", subjectId: "3", topic: "Crimes Hediondos", front: "Quais crimes são hediondos?", back: "Rol da Lei 8.072/90:\n• Homicídio qualificado\n• Latrocínio\n• Extorsão qualificada\n• Estupro\n• Estupro de vulnerável\n• Epidemia com resultado morte\n• Genocídio\n• E outros..." },

  // === DIREITO ADMINISTRATIVO ===
  { id: "f13", subjectId: "4", topic: "Princípios", front: "Princípios expressos (LIMPE)?", back: "L - Legalidade\nI - Impessoalidade\nM - Moralidade\nP - Publicidade\nE - Eficiência\n\n(Art. 37, caput, CF/88)" },
  { id: "f14", subjectId: "4", topic: "Atos Administrativos", front: "Elementos do ato administrativo?", back: "1. Competência (CO)\n2. Finalidade (FI)\n3. Forma (FO)\n4. Motivo (MO)\n5. Objeto (OB)\n\nMnemônico: CO-FI-FO-MO-OB" },
  { id: "f15", subjectId: "4", topic: "Licitação", front: "Modalidades na Lei 14.133/2021?", back: "1. Pregão\n2. Concorrência\n3. Concurso\n4. Leilão\n5. Diálogo competitivo\n\nExtintas: tomada de preços e convite" },
  { id: "f16", subjectId: "4", topic: "Poderes Administrativos", front: "Quais são os poderes administrativos?", back: "1. Poder Vinculado\n2. Poder Discricionário\n3. Poder Hierárquico\n4. Poder Disciplinar\n5. Poder Regulamentar\n6. Poder de Polícia" },

  // === DIREITOS HUMANOS ===
  { id: "f17", subjectId: "5", topic: "Gerações de Direitos", front: "Quais são as gerações de direitos humanos?", back: "1ª Geração: Direitos civis e políticos (liberdade)\n2ª Geração: Direitos sociais, econômicos e culturais (igualdade)\n3ª Geração: Direitos difusos e coletivos (fraternidade)\n4ª Geração: Direitos tecnológicos (pluralismo)" },
  { id: "f18", subjectId: "5", topic: "Sistema Interamericano", front: "Órgãos do Sistema Interamericano de DH?", back: "1. Comissão Interamericana (sede: Washington)\n   - Recebe petições individuais\n   - Emite recomendações\n\n2. Corte Interamericana (sede: San José)\n   - Jurisdição contenciosa e consultiva\n   - Sentenças vinculantes" },
  { id: "f19", subjectId: "5", topic: "DUDH", front: "Características da DUDH de 1948?", back: "• Resolução da Assembleia Geral da ONU\n• Não é tratado (soft law)\n• 30 artigos\n• Universalidade dos direitos\n• Indivisibilidade\n• Interdependência" },
  { id: "f20", subjectId: "5", topic: "Pacto de San José", front: "Quando o Brasil ratificou o Pacto de San José?", back: "• Assinado em 1969\n• Brasil ratificou em 1992\n• Aceitou a jurisdição da Corte IDH em 1998\n• Internalizado pelo Decreto 678/92" },

  // === PORTUGUÊS ===
  { id: "f21", subjectId: "6", topic: "Crase", front: "Quando usar crase?", back: "USAR quando:\n• Preposição 'a' + artigo 'a': Fui à escola\n• Antes de horas: Às 14 horas\n• Locuções femininas: À medida que\n\nNÃO USAR:\n• Antes de masculino\n• Antes de verbo\n• Antes de pronomes de tratamento\n• Antes de cidade sem determinante" },
  { id: "f22", subjectId: "6", topic: "Concordância", front: "Verbo 'haver' no sentido de existir?", back: "IMPESSOAL: fica na 3ª pessoa do singular\n\n✅ Havia muitas pessoas\n❌ Haviam muitas pessoas\n\n✅ Deve haver soluções\n❌ Devem haver soluções" },
  { id: "f23", subjectId: "6", topic: "Pronomes", front: "Quando usar próclise, mesóclise e ênclise?", back: "PRÓCLISE (antes): palavra negativa, pronome relativo, conjunção subordinativa\n\nMESOCLISE (meio): verbo no futuro do presente ou futuro do pretérito\n\nÊNCLISE (depois): início de frase, após pausa, imperativo afirmativo" },
  { id: "f24", subjectId: "6", topic: "Figuras de Linguagem", front: "Diferença entre metáfora e comparação?", back: "METÁFORA: comparação implícita (sem 'como')\n  Ex: 'A vida é uma viagem'\n\nCOMPARAÇÃO: comparação explícita (com 'como')\n  Ex: 'A vida é como uma viagem'" },
];
