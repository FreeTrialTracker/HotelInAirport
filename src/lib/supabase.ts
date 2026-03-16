import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Airport {
  id?: string;
  airport_code: string;
  airport_name: string;
  city?: string;
  country?: string;
  region?: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  hero_image: string;
  hero_image_alt: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Property {
  id?: string;
  property_id: string;
  property_name?: string;
  property_type?: string;
  access_type?: string;
  must_clear_immigration_first?: boolean;
  gate_info?: string;
  estimated_rate_hourly?: number;
  estimated_rate_daily?: number;
  currency?: string;
  region?: string;
  country?: string;
  city?: string;
  airport_id?: string;
  airport_code?: string;
  airport_name?: string;
  booking_or_ota_url?: string;
  source_type?: string;
  notes?: string;
  qa_flags?: string[];
  created_at?: string;
  updated_at?: string;
}
