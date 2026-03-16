# Travel Rules Data Management Guide

This guide explains how the travel rules and layover access rules data is managed in the HotelInAirport application.

## Overview

The application uses a database-driven approach to store and retrieve travel rules that determine:
- Whether passengers can access certain hotels based on their passport
- Transit and visa requirements for layovers at different airports
- Immigration clearance requirements

## Database Structure

### Layover Access Rules Table

The `layover_access_rules` table contains information about travel permissions for different passport/airport combinations:

**Columns:**
- `id` (uuid) - Primary key
- `passport_country` (text) - Country of passport holder (e.g., "United States", "Indonesia")
- `layover_country` (text) - Country where the layover occurs
- `layover_airport_code` (text) - IATA airport code (e.g., "SIN", "LHR")
- `airside_transit_allowed` (boolean) - Whether airside transit is allowed without clearing immigration
- `landside_entry_type` (text) - Type of landside entry permission:
  - `visa_free_entry` - No visa required for entry
  - `visa_on_arrival` - Visa can be obtained on arrival
  - `evisa_required` - Electronic visa required before travel
  - `entry_visa_required` - Traditional visa required
  - `transit_without_visa` - Transit without visa program available
  - `transit_visa_required` - Transit visa required
- `transit_rule_type` (text) - Type of transit rule
- `max_airside_transit_hours` (integer) - Maximum hours allowed in airside area
- `notes` (text) - Additional information and important notes
- `confidence` (text) - Data confidence level: `high`, `medium`, or `low`

## Data Flow

1. **Source Data**: Travel rules are initially defined in `/data/layover_access_rules.json`
2. **Import to Database**: Rules are imported to the `layover_access_rules` table using the import script
3. **Application Access**: The application queries the database directly for real-time rule lookups

## Managing Travel Rules Data

### Quick Start: Generate Comprehensive Rules

To populate the database with rules for all 41 passport countries across 50 major airports:

```bash
npm run generate-travel-rules
```

This script will:
- Keep existing high-confidence rules (123 manually curated rules)
- Generate rules for all missing passport/airport combinations (~1,900+ rules)
- Import all rules to the database in batches
- Result: **2,059 total rules** covering all major travel scenarios

### Viewing Current Rules

Check how many rules are in the database:

```bash
npm run import-layover-rules
```

Or query directly via SQL:

```sql
SELECT COUNT(*) FROM layover_access_rules;
```

Check coverage by passport country:

```sql
SELECT
  passport_country,
  COUNT(*) as rule_count,
  COUNT(DISTINCT layover_airport_code) as airports_covered
FROM layover_access_rules
GROUP BY passport_country
ORDER BY passport_country;
```

### Adding New Rules

1. Edit `/data/layover_access_rules.json` to add new rules:

```json
{
  "passport_country": "Australia",
  "layover_country": "Thailand",
  "layover_airport_code": "BKK",
  "airside_transit_allowed": true,
  "landside_entry_type": "visa_free_entry",
  "transit_rule_type": "transit_without_visa",
  "max_airside_transit_hours": 24,
  "notes": "Australian passport holders can enter Thailand visa-free.",
  "confidence": "high"
}
```

2. Run the import script to update the database:

```bash
npm run import-layover-rules
```

### Updating Existing Rules

1. Update the rule in `/data/layover_access_rules.json`
2. Run the import script (it will clear and re-import all rules):

```bash
npm run import-layover-rules
```

### Rule Lookup Logic

The application looks up rules in this order:

1. **Exact Match**: Passport country + exact airport code
2. **Country Match**: Passport country + layover country (fallback)
3. **No Match**: Shows warning message to verify requirements manually

## Understanding Entry Types

### Visa-Free Entry
Travelers can enter without advance visa arrangements. Most common for strong passports visiting tourist-friendly countries.

### Visa on Arrival
Visa is issued at the airport upon arrival. Usually requires payment and may have specific documentation requirements.

### E-Visa Required
Electronic visa must be obtained online before travel. Processing time varies by country.

### Entry Visa Required
Traditional visa must be obtained from embassy/consulate before travel.

### Transit Without Visa
Special program allowing short visits without visa for passengers in transit.

## Data Quality

### Confidence Levels

- **High**: Official government sources or well-established policies
- **Medium**: Based on recent traveler reports or secondary sources
- **Low**: Limited information or frequently changing policies

### Coverage

Currently, the database contains **2,059 rules** covering major airports and passport combinations:

- **41 passport countries** (all countries in the dropdown)
- **50 major international airports**
- **~49 airports per passport country**

Priority is given to:

1. Major international hub airports (SIN, DXB, LHR, etc.)
2. Common passport countries (US, UK, EU nations, Asian countries)
3. Popular layover routes

### Gaps and Warnings

When no rule is found, the application displays:

> "Transit and landside access rules could not be confirmed for your passport at this airport. Please verify travel requirements before booking."

This ensures users are aware they need to do additional research.

## Best Practices

1. **Always Verify**: Travel rules change frequently. The data should be verified before travel.
2. **Update Regularly**: Review and update rules quarterly or when policies change
3. **Document Sources**: Add URLs or references in notes field when adding rules
4. **Be Conservative**: When uncertain, use more restrictive entry types
5. **Test After Updates**: Verify the app displays rules correctly after database updates

## Troubleshooting

### Rules Not Showing Up

Check:
1. Database connection is working
2. RLS policies allow public read access
3. Import script completed successfully
4. Country and airport code spelling matches exactly (case-insensitive)

### Incorrect Rule Matching

Verify:
- Passport country name matches database exactly
- Airport code is correct IATA code
- Country names don't have extra spaces or special characters

## Scripts Available

### 1. `npm run generate-travel-rules`
**Use this for comprehensive coverage**

Generates and imports rules for all passport/airport combinations:
- Preserves existing high-confidence rules
- Auto-generates rules using visa policy logic
- Covers all 41 countries × 50 airports = ~2,000 rules
- Imports to database in batches of 50

### 2. `npm run import-layover-rules`
**Use this for manual updates**

Imports only the rules in `/data/layover_access_rules.json`:
- Good for adding specific rules manually
- Clears database and re-imports
- Use after editing JSON file

### 3. `npm run import-data`
**Use this for airports and properties**

Imports airports and hotel properties from source data files.

## Rule Generation Logic

The auto-generation script uses these heuristics:

**Visa-Free Entry:**
- Same country as passport
- Strong passport to visa-friendly countries
- EU passport to EU countries
- ASEAN countries to other ASEAN nations

**E-Visa Required:**
- Strong passports to Turkey, Thailand, some Asian countries

**Visa Required:**
- Weak passports to most countries
- All passports to China, India, Russia

**Airside Transit:**
- Most countries allow 24 hours
- Singapore, UAE, Qatar allow 96 hours
- USA requires clearing immigration (0 hours)

## Future Improvements

Consider:
- Add source URL field for documentation
- Add last_updated timestamp for tracking freshness
- Implement rule versioning
- Add API endpoint for rule suggestions/corrections
- Create admin interface for rule management
- Implement confidence-based rule override system
