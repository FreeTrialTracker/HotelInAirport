import { useState, useCallback } from 'react';
import { Bed, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import ResourceSearch, { type ResourceEntry } from '../../components/ResourceSearch';

const ENTRIES: ResourceEntry[] = [
  {
    id: 'atl-minute',
    airport: 'Atlanta Hartsfield-Jackson',
    iata: 'ATL',
    hotelName: 'Minute Suites',
    region: 'North America',
    location: 'Airside',
    description: 'Private suites with daybed, TV, and workspace in Concourses B, E, and F. Perfect for quick naps between connections. Booking available hourly with first-hour minimum.',
    rateInfo: 'From $42/hour',
    tags: ['minute suites', 'pods', 'usa', 'workspace'],
  },
  {
    id: 'dfw-minute',
    airport: 'Dallas Fort Worth',
    iata: 'DFW',
    hotelName: 'Minute Suites',
    region: 'North America',
    location: 'Airside',
    description: 'Multiple locations in Terminals A, B, D. Private rooms with comfortable daybeds, workstations, and complimentary snacks and drinks. Showers at select locations.',
    rateInfo: 'From $45/hour',
    tags: ['minute suites', 'pods', 'usa', 'workspace', 'shower'],
  },
  {
    id: 'jfk-twa',
    airport: 'New York JFK',
    iata: 'JFK',
    hotelName: 'TWA Hotel Sleep Pods',
    region: 'North America',
    location: 'Landside',
    description: 'Modern sleep pods with premium bedding, reading lights, and charging ports. Located in the iconic TWA Hotel between Terminal 5 and Terminal 4. Book for as little as 4 hours.',
    rateInfo: 'From $50/4 hours',
    tags: ['twa', 'pods', 'usa', 'new york', 'iconic'],
  },
  {
    id: 'lhr-no1',
    airport: 'London Heathrow',
    iata: 'LHR',
    hotelName: 'No1 Lounges Sleep Pods',
    region: 'Europe',
    location: 'Airside',
    description: 'Premium lounges with dedicated sleep pods featuring fully reclining seats, blankets, and privacy screens. Available in Terminals 3 and 4. Full lounge amenities including showers, food, and drinks.',
    rateInfo: '£40–60 day pass',
    tags: ['lounge', 'pods', 'uk', 'london', 'shower'],
  },
  {
    id: 'ams-yotel',
    airport: 'Amsterdam Schiphol',
    iata: 'AMS',
    hotelName: 'Yotel Cabins',
    region: 'Europe',
    location: 'Airside',
    description: 'Compact cabin-style rooms with adjustable SmartBeds, mood lighting, and entertainment. Located airside for easy access. Book in 4-hour blocks.',
    rateInfo: 'From €50/4 hours',
    tags: ['yotel', 'cabins', 'netherlands', 'amsterdam'],
  },
  {
    id: 'hel-gosleep',
    airport: 'Helsinki Airport',
    iata: 'HEL',
    hotelName: 'GoSleep Pods',
    region: 'Europe',
    location: 'Airside',
    description: 'Affordable sleeping pods with privacy shield, comfortable reclining seats, and reading lights. Available in both Schengen and non-Schengen areas. Budget-friendly option.',
    rateInfo: 'From €10/hour',
    tags: ['gosleep', 'pods', 'finland', 'helsinki', 'budget'],
  },
  {
    id: 'sin-snooze',
    airport: 'Singapore Changi',
    iata: 'SIN',
    hotelName: 'Snooze Lounges',
    region: 'Asia-Pacific',
    location: 'Airside',
    description: 'Free rest areas with reclining chairs in all terminals, plus paid premium lounges with private sleep pods. Known for excellent facilities and cleanliness.',
    rateInfo: 'Free to S$50/3 hours',
    tags: ['lounge', 'pods', 'singapore', 'free option'],
  },
  {
    id: 'icn-capsule',
    airport: 'Seoul Incheon',
    iata: 'ICN',
    hotelName: 'Capsule Hotels (Darakhyu)',
    region: 'Asia-Pacific',
    location: 'Airside',
    description: 'Japanese-style capsule hotels with private pods, clean linens, and shared shower facilities. Multiple operators including Darakhyu and Incheon Transit Hotel. Very affordable.',
    rateInfo: 'From ₩25,000/3 hours',
    tags: ['capsule', 'pods', 'korea', 'seoul', 'affordable'],
  },
  {
    id: 'nrt-nine-hours',
    airport: 'Tokyo Narita',
    iata: 'NRT',
    hotelName: 'Nine Hours Capsule Hotel',
    region: 'Asia-Pacific',
    location: 'Landside',
    description: 'Premium capsule hotel with minimalist Japanese design. Individual pods with high-quality bedding, ambient lighting, and modern facilities. Separate shower areas with premium amenities.',
    rateInfo: 'From ¥5,000/4 hours',
    tags: ['nine hours', 'capsule', 'japan', 'tokyo', 'premium'],
  },
];

const LOCATION_BADGE: Record<string, string> = {
  Airside: 'bg-green-50 text-green-700 border-green-200',
  Landside: 'bg-blue-50 text-blue-700 border-blue-200',
  Both: 'bg-gray-50 text-gray-700 border-gray-200',
};

const REGION_BORDER: Record<string, string> = {
  'Asia-Pacific': 'border-action',
  'Europe': 'border-info',
  'North America': 'border-neutral',
  'Middle East': 'border-action',
};

function EntryCard({ entry }: { entry: ResourceEntry }) {
  const borderColor = REGION_BORDER[entry.region] || 'border-gray-300';
  const badgeClass = LOCATION_BADGE[entry.location] || LOCATION_BADGE['Airside'];

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
          <strong>Location:</strong> {entry.location} &nbsp;|&nbsp; <strong>Rates:</strong> {entry.rateInfo}
        </p>
      )}
    </div>
  );
}

function SleepPodsLounges() {
  const [filtered, setFiltered] = useState<ResourceEntry[]>(ENTRIES);
  const handleFilter = useCallback((f: ResourceEntry[]) => setFiltered(f), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airport Sleep Pods & Lounges Guide - Affordable Rest Options"
        description="Complete guide to airport sleep pods, capsule hotels, and rest lounges worldwide. Affordable hourly bookings for short layovers. Find sleep pods at major airports."
        keywords="airport sleep pods, capsule hotel airport, airport lounge sleep, nap pods airport, GoSleep, Minute Suites, YOTELAIR, airport rest area, hourly hotel"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Sleep Pods & Lounges', url: '/resources/sleep-pods-lounges' },
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
                <Bed className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Airport Sleep Pods &amp; Lounges</h1>
            </div>
            <p className="text-xl text-gray-300">Compact, affordable rest spaces for short layovers — from capsule hotels to premium lounges</p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">What Are Airport Sleep Pods &amp; Lounges?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Sleep pods and rest lounges are compact, budget-friendly alternatives to traditional airport hotels. Perfect for short layovers (2–6 hours), these facilities offer private or semi-private spaces to rest, nap, or freshen up without the commitment of a full hotel room.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Types of Airport Rest Facilities</h2>

          <div className="bg-orange-50 border-l-4 border-action p-8 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sleep Pods &amp; Capsules</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Individual sleeping capsules similar to Japanese capsule hotels. Compact but comfortable spaces with bed, lighting, charging ports, and often entertainment systems.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong className="text-gray-900">Typical Duration:</strong> 1–4 hours</li>
              <li><strong className="text-gray-900">Price Range:</strong> $15–50 per hour</li>
              <li><strong className="text-gray-900">Best For:</strong> Quick naps and short rest periods</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-info p-8 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Minute Suites &amp; Micro Rooms</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Small private rooms with daybed or sofa bed, TV, workspace, and private bathroom access. More spacious than pods but smaller than traditional hotel rooms.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong className="text-gray-900">Typical Duration:</strong> 1–8 hours</li>
              <li><strong className="text-gray-900">Price Range:</strong> $40–80 per hour</li>
              <li><strong className="text-gray-900">Best For:</strong> Working, resting, or freshening up in privacy</li>
            </ul>
          </div>

          <div className="bg-gray-50 border-l-4 border-neutral p-8 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Airport Lounges</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Upscale lounges with reclining chairs, quiet zones, showers, and amenities. Some feature dedicated sleep rooms or "quiet pods" for members or day-pass holders.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong className="text-gray-900">Typical Duration:</strong> 3+ hours</li>
              <li><strong className="text-gray-900">Price Range:</strong> $30–100 day pass</li>
              <li><strong className="text-gray-900">Best For:</strong> Comfort, food, showers, and relaxation</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-4 pb-4 border-b-2 border-gray-200">Top Sleep Pod &amp; Lounge Locations Worldwide</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Search by airport, city, or pod brand to find the best rest option for your layover.
          </p>

          <ResourceSearch
            entries={ENTRIES}
            onFilter={handleFilter}
            placeholder="Search by airport, IATA code, or brand (e.g. GoSleep, Minute Suites)..."
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

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">When to Choose Sleep Pods vs Hotels</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-orange-50 border border-action/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Sleep Pods When:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> Layover is 2–6 hours</li>
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> You only need a quick nap</li>
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> Budget is limited</li>
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> You want to stay airside</li>
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> You need a workspace or shower only</li>
                <li className="flex items-center gap-2"><span className="text-action font-bold">✓</span> Traveling light without checked bags</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-info/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Hotels When:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> Layover is 8+ hours</li>
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> You need proper sleep in a bed</li>
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> You want a private bathroom</li>
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> You have luggage to store</li>
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> You prefer more space and amenities</li>
                <li className="flex items-center gap-2"><span className="text-info font-bold">✓</span> Overnight stay required</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              to="/resources/airside-transit-hotels"
              className="inline-flex items-center gap-2 bg-orange-50 text-action hover:bg-orange-100 border border-action/20 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Airside Transit Hotels <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resources/terminal-connected-hotels"
              className="inline-flex items-center gap-2 bg-blue-50 text-info hover:bg-blue-100 border border-info/20 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Terminal-Connected Hotels <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resources/layover-duration"
              className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Calculate Your Layover Time <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Booking Tips</h2>
          <ul className="space-y-4 mb-8">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Book in Advance:</strong> Popular locations fill up quickly, especially during peak travel times</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Check Location:</strong> Verify whether the facility is airside (post-security) or landside to avoid extra security screening</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Compare Prices:</strong> Sometimes hourly pod rates exceed hotel prices for longer stays</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Read Reviews:</strong> Cleanliness and noise levels vary significantly between facilities</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Consider Amenities:</strong> Check if showers, WiFi, and other essentials are included or cost extra</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Flexible Bookings:</strong> Look for options that allow you to extend if your layover changes</li>
          </ul>

        </article>
      </main>
      <Footer />
    </div>
  );
}

export default SleepPodsLounges;
