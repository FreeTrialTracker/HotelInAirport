/*
  # Create Airports and Properties Schema

  1. New Tables
    - `airports`
      - `id` (uuid, primary key)
      - `airport_code` (text, unique) - IATA/ICAO code
      - `airport_name` (text) - Full airport name
      - `city` (text) - City name
      - `country` (text) - Country name
      - `region` (text) - Geographic region
      - `slug` (text, unique) - URL-friendly identifier
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Last update time
    
    - `properties`
      - `id` (uuid, primary key)
      - `property_id` (text, unique) - External property identifier
      - `property_name` (text) - Name of the property
      - `property_type` (text) - Type (hotel, sleep_pods, capsule_hotel, etc.)
      - `access_type` (text) - Access type (airside, terminal_connected, nearby, etc.)
      - `must_clear_immigration_first` (boolean) - Immigration requirement
      - `gate_info` (text) - Gate or location information
      - `estimated_rate_hourly` (numeric) - Hourly rate
      - `estimated_rate_daily` (numeric) - Daily rate
      - `currency` (text) - Currency code
      - `region` (text) - Geographic region
      - `country` (text) - Country name
      - `city` (text) - City name
      - `airport_id` (uuid, foreign key) - Reference to airports table
      - `airport_code` (text) - IATA/ICAO code
      - `airport_name` (text) - Airport name
      - `booking_or_ota_url` (text) - Booking URL
      - `source_type` (text) - Source type
      - `notes` (text) - Additional notes
      - `qa_flags` (jsonb) - Quality assurance flags
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Last update time

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (since this is public directory data)
    - No write policies needed (data managed via migrations/admin)
*/

-- Create airports table
CREATE TABLE IF NOT EXISTS airports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_code text UNIQUE NOT NULL,
  airport_name text NOT NULL,
  city text,
  country text,
  region text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text UNIQUE NOT NULL,
  property_name text,
  property_type text,
  access_type text,
  must_clear_immigration_first boolean,
  gate_info text,
  estimated_rate_hourly numeric,
  estimated_rate_daily numeric,
  currency text,
  region text,
  country text,
  city text,
  airport_id uuid REFERENCES airports(id) ON DELETE SET NULL,
  airport_code text,
  airport_name text,
  booking_or_ota_url text,
  source_type text,
  notes text,
  qa_flags jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_airports_country ON airports(country);
CREATE INDEX IF NOT EXISTS idx_airports_city ON airports(city);
CREATE INDEX IF NOT EXISTS idx_airports_slug ON airports(slug);
CREATE INDEX IF NOT EXISTS idx_properties_airport_id ON properties(airport_id);
CREATE INDEX IF NOT EXISTS idx_properties_airport_code ON properties(airport_code);
CREATE INDEX IF NOT EXISTS idx_properties_country ON properties(country);

-- Enable Row Level Security
ALTER TABLE airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read airports"
  ON airports
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read properties"
  ON properties
  FOR SELECT
  TO anon, authenticated
  USING (true);
