/*
  # Add Insert Policies for Data Import

  1. Changes
    - Add INSERT policies to allow data import for airports table
    - Add INSERT policies to allow data import for properties table
    
  2. Security
    - Allow anonymous users to insert data (for initial data import)
    - Allow authenticated users to insert data
    - This enables the /import-data page to populate the database
*/

-- Add insert policy for airports
CREATE POLICY "Allow insert for airports"
  ON airports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add update policy for airports (for upsert operations)
CREATE POLICY "Allow update for airports"
  ON airports
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Add insert policy for properties
CREATE POLICY "Allow insert for properties"
  ON properties
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add update policy for properties (for upsert operations)
CREATE POLICY "Allow update for properties"
  ON properties
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
