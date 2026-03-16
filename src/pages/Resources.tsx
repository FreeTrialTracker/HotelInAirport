import { Shield, Building2, Bed, Clock, MapPin, Globe, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface ResourceCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  description: string;
  link: string;
}

function Resources() {
  const resources: ResourceCard[] = [
    {
      id: 'airside-transit',
      title: 'Airside Transit Hotels',
      icon: <Shield className="w-8 h-8" />,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700',
      description: 'Hotels located within the secure international transit zone. Perfect for layovers without clearing immigration or needing a visa.',
      link: '/resources/airside-transit-hotels',
    },
    {
      id: 'terminal-connected',
      title: 'Terminal-Connected Hotels',
      icon: <Building2 className="w-8 h-8" />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      description: 'Hotels physically connected to airport terminals via walkways or bridges. Walk directly to your gate without going outside.',
      link: '/resources/terminal-connected-hotels',
    },
    {
      id: 'sleep-pods',
      title: 'Airport Sleep Pods & Lounges',
      icon: <Bed className="w-8 h-8" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700',
      description: 'Compact, affordable rest spaces for short layovers. From capsule hotels to premium lounges with sleep areas.',
      link: '/resources/sleep-pods-lounges',
    },
    {
      id: 'immigration',
      title: 'Immigration Access Requirements',
      icon: <Globe className="w-8 h-8" />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-info',
      description: 'Understanding visa requirements and immigration procedures for layover accommodations. Know before you book.',
      link: '/resources/immigration-requirements',
    },
    {
      id: 'access-types',
      title: 'Terminal & Access Types',
      icon: <MapPin className="w-8 h-8" />,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
      description: 'Different types of airport hotel locations and access methods. Choose based on your layover duration and needs.',
      link: '/resources/access-types',
    },
    {
      id: 'layover-duration',
      title: 'Layover Duration Planning',
      icon: <Clock className="w-8 h-8" />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
      description: 'Calculate realistic rest time based on your layover length. Account for transit, check-in, and security queues.',
      link: '/resources/layover-duration',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airport Hotel Resources & Layover Planning Guide"
        description="Complete guide to airport hotels, transit accommodations, sleep pods, immigration requirements, and layover planning. Expert advice for choosing the perfect rest option during your layover."
        keywords="airport hotels, airside transit hotels, terminal connected hotels, sleep pods, airport lounges, layover hotels, immigration requirements, transit visa, airport accommodation guide, layover planning, airport rest areas, capsule hotels airport"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="text-white py-16" style={{background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4 text-white">Airport Hotel & Layover Resources</h1>
            <p className="text-xl max-w-3xl" style={{color: '#CBD5E1'}}>
              Your comprehensive guide to airport accommodations, transit hotels, immigration requirements, and layover planning strategies
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Essential Layover Hotel Information</h2>
            <p className="text-gray-600 mb-8">
              Click on any topic below to learn more about airport accommodations and make informed decisions for your layover.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                to={resource.link}
                className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-all hover:border-action group"
              >
                <div className={`w-14 h-14 ${resource.iconBg} rounded-lg flex items-center justify-center ${resource.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-action transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <div className="text-info text-sm font-medium flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For First-Time Travelers</h3>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Start with <Link to="/resources/layover-duration" className="text-action hover:underline font-medium">Layover Duration Planning</Link> to understand your time constraints</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>Check <Link to="/resources/immigration-requirements" className="text-action hover:underline font-medium">Immigration Access Requirements</Link> to know if you need a visa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>Review <Link to="/resources/access-types" className="text-action hover:underline font-medium">Terminal &amp; Access Types</Link> to choose the right hotel location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">4.</span>
                    <span>Browse <Link to="/hotels" className="text-action hover:underline font-medium">specific hotel types</Link> that match your needs and budget</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Experienced Travelers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Discover new airport rest options like <Link to="/resources/sleep-pods-lounges" className="text-action hover:underline font-medium">sleep pods and lounges</Link></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Compare <Link to="/resources/airside-transit-hotels" className="text-action hover:underline font-medium">airside</Link> vs <Link to="/resources/terminal-connected-hotels" className="text-action hover:underline font-medium">landside</Link> options for your specific route</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Optimize layover time with <Link to="/resources/layover-duration" className="text-action hover:underline font-medium">detailed timeline breakdowns</Link></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Stay updated on <Link to="/resources/immigration-requirements" className="text-action hover:underline font-medium">immigration policies and transit rules</Link></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-8 text-white text-center" style={{background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)'}}>
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Layover Hotel?</h2>
            <p className="mb-6 max-w-2xl mx-auto" style={{color: '#CBD5E1'}}>
              Browse our comprehensive directory of airport hotels, transit accommodations, and sleep facilities at major airports worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/airports"
                className="inline-flex items-center px-6 py-3 bg-action text-white rounded-lg hover:bg-action-hover transition-colors font-semibold"
              >
                Browse by Airport
                <Plane className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/hotels"
                className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold border-2 border-white/30"
              >
                View All Hotels
                <Building2 className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Resources;
