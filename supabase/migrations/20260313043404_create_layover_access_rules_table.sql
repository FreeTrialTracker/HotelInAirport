-- Create Layover Access Rules Table
--
-- 1. New Tables
--   - layover_access_rules
--     - id (uuid, primary key)
--     - passport_country (text) - Country of passport holder
--     - layover_country (text) - Country where layover occurs
--     - layover_airport_code (text) - IATA airport code
--     - airside_transit_allowed (boolean) - Whether airside transit is allowed
--     - landside_entry_type (text) - Type of landside entry permission
--     - transit_rule_type (text) - Type of transit rule
--     - max_airside_transit_hours (integer) - Maximum hours allowed airside
--     - notes (text) - Additional notes
--     - confidence (text) - Confidence level (high/medium/low)
--     - created_at (timestamptz)
--     - updated_at (timestamptz)
--
-- 2. Security
--   - Enable RLS on layover_access_rules table
--   - Add policy for public read access (this is reference data)

CREATE TABLE IF NOT EXISTS layover_access_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_country text NOT NULL,
  layover_country text NOT NULL,
  layover_airport_code text NOT NULL,
  airside_transit_allowed boolean NOT NULL DEFAULT false,
  landside_entry_type text NOT NULL,
  transit_rule_type text NOT NULL,
  max_airside_transit_hours integer NOT NULL DEFAULT 0,
  notes text DEFAULT '',
  confidence text NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE layover_access_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for layover rules"
  ON layover_access_rules
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_layover_rules_passport_airport
  ON layover_access_rules(passport_country, layover_airport_code);

CREATE INDEX IF NOT EXISTS idx_layover_rules_passport_country
  ON layover_access_rules(passport_country, layover_country);