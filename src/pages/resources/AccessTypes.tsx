import { MapPin, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

function AccessTypes() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airport Hotel Access Types - Terminal, Shuttle, Walking Distance"
        description="Understanding different types of airport hotel locations and access methods. Compare terminal-connected, airside, shuttle, and nearby hotels. Choose based on your layover needs."
        keywords="airport hotel access, terminal connected, airside hotel, airport shuttle hotel, walking distance airport, hotel location types, airport accommodation access"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Access Types', url: '/resources/access-types' },
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
                <MapPin className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Terminal &amp; Access Types</h1>
            </div>
            <p className="text-xl text-gray-300">Understanding airport hotel locations and how to get between the hotel and your gate</p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">Why Hotel Location Matters</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The location of your airport hotel relative to the terminal determines how long it takes to get to your gate, whether you need to clear immigration, and how much buffer time you should allow. Understanding the four main access types will help you make the right choice for your specific layover situation.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">The Four Access Types</h2>

          <div className="space-y-8 mb-14">

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-action px-8 py-5">
                <h3 className="text-2xl font-bold text-white">1. Airside (Transit Zone)</h3>
                <p className="text-orange-100 mt-1">No immigration required — stay in the secure international zone</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Airside hotels are located within the international transit zone — past passport control but before you exit to the country. You remain in the secure zone at all times, which means no visa is needed and no immigration queues.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Advantages</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-1 flex-shrink-0" /> No visa needed</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-1 flex-shrink-0" /> No immigration queues</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-1 flex-shrink-0" /> Steps from departure gates</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-1 flex-shrink-0" /> No baggage reclaim needed</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-1 flex-shrink-0" /> Suitable for 3–12 hour layovers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Limitations</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Limited to select major hubs</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Often smaller rooms</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Can fill up quickly</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> No access to city</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg px-5 py-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">Walk to gate:</span>
                  <span className="text-sm text-gray-700">2–10 minutes</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-semibold text-gray-900">Buffer needed:</span>
                  <span className="text-sm text-gray-700">30–45 minutes before flight</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-info px-8 py-5">
                <h3 className="text-2xl font-bold text-white">2. Terminal-Connected (Landside)</h3>
                <p className="text-blue-100 mt-1">Walk via covered walkway — must clear immigration first</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Terminal-connected hotels are physically attached to the terminal building via a walkway, skybridge, or underground passage. They are landside — meaning you must clear immigration and customs to access them. However, you can walk to check-in in minutes without any transportation.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Advantages</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-1 flex-shrink-0" /> Walk to terminal in 2–15 min</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-1 flex-shrink-0" /> Weather-protected access</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-1 flex-shrink-0" /> Full hotel amenities</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-1 flex-shrink-0" /> No shuttle waiting</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-1 flex-shrink-0" /> Good for 8+ hour layovers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Limitations</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Must clear immigration</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Visa may be required</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Typically more expensive</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Must re-check bags &amp; security</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg px-5 py-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">Walk to terminal:</span>
                  <span className="text-sm text-gray-700">2–15 minutes</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-semibold text-gray-900">Buffer needed:</span>
                  <span className="text-sm text-gray-700">60–90 minutes before flight</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-neutral px-8 py-5">
                <h3 className="text-2xl font-bold text-white">3. Shuttle Service</h3>
                <p className="text-gray-200 mt-1">Free hotel shuttle bus — 5 to 20 minutes away</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Shuttle hotels offer complimentary or low-cost bus service to and from the terminal. They're typically located 1–5 km from the airport, making them a cost-effective option when you have enough time for the shuttle ride and security.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Advantages</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Significantly more affordable</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Larger rooms, more amenities</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Often 24-hour shuttle service</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Good for 12+ hour layovers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Limitations</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Must clear immigration</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Shuttle wait times vary</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Traffic delays possible</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Adds 30–60 min transit time</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg px-5 py-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">Travel to terminal:</span>
                  <span className="text-sm text-gray-700">15–40 minutes (shuttle + walk)</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-semibold text-gray-900">Buffer needed:</span>
                  <span className="text-sm text-gray-700">90–120 minutes before flight</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-700 px-8 py-5">
                <h3 className="text-2xl font-bold text-white">4. Nearby (Walking Distance / Taxi)</h3>
                <p className="text-gray-300 mt-1">Within 1 km — walk or short taxi ride</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Nearby hotels are close enough to walk or take a quick taxi ride. They may not offer shuttle service, but their proximity makes them practical for overnight layovers when you want to save money but stay close to the airport.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Advantages</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /> Most affordable option</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /> Good room quality for price</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /> Independent from airport crowds</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Limitations</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Must clear immigration</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Taxi/transport costs extra</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Less predictable transit time</li>
                      <li className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-neutral mt-1 flex-shrink-0" /> Not suitable for short layovers</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg px-5 py-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">Travel to terminal:</span>
                  <span className="text-sm text-gray-700">10–30 minutes</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-semibold text-gray-900">Buffer needed:</span>
                  <span className="text-sm text-gray-700">90+ minutes before flight</span>
                </div>
              </div>
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Quick Comparison: Which Type Is Right for You?</h2>

          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Access Type</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Visa Needed?</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Min. Layover</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Cost Range</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 font-semibold text-action">Airside</td>
                  <td className="px-5 py-4 text-green-700 font-medium">No</td>
                  <td className="px-5 py-4">3–4 hrs</td>
                  <td className="px-5 py-4">$60–300/block</td>
                  <td className="px-5 py-4">Short layovers, no visa</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-info">Terminal-Connected</td>
                  <td className="px-5 py-4 text-red-600 font-medium">Yes</td>
                  <td className="px-5 py-4">8 hrs</td>
                  <td className="px-5 py-4">$150–400/night</td>
                  <td className="px-5 py-4">Business travelers, early flights</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 font-semibold text-neutral">Shuttle</td>
                  <td className="px-5 py-4 text-red-600 font-medium">Yes</td>
                  <td className="px-5 py-4">10 hrs</td>
                  <td className="px-5 py-4">$80–200/night</td>
                  <td className="px-5 py-4">Budget-conscious, overnight</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold text-gray-700">Nearby</td>
                  <td className="px-5 py-4 text-red-600 font-medium">Yes</td>
                  <td className="px-5 py-4">12 hrs</td>
                  <td className="px-5 py-4">$60–150/night</td>
                  <td className="px-5 py-4">Overnight, budget priority</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">How to Choose the Right Access Type</h2>

          <div className="space-y-6 mb-10">
            <div className="bg-orange-50 border-l-4 border-action p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">If you don't have a visa (or can't get one easily)</h3>
              <p className="text-gray-700">Choose an <Link to="/resources/airside-transit-hotels" className="text-action hover:text-action-hover underline font-medium">airside transit hotel</Link>. It's your only option for staying within the airport without clearing immigration.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-info p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">If you have a tight layover (under 8 hours) but have visa-free access</h3>
              <p className="text-gray-700">A <Link to="/resources/terminal-connected-hotels" className="text-info hover:text-info-hover underline font-medium">terminal-connected hotel</Link> gives you the fastest access and minimizes time spent in transit.</p>
            </div>
            <div className="bg-gray-50 border-l-4 border-neutral p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">If you have a long layover (12+ hours) and want to save money</h3>
              <p className="text-gray-700">A shuttle hotel offers the best value. The 30–40 minute round trip is worth the cost savings on a long overnight stay.</p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">If you want to explore the city during your layover</h3>
              <p className="text-gray-700">Any landside hotel works. Choose based on your budget and how far into the city you want to venture. A nearby hotel near the city center may be more convenient than an airport property.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Understanding "Airside" vs "Landside"</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The terms airside and landside refer to your position relative to passport control:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-orange-50 border border-action/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Airside</h3>
              <p className="text-gray-700 mb-3">Past passport control and security — you are in the international transit zone. You have NOT entered the country.</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• No entry stamp in passport</li>
                <li>• Access to duty-free shops</li>
                <li>• Can't leave the airport</li>
                <li>• No visa needed for most travelers</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-info/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Landside</h3>
              <p className="text-gray-700 mb-3">Before passport control (arrivals hall) or after clearing immigration. You have officially entered the country.</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Entry stamp received</li>
                <li>• Can exit the airport freely</li>
                <li>• Must have valid visa if required</li>
                <li>• Must go through security again to depart</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Key Questions to Ask Before Booking</h2>
          <ul className="space-y-4 mb-8">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Do I need a visa to enter this country?</strong> If yes, you can only use airside hotels unless you already have one.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">How long is my layover?</strong> Under 6 hours: airside or terminal-connected only. 8–12 hours: all options open. 12+ hours: any option works.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Which terminal do I arrive in and depart from?</strong> Some hotels only connect to specific terminals — switching terminals may cost extra time.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Does my baggage transfer automatically?</strong> If you must collect bags, you'll need to clear immigration regardless of hotel type.</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">What time does the shuttle run?</strong> Not all shuttles operate 24 hours — check the schedule for early morning or late-night arrivals.</li>
          </ul>

        </article>
      </main>
      <Footer />
    </div>
  );
}

export default AccessTypes;
