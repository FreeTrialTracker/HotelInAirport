import { useState, useCallback } from 'react';
import { Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import ResourceSearch, { type ResourceEntry } from '../../components/ResourceSearch';

const ENTRIES: ResourceEntry[] = [
  {
    id: 'sin-ambassador',
    airport: 'Singapore Changi Airport',
    iata: 'SIN',
    hotelName: 'Ambassador Transit Hotel',
    region: 'Asia-Pacific',
    location: 'Airside',
    description: 'Located in Terminals 2 and 3 with world-renowned quality and convenience. Booking available in 6-hour blocks.',
    rateInfo: 'From S$80 / 6 hours',
    tags: ['transit', 'hourly', 'singapore'],
  },
  {
    id: 'sin-aerotel',
    airport: 'Singapore Changi Airport',
    iata: 'SIN',
    hotelName: 'Aerotel Singapore',
    region: 'Asia-Pacific',
    location: 'Airside',
    description: 'Located in Terminal 1, offering hourly rates starting from 6 hours. Comfortable rooms with shower facilities.',
    rateInfo: 'From S$70 / 6 hours',
    tags: ['transit', 'hourly', 'singapore'],
  },
  {
    id: 'dxb-dubai-intl',
    airport: 'Dubai International Airport',
    iata: 'DXB',
    hotelName: 'Dubai International Hotel',
    region: 'Middle East',
    location: 'Airside',
    description: 'Located in Terminal 3 across Concourses A, B, and C. Luxurious 5-star hotel with full-service spa, fitness center, and fine dining — no immigration required.',
    rateInfo: 'From $150 / 6 hours',
    tags: ['luxury', 'transit', 'spa', 'dubai'],
  },
  {
    id: 'doh-oryx',
    airport: 'Doha Hamad International Airport',
    iata: 'DOH',
    hotelName: 'Oryx Airport Hotel',
    region: 'Middle East',
    location: 'Airside',
    description: 'Modern transit hotel in the international zone with comfortable rooms. Hourly bookings available with easy access to luxury shopping.',
    rateInfo: 'From $100 / 6 hours',
    tags: ['transit', 'hourly', 'doha', 'qatar'],
  },
  {
    id: 'auh-aerotel',
    airport: 'Abu Dhabi International Airport',
    iata: 'AUH',
    hotelName: 'Aerotel Abu Dhabi',
    region: 'Middle East',
    location: 'Airside',
    description: 'Located in Terminal 3\'s transit area. Clean, modern rooms with complimentary WiFi and excellent shower facilities. Budget-friendly hourly rates.',
    rateInfo: 'From $60 / 6 hours',
    tags: ['transit', 'budget', 'hourly', 'abu dhabi'],
  },
  {
    id: 'ist-yotelair',
    airport: 'Istanbul Airport',
    iata: 'IST',
    hotelName: 'YOTELAIR Istanbul Airport',
    region: 'Europe',
    location: 'Airside',
    description: 'Located inside the duty-free zone for international transit passengers. No immigration clearance required. Flexible hourly booking from 4 hours with signature SmartBed experience.',
    rateInfo: 'From €50 / 4 hours',
    tags: ['transit', 'yotel', 'istanbul', 'europe'],
  },
  {
    id: 'hel-gosleep',
    airport: 'Helsinki Airport',
    iata: 'HEL',
    hotelName: 'GoSleep Sleeping Pods',
    region: 'Europe',
    location: 'Airside',
    description: 'Compact sleeping pods in the Schengen transit area. Affordable option for quick naps (2–4 hours) with privacy, comfortable reclining seats, and reading lights.',
    rateInfo: 'From €10 / hour',
    tags: ['pods', 'budget', 'helsinki', 'europe'],
  },
];

function EntryCard({ entry }: { entry: ResourceEntry }) {
  const regionColorMap: Record<string, string> = {
    'Asia-Pacific': 'border-info',
    'Europe': 'border-info',
    'Middle East': 'border-action',
    'North America': 'border-neutral',
  };
  const borderColor = regionColorMap[entry.region] || 'border-action';

  return (
    <div className={`bg-white border-l-4 ${borderColor} shadow-md rounded-r-lg p-8 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <h4 className="text-xl font-bold text-gray-900">
          <Link to={`/airports/${entry.iata}`} className="text-info hover:text-info-hover transition-colors">
            {entry.airport} ({entry.iata})
          </Link>
          {' '}&mdash; {entry.hotelName}
        </h4>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 flex-shrink-0">
          Airside
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

function AirsideTransitHotels() {
  const [filtered, setFiltered] = useState<ResourceEntry[]>(ENTRIES);
  const handleFilter = useCallback((f: ResourceEntry[]) => setFiltered(f), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airside Transit Hotels Guide - No Visa Required Airport Hotels"
        description="Complete guide to airside transit hotels at airports worldwide. Stay in the international transit zone without clearing immigration or needing a visa. Perfect for long layovers."
        keywords="airside transit hotels, airport hotels without visa, international transit zone, layover hotels no visa, airport transit accommodation, Singapore transit hotel, Dubai transit hotel, transit hotel booking"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Airside Transit Hotels', url: '/resources/airside-transit-hotels' },
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
                <Shield className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Airside Transit Hotels</h1>
            </div>
            <p className="text-xl text-gray-300">
              Stay in the secure international transit zone without clearing immigration or needing a visa
            </p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">What Are Airside Transit Hotels?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Airside transit hotels are accommodation facilities located within the secure, international transit area of an airport. These hotels are specifically designed for passengers who have long layovers but do not want to or cannot clear immigration and customs to enter the country.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Key Benefits of Airside Transit Hotels</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { title: 'No Visa Required', body: 'Stay without clearing immigration, even if you need a visa to enter the country. Perfect for passengers in transit.' },
              { title: 'Save Time', body: 'No need to go through immigration, collect baggage, or re-check-in for your next flight.' },
              { title: 'Convenient Location', body: 'Located steps away from your departure gate, minimizing walking distance and stress.' },
              { title: 'Flexible Booking', body: 'Often available for hourly bookings (3, 6, 9, 12 hours), not just overnight stays.' },
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

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-4 pb-4 border-b-2 border-gray-200">Best Airside Transit Hotels Worldwide</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Not all airports offer airside transit hotels, but those that do provide exceptional convenience for international travelers.
          </p>

          <ResourceSearch
            entries={ENTRIES}
            onFilter={handleFilter}
            placeholder="Search by airport, IATA code, or hotel name..."
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

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Who Should Book Airside Transit Hotels?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">Airside transit hotels are ideal for several types of travelers:</p>
          <ul className="space-y-4 mb-8">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Travelers without a visa for the transit country:</strong> This is the primary advantage. If obtaining a visa is difficult, expensive, or time-consuming, an airside hotel lets you rest without entry requirements.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Passengers with 4–12 hour layovers seeking quality rest:</strong> Long enough to benefit from a proper bed and shower, but not so long that exploring the city makes sense.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Business travelers maximizing efficiency:</strong> Time is money, and avoiding immigration lines saves precious hours for meetings or rest.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Passengers with connecting flights on the same ticket:</strong> Your baggage is typically checked through to your final destination, so there's no need to collect and recheck it.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Families with children:</strong> Keeping everyone airside reduces the stress of managing kids through multiple security checks.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Travelers on tight connections:</strong> When your next flight is critical and you can't risk delays at immigration.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">What to Expect at Airside Transit Hotels</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Airside transit hotels are designed specifically for travelers in transit, offering all essential amenities within the secure zone. Room quality ranges from basic to luxury depending on the property.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Standard Room Features and Amenities</h3>
          <ul className="space-y-3 mb-8">
            {[
              ['Comfortable bed', 'Typically twin or double with quality mattress and premium linens'],
              ['Private bathroom', 'Full bathroom with hot shower, often with rain shower heads'],
              ['Climate control', 'Individual temperature and fan controls for personalized comfort'],
              ['Work desk and chair', 'Suitable for laptop work or dining'],
              ['Complimentary or premium WiFi', 'High-speed internet for staying connected'],
              ['TV with international channels', 'Entertainment options during rest time'],
              ['Toiletries and fresh towels', 'Shampoo, soap, toothbrush kit, and clean linens'],
              ['Wake-up call service', 'Essential to ensure you don\'t miss your flight'],
              ['Soundproofing', 'Reduces airport noise for better sleep quality'],
            ].map(([title, desc]) => (
              <li key={title} className="text-gray-700 text-lg"><strong className="text-gray-900">{title}</strong> — {desc}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Hourly Pricing Structure</h3>
          <ul className="space-y-3 mb-4">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">3-hour blocks:</strong> $60–120 USD — Ideal for quick naps and showers</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">6-hour blocks:</strong> $100–180 USD — Perfect for 6–10 hour layovers</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">12-hour blocks:</strong> $150–300 USD — For longer layovers with full rest</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Full 24-hour stay:</strong> $200–400 USD — Extended layovers or overnight connections</li>
          </ul>
          <p className="text-sm text-gray-600 bg-gray-100 rounded-lg p-4 mb-8">
            <strong>Note:</strong> Prices vary significantly by airport location, season, and property quality. Budget options like Aerotel Abu Dhabi start around $60 for 6 hours, while luxury properties like Dubai International Hotel can exceed $300 for the same duration.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Important Considerations</h2>
          <div className="bg-orange-50 border-l-4 border-action p-6 rounded-r-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-action mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Your Airline's Baggage Policy</h3>
                <p className="text-gray-700 mb-4">
                  Some airlines require you to collect checked baggage even during transit, which may force you to clear immigration. This is especially common with:
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Self-transfer connections (separate tickets)</li>
                  <li>• Certain US airports due to customs regulations</li>
                  <li>• Budget airlines with different baggage policies</li>
                  <li>• Flights involving terminal changes at some airports</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-info p-6 rounded-r-lg mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-info mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Book in Advance</h3>
                <p className="text-gray-700">
                  Airside transit hotels can fill up quickly, especially during peak travel seasons (summer, holidays) and at popular hub airports. Book 1–2 weeks ahead when possible. Walk-in availability is not guaranteed.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Alternatives to Airside Transit Hotels</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">If your airport does not have an airside transit hotel, consider:</p>
          <ul className="space-y-3 mb-8">
            <li className="text-gray-700 text-lg">
              <strong className="text-gray-900">Airport sleep pods:</strong> More affordable, compact sleeping spaces (see our{" "}
              <Link to="/resources/sleep-pods-lounges" className="text-action hover:text-action-hover underline">Sleep Pods &amp; Lounges guide</Link>)
            </li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Premium lounges with rest areas:</strong> Many Priority Pass lounges offer quiet zones with recliners</li>
            <li className="text-gray-700 text-lg">
              <strong className="text-gray-900">Terminal-connected hotels:</strong> If you have visa-free access or already hold a visa (see our{" "}
              <Link to="/resources/terminal-connected-hotels" className="text-action hover:text-action-hover underline">Terminal-Connected Hotels guide</Link>)
            </li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Day-use hotel rooms:</strong> Some landside hotels offer hourly rates if you can clear immigration quickly</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Expert Booking Tips</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Before You Book</h3>
          <ol className="space-y-4 mb-8 list-none">
            {[
              { title: 'Verify your flight terminals', body: 'Double-check both arrival and departure terminals. Some airside hotels are only accessible from specific terminals.' },
              { title: 'Confirm your baggage policy', body: "Contact your airline to verify that checked baggage will be transferred automatically to your connecting flight." },
              { title: 'Check for airline partnerships', body: "Many airlines (Emirates, Singapore Airlines, Turkish Airlines) offer discounted rates at partner transit hotels." },
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

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">When Booking</h3>
          <ol className="space-y-4 mb-8 list-none">
            {[
              { title: 'Book as early as possible', body: 'Popular transit hotels like those in Singapore and Dubai fill up weeks in advance, especially during peak travel seasons.' },
              { title: 'Calculate check-out timing carefully', body: 'Factor in 15–20 minutes for checkout, walking to your gate, and a buffer for delays.' },
              { title: 'Read cancellation policies', body: 'Choose flexible cancellation options when available. Most allow free cancellation 24 hours in advance.' },
              { title: 'Look for package deals', body: 'Some hotels bundle lounge access, meals, spa treatments, or shower facilities at discounted rates.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-action text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 4}</span>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-700">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="bg-orange-50 border border-action/20 rounded-lg p-6 mt-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Find Airside Transit Hotels?</h3>
            <p className="text-gray-700 mb-4">
              Browse our comprehensive directory of airports with airside transit accommodation options.
            </p>
            <Link
              to="/hotels?access=airside"
              className="inline-flex items-center px-6 py-3 bg-action hover:bg-action-hover text-white rounded-lg transition-colors font-semibold"
            >
              Browse Airside Hotels
              <Shield className="w-5 h-5 ml-2" />
            </Link>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}

export default AirsideTransitHotels;
