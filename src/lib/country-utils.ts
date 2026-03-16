export function slugifyCountry(country: string): string {
  return country
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function countryFromSlug(slug: string, countries: string[]): string | null {
  const normalized = slug.toLowerCase();
  return countries.find(c => slugifyCountry(c) === normalized) ?? null;
}

export function buildCountryAirportMap(
  airports: { country?: string | null }[]
): Map<string, number> {
  const map = new Map<string, number>();
  airports.forEach(a => {
    if (a.country) {
      map.set(a.country, (map.get(a.country) ?? 0) + 1);
    }
  });
  return map;
}

export function buildCountryPropertyMap(
  properties: { country?: string | null }[]
): Map<string, number> {
  const map = new Map<string, number>();
  properties.forEach(p => {
    if (p.country) {
      map.set(p.country, (map.get(p.country) ?? 0) + 1);
    }
  });
  return map;
}

export function slugifyRegion(region: string): string {
  return region
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function regionFromSlug(slug: string, regions: string[]): string | null {
  const normalized = slug.toLowerCase();
  return regions.find(r => slugifyRegion(r) === normalized) ?? null;
}

export function buildRegionAirportMap(
  airports: { region?: string | null }[]
): Map<string, number> {
  const map = new Map<string, number>();
  airports.forEach(a => {
    if (a.region) {
      map.set(a.region, (map.get(a.region) ?? 0) + 1);
    }
  });
  return map;
}

export function buildRegionCountryMap(
  airports: { region?: string | null; country?: string | null }[]
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  airports.forEach(a => {
    if (a.region && a.country) {
      if (!map.has(a.region)) map.set(a.region, new Set());
      map.get(a.region)!.add(a.country);
    }
  });
  return map;
}
