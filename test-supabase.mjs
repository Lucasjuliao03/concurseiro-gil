import { createClient } from '@supabase/supabase-js';

const url = 'https://melyesnqvbatmpxvotwc.supabase.co';
const key = 'sb_publishable_xeeN1Wgcjl4e_7oCP1c51Q_3gycLIvQ';

const supabase = createClient(url, key);

async function test() {
  const email = `test555@example.com`;
  console.log('Signing up:', email);
  const { data: suData, error: suErr } = await supabase.auth.signUp({
    email,
    password: 'password123',
    options: { data: { full_name: 'Test Setup' } }
  });
  
  if (suErr) {
    console.error('Signup Error:', suErr.message);
  } else {
    console.log('Signup Success. User ID:', suData.user?.id);
  }

  // Try to login
  console.log('Logging in...');
  const { data: siData, error: siErr } = await supabase.auth.signInWithPassword({
    email,
    password: 'password123'
  });

  if (siErr) {
    console.error('Login Error:', siErr.message);
  } else {
    console.log('Login Success. Tokens obtained.');
    const { data: profile, error: pErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', siData.user?.id)
      .single();
    
    if (pErr) console.error('Fetch Profile Error:', pErr.message);
    else console.log('Profile Fetched:', profile);
  }
}
test();
