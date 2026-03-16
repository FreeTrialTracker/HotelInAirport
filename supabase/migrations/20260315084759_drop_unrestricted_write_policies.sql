
/*
  # Drop Unrestricted Write Policies

  ## Summary
  Removes the "always true" INSERT and UPDATE policies that were flagged as
  security issues. Service-role restricted replacement policies already exist.

  ## Changes
  - DROP: `Allow insert for airports` on public.airports
  - DROP: `Allow update for airports` on public.airports
  - DROP: `Allow insert for properties` on public.properties
  - DROP: `Allow update for properties` on public.properties
  - DROP: `Public insert access for layover rules` on public.layover_access_rules
*/

DROP POLICY IF EXISTS "Allow insert for airports" ON public.airports;
DROP POLICY IF EXISTS "Allow update for airports" ON public.airports;
DROP POLICY IF EXISTS "Allow insert for properties" ON public.properties;
DROP POLICY IF EXISTS "Allow update for properties" ON public.properties;
DROP POLICY IF EXISTS "Public insert access for layover rules" ON public.layover_access_rules;
