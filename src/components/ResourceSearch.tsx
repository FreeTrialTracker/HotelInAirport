import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';

export interface ResourceEntry {
  id: string;
  airport: string;
  iata: string;
  hotelName: string;
  region: string;
  location: 'Airside' | 'Landside' | 'Both';
  description: string;
  rateInfo?: string;
  tags?: string[];
}

interface ResourceSearchProps {
  entries: ResourceEntry[];
  onFilter: (filtered: ResourceEntry[]) => void;
  placeholder?: string;
}

const REGIONS = ['All Regions', 'Asia-Pacific', 'Europe', 'Middle East', 'North America', 'South America', 'Africa'];
const LOCATIONS = ['All', 'Airside', 'Landside'];

export default function ResourceSearch({ entries, onFilter, placeholder = 'Search airports or hotels...' }: ResourceSearchProps) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [location, setLocation] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (query.length < 1) return [];
    const q = query.toLowerCase();
    const matches: string[] = [];
    entries.forEach(e => {
      const candidates = [e.airport, e.iata, e.hotelName];
      candidates.forEach(c => {
        if (c.toLowerCase().includes(q) && !matches.includes(c)) {
          matches.push(c);
        }
      });
    });
    return matches.slice(0, 6);
  }, [query, entries]);

  const filtered = useMemo(() => {
    return entries.filter(e => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        e.airport.toLowerCase().includes(q) ||
        e.iata.toLowerCase().includes(q) ||
        e.hotelName.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.tags || []).some(t => t.toLowerCase().includes(q));
      const matchesRegion = region === 'All Regions' || e.region === region;
      const matchesLocation = location === 'All' || e.location === location || e.location === 'Both';
      return matchesQuery && matchesRegion && matchesLocation;
    });
  }, [query, region, location, entries]);

  useEffect(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeFilterCount = (region !== 'All Regions' ? 1 : 0) + (location !== 'All' ? 1 : 0);

  function clearAll() {
    setQuery('');
    setRegion('All Regions');
    setLocation('All');
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-10 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1" ref={containerRef}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-action/30 focus:border-action transition-colors"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowSuggestions(false); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-action flex items-center gap-2 transition-colors"
                    onMouseDown={() => { setQuery(s); setShowSuggestions(false); }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="py-2.5 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-action/30 focus:border-action transition-colors bg-white cursor-pointer"
        >
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>

        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="py-2.5 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-action/30 focus:border-action transition-colors bg-white cursor-pointer"
        >
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>

        {(query || activeFilterCount > 0) && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of {entries.length} results
        </p>
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-1.5">
            {region !== 'All Regions' && (
              <span className="inline-flex items-center gap-1 bg-action/10 text-action text-xs font-medium px-2.5 py-1 rounded-full">
                {region}
                <button onClick={() => setRegion('All Regions')} className="hover:text-action-hover">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {location !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-action/10 text-action text-xs font-medium px-2.5 py-1 rounded-full">
                {location}
                <button onClick={() => setLocation('All')} className="hover:text-action-hover">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
