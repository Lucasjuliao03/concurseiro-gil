import fs from 'fs';
import path from 'path';

// Note: A simpler approach since we can't 'import' TS files with modern node seamlessly without ts-node:
// We parse the questionsDb.ts text manually using regex to extract subjects and questions.

const code = fs.readFileSync(path.join(process.cwd(), 'src/data/questionsDb.ts'), 'utf-8');

// Match subject objects
const subjectRegex = /{[\s\S]*?id:\s*"([^"]+)",\s*name:\s*"([^"]+)"[\s\S]*?}/g;
const subjects = [];
let match;
while ((match = subjectRegex.exec(code)) !== null) {
  if (match[1] && match[1].length < 10) { // filter out non-subject objects
    if (!subjects.find(s => s.id === match[1])) {
       subjects.push({ id: match[1], name: match[2] });
    }
  }
}

// Match question objects
// Trying to extract statements roughly: Statement, CorrectOption, subjectId, difficulty, etc.
const qRegex = /id:\s*"([^"]+)",\s*subjectId:\s*"([^"]+)",[\s\S]*?topic:\s*"([^"]+)",[\s\S]*?difficulty:\s*"([^"]+)",[\s\S]*?year:\s*(\d+),[\s\S]*?board:\s*"([^"]*)",[\s\S]*?organ:\s*"([^"]*)",[\s\S]*?statement:\s*"([^"]+)",[\s\S]*?options:\s*\[([\s\S]*?)\],[\s\S]*?correctOption:\s*"([^"]+)",[\s\S]*?explanation:\s*"([^"]+)"/g;

const questions = [];
while ((match = qRegex.exec(code)) !== null) {
  const optStr = match[9];
  const optionRegex = /id:\s*"([^"]+)",\s*text:\s*"([^"]+)"/g;
  const options = [];
  let optMatch;
  while ((optMatch = optionRegex.exec(optStr)) !== null) {
    options.push({ id: optMatch[1], text: optMatch[2] });
  }

  questions.push({
    id: match[1],
    subjectId: match[2],
    topic: match[3],
    difficulty: match[4] === 'fácil' ? 'easy' : match[4] === 'média' ? 'medium' : 'hard',
    year: match[5],
    board: match[6],
    organ: match[7],
    statement: match[8],
    options,
    correctOption: match[10],
    explanation: match[11]
  });
}

function generateSql() {
  let sql = `-- Seed script para inserir dados no Supabase\n\n`;

  // Assume subject UUIDs are deterministic or sequential for testing.
  const subjectMap = {};
  
  sql += `-- Subjects\n`;
  subjects.forEach((s, idx) => {
    // Generate valid UUID based on index
    const uuid = `00000000-0000-0000-0000-${String(idx + 1).padStart(12, '0')}`;
    subjectMap[s.id] = uuid;
    sql += `INSERT INTO public.subjects (id, name, description) VALUES ('${uuid}', '${s.name}', '${s.name}') ON CONFLICT DO NOTHING;\n`;
  });

  sql += `\n-- Questions\n`;
  questions.forEach((q, idx) => {
    const qUuid = `11111111-1111-1111-1111-${String(idx + 1).padStart(12, '0')}`;
    const mappedSId = subjectMap[q.subjectId] || subjectMap[Object.keys(subjectMap)[0]];
    
    const statement = q.statement.replace(/'/g, "''");
    const explanation = q.explanation.replace(/'/g, "''");
    
    // mapping options A B C D E
    const optA = (q.options.find(o => o.id.toLowerCase() === 'a')?.text || '').replace(/'/g, "''");
    const optB = (q.options.find(o => o.id.toLowerCase() === 'b')?.text || '').replace(/'/g, "''");
    const optC = (q.options.find(o => o.id.toLowerCase() === 'c')?.text || '').replace(/'/g, "''");
    const optD = (q.options.find(o => o.id.toLowerCase() === 'd')?.text || '').replace(/'/g, "''");
    const optE = (q.options.find(o => o.id.toLowerCase() === 'e')?.text || '').replace(/'/g, "''");
    const correctOpt = q.correctOption.toUpperCase(); // A, B, C, D, E

    sql += `INSERT INTO public.questions (
      id, subject_id, question_type, difficulty, statement, 
      option_a, option_b, option_c, option_d, option_e, 
      correct_option, explanation, source_year, is_active, status
    ) VALUES (
      '${qUuid}', '${mappedSId}', 'multiple_choice', '${q.difficulty}', '${statement}',
      '${optA}', '${optB}', '${optC}', '${optD}', '${optE}',
      '${correctOpt}', '${explanation}', ${q.year}, true, 'published'
    ) ON CONFLICT DO NOTHING;\n`;
  });

  return sql;
}

fs.writeFileSync('seed.sql', generateSql(), 'utf-8');
console.log('seed.sql generated with', subjects.length, 'subjects and', questions.length, 'questions.');
