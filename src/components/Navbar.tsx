import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-brand focus:rounded focus:font-semibold focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <nav className="sticky top-0 z-50 bg-brand text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/hotelinairport.png"
              alt="HotelInAirport Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">Hotel<span className="text-action">InAirport</span>.com</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/airports"
              className="text-gray-200 hover:text-action transition-colors"
            >
              Airports
            </Link>
            <Link
              to="/hotels"
              className="text-gray-200 hover:text-action transition-colors"
            >
              Hotels
            </Link>
            <Link
              to="/resources"
              className="text-gray-200 hover:text-action transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/blog"
              className="text-gray-200 hover:text-action transition-colors"
            >
              Blog
            </Link>
          </div>

          <button
            className="text-gray-200 hover:text-action transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
    </>
  );
}
