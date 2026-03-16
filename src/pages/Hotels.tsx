import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAllProperties } from '../lib/supabase-data';
import type { Property } from '../lib/supabase';
import {
  SLEEP_POD_TYPES,
  PRICE_TIERS,
  PROPERTY_TYPE_LABELS,
  ACCESS_TYPE_LABELS,
  ACCESS_TYPE_BADGE_COLORS,
} from '../constants';

function Hotels() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [selectedAccessType, setSelectedAccessType] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const data = await getAllProperties();
      setProperties(data);
      setLoading(false);
    }
    loadProperties();
  }, []);

  const propertyTypes = useMemo(() => {
    const types = new Set<string>();
    properties.forEach(p => {
      if (p.property_type) {
        types.add(SLEEP_POD_TYPES.includes(p.property_type) ? 'sleep_pods' : p.property_type);
      }
    });
    return Array.from(types).sort();
  }, [properties]);

  const accessTypes = useMemo(() => {
    const types = new Set<string>();
    properties.forEach(p => {
      if (p.access_type) types.add(p.access_type);
    });
    return Array.from(types).sort();
  }, [properties]);

  const countries = useMemo(() => {
    const countrySet = new Set<string>();
    properties.forEach(p => {
      if (p.country) countrySet.add(p.country);
    });
    return Array.from(countrySet).sort();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = !searchTerm ||
        property.property_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.airport_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.airport_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchTerm.toLowerCase());

      const normalizedType = property.property_type && SLEEP_POD_TYPES.includes(property.property_type)
        ? 'sleep_pods'
        : property.property_type;
      const matchesPropertyType = selectedPropertyType === 'all' ||
        normalizedType === selectedPropertyType;

      const matchesAccessType = selectedAccessType === 'all' ||
        property.access_type === selectedAccessType;

      const matchesCountry = selectedCountry === 'all' ||
        property.country === selectedCountry;

      let matchesPriceRange = true;
      if (priceRange !== 'all' && property.estimated_rate_daily) {
        const price = property.estimated_rate_daily;
        switch (priceRange) {
          case 'budget':
            matchesPriceRange = price < PRICE_TIERS.BUDGET_MAX;
            break;
          case 'moderate':
            matchesPriceRange = price >= PRICE_TIERS.BUDGET_MAX && price < PRICE_TIERS.MODERATE_MAX;
            break;
          case 'expensive':
            matchesPriceRange = price >= PRICE_TIERS.MODERATE_MAX;
            break;
        }
      } else if (priceRange !== 'all' && !property.estimated_rate_daily) {
        matchesPriceRange = false;
      }

      return matchesSearch && matchesPropertyType && matchesAccessType && matchesCountry && matchesPriceRange;
    });
  }, [properties, searchTerm, selectedPropertyType, selectedAccessType, selectedCountry, priceRange]);

  const getPropertyTypeLabel = (type: string) =>
    PROPERTY_TYPE_LABELS[type] || type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const getAccessTypeLabel = (type: string) =>
    ACCESS_TYPE_LABELS[type] || type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const getAccessTypeBadgeColor = (type: string) =>
    ACCESS_TYPE_BADGE_COLORS[type] || 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airport Hotels Directory - Transit & Layover Accommodations"
        description="Complete directory of airport hotels worldwide. Filter by airside transit, terminal-connected, property type, and price range. Find the perfect hotel for your layover."
        keywords="airport hotels directory, layover accommodation, transit hotel search, airside hotels, terminal hotels, airport sleep pods, capsule hotels, airport lounges, layover hotels filter"
        canonical="https://www.hotelinairport.com/hotels"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Hotels', url: '/hotels' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="bg-brand text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Airport Hotels & Rest Facilities</h1>
            <p className="text-xl text-gray-300">
              Browse {properties.length} hotels and rest options at airports worldwide
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="xl:col-span-2">
                <label htmlFor="hotels-search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="hotels-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, airport, or city..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hotels-property-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="hotels-property-type"
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {getPropertyTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hotels-access-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Access Type
                </label>
                <select
                  id="hotels-access-type"
                  value={selectedAccessType}
                  onChange={(e) => setSelectedAccessType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent"
                >
                  <option value="all">All Access</option>
                  {accessTypes.map(type => (
                    <option key={type} value={type}>
                      {getAccessTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hotels-country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="hotels-country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent"
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hotels-price-range" className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  id="hotels-price-range"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (&lt; $100)</option>
                  <option value="moderate">Moderate ($100-200)</option>
                  <option value="expensive">Premium ($200+)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
              {(searchTerm || selectedPropertyType !== 'all' || selectedAccessType !== 'all' || selectedCountry !== 'all' || priceRange !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPropertyType('all');
                    setSelectedAccessType('all');
                    setSelectedCountry('all');
                    setPriceRange('all');
                  }}
                  className="text-sm text-info hover:text-info-hover font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-action"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {property.property_name || 'Unnamed Property'}
                      </h3>
                      {property.access_type && (
                        <Link
                          to="/resources/access-types"
                          className={`ml-2 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap hover:opacity-80 transition-opacity ${getAccessTypeBadgeColor(property.access_type)}`}
                          title="Learn about access types"
                        >
                          {getAccessTypeLabel(property.access_type)}
                        </Link>
                      )}
                    </div>

                    {property.property_type && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Building2 className="w-3 h-3 mr-1" />
                          {getPropertyTypeLabel(property.property_type)}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      {property.airport_name && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <Link
                            to={`/airports?q=${encodeURIComponent(property.airport_code || property.airport_name || '')}`}
                            className="hover:text-action hover:underline transition-colors"
                          >
                            {property.airport_name}
                            {property.airport_code && ` (${property.airport_code})`}
                          </Link>
                        </div>
                      )}
                      {property.city && property.country && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{property.city}, {property.country}</span>
                        </div>
                      )}
                    </div>

                    {property.estimated_rate_daily && (
                      <div className="flex items-center text-sm font-medium text-gray-900 mb-4">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>
                          ${property.estimated_rate_daily}
                          {property.currency && property.currency !== 'USD' && ` ${property.currency}`}
                          <span className="text-gray-500 font-normal"> / day</span>
                        </span>
                      </div>
                    )}

                    {property.must_clear_immigration_first !== null && (
                      <div className="mb-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          property.must_clear_immigration_first
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {property.must_clear_immigration_first
                            ? 'Immigration required'
                            : 'No immigration needed'}
                        </span>
                      </div>
                    )}

                    {property.notes && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {property.notes}
                      </p>
                    )}

                    {property.booking_or_ota_url && (
                      <a
                        href={property.booking_or_ota_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-2 bg-action text-white rounded-lg hover:bg-action-hover transition-colors text-sm font-medium"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-brand rounded-xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-3">Not sure which type to book?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Learn the difference between airside, terminal-connected, and nearby airport hotels before you book.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/resources/access-types" className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                Access Types Guide
              </Link>
              <Link to="/resources/immigration-requirements" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm border border-white/20">
                Immigration Requirements
              </Link>
              <Link to="/airports" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm border border-white/20">
                Search by Airport
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Hotels;
