export interface ResumoSubtopic {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface ResumoTopic {
  id: string;
  subjectId: string;
  courseIds: string[];
  title: string;
  icon: string;
  subtopics: ResumoSubtopic[];
}

export const resumoTopics: ResumoTopic[] = [
  // ═══════════════════════════════════════
  // DIREITO PENAL (subjectId: 1)
  // ═══════════════════════════════════════
  {
    id: "r1", subjectId: "1", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Teoria do Crime", icon: "⚖️",
    subtopics: [
      {
        id: "r1s1", title: "Conceito de Crime",
        content: "Crime é o **fato típico, ilícito e culpável** (conceito tripartido — adotado pela maioria da doutrina e pelo STF).\n\n**Fato típico**: conduta + resultado + nexo causal + tipicidade.\n\n**Ilicitude (antijuridicidade)**: contrariedade ao ordenamento jurídico. Excluída pelas causas de justificação (art. 23 do CP).\n\n**Culpabilidade**: juízo de reprovação sobre o agente. Composta por imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa.\n\n> Pelo conceito **bipartido**, crime seria apenas fato típico e ilícito, sendo a culpabilidade pressuposto de aplicação da pena.",
        keyPoints: [
          "Crime = fato típico + ilícito + culpável (tripartido)",
          "Fato típico: conduta, resultado, nexo causal, tipicidade",
          "Culpabilidade: imputabilidade + consciência da ilicitude + exigibilidade de conduta diversa",
        ],
      },
      {
        id: "r1s2", title: "Excludentes de Ilicitude",
        content: "As **causas excludentes de ilicitude** estão previstas no **art. 23 do Código Penal**:\n\n**1. Estado de necessidade** (art. 24): sacrifício de um bem jurídico para salvar outro, de igual ou maior valor, em situação de perigo atual e inevitável.\n\n**2. Legítima defesa** (art. 25): reação proporcional a agressão injusta, atual ou iminente, a direito próprio ou de outrem.\n\n**3. Estrito cumprimento do dever legal**: agente público atua conforme determinação legal (ex: policial que efetua prisão em flagrante).\n\n**4. Exercício regular de direito**: exercício de atividade autorizada por lei (ex: intervenção cirúrgica pelo médico).\n\n> ⚠️ O **excesso** (doloso ou culposo) em qualquer excludente é punível (art. 23, parágrafo único).",
        keyPoints: [
          "4 excludentes: estado de necessidade, legítima defesa, estrito cumprimento, exercício regular",
          "Legítima defesa: agressão injusta, atual ou iminente",
          "Excesso é sempre punível (doloso ou culposo)",
        ],
      },
      {
        id: "r1s3", title: "Culpabilidade e Imputabilidade",
        content: "**Imputabilidade** é a capacidade de o agente entender o caráter ilícito do fato e determinar-se de acordo com esse entendimento.\n\n**Inimputáveis** (art. 26, caput):\n- Doença mental ou desenvolvimento mental incompleto/retardado\n- Consequência: absolvição imprópria (medida de segurança)\n\n**Semi-imputáveis** (art. 26, §único):\n- Capacidade reduzida\n- Pena reduzida de 1/3 a 2/3 ou medida de segurança\n\n**Menores de 18 anos** (art. 27): inimputáveis por presunção absoluta.\n\n**Embriaguez**:\n- Voluntária/culposa: NÃO exclui imputabilidade (actio libera in causa)\n- Fortuita/força maior completa: exclui\n- Patológica: tratada como doença mental",
        keyPoints: [
          "Menor de 18: inimputável (presunção absoluta)",
          "Doença mental → absolvição imprópria (medida de segurança)",
          "Embriaguez voluntária NÃO exclui imputabilidade",
        ],
      },
    ],
  },
  {
    id: "r2", subjectId: "1", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Crimes contra a Pessoa", icon: "👤",
    subtopics: [
      {
        id: "r2s1", title: "Homicídio (art. 121)",
        content: "**Homicídio simples** (art. 121, caput): pena de 6 a 20 anos de reclusão.\n\n**Homicídio privilegiado** (§1º): redução de 1/6 a 1/3 por motivo de relevante valor social ou moral, ou sob domínio de violenta emoção logo após injusta provocação.\n\n**Homicídio qualificado** (§2º) — Crime hediondo:\n- **I** — Mediante paga ou promessa de recompensa (torpeza)\n- **II** — Motivo fútil\n- **III** — Veneno, fogo, explosivo, asfixia, tortura ou meio insidioso/cruel\n- **IV** — Traição, emboscada, dissimulação\n- **V** — Para assegurar execução/impunidade de outro crime\n- **VI** — Feminicídio (contra mulher por razões da condição de sexo feminino)\n- **VII** — Contra autoridade (policiais, bombeiros, etc.)\n\n**Homicídio culposo** (§3º): 1 a 3 anos de detenção.\n\n> O **feminicídio** foi incluído pela Lei 13.104/2015 e é crime hediondo.",
        keyPoints: [
          "Simples: 6 a 20 anos | Qualificado: 12 a 30 anos",
          "Todas as qualificadoras são hediondas",
          "Feminicídio: Lei 13.104/2015 — razões de condição do sexo feminino",
          "Privilegiado é causa de diminuição, NÃO tipo autônomo",
        ],
      },
      {
        id: "r2s2", title: "Lesão Corporal (art. 129)",
        content: "**Lesão leve** (caput): 3 meses a 1 ano de detenção.\n\n**Lesão grave** (§1º):\n- Incapacidade para ocupações habituais por **mais de 30 dias**\n- Perigo de vida\n- Debilidade permanente de membro, sentido ou função\n- Aceleração do parto\n\n**Lesão gravíssima** (§2º):\n- Incapacidade permanente para o trabalho\n- Enfermidade incurável\n- Perda ou inutilização de membro, sentido ou função\n- Deformidade permanente\n- Aborto\n\n**Lesão corporal no contexto de violência doméstica** (§9º): pena de 3 meses a 3 anos.\n\n> A lesão leve é ação penal pública **condicionada** à representação (Lei 9.099/95), exceto em violência doméstica (incondicionada).",
        keyPoints: [
          "Grave: incapacidade > 30 dias, perigo de vida, debilidade permanente",
          "Gravíssima: incapacidade permanente, perda de membro, deformidade",
          "Violência doméstica: ação penal incondicionada",
        ],
      },
    ],
  },
  {
    id: "r3", subjectId: "1", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Crimes contra o Patrimônio", icon: "💰",
    subtopics: [
      {
        id: "r3s1", title: "Furto e Roubo",
        content: "**Furto (art. 155)**: subtrair coisa alheia móvel **sem violência ou grave ameaça**.\n- Simples: 1 a 4 anos + multa\n- Qualificado (§4º): destruição/rompimento de obstáculo, abuso de confiança, escalada, destreza, chave falsa, concurso de pessoas → 2 a 8 anos\n- Furto de veículo transportado para outro estado (§5º): 3 a 8 anos\n\n**Roubo (art. 157)**: subtrair mediante **violência ou grave ameaça**.\n- Simples: 4 a 10 anos + multa\n- Majorado (§2º): arma de fogo (+2/3), concurso de pessoas (+1/3 a 1/2), transporte de valores, veículo\n- Roubo com arma de fogo: 2/3 de aumento\n\n**Roubo impróprio** (§1º): violência **após** a subtração para assegurar a posse.\n\n**Latrocínio** (§3º): roubo + morte → **20 a 30 anos** (crime hediondo).\n\n> Distinção fundamental: **furto** = sem violência | **roubo** = com violência/ameaça.",
        keyPoints: [
          "Furto: sem violência → 1 a 4 anos",
          "Roubo: com violência → 4 a 10 anos",
          "Latrocínio: roubo + morte → 20 a 30 anos (hediondo)",
          "Roubo impróprio: violência APÓS a subtração",
        ],
      },
      {
        id: "r3s2", title: "Extorsão e Estelionato",
        content: "**Extorsão (art. 158)**: constranger alguém, mediante violência ou grave ameaça, a fazer/tolerar/deixar de fazer algo, com o intuito de obter vantagem econômica.\n- Pena: 4 a 10 anos + multa\n- Crime **formal** (consuma-se com o constrangimento)\n\n**Extorsão mediante sequestro (art. 159)**:\n- Simples: 8 a 15 anos\n- Qualificada: se dura mais de 24h, se menor de 18 ou maior de 60, se resulta lesão grave ou morte\n- **Crime hediondo**\n\n**Estelionato (art. 171)**: obter vantagem ilícita mediante **artifício, ardil ou qualquer meio fraudulento**, induzindo ou mantendo alguém em erro.\n- Pena: 1 a 5 anos + multa\n- Ação penal condicionada à representação (regra geral, após Lei 13.964/2019)\n\n> No estelionato, a vítima entrega o bem **voluntariamente** (por erro). No furto mediante fraude, a fraude serve para diminuir a vigilância.",
        keyPoints: [
          "Extorsão: crime formal — consuma com o constrangimento",
          "Extorsão mediante sequestro: sempre hediondo",
          "Estelionato: vítima entrega o bem voluntariamente (por erro)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  // DIREITO CONSTITUCIONAL (subjectId: 2)
  // ═══════════════════════════════════════
  {
    id: "r4", subjectId: "2", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Princípios Fundamentais", icon: "📜",
    subtopics: [
      {
        id: "r4s1", title: "Fundamentos da República (Art. 1º)",
        content: "A República Federativa do Brasil tem como **fundamentos** (mnemônico **SO-CI-DI-VA-PLU**):\n\n**I — Soberania**: poder supremo do Estado no plano interno e independência no externo.\n\n**II — Cidadania**: participação ativa do indivíduo na vida política do Estado.\n\n**III — Dignidade da pessoa humana**: valor supremo que norteia todos os demais direitos.\n\n**IV — Valores sociais do trabalho e da livre iniciativa**: equilíbrio entre o capital e o trabalho.\n\n**V — Pluralismo político**: respeito à diversidade de ideias e partidos.\n\n> ⚠️ A **dignidade da pessoa humana** é considerada o princípio mais importante, funcionando como vetor interpretativo de todo o ordenamento jurídico.",
        keyPoints: [
          "Mnemônico: SO-CI-DI-VA-PLU",
          "Dignidade da pessoa humana: princípio vetor de todo o ordenamento",
          "São FUNDAMENTOS, não objetivos",
        ],
      },
      {
        id: "r4s2", title: "Objetivos Fundamentais (Art. 3º)",
        content: "Constituem **objetivos fundamentais** (mnemônico **CON-GA-ER-PRO**):\n\n**I — Construir** uma sociedade livre, justa e solidária.\n\n**II — Garantir** o desenvolvimento nacional.\n\n**III — Erradicar** a pobreza e a marginalização e reduzir as desigualdades sociais e regionais.\n\n**IV — Promover** o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.\n\n> Todos os verbos estão no **infinitivo** (construir, garantir, erradicar, promover) — indicam metas a serem alcançadas.",
        keyPoints: [
          "Mnemônico: CON-GA-ER-PRO",
          "São OBJETIVOS (metas), não fundamentos",
          "Verbos no infinitivo indicam programas a cumprir",
        ],
      },
    ],
  },
  {
    id: "r5", subjectId: "2", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Direitos e Garantias Fundamentais", icon: "🛡️",
    subtopics: [
      {
        id: "r5s1", title: "Art. 5º — Direitos Individuais",
        content: "**Caput**: todos são iguais perante a lei, garantindo-se aos brasileiros e estrangeiros residentes a inviolabilidade do direito à **vida, liberdade, igualdade, segurança e propriedade** (mnemônico **VI-LI-I-SE-PRO**).\n\n**Principais incisos cobrados**:\n\n- **I**: Homens e mulheres são iguais em direitos e obrigações\n- **II**: Ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei (legalidade)\n- **III**: Proibição de tortura e tratamento desumano\n- **IV**: Livre manifestação do pensamento, vedado o anonimato\n- **X**: Inviolabilidade da intimidade, vida privada, honra e imagem\n- **XI**: Casa como asilo inviolável (dia: mandado judicial; noite: flagrante, desastre, socorro)\n- **XLII**: Racismo = inafiançável e **imprescritível**\n- **XLIII**: Tortura, tráfico e terrorismo = inafiançável e insuscetível de graça\n- **XLIV**: Ação de grupos armados contra o Estado = inafiançável e **imprescritível**",
        keyPoints: [
          "Direitos do caput: vida, liberdade, igualdade, segurança, propriedade",
          "Racismo e ação de grupos armados: inafiançáveis + IMPRESCRITÍVEIS",
          "Tortura/tráfico/terrorismo: inafiançáveis + insuscetíveis de graça (mas prescritíveis)",
          "Casa à noite: só flagrante, desastre ou socorro",
        ],
      },
      {
        id: "r5s2", title: "Remédios Constitucionais",
        content: "São garantias instrumentais para proteção dos direitos fundamentais:\n\n**Habeas Corpus** (art. 5º, LXVIII): protege o **direito de locomoção** (ir e vir).\n- Preventivo (salvo-conduto) ou repressivo (liberatório)\n- Gratuito\n\n**Habeas Data** (art. 5º, LXXII): acesso/retificação de **dados pessoais** em registros públicos.\n- Exige prova de recusa administrativa prévia (Súmula 2 do STJ)\n\n**Mandado de Segurança** (art. 5º, LXIX): protege **direito líquido e certo** não amparado por HC ou HD.\n- Individual ou coletivo\n- Prazo: 120 dias da ciência do ato\n\n**Mandado de Injunção** (art. 5º, LXXI): falta de **norma regulamentadora** que inviabilize exercício de direitos.\n\n**Ação Popular** (art. 5º, LXXIII): qualquer **cidadão** pode ajuizar para anular ato lesivo ao patrimônio público, moralidade administrativa, meio ambiente, patrimônio histórico/cultural.",
        keyPoints: [
          "HC: locomoção | HD: dados pessoais | MS: direito líquido e certo",
          "MI: falta de norma regulamentadora",
          "Ação popular: legitimidade de qualquer cidadão",
          "HC e HD são gratuitos",
        ],
      },
    ],
  },
  {
    id: "r6", subjectId: "2", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Segurança Pública", icon: "🚨",
    subtopics: [
      {
        id: "r6s1", title: "Art. 144 da CF — Órgãos de Segurança",
        content: "A segurança pública é **dever do Estado**, **direito e responsabilidade de todos**, exercida para preservação da ordem pública e da incolumidade das pessoas e do patrimônio, através de:\n\n**I — Polícia Federal**: apurar infrações penais contra a União, tráfico interestadual/internacional de drogas, contrabando, descaminho, polícia marítima, aeroportuária e de fronteiras.\n\n**II — Polícia Rodoviária Federal**: patrulhamento ostensivo das rodovias federais.\n\n**III — Polícia Ferroviária Federal**: patrulhamento ostensivo das ferrovias federais.\n\n**IV — Polícias Civis**: funções de polícia judiciária e apuração de infrações penais (exceto militares), dirigidas por Delegados de Polícia de carreira.\n\n**V — Polícias Militares e CBM**: polícia ostensiva e preservação da ordem pública (PMs) e atividades de defesa civil (CBMs).\n\n**VI — Polícias Penais**: segurança dos estabelecimentos penais.\n\n> As guardas municipais podem ser instituídas para proteção de bens, serviços e instalações do Município (§8º).",
        keyPoints: [
          "PF: polícia judiciária da União + fronteiras + tráfico interestadual",
          "PRF: patrulhamento ostensivo de rodovias federais",
          "PM: polícia ostensiva e preservação da ordem pública",
          "PC: polícia judiciária dos estados",
          "Guardas municipais: proteção de bens e serviços municipais",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  // LEGISLAÇÃO ESPECIAL (subjectId: 3)
  // ═══════════════════════════════════════
  {
    id: "r7", subjectId: "3", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Lei Maria da Penha", icon: "🏠",
    subtopics: [
      {
        id: "r7s1", title: "Formas de Violência (Art. 7º)",
        content: "A **Lei 11.340/2006** define **5 formas de violência** doméstica e familiar contra a mulher:\n\n**I — Física**: qualquer conduta que ofenda a integridade ou saúde corporal.\n\n**II — Psicológica**: conduta que cause dano emocional, diminuição da autoestima, controle de ações, vigilância constante, perseguição, insulto, chantagem.\n\n**III — Sexual**: conduta que constranja a presenciar, manter ou participar de relação sexual não desejada.\n\n**IV — Patrimonial**: retenção, subtração, destruição de bens, documentos, instrumentos de trabalho, recursos econômicos.\n\n**V — Moral**: calúnia, difamação ou injúria.\n\n> A violência **psicológica** foi tipificada como crime autônomo (art. 147-B do CP) pela Lei 14.188/2021.",
        keyPoints: [
          "5 formas: física, psicológica, sexual, patrimonial, moral",
          "Violência psicológica: crime autônomo desde 2021 (art. 147-B CP)",
          "Não depende de coabitação — basta relação íntima de afeto",
        ],
      },
      {
        id: "r7s2", title: "Medidas Protetivas de Urgência",
        content: "**Medidas que obrigam o agressor** (art. 22):\n- Suspensão da posse ou restrição do porte de armas\n- Afastamento do lar\n- Proibição de aproximação e contato\n- Restrição de visitas aos dependentes\n- Prestação de alimentos provisionais\n\n**Medidas à ofendida** (art. 23):\n- Encaminhamento a programa de proteção\n- Recondução ao domicílio após afastamento do agressor\n- Afastamento do lar sem prejuízo dos direitos\n\n> As medidas podem ser concedidas **de imediato**, independentemente de audiência das partes e de manifestação do MP (art. 19).\n\n> O descumprimento de medida protetiva configura **crime** (art. 24-A), com pena de detenção de 3 meses a 2 anos.",
        keyPoints: [
          "Juiz pode conceder de imediato, sem audiência",
          "Descumprimento é CRIME (art. 24-A) — 3 meses a 2 anos",
          "Inclui afastamento do lar, proibição de aproximação, suspensão de armas",
        ],
      },
    ],
  },
  {
    id: "r8", subjectId: "3", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Lei de Drogas", icon: "💊",
    subtopics: [
      {
        id: "r8s1", title: "Uso × Tráfico",
        content: "**Uso pessoal (art. 28)** — NÃO tem pena privativa de liberdade:\n- Advertência sobre efeitos\n- Prestação de serviços à comunidade\n- Medida educativa\n\n**Tráfico (art. 33)** — pena de **5 a 15 anos** + multa:\n- Importar, exportar, vender, oferecer, transportar, guardar, prescrever, ministrar, entregar ou fornecer drogas\n- Crime **equiparado a hediondo**\n- Inafiançável e insuscetível de sursis, graça, indulto e liberdade provisória (com ressalvas jurisprudenciais)\n\n**Tráfico privilegiado (§4º)**:\n- Agente **primário**, de **bons antecedentes**, que **não integre organização criminosa**\n- Redução de 1/6 a 2/3\n- **NÃO é hediondo** (STF – HC 118.533)\n\n> A distinção entre uso e tráfico considera: natureza e quantidade da droga, local, condições, circunstâncias sociais, conduta, antecedentes (art. 28, §2º).",
        keyPoints: [
          "Uso: sem prisão (advertência, serviço comunitário, medida educativa)",
          "Tráfico: 5 a 15 anos (hediondo)",
          "Tráfico privilegiado: NÃO é hediondo (STF)",
          "Critérios de distinção: quantidade, local, circunstâncias, antecedentes",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  // DIREITO ADMINISTRATIVO (subjectId: 4)
  // ═══════════════════════════════════════
  {
    id: "r9", subjectId: "4", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Princípios da Administração Pública", icon: "🏛️",
    subtopics: [
      {
        id: "r9s1", title: "Princípios Expressos (LIMPE)",
        content: "O **art. 37, caput da CF/88** estabelece 5 princípios expressos (mnemônico **LIMPE**):\n\n**L — Legalidade**: a Administração só pode agir conforme a lei (diferente do particular que pode fazer tudo que a lei não proíbe).\n\n**I — Impessoalidade**: atuação voltada ao interesse público, sem favorecimentos. Os atos são do órgão, não do agente.\n\n**M — Moralidade**: observância de padrões éticos, probidade, boa-fé e honestidade.\n\n**P — Publicidade**: transparência dos atos administrativos. Exceções: segurança do Estado e intimidade.\n\n**E — Eficiência**: buscar os melhores resultados com os meios disponíveis. Incluído pela EC 19/1998 (Reforma Administrativa).\n\n> **Princípios implícitos** mais cobrados: razoabilidade, proporcionalidade, supremacia do interesse público, motivação, segurança jurídica, autotutela.",
        keyPoints: [
          "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência",
          "Eficiência foi incluída pela EC 19/1998",
          "Legalidade administrativa ≠ legalidade privada",
          "Implícitos: razoabilidade, proporcionalidade, autotutela",
        ],
      },
    ],
  },
  {
    id: "r10", subjectId: "4", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Atos Administrativos", icon: "📋",
    subtopics: [
      {
        id: "r10s1", title: "Elementos e Atributos",
        content: "**Elementos** (mnemônico **CO-FI-FO-MO-OB**):\n\n**CO — Competência**: quem pode praticar o ato. Irrenunciável e improrrogável.\n\n**FI — Finalidade**: sempre o interesse público (específico ou genérico).\n\n**FO — Forma**: como o ato se exterioriza (em regra, escrito).\n\n**MO — Motivo**: pressupostos de fato e de direito que justificam o ato.\n\n**OB — Objeto**: conteúdo do ato (o que ele determina/declara).\n\n---\n\n**Atributos dos atos administrativos**:\n\n1. **Presunção de legitimidade**: todo ato se presume válido até prova em contrário (relativa — juris tantum).\n\n2. **Autoexecutoriedade**: a Administração executa sem precisar do Judiciário (nem todos os atos têm — ex: multa).\n\n3. **Imperatividade**: impõe obrigações unilateralmente (poder extroverso).\n\n4. **Tipicidade**: cada ato deve corresponder a uma figura prevista em lei.",
        keyPoints: [
          "Elementos: CO-FI-FO-MO-OB",
          "Motivo e objeto = elementos discricionários (mérito administrativo)",
          "Competência, finalidade e forma = sempre vinculados",
          "Presunção de legitimidade é relativa (juris tantum)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  // DIREITOS HUMANOS (subjectId: 5)
  // ═══════════════════════════════════════
  {
    id: "r11", subjectId: "5", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Declaração Universal dos Direitos Humanos", icon: "🌍",
    subtopics: [
      {
        id: "r11s1", title: "Características e Conteúdo",
        content: "A **DUDH** foi proclamada em **10 de dezembro de 1948** pela Assembleia Geral da ONU.\n\n**Características**:\n- **Não é tratado** (resolução — soft law), mas tem força moral e influência jurídica\n- **30 artigos**\n- **Universalidade**: aplica-se a todos os seres humanos\n- **Indivisibilidade**: direitos civis, políticos, sociais, econômicos e culturais são igualmente importantes\n- **Interdependência**: um direito depende do outro para sua realização\n\n**Estrutura**:\n- Arts. 1-2: princípios gerais (liberdade, igualdade, não-discriminação)\n- Arts. 3-21: direitos civis e políticos\n- Arts. 22-27: direitos econômicos, sociais e culturais\n- Arts. 28-30: disposições gerais\n\n> Art. 1º: \"Todos os seres humanos nascem **livres e iguais** em dignidade e direitos.\"",
        keyPoints: [
          "Aprovada em 10/12/1948 pela Assembleia Geral da ONU",
          "Não é tratado (resolução) — soft law",
          "30 artigos, universalidade, indivisibilidade, interdependência",
          "Art. 1º: 'livres e iguais em dignidade e direitos'",
        ],
      },
    ],
  },
  {
    id: "r12", subjectId: "5", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Sistema Interamericano de DH", icon: "🌎",
    subtopics: [
      {
        id: "r12s1", title: "Comissão e Corte Interamericana",
        content: "**Comissão Interamericana de Direitos Humanos** (sede: Washington):\n- Recebe **petições individuais** (qualquer pessoa pode peticionar)\n- Emite recomendações (não vinculantes)\n- Pode encaminhar casos à Corte\n- Realiza visitas in loco\n\n**Corte Interamericana de Direitos Humanos** (sede: San José, Costa Rica):\n- **Jurisdição contenciosa**: julga casos de violações (sentenças vinculantes)\n- **Jurisdição consultiva**: interpreta tratados\n- Só pode ser acionada pela **Comissão** ou por **Estados-partes**\n- Indivíduos NÃO podem acionar diretamente\n- Brasil reconheceu a jurisdição da Corte em **1998**\n\n**Pacto de San José da Costa Rica (CADH)**:\n- Assinado em 1969, ratificado pelo Brasil em 1992\n- Proíbe pena de morte para crimes políticos\n- Prisão civil: apenas depositário infiel (mas STF só admite para inadimplemento alimentar)",
        keyPoints: [
          "Comissão: recebe petições individuais, recomendações não vinculantes",
          "Corte: sentenças vinculantes, só acionada por Comissão ou Estados",
          "Brasil na Corte IDH desde 1998",
          "CADH: ratificada pelo Brasil em 1992",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  // PORTUGUÊS (subjectId: 6)
  // ═══════════════════════════════════════
  {
    id: "r13", subjectId: "6", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Concordância Verbal", icon: "📝",
    subtopics: [
      {
        id: "r13s1", title: "Regras Essenciais",
        content: "**Regra geral**: o verbo concorda com o sujeito em número e pessoa.\n\n**Casos especiais mais cobrados**:\n\n**1. Sujeito composto antes do verbo**: verbo no **plural**.\n- *Pedro e Maria __chegaram__ cedo.*\n\n**2. Sujeito composto após o verbo**: plural ou concorda com o mais próximo.\n- *Chegaram/Chegou Pedro e Maria.*\n\n**3. Verbo HAVER (sentido de existir)**: **impessoal** — sempre 3ª pessoa do singular.\n- ✅ *Havia muitas pessoas.* ❌ *Haviam muitas pessoas.*\n\n**4. Verbo FAZER (tempo/clima)**: **impessoal**.\n- ✅ *Faz dois anos.* ❌ *Fazem dois anos.*\n\n**5. Expressão partitiva + de**: verbo no singular ou plural.\n- *A maioria dos alunos chegou/chegaram.*\n\n**6. Pronome relativo QUE**: verbo concorda com o antecedente.\n- *Fui eu que __fiz__.* *Fomos nós que __fizemos__.*\n\n**7. Pronome relativo QUEM**: verbo na 3ª pessoa do singular.\n- *Fui eu quem __fez__.*",
        keyPoints: [
          "Haver (existir) e Fazer (tempo): sempre no SINGULAR",
          "Sujeito composto antes do verbo: PLURAL obrigatório",
          "QUE: concorda com antecedente | QUEM: 3ª pessoa do singular",
        ],
      },
    ],
  },
  {
    id: "r14", subjectId: "6", courseIds: ["pmmg", "pcmg", "prf"],
    title: "Crase", icon: "✍️",
    subtopics: [
      {
        id: "r14s1", title: "Regras de Uso",
        content: "A crase é a **fusão da preposição 'a' com o artigo 'a(s)'** ou com pronomes demonstrativos.\n\n**USA crase**:\n- Antes de palavras femininas que admitem artigo: *Fui __à__ escola.*\n- Antes de horas: *Chegou __às__ 14h.*\n- Locuções femininas: *__à__ medida que, __à__ noite, __à__ vista*\n- Antes de \"moda de\" (implícito): *Bife __à__ milanesa.*\n\n**NÃO usa crase**:\n- Antes de **masculino**: *Andou a cavalo.*\n- Antes de **verbo**: *Começou a chover.*\n- Antes de **pronomes em geral**: *Refiro-me a ela.*\n- Antes de **cidade sem determinante**: *Fui a Belo Horizonte.* (mas: *Fui __à__ bela Belo Horizonte.*)\n- Entre **palavras repetidas**: *Cara a cara, frente a frente.*\n\n**Dica prática**: troque a palavra feminina por masculina. Se aparecer \"ao\", há crase.\n- *Fui __à__ praia.* → *Fui __ao__ parque.* ✅ Crase confirmada.",
        keyPoints: [
          "Crase = preposição 'a' + artigo 'a'",
          "Nunca antes de masculino, verbo ou pronome",
          "Dica: trocar por masculino → se 'ao' aparece, há crase",
          "Obrigatória antes de horas e em locuções femininas",
        ],
      },
    ],
  },
];
