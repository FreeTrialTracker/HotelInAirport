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

const passportCountries = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria',
  'Canada', 'Chile', 'China', 'Croatia', 'Czech Republic', 'Denmark',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'India',
  'Indonesia', 'Ireland', 'Italy', 'Japan', 'Malaysia', 'Mexico',
  'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Philippines',
  'Poland', 'Portugal', 'Romania', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
  'United Arab Emirates', 'United Kingdom', 'United States'
];

const majorAirports = [
  { code: 'SIN', country: 'Singapore' },
  { code: 'DXB', country: 'United Arab Emirates' },
  { code: 'LHR', country: 'United Kingdom' },
  { code: 'JFK', country: 'United States' },
  { code: 'LAX', country: 'United States' },
  { code: 'CDG', country: 'France' },
  { code: 'AMS', country: 'Netherlands' },
  { code: 'FRA', country: 'Germany' },
  { code: 'NRT', country: 'Japan' },
  { code: 'HND', country: 'Japan' },
  { code: 'ICN', country: 'South Korea' },
  { code: 'HKG', country: 'China' },
  { code: 'BKK', country: 'Thailand' },
  { code: 'IST', country: 'Turkey' },
  { code: 'DOH', country: 'Qatar' },
  { code: 'SYD', country: 'Australia' },
  { code: 'MEL', country: 'Australia' },
  { code: 'AKL', country: 'New Zealand' },
  { code: 'YYZ', country: 'Canada' },
  { code: 'YVR', country: 'Canada' },
  { code: 'GRU', country: 'Brazil' },
  { code: 'MEX', country: 'Mexico' },
  { code: 'MAD', country: 'Spain' },
  { code: 'FCO', country: 'Italy' },
  { code: 'ZRH', country: 'Switzerland' },
  { code: 'VIE', country: 'Austria' },
  { code: 'CPH', country: 'Denmark' },
  { code: 'ARN', country: 'Sweden' },
  { code: 'OSL', country: 'Norway' },
  { code: 'HEL', country: 'Finland' },
  { code: 'DUB', country: 'Ireland' },
  { code: 'LIS', country: 'Portugal' },
  { code: 'ATH', country: 'Greece' },
  { code: 'WAW', country: 'Poland' },
  { code: 'PRG', country: 'Czech Republic' },
  { code: 'BUD', country: 'Hungary' },
  { code: 'OTP', country: 'Romania' },
  { code: 'SOF', country: 'Bulgaria' },
  { code: 'ZAG', country: 'Croatia' },
  { code: 'EZE', country: 'Argentina' },
  { code: 'SCL', country: 'Chile' },
  { code: 'JNB', country: 'South Africa' },
  { code: 'LOS', country: 'Nigeria' },
  { code: 'KUL', country: 'Malaysia' },
  { code: 'MNL', country: 'Philippines' },
  { code: 'CGK', country: 'Indonesia' },
  { code: 'DEL', country: 'India' },
  { code: 'PEK', country: 'China' },
  { code: 'PVG', country: 'China' }
];

const visaFreeCountries = {
  'United States': ['Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'United Kingdom': ['United States', 'Canada', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'Germany': ['United States', 'Canada', 'United Kingdom', 'France', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'France': ['United States', 'Canada', 'United Kingdom', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'Australia': ['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'New Zealand', 'Singapore'],
  'Canada': ['United States', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'Japan': ['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'South Korea', 'Australia', 'New Zealand', 'Singapore'],
  'Singapore': ['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Japan', 'South Korea', 'Australia', 'New Zealand'],
};

function getEntryType(passportCountry, layoverCountry) {
  const visaFreeDestinations = visaFreeCountries[passportCountry] || [];

  if (passportCountry === layoverCountry) {
    return 'visa_free_entry';
  }

  if (visaFreeDestinations.includes(layoverCountry)) {
    return 'visa_free_entry';
  }

  const euCountries = ['France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Austria', 'Belgium', 'Denmark', 'Finland', 'Greece', 'Ireland', 'Portugal', 'Sweden'];
  const strongPassports = ['United States', 'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'Japan', 'Singapore', 'South Korea'];

  if (euCountries.includes(passportCountry) && euCountries.includes(layoverCountry)) {
    return 'visa_free_entry';
  }

  if (strongPassports.includes(passportCountry)) {
    if (['Singapore', 'Japan', 'South Korea', 'United Arab Emirates', 'Qatar'].includes(layoverCountry)) {
      return 'visa_free_entry';
    }
    if (['Turkey', 'Thailand', 'Malaysia', 'Indonesia'].includes(layoverCountry)) {
      return 'evisa_required';
    }
    if (['China', 'India', 'Brazil', 'Nigeria'].includes(layoverCountry)) {
      return 'entry_visa_required';
    }
  }

  if (['Thailand', 'Malaysia', 'Singapore', 'Indonesia'].includes(passportCountry)) {
    if (['Singapore', 'Malaysia', 'Thailand', 'Indonesia'].includes(layoverCountry)) {
      return 'visa_free_entry';
    }
  }

  return 'entry_visa_required';
}

function getTransitRuleType(passportCountry, layoverCountry, entryType) {
  if (entryType === 'visa_free_entry' || entryType === 'evisa_required' || entryType === 'visa_on_arrival') {
    return 'transit_without_visa';
  }

  const usAirports = ['United States'];
  if (usAirports.includes(layoverCountry)) {
    return 'transit_visa_required';
  }

  return 'transit_without_visa';
}

function getMaxTransitHours(layoverCountry) {
  if (['United States'].includes(layoverCountry)) {
    return 0;
  }
  if (['Singapore', 'United Arab Emirates', 'Qatar'].includes(layoverCountry)) {
    return 96;
  }
  return 24;
}

async function generateRules() {
  console.log('Generating comprehensive travel rules...');

  const existingRulesData = fs.readFileSync(
    path.join(__dirname, '..', 'data', 'layover_access_rules.json'),
    'utf8'
  );
  const existingRules = JSON.parse(existingRulesData).rules;

  const existingKeys = new Set(
    existingRules.map(r => `${r.passport_country}|${r.layover_airport_code}`)
  );

  const newRules = [];

  for (const passportCountry of passportCountries) {
    for (const airport of majorAirports) {
      const key = `${passportCountry}|${airport.code}`;

      if (existingKeys.has(key)) {
        continue;
      }

      const entryType = getEntryType(passportCountry, airport.country);
      const transitRuleType = getTransitRuleType(passportCountry, airport.country, entryType);
      const maxHours = getMaxTransitHours(airport.country);
      const airsideAllowed = maxHours > 0;

      const rule = {
        passport_country: passportCountry,
        layover_country: airport.country,
        layover_airport_code: airport.code,
        airside_transit_allowed: airsideAllowed,
        landside_entry_type: entryType,
        transit_rule_type: transitRuleType,
        max_airside_transit_hours: maxHours,
        notes: `Auto-generated rule for ${passportCountry} passport holders at ${airport.code}. Please verify official requirements.`,
        confidence: 'medium'
      };

      newRules.push(rule);
    }
  }

  console.log(`Found ${existingRules.length} existing rules`);
  console.log(`Generated ${newRules.length} new rules`);

  const allRules = [...existingRules, ...newRules];

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'layover_access_rules.json'),
    JSON.stringify({ rules: allRules }, null, 2)
  );

  console.log(`\nTotal rules: ${allRules.length}`);
  console.log('Importing to database...');

  console.log('Clearing existing rules from database...');
  const { error: deleteError } = await supabase
    .from('layover_access_rules')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error clearing rules:', deleteError);
  }

  const batchSize = 50;
  for (let i = 0; i < allRules.length; i += batchSize) {
    const batch = allRules.slice(i, i + batchSize);

    const { error: insertError } = await supabase
      .from('layover_access_rules')
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
    } else {
      console.log(`Inserted batch ${i / batchSize + 1}/${Math.ceil(allRules.length / batchSize)} (${batch.length} rules)`);
    }
  }

  const { count } = await supabase
    .from('layover_access_rules')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✓ Import complete! Total rules in database: ${count}`);
}

generateRules().catch(console.error);
