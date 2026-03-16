import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { slugifyCountry } from '../lib/country-utils';

function Countries() {
  const [countries, setCountries] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      const { data, error } = await supabase
        .from('airports')
        .select('country')
        .not('country', 'is', null);

      if (error) {
        console.error('Error fetching countries:', error);
      } else {
        const countryMap = new Map<string, number>();
        data?.forEach((item) => {
          if (item.country) {
            countryMap.set(item.country, (countryMap.get(item.country) || 0) + 1);
          }
        });

        const countryList = Array.from(countryMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
      }
      setLoading(false);
    }

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Airport Hotels by Country - Browse by Destination"
        description="Find airports with transit hotels, airside sleep pods, and terminal-connected airport hotels by country. Browse layover accommodation options worldwide."
        keywords="airport hotels by country, transit hotels, airside hotels, layover hotels worldwide, airport accommodation directory"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Countries', url: '/countries' },
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-white py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Airport Hotels by Country
              </h1>
              <p className="text-lg text-gray-600 max-w-[900px] mx-auto leading-relaxed">
                Find airports with transit hotels, airside sleep pods, and terminal-connected airport hotels by country.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">Loading countries...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {countries.map((country, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {country.count} airport{country.count !== 1 ? 's' : ''}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      Browse airport hotels, transit stays, and layover accommodation options across this country.
                    </p>
                    <Link
                      to={`/country/${slugifyCountry(country.name)}`}
                      className="w-full bg-[#FF7A1A] hover:bg-[#E66A0A] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                    >
                      View Airports <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="max-w-[900px] mx-auto pt-8 border-t border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Find Airport Hotels by Country
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  Some airports offer hotels inside the terminal, while others provide nearby airport hotels with shuttle service or transit hotels located inside the secure zone.
                </p>
                <p>
                  This directory allows travelers to explore airport accommodation options by country before planning their next flight connection. You can also{' '}
                  <Link to="/regions" className="text-action hover:underline font-medium">browse by region</Link>{' '}
                  or use the full{' '}
                  <Link to="/airports" className="text-action hover:underline font-medium">airport search</Link>{' '}
                  to filter by name, city, or code. Not sure what hotel type to book?{' '}
                  <Link to="/resources" className="text-action hover:underline font-medium">Read our layover guides</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/airports" className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  Browse All Airports
                </Link>
                <Link to="/regions" className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  Browse by Region
                </Link>
                <Link to="/hotels" className="inline-flex items-center gap-2 border border-gray-300 hover:border-action text-gray-700 hover:text-action font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                  View All Hotels
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

export default Countries;
