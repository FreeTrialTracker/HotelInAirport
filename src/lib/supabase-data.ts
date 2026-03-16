import { supabase } from './supabase';
import type { Airport, Property } from './supabase';
import { SCORING, PRICE_TIERS, SLEEP_POD_TYPES } from '../constants';

export interface RecommendationScore {
  property: Property;
  score: number;
  reason: string;
}

export interface TransitRule {
  airport_code: string;
  country: string;
  visa_free_transit: boolean;
  notes?: string;
}

export interface DestinationRule {
  passport: string;
  destination: string;
  visa_required: boolean;
}

export interface TravelRules {
  transit_rules: TransitRule[];
  destination_rules: DestinationRule[];
}

export type LandsideEntryType =
  | 'no_entry_visa_required'
  | 'visa_free_entry'
  | 'visa_on_arrival'
  | 'evisa_required'
  | 'transit_without_visa'
  | 'transit_visa_required'
  | 'entry_visa_required'
  | 'unknown';

export type TransitRuleType =
  | 'transit_without_visa'
  | 'transit_visa_required'
  | 'unknown';

export type Confidence = 'high' | 'medium' | 'low';

export interface LayoverAccessRule {
  id?: string;
  passport_country: string;
  layover_country: string;
  layover_airport_code: string;
  airside_transit_allowed: boolean;
  landside_entry_type: LandsideEntryType;
  transit_rule_type: TransitRuleType;
  max_airside_transit_hours: number;
  notes: string;
  confidence: Confidence;
}

export async function getAllAirports(): Promise<Airport[]> {
  try {
    console.log('Fetching airports from Supabase...');
    const { data, error } = await supabase
      .from('airports')
      .select('*')
      .order('airport_name');

    if (error) {
      console.error('Error fetching airports:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return [];
    }

    console.log('Airports fetched successfully:', data?.length || 0);
    return data || [];
  } catch (err) {
    console.error('Exception while fetching airports:', err);
    return [];
  }
}

export async function getAirportByCode(code: string): Promise<Airport | null> {
  const { data, error } = await supabase
    .from('airports')
    .select('*')
    .eq('airport_code', code)
    .maybeSingle();

  if (error) {
    console.error('Error fetching airport:', error);
    return null;
  }

  return data;
}

export async function getAirportBySlug(slug: string): Promise<Airport | null> {
  const { data, error } = await supabase
    .from('airports')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching airport:', error);
    return null;
  }

  return data;
}

export async function getPropertiesByAirportCode(airportCode: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('airport_code', airportCode);

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return data || [];
}

export async function getAllProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*');

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return data || [];
}

export async function getAirportsByRegion(region: string): Promise<Airport[]> {
  const { data, error } = await supabase
    .from('airports')
    .select('*')
    .eq('region', region)
    .order('country')
    .order('airport_name');

  if (error) {
    console.error('Error fetching airports by region:', error);
    return [];
  }

  return data || [];
}

export async function getPropertyCountByRegion(region: string): Promise<number> {
  const { data: regionAirports, error: airportError } = await supabase
    .from('airports')
    .select('airport_code')
    .eq('region', region);

  if (airportError || !regionAirports || regionAirports.length === 0) return 0;

  const codes = regionAirports.map(a => a.airport_code).filter(Boolean);
  if (codes.length === 0) return 0;

  const { count, error } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .in('airport_code', codes);

  if (error) {
    console.error('Error counting properties by region:', error);
    return 0;
  }

  return count ?? 0;
}

export async function getAllRegions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('airports')
    .select('region')
    .not('region', 'is', null);

  if (error) {
    console.error('Error fetching regions:', error);
    return [];
  }

  const regions = new Set<string>();
  data.forEach(row => {
    if (row.region) regions.add(row.region);
  });

  return Array.from(regions).sort();
}

export async function getRelatedAirports(
  currentCode: string,
  country: string | undefined,
  region: string | undefined,
  limit = 6
): Promise<Airport[]> {
  if (country) {
    const { data: countryData, error: countryError } = await supabase
      .from('airports')
      .select('*')
      .eq('country', country)
      .neq('airport_code', currentCode)
      .order('airport_name')
      .limit(limit);

    if (!countryError && countryData && countryData.length >= 2) {
      return countryData;
    }
  }

  if (region) {
    const { data: regionData, error: regionError } = await supabase
      .from('airports')
      .select('*')
      .eq('region', region)
      .neq('airport_code', currentCode)
      .order('airport_name')
      .limit(limit);

    if (!regionError && regionData) {
      return regionData;
    }
  }

  return [];
}

export async function getAirportsByCountry(country: string): Promise<Airport[]> {
  const { data, error } = await supabase
    .from('airports')
    .select('*')
    .eq('country', country)
    .order('airport_name');

  if (error) {
    console.error('Error fetching airports by country:', error);
    return [];
  }

  return data || [];
}

export async function getPropertyCountByCountry(country: string): Promise<number> {
  const { count, error } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('country', country);

  if (error) {
    console.error('Error counting properties by country:', error);
    return 0;
  }

  return count ?? 0;
}

export async function getAllCountries(): Promise<string[]> {
  const { data, error } = await supabase
    .from('airports')
    .select('country')
    .not('country', 'is', null);

  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }

  const countries = new Set<string>();
  data.forEach((row) => {
    if (row.country) {
      countries.add(row.country);
    }
  });

  return Array.from(countries).sort();
}

export function scoreHotelForLayover(
  property: Property,
  layoverHours: number,
  transitVisaRequired?: boolean
): number {
  let score = SCORING.BASE;

  const propertyType = property.property_type || '';
  const accessType = property.access_type || '';
  const requiresImmigration = property.must_clear_immigration_first === true;
  const podTypes = [...SLEEP_POD_TYPES, 'sleep_lounge'];

  if (layoverHours < SCORING.SHORT_LAYOVER_HOURS) {
    if (podTypes.includes(propertyType)) {
      score += SCORING.SHORT_POD_BONUS;
    }
    if (propertyType === 'hotel') {
      score += SCORING.SHORT_HOTEL_PENALTY;
    }
  } else if (layoverHours < SCORING.MEDIUM_LAYOVER_HOURS) {
    if (accessType === 'airside' && propertyType === 'transit_hotel') {
      score += SCORING.MEDIUM_AIRSIDE_TRANSIT_BONUS;
    }
    if (SLEEP_POD_TYPES.includes(propertyType as typeof SLEEP_POD_TYPES[number])) {
      score += SCORING.MEDIUM_POD_BONUS;
    }
  } else if (layoverHours < SCORING.LONG_LAYOVER_HOURS) {
    if (['transit_hotel', 'hotel'].includes(propertyType)) {
      score += SCORING.LONG_HOTEL_BONUS;
    }
    if (accessType === 'terminal_connected') {
      score += SCORING.LONG_TERMINAL_BONUS;
    }
  } else {
    if (propertyType === 'hotel') {
      score += SCORING.EXTENDED_HOTEL_BONUS;
    }
    if (accessType === 'terminal_connected') {
      score += SCORING.EXTENDED_TERMINAL_BONUS;
    }
  }

  if (accessType === 'airside') {
    score += SCORING.AIRSIDE_BONUS;
  }

  if (accessType === 'terminal_connected') {
    score += SCORING.TERMINAL_CONNECTED_BONUS;
  }

  if (requiresImmigration) {
    score += SCORING.NO_IMMIGRATION_BONUS;
  }

  if (transitVisaRequired === true && requiresImmigration) {
    score += SCORING.TRANSIT_VISA_IMMIGRATION_PENALTY;
  }

  if (property.estimated_rate_daily) {
    if (property.estimated_rate_daily < PRICE_TIERS.BUDGET_MAX) {
      score += SCORING.BUDGET_PRICE_BONUS;
    } else if (property.estimated_rate_daily < PRICE_TIERS.MODERATE_MAX) {
      score += SCORING.MODERATE_PRICE_BONUS;
    }
  }

  if (layoverHours < SCORING.SHORT_POD_BONUS_HOURS && podTypes.includes(propertyType)) {
    score += SCORING.POD_SHORT_BONUS;
  }

  return Math.max(SCORING.SCORE_MIN, Math.min(SCORING.SCORE_MAX, score));
}

export async function recommendHotels(
  airportCode: string,
  layoverHours: number,
  transitVisaRequired?: boolean
): Promise<RecommendationScore[]> {
  const properties = await getPropertiesByAirportCode(airportCode);

  const validProperties = properties.filter(p => p.property_name);

  if (validProperties.length === 0) {
    return [];
  }

  const scoredProperties = validProperties.map((property) => {
    const score = scoreHotelForLayover(property, layoverHours, transitVisaRequired);
    let reason = '';

    if (layoverHours < SCORING.SHORT_LAYOVER_HOURS) {
      reason = `Ideal for short layovers with quick rest options`;
    } else if (layoverHours < SCORING.MEDIUM_LAYOVER_HOURS) {
      reason = `Perfect for medium layovers with comfortable rest areas`;
    } else if (layoverHours < SCORING.LONG_LAYOVER_HOURS) {
      reason = `Best for longer layovers requiring proper accommodation`;
    } else {
      reason = `Recommended for extended layovers with full hotel amenities`;
    }

    return {
      property,
      score,
      reason,
    };
  });

  return scoredProperties.sort((a, b) => b.score - a.score);
}

export type AccessEligibilityType =
  | 'eligible'
  | 'eligible_with_warning'
  | 'not_recommended'
  | 'unknown_rule_check_manually';

export interface HotelAccessEvaluation {
  eligibility: AccessEligibilityType;
  access_summary: string;
  warning_message?: string;
  rule_status: 'found' | 'not_found';
  airside_transit_allowed?: boolean;
  landside_entry_type?: LandsideEntryType;
  transit_rule_type?: TransitRuleType;
  confidence?: Confidence;
  rule?: LayoverAccessRule;
}

export function evaluateHotelLayoverAccess(
  property: Property,
  passportCountry: string,
  layoverAirportCode: string,
  layoverCountry?: string,
  layoverHours?: number,
  rule?: LayoverAccessRule | null
): HotelAccessEvaluation {
  const mustClearImmigration = property.must_clear_immigration_first === true;
  const noImmigrationRequired = property.must_clear_immigration_first === false;

  if (noImmigrationRequired) {
    return {
      eligibility: 'eligible',
      access_summary: 'No immigration clearance needed for this property',
      rule_status: 'not_found',
    };
  }

  if (mustClearImmigration) {
    if (!rule) {
      return {
        eligibility: 'unknown_rule_check_manually',
        access_summary: 'Immigration clearance required',
        warning_message: 'Transit or entry permission may be required to access this property',
        rule_status: 'not_found',
      };
    }

    let eligibility: AccessEligibilityType;
    let warning_message: string | undefined;
    let access_summary = '';

    switch (rule.landside_entry_type) {
      case 'no_entry_visa_required':
      case 'visa_free_entry':
        eligibility = 'eligible';
        access_summary = 'Visa-free entry available for this passport';
        break;

      case 'visa_on_arrival':
      case 'evisa_required':
      case 'transit_without_visa':
        eligibility = 'eligible_with_warning';
        access_summary = 'Entry permission available with documentation';
        warning_message = 'Visa on arrival, e-visa, or transit permit may be required';
        break;

      case 'entry_visa_required':
      case 'transit_visa_required':
        eligibility = 'not_recommended';
        access_summary = 'Visa required for entry';
        warning_message = 'A visa is required to access this landside property';
        break;

      default:
        eligibility = 'unknown_rule_check_manually';
        access_summary = 'Entry requirements unclear';
        warning_message = 'Please verify entry requirements before booking';
    }

    if (
      layoverHours &&
      rule.airside_transit_allowed &&
      rule.max_airside_transit_hours > 0 &&
      layoverHours > rule.max_airside_transit_hours
    ) {
      warning_message =
        (warning_message ? warning_message + '. ' : '') +
        'Long layovers may require additional immigration or transit checks';
    }

    return {
      eligibility,
      access_summary,
      warning_message,
      rule_status: 'found',
      airside_transit_allowed: rule.airside_transit_allowed,
      landside_entry_type: rule.landside_entry_type,
      transit_rule_type: rule.transit_rule_type,
      confidence: rule.confidence,
      rule,
    };
  }

  return {
    eligibility: 'unknown_rule_check_manually',
    access_summary: 'Immigration requirements unclear for this property',
    warning_message: 'Please verify access requirements before booking',
    rule_status: 'not_found',
  };
}

export async function getLayoverAccessRule(
  passportCountry: string,
  layoverAirportCode: string,
  layoverCountry?: string
): Promise<LayoverAccessRule | null> {
  const normalizeCountry = (country: string) =>
    country.trim().toLowerCase().replace(/\s+/g, ' ');

  const normalizedPassport = normalizeCountry(passportCountry);
  const normalizedLayoverCountry = layoverCountry ? normalizeCountry(layoverCountry) : undefined;
  const normalizedAirportCode = layoverAirportCode.trim().toUpperCase();

  const { data: exactMatch, error: exactError } = await supabase
    .from('layover_access_rules')
    .select('*')
    .ilike('passport_country', passportCountry)
    .ilike('layover_airport_code', normalizedAirportCode)
    .maybeSingle();

  if (exactError) {
    console.error('Error fetching exact match:', exactError);
  }

  if (exactMatch) {
    return exactMatch;
  }

  if (normalizedLayoverCountry) {
    const { data: countryMatch, error: countryError } = await supabase
      .from('layover_access_rules')
      .select('*')
      .ilike('passport_country', passportCountry)
      .ilike('layover_country', layoverCountry!)
      .maybeSingle();

    if (countryError) {
      console.error('Error fetching country match:', countryError);
    }

    if (countryMatch) {
      return countryMatch;
    }
  }

  return null;
}
