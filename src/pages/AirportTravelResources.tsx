import { Link } from 'react-router-dom';
import { Shield, Building2, Bed, Globe, FileText, Clock, ArrowRight, ExternalLink, CheckCircle, MapPin, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const SITE_URL = 'https://www.hotelinairport.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Airport Travel Planning Resources',
  url: `${SITE_URL}/airport-travel-resources`,
  description: 'Airport travel planning resources including airport hotels, visa rules, and immigration visa guides.',
  about: ['Airport hotels', 'Transit hotels', 'Travel visas', 'Immigration visas'],
  sameAs: ['https://visainfoguide.com', 'https://immigrationinfoguide.com'],
};

const popularGuides = [
  {
    title: 'Airside Transit Hotels',
    description: 'Hotels inside the secure transit zone — no immigration needed.',
    href: '/resources/airside-transit-hotels',
    icon: Shield,
    color: 'text-action',
    bg: 'bg-orange-50',
  },
  {
    title: 'Terminal-Connected Hotels',
    description: 'Hotels linked directly to the airport terminal by walkway or skybridge.',
    href: '/resources/terminal-connected-hotels',
    icon: Building2,
    color: 'text-info',
    bg: 'bg-blue-50',
  },
  {
    title: 'Airport Sleep Pods and Lounges',
    description: 'Capsule rooms and rest spaces inside airport terminals.',
    href: '/resources/sleep-pods-lounges',
    icon: Bed,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Layover Duration Planning',
    description: 'How layover length affects your rest and accommodation options.',
    href: '/resources/layover-duration',
    icon: Clock,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    title: 'Immigration Access Requirements',
    description: 'Which hotels require immigration clearance and which do not.',
    href: '/resources/immigration-requirements',
    icon: Globe,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    title: 'Terminal and Access Types',
    description: 'Understand airside, landside, and shuttle-access distinctions.',
    href: '/resources/access-types',
    icon: MapPin,
    color: 'text-neutral',
    bg: 'bg-gray-50',
  },
];

const planningTips = [
  {
    heading: 'Planning an overnight layover',
    body: (
      <>
        For layovers exceeding six hours overnight, an{' '}
        <Link to="/resources/airside-transit-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
          airside transit hotel
        </Link>{' '}
        or{' '}
        <Link to="/resources/terminal-connected-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
          terminal-connected hotel
        </Link>{' '}
        typically offers the best combination of convenience and rest without requiring immigration clearance.
      </>
    ),
  },
  {
    heading: 'When airport hotels are most useful',
    body: (
      <>
        Airport hotels make the most sense for early morning departures, long connections between 5 and 24 hours, and missed or delayed flights.{' '}
        <Link to="/resources/layover-duration" className="text-info hover:text-info-hover hover:underline font-medium">
          Layover duration
        </Link>{' '}
        is the primary factor in deciding between airside rest options and a full hotel stay.
      </>
    ),
  },
  {
    heading: 'When a transit visa may be required',
    body: (
      <>
        Some countries require travelers to obtain an airport transit visa even when remaining inside the international transit zone. This applies to certain passport holders transiting through Schengen airports, the United Kingdom, and other destinations. Always{' '}
        <a
          href="https://visainfoguide.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info hover:text-info-hover hover:underline font-medium"
        >
          check airport transit visa requirements
        </a>{' '}
        before booking any transit accommodation.
      </>
    ),
  },
  {
    heading: 'When travelers must clear immigration',
    body: (
      <>
        Terminal-connected and nearby airport hotels require travelers to pass through immigration and officially enter the country. If your passport requires a visa on arrival or a full entry visa, you must arrange this before booking a landside hotel. Review{' '}
        <Link to="/resources/immigration-requirements" className="text-info hover:text-info-hover hover:underline font-medium">
          immigration access requirements
        </Link>{' '}
        for more detail.
      </>
    ),
  },
  {
    heading: 'Short connections and sleep pods',
    body: (
      <>
        For layovers under five hours, a full hotel room may not be practical. Many airports offer{' '}
        <Link to="/resources/sleep-pods-lounges" className="text-info hover:text-info-hover hover:underline font-medium">
          sleep pods and lounge rest areas
        </Link>{' '}
        that can be booked by the hour inside the terminal, allowing travelers to rest without committing to a full overnight stay.
      </>
    ),
  },
];

export default function AirportTravelResources() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SEO
        title="Airport Travel Resources – Visa Rules, Airport Hotels, Immigration Guides"
        description="Plan your airport layover with transit hotel guides, visa requirement tools, and immigration visa resources for international travel."
        keywords="airport travel resources, transit visa rules, airport hotels, layover accommodation, immigration visa guides, airport transit visa requirements"
        canonical={`${SITE_URL}/airport-travel-resources`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main id="main-content" className="flex-1">
        <section
          className="text-white py-16 px-6"
          style={{ background: 'linear-gradient(180deg, #0B2A44 0%, #082136 100%)' }}
        >
          <div className="max-w-[1200px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li className="text-gray-600">/</li>
                <li className="text-gray-300">Airport Travel Resources</li>
              </ol>
            </nav>

            <div className="max-w-[800px]">
              <div className="text-xs font-bold text-action uppercase tracking-wider mb-4">
                Travel Planning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                Airport Travel Planning Resources
              </h1>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#CBD5E1' }}>
                International travel planning involves several interconnected steps. Before your flight you need to verify visa and transit visa requirements for every country you pass through, arrange airport layover accommodation that matches your passport and immigration status, and consider long-term options if your plans involve relocation or extended stays abroad. This page brings those resources together in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                  Section 1
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-5">
                  Airport Transit Hotels and Layover Accommodation
                </h2>
                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                  <p>
                    Airport transit hotels fall into two broad categories. Some properties are positioned inside the secure international transit zone — known as airside — meaning travelers can check in and rest without clearing immigration or entering the country. These{' '}
                    <Link to="/resources/airside-transit-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
                      hotels inside airports
                    </Link>{' '}
                    are ideal for passengers who hold passports that require a visa to enter the layover country, or who simply prefer not to go through immigration for a short connection.
                  </p>
                  <p>
                    The second category covers{' '}
                    <Link to="/resources/terminal-connected-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
                      airport terminal hotels
                    </Link>{' '}
                    located landside, directly connected to the terminal building by a covered walkway, skybridge, or internal corridor. These properties require travelers to pass through immigration but offer a fast return route to departures the following morning.
                  </p>
                  <p>
                    For shorter layovers or budget-conscious travelers,{' '}
                    <Link to="/resources/sleep-pods-lounges" className="text-info hover:text-info-hover hover:underline font-medium">
                      airport sleep pods and lounges
                    </Link>{' '}
                    provide hourly rest options without leaving the terminal. Many major international hubs now offer capsule-style pods or premium lounge rest areas as an alternative to{' '}
                    <Link to="/resources/airside-transit-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
                      layover hotels
                    </Link>.
                  </p>
                  <p>
                    Browse the{' '}
                    <Link to="/hotels" className="text-info hover:text-info-hover hover:underline font-medium">
                      best airport hotels by airport
                    </Link>{' '}
                    to compare options at specific international hubs worldwide.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Shield,
                    label: 'Airside Transit Hotels',
                    sub: 'No immigration required',
                    href: '/resources/airside-transit-hotels',
                    accent: 'border-action/30 hover:border-action/60',
                    iconBg: 'bg-orange-50',
                    iconColor: 'text-action',
                  },
                  {
                    icon: Building2,
                    label: 'Terminal-Connected Hotels',
                    sub: 'Landside, direct access',
                    href: '/resources/terminal-connected-hotels',
                    accent: 'border-info/30 hover:border-info/60',
                    iconBg: 'bg-blue-50',
                    iconColor: 'text-info',
                  },
                  {
                    icon: Bed,
                    label: 'Sleep Pods and Lounges',
                    sub: 'Hourly rest options',
                    href: '/resources/sleep-pods-lounges',
                    accent: 'border-amber-300/40 hover:border-amber-400/60',
                    iconBg: 'bg-amber-50',
                    iconColor: 'text-amber-600',
                  },
                  {
                    icon: MapPin,
                    label: 'All Airport Hotels',
                    sub: 'Browse by location',
                    href: '/hotels',
                    accent: 'border-gray-200 hover:border-neutral/40',
                    iconBg: 'bg-gray-50',
                    iconColor: 'text-neutral',
                  },
                ].map(({ icon: Icon, label, sub, href, accent, iconBg, iconColor }) => (
                  <Link
                    key={label}
                    to={href}
                    className={`bg-white border-2 ${accent} rounded-xl p-5 flex flex-col gap-3 transition-all hover:shadow-md group`}
                  >
                    <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#111827] text-sm leading-snug">{label}</div>
                      <div className="text-xs text-[#9CA3AF] mt-0.5">{sub}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-action transition-colors mt-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="order-2 lg:order-1">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-info" />
                    </div>
                    <h3 className="font-bold text-[#111827] text-lg">What determines your transit visa requirement?</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: 'Nationality', detail: 'Your passport country is the primary factor in whether a transit visa is required.' },
                      { label: 'Airport location', detail: 'Rules differ by country — Schengen and UK airports impose ATV or DATV requirements for many nationalities.' },
                      { label: 'Layover duration', detail: 'Some countries allow short transits without a visa but require one for longer connections.' },
                      { label: 'Leaving the transit zone', detail: 'Entering the country landside typically triggers full visa requirements regardless of layover length.' },
                    ].map(({ label, detail }) => (
                      <li key={label} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-action flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#111827] text-sm">{label}: </span>
                          <span className="text-[#4B5563] text-sm leading-relaxed">{detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                    <a
                      href="https://visainfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      Check visa requirements by passport
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                  Section 2
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-5">
                  Check Visa Requirements Before Your Airport Transit
                </h2>
                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                  <p>
                    One of the most common and costly travel mistakes is assuming that transiting through an airport does not require a visa. Many countries mandate that certain passport holders obtain an airport transit visa even when they remain entirely within the international airside zone and never formally enter the country.
                  </p>
                  <p>
                    Before booking any{' '}
                    <Link to="/resources/airside-transit-hotels" className="text-info hover:text-info-hover hover:underline font-medium">
                      airport transit hotel
                    </Link>{' '}
                    or connecting flight, verify your{' '}
                    <a
                      href="https://visainfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      transit visa rules
                    </a>{' '}
                    for every country your itinerary passes through. Transit visa rules vary significantly by passport nationality, airport, and layover duration.
                  </p>
                  <p>
                    For comprehensive{' '}
                    <a
                      href="https://visainfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      visa requirements by passport
                    </a>{' '}
                    covering transit visas, entry visas, visa-free access, and e-Visa options, visit VisaInfoGuide.com — a dedicated resource for checking{' '}
                    <a
                      href="https://visainfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      airport transit visa requirements
                    </a>{' '}
                    country by country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                  Section 3
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-5">
                  Immigration and Long-Stay Travel Planning
                </h2>
                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                  <p>
                    Not every international traveler is passing through for a connection. For those considering relocation, remote work abroad, retirement in another country, or family reunification, understanding the immigration pathway in the destination country is a critical first step.
                  </p>
                  <p>
                    <a
                      href="https://immigrationinfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      Immigration visa guides
                    </a>{' '}
                    cover the full spectrum of extended stay options — from temporary work authorizations and student visas to permanent residency pathways and citizenship applications. These resources are designed to complement the short-stay information available on this site.
                  </p>
                  <p>
                    If you are researching{' '}
                    <a
                      href="https://immigrationinfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      long stay visa options
                    </a>
                    ,{' '}
                    <a
                      href="https://immigrationinfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      residency permit guides
                    </a>
                    , or{' '}
                    <a
                      href="https://immigrationinfoguide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:text-info-hover hover:underline font-medium"
                    >
                      moving abroad resources
                    </a>
                    , ImmigrationInfoGuide.com provides plain-language explanations of immigration processes for dozens of countries.
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href="https://immigrationinfoguide.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Explore immigration visa guides
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] border border-sky-200 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <img
                      src="/IMMIGRATION_INFO_NEW_logo.png"
                      alt="ImmigrationInfoGuide.com"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#111827] text-sm">ImmigrationInfoGuide.com</div>
                    <div className="text-xs text-[#6B7280]">Long-stay and residency resources</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Work visa and employment authorization guides',
                    'Residency permit applications by country',
                    'Citizenship and naturalization pathways',
                    'Family reunification and spouse visas',
                    'Student and study visa requirements',
                    'Digital nomad and remote work visas',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[#374151] text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm w-full justify-center"
                >
                  Visit ImmigrationInfoGuide.com
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                Section 4
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                Continue Planning Your Trip
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto leading-relaxed">
                Use these resources to complete your travel planning — from finding the right layover hotel to verifying entry requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm flex flex-col">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6 text-action" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-3">Airport Hotels</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed flex-grow mb-6">
                  Discover hotels located inside airport terminals and near major international airports worldwide.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Browse Airport Hotels
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm flex flex-col">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6 text-info" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-3">Visa Rules and Entry Requirements</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed flex-grow mb-6">
                  Check visa rules, visa-free travel, transit visa requirements, and entry regulations before your flight.
                </p>
                <a
                  href="https://visainfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-info hover:bg-info-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Check Visa Requirements
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-7 shadow-sm flex flex-col">
                <div className="w-12 h-12 bg-[#F0F9FF] rounded-lg flex items-center justify-center mb-5">
                  <Globe className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-3">Immigration and Residency</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed flex-grow mb-6">
                  Learn about long-term visas, residency permits, and immigration options for extended stays abroad.
                </p>
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Explore Immigration Guides
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold text-action uppercase tracking-wider mb-3">
                Section 5
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                Airport Travel Planning Tips
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto leading-relaxed">
                Practical advice for making the most of your time at an airport, whether you have three hours or three days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
              {planningTips.map(({ heading, body }) => (
                <div key={heading} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                  <h3 className="font-bold text-[#111827] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-action flex-shrink-0" />
                    {heading}
                  </h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                Popular Airport Guides
              </h2>
              <p className="text-[#6B7280] max-w-lg mx-auto leading-relaxed">
                Explore detailed guides on airport accommodation types, access requirements, and rest options at international hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularGuides.map(({ title, description, href, icon: Icon, color, bg }) => (
                <Link
                  key={title}
                  to={href}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:shadow-md hover:border-action/30 transition-all group flex flex-col"
                >
                  <div className={`w-11 h-11 ${bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h3 className="font-bold text-[#111827] mb-2 group-hover:text-action transition-colors text-sm leading-snug">
                    {title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed flex-grow mb-4">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-action font-semibold text-xs group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
