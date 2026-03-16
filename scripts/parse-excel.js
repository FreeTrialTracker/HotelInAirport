import { readFileSync, writeFileSync } from 'fs';

const excelData = JSON.parse(readFileSync('./public/csvjson.json', 'utf8'));

function extractAirportCode(airportField) {
  if (!airportField) return null;
  const match = airportField.match(/\(([A-Z]{3,4})\)$/);
  return match ? match[1] : null;
}

function extractAirportName(airportField) {
  if (!airportField) return null;
  return airportField.replace(/\s*\([A-Z]{3,4}\)$/, '').trim();
}

function slugify(name, code) {
  if (!name) return code?.toLowerCase() || '';
  return (name + ' ' + code)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const airportsMap = new Map();
const properties = [];
let propertyIdCounter = 1;

for (const row of excelData) {
  if (!row['__3'] || row['__3'] === 'Airport (Code)' || !row['']) continue;

  const region = row[''];
  const country = row['__1'];
  const city = row['__2'];
  const airportField = row['__3'];
  const airportCode = extractAirportCode(airportField);
  const airportName = extractAirportName(airportField);

  if (!airportCode || !airportName) continue;

  if (!airportsMap.has(airportCode)) {
    airportsMap.set(airportCode, {
      airport_code: airportCode,
      airport_name: airportName,
      city: city || null,
      country: country || null,
      region: region || null,
      slug: slugify(airportName, airportCode)
    });
  }

  const airsideProperty = row['__4'] ? row['__4'].trim() : null;
  const landsideAttached = row['__6'] ? row['__6'].trim() : null;
  const landsideShuttle = row['__7'] ? row['__7'].trim() : null;

  const propertyName = airsideProperty || landsideAttached || landsideShuttle;

  if (!propertyName || propertyName === '—') continue;

  const gateInfo = row['__5'] && row['__5'] !== '—' ? row['__5'].trim() : null;
  const hourlyRate = row['__8'] && row['__8'] !== '—' ? row['__8'] : null;
  const dailyRate = row['__9'] && row['__9'] !== '—' ? parseFloat(row['__9'].replace(/[^0-9.]/g, '')) : null;
  const accessNotes = row['__10'] || null;
  const mustClearImmigration = row['__11'] === 'Yes';
  const bookingUrl = row['__12'] || null;

  let accessType = 'terminal_connected';
  let propertyType = 'hotel';

  const notesLower = (accessNotes || '').toLowerCase();
  if (notesLower.includes('airside')) {
    accessType = 'airside';
    propertyType = airsideProperty ? 'transit_hotel' : 'hotel';
  } else if (notesLower.includes('terminal_connected')) {
    accessType = 'terminal_connected';
  } else if (notesLower.includes('terminal_landside')) {
    accessType = 'terminal_landside';
  } else if (notesLower.includes('walkable')) {
    accessType = 'walkable';
  } else if (notesLower.includes('airport_compound')) {
    accessType = 'airport_compound';
  } else if (notesLower.includes('airport_shuttle')) {
    accessType = 'airport_shuttle';
  }

  const nameLower = propertyName.toLowerCase();
  if (nameLower.includes('pod') || nameLower.includes('capsule')) {
    propertyType = nameLower.includes('capsule') ? 'capsule_hotel' : 'sleep_pods';
  } else if (nameLower.includes('transit') || accessType === 'airside') {
    propertyType = 'transit_hotel';
  } else if (nameLower.includes('lounge') && (nameLower.includes('sleep') || nameLower.includes('rest'))) {
    propertyType = 'sleep_lounge';
  }

  const propertyId = airportCode.toLowerCase() + '-' + propertyIdCounter;
  propertyIdCounter++;

  properties.push({
    property_id: propertyId,
    airport_code: airportCode,
    airport_name: airportName,
    region: region || null,
    country: country || null,
    city: city || null,
    property_name: propertyName,
    property_type: propertyType,
    access_type: accessType,
    gate_info: gateInfo,
    must_clear_immigration_first: mustClearImmigration,
    estimated_rate_hourly: hourlyRate,
    estimated_rate_daily: dailyRate,
    currency: 'USD',
    access_notes: accessNotes,
    booking_or_ota_url: bookingUrl,
    is_active: true
  });
}

const airports = Array.from(airportsMap.values()).sort((a, b) =>
  a.airport_name.localeCompare(b.airport_name)
);

writeFileSync('./data/airports.json', JSON.stringify({ airports }, null, 2));
writeFileSync('./data/properties.json', JSON.stringify({ properties }, null, 2));

console.log('Created airports.json with ' + airports.length + ' airports');
console.log('Created properties.json with ' + properties.length + ' properties');
console.log('\nSample airports:');
airports.slice(0, 5).forEach(a => console.log('  - [' + a.airport_code + '] ' + a.airport_name + ', ' + a.city + ', ' + a.country));
console.log('\nSample properties:');
properties.slice(0, 5).forEach(p => console.log('  - [' + p.airport_code + '] ' + p.property_name + ' (' + p.property_type + ', ' + p.access_type + ')'));
