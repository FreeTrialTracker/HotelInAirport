/*
  # Add Kazakhstan and Uzbekistan passport countries

  These 2 Asian countries were in the required list but missed in previous migrations.
  Adding 50 rules each (one per layover airport).
*/

DO $$
DECLARE
  pc TEXT;
BEGIN

  FOREACH pc IN ARRAY ARRAY['Kazakhstan', 'Uzbekistan'] LOOP

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Argentina. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'MEL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Australia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'SYD', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Australia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Austria', 'VIE', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Austria. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Brazil', 'GRU', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Brazil. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Bulgaria', 'SOF', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Bulgaria. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YVR', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Canada. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YYZ', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Canada. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Chile', 'SCL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Chile. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'HKG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for China/HK. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PEK', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PVG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Croatia', 'ZAG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Croatia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Czech Republic', 'PRG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Czech Republic. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Denmark', 'CPH', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Denmark. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Finland', 'HEL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Finland. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'France', 'CDG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for France. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Germany', 'FRA', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Germany. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Greece', 'ATH', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Greece. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Hungary', 'BUD', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Hungary. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'India', 'DEL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for India. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Indonesia', 'CGK', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Indonesia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Ireland', 'DUB', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Ireland. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Italy', 'FCO', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Italy. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'HND', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Japan. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'NRT', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Japan. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Malaysia', 'KUL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Malaysia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Mexico', 'MEX', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Mexico. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Netherlands', 'AMS', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Netherlands. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'New Zealand', 'AKL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for New Zealand. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Nigeria', 'LOS', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Nigeria. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Norway', 'OSL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Norway. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Philippines', 'MNL', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Philippines. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Poland', 'WAW', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Poland. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Portugal', 'LIS', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Portugal. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Qatar', 'DOH', true, 'entry_visa_required', 'transit_without_visa', 96, pc || ' passport holders require a visa for Qatar. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Romania', 'OTP', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Romania. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Singapore', 'SIN', true, 'entry_visa_required', 'transit_without_visa', 96, pc || ' passport holders require a visa for Singapore. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Africa', 'JNB', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for South Africa. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Korea', 'ICN', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for South Korea. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Spain', 'MAD', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Spain. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Sweden', 'ARN', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Sweden. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Switzerland', 'ZRH', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Switzerland. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Thailand', 'BKK', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Thailand. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Turkey', 'IST', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for Turkey. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Arab Emirates', 'DXB', true, 'entry_visa_required', 'transit_without_visa', 96, pc || ' passport holders require a visa for UAE. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Kingdom', 'LGW', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for the United Kingdom. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Kingdom', 'LHR', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a visa for the United Kingdom. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'JFK', false, 'entry_visa_required', 'transit_without_visa', 0, pc || ' passport holders require a visa for the United States. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'LAX', false, 'entry_visa_required', 'transit_without_visa', 0, pc || ' passport holders require a visa for the United States. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

  END LOOP;

END $$;
