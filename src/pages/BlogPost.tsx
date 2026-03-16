import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import DOMPurify from 'dompurify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getBlogPostBySlug, getRelatedBlogPosts, formatBlogDate } from '../lib/blog-data';
import { buildArticleSchema, resolveImage } from '../lib/schema-helpers';
import type { BlogPost as BlogPostType } from '../lib/supabase';

const SITE_URL = 'https://www.hotelinairport.com';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const matches = [...html.matchAll(/<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi)];
  return matches.map(m => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ''),
    level: 2,
  }));
}

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      const data = await getBlogPostBySlug(slug);
      setPost(data);
      if (data) {
        setToc(extractToc(data.content));
        const rel = await getRelatedBlogPosts(slug, data.tags);
        setRelated(rel);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-gray-500 text-lg">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-action hover:text-action-hover">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleSchema = buildArticleSchema({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    url: postUrl,
    image: resolveImage(post.og_image, post.hero_image),
    author: post.author,
    datePublished: post.published_at,
    dateModified: post.updated_at,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.tags.join(', ')}
        canonical={postUrl}
        ogImage={resolveImage(post.og_image, post.hero_image)}
        ogType="article"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <main id="main-content" className="flex-grow">
        {post.hero_image ? (
          <div className="w-full h-72 md:h-96 overflow-hidden">
            <img
              src={post.hero_image}
              alt={post.hero_image_alt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-brand" />
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-action hover:text-action-hover text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Written by{' '}
              <a
                href="https://www.linkedin.com/in/matthew-lin-profilepage/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-action hover:text-action-hover font-medium"
              >
                {post.author}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatBlogDate(post.published_at)}
            </span>
          </div>

          {toc.length > 0 && (
            <nav className="bg-orange-50 border border-action/20 rounded-xl p-6 mb-10">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Table of Contents</h2>
              <ol className="space-y-2">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-action hover:text-action-hover text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <span className="text-gray-400 text-xs w-5 flex-shrink-0">{i + 1}.</span>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            ref={contentRef}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          {post.content.includes('data-faq') && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3" id="faq" />
            </section>
          )}

          <div className="mt-16 bg-brand rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Hotels Inside Airports</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Use our airport layover search tool to see which hotels are located inside airport terminals worldwide.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Find Airport Hotels
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Airport Hotel Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(rel => (
                  <article key={rel.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${rel.slug}`}>
                      {rel.hero_image ? (
                        <img
                          src={rel.hero_image}
                          alt={rel.hero_image_alt}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-brand to-brand/70" />
                      )}
                    </Link>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-2">{formatBlogDate(rel.published_at)}</p>
                      <Link to={`/blog/${rel.slug}`}>
                        <h3 className="font-bold text-gray-900 hover:text-action transition-colors text-sm leading-snug mb-3">
                          {rel.title}
                        </h3>
                      </Link>
                      <Link
                        to={`/blog/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-action hover:text-action-hover text-xs font-semibold transition-colors"
                      >
                        Read More <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { FaqAccordion };
export default BlogPost;
