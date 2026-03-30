import https from 'https';
import fs from 'fs';

const url = 'https://melyesnqvbatmpxvotwc.supabase.co/rest/v1/?apikey=sb_publishable_xeeN1Wgcjl4e_7oCP1c51Q_3gycLIvQ';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('schema.json', data);
    console.log('Saved to schema.json');
  });
});
