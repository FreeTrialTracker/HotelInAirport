/*
  # Add Property Fields

  1. Schema Changes
    - Add `access_notes` column to `properties` table
    - Add `is_active` column to `properties` table

  These fields are needed to store additional property information from the Excel master file.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'access_notes'
  ) THEN
    ALTER TABLE properties ADD COLUMN access_notes text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE properties ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;
