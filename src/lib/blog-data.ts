import { supabase } from './supabase';
import type { BlogPost } from './supabase';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  return data || [];
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  return data;
}

export async function getRelatedBlogPosts(currentSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  if (tags && tags.length > 0) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .neq('slug', currentSlug)
      .overlaps('tags', tags)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (!error && data && data.length > 0) {
      return data;
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('Error fetching related blog posts:', error);
    return [];
  }
  return data || [];
}

export async function getAirportBlogPosts(
  airportName: string,
  city: string | undefined,
  country: string | undefined,
  region: string | undefined,
  limit = 3
): Promise<BlogPost[]> {
  const terms = [airportName, city, country, region].filter(Boolean) as string[];

  for (const term of terms) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return data;
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
