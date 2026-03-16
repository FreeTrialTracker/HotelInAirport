-- Add INSERT policy for layover access rules table
-- This allows public inserts for data import/management

CREATE POLICY "Public insert access for layover rules"
  ON layover_access_rules
  FOR INSERT
  TO public
  WITH CHECK (true);