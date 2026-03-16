import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Privacy Policy - HotelInAirport.com"
        description="Privacy Policy for HotelInAirport.com. Learn how we collect, use, and protect your information."
        keywords="privacy policy, HotelInAirport privacy"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
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
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-gray-300 text-lg">Last updated: March 2026</p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 blog-content">
          <p>
            HotelInAirport.com ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect when you use <strong>hotelinairport.com</strong>, how we use it, and your rights regarding that information.
          </p>

          <h2 id="information-we-collect">Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>We do not require account registration to use the site. We collect information you voluntarily provide when:</p>
          <ul>
            <li>Contacting us via email or LinkedIn</li>
            <li>Submitting feedback or corrections about airport data</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>When you visit the site, we may automatically collect:</p>
          <ul>
            <li><strong>Usage data</strong> — pages visited, time spent, links clicked</li>
            <li><strong>Device information</strong> — browser type, operating system, screen resolution</li>
            <li><strong>Log data</strong> — IP address, referring URLs, access timestamps</li>
          </ul>
          <p>
            This data is collected through standard web server logs and analytics tools (such as Google Analytics) and is used in aggregate form to improve the site.
          </p>

          <h3>Cookies</h3>
          <p>We use essential cookies for site functionality and optional analytics cookies to understand how visitors use the site. You can disable cookies in your browser settings; some functionality may be affected.</p>

          <h2 id="how-we-use-information">How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and improve the HotelInAirport.com service</li>
            <li>Respond to your enquiries or feedback</li>
            <li>Monitor and analyse usage patterns to improve user experience</li>
            <li>Ensure the technical security and stability of the site</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties.</p>

          <h2 id="third-party-services">Third-Party Services</h2>
          <p>Our site may include links to third-party hotel booking platforms, airlines, and airport websites. We are not responsible for the privacy practices of those sites. We recommend reviewing their privacy policies before providing any personal information.</p>
          <p>We may use the following third-party tools:</p>
          <ul>
            <li><strong>Google Analytics</strong> — website traffic analytics</li>
            <li><strong>Supabase</strong> — database and backend infrastructure</li>
          </ul>

          <h2 id="data-retention">Data Retention</h2>
          <p>We retain usage data only as long as necessary to fulfil the purposes described in this policy or as required by applicable law. Contact information submitted via email is retained only for the duration of the relevant correspondence.</p>

          <h2 id="your-rights">Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict certain uses of your data</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href="https://www.linkedin.com/in/matthew-lin-profilepage/" target="_blank" rel="noopener noreferrer">
              LinkedIn — Matthew Lin
            </a>.
          </p>

          <h2 id="childrens-privacy">Children's Privacy</h2>
          <p>Our site is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>

          <h2 id="changes">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the updated policy.</p>

          <h2 id="contact">Contact</h2>
          <p>
            For privacy-related questions, please contact:{' '}
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
