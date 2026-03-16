import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Methodology - How We Research Airport Hotel Data | HotelInAirport.com"
        description="Learn how HotelInAirport.com researches, verifies, and classifies airport hotels, airside transit access, terminal connections, and layover accommodation data."
        keywords="methodology, airport hotel research, data verification, HotelInAirport methodology"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Methodology', url: '/methodology' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="bg-brand text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Our Methodology</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              How we research, classify, and verify airport hotel data — and why accuracy matters for layover travellers.
            </p>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 blog-content">

          <p>
            The most important question for any layover traveller is not just "is there a hotel at this airport?" but <em>"can I actually access it?"</em> The answer depends on your passport, your visa status, which terminal you arrive in, and how much time you have. Our methodology is built around answering that question accurately.
          </p>

          <h2 id="classification-system">Our Classification System</h2>
          <p>
            Every hotel, sleep pod, and lounge in our database is classified using a strict three-category system based on physical location and access requirements:
          </p>

          <div className="grid md:grid-cols-3 gap-5 my-8 not-prose">
            {[
              {
                label: 'Airside',
                color: 'bg-green-50 border-green-200',
                textColor: 'text-green-800',
                badgeColor: 'bg-green-100 text-green-700',
                desc: 'Located within the secure international transit zone. Accessible to passengers in transit without clearing immigration or customs.',
              },
              {
                label: 'Landside',
                color: 'bg-blue-50 border-blue-200',
                textColor: 'text-blue-800',
                badgeColor: 'bg-blue-100 text-blue-700',
                desc: 'Located outside the secure zone. Requires passengers to clear immigration and customs to access. May not be available to visa-restricted nationalities.',
              },
              {
                label: 'Both',
                color: 'bg-gray-50 border-gray-200',
                textColor: 'text-gray-800',
                badgeColor: 'bg-gray-200 text-gray-700',
                desc: 'Some properties have components in both zones (e.g. a hotel with an airside lounge and landside rooms). These are noted separately.',
              },
            ].map(item => (
              <div key={item.label} className={`border rounded-xl p-5 ${item.color}`}>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${item.badgeColor}`}>{item.label}</span>
                <p className={`text-sm leading-relaxed ${item.textColor}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="research-process">Research Process</h2>

          <h3>Step 1 — Airport Identification</h3>
          <p>We start by identifying airports that are likely to have relevant accommodation based on:</p>
          <ul>
            <li>Annual international passenger volume (focus on airports with 5M+ international passengers)</li>
            <li>Known hub status for major international carriers</li>
            <li>Presence of long-haul routes requiring overnight connections</li>
            <li>Historical traveller reports of transit accommodation</li>
          </ul>

          <h3>Step 2 — Hotel and Facility Research</h3>
          <p>For each airport, we research accommodation using multiple independent sources:</p>
          <ul>
            <li>Official airport operator websites and terminal maps</li>
            <li>Hotel brand websites and booking pages</li>
            <li>Airport concession and operator announcements</li>
            <li>Traveller reviews and first-hand reports (TripAdvisor, Google Reviews, aviation forums)</li>
            <li>Airline layover hotel programme documentation</li>
          </ul>

          <h3>Step 3 — Access Classification</h3>
          <p>
            Determining whether a hotel is "airside" or "landside" requires more than checking a map. We verify:
          </p>
          <ul>
            <li>Whether the property is located before or after passport control</li>
            <li>Whether the connection walkway passes through any security or immigration checkpoint</li>
            <li>Whether the hotel has published documentation confirming transit-zone access</li>
            <li>Whether travellers report requiring immigration clearance in practice</li>
          </ul>
          <p>
            When sources conflict or information is ambiguous, we default to classifying the property as "Landside" and flag it for further verification. We prefer to under-promise and over-deliver rather than send a traveller into an immigration problem.
          </p>

          <h3>Step 4 — Layover Access Rules</h3>
          <p>Beyond the hotel classification, we document layover access rules which vary by:</p>
          <ul>
            <li><strong>Passport nationality</strong> — e.g. some airports require a transit visa for certain passport holders</li>
            <li><strong>Airline</strong> — some airlines allow transit passengers to stay airside; others require immigration clearance</li>
            <li><strong>Minimum layover duration</strong> — e.g. some airports only allow landside exit for layovers of 8+ hours</li>
            <li><strong>Terminal</strong> — some airports have separate international and domestic terminals with different rules</li>
          </ul>

          <h3>Step 5 — Ongoing Verification</h3>
          <p>Airport rules change. Hotels open, close, and rebrand. We maintain data quality through:</p>
          <ul>
            <li>Periodic re-review of all entries (target: every 6–12 months per airport)</li>
            <li>Monitoring official airport and hotel news sources</li>
            <li>Reviewing reader-submitted corrections and reports</li>
            <li>Cross-referencing against updated airline and immigration authority documentation</li>
          </ul>

          <h2 id="what-we-dont-do">What We Don't Do</h2>
          <div className="bg-orange-50 border-l-4 border-action p-6 rounded-r-lg my-8 not-prose">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-action mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 mb-2">Important Limitations</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• We do not process or guarantee hotel bookings</li>
                  <li>• We do not provide official immigration or visa advice</li>
                  <li>• We do not verify real-time hotel availability or pricing</li>
                  <li>• We do not independently verify every traveller report</li>
                  <li>• We cannot account for temporary changes (terminal closures, construction, policy changes)</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 id="confidence-levels">Data Confidence Levels</h2>
          <p>Not all data in our system is verified to the same degree. Where confidence is lower:</p>
          <ul>
            <li>We note uncertainty directly in the listing description</li>
            <li>We recommend travellers call the hotel or airport directly to confirm</li>
            <li>We display a "verify before travel" notice on entries with known policy complexity</li>
          </ul>

          <h2 id="corrections">Submitting Corrections</h2>
          <p>
            If you find information that is incorrect, outdated, or incomplete, we want to know. Our dataset improves with every verified correction. Please contact us with:
          </p>
          <ul>
            <li>The specific airport and hotel name</li>
            <li>What information is incorrect</li>
            <li>Your source (airline confirmation, airport website, personal experience)</li>
          </ul>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mt-2 not-prose">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-action" />
              <p className="font-semibold text-gray-900">Submit a correction or update</p>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Reach out to Matthew Lin directly via LinkedIn with any data corrections.
            </p>
            <a
              href="https://www.linkedin.com/in/matthew-lin-profilepage/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-action hover:bg-action-hover !text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors hover:no-underline"
            >
              Contact via LinkedIn
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <h2 id="related">Related Pages</h2>
          <div className="flex flex-wrap gap-3 not-prose">
            <Link
              to="/data-sources"
              className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Data Sources <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-action/20 text-action font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
