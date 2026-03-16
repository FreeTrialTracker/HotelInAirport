import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { MapPin, Shield, Building2, Bed, Globe, Info, Flag, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAirportBySlug, getPropertiesByAirportCode } from '../lib/supabase-data';
import type { Airport, Property } from '../lib/supabase';
import {
  getTopicMeta,
  filterPropertiesForTopic,
  buildTopicIntro,
  buildTopicFallbackNote,
  getAirportTopicLinks,
  getCountrySlug,
  getRegionSlug,
} from '../lib/airport-helpers';
import type { TopicType } from '../lib/airport-helpers';
import { buildItemListSchema } from '../lib/schema-helpers';

const SITE_URL = 'https://www.hotelinairport.com';

const TOPIC_SLUGS: Record<string, TopicType> = {
  'transit-hotels': 'transit-hotels',
  'sleep-pods': 'sleep-pods',
  'layover-hotels': 'layover-hotels',
};

const TOPIC_ICONS: Record<TopicType, typeof Shield> = {
  'transit-hotels': Shield,
  'sleep-pods': Bed,
  'layover-hotels': Building2,
};

function formatPropertyType(type?: string) {
  if (!type) return 'Hotel';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatAccessType(type?: string | null) {
  if (!type) return 'Airport Area';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {property.property_name || 'Airport Hotel'}
      </h3>
      <div className="flex flex-wrap gap-3 mb-3">
        <span className="text-sm px-3 py-1 bg-blue-50 text-info rounded-full font-medium">
          {formatPropertyType(property.property_type)}
        </span>
        {property.access_type && (
          <span className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
            {formatAccessType(property.access_type)}
          </span>
        )}
      </div>
      {property.gate_info && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Gate Info:</span> {property.gate_info}
        </p>
      )}
      {property.notes && (
        <p className="text-gray-600 mb-4 leading-relaxed">{property.notes}</p>
      )}
      <div className="space-y-1 mb-4">
        {property.estimated_rate_hourly && (
          <div className="text-sm font-semibold text-gray-900">
            Hourly Rate: {property.currency || '$'}{property.estimated_rate_hourly}
          </div>
        )}
        {property.estimated_rate_daily && (
          <div className="text-sm font-semibold text-gray-900">
            Daily Rate: {property.currency || '$'}{property.estimated_rate_daily}
          </div>
        )}
      </div>
      {property.booking_or_ota_url && (
        <a
          href={property.booking_or_ota_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-action hover:bg-action-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
        >
          View Property
        </a>
      )}
    </div>
  );
}

function AirportTopicPage() {
  const { slug, topic: topicParam } = useParams<{ slug: string; topic: string }>();
  const [airport, setAirport] = useState<Airport | null>(null);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const topic = topicParam ? TOPIC_SLUGS[topicParam] : undefined;

  useEffect(() => {
    async function load() {
      if (!slug) { setLoading(false); return; }
      const airportData = await getAirportBySlug(slug);
      setAirport(airportData);
      if (airportData?.airport_code) {
        const props = await getPropertiesByAirportCode(airportData.airport_code);
        setAllProperties(props);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const topicProperties = useMemo(() => {
    if (!topic) return allProperties;
    return filterPropertiesForTopic(allProperties, topic);
  }, [allProperties, topic]);

  const isFallback = useMemo(() => {
    if (!topic || allProperties.length === 0) return false;
    const exact = filterPropertiesForTopic(allProperties, topic);
    if (topic === 'transit-hotels') {
      const strictMatch = allProperties.filter(
        (p) =>
          p.access_type === 'airside' &&
          ['transit_hotel', 'capsule_hotel', 'sleep_pods', 'sleep_lounge'].includes(p.property_type || '')
      );
      return strictMatch.length === 0;
    }
    if (topic === 'sleep-pods') {
      const strictMatch = allProperties.filter((p) =>
        ['sleep_pods', 'capsule_hotel', 'sleep_lounge'].includes(p.property_type || '')
      );
      return strictMatch.length === 0;
    }
    if (topic === 'layover-hotels') {
      const strictMatch = allProperties.filter(
        (p) => p.access_type === 'terminal_connected' || p.access_type === 'nearby' || p.access_type === 'landside'
      );
      return strictMatch.length === 0 && exact.length > 0;
    }
    return false;
  }, [allProperties, topic]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!airport || !topic) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <Link to="/airports" className="text-action hover:underline">Browse all airports</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = airport.airport_name || airport.airport_code;
  const countrySlug = getCountrySlug(airport.country);
  const regionSlug = getRegionSlug(airport.region);
  const meta = getTopicMeta(topic, displayName, airport.city, airport.country);
  const topicLinks = getAirportTopicLinks(slug!);

  const airportCtx = {
    airportName: airport.airport_name || airport.airport_code,
    airportCode: airport.airport_code,
    city: airport.city,
    country: airport.country,
    region: airport.region,
    propertyCount: allProperties.length,
  };
  const introText = buildTopicIntro(topic, airportCtx);
  const fallbackNote = buildTopicFallbackNote(topic, displayName);

  const canonicalUrl = `${SITE_URL}/airports/${slug}/${topicParam}`;

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Airports', url: '/airports' },
    { name: displayName, url: `/airports/${slug}` },
    { name: meta.label, url: `/${slug}/${topicParam}` },
  ];

  const itemListSchema =
    topicProperties.length > 0
      ? buildItemListSchema(
          `${meta.label} at ${displayName}`,
          topicProperties
            .filter((p) => Boolean(p.property_name))
            .map((p) => ({
              name: p.property_name!,
              url: p.booking_or_ota_url || `${SITE_URL}/airports/${slug}`,
            }))
        )
      : null;

  const TopicIcon = TOPIC_ICONS[topic];

  const otherTopicLinks = topicLinks.filter((t) => t.topic !== topic);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={canonicalUrl}
        breadcrumbs={breadcrumbItems}
      />
      {itemListSchema && (
        <script
          id="schema-topic-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <Navbar />
      <main id="main-content" className="flex-1">

        <section className="py-12 px-6" style={{ background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)' }}>
          <div className="max-w-[1200px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li><Link to="/airports" className="hover:text-white transition-colors">Airports</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li>
                  <Link to={`/airports/${slug}`} className="hover:text-white transition-colors">
                    {displayName}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li className="text-white font-medium" aria-current="page">{meta.label}</li>
              </ol>
            </nav>

            <div className="mb-3 flex items-center gap-2">
              <TopicIcon className="w-4 h-4 text-action" />
              <span className="text-xs font-bold text-action uppercase tracking-wider">
                {meta.label.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {meta.h1}
            </h1>
            <p className="text-lg mb-6 max-w-[900px] leading-relaxed" style={{ color: '#CBD5E1' }}>
              {introText}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#94A3B8' }}>
              {[airport.city, airport.country, airport.airport_code].filter(Boolean).map((item, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  {item}
                  {i < arr.length - 1 && <span className="text-gray-600">•</span>}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/airports/${slug}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All stays at {airport.airport_code}
              </Link>
              {airport.country && countrySlug && (
                <Link
                  to={`/country/${countrySlug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
                >
                  <Flag className="w-3.5 h-3.5" />
                  Airports in {airport.country}
                </Link>
              )}
              {airport.region && regionSlug && (
                <Link
                  to={`/region/${regionSlug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {airport.region}
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-10 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                More Stay Options at {displayName}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/airports/${slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 hover:border-action hover:text-action px-4 py-2 rounded-lg transition-colors"
                >
                  All Airport Hotels
                </Link>
                {topicLinks.map((t) => (
                  <Link
                    key={t.topic}
                    to={t.path}
                    className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      t.topic === topic
                        ? 'bg-action text-white border border-action'
                        : 'text-gray-700 border border-gray-300 hover:border-action hover:text-action'
                    }`}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-6">
          <div className="max-w-[1200px] mx-auto">
            {isFallback && allProperties.length > 0 && (
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{fallbackNote}</p>
              </div>
            )}

            {topicProperties.length > 0 ? (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {meta.label} at {displayName}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed max-w-[800px]">
                  {topicProperties.length === 1
                    ? `${topicProperties.length} option is currently listed for this stay type at ${displayName}.`
                    : `${topicProperties.length} options are currently listed for this stay type at ${displayName}.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{meta.label} at {displayName}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  No verified {meta.label.toLowerCase()} are currently listed for {displayName}. Our database is actively updated.
                  In the meantime, view the{' '}
                  <Link to={`/airports/${slug}`} className="text-action hover:underline font-medium">
                    full airport page
                  </Link>{' '}
                  for all available stay options.
                </p>
                <div className="flex flex-wrap gap-3">
                  {otherTopicLinks.map((t) => (
                    <Link
                      key={t.topic}
                      to={t.path}
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 hover:border-action hover:text-action px-4 py-2 rounded-lg transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              About {meta.label} at {displayName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px]">
              {topic === 'transit-hotels' && (
                <>
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                    <Shield className="w-5 h-5 text-action mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">No Immigration Required</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Airside transit hotels are located inside the secure zone. A valid onward boarding pass is typically all that is needed.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <MapPin className="w-5 h-5 text-info mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Location</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      These hotels are positioned after passport control, meaning you stay within the transit zone throughout your layover.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <Info className="w-5 h-5 text-gray-500 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Who They Suit</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Best for travelers with passports that require a transit visa to clear immigration, or those preferring the simplicity of staying airside.
                    </p>
                  </div>
                </>
              )}
              {topic === 'sleep-pods' && (
                <>
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                    <Bed className="w-5 h-5 text-action mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Compact and Efficient</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Sleep pods are designed for short stays, offering a private sleep space with basic amenities at hourly or per-night rates.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <Shield className="w-5 h-5 text-info mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Often Airside</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Many sleep pod facilities are located in the transit zone, making them accessible without clearing immigration.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <Info className="w-5 h-5 text-gray-500 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Ideal For</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Travelers with layovers of 2–8 hours who want a quiet space to rest rather than a full hotel room.
                    </p>
                  </div>
                </>
              )}
              {topic === 'layover-hotels' && (
                <>
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                    <Building2 className="w-5 h-5 text-action mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Terminal-Connected</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      These hotels are directly connected to the terminal by a walkway or bridge, minimising travel time from your gate.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <MapPin className="w-5 h-5 text-info mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Immigration Needed</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Most terminal-connected and nearby hotels require you to clear immigration before accessing them.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <Info className="w-5 h-5 text-gray-500 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Best For Long Layovers</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ideal for overnight connections or layovers over 8 hours where a full hotel room and proper sleep are worthwhile.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Explore All Stay Options at {displayName}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-[800px]">
                {displayName} may have multiple types of accommodation available for layover travelers. Use the links below to compare all listed options and find the best fit for your connection.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/airports/${slug}`}
                  className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  View All Hotel Options
                </Link>
                {otherTopicLinks.map((t) => (
                  <Link
                    key={t.topic}
                    to={t.path}
                    className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default AirportTopicPage;
