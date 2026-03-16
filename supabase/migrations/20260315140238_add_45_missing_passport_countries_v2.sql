/*
  # Add 45 Missing Passport Countries to Layover Access Rules (v2 - typo fix)

  Fixes a column name typo in Africa section and re-runs all inserts safely.
  Uses ON CONFLICT DO NOTHING so existing rows from v1 partial run are preserved.
*/

DO $$
DECLARE
  pc TEXT;
BEGIN

  -- =====================================================================
  -- AMERICAS (13 countries)
  -- =====================================================================

  FOREACH pc IN ARRAY ARRAY['Bahamas', 'Barbados', 'Bolivia', 'Colombia', 'Costa Rica', 'Cuba', 'Dominican Republic', 'Ecuador', 'Jamaica', 'Panama', 'Paraguay', 'Peru', 'Uruguay'] LOOP

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Argentina visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Brazil', 'GRU', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Brazil visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Chile', 'SCL', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Chile visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Croatia', 'ZAG', true, 'entry_visa_required', 'transit_without_visa', 24, pc || ' passport holders require a Schengen visa for Croatia. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Mexico', 'MEX', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Mexico visa-free. Please verify official requirements.', 'medium')
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

  -- =====================================================================
  -- EUROPE: Georgia (visa-free to Schengen), Russia/Serbia/Ukraine (visa required)
  -- =====================================================================

  FOREACH pc IN ARRAY ARRAY['Georgia'] LOOP

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Argentina visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'MEL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Australia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Australia', 'SYD', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Australia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Austria', 'VIE', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Brazil', 'GRU', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Brazil visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Bulgaria', 'SOF', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YVR', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Canada. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Canada', 'YYZ', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Canada. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Chile', 'SCL', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Chile visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'HKG', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for China/HK. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PEK', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'China', 'PVG', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for China. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Croatia', 'ZAG', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Czech Republic', 'PRG', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Denmark', 'CPH', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Finland', 'HEL', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'France', 'CDG', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Germany', 'FRA', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Greece', 'ATH', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Hungary', 'BUD', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'India', 'DEL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for India. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Indonesia', 'CGK', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Indonesia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Ireland', 'DUB', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Ireland. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Italy', 'FCO', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'HND', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Japan. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Japan', 'NRT', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Japan. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Malaysia', 'KUL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Malaysia. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Mexico', 'MEX', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Mexico visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Netherlands', 'AMS', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'New Zealand', 'AKL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for New Zealand. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Nigeria', 'LOS', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Nigeria. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Norway', 'OSL', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Schengen area visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Philippines', 'MNL', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Philippines. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Poland', 'WAW', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Portugal', 'LIS', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Qatar', 'DOH', true, 'entry_visa_required', 'transit_without_visa', 96, 'Georgia passport holders require a visa for Qatar. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Romania', 'OTP', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Singapore', 'SIN', true, 'entry_visa_required', 'transit_without_visa', 96, 'Georgia passport holders require a visa for Singapore. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Africa', 'JNB', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for South Africa. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'South Korea', 'ICN', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for South Korea. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Spain', 'MAD', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Sweden', 'ARN', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter EU/Schengen visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Switzerland', 'ZRH', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Schengen area visa-free for up to 90 days.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Thailand', 'BKK', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for Thailand. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Turkey', 'IST', true, 'visa_free_entry', 'transit_without_visa', 24, 'Georgia passport holders can enter Turkey visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Arab Emirates', 'DXB', true, 'entry_visa_required', 'transit_without_visa', 96, 'Georgia passport holders require a visa for UAE. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Kingdom', 'LGW', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for the United Kingdom. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Kingdom', 'LHR', true, 'entry_visa_required', 'transit_without_visa', 24, 'Georgia passport holders require a visa for the United Kingdom. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'JFK', false, 'entry_visa_required', 'transit_without_visa', 0, 'Georgia passport holders require a visa for the United States. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United States', 'LAX', false, 'entry_visa_required', 'transit_without_visa', 0, 'Georgia passport holders require a visa for the United States. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

  END LOOP;

  -- Russia, Serbia, Ukraine
  FOREACH pc IN ARRAY ARRAY['Russia', 'Serbia', 'Ukraine'] LOOP

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Argentina visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Brazil', 'GRU', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Brazil visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Chile', 'SCL', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Chile visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Mexico', 'MEX', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Mexico visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Turkey', 'IST', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Turkey visa-free. Please verify official requirements.', 'medium')
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

  -- =====================================================================
  -- MIDDLE EAST (8 countries)
  -- =====================================================================

  FOREACH pc IN ARRAY ARRAY['Bahrain', 'Israel', 'Jordan', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia', 'Turkey'] LOOP

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'Argentina', 'EZE', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Argentina visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Qatar', 'DOH', true, 'visa_free_entry', 'transit_without_visa', 96, pc || ' passport holders can enter Qatar visa-free. Please verify official requirements.', 'medium')
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
    VALUES (pc, 'Turkey', 'IST', true, 'visa_free_entry', 'transit_without_visa', 24, pc || ' passport holders can enter Turkey visa-free. Please verify official requirements.', 'medium')
    ON CONFLICT DO NOTHING;

    INSERT INTO layover_access_rules (passport_country, layover_country, layover_airport_code, airside_transit_allowed, landside_entry_type, transit_rule_type, max_airside_transit_hours, notes, confidence)
    VALUES (pc, 'United Arab Emirates', 'DXB', true, 'visa_free_entry', 'transit_without_visa', 96, pc || ' passport holders can enter UAE visa-free. Please verify official requirements.', 'medium')
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

  -- =====================================================================
  -- AFRICA (9 countries)
  -- =====================================================================

  FOREACH pc IN ARRAY ARRAY['Algeria', 'Egypt', 'Ethiopia', 'Ghana', 'Kenya', 'Morocco', 'Tanzania', 'Tunisia', 'Zimbabwe'] LOOP

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

  -- =====================================================================
  -- ASIA (12 countries)
  -- =====================================================================

  FOREACH pc IN ARRAY ARRAY['Armenia', 'Azerbaijan', 'Bangladesh', 'Cambodia', 'Laos', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Pakistan', 'Sri Lanka', 'Vietnam'] LOOP

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
