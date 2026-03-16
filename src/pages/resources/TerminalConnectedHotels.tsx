import { useState, useCallback } from 'react';
import { Building2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import ResourceSearch, { type ResourceEntry } from '../../components/ResourceSearch';

const ENTRIES: ResourceEntry[] = [
  {
    id: 'hnd-royal-park',
    airport: 'Tokyo Haneda Airport',
    iata: 'HND',
    hotelName: 'Royal Park Hotel',
    region: 'Asia-Pacific',
    location: 'Landside',
    description: 'Directly connected to Terminal 3 via elevator. Modern Japanese hospitality with stunning views of Tokyo Bay and the runway. Contemporary rooms with traditional Japanese touches.',
    tags: ['tokyo', 'japan', 'connected', 'walkway'],
  },
  {
    id: 'kul-sama-sama',
    airport: 'Kuala Lumpur International Airport',
    iata: 'KUL',
    hotelName: 'Sama-Sama Hotel',
    region: 'Asia-Pacific',
    location: 'Landside',
    description: 'Connected to the main terminal via covered walkway. Award-winning luxury hotel with spacious rooms, multiple dining options, and a rooftop pool overlooking the runway.',
    tags: ['kuala lumpur', 'malaysia', 'luxury', 'pool'],
  },
  {
    id: 'hkg-regal',
    airport: 'Hong Kong Airport',
    iata: 'HKG',
    hotelName: 'Regal Airport Hotel',
    region: 'Asia-Pacific',
    location: 'Landside',
    description: 'Connected via covered walkway with moving walkways. Large rooms with modern amenities and excellent Cantonese dining options. One of the largest airport hotels in the world.',
    tags: ['hong kong', 'connected', 'large'],
  },
  {
    id: 'sin-crowne',
    airport: 'Singapore Changi Airport',
    iata: 'SIN',
    hotelName: 'Crowne Plaza',
    region: 'Asia-Pacific',
    location: 'Landside',
    description: 'Connected to Terminal 3 via the stunning Jewel complex. Walk through indoor gardens and waterfalls on your way to the terminal. Modern rooms with premium bedding and airport views.',
    tags: ['singapore', 'jewel', 'connected', 'luxury'],
  },
  {
    id: 'ams-sheraton',
    airport: 'Amsterdam Schiphol Airport',
    iata: 'AMS',
    hotelName: 'Sheraton Amsterdam Airport Hotel',
    region: 'Europe',
    location: 'Landside',
    description: 'Directly connected to Schiphol Airport via a covered walkway — a 2–3 minute walk from arrivals and departures halls. Soundproofed rooms with modern Dutch design.',
    tags: ['amsterdam', 'netherlands', 'sheraton', 'connected'],
  },
  {
    id: 'fra-hilton',
    airport: 'Frankfurt Airport',
    iata: 'FRA',
    hotelName: 'Hilton Frankfurt Airport',
    region: 'Europe',
    location: 'Landside',
    description: 'Connected to Terminal 1 via elevated skybridge. Business-focused hotel with executive lounges, meeting facilities, and excellent breakfast. Premium soundproofing ensures restful sleep.',
    tags: ['frankfurt', 'germany', 'hilton', 'skybridge', 'business'],
  },
  {
    id: 'zrh-radisson',
    airport: 'Zurich Airport',
    iata: 'ZRH',
    hotelName: 'Radisson Blu Hotel',
    region: 'Europe',
    location: 'Landside',
    description: 'Connected via skybridge to the Airside Center shopping area. Swiss quality and service with contemporary rooms. Easy access to both terminals via the skybridge system.',
    tags: ['zurich', 'switzerland', 'radisson', 'skybridge'],
  },
  {
    id: 'muc-hilton',
    airport: 'Munich Airport',
    iata: 'MUC',
    hotelName: 'Hilton Munich Airport',
    region: 'Europe',
    location: 'Landside',
    description: 'Connected to Terminal 2 via covered walkway. Modern Bavarian design with pool and spa. Walking distance is approximately 5–7 minutes to check-in.',
    tags: ['munich', 'germany', 'hilton', 'pool', 'spa'],
  },
  {
    id: 'cph-clarion',
    airport: 'Copenhagen Airport',
    iata: 'CPH',
    hotelName: 'Clarion Hotel Copenhagen Airport',
    region: 'Europe',
    location: 'Landside',
    description: 'Connected via covered walkway with beautiful Scandinavian design aesthetic. Large rooms with minimalist decor and excellent Nordic breakfast buffet.',
    tags: ['copenhagen', 'denmark', 'scandinavian', 'connected'],
  },
  {
    id: 'yvr-fairmont',
    airport: 'Vancouver Airport',
    iata: 'YVR',
    hotelName: 'Fairmont Vancouver Airport',
    region: 'North America',
    location: 'Landside',
    description: 'Inside the terminal complex above the US departures area. Premium soundproofed rooms despite being inside the airport. Canadian hospitality with mountain and runway views.',
    tags: ['vancouver', 'canada', 'fairmont', 'luxury'],
  },
  {
    id: 'yyz-sheraton',
    airport: 'Toronto Pearson',
    iata: 'YYZ',
    hotelName: 'Sheraton Gateway Hotel',
    region: 'North America',
    location: 'Landside',
    description: 'Connected to Terminal 3 via covered walkway. Recently renovated with modern rooms and Club Lounge access. Approximately 3-minute walk to the terminal.',
    tags: ['toronto', 'canada', 'sheraton', 'connected'],
  },
  {
    id: 'dtw-westin',
    airport: 'Detroit Airport',
    iata: 'DTW',
    hotelName: 'Westin Detroit Metro Airport',
    region: 'North America',
    location: 'Landside',
    description: 'Connected to McNamara Terminal via covered walkway. Famous for Westin Heavenly Beds ensuring quality rest. Modern facilities with good restaurant options.',
    tags: ['detroit', 'usa', 'westin', 'connected'],
  },
  {
    id: 'auh-premier',
    airport: 'Abu Dhabi Airport',
    iata: 'AUH',
    hotelName: 'Premier Inn',
    region: 'Middle East',
    location: 'Landside',
    description: 'Connected to Terminal 1 via covered walkway. Budget-friendly option with quality standards. Clean, modern rooms with comfortable beds at affordable prices.',
    rateInfo: '$100–150 / night',
    tags: ['abu dhabi', 'uae', 'budget', 'connected'],
  },
  {
    id: 'mct-sama',
    airport: 'Muscat International Airport',
    iata: 'MCT',
    hotelName: 'Sama Muscat Hotel',
    region: 'Middle East',
    location: 'Landside',
    description: 'Connected directly to the terminal building. Modern Omani hospitality with elegant rooms and Arabian design touches. Convenient for early morning Oman Air flights.',
    tags: ['muscat', 'oman', 'connected', 'arabian'],
  },
];

const LOCATION_BADGE: Record<string, string> = {
  Airside: 'bg-green-50 text-green-700 border-green-200',
  Landside: 'bg-blue-50 text-blue-700 border-blue-200',
  Both: 'bg-gray-50 text-gray-700 border-gray-200',
};

const REGION_BORDER: Record<string, string> = {
  'Asia-Pacific': 'border-info',
  'Europe': 'border-action',
  'North America': 'border-neutral',
  'Middle East': 'border-action',
};

function EntryCard({ entry }: { entry: ResourceEntry }) {
  const borderColor = REGION_BORDER[entry.region] || 'border-gray-300';
  const badgeClass = LOCATION_BADGE[entry.location] || LOCATION_BADGE['Landside'];

  return (
    <div className={`bg-white border-l-4 ${borderColor} shadow-md rounded-r-lg p-8 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <h4 className="text-xl font-bold text-gray-900">
          <Link to={`/airports/${entry.iata}`} className="text-info hover:text-info-hover transition-colors">
            {entry.airport} ({entry.iata})
          </Link>
          {' '}&mdash; {entry.hotelName}
        </h4>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${badgeClass}`}>
          {entry.location}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed mb-3">{entry.description}</p>
      {entry.rateInfo && (
        <p className="text-sm text-gray-500 bg-gray-50 rounded px-3 py-1.5 inline-block">
          <strong>Rates:</strong> {entry.rateInfo}
        </p>
      )}
    </div>
  );
}

function TerminalConnectedHotels() {
  const [filtered, setFiltered] = useState<ResourceEntry[]>(ENTRIES);
  const handleFilter = useCallback((f: ResourceEntry[]) => setFiltered(f), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Terminal-Connected Airport Hotels - Direct Walkway Access"
        description="Guide to terminal-connected airport hotels with direct walkway or skybridge access. Walk to your gate without going outside. Find hotels connected to airport terminals worldwide."
        keywords="terminal connected hotels, airport hotels walkway, skybridge hotel, airport hotel direct access, weather protected airport hotel, Amsterdam Schiphol hotel, Frankfurt airport hotel, terminal hotel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Terminal-Connected Hotels', url: '/resources/terminal-connected-hotels' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="bg-brand text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/resources" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-action mr-4">
                <Building2 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Terminal-Connected Hotels</h1>
            </div>
            <p className="text-xl text-gray-300">
              Hotels physically connected to terminals via walkways, skybridges, or underground passages
            </p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">What Are Terminal-Connected Hotels?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Terminal-connected hotels are properties that are physically linked to the airport terminal via a covered walkway, skybridge, underground passage, or direct building connection. While these hotels are landside (you must clear immigration), they offer the convenience of reaching your gate quickly without needing ground transportation.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { title: 'Weather-Protected Access', body: 'Walk to the terminal without going outside. Perfect in rain, snow, extreme heat, or cold weather.' },
              { title: 'No Shuttle Waiting', body: 'Walk directly to check-in or your gate in 5–15 minutes. No waiting for shuttle buses.' },
              { title: 'Full Hotel Amenities', body: 'Enjoy full-service hotels with restaurants, gyms, pools, business centers, and concierge services.' },
              { title: 'Peace of Mind', body: 'No risk of missing your flight due to traffic jams, shuttle delays, or getting lost.' },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-action mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-4 pb-4 border-b-2 border-gray-200">Notable Terminal-Connected Hotels Worldwide</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Terminal-connected hotels exist at major airports across the globe. Search and filter to find options that fit your travel itinerary.
          </p>

          <ResourceSearch
            entries={ENTRIES}
            onFilter={handleFilter}
            placeholder="Search by airport, city, IATA code, or hotel brand..."
          />

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium mb-2">No results found</p>
              <p className="text-sm">Try a different search term or clear the filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map(entry => <EntryCard key={entry.id} entry={entry} />)}
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">When to Choose Terminal-Connected Hotels</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">These hotels are ideal for:</p>
          <ul className="space-y-3 mb-10">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Early morning flights (5–7 AM):</strong> Maximize sleep time by staying 5 minutes from check-in</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Late-night arrivals:</strong> No waiting for shuttles or dealing with unfamiliar areas in the dark</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Business travelers with tight schedules:</strong> Every minute counts when you have meetings or calls</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Travelers with heavy or multiple bags:</strong> Minimal walking distance with your luggage</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Limited mobility or elderly travelers:</strong> Reduce physical strain with short, accessible walks</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Bad weather conditions:</strong> Rain, snow, heat waves — stay comfortable and dry</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Unfamiliarity with the area:</strong> No need to navigate unknown cities or worry about safety</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">When you have visa-free entry or already hold a valid visa:</strong> You must clear immigration to access these hotels</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Understanding the Requirements</h2>
          <div className="bg-orange-50 border-l-4 border-action p-6 rounded-r-lg mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-action mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Immigration and Visa Requirements</h3>
                <p className="text-gray-700 mb-3">
                  Terminal-connected hotels are located on the landside (public side) of the airport. This means:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• You MUST clear immigration and customs to access the hotel</li>
                  <li>• You need a valid visa if your nationality requires one for that country</li>
                  <li>• You'll need to collect your checked baggage if not checked through</li>
                  <li>• You must re-check-in and go through security for your next flight</li>
                  <li>• Factor in 60–90 minutes for check-in and security queues</li>
                </ul>
                <Link
                  to="/resources/immigration-requirements"
                  className="inline-flex items-center gap-1 text-action font-semibold text-sm mt-4 hover:underline"
                >
                  Full immigration requirements guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Pricing Expectations</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">Terminal-connected hotels typically range from:</p>
          <ul className="space-y-3 mb-4">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Budget options:</strong> $100–150 per night (Premier Inn, Ibis)</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Mid-range options:</strong> $150–250 per night (Sheraton, Hilton, Radisson)</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Luxury options:</strong> $250–400+ per night (Fairmont, Sama-Sama)</li>
          </ul>
          <p className="text-sm text-gray-600 bg-gray-100 rounded-lg p-4 mb-10">
            Prices vary by location, season, and events. Airport hotels often charge premium rates for convenience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">What to Expect at Terminal-Connected Hotels</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Standard Room Amenities</h3>
          <ul className="space-y-3 mb-8">
            {[
              'Comfortable beds with premium mattresses (often brand-name like Westin Heavenly Bed or Hilton Serenity)',
              'Advanced soundproofing to minimize aircraft noise',
              '24-hour front desk and concierge services',
              'High-speed WiFi (complimentary at some chains, paid at others)',
              'Multiple on-site restaurants and 24-hour room service',
              'Fitness center with modern equipment',
              'Business center with printing and meeting spaces',
              'Secure luggage storage for early arrivals or late departures',
            ].map(item => (
              <li key={item} className="text-gray-700 text-lg">{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Premium Services and Facilities</h3>
          <ul className="space-y-3 mb-8">
            {[
              'Airport check-in desks within the hotel (at select properties)',
              'Express laundry and dry cleaning with same-day service',
              'Multiple meeting rooms and full conference facilities',
              'Swimming pools and hot tubs for relaxation',
              'Full-service spa and wellness centers',
              'Executive lounges with complimentary breakfast and evening cocktails',
              'On-site currency exchange and ATMs',
              'Shuttle services to other terminals (if needed)',
            ].map(item => (
              <li key={item} className="text-gray-700 text-lg">{item}</li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Booking Tips</h2>
          <ol className="space-y-4 mb-10 list-none">
            {[
              { title: 'Book directly for perks', body: 'Hotels often offer free WiFi, breakfast, or upgrades for direct bookings' },
              { title: 'Join loyalty programs', body: 'Airport hotels are perfect for earning points due to frequent traveler stays' },
              { title: 'Check for day-use rates', body: "Some offer hourly or half-day rates if you don't need overnight" },
              { title: 'Compare with nearby options', body: 'Sometimes a nearby hotel with shuttle is significantly cheaper' },
              { title: 'Read reviews about noise', body: 'Even with soundproofing, some rooms are quieter than others' },
              { title: 'Request high floors', body: 'Upper floors typically have less noise and better views' },
              { title: 'Confirm the walking distance', body: '"Connected" can mean anything from 2 to 15 minutes' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-action text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-700">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Alternative Options</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            If terminal-connected hotels are full or too expensive, consider:
          </p>
          <ul className="space-y-3 mb-10">
            <li className="text-gray-700 text-lg">
              <strong className="text-gray-900">Nearby hotels with free shuttles:</strong> Usually 15–20 minutes away with 24-hour shuttle service
            </li>
            <li className="text-gray-700 text-lg">
              <strong className="text-gray-900">Airside transit hotels:</strong> If available and you want to avoid immigration (see our{" "}
              <Link to="/resources/airside-transit-hotels" className="text-action hover:text-action-hover underline">Airside Hotels guide</Link>)
            </li>
            <li className="text-gray-700 text-lg">
              <strong className="text-gray-900">Airport lounges with sleep facilities:</strong> More affordable for short rests
            </li>
          </ul>

          <div className="bg-blue-50 border border-info/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Terminal-Connected Hotels</h3>
            <p className="text-gray-700 mb-4">
              Browse our directory of terminal-connected hotels at major airports worldwide.
            </p>
            <Link
              to="/hotels"
              className="inline-flex items-center bg-action hover:bg-action-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Airport Hotel Directory
            </Link>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}

export default TerminalConnectedHotels;
