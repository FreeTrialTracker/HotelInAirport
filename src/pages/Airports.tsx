import { Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase, Airport } from '../lib/supabase';

function Airports() {
  const [urlSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(urlSearchParams.get('region') || '');
  const [selectedCountry, setSelectedCountry] = useState(urlSearchParams.get('country') || '');
  const [selectedCity, setSelectedCity] = useState('');
  const [allAirports, setAllAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAirports() {
      const { data, error } = await supabase
        .from('airports')
        .select('*')
        .order('airport_name');

      if (error) {
        console.error('Error fetching airports:', error);
      } else {
        setAllAirports(data || []);
      }
      setLoading(false);
    }

    fetchAirports();
  }, []);

  const uniqueRegions = useMemo(() => {
    const regions = new Set(allAirports.map(a => a.region).filter(Boolean));
    return Array.from(regions).sort();
  }, [allAirports]);

  const uniqueCountries = useMemo(() => {
    const filteredAirports = selectedRegion
      ? allAirports.filter(a => a.region === selectedRegion)
      : allAirports;
    const countries = new Set(filteredAirports.map(a => a.country).filter(Boolean));
    return Array.from(countries).sort();
  }, [allAirports, selectedRegion]);

  const uniqueCities = useMemo(() => {
    let filteredAirports = allAirports;
    if (selectedRegion) {
      filteredAirports = filteredAirports.filter(a => a.region === selectedRegion);
    }
    if (selectedCountry) {
      filteredAirports = filteredAirports.filter(a => a.country === selectedCountry);
    }
    const cities = new Set(filteredAirports.map(a => a.city).filter(Boolean));
    return Array.from(cities).sort();
  }, [allAirports, selectedRegion, selectedCountry]);

  const airports = useMemo(() => {
    let filtered = allAirports;

    if (selectedRegion) {
      filtered = filtered.filter(a => a.region === selectedRegion);
    }

    if (selectedCountry) {
      filtered = filtered.filter(a => a.country === selectedCountry);
    }

    if (selectedCity) {
      filtered = filtered.filter(a => a.city === selectedCity);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((airport) => {
        const searchableText = [
          airport.airport_name,
          airport.airport_code,
          airport.city,
          airport.country,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    return filtered;
  }, [allAirports, searchQuery, selectedRegion, selectedCountry, selectedCity]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Browse Airports with Hotels & Transit Accommodations"
        description="Search airports worldwide with airside transit hotels, terminal-connected properties, and layover accommodations. Find hotels at major international airports without clearing immigration."
        keywords="airports with hotels, airport hotel directory, transit hotels by airport, layover hotels by city, airport accommodation finder, airside hotels list, terminal hotels worldwide"
        canonical="https://www.hotelinairport.com/airports"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Airports', url: '/airports' },
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="py-16 px-6" style={{background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)'}}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Airports with Hotels Inside or Near Terminals
              </h1>
              <p className="text-lg max-w-[900px] mx-auto leading-relaxed" style={{color: '#CBD5E1'}}>
                Browse airports around the world that offer airside transit hotels, terminal-connected hotels, sleep pods, and nearby airport stays for travelers with layovers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-[#F9FAFB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-16 max-w-[800px] mx-auto">
              <div className="relative w-full mb-6">
                <label htmlFor="airports-search" className="sr-only">Search airports</label>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="airports-search"
                  type="text"
                  placeholder="Search airport (example: Singapore Changi, Heathrow, JFK)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-action focus:border-transparent outline-none transition text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="airports-region" className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    id="airports-region"
                    value={selectedRegion}
                    onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      setSelectedCountry('');
                      setSelectedCity('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">All Regions</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="airports-country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    id="airports-country"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedCity('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">All Countries</option>
                    {uniqueCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="airports-city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    id="airports-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">All Cities</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(selectedRegion || selectedCountry || selectedCity) && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedRegion('');
                      setSelectedCountry('');
                      setSelectedCity('');
                    }}
                    className="text-sm text-action hover:text-action-hover font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">Loading airports...</p>
              </div>
            ) : (
              <>
                {searchQuery && (
                  <div className="mb-6 text-center text-gray-600">
                    Found {airports.length} airport{airports.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </div>
                )}

                {airports.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-600 mb-2">No airports found</p>
                    <p className="text-gray-500">Try adjusting your search terms or <Link to="/import-data" className="text-info hover:underline">import the data</Link></p>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {airports.map((airport, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {airport.airport_name || airport.airport_code}
                  </h3>
                  {(airport.city || airport.country) && (
                    <p className="text-sm text-gray-500 mb-4">
                      {[airport.city, airport.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    Explore airside transit hotels, terminal-connected hotels, and nearby airport stays available for layover travelers.
                  </p>
                  <Link
                    to={`/airports/${airport.slug}`}
                    className="w-full bg-action hover:bg-action-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                  >
                    View Airport Hotels
                  </Link>
                </div>
              ))}
              </div>
              </>
            )}

            <div className="max-w-[900px] mx-auto pt-8 border-t border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Find Hotels Inside Major Airports Worldwide
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Many international airports now offer transit hotels, capsule rooms, sleep pods, and terminal-connected hotels designed for travelers with long layovers or overnight connections.
                </p>
                <p>
                  HotelInAirport helps travelers discover airport hotels by airport, country, and region while showing whether a property is airside, terminal-connected, or located near the airport.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Airports;
