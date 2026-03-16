import { supabase } from './supabase';
import airportsJsonRaw from '../../data/airports.json';
import datasetJson from '../../data/hotelinairport_starter_dataset.json';

interface AirportData {
  airport_code: string;
  airport_name: string;
  city?: string;
  country?: string;
  region?: string;
}

function slugify(name: string, code?: string): string {
  if (!name) return code?.toLowerCase() || '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractAirportFromUrl(url: string): Partial<AirportData> | null {
  if (!url) return null;

  const urlPatterns = [
    /hotels?.*?\/([a-z]{3})-([^\/\?]+)/i,
    /airport[s]?\/([a-z]{3})/i,
    /([a-z]{3})-airport/i,
  ];

  for (const pattern of urlPatterns) {
    const match = url.match(pattern);
    if (match) {
      const code = match[1].toUpperCase();
      return { airport_code: code };
    }
  }

  return null;
}

export async function importAirportsAndProperties() {
  console.log('Starting data import...');

  const airportsMap = new Map<string, AirportData>();

  const airportsJson = airportsJsonRaw as { airports: Array<{ airport_code: string; airport_name: string; city: string; country: string; region: string }> };
  airportsJson.airports.forEach((airport) => {
    if (airport.airport_code && airport.airport_name) {
      airportsMap.set(airport.airport_code, airport);
    }
  });

  datasetJson.records.forEach((record: any) => {
    if (record.airport_code && record.airport_name) {
      const existing = airportsMap.get(record.airport_code);
      if (!existing || !existing.country) {
        airportsMap.set(record.airport_code, {
          airport_code: record.airport_code,
          airport_name: record.airport_name,
          city: record.city || existing?.city,
          country: record.country || existing?.country,
          region: record.region || existing?.region,
        });
      }
    }

    if (!record.airport_code && record.booking_or_ota_url) {
      const extracted = extractAirportFromUrl(record.booking_or_ota_url);
      if (extracted?.airport_code && !airportsMap.has(extracted.airport_code)) {
        console.log(`Extracted ${extracted.airport_code} from URL: ${record.booking_or_ota_url}`);
      }
    }
  });

  console.log(`Found ${airportsMap.size} unique airports`);

  const airportsToInsert = Array.from(airportsMap.values()).map((airport) => ({
    airport_code: airport.airport_code,
    airport_name: airport.airport_name,
    city: airport.city || null,
    country: airport.country || null,
    region: airport.region || null,
    slug: slugify(airport.airport_name, airport.airport_code),
  }));

  console.log('Inserting airports...');
  const { data: insertedAirports, error: airportsError } = await supabase
    .from('airports')
    .upsert(airportsToInsert, { onConflict: 'airport_code', ignoreDuplicates: false })
    .select();

  if (airportsError) {
    console.error('Error inserting airports:', airportsError);
    throw airportsError;
  }

  console.log(`Inserted ${insertedAirports?.length || 0} airports`);

  const airportCodeToId = new Map<string, string>();
  if (insertedAirports) {
    insertedAirports.forEach((airport: any) => {
      airportCodeToId.set(airport.airport_code, airport.id);
    });
  }

  console.log('Inserting properties...');
  const propertiesToInsert = datasetJson.records.map((record: any) => {
    const airportId = record.airport_code ? airportCodeToId.get(record.airport_code) : null;

    return {
      property_id: record.property_id,
      property_name: record.property_name || null,
      property_type: record.property_type || null,
      access_type: record.access_type || null,
      must_clear_immigration_first: record.must_clear_immigration_first,
      gate_info: record.gate_info || null,
      estimated_rate_hourly: record.estimated_rate_hourly,
      estimated_rate_daily: record.estimated_rate_daily,
      currency: record.currency || null,
      region: record.region || null,
      country: record.country || null,
      city: record.city || null,
      airport_id: airportId || null,
      airport_code: record.airport_code || null,
      airport_name: record.airport_name || null,
      booking_or_ota_url: record.booking_or_ota_url || null,
      source_type: record.source_type || null,
      notes: record.notes || null,
      qa_flags: record.qa_flags || [],
    };
  });

  const { data: insertedProperties, error: propertiesError } = await supabase
    .from('properties')
    .upsert(propertiesToInsert, { onConflict: 'property_id', ignoreDuplicates: false })
    .select();

  if (propertiesError) {
    console.error('Error inserting properties:', propertiesError);
    throw propertiesError;
  }

  console.log(`Inserted ${insertedProperties?.length || 0} properties`);
  console.log('Data import complete!');

  return {
    airports: insertedAirports?.length || 0,
    properties: insertedProperties?.length || 0,
  };
}
