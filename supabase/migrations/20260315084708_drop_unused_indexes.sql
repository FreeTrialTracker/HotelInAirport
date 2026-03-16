
/*
  # Drop Unused Indexes

  ## Summary
  Removes two indexes that have never been used in query execution plans,
  reducing storage overhead and write amplification.

  ## Removed Indexes
  - `idx_airports_city` on `public.airports` — unused city lookup index
  - `idx_properties_country` on `public.properties` — unused country lookup index
*/

DROP INDEX IF EXISTS public.idx_airports_city;
DROP INDEX IF EXISTS public.idx_properties_country;
