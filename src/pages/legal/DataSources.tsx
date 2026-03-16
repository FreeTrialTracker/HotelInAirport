import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const SOURCE_CATEGORIES = [
  {
    title: 'Airport Operator Websites',
    color: 'border-action',
    bg: 'bg-orange-50',
    description: 'Official airport authority and operator websites are our primary source for terminal maps, hotel locations, transit zone access rules, and facility information.',
    sources: [
      { name: 'Singapore Changi Airport', desc: 'changiairport.com — transit hotel listings and terminal guides' },
      { name: 'Dubai Airports', desc: 'dubaiairports.ae — airside hotel and lounge directory' },
      { name: 'Doha Hamad International Airport', desc: 'dohahamadairport.com — transit hotel and facility guides' },
      { name: 'Amsterdam Schiphol', desc: 'schiphol.nl — terminal maps and hotel connections' },
      { name: 'Frankfurt Airport (Fraport)', desc: 'frankfurt-airport.com — hotel access and terminal connections' },
      { name: 'London Heathrow', desc: 'heathrow.com — hotel directory and terminal access' },
      { name: 'Istanbul Airport', desc: 'igairport.com.tr — transit zone facilities' },
    ],
  },
  {
    title: 'Hotel Brand & Operator Websites',
    color: 'border-info',
    bg: 'bg-blue-50',
    description: 'Individual hotel websites provide the most accurate information on room types, rates, access requirements, booking policies, and amenities.',
    sources: [
      { name: 'Aerotel Hotels', desc: 'aerotelhotels.com — airside transit hotel network' },
      { name: 'YOTEL', desc: 'yotel.com — airport cabin and pod network' },
      { name: 'Minute Suites', desc: 'minutesuites.com — US airport private rest suites' },
      { name: 'GoSleep', desc: 'gosleep.aero — pod sleeping units in European airports' },
      { name: 'Nine Hours', desc: 'ninehours.jp — Japanese capsule hotel chain' },
      { name: 'Hilton Hotels', desc: 'hilton.com — Frankfurt, Munich, and other airport properties' },
      { name: 'Sheraton Hotels', desc: 'marriott.com/sheraton — Amsterdam, Toronto, and other airport properties' },
      { name: 'Fairmont Hotels', desc: 'fairmont.com — Vancouver and other airport properties' },
    ],
  },
  {
    title: 'Immigration & Government Sources',
    color: 'border-neutral',
    bg: 'bg-gray-50',
    description: 'For transit visa and immigration access rules, we reference official government immigration authority documentation.',
    sources: [
      { name: 'IATA Travel Centre', desc: 'iata.org — passport, visa, and transit requirements by route' },
      { name: 'UK Home Office', desc: 'gov.uk — UK transit visa requirements and exemptions' },
      { name: 'Schengen Area Documentation', desc: 'ec.europa.eu — Schengen transit rules and national visa lists' },
      { name: 'US Department of State', desc: 'travel.state.gov — US visa and transit requirements' },
      { name: 'National immigration authority websites', desc: 'Country-specific portals for visa-on-arrival and transit visa rules' },
    ],
  },
  {
    title: 'Airline Documentation',
    color: 'border-action',
    bg: 'bg-orange-50',
    description: 'Airlines provide documentation on layover access rules, transit hotel programmes, and passenger handling procedures for connecting flights.',
    sources: [
      { name: 'Emirates', desc: 'emirates.com — layover hotel programme and transit rules at DXB' },
      { name: 'Singapore Airlines', desc: 'singaporeair.com — Changi transit access and hotel partnerships' },
      { name: 'Turkish Airlines', desc: 'turkishairlines.com — Istanbul transit hotel partnership and rules' },
      { name: 'Qatar Airways', desc: 'qatarairways.com — Doha layover hotel programme' },
      { name: 'Airline alliance documentation', desc: 'Star Alliance, oneworld, SkyTeam interline and transit policies' },
    ],
  },
  {
    title: 'Travel Community Sources',
    color: 'border-info',
    bg: 'bg-blue-50',
    description: 'Traveller-generated content provides real-world verification of official data, including first-hand reports on access conditions, practical walking times, and facility quality.',
    sources: [
      { name: 'TripAdvisor Airport Hotel Reviews', desc: 'First-hand guest reviews covering actual access experience' },
      { name: 'FlyerTalk Forums', desc: 'flyertalk.com — aviation community reports on transit hotels and access rules' },
      { name: 'The Airport Guide', desc: 'airportguide.com — airport facility reference data' },
      { name: 'Sleeping in Airports', desc: 'sleepinginairports.net — traveller-submitted airport sleeping guides' },
      { name: 'Google Reviews', desc: 'Location-verified guest reviews for airport properties' },
    ],
  },
];

export default function DataSources() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Data Sources - HotelInAirport.com"
        description="The sources used by HotelInAirport.com to research airport hotel data, transit access rules, immigration requirements, and layover accommodation information."
        keywords="data sources, airport hotel data, research sources, HotelInAirport sources"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Data Sources', url: '/data-sources' },
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
            <h1 className="text-4xl font-bold mb-4">Data Sources</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Where we get our airport hotel, transit access, and immigration data — and how we verify it.
            </p>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 blog-content">

          <p>
            Accuracy is the most important thing we can offer. A traveller who relies on wrong information about whether a hotel is airside or landside could miss a flight, be denied entry, or face an unexpected visa problem. We take our sourcing seriously because of this.
          </p>
          <p>
            Below is an overview of the primary source categories we use. For our full research process, see our <Link to="/methodology">Methodology page</Link>.
          </p>

          {SOURCE_CATEGORIES.map(cat => (
            <section key={cat.title} className="not-prose my-10">
              <div className={`border-l-4 ${cat.color} ${cat.bg} rounded-r-xl p-6 mb-5`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h2>
                <p className="text-gray-700 leading-relaxed">{cat.description}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {cat.sources.map((source, i) => (
                  <div
                    key={source.name}
                    className={`px-6 py-4 flex items-start gap-3 ${i < cat.sources.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-action mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{source.name}</span>
                      <span className="text-gray-500 text-sm"> — {source.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <h2 id="limitations">Data Limitations</h2>
          <p>
            Despite our best efforts, data limitations exist:
          </p>
          <ul>
            <li><strong>Rules change without notice</strong> — airport operators and governments may update transit rules with little public announcement</li>
            <li><strong>Language barriers</strong> — some airport documentation is only available in local languages and may be mistranslated</li>
            <li><strong>Temporary changes</strong> — construction, terminal closures, or special events may temporarily affect hotel access</li>
            <li><strong>Self-transfer complexity</strong> — access rules for passengers with separate tickets (self-transfers) can differ significantly from through-ticketed passengers</li>
          </ul>
          <p>
            We recommend treating our data as a <strong>starting point for research</strong>, not a final authority. Always confirm critical details (especially visa and transit access) with official sources before travelling.
          </p>

          <h2 id="updates">How We Keep Data Current</h2>
          <p>
            We maintain our database through a combination of:
          </p>
          <ul>
            <li>Periodic manual reviews of high-traffic airports (every 6 months)</li>
            <li>Monitoring airport and hotel news feeds</li>
            <li>Processing reader-submitted corrections</li>
            <li>Reviewing traveller reports from community forums</li>
          </ul>

          <h2 id="corrections">Report an Error</h2>
          <p>
            If you have found information that is incorrect or outdated, please let us know. We prioritise data corrections and typically update entries within a few days of receiving a verified report.
          </p>

          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6">
            <p className="font-semibold text-gray-900 mb-1">Contact Matthew Lin</p>
            <p className="text-gray-600 text-sm mb-4">Submit corrections, new airport data, or source suggestions via LinkedIn.</p>
            <a
              href="https://www.linkedin.com/in/matthew-lin-profilepage/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-action hover:bg-action-hover !text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors hover:no-underline"
            >
              Connect on LinkedIn
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <h2 id="related">Related</h2>
          <div className="not-prose flex flex-wrap gap-3">
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-action/20 text-action font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Our Methodology <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
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
