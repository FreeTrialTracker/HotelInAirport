import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { MapPin, Building2, Shield, Bed, Globe, Flag, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAllRegions, getAirportsByRegion, getPropertyCountByRegion } from '../lib/supabase-data';
import { regionFromSlug, slugifyCountry, slugifyRegion } from '../lib/country-utils';
import { buildItemListSchema, buildFaqPageSchema } from '../lib/schema-helpers';
import { REGIONS } from '../constants';
import type { Airport } from '../lib/supabase';

const SITE_URL = 'https://www.hotelinairport.com';

const REGION_INTROS: Record<string, string> = {
  'Asia Pacific': 'Asia Pacific is home to some of the world\'s most important aviation hubs, including Singapore Changi, Tokyo Haneda, Hong Kong, and Sydney. Many airports in the region offer airside transit hotels, sleep pods, and terminal-connected stays that are accessible without clearing immigration — making this one of the best regions for layover planning.',
  'Europe': 'Europe\'s major airports connect passengers across hundreds of routes and offer a wide range of layover accommodation options. From airside transit hotels at Amsterdam Schiphol and Frankfurt to terminal-connected stays at London Heathrow, Europe is well equipped for travelers with overnight connections and long layovers.',
  'Middle East': 'The Middle East hosts some of the world\'s busiest connecting hubs, with Dubai, Doha, and Abu Dhabi handling millions of transit passengers every year. Airports in this region are known for premium airside hotels, high-end transit facilities, and layover accommodation that can be accessed without immigration clearance.',
  'North America': 'North American airports generally require immigration clearance before accessing hotels, which makes terminal-connected and landside options the most common type in the region. Major hubs including JFK, LAX, Toronto, and Chicago offer a range of airport stays for travelers with overnight layovers or extended connections.',
  'Africa': 'Africa\'s gateway airports, including Addis Ababa, Nairobi, and Johannesburg, offer increasing numbers of airport hotels and transit options for international travelers. Layover accommodation on the continent ranges from terminal-connected hotels to nearby airport stays accessible after clearing immigration.',
  'Latin America': 'Latin America\'s main hub airports including São Paulo, Mexico City, Bogotá, and Panama City offer airport hotels and transit accommodation for international travelers. Most properties in the region are landside, making immigration clearance a consideration when planning an airport layover stay.',
};

const REGION_LAYOVER_NOTES: Record<string, string> = {
  'Asia Pacific': 'Many airports across Asia Pacific operate 24 hours and have dedicated transit zones with rest facilities. Travelers from certain passport countries may access airside hotels without a transit visa. Always check your passport nationality against the airport\'s transit rules.',
  'Europe': 'European airports are generally efficient for transit passengers, though immigration rules vary significantly between Schengen and non-Schengen terminals. Airside hotel options exist at several hubs, and terminal-connected hotels are common at larger airports. Check whether your layover airport has a Schengen transit visa requirement for your nationality.',
  'Middle East': 'Gulf hub airports frequently offer layover packages directly through the airline or airport, which can include airside hotel stays, meals, and city tours depending on layover duration. Most airside hotels in this region do not require a visa to access if you remain in the transit zone.',
  'North America': 'US and Canadian airports generally require all arriving passengers to clear customs and immigration, which means there are no true airside hotels in the region. Terminal-connected hotels are the closest equivalent and are available at several major hubs. Plan for immigration wait times when calculating your layover window.',
  'Africa': 'Transit options in Africa vary considerably by airport. Some hubs such as Addis Ababa and Nairobi offer transit hotel arrangements, but many options require immigration clearance. Visa-on-arrival policies differ widely, so check entry requirements for your passport nationality before booking.',
  'Latin America': 'Most airports in Latin America do not have airside hotel options inside the secure transit zone. Travelers typically need to clear immigration before accessing accommodation. Terminal-connected or nearby airport hotels are available at the region\'s major hubs and offer a practical solution for overnight layovers.',
};

interface FaqItem {
  question: string;
  answer: string;
}

function buildFaqs(region: string, airportCount: number, countryCount: number, propertyCount: number): FaqItem[] {
  return [
    {
      question: `What types of airport hotels are available in ${region}?`,
      answer: `Airports across ${region} offer a range of accommodation types including airside transit hotels (inside the secure zone, no immigration needed), terminal-connected hotels (linked directly to the terminal), sleep pods, and landside hotels near the terminal. Availability varies by airport.`,
    },
    {
      question: `Can I stay at an airport hotel in ${region} without clearing immigration?`,
      answer: `Some airports in ${region} have airside facilities that let you rest without passing through immigration. Others require you to clear passport control first. The access type shown on each airport listing on HotelInAirport indicates whether immigration clearance is required.`,
    },
    {
      question: `How many airports in ${region} are covered by HotelInAirport?`,
      answer: `HotelInAirport currently lists ${airportCount} airport${airportCount !== 1 ? 's' : ''} across ${countryCount} countr${countryCount !== 1 ? 'ies' : 'y'} in ${region}${propertyCount > 0 ? `, with ${propertyCount} hotel and rest option${propertyCount !== 1 ? 's' : ''}` : ''}. Coverage continues to expand as new properties are verified.`,
    },
    {
      question: `Do I need a transit visa to use airside hotels in ${region}?`,
      answer: `Transit visa requirements vary by country and passport. Airside hotels generally do not require a transit visa because you remain in the secure zone. However, some airports in ${region} have specific transit visa rules depending on your nationality. Use the layover access tool on each airport page to check your passport.`,
    },
    {
      question: `How do I find the best airport hotel for my layover in ${region}?`,
      answer: `Start by selecting the specific airport you are transiting through on HotelInAirport. Each airport page lists available hotels by access type and shows whether immigration clearance is needed. You can also filter by layover duration to see which options are practical for your connection time.`,
    },
  ];
}

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="pr-4">{faq.question}</span>
            {openIndex === i ? (
              <ChevronUp className="w-5 h-5 text-action flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RegionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [region, setRegion] = useState<string | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const regionNames = useMemo(() => REGIONS.map(r => r.name), []);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const dbRegions = await getAllRegions();
      const allRegionNames = Array.from(new Set([...regionNames, ...dbRegions]));
      const resolved = regionFromSlug(slug, allRegionNames);

      if (!resolved) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setRegion(resolved);

      const [airportData, propCount] = await Promise.all([
        getAirportsByRegion(resolved),
        getPropertyCountByRegion(resolved),
      ]);

      setAirports(airportData);
      setPropertyCount(propCount);
      setLoading(false);
    }

    load();
  }, [slug, regionNames]);

  const countries = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    airports.forEach(a => {
      if (a.country && !seen.has(a.country)) {
        seen.add(a.country);
        list.push(a.country);
      }
    });
    return list.sort((a, b) => a.localeCompare(b));
  }, [airports]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !region) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Region Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find airport data for this region.</p>
          <Link to="/regions" className="bg-action hover:bg-action-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Browse All Regions
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const regionSlug = slugifyRegion(region);
  const canonicalUrl = `${SITE_URL}/region/${regionSlug}`;
  const intro = REGION_INTROS[region] ?? `Explore airport hotels, transit hotels, sleep pods, and layover accommodation across airports in ${region}. Use this directory to plan your next airport stay.`;
  const layoverNote = REGION_LAYOVER_NOTES[region] ?? `Transit and layover rules vary across airports in ${region}. Always check access type and immigration requirements on each airport page before booking.`;
  const faqs = buildFaqs(region, airports.length, countries.length, propertyCount);

  const itemListSchema = buildItemListSchema(
    `Airports with Hotels in ${region}`,
    airports.map((airport) => ({
      name: airport.airport_name || airport.airport_code,
      url: `/airports/${airport.slug}`,
    }))
  );

  const faqPageSchema = buildFaqPageSchema(faqs);

  const airportsByCountry = useMemo(() => {
    const map = new Map<string, Airport[]>();
    airports.forEach(a => {
      const key = a.country ?? 'Unknown';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    });
    return map;
  }, [airports]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={`Airport Hotels in ${region}`}
        description={`Find airport hotels, transit hotels, sleep pods, and terminal-connected stays across ${region}. Explore airports by country and compare layover accommodation options.`}
        keywords={`airport hotels ${region}, transit hotels ${region}, layover hotels ${region}, airside hotels ${region}, airport accommodation ${region}`}
        canonical={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Regions', url: '/regions' },
          { name: region, url: `/region/${regionSlug}` },
        ]}
      />

      {airports.length > 0 && (
        <script
          id="schema-region-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        id="schema-region-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <Navbar />
      <main id="main-content" className="flex-1">
        <section
          className="text-white py-16 px-6"
          style={{ background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)' }}
        >
          <div className="max-w-[1200px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li><Link to="/regions" className="hover:text-white transition-colors">Regions</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li className="text-white font-medium" aria-current="page">{region}</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Airport Hotels in {region}
            </h1>
            <p className="text-lg max-w-[820px] leading-relaxed mb-8" style={{ color: '#CBD5E1' }}>
              {intro}
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-action" />
                <span className="font-semibold">{airports.length} airport{airports.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Flag className="w-5 h-5 text-action" />
                <span className="font-semibold">{countries.length} countr{countries.length !== 1 ? 'ies' : 'y'}</span>
              </div>
              {propertyCount > 0 && (
                <div className="flex items-center gap-2 text-white">
                  <Building2 className="w-5 h-5 text-action" />
                  <span className="font-semibold">{propertyCount} hotel{propertyCount !== 1 ? 's' : ''} &amp; rest option{propertyCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#F9FAFB]">
          <div className="max-w-[1200px] mx-auto">

            {countries.length > 0 && (
              <div className="mb-14">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Countries in {region}
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Select a country to browse its airports and layover hotel options.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {countries.map(country => {
                    const airportsInCountry = airportsByCountry.get(country) ?? [];
                    return (
                      <Link
                        key={country}
                        to={`/country/${slugifyCountry(country)}`}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-action/40 transition-all group text-center flex flex-col items-center gap-1"
                      >
                        <span className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors leading-snug">
                          {country}
                        </span>
                        <span className="text-xs text-gray-400">
                          {airportsInCountry.length} airport{airportsInCountry.length !== 1 ? 's' : ''}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Airports in {region}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Browse all airports in {region} with listed hotel and rest options.
              </p>

              {airports.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                  <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No airports currently listed for {region}.</p>
                  <Link to="/airports" className="inline-flex items-center gap-2 mt-6 text-action hover:text-action-hover font-semibold">
                    Browse all airports <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {airports.map((airport, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 leading-snug flex-1 pr-3">
                          {airport.airport_name || airport.airport_code}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                          {airport.airport_code}
                        </span>
                      </div>
                      {(airport.city || airport.country) && (
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {[airport.city, airport.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                        Explore airside transit hotels, terminal-connected hotels, and sleep options for layovers at this airport.
                      </p>
                      <Link
                        to={`/airports/${airport.slug}`}
                        className="w-full bg-action hover:bg-action-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center text-sm"
                      >
                        View Airport Hotels
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Layover Planning in {region}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {layoverNote}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Airport Accommodation Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/resources/airside-transit-hotels"
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-action hover:bg-orange-50/40 transition-colors group"
                >
                  <Shield className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Airside Transit Hotels</p>
                    <p className="text-xs text-gray-500 mt-0.5">No immigration required</p>
                  </div>
                </Link>
                <Link
                  to="/resources/terminal-connected-hotels"
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-action hover:bg-orange-50/40 transition-colors group"
                >
                  <Building2 className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Terminal-Connected Hotels</p>
                    <p className="text-xs text-gray-500 mt-0.5">Connected by bridge or walkway</p>
                  </div>
                </Link>
                <Link
                  to="/resources/sleep-pods-lounges"
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-action hover:bg-orange-50/40 transition-colors group"
                >
                  <Bed className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Sleep Pods &amp; Lounges</p>
                    <p className="text-xs text-gray-500 mt-0.5">Capsule and pod options</p>
                  </div>
                </Link>
                <Link
                  to="/resources/immigration-requirements"
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-action hover:bg-orange-50/40 transition-colors group"
                >
                  <Globe className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Immigration Requirements</p>
                    <p className="text-xs text-gray-500 mt-0.5">Visa and entry rules</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <FaqAccordion faqs={faqs} />
            </div>

            <div className="pt-8 border-t border-gray-200 flex flex-wrap gap-4">
              <Link
                to="/regions"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                All Regions
              </Link>
              <Link
                to="/countries"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Browse Countries
              </Link>
              <Link
                to="/airports"
                className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Browse All Airports
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default RegionDetail;
