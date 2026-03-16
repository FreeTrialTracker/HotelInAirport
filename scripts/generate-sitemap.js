import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://www.hotelinairport.com';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/airports', changefreq: 'weekly', priority: '0.9' },
  { url: '/hotels', changefreq: 'weekly', priority: '0.8' },
  { url: '/regions', changefreq: 'monthly', priority: '0.7' },
  { url: '/countries', changefreq: 'monthly', priority: '0.7' },
  { url: '/blog', changefreq: 'weekly', priority: '0.8' },
  { url: '/resources', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/airside-transit-hotels', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/terminal-connected-hotels', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/sleep-pods-lounges', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/layover-duration', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/immigration-requirements', changefreq: 'monthly', priority: '0.6' },
  { url: '/resources/access-types', changefreq: 'monthly', priority: '0.6' },
  { url: '/airport-travel-resources', changefreq: 'monthly', priority: '0.7' },
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrlEntry({ url, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(SITE_URL + url)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

async function generateSitemap() {
  console.log('Fetching airport slugs...');
  const { data: airports, error: airportsError } = await supabase
    .from('airports')
    .select('slug, updated_at')
    .not('slug', 'is', null);

  if (airportsError) {
    console.error('Error fetching airports:', airportsError.message);
    process.exit(1);
  }

  console.log('Fetching region list...');
  const { data: regionRows, error: regionError } = await supabase
    .from('airports')
    .select('region')
    .not('region', 'is', null);

  if (regionError) {
    console.error('Error fetching regions:', regionError.message);
    process.exit(1);
  }

  const uniqueRegions = [...new Set((regionRows || []).map(r => r.region).filter(Boolean))];

  function slugifyRegion(region) {
    return region
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  console.log('Fetching country list...');
  const { data: countryRows, error: countryError } = await supabase
    .from('airports')
    .select('country')
    .not('country', 'is', null);

  if (countryError) {
    console.error('Error fetching countries:', countryError.message);
    process.exit(1);
  }

  const uniqueCountries = [...new Set((countryRows || []).map(r => r.country).filter(Boolean))];

  function slugifyCountry(country) {
    return country
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  console.log('Fetching blog post slugs...');
  const { data: blogPosts, error: blogError } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .not('slug', 'is', null);

  if (blogError) {
    console.error('Error fetching blog posts:', blogError.message);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticRoutes.map((route) =>
    buildUrlEntry({ ...route, lastmod: today })
  );

  const airportEntries = (airports || []).map((airport) =>
    buildUrlEntry({
      url: `/airports/${airport.slug}`,
      lastmod: airport.updated_at ? airport.updated_at.split('T')[0] : today,
      changefreq: 'weekly',
      priority: '0.8',
    })
  );

  const topicSlugs = ['transit-hotels', 'sleep-pods', 'layover-hotels'];
  const airportTopicEntries = (airports || []).flatMap((airport) =>
    topicSlugs.map((topic) =>
      buildUrlEntry({
        url: `/airports/${airport.slug}/${topic}`,
        lastmod: airport.updated_at ? airport.updated_at.split('T')[0] : today,
        changefreq: 'weekly',
        priority: '0.6',
      })
    )
  );

  const blogEntries = (blogPosts || []).map((post) =>
    buildUrlEntry({
      url: `/blog/${post.slug}`,
      lastmod: post.updated_at ? post.updated_at.split('T')[0] : today,
      changefreq: 'monthly',
      priority: '0.7',
    })
  );

  const regionEntries = uniqueRegions.map((region) =>
    buildUrlEntry({
      url: `/region/${slugifyRegion(region)}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    })
  );

  const countryEntries = uniqueCountries.map((country) =>
    buildUrlEntry({
      url: `/country/${slugifyCountry(country)}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    })
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...regionEntries,
    ...countryEntries,
    ...airportEntries,
    ...airportTopicEntries,
    ...blogEntries,
    '</urlset>',
  ].join('\n');

  const outputPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');

  const total = staticEntries.length + regionEntries.length + countryEntries.length + airportEntries.length + airportTopicEntries.length + blogEntries.length;
  console.log(
    `Sitemap generated: ${staticEntries.length} static + ${regionEntries.length} regions + ${countryEntries.length} countries + ${airportEntries.length} airports + ${airportTopicEntries.length} airport topic pages + ${blogEntries.length} blog posts = ${total} total URLs`
  );
  console.log(`Written to: ${outputPath}`);
}

generateSitemap().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
