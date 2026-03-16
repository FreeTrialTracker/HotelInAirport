/*
  # Add Nigeria as a Passport Country

  ## Summary
  Inserts layover access rules for Nigerian passport holders across all 50 layover airports
  in the database.

  ## Key Rules Applied
  - Nigeria (LOS): Visa-free / ECOWAS free movement for Nigerian citizens at home airport
  - South Africa (JNB): Visa-free for Nigerians (30 days)
  - Ghana (LOS rules via Ghana reciprocity): visa-on-arrival or visa-free in some African destinations
  - Turkey (IST): Nigerians require an e-Visa
  - UAE (DXB): Nigerians require a visa (pre-arranged)
  - All Schengen countries: Airport Transit Visa (ATV) required for Nigerian passports
  - UK (LHR/LGW): Direct Airside Transit Visa (DATV) required
  - US (JFK/LAX): Visa required, airside transit generally allowed without visa for connecting flights
    but landside requires B1/B2 visa
  - All other destinations: Visa required

  ## Notes
  - Confidence set to "medium" as rules should be verified against official sources
  - Nigerian passport holders face significant visa restrictions globally
  - Schengen ATV requirement means airside_transit_allowed = false for some Schengen airports
    (they need a transit visa even to stay airside)
*/

INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
VALUES
  -- Argentina (EZE)
  ('Nigeria', 'Argentina', 'EZE', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Argentina. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Australia (MEL, SYD)
  ('Nigeria', 'Australia', 'MEL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Australia. Airside transit permitted. Please verify official requirements.', 'medium'),
  ('Nigeria', 'Australia', 'SYD', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Australia. Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Austria (VIE) - Schengen, ATV required
  ('Nigeria', 'Austria', 'VIE', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for all Schengen airports including Vienna. Please verify official requirements.', 'medium'),
  -- Brazil (GRU)
  ('Nigeria', 'Brazil', 'GRU', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Brazil. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Bulgaria (SOF) - Schengen candidate, ATV may apply
  ('Nigeria', 'Bulgaria', 'SOF', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Bulgaria. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Canada (YVR, YYZ)
  ('Nigeria', 'Canada', 'YVR', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Canada. Airside transit permitted without a visa. Please verify official requirements.', 'medium'),
  ('Nigeria', 'Canada', 'YYZ', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Canada. Airside transit permitted without a visa. Please verify official requirements.', 'medium'),
  -- Chile (SCL)
  ('Nigeria', 'Chile', 'SCL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Chile. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- China (HKG, PEK, PVG)
  ('Nigeria', 'China', 'HKG', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Hong Kong. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  ('Nigeria', 'China', 'PEK', true, 'entry_visa_required', 'transit_without_visa', 144, 'Nigerian passport holders may be eligible for 144-hour visa-free transit in Beijing. Please verify official requirements with Chinese authorities.', 'medium'),
  ('Nigeria', 'China', 'PVG', true, 'entry_visa_required', 'transit_without_visa', 144, 'Nigerian passport holders may be eligible for 144-hour visa-free transit in Shanghai. Please verify official requirements with Chinese authorities.', 'medium'),
  -- Croatia (ZAG) - Schengen
  ('Nigeria', 'Croatia', 'ZAG', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Zagreb. Please verify official requirements.', 'medium'),
  -- Czech Republic (PRG) - Schengen
  ('Nigeria', 'Czech Republic', 'PRG', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Prague. Please verify official requirements.', 'medium'),
  -- Denmark (CPH) - Schengen
  ('Nigeria', 'Denmark', 'CPH', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Copenhagen. Please verify official requirements.', 'medium'),
  -- Finland (HEL) - Schengen
  ('Nigeria', 'Finland', 'HEL', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Helsinki. Please verify official requirements.', 'medium'),
  -- France (CDG) - Schengen
  ('Nigeria', 'France', 'CDG', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Paris CDG. Please verify official requirements.', 'medium'),
  -- Germany (FRA) - Schengen
  ('Nigeria', 'Germany', 'FRA', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Frankfurt. Please verify official requirements.', 'medium'),
  -- Greece (ATH) - Schengen
  ('Nigeria', 'Greece', 'ATH', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Athens. Please verify official requirements.', 'medium'),
  -- Hungary (BUD) - Schengen
  ('Nigeria', 'Hungary', 'BUD', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Budapest. Please verify official requirements.', 'medium'),
  -- India (DEL)
  ('Nigeria', 'India', 'DEL', true, 'entry_visa_on_arrival', 'transit_without_visa', 24, 'Nigerian passport holders can obtain a visa on arrival or e-Visa for India. Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Indonesia (CGK)
  ('Nigeria', 'Indonesia', 'CGK', true, 'entry_visa_on_arrival', 'transit_without_visa', 24, 'Nigerian passport holders can obtain a visa on arrival for Indonesia. Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Ireland (DUB)
  ('Nigeria', 'Ireland', 'DUB', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Ireland. Airside transit generally permitted without a transit visa. Please verify official requirements.', 'medium'),
  -- Italy (FCO) - Schengen
  ('Nigeria', 'Italy', 'FCO', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Rome FCO. Please verify official requirements.', 'medium'),
  -- Japan (HND, NRT)
  ('Nigeria', 'Japan', 'HND', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Japan. Short airside transit may be permitted. Please verify official requirements.', 'medium'),
  ('Nigeria', 'Japan', 'NRT', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Japan. Short airside transit may be permitted. Please verify official requirements.', 'medium'),
  -- Malaysia (KUL)
  ('Nigeria', 'Malaysia', 'KUL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Malaysia. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Mexico (MEX)
  ('Nigeria', 'Mexico', 'MEX', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Mexico. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Netherlands (AMS) - Schengen
  ('Nigeria', 'Netherlands', 'AMS', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Amsterdam. Please verify official requirements.', 'medium'),
  -- New Zealand (AKL)
  ('Nigeria', 'New Zealand', 'AKL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for New Zealand. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Nigeria (LOS) - home country
  ('Nigeria', 'Nigeria', 'LOS', true, 'entry_visa_free', 'transit_without_visa', 72, 'Nigerian citizens have unrestricted access to Nigeria. No visa required for Nigerian passport holders.', 'high'),
  -- Norway (OSL) - Schengen
  ('Nigeria', 'Norway', 'OSL', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Oslo. Please verify official requirements.', 'medium'),
  -- Philippines (MNL)
  ('Nigeria', 'Philippines', 'MNL', true, 'entry_visa_on_arrival', 'transit_without_visa', 24, 'Nigerian passport holders can obtain a visa on arrival for the Philippines (30 days). Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Poland (WAW) - Schengen
  ('Nigeria', 'Poland', 'WAW', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Warsaw. Please verify official requirements.', 'medium'),
  -- Portugal (LIS) - Schengen
  ('Nigeria', 'Portugal', 'LIS', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Lisbon. Please verify official requirements.', 'medium'),
  -- Qatar (DOH)
  ('Nigeria', 'Qatar', 'DOH', true, 'entry_visa_on_arrival', 'transit_without_visa', 96, 'Nigerian passport holders can obtain a visa on arrival for Qatar. Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Romania (OTP)
  ('Nigeria', 'Romania', 'OTP', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for Romania. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- Singapore (SIN)
  ('Nigeria', 'Singapore', 'SIN', true, 'entry_visa_required', 'transit_without_visa', 96, 'Nigerian passport holders require a visa for Singapore. Airside transit permitted for up to 96 hours under certain conditions. Please verify official requirements.', 'medium'),
  -- South Africa (JNB)
  ('Nigeria', 'South Africa', 'JNB', true, 'entry_visa_free', 'transit_without_visa', 30, 'Nigerian passport holders can enter South Africa visa-free for up to 30 days. Please verify official requirements.', 'medium'),
  -- South Korea (ICN)
  ('Nigeria', 'South Korea', 'ICN', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a visa for South Korea. Short airside transit may be permitted. Please verify official requirements.', 'medium'),
  -- Spain (MAD) - Schengen
  ('Nigeria', 'Spain', 'MAD', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Madrid. Please verify official requirements.', 'medium'),
  -- Sweden (ARN) - Schengen
  ('Nigeria', 'Sweden', 'ARN', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Schengen airports including Stockholm. Please verify official requirements.', 'medium'),
  -- Switzerland (ZRH) - Schengen-associated
  ('Nigeria', 'Switzerland', 'ZRH', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require an Airport Transit Visa (ATV) for Switzerland (Schengen area). Please verify official requirements.', 'medium'),
  -- Thailand (BKK)
  ('Nigeria', 'Thailand', 'BKK', true, 'entry_visa_on_arrival', 'transit_without_visa', 24, 'Nigerian passport holders can obtain a visa on arrival for Thailand. Airside transit permitted. Please verify official requirements.', 'medium'),
  -- Turkey (IST)
  ('Nigeria', 'Turkey', 'IST', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require an e-Visa for Turkey. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- United Arab Emirates (DXB)
  ('Nigeria', 'United Arab Emirates', 'DXB', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a pre-arranged visa for the UAE. Airside transit generally permitted. Please verify official requirements.', 'medium'),
  -- United Kingdom (LGW, LHR) - DATV required
  ('Nigeria', 'United Kingdom', 'LGW', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require a Direct Airside Transit Visa (DATV) for UK airports. Please verify official requirements.', 'high'),
  ('Nigeria', 'United Kingdom', 'LHR', false, 'entry_visa_required', 'airport_transit_visa_required', 24, 'Nigerian passport holders require a Direct Airside Transit Visa (DATV) for UK airports. Please verify official requirements.', 'high'),
  -- United States (JFK, LAX)
  ('Nigeria', 'United States', 'JFK', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a US visa for landside entry. Airside transit is generally permitted for connecting international flights. Please verify official requirements.', 'medium'),
  ('Nigeria', 'United States', 'LAX', true, 'entry_visa_required', 'transit_without_visa', 24, 'Nigerian passport holders require a US visa for landside entry. Airside transit is generally permitted for connecting international flights. Please verify official requirements.', 'medium');
