import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

function LayoverDuration() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Layover Duration Planning Guide - Calculate Rest Time"
        description="Calculate realistic rest time based on your layover length. Account for transit, check-in, security queues. Complete guide to layover time management and hotel booking."
        keywords="layover duration, layover planning, layover time calculator, how long layover hotel, layover buffer time, transit time planning, layover schedule"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Layover Duration', url: '/resources/layover-duration' },
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
                <Clock className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Layover Duration Planning</h1>
            </div>
            <p className="text-xl text-gray-300">Calculate realistic rest time based on your layover length and account for transit, security, and buffer time</p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">Understanding Layover Time Planning</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Not all of your layover time is available for rest. You need to account for deplaning, transit time, security screening, and re-boarding. This guide helps you calculate realistic rest time and choose the right accommodation for your layover duration.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Time Breakdown: What Eats Into Your Layover</h2>

          <div className="bg-orange-50 border-l-4 border-action p-8 rounded-r-lg mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Standard Time Allocations</h3>
            <div className="space-y-3 text-gray-700">
              {[
                ['Deplaning &amp; Walking to Exit', '15–30 minutes'],
                ['Immigration (if required)', '30–90 minutes'],
                ['Baggage Claim (if checked)', '20–40 minutes'],
                ['Transport to Hotel', '5–30 minutes'],
                ['Hotel Check-in', '10–15 minutes'],
                ['Return Journey &amp; Check-in', '30–60 minutes'],
                ['Security Screening', '20–60 minutes'],
                ['Walking to Gate &amp; Boarding', '20–30 minutes'],
              ].map(([label, time], i) => (
                <div key={i} className="flex justify-between items-center border-b border-orange-200 pb-3">
                  <span className="font-medium" dangerouslySetInnerHTML={{ __html: label }} />
                  <span className="font-semibold text-gray-900 ml-4">{time}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="text-lg font-bold text-gray-900">TOTAL OVERHEAD:</span>
                <span className="font-bold text-xl text-action">2.5–5.5 hours</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Layover Duration Guide</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-white border-l-4 border-neutral shadow-md rounded-r-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Under 3 Hours</h3>
                <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full font-semibold text-sm">Too Short</span>
              </div>
              <p className="text-gray-700 mb-3"><strong className="text-gray-900">Usable Rest Time:</strong> 0–30 minutes</p>
              <p className="text-gray-700 mb-3">
                Not enough time for any hotel or sleep pod. Use airport seating, lounges if you have access, or walk around to stay fresh.
              </p>
              <p className="text-gray-700"><strong className="text-gray-900">Recommendation:</strong> Stay at the gate or in nearby seating areas</p>
            </div>

            <div className="bg-white border-l-4 border-action shadow-md rounded-r-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">3–5 Hours</h3>
                <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full font-semibold text-sm">Tight</span>
              </div>
              <p className="text-gray-700 mb-3"><strong className="text-gray-900">Usable Rest Time:</strong> 1–2 hours</p>
              <p className="text-gray-700 mb-3">
                Enough for sleep pods or airside transit hotels if available. Not enough time for landside hotels that require immigration.
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Recommendation:</strong>{' '}
                <Link to="/resources/sleep-pods-lounges" className="text-action hover:text-action-hover underline">Airport sleep pods</Link>
                {' '}or{' '}
                <Link to="/resources/airside-transit-hotels" className="text-action hover:text-action-hover underline">airside transit hotels</Link>
              </p>
            </div>

            <div className="bg-white border-l-4 border-action shadow-md rounded-r-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">5–8 Hours</h3>
                <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full font-semibold text-sm">Moderate</span>
              </div>
              <p className="text-gray-700 mb-3"><strong className="text-gray-900">Usable Rest Time:</strong> 2–4 hours</p>
              <p className="text-gray-700 mb-3">
                Ideal for airside hotels or terminal-connected properties. Just enough time for a proper nap and shower if you don't need to clear immigration.
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Recommendation:</strong>{' '}
                <Link to="/resources/airside-transit-hotels" className="text-action hover:text-action-hover underline">Airside transit hotels</Link>
                {' '}or{' '}
                <Link to="/resources/terminal-connected-hotels" className="text-action hover:text-action-hover underline">terminal-connected hotels</Link>
                {' '}(if visa-free)
              </p>
            </div>

            <div className="bg-white border-l-4 border-info shadow-md rounded-r-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">8–12 Hours</h3>
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold text-sm">Good</span>
              </div>
              <p className="text-gray-700 mb-3"><strong className="text-gray-900">Usable Rest Time:</strong> 4–7 hours</p>
              <p className="text-gray-700 mb-3">
                Perfect for proper sleep. Enough time to leave the airport for terminal-connected or nearby hotels if you have a visa. Consider full hotel rooms over pods.
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Recommendation:</strong>{' '}
                <Link to="/resources/terminal-connected-hotels" className="text-info hover:text-info-hover underline">Terminal-connected hotels</Link>
                {' '}or nearby hotels with shuttle
              </p>
            </div>

            <div className="bg-white border-l-4 border-info shadow-md rounded-r-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">12+ Hours (Overnight)</h3>
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold text-sm">Ideal</span>
              </div>
              <p className="text-gray-700 mb-3"><strong className="text-gray-900">Usable Rest Time:</strong> 7+ hours</p>
              <p className="text-gray-700 mb-3">
                Plenty of time for a full night's sleep and amenities. Consider exploring the city if you have a visa. Full hotel experience worthwhile.
              </p>
              <p className="text-gray-700"><strong className="text-gray-900">Recommendation:</strong> Any hotel type — prioritize comfort, amenities, and value</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Special Considerations</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">International vs Domestic Layovers</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-50 border border-info/20 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Domestic Layovers</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-info mt-1">•</span> No immigration delays</li>
                <li className="flex items-start gap-2"><span className="text-info mt-1">•</span> Faster security screening (TSA PreCheck/CLEAR)</li>
                <li className="flex items-start gap-2"><span className="text-info mt-1">•</span> Can stay airside easily</li>
                <li className="flex items-start gap-2"><span className="text-info mt-1">•</span> More usable rest time</li>
                <li className="flex items-start gap-2"><span className="text-info mt-1">•</span> Add 2–3 hours overhead</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">International Layovers</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-neutral mt-1">•</span> Immigration can take 30–90 minutes</li>
                <li className="flex items-start gap-2"><span className="text-neutral mt-1">•</span> Customs if changing airports</li>
                <li className="flex items-start gap-2"><span className="text-neutral mt-1">•</span> May need to collect/recheck bags</li>
                <li className="flex items-start gap-2"><span className="text-neutral mt-1">•</span> Visa requirements may apply</li>
                <li className="flex items-start gap-2"><span className="text-neutral mt-1">•</span> Add 3–5 hours overhead</li>
              </ul>
              <Link
                to="/resources/immigration-requirements"
                className="inline-flex items-center gap-1 text-action font-semibold text-sm mt-4 hover:underline"
              >
                Check immigration requirements <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Peak vs Off-Peak Times</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Security and immigration times vary dramatically by time of day and season:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Peak Times (Add extra buffer):</strong> Monday mornings, Friday evenings, summer months, holidays, 6–9am and 4–7pm</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Off-Peak Times (Faster):</strong> Midday (10am–2pm), late night (after 9pm), Tuesday–Thursday, winter months</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Security Fast-Track:</strong> TSA PreCheck, CLEAR, Global Entry, or airline status can save 15–30 minutes</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Terminal Changes</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            If changing terminals or airlines, add extra time:
          </p>
          <ul className="space-y-3 mb-10">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Same Terminal:</strong> 10–15 minutes walking</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Different Terminal (connected):</strong> 15–30 minutes</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Different Terminal (shuttle):</strong> 30–60 minutes</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Different Airport:</strong> 2–3 hours minimum (ground transportation + check-in)</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Quick Decision Matrix</h2>

          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Total Layover</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Domestic</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">International</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Best Option</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-semibold">3–5 hours</td>
                  <td className="px-6 py-4">~2 hrs rest</td>
                  <td className="px-6 py-4">~1 hr rest</td>
                  <td className="px-6 py-4">Sleep pods airside</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-6 py-4 font-semibold">5–8 hours</td>
                  <td className="px-6 py-4">~4 hrs rest</td>
                  <td className="px-6 py-4">~2–3 hrs rest</td>
                  <td className="px-6 py-4">Airside/terminal hotel</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-semibold">8–12 hours</td>
                  <td className="px-6 py-4">~6–7 hrs rest</td>
                  <td className="px-6 py-4">~4–5 hrs rest</td>
                  <td className="px-6 py-4">Terminal-connected hotel</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">12+ hours</td>
                  <td className="px-6 py-4">~8+ hrs rest</td>
                  <td className="px-6 py-4">~7+ hrs rest</td>
                  <td className="px-6 py-4">Any hotel (full sleep)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Pro Tips for Maximizing Rest Time</h2>
          <ul className="space-y-4 mb-8">
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Pre-book Everything:</strong> Hotel, lounge, or pod reservations save valuable time searching</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Travel Light:</strong> Carry-on only eliminates baggage claim (save 20–40 minutes)</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Use Fast-Track Programs:</strong> TSA PreCheck, Global Entry, CLEAR worth the investment</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Know Your Airport:</strong> Research terminal layouts and transit options in advance</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Set Multiple Alarms:</strong> Don't risk missing your flight for extra sleep</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Buffer for Delays:</strong> Always keep a 30-minute cushion for unexpected delays</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Mobile Boarding Pass:</strong> Save time at check-in counters</li>
            <li className="text-gray-700 text-lg"><strong className="text-gray-900">Check Gate Location:</strong> Before sleeping, confirm your departure gate location</li>
          </ul>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/airports" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-action/40 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-action" />
              </div>
              <span className="font-semibold text-gray-800 text-sm group-hover:text-action transition-colors">Find Airports</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-action transition-colors" />
            </Link>
            <Link to="/resources/access-types" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-action/40 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-action" />
              </div>
              <span className="font-semibold text-gray-800 text-sm group-hover:text-action transition-colors">Hotel Access Types</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-action transition-colors" />
            </Link>
            <Link to="/hotels" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-action/40 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-action" />
              </div>
              <span className="font-semibold text-gray-800 text-sm group-hover:text-action transition-colors">Browse All Hotels</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-action transition-colors" />
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}

export default LayoverDuration;
