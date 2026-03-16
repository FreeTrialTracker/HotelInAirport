/*
  # Add EU/Schengen Passport Countries to Layover Access Rules

  ## Summary
  Adds 10 new EU/Schengen passport countries as passport_country entries in the
  layover_access_rules table. These countries are added as passport/departure/final
  destination contexts — NOT as airport countries.

  ## New Passport Countries Added
  1. Bulgaria
  2. Cyprus
  3. Estonia
  4. Iceland
  5. Latvia
  6. Lithuania
  7. Luxembourg
  8. Malta
  9. Slovakia
  10. Slovenia

  ## Rule Logic
  All 10 countries are full EU member states (or EEA/Schengen members in Iceland's case),
  holding passports with equivalent travel privileges to existing EU passport countries
  like Germany and France already in the system. Rules mirror the Germany passport pattern:
  - Visa-free entry into Schengen/EU countries, UK, US (ESTA), Japan, South Korea,
    Singapore, New Zealand, Canada, Australia
  - Entry visa required for countries like China, India, Indonesia, Brazil, Thailand,
    Turkey, UAE, South Africa, Nigeria, Philippines, Malaysia, Argentina, Chile, Mexico,
    Qatar, Norway (Schengen-adjacent), Saudi Arabia-adjacent countries
  - Transit without visa universally (airside transit allowed at all airports)
  - Confidence: medium (auto-generated, verify official requirements)

  ## Notes
  - Each new passport country gets one rule per airport in the existing layover_access_rules
    airport coverage set (49 airports)
  - 490 new rows total (10 countries x 49 airports)
  - Uses INSERT ... ON CONFLICT DO NOTHING to be safe against re-runs
*/

DO $$
DECLARE
  new_countries TEXT[] := ARRAY[
    'Bulgaria', 'Cyprus', 'Estonia', 'Iceland', 'Latvia',
    'Lithuania', 'Luxembourg', 'Malta', 'Slovakia', 'Slovenia'
  ];
  pc TEXT;
BEGIN
  FOREACH pc IN ARRAY new_countries LOOP

    -- Argentina - EZE
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Argentina. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Australia - MEL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'MEL', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Australia visa-free (ETA required). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Australia - SYD
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'SYD', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Australia visa-free (ETA required). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Austria - VIE
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Austria', 'VIE', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Brazil - GRU
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Brazil', 'GRU', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Brazil. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Bulgaria - SOF
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Bulgaria', 'SOF', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Canada - YVR
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YVR', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Canada visa-free (eTA required). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Canada - YYZ
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YYZ', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Canada visa-free (eTA required). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Chile - SCL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Chile', 'SCL', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Chile. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- China - HKG
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'HKG', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- China - PEK
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PEK', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- China - PVG
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PVG', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Croatia - ZAG
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Croatia', 'ZAG', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Czech Republic - PRG
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Czech Republic', 'PRG', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Denmark - CPH
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Denmark', 'CPH', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Finland - HEL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Finland', 'HEL', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- France - CDG
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'France', 'CDG', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Germany - FRA
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Germany', 'FRA', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Greece - ATH
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Greece', 'ATH', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Hungary - BUD
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Hungary', 'BUD', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- India - DEL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'India', 'DEL', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders require a visa for India (e-Visa available). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Indonesia - CGK
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Indonesia', 'CGK', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Indonesia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Ireland - DUB
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Ireland', 'DUB', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU passport holders can enter Ireland visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Italy - FCO
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Italy', 'FCO', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Japan - HND
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'HND', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Japan visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Japan - NRT
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'NRT', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter Japan visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Malaysia - KUL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Malaysia', 'KUL', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Malaysia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Mexico - MEX
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Mexico', 'MEX', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Mexico. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Netherlands - AMS
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Netherlands', 'AMS', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- New Zealand - AKL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'New Zealand', 'AKL', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter New Zealand visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Nigeria - LOS
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Nigeria', 'LOS', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders require a visa for Nigeria. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Norway - OSL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Norway', 'OSL', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the Schengen area including Norway.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Philippines - MNL
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Philippines', 'MNL', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for the Philippines. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Poland - WAW
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Poland', 'WAW', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Portugal - LIS
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Portugal', 'LIS', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Qatar - DOH
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Qatar', 'DOH', true, 'entry_visa_required', 'transit_without_visa', 96, 'EU/Schengen passport holders may require a visa for Qatar. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Romania - OTP
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Romania', 'OTP', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Singapore - SIN
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Singapore', 'SIN', true, 'visa_free_entry', 'transit_without_visa', 96, 'EU/Schengen passport holders can enter Singapore visa-free.', 'medium')
    ON CONFLICT DO NOTHING;

    -- South Africa - JNB
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Africa', 'JNB', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for South Africa. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- South Korea - ICN
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Korea', 'ICN', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders can enter South Korea visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Spain - MAD
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Spain', 'MAD', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Sweden - ARN
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Sweden', 'ARN', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the EU/Schengen area.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Switzerland - ZRH
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Switzerland', 'ZRH', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU/Schengen passport holders have free movement within the Schengen area including Switzerland.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Thailand - BKK
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Thailand', 'BKK', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders may require a visa for Thailand. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- Turkey - IST
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Turkey', 'IST', true, 'entry_visa_required', 'transit_without_visa', 24, 'EU/Schengen passport holders require a visa for Turkey (e-Visa available). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- United Arab Emirates - DXB
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Arab Emirates', 'DXB', true, 'entry_visa_required', 'transit_without_visa', 96, 'EU/Schengen passport holders may require a visa for UAE. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- United Kingdom - LHR
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Kingdom', 'LHR', true, 'visa_free_entry', 'transit_without_visa', 24, 'EU passport holders can enter the UK visa-free (post-Brexit ETA may be required). Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    -- United States - JFK
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'JFK', false, 'visa_free_entry', 'transit_without_visa', 0, 'EU/Schengen passport holders can enter the US visa-free with ESTA authorization.', 'medium')
    ON CONFLICT DO NOTHING;

    -- United States - LAX
    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'LAX', false, 'visa_free_entry', 'transit_without_visa', 0, 'EU/Schengen passport holders can enter the US visa-free with ESTA authorization.', 'medium')
    ON CONFLICT DO NOTHING;

  END LOOP;
END $$;
