import { Globe, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

function ImmigrationRequirements() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Immigration & Visa Requirements for Layover Hotels"
        description="Understanding visa requirements and immigration procedures for airport layover accommodations. Know before you book. Airside vs landside access explained."
        keywords="layover visa requirements, transit visa, airside landside, airport immigration, visa free transit, layover without visa, passport control"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Immigration Requirements', url: '/resources/immigration-requirements' },
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
                <Globe className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Immigration Access Requirements</h1>
            </div>
            <p className="text-xl text-gray-300">Know your visa status before booking — it determines which hotels you can access during your layover</p>
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200">Why Immigration Status Matters for Layover Hotels</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Your visa and passport status is the single most important factor in determining which airport hotels are available to you. Booking the wrong type of hotel — one that requires immigration clearance you don't have — can result in being denied entry or missing your connecting flight.
          </p>

          <div className="bg-warning/10 border-l-4 border-warning p-6 rounded-r-lg mb-10">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-warning mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Always Check Before Booking</h3>
                <p className="text-gray-700">
                  Visa requirements change frequently. Always verify your specific passport's entry requirements for the transit country before booking any landside hotel. Requirements differ not just by destination but by your nationality, connecting flight origin, and layover duration.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">The Two Key Scenarios</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-14">
            <div className="bg-white border-2 border-action rounded-xl overflow-hidden shadow-sm">
              <div className="bg-action px-6 py-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Staying Airside</h3>
                </div>
                <p className="text-orange-100 text-sm mt-1">No visa needed</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  You remain in the international transit zone without clearing passport control. You have technically not entered the country.
                </p>
                <h4 className="font-bold text-gray-900 mb-3">Who Can Stay Airside:</h4>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-0.5 flex-shrink-0" /> All passport holders with onward flights</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-0.5 flex-shrink-0" /> Travelers without a visa for the country</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-action mt-0.5 flex-shrink-0" /> Passengers with checked-through baggage</li>
                </ul>
                <h4 className="font-bold text-gray-900 mb-3">Exception: Airport Transit Visa</h4>
                <p className="text-gray-700 text-sm mb-4">
                  Some countries require an Airport Transit Visa (ATV) even to stay airside. This applies to certain passport holders transiting through the UK, Schengen zone, and Canada. Always verify before flying.
                </p>
                <Link
                  to="/resources/airside-transit-hotels"
                  className="inline-flex items-center gap-1 text-action font-semibold text-sm hover:underline"
                >
                  Browse airside hotels <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white border-2 border-info rounded-xl overflow-hidden shadow-sm">
              <div className="bg-info px-6 py-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Clearing Immigration</h3>
                </div>
                <p className="text-blue-100 text-sm mt-1">Visa or visa-free access required</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  You pass through passport control and officially enter the country. This is required for all terminal-connected, shuttle, and nearby hotels.
                </p>
                <h4 className="font-bold text-gray-900 mb-3">Access Requirements:</h4>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" /> Valid visa for the transit country</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" /> Visa-free access (check your passport)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" /> Electronic Travel Authorization (eTA/ETA)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" /> Valid return or onward ticket</li>
                </ul>
                <h4 className="font-bold text-gray-900 mb-3">Remember:</h4>
                <p className="text-gray-700 text-sm mb-4">
                  After clearing immigration, you must re-check baggage (if applicable), go through security screening again, and allow 60–90 minutes before your flight.
                </p>
                <Link
                  to="/resources/access-types"
                  className="inline-flex items-center gap-1 text-info font-semibold text-sm hover:underline"
                >
                  Compare hotel access types <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Common Visa Situations by Passport</h2>

          <div className="space-y-6 mb-12">

            <div className="bg-white border-l-4 border-info shadow-sm rounded-r-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">US, UK, EU, Australian Passports</h3>
              <p className="text-gray-700 mb-3">
                Holders of these passports enjoy broad visa-free access to most transit countries. They can typically clear immigration at the following hubs without a pre-arranged visa:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Visa-Free Transit Typically Available:</p>
                  <ul className="space-y-1">
                    <li>• Dubai (UAE) — up to 96 hours</li>
                    <li>• Singapore — up to 96 hours</li>
                    <li>• Amsterdam (Netherlands)</li>
                    <li>• Frankfurt, Munich (Germany)</li>
                    <li>• Tokyo (Japan)</li>
                    <li>• Seoul (South Korea)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Note:</p>
                  <p className="text-gray-600 text-sm">Even with visa-free access, some countries require an eTA (Electronic Travel Authorization) purchased before arrival. Canada, Australia, and New Zealand require this.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-action shadow-sm rounded-r-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Indian, Pakistani, Nigerian, and Many African/Asian Passports</h3>
              <p className="text-gray-700 mb-3">
                Holders of these passports often face more restrictions and may need visas even for short layovers. Key considerations:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li><strong className="text-gray-900">UK Airport Transit Visa (ATV):</strong> Required for many nationalities even when just transiting through Heathrow, Gatwick, or other UK airports without clearing immigration.</li>
                <li><strong className="text-gray-900">Schengen Transit Visa:</strong> Required for certain nationalities to transit through Schengen airports even airside. Countries like Germany, France, and Netherlands may require this.</li>
                <li><strong className="text-gray-900">Dubai/UAE:</strong> Generally no visa needed for transit under 96 hours for most nationalities, but rules change — verify before flying.</li>
                <li><strong className="text-gray-900">Singapore:</strong> Visa-free for Indian passport holders for transit up to 96 hours under certain conditions.</li>
              </ul>
            </div>

            <div className="bg-white border-l-4 border-neutral shadow-sm rounded-r-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chinese, Russian Passports</h3>
              <p className="text-gray-700 mb-3">
                Access varies significantly by destination. Some countries have specific arrangements:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong className="text-gray-900">Singapore:</strong> Chinese passport holders can access Changi airside transit hotels without a visa.</li>
                <li><strong className="text-gray-900">Dubai:</strong> Visa on arrival available for Chinese passport holders, allowing landside hotel access.</li>
                <li><strong className="text-gray-900">European Airports:</strong> Airport Transit Visa typically required for Russian passport holders at most Schengen airports.</li>
                <li><strong className="text-gray-900">Turkey (IST):</strong> Chinese and Russian nationals can obtain e-visa relatively easily for landside access.</li>
              </ul>
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Country-Specific Transit Rules at Major Hubs</h2>

          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Airport</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Airside Hotels</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Landside Access</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-gray-900 border-b border-gray-200">Key Notes</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 font-semibold">Dubai (DXB)</td>
                  <td className="px-5 py-4 text-green-700">Available</td>
                  <td className="px-5 py-4">96-hour visa free (most)</td>
                  <td className="px-5 py-4">No ATV required for airside</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-5 py-4 font-semibold">Singapore (SIN)</td>
                  <td className="px-5 py-4 text-green-700">Available</td>
                  <td className="px-5 py-4">96-hour visa free (most)</td>
                  <td className="px-5 py-4">Some nationalities need transit visa</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 font-semibold">London (LHR)</td>
                  <td className="px-5 py-4 text-yellow-700">Limited</td>
                  <td className="px-5 py-4">ETA required (most)</td>
                  <td className="px-5 py-4">UK ATV needed for some nationalities</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-5 py-4 font-semibold">Istanbul (IST)</td>
                  <td className="px-5 py-4 text-green-700">Available</td>
                  <td className="px-5 py-4">e-Visa (most nationalities)</td>
                  <td className="px-5 py-4">Affordable e-Visa available online</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 font-semibold">Amsterdam (AMS)</td>
                  <td className="px-5 py-4 text-yellow-700">Limited</td>
                  <td className="px-5 py-4">Schengen visa or visa-free</td>
                  <td className="px-5 py-4">Schengen ATV for some nationals</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-5 py-4 font-semibold">Doha (DOH)</td>
                  <td className="px-5 py-4 text-green-700">Available</td>
                  <td className="px-5 py-4">Visa on arrival (most)</td>
                  <td className="px-5 py-4">Transit hotel in airside zone</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold">Seoul (ICN)</td>
                  <td className="px-5 py-4 text-green-700">Available</td>
                  <td className="px-5 py-4">72-hour visa free (many)</td>
                  <td className="px-5 py-4">Transit hotels in both zones</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Understanding Airport Transit Visas (ATV)</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            An Airport Transit Visa (ATV) is a special visa required by some countries for certain nationalities to transit through their airport — even without leaving the transit zone. This is different from a regular entry visa.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-orange-50 border border-action/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Countries Requiring ATV for Some Nationalities</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>United Kingdom:</strong> UK Direct Airside Transit Visa</li>
                <li><strong>Schengen Countries:</strong> Airport Transit Visa for 20+ nationalities</li>
                <li><strong>Canada:</strong> Electronic Travel Authorization (eTA)</li>
                <li><strong>Australia:</strong> Electronic Travel Authority (ETA)</li>
                <li><strong>China:</strong> 24-hour Transit Without Visa (TWOV) rules</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-info/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How to Check If You Need an ATV</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>1. Check your airline's visa requirement tool</li>
                <li>2. Contact the embassy or consulate of the transit country</li>
                <li>3. Use IATA Travel Centre (accessible via your airline)</li>
                <li>4. Check Timatic (the official IATA database)</li>
                <li>5. Verify with your travel agent or airline check-in staff</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">Practical Tips for Layover Hotel Access</h2>

          <div className="space-y-4 mb-10">
            {[
              {
                title: 'Check visa requirements before booking flights, not just hotels',
                body: "Many travelers discover visa requirements only when booking their hotel — but it's better to factor this in when choosing your connecting airport. Dubai, Istanbul, and Doha are popular hubs precisely because they offer broad visa-free access."
              },
              {
                title: 'Understand the difference between transit visa and tourist visa',
                body: 'A transit visa allows passage through a country for a limited time (usually 24–96 hours). A tourist visa allows you to stay longer and explore. For airport layovers, you typically only need a transit visa — which is cheaper and easier to obtain.'
              },
              {
                title: 'Know your baggage situation',
                body: "If your bags are checked through to your final destination, you can often stay airside even on connecting flights. But if you're on separate tickets or your airline requires you to collect bags, you must clear immigration regardless of your hotel choice."
              },
              {
                title: "Don't forget return flight requirements",
                body: "Most countries require proof of an onward ticket to grant immigration access. Ensure your connecting flight booking is clear and readily accessible when presenting documents at passport control.",
                link: null,
              },
              {
                title: 'Electronic travel authorizations (ETAs) must be obtained before departure',
                body: 'Unlike visa-on-arrival, ETAs must be applied for online before you travel. Apply at least 72 hours in advance. Canada, Australia, New Zealand, and the UK now require these for many passport holders.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{item.title}</p>
                    <p className="text-gray-700">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-14 mb-6 pb-4 border-b-2 border-gray-200">What to Do If You're Denied Entry</h2>

          <div className="bg-red-50 border-l-4 border-warning p-6 rounded-r-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-warning mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">If Immigration Denies Your Entry</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• You will typically be held in the airport transit zone or a detention facility until your next available flight home</li>
                  <li>• The airline that carried you is responsible for your return flight at no extra cost</li>
                  <li>• Your hotel booking will be forfeited — check cancellation policies and travel insurance coverage</li>
                  <li>• Always have comprehensive travel insurance that covers immigration denial</li>
                  <li>• Contact your embassy or consulate if detained</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-10">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prevention is Simple</h3>
                <p className="text-gray-700">
                  The vast majority of immigration issues can be avoided with 10 minutes of research before booking. When in doubt, choose an airside transit hotel — it eliminates all immigration risk while still providing comfortable rest during your layover.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link to="/resources/layover-duration" className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:border-action/40 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-action" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Layover Duration Planning</p>
                <p className="text-gray-500 text-xs mt-0.5">Calculate realistic rest time for your connection</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-action transition-colors" />
            </Link>
            <Link to="/resources/access-types" className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:border-action/40 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-action" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-action transition-colors">Hotel Access Types</p>
                <p className="text-gray-500 text-xs mt-0.5">Airside, terminal-connected, shuttle — explained</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-action transition-colors" />
            </Link>
          </div>

          <div className="bg-orange-50 border border-action/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Airside Hotels — No Visa Required</h3>
            <p className="text-gray-700 mb-4">
              Browse our directory of airside transit hotels at major hubs where no immigration clearance is needed.
            </p>
            <Link
              to="/resources/airside-transit-hotels"
              className="inline-flex items-center px-6 py-3 bg-action hover:bg-action-hover text-white rounded-lg transition-colors font-semibold"
            >
              Explore Airside Hotels
              <Shield className="w-5 h-5 ml-2" />
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}

export default ImmigrationRequirements;
