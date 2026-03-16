import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Building2, Shield, Bed, Globe, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAllCountries, getAirportsByCountry, getPropertyCountByCountry } from '../lib/supabase-data';
import { countryFromSlug } from '../lib/country-utils';
import { buildItemListSchema, buildFaqPageSchema } from '../lib/schema-helpers';
import type { Airport } from '../lib/supabase';

const SITE_URL = 'https://www.hotelinairport.com';

interface FaqItem {
  question: string;
  answer: string;
}

function buildFaqs(country: string, airportCount: number, propertyCount: number): FaqItem[] {
  const faqs: FaqItem[] = [
    {
      question: `What types of airport hotels are available in ${country}?`,
      answer: `Airports in ${country} offer a range of accommodation options including airside transit hotels (inside the secure zone), terminal-connected hotels (accessible without going outside), sleep pods, and landside hotels near the terminal. The type available depends on the specific airport.`,
    },
    {
      question: `Can I stay at an airport hotel in ${country} without clearing immigration?`,
      answer: `Some airports in ${country} have airside hotels that are accessible before immigration, meaning you can rest without officially entering the country. Others require you to clear immigration first. Always check the property's access type before booking.`,
    },
    {
      question: `How many airports in ${country} have hotel options listed?`,
      answer: `HotelInAirport currently lists ${airportCount} airport${airportCount !== 1 ? 's' : ''} in ${country}${propertyCount > 0 ? ` with ${propertyCount} hotel and rest option${propertyCount !== 1 ? 's' : ''}` : ''}. Coverage is updated as new properties are verified.`,
    },
    {
      question: `Do I need a transit visa to use airside hotels in ${country}?`,
      answer: `Transit visa requirements in ${country} depend on your passport nationality. Airside hotels generally do not require a transit visa since you remain in the secure zone, but landside and terminal-connected properties may require you to hold a valid visa or entry permission. Check HotelInAirport's layover access tool for your specific passport.`,
    },
    {
      question: `What is the difference between an airside and terminal-connected hotel in ${country}?`,
      answer: `An airside hotel in ${country} is located inside the secure transit zone and is accessible without clearing immigration. A terminal-connected hotel is linked to the terminal by a walkway or bridge but is on the landside, meaning you need to clear immigration first. The access type shown on each listing makes this distinction clear.`,
    },
  ];
  return faqs;
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

function CountryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [country, setCountry] = useState<string | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const allCountries = await getAllCountries();
      const resolved = countryFromSlug(slug, allCountries);

      if (!resolved) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCountry(resolved);

      const [airportData, propCount] = await Promise.all([
        getAirportsByCountry(resolved),
        getPropertyCountByCountry(resolved),
      ]);

      setAirports(airportData);
      setPropertyCount(propCount);
      setLoading(false);
    }

    load();
  }, [slug]);

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

  if (notFound || !country) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find airport data for this country.</p>
          <Link to="/countries" className="bg-action hover:bg-action-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Browse All Countries
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const faqs = buildFaqs(country, airports.length, propertyCount);
  const canonicalUrl = `${SITE_URL}/country/${slug}`;

  const itemListSchema = buildItemListSchema(
    `Airports with Hotels in ${country}`,
    airports.map((airport) => ({
      name: airport.airport_name || airport.airport_code,
      url: `/airports/${airport.slug}`,
    }))
  );

  const faqPageSchema = buildFaqPageSchema(faqs);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={`Airport Hotels in ${country}`}
        description={`Find airport hotels, transit hotels, sleep pods, and terminal-connected stays in ${country}. Compare airport accommodation options for layovers and overnight transit.`}
        keywords={`airport hotels ${country}, transit hotels ${country}, layover hotels ${country}, airside hotels ${country}, terminal connected hotels ${country}, airport accommodation ${country}`}
        canonical={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Countries', url: '/countries' },
          { name: country, url: `/country/${slug}` },
        ]}
      />

      {airports.length > 0 && (
        <script
          id="schema-country-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        id="schema-country-faq"
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
                <li><Link to="/countries" className="hover:text-white transition-colors">Countries</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li className="text-white font-medium" aria-current="page">{country}</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Airport Hotels in {country}
            </h1>
            <p className="text-lg max-w-[800px] leading-relaxed mb-8" style={{ color: '#CBD5E1' }}>
              Find airside transit hotels, terminal-connected airport stays, sleep pods, and layover accommodation across airports in {country}. Whether you have a short stopover or an overnight connection, this directory helps you identify rest options before you land.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-action" />
                <span className="font-semibold">{airports.length} airport{airports.length !== 1 ? 's' : ''}</span>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Airports in {country}
            </h2>

            {airports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No airports currently listed for {country}.</p>
                <Link to="/airports" className="inline-flex items-center gap-2 mt-6 text-action hover:text-action-hover font-semibold">
                  Browse all airports <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                    {airport.city && (
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {airport.city}
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

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Layover Planning in {country}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Planning a layover in {country} requires understanding how airports in the country handle transit passengers. Some airports have dedicated airside hotels inside the secure zone, which means you can rest without clearing immigration or obtaining a visa. Others offer terminal-connected hotels that are directly linked to the arrivals or departures area, giving you easy access after you clear passport control.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Transit and layover hotel access in {country} may vary based on your passport and nationality. Use HotelInAirport's layover access tool on each airport page to check whether you can access specific properties without a visa or transit permit.
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
                to="/countries"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                All Countries
              </Link>
              <Link
                to="/airports"
                className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Browse All Airports
              </Link>
              <Link
                to="/hotels"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                View All Hotels
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CountryDetail;
