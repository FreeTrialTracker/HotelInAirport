import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Info, Shield, Building2, Bed, Globe, MapPin, ChevronDown, ChevronUp, Flag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAirportBySlug, getPropertiesByAirportCode, getLayoverAccessRule, evaluateHotelLayoverAccess, getRelatedAirports } from '../lib/supabase-data';
import { getAirportBlogPosts, formatBlogDate } from '../lib/blog-data';
import type { Airport, Property, BlogPost } from '../lib/supabase';
import type { HotelAccessEvaluation } from '../lib/supabase-data';
import { PASSPORT_COUNTRIES, SCORING } from '../constants';
import TransitVisaNotice from '../components/TransitVisaNotice';
import {
  buildAirportIntro,
  buildAirportFaqs,
  buildLayoverPlanningNote,
  getCountrySlug,
  getRegionSlug,
  buildAirportSeoTitle,
  buildAirportSeoDescription,
  getAirportTopicLinks,
} from '../lib/airport-helpers';
import {
  buildFaqPageSchema,
  buildItemListSchema,
  buildLodgingBusinessSchema,
} from '../lib/schema-helpers';

const SITE_URL = 'https://www.hotelinairport.com';

function AirportDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [airport, setAirport] = useState<Airport | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [relatedAirports, setRelatedAirports] = useState<Airport[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAccessibleOnly, setFilterAccessibleOnly] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const passportCountry = searchParams.get('passport') || '';
  const layoverHours = searchParams.get('hours') ? parseFloat(searchParams.get('hours')!) : undefined;

  const handlePassportChange = (country: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (country) {
      newParams.set('passport', country);
    } else {
      newParams.delete('passport');
    }
    setSearchParams(newParams);
  };

  const commonPassportCountries = PASSPORT_COUNTRIES;

  useEffect(() => {
    async function loadAirportData() {
      if (!slug) {
        setLoading(false);
        return;
      }

      const airportData = await getAirportBySlug(slug);
      setAirport(airportData);

      if (airportData?.airport_code) {
        const [propertiesData, related, posts] = await Promise.all([
          getPropertiesByAirportCode(airportData.airport_code),
          getRelatedAirports(
            airportData.airport_code,
            airportData.country,
            airportData.region,
            6
          ),
          getAirportBlogPosts(
            airportData.airport_name || airportData.airport_code,
            airportData.city,
            airportData.country,
            airportData.region,
            3
          ),
        ]);
        setProperties(propertiesData);
        setRelatedAirports(related);
        setBlogPosts(posts);
      }

      setLoading(false);
    }

    loadAirportData();
  }, [slug]);

  const [layoverRule, setLayoverRule] = useState<any>(null);

  useEffect(() => {
    async function loadLayoverRule() {
      if (!passportCountry || !airport?.airport_code) {
        setLayoverRule(null);
        return;
      }
      const rule = await getLayoverAccessRule(passportCountry, airport.airport_code, airport.country);
      setLayoverRule(rule);
    }
    loadLayoverRule();
  }, [passportCountry, airport]);

  const propertiesWithEvaluation = useMemo(() => {
    if (!airport?.airport_code || !passportCountry) {
      return properties.map(p => ({ property: p, evaluation: null, score: 50 }));
    }

    return properties.map(property => {
      const evaluation = evaluateHotelLayoverAccess(
        property,
        passportCountry,
        airport.airport_code!,
        airport.country,
        layoverHours,
        layoverRule
      );

      let score = SCORING.BASE;

      if (property.must_clear_immigration_first === false) {
        score += SCORING.NO_IMMIGRATION_REQUIRED_BONUS;
      }

      if (evaluation.eligibility === 'eligible') {
        score += 0;
      } else if (evaluation.eligibility === 'eligible_with_warning') {
        score += SCORING.ELIGIBILITY_ELIGIBLE_WITH_WARNING;
      } else if (evaluation.eligibility === 'not_recommended') {
        score += SCORING.ELIGIBILITY_NOT_RECOMMENDED;
      } else if (evaluation.eligibility === 'unknown_rule_check_manually') {
        score += SCORING.ELIGIBILITY_UNKNOWN;
      }

      if (property.access_type === 'airside') {
        score += SCORING.AIRSIDE_BONUS;
      } else if (property.access_type === 'terminal_connected') {
        score += SCORING.TERMINAL_CONNECTED_BONUS;
      }

      return { property, evaluation, score };
    });
  }, [properties, passportCountry, airport, layoverHours, layoverRule]);

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = propertiesWithEvaluation;

    if (filterAccessibleOnly && passportCountry) {
      filtered = filtered.filter(({ evaluation }) => {
        if (!evaluation) return true;
        return evaluation.eligibility === 'eligible' || evaluation.eligibility === 'eligible_with_warning';
      });
    }

    return filtered.sort((a, b) => b.score - a.score);
  }, [propertiesWithEvaluation, filterAccessibleOnly, passportCountry]);

  const airsideProperties = filteredAndSortedProperties.filter(({ property }) => {
    if (property.access_type === 'airside') {
      return ['transit_hotel', 'sleep_pods', 'capsule_hotel', 'sleep_lounge'].includes(
        property.property_type || ''
      );
    }
    return false;
  });

  const terminalConnectedProperties = filteredAndSortedProperties.filter(
    ({ property }) => property.access_type === 'terminal_connected'
  );

  const otherProperties = filteredAndSortedProperties.filter(
    ({ property }) =>
      !airsideProperties.find(a => a.property.id === property.id) &&
      !terminalConnectedProperties.find(t => t.property.id === property.id) &&
      property.property_name
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!airport) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Airport Not Found</h1>
            <p className="text-gray-600">The airport you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPropertyType = (type?: string) => {
    if (!type) return 'Hotel';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatAccessType = (type?: string | null) => {
    if (!type) return 'Airport Area';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getEligibilityBadge = (evaluation: HotelAccessEvaluation | null, property: Property) => {
    if (!evaluation) return null;

    const mustClearImmigration = property.must_clear_immigration_first === true;

    const badges = [];

    if (mustClearImmigration) {
      badges.push(
        <span key="immigration" className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
          Immigration required
        </span>
      );
    }

    if (evaluation.eligibility === 'eligible_with_warning') {
      badges.push(
        <span key="warning" className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
          Visa / entry permission may be needed
        </span>
      );
    } else if (evaluation.eligibility === 'not_recommended') {
      badges.push(
        <span key="not-rec" className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
          Not recommended for this passport
        </span>
      );
    } else if (evaluation.eligibility === 'unknown_rule_check_manually') {
      badges.push(
        <span key="unknown" className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
          Check rules manually
        </span>
      );
    }

    return badges.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">{badges}</div> : null;
  };

  const PropertyCard = ({ property, evaluation }: { property: Property; evaluation: HotelAccessEvaluation | null }) => (
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
      {passportCountry && getEligibilityBadge(evaluation, property)}
      {property.gate_info && (
        <p className="text-sm text-gray-600 mb-2 mt-3">
          <span className="font-semibold">Gate Info:</span> {property.gate_info}
        </p>
      )}
      {property.notes && (
        <p className="text-gray-600 mb-4 leading-relaxed">{property.notes}</p>
      )}
      {evaluation?.warning_message && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">{evaluation.warning_message}</p>
        </div>
      )}
      <div className="space-y-1 mb-4">
        {property.estimated_rate_hourly && (
          <div className="text-sm font-semibold text-gray-900">
            Hourly Rate: {property.currency || '$'}
            {property.estimated_rate_hourly}
          </div>
        )}
        {property.estimated_rate_daily && (
          <div className="text-sm font-semibold text-gray-900">
            Daily Rate: {property.currency || '$'}
            {property.estimated_rate_daily}
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

  const TravelRulesSummary = () => {
    if (!passportCountry || !layoverRule) {
      return null;
    }

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-info" />
          Travel Rules Summary
        </h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Transit Access</div>
            <div className="text-gray-700">
              {layoverRule.airside_transit_allowed
                ? `Airside transit is generally allowed for this passport at this airport${
                    layoverRule.max_airside_transit_hours > 0
                      ? ` (up to ${layoverRule.max_airside_transit_hours} hours)`
                      : ''
                  }.`
                : 'Airside transit may not be available. Immigration clearance may be required.'}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Landside Hotel Access</div>
            <div className="text-gray-700">
              Accessing landside hotels requires clearing immigration.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Entry Permission Status</div>
            <div className="text-gray-700">
              {layoverRule.landside_entry_type === 'visa_free_entry' && 'Visa-free entry is available for this passport.'}
              {layoverRule.landside_entry_type === 'visa_on_arrival' && 'Visa on arrival is available for this passport.'}
              {layoverRule.landside_entry_type === 'evisa_required' && 'An e-visa is required for entry.'}
              {layoverRule.landside_entry_type === 'entry_visa_required' && 'A visa is required for entry.'}
              {layoverRule.landside_entry_type === 'transit_without_visa' && 'Transit without visa may be possible.'}
              {layoverRule.landside_entry_type === 'transit_visa_required' && 'A transit visa is required.'}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Confidence</div>
            <div className="text-gray-700">
              Rule confidence: {layoverRule.confidence.charAt(0).toUpperCase() + layoverRule.confidence.slice(1)}
            </div>
          </div>
          {layoverRule.notes && (
            <div className="pt-2 border-t border-blue-200">
              <div className="text-sm text-gray-600 italic">{layoverRule.notes}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const accessCards = [
    {
      title: 'Airside Access',
      text: 'Airside properties are inside the secure transit area and usually require a valid onward boarding pass.',
    },
    {
      title: 'Terminal-Connected Access',
      text: 'These hotels are linked directly to the terminal building but usually require travelers to clear immigration first.',
    },
    {
      title: 'Sleep Pods and Lounges',
      text: 'Some airports provide short-stay pods, rest cabins, or lounge sleep areas for travelers on shorter layovers.',
    },
  ];

  const displayName = airport.airport_name || airport.airport_code;
  const countrySlug = getCountrySlug(airport.country);
  const regionSlug = getRegionSlug(airport.region);

  const airportCtx = {
    airportName: airport.airport_name || airport.airport_code,
    airportCode: airport.airport_code,
    city: airport.city,
    country: airport.country,
    region: airport.region,
    propertyCount: properties.length,
  };

  const intro = buildAirportIntro(airportCtx);
  const layoverNote = buildLayoverPlanningNote(airportCtx);
  const faqs = buildAirportFaqs(airportCtx);

  const seoTitle = buildAirportSeoTitle(airport.airport_name, airport.airport_code, airport.city);
  const seoDescription = buildAirportSeoDescription(airport.airport_name, airport.airport_code, airport.city, airport.country);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Airports', url: '/airports' },
  ];
  if (airport.region && regionSlug) {
    breadcrumbItems.push({ name: airport.region, url: `/region/${regionSlug}` });
  }
  if (airport.country && countrySlug) {
    breadcrumbItems.push({ name: airport.country, url: `/country/${countrySlug}` });
  }
  breadcrumbItems.push({
    name: airport.airport_name || airport.airport_code || slug || '',
    url: `/airports/${slug}`,
  });

  const faqSchema = buildFaqPageSchema(faqs);

  const allDisplayedProperties = [
    ...airsideProperties,
    ...terminalConnectedProperties,
    ...otherProperties,
  ];

  const stayItemListSchema = buildItemListSchema(
    `Airport Hotels at ${displayName}`,
    allDisplayedProperties
      .filter(({ property }) => Boolean(property.property_name))
      .map(({ property }) => ({
        name: property.property_name!,
        url: property.booking_or_ota_url || `${SITE_URL}/airports/${slug}`,
      }))
  );

  const lodgingSchemas = allDisplayedProperties
    .filter(({ property }) => Boolean(property.property_name))
    .map(({ property }) =>
      buildLodgingBusinessSchema({
        name: property.property_name!,
        url: property.booking_or_ota_url || null,
        description: property.notes || null,
        city: property.city || airport.city || null,
        country: property.country || airport.country || null,
        airportName: displayName,
      })
    )
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`${displayName} hotel, ${airport.airport_code} layover hotel, ${airport.city || ''} transit hotel, airside hotel ${airport.airport_code}, terminal connected hotel ${airport.airport_code}, airport accommodation ${airport.airport_code}`}
        canonical={`${SITE_URL}/airports/${slug}`}
        breadcrumbs={breadcrumbItems}
      />
      <script
        id="schema-airport-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {allDisplayedProperties.length > 0 && (
        <>
          <script
            id="schema-airport-itemlist"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(stayItemListSchema) }}
          />
          {lodgingSchemas.length > 0 && (
            <script
              id="schema-airport-lodging"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  lodgingSchemas.length === 1 ? lodgingSchemas[0] : { '@context': 'https://schema.org', '@graph': lodgingSchemas }
                ),
              }}
            />
          )}
        </>
      )}
      <Navbar />
      <main id="main-content" className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6" style={{ background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)' }}>
          <div className="max-w-[1200px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li><Link to="/airports" className="hover:text-white transition-colors">Airports</Link></li>
                {airport.region && regionSlug && (
                  <>
                    <li aria-hidden="true" className="text-gray-500">/</li>
                    <li>
                      <Link to={`/region/${regionSlug}`} className="hover:text-white transition-colors">
                        {airport.region}
                      </Link>
                    </li>
                  </>
                )}
                {airport.country && countrySlug && (
                  <>
                    <li aria-hidden="true" className="text-gray-500">/</li>
                    <li>
                      <Link to={`/country/${countrySlug}`} className="hover:text-white transition-colors">
                        {airport.country}
                      </Link>
                    </li>
                  </>
                )}
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {airport.airport_code}
                </li>
              </ol>
            </nav>

            <div className="mb-3">
              <span className="text-xs font-bold text-action uppercase tracking-wider">
                AIRPORT HOTEL GUIDE
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {displayName} Airport Hotels
            </h1>
            <p className="text-lg mb-6 max-w-[900px] leading-relaxed" style={{ color: '#CBD5E1' }}>
              {intro}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#94A3B8' }}>
              {[airport.city, airport.country, airport.airport_code].filter(Boolean).map((item, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  {item}
                  {i < arr.length - 1 && <span className="text-gray-600">•</span>}
                </span>
              ))}
            </div>

            {/* hierarchy links */}
            <div className="mt-6 flex flex-wrap gap-3">
              {airport.country && countrySlug && (
                <Link
                  to={`/country/${countrySlug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
                >
                  <Flag className="w-3.5 h-3.5" />
                  All airports in {airport.country}
                </Link>
              )}
              {airport.region && regionSlug && (
                <Link
                  to={`/region/${regionSlug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
                >
                  <Globe className="w-3.5 h-3.5" />
                  All airports in {airport.region}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── Quick Overview ────────────────────────────────────────────────── */}
        <section className="py-8 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Layover Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {airport.airport_code && (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Airport Code</div>
                    <div className="text-xl font-bold text-gray-900">{airport.airport_code}</div>
                  </div>
                )}
                {airport.city && (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">City</div>
                    <div className="text-xl font-bold text-gray-900">{airport.city}</div>
                  </div>
                )}
                {airport.country && countrySlug ? (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Country</div>
                    <Link
                      to={`/country/${countrySlug}`}
                      className="text-xl font-bold text-action hover:underline"
                    >
                      {airport.country}
                    </Link>
                  </div>
                ) : airport.country ? (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Country</div>
                    <div className="text-xl font-bold text-gray-900">{airport.country}</div>
                  </div>
                ) : null}
                {airport.region && regionSlug ? (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Region</div>
                    <Link
                      to={`/region/${regionSlug}`}
                      className="text-xl font-bold text-action hover:underline"
                    >
                      {airport.region}
                    </Link>
                  </div>
                ) : airport.region ? (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Region</div>
                    <div className="text-xl font-bold text-gray-900">{airport.region}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* ── Passport selector ─────────────────────────────────────────────── */}
        <section className="py-8 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6">
              <label htmlFor="passport-select" className="block text-sm font-semibold text-gray-700 mb-2">
                Select your passport country to see visa requirements and hotel access details:
              </label>
              <select
                id="passport-select"
                value={passportCountry}
                onChange={(e) => handlePassportChange(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-action text-gray-900 font-medium"
              >
                <option value="">-- Select Passport Country --</option>
                {commonPassportCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {passportCountry && (
          <section className="py-8 px-6">
            <div className="max-w-[1200px] mx-auto">
              <TravelRulesSummary />
            </div>
          </section>
        )}

        {passportCountry && properties.length > 0 && (
          <section className="py-8 px-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterAccessibleOnly}
                    onChange={(e) => setFilterAccessibleOnly(e.target.checked)}
                    className="w-5 h-5 text-action border-gray-300 rounded focus:ring-action"
                  />
                  <span className="text-gray-900 font-medium">
                    Show only hotels I can likely access without immigration issues
                  </span>
                </label>
              </div>
            </div>
          </section>
        )}

        {/* ── Properties ────────────────────────────────────────────────────── */}
        <section className="py-8 px-6">
          <div className="max-w-[1200px] mx-auto space-y-12">
            {airsideProperties.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Airside Transit Hotels
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  These hotels are located inside the secure transit area and allow travelers to
                  rest without clearing immigration.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {airsideProperties.map(({ property, evaluation }) => (
                    <PropertyCard key={property.id} property={property} evaluation={evaluation} />
                  ))}
                </div>
              </div>
            )}

            <TransitVisaNotice
              airportName={airport.airport_name || airport.airport_code}
              anchorSeed={airport.airport_code ? airport.airport_code.charCodeAt(0) + airport.airport_code.charCodeAt(1) : 0}
            />

            {terminalConnectedProperties.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Terminal-Connected Hotels
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  These hotels are connected to the terminal building and typically require clearing
                  immigration.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {terminalConnectedProperties.map(({ property, evaluation }) => (
                    <PropertyCard key={property.id} property={property} evaluation={evaluation} />
                  ))}
                </div>
              </div>
            )}

            {otherProperties.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Other Airport Stay Options
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Additional airport hotels and stay options near the terminal.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherProperties.map(({ property, evaluation }) => (
                    <PropertyCard key={property.id} property={property} evaluation={evaluation} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Zero-property fallback ───────────────────────────────────── */}
            {properties.length === 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Available Airport Stay Options
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We do not have verified hotel or rest-area listings for {displayName} yet. This does not necessarily mean accommodation is unavailable — our database is actively updated. In the meantime, here is what travelers at international airports of this type typically find:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                      <Shield className="w-6 h-6 text-action mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Airside Rest Areas</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Many international airports have pay-per-use sleep pods or rest cabins inside the secure zone, accessible without immigration clearance.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <Building2 className="w-6 h-6 text-info mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Terminal-Connected Hotels</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Attached or adjacent hotels connected to the terminal via walkway are common at larger hubs and require immigration clearance.
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                      <MapPin className="w-6 h-6 text-gray-500 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Nearby Landside Hotels</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Hotels within shuttle distance are usually available near all international airports and require you to clear customs and immigration before accessing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">What to check before your layover</p>
                      <ul className="text-sm text-gray-700 space-y-1 leading-relaxed list-disc list-inside">
                        <li>Whether your airline provides a hotel voucher for long connections</li>
                        <li>Whether your passport requires a transit visa to stay airside</li>
                        <li>Whether you can access the country landside with your passport (visa or VOA)</li>
                        <li>Whether the airport has 24-hour operations if you have an overnight layover</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Low-inventory note (1–2 properties) ─────────────────────── */}
            {properties.length > 0 && properties.length <= 2 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Only a small number of accommodation options are currently listed for {displayName}. Coverage is expanding — check back for updates, and consider nearby landside or terminal-connected hotels if availability is limited.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── How Access Works ─────────────────────────────────────────────── */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              How Airport Hotel Access Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Layover Planning ─────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Layover Planning at {displayName}
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <p className="text-gray-600 leading-relaxed">
                {layoverNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── Airport Stay Options (topic cluster links) ───────────────────── */}
        <section className="py-10 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Airport Stay Options at {displayName}
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Explore accommodation guides by stay type for this airport.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {getAirportTopicLinks(slug!).map(({ label, path, topic }) => {
                  const icons: Record<string, typeof Shield> = {
                    'transit-hotels': Shield,
                    'sleep-pods': Bed,
                    'layover-hotels': Building2,
                  };
                  const subtitles: Record<string, string> = {
                    'transit-hotels': 'No immigration required',
                    'sleep-pods': 'Capsule and pod options',
                    'layover-hotels': 'Terminal-connected and nearby',
                  };
                  const Icon = icons[topic];
                  return (
                    <Link
                      key={topic}
                      to={path}
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-action hover:bg-orange-50/40 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{subtitles[topic]}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Helpful Guides ────────────────────────────────────────────────── */}
        <section className="py-10 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Helpful Layover Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/resources/airside-transit-hotels"
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-action hover:bg-orange-50/40 transition-colors group"
              >
                <Shield className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Airside Transit Hotels</p>
                  <p className="text-xs text-gray-500 mt-0.5">No immigration required</p>
                </div>
              </Link>
              <Link
                to="/resources/terminal-connected-hotels"
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-action hover:bg-orange-50/40 transition-colors group"
              >
                <Building2 className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Terminal-Connected Hotels</p>
                  <p className="text-xs text-gray-500 mt-0.5">Connected by bridge or walkway</p>
                </div>
              </Link>
              <Link
                to="/resources/sleep-pods-lounges"
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-action hover:bg-orange-50/40 transition-colors group"
              >
                <Bed className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Sleep Pods &amp; Lounges</p>
                  <p className="text-xs text-gray-500 mt-0.5">Capsule and pod options</p>
                </div>
              </Link>
              <Link
                to="/resources/immigration-requirements"
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-action hover:bg-orange-50/40 transition-colors group"
              >
                <Globe className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Immigration Requirements</p>
                  <p className="text-xs text-gray-500 mt-0.5">Visa and entry rules</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Related Airports ─────────────────────────────────────────────── */}
        {relatedAirports.length > 0 && (
          <section className="py-12 px-6">
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Related Airports
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {airport.country
                  ? `Other airports in ${airport.country} with listed hotel options`
                  : `Other airports in ${airport.region} with listed hotel options`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedAirports.map((rel, i) => (
                  <Link
                    key={i}
                    to={`/airports/${rel.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-action/40 transition-all group flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-action transition-colors text-sm leading-snug truncate">
                        {rel.airport_name || rel.airport_code}
                      </p>
                      {(rel.city || rel.country) && (
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {[rel.city, rel.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      {rel.airport_code}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Blog Posts ───────────────────────────────────────────── */}
        {blogPosts.length > 0 && (
          <section className="py-12 px-6 bg-white">
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {post.hero_image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={post.hero_image}
                          alt={post.hero_image_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">{formatBlogDate(post.published_at)}</p>
                      <h3 className="font-semibold text-gray-900 group-hover:text-action transition-colors leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
                    aria-expanded={faqOpenIndex === i}
                  >
                    <span className="pr-4">{faq.question}</span>
                    {faqOpenIndex === i ? (
                      <ChevronUp className="w-5 h-5 text-action flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {faqOpenIndex === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where to Stay (legacy editorial copy) ───────────────────────── */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Where to Stay During a Layover at {displayName}
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed max-w-[900px]">
              <p>
                Travelers with layovers at {displayName} often search for transit hotels, sleep pods,
                and terminal-connected airport stays depending on their connection time and whether they
                plan to clear immigration.
              </p>
              <p>
                This airport guide helps compare the main types of airport accommodation available for
                transit passengers, overnight connections, and early departures.
                {airport.country && countrySlug && (
                  <>
                    {' '}You can also{' '}
                    <Link to={`/country/${countrySlug}`} className="text-action hover:underline font-medium">
                      browse all airports in {airport.country}
                    </Link>
                    {airport.region && regionSlug && (
                      <>
                        {' '}or explore the full{' '}
                        <Link to={`/region/${regionSlug}`} className="text-action hover:underline font-medium">
                          {airport.region} region
                        </Link>
                      </>
                    )}
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default AirportDetail;
