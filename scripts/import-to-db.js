import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const airportsJson = JSON.parse(readFileSync(join(__dirname, '../data/airports.json'), 'utf8'));
const propertiesJson = JSON.parse(readFileSync(join(__dirname, '../data/properties.json'), 'utf8'));

async function importData() {
  console.log('Starting import...\n');

  console.log('Found ' + airportsJson.airports.length + ' airports from airports.json (clean master list)');
  console.log('Found ' + propertiesJson.properties.length + ' properties from properties.json\n');

  console.log('Inserting airports...');
  const { data: insertedAirports, error: airportsError } = await supabase
    .from('airports')
    .upsert(airportsJson.airports, { onConflict: 'airport_code' })
    .select();

  if (airportsError) {
    console.error('Error inserting airports:', airportsError);
    process.exit(1);
  }

  console.log('Inserted ' + (insertedAirports?.length || 0) + ' airports\n');

  const airportCodeToId = new Map();
  if (insertedAirports) {
    insertedAirports.forEach(airport => {
      airportCodeToId.set(airport.airport_code, airport.id);
    });
  }

  console.log('Preparing properties with airport IDs...');
  const propertiesToInsert = propertiesJson.properties
    .filter(property => {
      return property.airport_code && airportCodeToId.has(property.airport_code);
    })
    .map(property => {
      let hourlyRate = null;
      if (property.estimated_rate_hourly && typeof property.estimated_rate_hourly === 'string') {
        const match = property.estimated_rate_hourly.match(/[\d.]+/);
        hourlyRate = match ? parseFloat(match[0]) : null;
      } else if (typeof property.estimated_rate_hourly === 'number') {
        hourlyRate = property.estimated_rate_hourly;
      }

      return {
        ...property,
        estimated_rate_hourly: hourlyRate,
        airport_id: airportCodeToId.get(property.airport_code)
      };
    });

  console.log('Matched ' + propertiesToInsert.length + ' properties to airports\n');

  if (propertiesToInsert.length > 0) {
    console.log('Inserting properties...');
    const { data: insertedProperties, error: propertiesError } = await supabase
      .from('properties')
      .upsert(propertiesToInsert, { onConflict: 'property_id' })
      .select();

    if (propertiesError) {
      console.error('Error inserting properties:', propertiesError);
      process.exit(1);
    }

    console.log('Inserted ' + (insertedProperties?.length || 0) + ' properties\n');
  }

  console.log('Import complete!');
  console.log('Final: ' + airportsJson.airports.length + ' airports, ' + propertiesToInsert.length + ' properties');
}

importData().catch(console.error);
