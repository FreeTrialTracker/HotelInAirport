import { slugifyCountry, slugifyRegion } from './country-utils';
import type { Property } from './supabase';

export type TopicType = 'transit-hotels' | 'sleep-pods' | 'layover-hotels';

export interface TopicMeta {
  title: string;
  description: string;
  h1: string;
  label: string;
}

export function getTopicMeta(topic: TopicType, airportName: string, city?: string, country?: string): TopicMeta {
  const display = airportName;
  const loc = [city, country].filter(Boolean).join(', ');
  const locPhrase = loc ? ` in ${loc}` : '';

  if (topic === 'transit-hotels') {
    return {
      title: `Transit Hotels at ${display} | Airport Layover Stays`,
      description: `Find airside transit hotels at ${display}${locPhrase}. Rest between flights without clearing immigration. Compare transit stay options for layover travelers.`,
      h1: `Transit Hotels at ${display}`,
      label: 'Transit Hotels',
    };
  }
  if (topic === 'sleep-pods') {
    return {
      title: `Sleep Pods at ${display} | Airport Sleeping Options`,
      description: `Discover sleep pods and compact rest options at ${display}${locPhrase}. Ideal for short layovers or overnight connections without a full hotel room.`,
      h1: `Sleep Pods at ${display}`,
      label: 'Sleep Pods',
    };
  }
  return {
    title: `Layover Hotels at ${display} | Airport Accommodation Guide`,
    description: `Browse layover hotels at ${display}${locPhrase}. Includes terminal-connected hotels, nearby airport hotels, and airport area accommodation for transit travelers.`,
    h1: `Layover Hotels at ${display}`,
    label: 'Layover Hotels',
  };
}

export function filterPropertiesForTopic(properties: Property[], topic: TopicType): Property[] {
  if (topic === 'transit-hotels') {
    const airside = properties.filter(
      (p) =>
        p.access_type === 'airside' &&
        ['transit_hotel', 'capsule_hotel', 'sleep_pods', 'sleep_lounge'].includes(p.property_type || '')
    );
    if (airside.length > 0) return airside;
    return properties.filter((p) => p.access_type === 'airside');
  }
  if (topic === 'sleep-pods') {
    const pods = properties.filter((p) =>
      ['sleep_pods', 'capsule_hotel', 'sleep_lounge'].includes(p.property_type || '')
    );
    if (pods.length > 0) return pods;
    return properties.filter((p) => p.access_type === 'airside');
  }
  const layover = properties.filter(
    (p) => p.access_type === 'terminal_connected' || p.access_type === 'nearby' || p.access_type === 'landside'
  );
  if (layover.length > 0) return layover;
  return properties;
}

export function buildTopicIntro(topic: TopicType, ctx: AirportContext): string {
  const { airportName, airportCode, city, country } = ctx;
  const display = airportName || airportCode;
  const loc = [city, country].filter(Boolean).join(', ');
  const locPhrase = loc ? ` in ${loc}` : '';

  if (topic === 'transit-hotels') {
    return `${display}${locPhrase} has airside transit hotel options that allow layover travelers to rest between flights without passing through immigration. These accommodations are located inside the secure transit zone, accessible with a valid onward boarding pass.`;
  }
  if (topic === 'sleep-pods') {
    return `Sleep pods and compact rest options at ${display}${locPhrase} are designed for short layovers or overnight connections where a full hotel room is not needed. These units typically offer a private sleeping space, charging points, and basic amenities at hourly or nightly rates.`;
  }
  return `Layover hotels at ${display}${locPhrase} range from terminal-connected properties to nearby airport hotels accessible after clearing immigration. Whether you have a few hours between flights or an overnight connection, this guide covers your accommodation options.`;
}

export function buildTopicFallbackNote(topic: TopicType, airportName: string): string {
  if (topic === 'transit-hotels') {
    return `No dedicated airside transit hotels are currently listed for ${airportName}. Options below are the closest available accommodation. Check the main airport page for a full overview of all listed stay types.`;
  }
  if (topic === 'sleep-pods') {
    return `No dedicated sleep pod or capsule options are currently listed for ${airportName}. Showing nearest available airside or transit options. Check the main airport page for a complete listing.`;
  }
  return `Showing all listed accommodation options at ${airportName}. For a full breakdown by access type, visit the main airport page.`;
}

export function getAirportTopicLinks(slug: string): { label: string; path: string; topic: TopicType }[] {
  return [
    { label: 'Transit Hotels', path: `/airports/${slug}/transit-hotels`, topic: 'transit-hotels' },
    { label: 'Sleep Pods', path: `/airports/${slug}/sleep-pods`, topic: 'sleep-pods' },
    { label: 'Layover Hotels', path: `/airports/${slug}/layover-hotels`, topic: 'layover-hotels' },
  ];
}

export interface AirportContext {
  airportName: string;
  airportCode: string;
  city?: string;
  country?: string;
  region?: string;
  propertyCount: number;
}

export function buildAirportIntro(ctx: AirportContext): string {
  const { airportName, airportCode, city, country, region, propertyCount } = ctx;
  const displayName = airportName || airportCode;
  const location = [city, country].filter(Boolean).join(', ');

  if (propertyCount === 0) {
    const locationPhrase = location ? ` in ${location}` : '';
    const regionPhrase = region ? ` — one of the busiest transit corridors in ${region} —` : '';
    return `${displayName}${locationPhrase}${regionPhrase} is an international hub where travelers regularly seek layover accommodation options. While our live property listings are still being compiled for this airport, the guides and planning resources on this page will help you understand what types of airport stays are typically available and how to prepare for a layover here.`;
  }

  if (propertyCount <= 2) {
    const locationPhrase = location ? ` in ${location}` : '';
    return `${displayName}${locationPhrase} has a limited number of verified airport accommodation options listed here. Whether you need a short rest between connections or an overnight stay, this page covers what is available and how to plan your layover based on access type and transit rules.`;
  }

  const locationPhrase = location ? ` serving ${location}` : '';
  const regionPhrase = region ? ` in ${region}` : '';
  return `${displayName}${locationPhrase} is an international airport${regionPhrase} with multiple layover accommodation options for transit passengers. This page lists verified airport hotels, transit stays, sleep pods, and terminal-connected options to help you plan a layover with or without clearing immigration.`;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildAirportFaqs(ctx: AirportContext): FaqItem[] {
  const { airportName, airportCode, city, country, propertyCount } = ctx;
  const displayName = airportName || airportCode;
  const locationPhrase = city ? ` in ${city}` : country ? ` in ${country}` : '';

  return [
    {
      question: `Are there airport hotels at ${displayName}?`,
      answer:
        propertyCount > 0
          ? `Yes. HotelInAirport lists ${propertyCount} accommodation option${propertyCount !== 1 ? 's' : ''} at or near ${displayName}. These include a mix of access types — airside, terminal-connected, and nearby landside properties depending on availability.`
          : `We are still compiling verified property listings for ${displayName}. Options typically available at international airports include airside transit hotels (no immigration needed), terminal-connected hotels, and nearby landside hotels accessible after clearing customs.`,
    },
    {
      question: `Can you stay inside the airport during a layover at ${displayName}?`,
      answer: `Whether you can stay airside — inside the secure transit zone without clearing immigration — depends on the airport's facilities and your passport country. Some airports${locationPhrase} have dedicated airside rest areas or transit hotels. Check the access type on each listed property or use the passport selector above to see rules specific to your situation.`,
    },
    {
      question: `What is the difference between airside and terminal-connected hotels at ${displayName}?`,
      answer: `Airside hotels are located inside the secured transit zone. You typically do not need to pass through immigration to access them, but you do need a valid onward boarding pass. Terminal-connected hotels are physically attached to or directly connected with the terminal building but are on the landside — you generally need to clear immigration first. Landside and shuttle-access hotels are further from the terminal and always require immigration clearance.`,
    },
    {
      question: `Do I need a transit visa for a layover at ${displayName}?`,
      answer: `Transit visa requirements at ${displayName} depend on your passport nationality and whether you plan to leave the secure transit zone. Use the passport selector on this page to check specific rules for your country. For airside stays (remaining in the transit zone), a transit visa is usually not required, but exceptions exist. Always verify with official airline or government sources before traveling.`,
    },
    {
      question: `How should I prepare for an overnight layover at ${displayName}?`,
      answer: `For an overnight layover at ${displayName}, confirm your connection time, check whether your preferred accommodation requires immigration clearance, and verify whether your passport nationality requires a transit visa. If you plan to leave the airport, check entry requirements for ${country ?? 'the destination country'}. Booking airport accommodation in advance is recommended for busy hubs.`,
    },
  ];
}

export function buildLayoverPlanningNote(ctx: AirportContext): string {
  const { airportName, airportCode, country } = ctx;
  const displayName = airportName || airportCode;
  const countryPhrase = country ? ` in ${country}` : '';

  return `When planning a layover at ${displayName}, there are several factors worth checking before booking any airport accommodation. First, confirm whether your passport nationality requires a transit visa or whether airside transit is permitted without a visa at this airport${countryPhrase}. Second, check the access type of any hotel or rest area — airside options require no immigration clearance, while terminal-connected and landside stays require passport control. Third, consider your connection time: short layovers (under four hours) are usually best suited to airside rest areas or sleep pods, while overnight connections may benefit from a full hotel room, even if it means clearing immigration briefly. Finally, check whether your airline provides a transit hotel voucher for long delays or overnight connections, as this can affect which options are worth booking independently.`;
}

export function getCountrySlug(country: string | undefined): string | null {
  if (!country) return null;
  return slugifyCountry(country);
}

export function getRegionSlug(region: string | undefined): string | null {
  if (!region) return null;
  return slugifyRegion(region);
}

export function buildAirportSeoTitle(
  airportName: string,
  airportCode: string,
  city?: string
): string {
  const display = airportName || airportCode;
  const cityPart = city ? ` ${city}` : '';
  return `${display} Airport Hotels${cityPart} — Layover & Transit Accommodation`;
}

export function buildAirportSeoDescription(
  airportName: string,
  airportCode: string,
  city?: string,
  country?: string
): string {
  const display = airportName || airportCode;
  const locationParts = [city, country].filter(Boolean);
  const locationPhrase =
    locationParts.length > 0 ? ` in ${locationParts.join(', ')}` : '';
  return `Find transit hotels, airside sleep options, terminal-connected hotels, and sleep pods at ${display}${locationPhrase}. Compare layover accommodation with and without immigration clearance.`;
}
