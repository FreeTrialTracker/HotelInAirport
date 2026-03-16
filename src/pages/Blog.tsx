import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAllBlogPosts, formatBlogDate } from '../lib/blog-data';
import type { BlogPost } from '../lib/supabase';

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Airport Hotel Guides & Travel Tips - HotelInAirport Blog"
        description="Expert guides on airport hotels, transit hotels, capsule pods, and layover travel strategies around the world. Written by Matthew Lin."
        keywords="airport hotel guides, transit hotel tips, layover travel, capsule hotel, airside hotel, airport sleep pods, layover planning"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <Navbar />

      <main id="main-content" className="flex-grow">
        <div className="bg-brand text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Airport Hotel Guides</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Expert guides on airport hotels, transit hotels, capsule pods, and layover travel strategies around the world.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post.slug} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  <Link to={`/blog/${post.slug}`} className="block">
                    {post.hero_image ? (
                      <img
                        src={post.hero_image}
                        alt={post.hero_image_alt}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-brand to-brand/70 flex items-center justify-center">
                        <span className="text-white/40 text-5xl font-bold">H</span>
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatBlogDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-action transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-action hover:text-action-hover font-semibold text-sm transition-colors mt-auto"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
