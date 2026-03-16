export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-action transition-colors">Home</a></li>
              <li><a href="/airports" className="text-gray-300 hover:text-action transition-colors">Airports</a></li>
              <li><a href="/hotels" className="text-gray-300 hover:text-action transition-colors">Hotels</a></li>
              <li><a href="/resources" className="text-gray-300 hover:text-action transition-colors">Resources</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-action transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/resources/airside-transit-hotels" className="text-gray-300 hover:text-action transition-colors">Airside Transit Hotels</a></li>
              <li><a href="/resources/terminal-connected-hotels" className="text-gray-300 hover:text-action transition-colors">Terminal-Connected Hotels</a></li>
              <li><a href="/resources/sleep-pods-lounges" className="text-gray-300 hover:text-action transition-colors">Sleep Pods &amp; Lounges</a></li>
              <li><a href="/resources/immigration-requirements" className="text-gray-300 hover:text-action transition-colors">Immigration Requirements</a></li>
              <li><a href="/resources/access-types" className="text-gray-300 hover:text-action transition-colors">Terminal &amp; Access Types</a></li>
              <li><a href="/resources/layover-duration" className="text-gray-300 hover:text-action transition-colors">Layover Duration Planning</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Travel Resources</h3>
            <ul className="space-y-2">
              <li><a href="/airport-travel-resources" className="text-gray-300 hover:text-action transition-colors">Airport Travel Planning</a></li>
              <li><a href="https://visainfoguide.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-action transition-colors">Visa Requirements</a></li>
              <li><a href="https://immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-action transition-colors">Immigration Guides</a></li>
              <li><a href="/resources/immigration-requirements" className="text-gray-300 hover:text-action transition-colors">Transit Visa Rules</a></li>
              <li><a href="/resources/layover-duration" className="text-gray-300 hover:text-action transition-colors">Layover Duration</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-action transition-colors">About Us</a></li>
              <li><a href="/methodology" className="text-gray-300 hover:text-action transition-colors">Methodology</a></li>
              <li><a href="/data-sources" className="text-gray-300 hover:text-action transition-colors">Data Sources</a></li>
              <li>
                <a
                  href="https://www.linkedin.com/in/matthew-lin-profilepage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-action transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-action transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="text-gray-300 hover:text-action transition-colors">Terms of Use</a></li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed mt-6">
              HotelInAirport helps travellers find rest options at airports worldwide — airside, terminal-connected, and sleep pods.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} HotelInAirport.com
          </p>
          <p className="text-center sm:text-right text-xs text-gray-500 max-w-md">
            Airport hotel access and transit rules may vary. Always verify with airlines or immigration authorities before travel.
          </p>
        </div>
      </div>
    </footer>
  );
}
