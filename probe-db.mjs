import { createClient } from '@supabase/supabase-js';

const url = 'https://melyesnqvbatmpxvotwc.supabase.co';
const key = 'sb_publishable_xeeN1Wgcjl4e_7oCP1c51Q_3gycLIvQ';
const supabase = createClient(url, key);

async function probe() {
  const tables = ['flashcards', 'flashcard_reviews', 'user_progress', 'study_materials', 'resumos', 'resumo_topics', 'daily_goals'];
  
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    console.log(`\nTable ${t}:`);
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Success, columns:', data && data.length > 0 ? Object.keys(data[0]) : 'Empty table, no column headers returned by client.');
    }
  }
}
probe();
