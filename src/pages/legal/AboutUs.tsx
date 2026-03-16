import { ArrowLeft, Globe, Shield, Building2, Bed, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="About Us - HotelInAirport.com"
        description="Learn about HotelInAirport.com — the airport hotel directory built to help travellers find rest options inside and connected to airport terminals worldwide."
        keywords="about HotelInAirport, airport hotel directory, airport layover guide, Matthew Lin"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
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
            <h1 className="text-4xl font-bold mb-4">About HotelInAirport.com</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              The world's most focused directory for finding hotel and rest accommodation at, inside, and directly connected to airport terminals.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">Why We Built This</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-5">
              <p>
                Long layovers are stressful. Finding out whether you can actually sleep inside an airport — without getting on the wrong side of immigration — is surprisingly hard. Most travel sites list airport hotels without explaining whether you need a visa to access them, whether they're actually inside security, or how far they really are from your gate.
              </p>
              <p>
                HotelInAirport.com was built to fix that. It started as a personal project to answer one question: <strong>"Can I sleep at this airport without leaving the transit zone?"</strong> That question turned into a database, and that database turned into a full directory covering over 100 airports worldwide.
              </p>
              <p>
                We focus specifically on three types of accommodation: <strong>airside transit hotels</strong> (accessible without clearing immigration), <strong>terminal-connected hotels</strong> (physically linked to the terminal), and <strong>sleep pods and lounges</strong> (compact hourly rest options). We don't list every airport hotel in the world — just the ones that matter most for layover travellers.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">What We Cover</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Airside Transit Hotels',
                  desc: 'Hotels located inside the secure international transit zone. No visa or immigration clearance required.',
                  link: '/resources/airside-transit-hotels',
                },
                {
                  icon: <Building2 className="w-8 h-8" />,
                  title: 'Terminal-Connected Hotels',
                  desc: 'Hotels with direct walkway, skybridge, or underground access to the terminal.',
                  link: '/resources/terminal-connected-hotels',
                },
                {
                  icon: <Bed className="w-8 h-8" />,
                  title: 'Sleep Pods & Lounges',
                  desc: 'Compact hourly rest facilities from capsule hotels to premium airport lounges.',
                  link: '/resources/sleep-pods-lounges',
                },
              ].map(item => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-action/30 transition-all group"
                >
                  <div className="text-action mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-action transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">Our Reach</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { stat: '100+', label: 'Airports Covered' },
                { stat: '169+', label: 'Airport Hotels' },
                { stat: '50+', label: 'Countries' },
                { stat: '6', label: 'Global Regions' },
              ].map(item => (
                <div key={item.label} className="bg-orange-50 border border-action/20 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-action mb-1">{item.stat}</p>
                  <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              We cover all major international hub airports across Asia-Pacific, Europe, the Middle East, North America, South America, and Africa — with ongoing expansion to smaller regional airports.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">Who We Are</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-action/10 flex items-center justify-center text-action flex-shrink-0">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Matthew Lin</h3>
                  <p className="text-action font-medium text-sm mb-4">Founder &amp; Editor</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    HotelInAirport.com is built and maintained by Matthew Lin — a frequent international traveller with a background in technology and data. After one too many stressful transit experiences, Matthew began documenting which airports actually have usable rest facilities and under what conditions you can access them.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    The project grew from a personal spreadsheet into a fully searchable directory, with each entry researched and verified against airport operator documentation, hotel websites, and first-hand traveller reports.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/matthew-lin-profilepage/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-action hover:bg-action-hover !text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm hover:no-underline"
                  >
                    Connect on LinkedIn
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">Our Commitment</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-5">
              <p>
                We are committed to providing <strong>neutral, non-commercial information</strong>. We do not accept payment to feature, rank, or promote specific hotels. Our listings and editorial content reflect research quality, not advertising spend.
              </p>
              <p>
                We acknowledge that airport rules, hotel access conditions, visa requirements, and immigration policies change frequently. We do our best to keep data current, but <strong>always recommend verifying details directly with your airline, the airport, or the relevant immigration authority before travelling</strong>.
              </p>
              <p>
                If you find incorrect or outdated information, please reach out. Corrections are handled promptly.
              </p>
            </div>
          </section>

          <section>
            <div className="bg-brand rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Have a question or correction?</h2>
              <p className="text-gray-300 mb-6">
                We welcome feedback on airport data, hotel listings, and transit rules. Reach out directly via LinkedIn.
              </p>
              <a
                href="https://www.linkedin.com/in/matthew-lin-profilepage/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-action hover:bg-action-hover !text-white font-semibold px-7 py-3.5 rounded-lg transition-colors hover:no-underline"
              >
                Contact Matthew Lin
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
