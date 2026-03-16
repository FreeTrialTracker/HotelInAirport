import { useState } from 'react';
import { importAirportsAndProperties } from '../lib/import-data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ImportData() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ airports: number; properties: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const importResult = await importAirportsAndProperties();
      setResult(importResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main id="main-content" className="flex-1 py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Import Data to Database</h1>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <p className="text-gray-600 mb-6">
              Click the button below to import airports and properties from JSON files into the Supabase database.
            </p>

            <button
              onClick={handleImport}
              disabled={loading}
              className="w-full bg-[#FF7A1A] hover:bg-[#E66A0A] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Importing...' : 'Import Data'}
            </button>

            {result && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Import Successful!</h3>
                <p className="text-green-800">Airports imported: {result.airports}</p>
                <p className="text-green-800">Properties imported: {result.properties}</p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Import Failed</h3>
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ImportData;
