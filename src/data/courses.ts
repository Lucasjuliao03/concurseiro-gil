import { Subject } from "@/types/study";

export interface Course {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  subjectIds: string[];
}

export const courses: Course[] = [
  {
    id: "pmmg",
    name: "Polícia Militar de Minas Gerais",
    shortName: "PMMG",
    icon: "🛡️",
    description: "Concurso para Soldado e Oficial da PMMG",
    subjectIds: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "pcmg",
    name: "Polícia Civil de Minas Gerais",
    shortName: "PCMG",
    icon: "🔍",
    description: "Concurso para Investigador e Escrivão da PCMG",
    subjectIds: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "prf",
    name: "Polícia Rodoviária Federal",
    shortName: "PRF",
    icon: "🚔",
    description: "Concurso para Policial Rodoviário Federal",
    subjectIds: ["1", "2", "3", "4", "5", "6"],
  },
];
