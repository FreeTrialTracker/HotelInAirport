/*
  # Create blog_posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text) - post title
      - `slug` (text, unique) - URL slug
      - `excerpt` (text) - short summary shown in cards
      - `content` (text) - full HTML/markdown content
      - `author` (text) - author name
      - `published_at` (timestamptz) - publish date
      - `hero_image` (text) - path to hero image
      - `hero_image_alt` (text) - alt text for hero image
      - `meta_title` (text) - SEO title
      - `meta_description` (text) - SEO description
      - `og_image` (text) - OpenGraph image path
      - `tags` (text[]) - tags for related posts
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `blog_posts` table
    - Public read access for published posts
    - No anonymous write access
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT 'Matthew Lin',
  published_at timestamptz NOT NULL DEFAULT now(),
  hero_image text NOT NULL DEFAULT '',
  hero_image_alt text NOT NULL DEFAULT '',
  meta_title text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  og_image text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);
