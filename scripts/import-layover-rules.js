import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importLayoverRules() {
  console.log('Reading layover access rules data...');

  const dataPath = path.join(__dirname, '..', 'data', 'layover_access_rules.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(rawData);

  console.log(`Found ${data.rules.length} layover access rules`);

  console.log('Clearing existing layover access rules...');
  const { error: deleteError } = await supabase
    .from('layover_access_rules')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error clearing existing rules:', deleteError);
  }

  console.log('Inserting layover access rules...');

  const batchSize = 50;
  for (let i = 0; i < data.rules.length; i += batchSize) {
    const batch = data.rules.slice(i, i + batchSize);

    const { error: insertError } = await supabase
      .from('layover_access_rules')
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
    } else {
      console.log(`Inserted batch ${i / batchSize + 1} (${batch.length} rules)`);
    }
  }

  const { count } = await supabase
    .from('layover_access_rules')
    .select('*', { count: 'exact', head: true });

  console.log(`\nImport complete! Total rules in database: ${count}`);
}

importLayoverRules().catch(console.error);
