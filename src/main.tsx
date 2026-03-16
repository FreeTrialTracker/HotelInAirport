import { StrictMode, lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { AuthProvider } from './lib/auth-context.tsx';
import './index.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

const App = lazy(() => import('./App.tsx'));
const Airports = lazy(() => import('./pages/Airports.tsx'));
const AirportDetail = lazy(() => import('./pages/AirportDetail.tsx'));
const AirportTopicPage = lazy(() => import('./pages/AirportTopicPage.tsx'));
const Hotels = lazy(() => import('./pages/Hotels.tsx'));
const Resources = lazy(() => import('./pages/Resources.tsx'));
const ImportData = lazy(() => import('./pages/ImportData.tsx'));
const AirsideTransitHotels = lazy(() => import('./pages/resources/AirsideTransitHotels.tsx'));
const TerminalConnectedHotels = lazy(() => import('./pages/resources/TerminalConnectedHotels.tsx'));
const SleepPodsLounges = lazy(() => import('./pages/resources/SleepPodsLounges.tsx'));
const ImmigrationRequirements = lazy(() => import('./pages/resources/ImmigrationRequirements.tsx'));
const AccessTypes = lazy(() => import('./pages/resources/AccessTypes.tsx'));
const LayoverDuration = lazy(() => import('./pages/resources/LayoverDuration.tsx'));
const Blog = lazy(() => import('./pages/Blog.tsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Regions = lazy(() => import('./pages/Regions.tsx'));
const Countries = lazy(() => import('./pages/Countries.tsx'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy.tsx'));
const TermsOfUse = lazy(() => import('./pages/legal/TermsOfUse.tsx'));
const AboutUs = lazy(() => import('./pages/legal/AboutUs.tsx'));
const Methodology = lazy(() => import('./pages/legal/Methodology.tsx'));
const DataSources = lazy(() => import('./pages/legal/DataSources.tsx'));
const AirportTravelResources = lazy(() => import('./pages/AirportTravelResources.tsx'));
const CountryDetail = lazy(() => import('./pages/CountryDetail.tsx'));
const RegionDetail = lazy(() => import('./pages/RegionDetail.tsx'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-action border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/airports" element={<Airports />} />
            <Route path="/airports/:slug" element={<AirportDetail />} />
            <Route path="/airports/:slug/:topic" element={<AirportTopicPage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/airside-transit-hotels" element={<AirsideTransitHotels />} />
            <Route path="/resources/terminal-connected-hotels" element={<TerminalConnectedHotels />} />
            <Route path="/resources/sleep-pods-lounges" element={<SleepPodsLounges />} />
            <Route path="/resources/immigration-requirements" element={<ImmigrationRequirements />} />
            <Route path="/resources/access-types" element={<AccessTypes />} />
            <Route path="/resources/layover-duration" element={<LayoverDuration />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/airport-travel-resources" element={<AirportTravelResources />} />
            <Route path="/country/:slug" element={<CountryDetail />} />
            <Route path="/region/:slug" element={<RegionDetail />} />
            <Route
              path="/import-data"
              element={
                <ProtectedRoute>
                  <ImportData />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
