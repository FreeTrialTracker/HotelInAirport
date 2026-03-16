import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Terms of Use - HotelInAirport.com"
        description="Terms of Use for HotelInAirport.com. Understand the conditions for using our airport hotel directory and information resources."
        keywords="terms of use, terms and conditions, HotelInAirport terms"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Use', url: '/terms-of-use' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="bg-brand text-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-3">Terms of Use</h1>
            <p className="text-gray-300 text-lg">Last updated: March 2026</p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 blog-content">
          <p>
            By accessing and using <strong>hotelinairport.com</strong> ("the Site"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the Site.
          </p>

          <h2 id="purpose">Purpose of the Site</h2>
          <p>
            HotelInAirport.com is an informational directory that helps travellers find, compare, and learn about hotel and rest accommodation options at airports worldwide. We provide general guidance on airside transit hotels, terminal-connected hotels, sleep pods, lounges, and related travel resources.
          </p>

          <h2 id="no-booking">No Booking Services</h2>
          <p>
            HotelInAirport.com is an <strong>informational resource only</strong>. We do not process hotel bookings, accept payments, or act as a booking agent. Any booking must be made directly with the hotel, airport operator, or a third-party booking platform.
          </p>
          <p>We are not responsible for any booking, cancellation, or payment disputes with third-party services.</p>

          <h2 id="accuracy">Accuracy of Information</h2>
          <p>
            We strive to provide accurate and up-to-date information about airport hotels, transit access, visa rules, and immigration requirements. However:
          </p>
          <ul>
            <li>Airport rules, hotel access conditions, and visa requirements change frequently</li>
            <li>Information may not reflect the most recent policy updates</li>
            <li>We cannot guarantee the accuracy, completeness, or timeliness of any data displayed on the Site</li>
          </ul>
          <p>
            <strong>Always verify current requirements directly with your airline, the airport authority, or the relevant immigration authority before travelling.</strong>
          </p>

          <h2 id="intellectual-property">Intellectual Property</h2>
          <p>
            All content on this Site — including text, design, graphics, data compilations, and code — is the property of HotelInAirport.com unless otherwise noted. You may not reproduce, redistribute, or republish content from this Site without prior written permission.
          </p>
          <p>You may share individual links to pages on this Site for personal, non-commercial purposes.</p>

          <h2 id="user-conduct">User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to scrape, crawl, or systematically extract data from the Site without permission</li>
            <li>Interfere with the Site's operation or security</li>
            <li>Submit false, misleading, or harmful information through any contact channel</li>
          </ul>

          <h2 id="third-party-links">Third-Party Links</h2>
          <p>
            The Site contains links to external websites including hotel booking platforms, airlines, and government immigration portals. These links are provided for convenience only. We have no control over external sites and accept no responsibility for their content, accuracy, or privacy practices.
          </p>

          <h2 id="disclaimers">Disclaimers</h2>
          <p>
            The Site is provided on an <strong>"as is" and "as available"</strong> basis without warranties of any kind. We disclaim all warranties, express or implied, including fitness for a particular purpose, accuracy, and non-infringement.
          </p>
          <p>
            We are not liable for any loss or damage arising from reliance on information provided on this Site, including missed flights, denied entry, or failed bookings.
          </p>

          <h2 id="changes">Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page with a revised date. Your continued use of the Site constitutes acceptance of any changes.
          </p>

          <h2 id="governing-law">Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable law. Any disputes shall be resolved through good-faith discussion before any formal proceedings.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            For questions about these Terms, please contact:{' '}
            <a href="https://www.linkedin.com/in/matthew-lin-profilepage/" target="_blank" rel="noopener noreferrer">
              Matthew Lin via LinkedIn
            </a>
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
