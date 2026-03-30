import { createClient } from '@supabase/supabase-js';

const url = 'https://melyesnqvbatmpxvotwc.supabase.co';
const key = 'sb_publishable_xeeN1Wgcjl4e_7oCP1c51Q_3gycLIvQ';
const supabase = createClient(url, key);

async function probe() {
  const { error } = await supabase.from('flashcards').select('fake_column_123');
  console.log('Flashcards error:', error);
  
  // Try to find if Summaries etc exist by querying common names
  const commonNames = ['summaries', 'subject_summaries', 'user_stats', 'progress', 'topics', 'subtopics'];
  for (const n of commonNames) {
     const { error } = await supabase.from(n).select('*').limit(1);
     if (!error || !error.message.includes('Could not find the table')) {
        console.log(`Found table: ${n}`);
     }
  }
}
probe();
