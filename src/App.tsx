import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Plus, X, Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { Shield, Building2, Bed, Check } from 'lucide-react';
import { getAllAirports } from './lib/supabase-data';
import { getRecentBlogPosts, formatBlogDate } from './lib/blog-data';
import type { Airport, BlogPost } from './lib/supabase';
import { PASSPORT_COUNTRIES, DESTINATION_COUNTRIES, SELECT_CLASS as selectClass, INPUT_CLASS as inputClass } from './constants';

interface LayoverStop {
  id: string;
  airport: string;
  arrivalTime: string;
  departureTime: string;
}

function App() {
  const navigate = useNavigate();
  const [passportCountry, setPassportCountry] = useState('');

  const [departureType, setDepartureType] = useState<'airport' | 'country'>('airport');
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');

  const [destinationType, setDestinationType] = useState<'airport' | 'country'>('airport');
  const [finalDestination, setFinalDestination] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');

  const [layoverStops, setLayoverStops] = useState<LayoverStop[]>([
    { id: '1', airport: '', arrivalTime: '', departureTime: '' }
  ]);

  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getRecentBlogPosts(3).then(setRecentPosts);
  }, []);

  useEffect(() => {
    async function loadData() {
      const airportsData = await getAllAirports();
      setAirports(airportsData);
      setLoading(false);
    }

    loadData();
  }, []);

  const passportCountries = PASSPORT_COUNTRIES;

  const calculateDuration = (arrival: string, departure: string): number | null => {
    if (!arrival || !departure) return null;
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const diffMs = departureDate.getTime() - arrivalDate.getTime();
    return diffMs / (1000 * 60 * 60);
  };

  const addLayoverStop = () => {
    setLayoverStops([...layoverStops, {
      id: Date.now().toString(),
      airport: '',
      arrivalTime: '',
      departureTime: ''
    }]);
  };

  const removeLayoverStop = (id: string) => {
    if (layoverStops.length > 1) {
      setLayoverStops(layoverStops.filter(stop => stop.id !== id));
    }
  };

  const updateLayoverStop = (id: string, field: keyof LayoverStop, value: string) => {
    setLayoverStops(layoverStops.map(stop =>
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const isValidStop = (stop: LayoverStop): boolean => {
    if (!stop.airport || !stop.arrivalTime || !stop.departureTime) return false;
    const duration = calculateDuration(stop.arrivalTime, stop.departureTime);
    return duration !== null && duration > 0;
  };

  const allStopsValid = layoverStops.every(isValidStop);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allStopsValid) return;

    const firstStop = layoverStops[0];
    const airport = airports.find(a => a.airport_code === firstStop.airport);
    if (airport?.slug) {
      const params = new URLSearchParams();
      if (passportCountry) {
        params.set('passport', passportCountry);
      }
      if (firstStop.arrivalTime && firstStop.departureTime) {
        const arrival = new Date(firstStop.arrivalTime);
        const departure = new Date(firstStop.departureTime);
        const hours = (departure.getTime() - arrival.getTime()) / (1000 * 60 * 60);
        params.set('hours', hours.toFixed(1));
      }
      const queryString = params.toString();
      navigate(`/airports/${airport.slug}${queryString ? `?${queryString}` : ''}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SEO
        title="Airport Hotels & Transit Accommodations"
        description="Find the perfect airport hotel for your layover. Compare airside transit hotels, terminal-connected properties, and sleep pods at airports worldwide. Book directly without clearing immigration."
        keywords="airport hotels, layover hotels, transit hotels, airport accommodation, airside hotels, terminal hotels, sleep pods, airport lounges, layover planning"
        canonical="https://www.hotelinairport.com/"
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <section
          className="text-white py-20 px-6"
          style={{ background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)' }}
        >
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-[800px] mx-auto leading-tight text-white">
                Find Airport Hotels for Your Layover
              </h1>
              <p
                className="text-lg md:text-xl max-w-[700px] mx-auto leading-relaxed"
                style={{ color: '#CBD5E1' }}
              >
                Discover airside transit hotels, terminal-connected hotels, and airport sleep options before your next flight connection.
              </p>
            </div>

            <div className="bg-white text-[#111827] rounded-2xl shadow-xl p-6 md:p-8 max-w-[900px] mx-auto mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center text-[#111827]">
                Plan your airport layover stay
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-left">
                  <label htmlFor="passport-country" className="block text-sm font-medium text-gray-700 mb-2">
                    My Passport
                  </label>
                  <select
                    id="passport-country"
                    value={passportCountry}
                    onChange={(e) => setPassportCountry(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select passport country</option>
                    {passportCountries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-left">
                    <label htmlFor="departure-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Departure
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setDepartureType('airport')}
                        className={`flex-1 px-3 py-1.5 text-sm rounded-md transition ${
                          departureType === 'airport'
                            ? 'bg-action text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Airport
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepartureType('country')}
                        className={`flex-1 px-3 py-1.5 text-sm rounded-md transition ${
                          departureType === 'country'
                            ? 'bg-action text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Country
                      </button>
                    </div>
                    {departureType === 'airport' ? (
                      <select
                        id="departure-select"
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select airport</option>
                        {airports.map((airport) => (
                          <option key={airport.slug} value={airport.airport_code || ''}>
                            {airport.airport_name || airport.airport_code} ({airport.airport_code})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        id="departure-select"
                        value={departureCountry}
                        onChange={(e) => setDepartureCountry(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select country</option>
                        {DESTINATION_COUNTRIES.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="text-left">
                    <label htmlFor="destination-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Final Destination
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setDestinationType('airport')}
                        className={`flex-1 px-3 py-1.5 text-sm rounded-md transition ${
                          destinationType === 'airport'
                            ? 'bg-action text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Airport
                      </button>
                      <button
                        type="button"
                        onClick={() => setDestinationType('country')}
                        className={`flex-1 px-3 py-1.5 text-sm rounded-md transition ${
                          destinationType === 'country'
                            ? 'bg-action text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Country
                      </button>
                    </div>
                    {destinationType === 'airport' ? (
                      <select
                        id="destination-select"
                        value={finalDestination}
                        onChange={(e) => setFinalDestination(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select airport</option>
                        {airports.map((airport) => (
                          <option key={airport.slug} value={airport.airport_code || ''}>
                            {airport.airport_name || airport.airport_code} ({airport.airport_code})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        id="destination-select"
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select country</option>
                        {DESTINATION_COUNTRIES.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-5 mt-5">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Layover Stops</h3>

                  {layoverStops.map((stop, index) => {
                    const duration = calculateDuration(stop.arrivalTime, stop.departureTime);
                    const isInvalid = stop.arrivalTime && stop.departureTime && (duration === null || duration <= 0);

                    return (
                      <div key={stop.id} className="mb-5 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-[#111827]">
                            Layover {index + 1}
                          </h4>
                          {layoverStops.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLayoverStop(stop.id)}
                              className="text-warning hover:text-warning-hover p-1"
                              aria-label="Remove layover"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="text-left">
                            <label htmlFor={`layover-airport-${stop.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                              Layover Airport <span className="text-warning">*</span>
                            </label>
                            <select
                              id={`layover-airport-${stop.id}`}
                              value={stop.airport}
                              onChange={(e) => updateLayoverStop(stop.id, 'airport', e.target.value)}
                              required
                              className={selectClass}
                            >
                              <option value="">Select layover airport</option>
                              {airports.map((airport) => (
                                <option key={airport.slug} value={airport.airport_code || ''}>
                                  {airport.airport_name || airport.airport_code} ({airport.airport_code})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="text-left">
                              <label htmlFor={`arrival-time-${stop.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                                Arrival Time <span className="text-warning">*</span>
                              </label>
                              <input
                                id={`arrival-time-${stop.id}`}
                                type="datetime-local"
                                value={stop.arrivalTime}
                                onChange={(e) => updateLayoverStop(stop.id, 'arrivalTime', e.target.value)}
                                required
                                className={inputClass}
                              />
                            </div>

                            <div className="text-left">
                              <label htmlFor={`departure-time-${stop.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                                Departure Time <span className="text-warning">*</span>
                              </label>
                              <input
                                id={`departure-time-${stop.id}`}
                                type="datetime-local"
                                value={stop.departureTime}
                                onChange={(e) => updateLayoverStop(stop.id, 'departureTime', e.target.value)}
                                required
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {isInvalid && (
                            <div className="text-sm">
                              <p className="text-warning bg-red-50 p-2 rounded-lg flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                Departure time must be after arrival time
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={addLayoverStop}
                    className="w-full px-4 py-3 border-2 border-dashed border-[#E5E7EB] rounded-lg text-neutral hover:border-action hover:text-action transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Another Layover
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!allStopsValid}
                  className="w-full bg-action hover:bg-action-hover text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Find Layover Hotels
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#9CA3AF] mb-3">Popular Layover Airports</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { name: 'Singapore Changi', slug: 'singapore-changi-airport-sin' },
                    { name: 'Dubai Airport', slug: 'dubai-international-airport-dxb' },
                    { name: 'London Heathrow', slug: 'london-heathrow-airport-lhr' },
                    { name: 'Istanbul Airport', slug: 'istanbul-airport-ist' },
                    { name: 'Doha Hamad', slug: 'hamad-international-airport-doh' },
                    { name: 'Tokyo Haneda', slug: 'tokyo-haneda-airport-hnd' },
                  ].map(({ name, slug }, i, arr) => (
                    <span key={name} className="flex items-center gap-3">
                      <Link to={`/airports/${slug}`} className="text-sm text-info hover:text-info-hover hover:underline transition">
                        {name}
                      </Link>
                      {i < arr.length - 1 && <span className="text-gray-300">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mx-auto">
              {[
                { value: '169', label: 'Airport Hotels', to: '/hotels' },
                { value: '111', label: 'Airports Covered', to: '/airports' },
                { value: '50+', label: 'Countries', to: '/countries' },
                { value: '6', label: 'Global Regions', to: '/regions' },
              ].map(({ value, label, to }) => (
                <Link key={label} to={to} className="bg-white text-[#111827] rounded-xl shadow-lg p-6 border border-[#E5E7EB] hover:shadow-xl hover:border-action/30 transition-all group">
                  <div className="text-4xl font-bold text-action mb-2 group-hover:scale-105 transition-transform">{value}</div>
                  <div className="text-sm text-[#6B7280]">{label}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-bold text-action uppercase tracking-wider mb-4">
                HOW LAYOVER HOTELS WORK
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6 max-w-[800px] mx-auto">
                Understand the Difference Between Airport Sleep Options
              </h2>
              <p className="text-lg text-[#6B7280] max-w-[900px] mx-auto leading-relaxed">
                Not all airport stays are the same. Some options are inside the secure transit zone for passengers who do not clear immigration, some are directly connected to the terminal by walkway or bridge, and others are nearby airport hotels that require a shuttle or short transfer. HotelInAirport helps travelers compare these differences quickly before booking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <Link to="/resources/airside-transit-hotels" className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-action" />
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  Airside Transit Hotels
                </h3>
                <p className="text-[#6B7280] leading-relaxed flex-grow">
                  These properties are inside the secure transit area of the airport. They are designed for travelers with long layovers who do not want or are not allowed to clear immigration.
                </p>
                <span className="inline-flex items-center gap-1 text-action font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link to="/resources/terminal-connected-hotels" className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-action" />
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  Terminal-Connected Hotels
                </h3>
                <p className="text-[#6B7280] leading-relaxed flex-grow">
                  These hotels are linked directly to the terminal by walkway, skybridge, or airport connector. They are useful when you want fast access to the airport after clearing immigration.
                </p>
                <span className="inline-flex items-center gap-1 text-action font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link to="/resources/sleep-pods-lounges" className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
                  <Bed className="w-7 h-7 text-action" />
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  Airport Sleep Pods and Lounges
                </h3>
                <p className="text-[#6B7280] leading-relaxed flex-grow">
                  Some airports offer sleep pods, capsule rooms, or lounge rest spaces instead of full hotels. These can be useful for short overnight stays or long connections.
                </p>
                <span className="inline-flex items-center gap-1 text-action font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-10 text-center">
                What Travelers Need to Check Before Booking
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/resources/immigration-requirements" className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] hover:border-action/40 hover:bg-orange-50/50 transition-colors group">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 text-action mr-2 mt-1 flex-shrink-0" />
                    <h4 className="text-lg font-semibold text-[#111827] group-hover:text-action transition-colors">Immigration Access</h4>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">Some airport properties can be used without clearing immigration, while others require you to officially enter the country first.</p>
                </Link>
                <Link to="/resources/access-types" className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] hover:border-action/40 hover:bg-orange-50/50 transition-colors group">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 text-action mr-2 mt-1 flex-shrink-0" />
                    <h4 className="text-lg font-semibold text-[#111827] group-hover:text-action transition-colors">Terminal and Access Type</h4>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">A property may be inside the airport, terminal-connected, or only reachable by shuttle. Access type matters more than distance alone.</p>
                </Link>
                <Link to="/resources/layover-duration" className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] hover:border-action/40 hover:bg-orange-50/50 transition-colors group">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 text-action mr-2 mt-1 flex-shrink-0" />
                    <h4 className="text-lg font-semibold text-[#111827] group-hover:text-action transition-colors">Layover Duration</h4>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">A short layover may only support airside rest options, while longer layovers may make terminal-connected or nearby airport hotels practical.</p>
                </Link>
              </div>
            </div>

            {recentPosts.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-10">
                  <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                    TRAVEL GUIDES
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                    Airport Hotel Guides
                  </h3>
                  <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
                    Expert travel guides explaining airport hotels, transit hotels, and how to sleep comfortably during long layovers.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {recentPosts.map(post => (
                    <article key={post.slug} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <Link to={`/blog/${post.slug}`}>
                        {post.hero_image ? (
                          <img
                            src={post.hero_image}
                            alt={post.hero_image_alt}
                            className="w-full h-44 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-44 bg-gradient-to-br from-brand to-brand/70" />
                        )}
                      </Link>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatBlogDate(post.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {post.author}
                          </span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <h4 className="font-bold text-[#111827] mb-2 hover:text-action transition-colors leading-snug text-base">
                            {post.title}
                          </h4>
                        </Link>
                        <p className="text-[#6B7280] text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 border border-action text-action hover:bg-action hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    View All Guides <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            <div className="max-w-[900px] mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Why This Directory Is Useful
              </h3>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  Travelers often search for airport hotels, transit hotels, sleep pods, and terminal-connected airport stays when they have overnight layovers, missed connections, or early departures. Most hotel booking websites do not clearly explain airport access or whether immigration is required.
                </p>
                <p>
                  HotelInAirport is designed to help users compare layover sleep options by airport, country, and region while showing whether a property is airside, landside, terminal-connected, or only reachable after entering the country.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 px-6 border-t border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                Explore Our Suite of Web Applications
              </h2>
              <p className="text-lg text-[#6B7280] max-w-[600px] mx-auto leading-relaxed">
                Discover our family of specialized platforms designed to solve real problems and make your digital life easier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="text-xs font-bold text-action uppercase tracking-widest mb-4">
                  Immigration & Travel
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="/VISAINFOGUIDE.png"
                    alt="VisaInfoGuide.com logo"
                    className="w-14 h-14 object-contain flex-shrink-0"
                  />
                  <h3 className="text-xl font-bold text-[#111827]">VisaInfoGuide.com</h3>
                </div>
                <p className="text-[#6B7280] leading-relaxed text-sm flex-grow mb-6">
                  Visit VisaInfoGuide.com, your trusted companion for navigating the world's visa landscape. Whether you're planning a short holiday, relocating abroad, or pursuing international opportunities, we cut through the red tape so you don't have to. Get clear, up-to-date guidance on visa requirements, application processes, and entry rules for countries worldwide. Travel smarter. Move with confidence.
                </p>
                <a
                  href="https://www.visainfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                >
                  Visit VisaInfoGuide.com
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="text-xs font-bold text-action uppercase tracking-widest mb-4">
                  Immigration Resources
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="/IMMIGRATION_INFO_NEW_logo.png"
                    alt="ImmigrationInfoGuide.com logo"
                    className="w-14 h-14 object-contain flex-shrink-0"
                  />
                  <h3 className="text-xl font-bold text-[#111827]">ImmigrationInfoGuide.com</h3>
                </div>
                <p className="text-[#6B7280] leading-relaxed text-sm flex-grow mb-6">
                  Visit ImmigrationInfoGuide.com, your go-to resource for understanding the immigration journey from start to finish. Moving to a new country is one of life's biggest decisions, and we're here to make the process less overwhelming. Explore guides on residency permits, citizenship pathways, family reunification, work authorizations, and more. Reliable information, plain language, real answers, because your future deserves the best possible start.
                </p>
                <a
                  href="https://www.immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                >
                  Visit ImmigrationInfoGuide.com
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="text-xs font-bold text-action uppercase tracking-widest mb-4">
                  Productivity & Tools
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="/one_tool_fix.png"
                    alt="OneToolFix.com logo"
                    className="w-14 h-14 object-contain flex-shrink-0"
                  />
                  <h3 className="text-xl font-bold text-[#111827]">OneToolFix.com</h3>
                </div>
                <p className="text-[#6B7280] leading-relaxed text-sm flex-grow mb-6">
                  Visit OneToolFix.com, because every problem deserves the right tool and you shouldn't need ten apps to do one job. Discover a growing suite of smart, streamlined utilities designed to simplify your digital life. Convert, edit, calculate, and organise, all in one place, all with zero fuss. Stop switching tabs and start getting things done. One tool. One fix. Every time.
                </p>
                <a
                  href="https://www.onetoolfix.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                >
                  Visit OneToolFix.com
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="text-xs font-bold text-action uppercase tracking-widest mb-4">
                  Games & Brain Training
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="/WORDRING_OG.png"
                    alt="WordRingPuzzle.com logo"
                    className="w-14 h-14 object-contain flex-shrink-0"
                  />
                  <h3 className="text-xl font-bold text-[#111827]">WordRingPuzzle.com</h3>
                </div>
                <p className="text-[#6B7280] leading-relaxed text-sm flex-grow mb-6">
                  Visit WordRingPuzzle.com and challenge yourself with one of the most addictive word games around! Form words, crack rings, and race against the clock in puzzles designed to stretch your vocabulary and sharpen your mind. Whether you're a casual player looking for a quick brain boost or a word wizard chasing a perfect score, there's always a new challenge waiting for you. How far can your wordpower take you?
                </p>
                <a
                  href="https://www.wordringpuzzle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                >
                  Visit WordRingPuzzle.com
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
