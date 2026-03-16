import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Flag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { REGIONS as regionDefs } from '../constants';
import { slugifyRegion } from '../lib/country-utils';

interface RegionStats {
  airportCount: number;
  countryCount: number;
}

function Regions() {
  const [regionStats, setRegionStats] = useState<Record<string, RegionStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('airports')
        .select('region, country')
        .not('region', 'is', null);

      if (!error && data) {
        const stats: Record<string, RegionStats> = {};
        const countrySets: Record<string, Set<string>> = {};

        data.forEach(row => {
          if (!row.region) return;
          if (!stats[row.region]) {
            stats[row.region] = { airportCount: 0, countryCount: 0 };
            countrySets[row.region] = new Set();
          }
          stats[row.region].airportCount += 1;
          if (row.country) countrySets[row.region].add(row.country);
        });

        Object.keys(stats).forEach(region => {
          stats[region].countryCount = countrySets[region].size;
        });

        setRegionStats(stats);
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Airport Hotels by Region - Browse Global Regions"
        description="Browse airports worldwide and discover transit hotels, airside sleep options, and terminal-connected airport stays by region. Explore Asia Pacific, Europe, Middle East, and more."
        keywords="airport hotels by region, transit hotels by region, airside hotels, layover hotels Asia Pacific, layover hotels Europe, layover hotels Middle East"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Regions', url: '/regions' },
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-white py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Airport Hotels by Region
              </h1>
              <p className="text-lg text-gray-600 max-w-[900px] mx-auto leading-relaxed">
                Browse airports around the world and discover transit hotels, airside sleep options, and terminal-connected airport stays by region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {regionDefs.map((region, index) => {
                const stats = regionStats[region.name];
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {region.name}
                    </h3>
                    {!loading && stats && (
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {stats.airportCount} airport{stats.airportCount !== 1 ? 's' : ''}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Flag className="w-3.5 h-3.5" />
                          {stats.countryCount} countr{stats.countryCount !== 1 ? 'ies' : 'y'}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {region.description}
                    </p>
                    <Link
                      to={`/region/${slugifyRegion(region.name)}`}
                      className="w-full bg-[#FF7A1A] hover:bg-[#E66A0A] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                    >
                      View Airports <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="max-w-[900px] mx-auto pt-8 border-t border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Airport Hotels Around the World
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  Many large international airports offer transit hotels, capsule rooms, and terminal-connected airport stays designed for travelers with overnight connections or long layovers.
                </p>
                <p>
                  HotelInAirport helps travelers explore these airport sleep options by region so they can quickly find convenient places to rest between flights. You can also{' '}
                  <Link to="/countries" className="text-action hover:underline font-medium">browse by country</Link>{' '}
                  or search the full{' '}
                  <Link to="/airports" className="text-action hover:underline font-medium">airport directory</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/airports" className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  Browse All Airports
                </Link>
                <Link to="/hotels" className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  View All Hotels
                </Link>
                <Link to="/resources" className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  Layover Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Regions;
