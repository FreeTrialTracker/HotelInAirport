import { writeFileSync } from 'fs';

const rawData = `Americas,USA,Atlanta,Hartsfield–Jackson Atlanta (ATL),Minute Suites,Concourse B,—,—,~$55,—,airside,No,https://minutesuites.com/
Americas,USA,Atlanta,Hartsfield–Jackson Atlanta (ATL),Minute Suites,Concourse E,—,—,~$55,—,airside,No,https://minutesuites.com/
Americas,USA,Atlanta,Hartsfield–Jackson Atlanta (ATL),Minute Suites,Concourse F,—,—,~$55,—,airside,No,https://minutesuites.com/
Americas,USA,Atlanta,Hartsfield–Jackson Atlanta (ATL),—,—,—,Atlanta Airport Marriott Gateway,—,~$180,terminal_connected,Yes,https://www.booking.com/hotel/us/atlanta-airport-marriott-gateway.en-gb.html
Americas,USA,Boston,Logan International (BOS),—,—,Hilton Boston Logan Airport,—,—,~$230,terminal_connected,Yes,https://www.booking.com/hotel/us/hilton-logan-airport.en-gb.html
Americas,USA,Charlotte,Charlotte Douglas (CLT),Minute Suites,CLT Atrium,—,—,~$40,—,airside,No,https://minutesuites.com/
Americas,USA,Chicago,O'Hare International (ORD),—,—,Hilton Chicago O'Hare Airport,—,—,~$240,terminal_connected,Yes,https://www.booking.com/hotel/us/hilton-chicago-o-hare-airport.en-gb.html
Americas,USA,Dallas,Dallas/Fort Worth (DFW),Minute Suites,Terminal A,—,—,~$42,—,airside,No,https://minutesuites.com/
Americas,USA,Dallas,Dallas/Fort Worth (DFW),Minute Suites,Terminal D,—,—,~$42,—,airside,No,https://minutesuites.com/
Americas,USA,Dallas,Dallas/Fort Worth (DFW),—,—,Grand Hyatt DFW,—,—,~$240,terminal_landside,Yes,https://www.booking.com/hotel/us/grand-hyatt-dfw.en-gb.html
Americas,USA,Dallas,Dallas/Fort Worth (DFW),—,—,Hyatt Regency DFW,—,—,~$200,terminal_connected,Yes,https://www.booking.com/hotel/us/hyatt-regency-dfw-international-airport.en-gb.html
Americas,USA,Denver,Denver International (DEN),—,—,Westin Denver International Airport,—,—,~$260,terminal_connected,Yes,https://www.booking.com/hotel/us/the-westin-denver-international-airport.en-gb.html
Americas,USA,Houston,George Bush Intercontinental (IAH),—,—,Houston Airport Marriott,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/us/houston-airport-at-george-bush-intercontinental-houston.en-gb.html
Americas,USA,Los Angeles,Los Angeles International (LAX),—,—,—,Hyatt Regency LAX,—,~$230,airport_shuttle,Yes,https://www.booking.com/hotel/us/concourse-los-angeles-airport-hyatt.en-gb.html
Americas,USA,Los Angeles,Los Angeles International (LAX),—,—,—,Courtyard by Marriott Los Angeles LAX/Century Boulevard,—,~$210,airport_shuttle,Yes,https://www.booking.com/hotel/us/courtyard-los-angeles-lax-century-boulevard.en-gb.html
Americas,USA,Los Angeles,Los Angeles International (LAX),—,—,—,H Hotel Los Angeles Curio Collection by Hilton,—,~$200,airport_shuttle,Yes,https://www.booking.com/hotel/us/h-los-angeles-curio-collection-by-hilton.en-gb.html
Americas,USA,Miami,Miami International (MIA),—,—,Miami International Airport Hotel,—,—,~$200,terminal_landside,Yes,https://www.booking.com/hotel/us/miami-international-airport.en-gb.html
Americas,USA,Minneapolis,Minneapolis–Saint Paul (MSP),—,—,InterContinental MSP Airport,—,—,~$230,terminal_connected,Yes,https://www.booking.com/hotel/us/intercontinental-minneapolis-st-paul-airport.en-gb.html
Americas,USA,New York,John F Kennedy (JFK),Minute Suites,T4 Concourse B,—,—,~$55 (1h),—,airside,No,https://minutesuites.com/
Americas,USA,New York,John F Kennedy (JFK),Minute Suites,T8,—,—,~$55 (1h),—,airside,No,https://minutesuites.com/
Americas,USA,New York,John F Kennedy (JFK),—,—,TWA Hotel,—,—,~$260,airport_compound,Yes,https://www.twahotel.com/
Americas,USA,Newark,Newark Liberty (EWR),—,—,Newark Liberty Marriott,—,—,~$200,airport_compound,Yes,https://www.booking.com/hotel/us/marriott-newark-international-airport.en-gb.html
Americas,USA,San Francisco,San Francisco International (SFO),—,Terminal G,FreshenUp Lounge,—,~$38,—,terminal_landside,No,https://www.flysfo.com/passengers/shop-dine-relax/freshen
Americas,USA,San Francisco,San Francisco International (SFO),—,—,Grand Hyatt SFO,—,—,~$260,terminal_connected,Yes,https://www.booking.com/hotel/us/grand-hyatt-at-sfo.en-gb.html
Americas,USA,Washington DC,Washington Dulles (IAD),—,—,—,Washington Dulles Marriott,—,~$200,airport_shuttle,Yes,https://www.booking.com/hotel/us/washington-dulles-airport-marriott.en-gb.html
Americas,Canada,Toronto,Toronto Pearson (YYZ),—,—,Sheraton Gateway Hotel,—,—,~$240,terminal_landside,Yes,https://www.booking.com/hotel/ca/sheraton-gateway-toronto.en-gb.html
Americas,Canada,Toronto,Toronto Pearson (YYZ),—,—,—,ALT Hotel Toronto Airport,—,~$200,airport_compound,Yes,https://www.booking.com/hotel/ca/alt-toronto-pearson.en-gb.html
Americas,Canada,Vancouver,Vancouver International (YVR),—,—,Fairmont Vancouver Airport,—,—,~$260,terminal_connected,Yes,https://www.booking.com/hotel/ca/the-fairmount-vancouver-airport.en-gb.html
Americas,Mexico,Mexico City,Benito Juárez International (MEX),—,—,Hilton Mexico City Airport,—,—,~$190,terminal_landside,Yes,https://www.booking.com/hotel/mx/hilton-mexico-city-airport.en-gb.html
Americas,Mexico,Mexico City,Benito Juárez International (MEX),—,—,NH Collection Mexico City Airport T2,—,—,~$170,terminal_landside,Yes,https://www.booking.com/hotel/mx/nh-t2-aeropuerto-mexico.en-gb.html
Americas,Mexico,Mexico City,Benito Juárez International (MEX),—,—,izZzleep Pods,—,~$12 (1h),~$60,terminal_landside,Yes,https://www.booking.com/hotel/mx/izzzleep-aeropuerto-terminal-2.en-gb.html
Americas,Panama,Panama City,Tocumen International (PTY),—,—,—,Riande Aeropuerto Hotel,—,~$140,airport_shuttle,Yes,https://www.booking.com/hotel/pa/riande-aeropuerto-resort.en-gb.html
Americas,Panama,Panama City,Tocumen International (PTY),—,—,—,Crowne Plaza Airport by IHG,—,~$200,airport_shuttle,Yes,https://www.booking.com/hotel/pa/crowne-plaza-airport.en-gb.html
Americas,Argentina,Buenos Aires,Ezeiza International Airport (EZE),—,—,My Pod Capsule,—,~$25 (1h),~$95,terminal_landside,Yes,https://www.booking.com/hotel/ar/my-pod-capsule-boutique-airport.html
Americas,Brazil,São Paulo,São Paulo (GRU),TRYP by Wyndham,T3 Airside,—,—,~$100 (6h),~$220,airside,No,https://www.booking.com/hotel/br/tryp-transit-hotel-sao-paulo-airport.en-gb.html
Americas,Brazil,São Paulo,São Paulo (GRU),—,—,Fast Sleep,—,—,~$150,terminal_connected,Yes,https://www.booking.com/hotel/br/harbor-fast-sleep-guarulhos.en-gb.html
Americas,Colombia,Bogotá,Bogotá (BOG),—,—,—,Courtyard Marriott,—,~$150,airport_shuttle,Yes,https://www.booking.com/hotel/co/courtyard-by-marriott-bogota-airport.en-gb.html
Americas,Peru,Lima,Jorge Chávez International (LIM),—,—,Sleepover Pods,—,~$15 (1h),~$70,terminal_connected,Yes,https://www.booking.com/hotel/pe/sleep-n-fly-lounge-sleep-amp-showers-new-lima-airport-int-l-terminal-landside.en-gb.html
Americas,Peru,Lima,Jorge Chávez International (LIM),—,—,Costa del Sol Wyndham Lima Airport,—,—,~$165,terminal_connected,Yes,https://bookings.costadelsolperu.com/hotel-wyndham-grand-costa-del-sol-lima-airport
Europe,Austria,Vienna,Vienna International (VIE),—,—,NH Vienna Airport Conference Center,—,—,~$250,walkable,Yes,https://www.booking.com/hotel/at/nhviennaairport.en-gb.html
Europe,Austria,Vienna,Vienna International (VIE),—,—,Zzzleepandgo Wien Airport,—,—,~$90,terminal_connected,Yes,https://www.booking.com/hotel/at/zzzleepandgo-wien-airport.th.html
Europe,Austria,Vienna,Vienna International (VIE),—,—,MOXY Vienna Airport,—,—,~$200,walkable,Yes,https://www.booking.com/hotel/at/moxy-vienna-airport.en-gb.html
Europe,Belgium,Brussels,Brussels Airport (BRU),—,—,Sheraton Brussels Airport Hotel,—,—,~$210,walkable,Yes,https://www.booking.com/hotel/be/sheratonbrusselsairport.en-gb.html
Europe,Denmark,Copenhagen,Copenhagen Airport (CPH),—,—,Clarion Hotel Copenhagen Airport,—,—,~$220,terminal_connected,Yes,https://www.booking.com/hotel/dk/clarion-hotel-copenhagen-airport.en-gb.html
Europe,Denmark,Copenhagen,Copenhagen Airport (CPH),—,—,Comfort Hotel Copenhagen Airport,—,—,~$220,terminal_connected,Yes,https://www.booking.com/hotel/dk/comfort-copenhagen-airport.en-gb.html
Europe,Finland,Helsinki,Helsinki Airport (HEL),—,—,Comfort Hotel® Xpress Helsinki Airport Terminal,—,—,~$130,walkable,Yes,https://www.booking.com/hotel/fi/palace-airport.en-gb.html
Europe,Finland,Helsinki,Helsinki Airport (HEL),—,—,Clarion Hotel Helsinki Airport,—,—,~$200,terminal_connected,Yes,https://www.booking.com/hotel/fi/clarion-helsinki-airport-vantaa.en-gb.html
Europe,Finland,Helsinki,Helsinki Airport (HEL),—,—,Scandic Helsinki Airport,—,—,~$180,walkable,Yes,https://www.booking.com/hotel/fi/scandic-helsinki-airport.en-gb.html
Europe,Finland,Helsinki,Helsinki Airport (HEL),—,—,Hilton Helsinki Airport,—,—,~$200,walkable,Yes,https://www.booking.com/hotel/fi/hilton-helsinki-vantaa-airport.en-gb.html
Europe,France,Paris,Charles de Gaulle (CDG),YotelAir Paris,Terminal 2E,—,—,~$20,~$150,airside,No,https://www.booking.com/hotel/fr/yotel-paris-charles-de-gaulle.en-gb.html
Europe,France,Paris,Charles de Gaulle (CDG),—,—,Sheraton Paris Airport Hotel,—,—,~$230,terminal_landside,Yes,https://www.booking.com/hotel/fr/sheratonparisairport.en-gb.html
Europe,Germany,Berlin,Berlin Brandenburg (BER),—,—,Steigenberger Airport Hotel Berlin,—,—,~$200,terminal_connected,Yes,https://www.booking.com/hotel/de/steigenberger-airport-berlin-schonefeld.en-gb.html
Europe,Germany,Frankfurt,Frankfurt Airport (FRA),MyCloud Transit Hotel,Terminal 1 Z,—,—,—,~$220,airside,No,https://www.booking.com/hotel/de/my-cloud-transit.en-gb.html
Europe,Germany,Frankfurt,Frankfurt Airport (FRA),—,—,Hilton Frankfurt Airport,—,—,~$250,terminal_connected,Yes,https://www.booking.com/hotel/de/hilton-frankfurt-airport-frankfurt-am-main.en-gb.html
Europe,Germany,Frankfurt,Frankfurt Airport (FRA),—,—,Hilton Garden Inn Frankfurt Airport,—,—,~$190,terminal_connected,Yes,https://www.booking.com/hotel/de/hilton-garden-inn-frankfurt-airport-frankfurt-am-main.en-gb.html
Europe,Germany,Frankfurt,Frankfurt Airport (FRA),—,—,Frankfurt Airport Marriott Hotel,—,—,~$450,terminal_connected,Yes,https://www.booking.com/hotel/de/frankfurt-airport-marriott.en-gb.html
Europe,Germany,Frankfurt,Frankfurt Airport (FRA),—,—,Sheraton Frankfurt Airport Hotel & Conference Center,—,—,~$400,terminal_connected,Yes,https://www.booking.com/hotel/de/frankfurt_sheratontowersairport.en-gb.html
Europe,Germany,Munich,Munich Airport (MUC),,—,Hilton Munich Airport,—,—,~$240,terminal_connected,Yes,https://www.hilton.com/en/book/reservation/rooms/
Europe,Germany,Munich,Munich Airport (MUC),NapCabs,Terminal 2,—,—,~$20 (1h),—,terminal_landside,No,https://www.napcabs.com/
Europe,Germany,Munich,Munich Airport (MUC),—,Terminal 2 Level 3,NapCabs,—,~$20 (1h),—,terminal_landside,No,https://www.napcabs.com/
Europe,Germany,Munich,Munich Airport (MUC),—,—,Novotel Muenchen Airport,—,—,~$150,walkable,Yes,https://www.booking.com/hotel/de/novotel-munchen-airport.en-gb.html
Europe,Greece,Athens,Athens International (ATH),—,—,Sofitel Athens Airport,—,—,~$260,walkable,Yes,https://www.booking.com/hotel/gr/sofitel-athens-airport.en-gb.html
Europe,Ireland,Dublin,Dublin Airport (DUB),—,—,—,Maldron Hotel Dublin Airport,—,~$180,airport_shuttle,Yes,https://bookings.maldronhotels.com/rates-room1
Europe,Ireland,Dublin,Dublin Airport (DUB),—,—,—,Clayton Hotel Dublin Airport Central,—,~$210,airport_shuttle,Yes,https://www.booking.com/hotel/ie/radisson-blu-dublin-airport.en-gb.html
Europe,Italy,Rome,Fiumicino (FCO),—,Terminal walkway (Pre-Sec),HelloSky,—,~$90 (6h),~$220,terminal_landside,No,https://hellosky.travel/
Europe,Italy,Rome,Fiumicino (FCO),—,—,Hilton Rome Airport,—,—,~$240,terminal_connected,Yes,https://www.booking.com/hotel/it/hilton-rome-airport.en-gb.html
Europe,Netherlands,Amsterdam,Schiphol (AMS),YotelAir Schiphol,Lounge 2,—,—,~$25,~$160,airside,No,https://www.booking.com/hotel/nl/yotel-schiphol.en-gb.html
Europe,Netherlands,Amsterdam,Schiphol (AMS),—,—,Sheraton Schiphol Airport Hotel,—,—,~$260,terminal_connected,Yes,https://www.booking.com/hotel/nl/sheraton.en-gb.html
Europe,Netherlands,Amsterdam,Schiphol (AMS),—,—,citizenM Schiphol Airport,—,—,~$180,walkable,Yes,https://www.booking.com/hotel/nl/citizenm-amsterdam-airport.en-gb.html
Europe,Netherlands,Amsterdam,Schiphol (AMS),—,—,Mercure Hotel Schiphol Terminal,—,—,~$250,terminal_connected,Yes,https://www.booking.com/hotel/nl/mercure-schiphol-terminal.en-gb.html
Europe,Netherlands,Amsterdam,Schiphol (AMS),—,—,Hilton Amsterdam Airport Schiphol,—,—,~$300,walkable,Yes,https://www.booking.com/hotel/nl/hilton-amsterdam-airport-schiphol.en-gb.html
Europe,Norway,Oslo,Oslo Gardermoen (OSL),—,—,Radisson Blu Airport Hotel Oslo,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/no/radisson-blu-airport-oslo.en-gb.html
Europe,Norway,Oslo,Oslo Gardermoen (OSL),—,—,Radisson Hotel & Conference Centre Oslo Airport,—,—,~$400,terminal_connected,Yes,https://www.booking.com/hotel/no/park-inn-oslo-airport.en-gb.html
Europe,Portugal,Lisbon,Humberto Delgado (LIS),—,—,Hotel Star Inn Lisbon Airport,—,—,~$150,walkable,Yes,https://www.booking.com/hotel/pt/star-inn-lisbon-smart-choice.en-gb.html
Europe,Portugal,Lisbon,Humberto Delgado (LIS),—,—,Meliá Lisboa Aeroporto,—,—,~$250,walkable,Yes,https://www.booking.com/hotel/pt/melia-lisboa-aeroporto.en-gb.html
Europe,Spain,Barcelona,Barcelona–El Prat (BCN),—,T1 Business Centre,Sleep & Fly,—,~$80 (6h),~$190,terminal_connected,Yes,https://www.booking.com/hotel/es/sleep-fly.en-gb.html
Europe,Spain,Madrid,Madrid Barajas (MAD),GettSleep Madrid,T4S,—,—,~$85 (6h),~$233,terminal_connected,No,https://www.booking.com/hotel/es/gettsleep-madrid.en-gb.html
Europe,Spain,Madrid,Madrid Barajas (MAD),—,T4 Floor -1 (Public Area),Aerotel Madrid Airport,—,~$85 (6h),~$195,terminal_connected,Yes,https://www.booking.com/hotel/es/air-rooms-madrid.en-gb.html
Europe,Switzerland,Zurich,Zurich Airport (ZRH),—,—,Radisson Blu Zurich Airport,—,—,~$260,terminal_connected,Yes,https://www.booking.com/hotel/ch/radisson-sas-zurich-airport.en-gb.html
Europe,Switzerland,Zurich,Zurich Airport (ZRH),—,—,Capsule Hotel - Alpine Garden Zurich Airport,—,—,~$100,terminal_landside,Yes,https://app.mews.com/distributor/ba93b5d0-153a-483f-b6d2-ad43008bb783
Europe,Switzerland,Zurich,Zurich Airport (ZRH),—,—,Hyatt Place Zurich Airport The Circle,—,—,~$250,walkable,Yes,https://www.booking.com/hotel/ch/hyatt-place-zurich-airport-the-circle.en-gb.html
Europe,Switzerland,Zurich,Zurich Airport (ZRH),—,—,Hyatt Regency Zurich Airport The Circle,—,—,~$250,walkable,Yes,https://www.booking.com/hotel/ch/hyatt-regency-zurich-airport-circle.en-gb.html
Europe,Switzerland,Zurich,Zurich Airport (ZRH),Transit Hotel,Gates B/D,—,—,~$60 (6h),~$120,airside,No,https://www.flughafen-zuerich.ch/en/passengers/practical/services/services-for-travellers/transit-hotel-and-dayrooms
Europe,Turkey,Istanbul,Istanbul Airport (IST),YOTELAIR Istanbul,Duty Free Area,—,—,~$130 (6h),~$280,airside,No,https://www.booking.com/hotel/tr/yotelair-istanbul-airport-airside.en-gb.html
Europe,Turkey,Istanbul,Istanbul Airport (IST),—,—,YOTEL Istanbul,—,~$110 (6h),~$240,terminal_landside,Yes,https://www.booking.com/hotel/tr/yotel-istanbul-airport-landside.en-gb.html
Europe,United Kingdom,London,Heathrow (LHR),Aerotel Heathrow,Terminal 3,—,—,~$25,~$170,airside,No,https://www.myaerotel.com/en-uk/find/americas-europe/united-kingdom/london/aerotel-london
Europe,United Kingdom,London,Heathrow (LHR),—,—,Hilton Garden Inn Heathrow T2/T3,—,—,~$220,terminal_connected,Yes,https://www.booking.com/hotel/gb/hilton-garden-inn-london-heathrow-terminal-2.en-gb.html
Europe,United Kingdom,London,Heathrow (LHR),—,—,Sofitel London Heathrow,—,—,~$240,terminal_connected,Yes,https://www.booking.com/hotel/gb/london-heathrow-t5-open-spring-2008.en-gb.html
Europe,United Kingdom,London,Heathrow (LHR),No.1 Lounge Rooms,T3 Airside,—,—,~$110 (6h),—,airside,No,https://no1lounges.com/lounges-by-location/no1-lounge-at-heathrow-t2/
Europe,United Kingdom,Manchester,Manchester Airport (MAN),—,—,Radisson Blu Manchester Airport,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/gb/radisson-sas-manchester-airport.html
Middle East,Bahrain,Manama,Bahrain International (BAH),—,—,Mövenpick Hotel Bahrain,—,—,~$150,walkable,Yes,https://www.booking.com/hotel/bh/moevenpick-bahrain.en-gb.html
Middle East,Bahrain,Manama,Bahrain International (BAH),Bahrain Airport Hotel,,—,—,~$80 (6h),~$180,airside,No,https://www.booking.com/hotel/bh/bahrain-airport.en-gb.html
Middle East,Kuwait,Kuwait City,Kuwait International (KWI),—,—,Safir Airport Hotel,—,—,~$170,terminal_landside,Yes,https://www.safirhotels.com/en
Middle East,Oman,Muscat,Muscat International (MCT),Aerotel Muscat,Airside transit zone,—,—,~$25,~$160,airside,No,https://www.booking.com/hotel/om/aerotel-muscat.en-gb.html
Middle East,Qatar,Doha,Hamad International (DOH),Oryx Airport Hotel,Airside terminal,—,—,—,~$310,airside,No,https://www.booking.com/hotel/qa/the-airport.en-gb.html
Middle East,Qatar,Doha,Hamad International (DOH),Sleepover Doha North Node,North Node,—,—,~$20,—,airside,No,https://www.airport-sleepover.com/en/terminals/doha-north
Middle East,Saudi Arabia,Jeddah,King Abdulaziz International (JED),Aerotel Jeddah,T1 Transit Area,—,—,~$90 (6h),~$190,airside,No,https://www.myaerotel.com/en-uk/find/middle-east/saudi-arabia/jeddah/aerotel-jeddah
Middle East,Saudi Arabia,Riyadh,King Khalid International (RUH),—,—,—,Riyadh Airport Marriott,—,~$200,airport_compound,Yes,https://www.booking.com/hotel/sa/marriott-airport-riyadh.en-gb.html
Middle East,United Arab Emirates,Abu Dhabi,Abu Dhabi International (AUH),AUHotel,Midfield Terminal,—,—,—,~$220,airside,No,https://www.booking.com/hotel/ae/auhotel.en-gb.html
Middle East,United Arab Emirates,Abu Dhabi,Abu Dhabi International (AUH),Aerotel Abu Dhabi,Terminal 1,—,—,~$25,~$170,airside,No,https://aerotel-abu-dhabi.abudhabi-hotels-ae.com/en/
Middle East,United Arab Emirates,Abu Dhabi,Abu Dhabi International (AUH),Aerotel Abu Dhabi,Terminal 3,—,—,~$20,—,airside,No,https://aerotelabutransit.abudhabitophotels.com/en/
Middle East,United Arab Emirates,Abu Dhabi,Abu Dhabi International (AUH),—,—,—,Premier Inn Abu Dhabi Airport,—,~$95,airport_shuttle,Yes,https://www.booking.com/hotel/ae/premier-inn-abu-dhabi-international-airport.en-gb.html
Middle East,United Arab Emirates,Dubai,Dubai International (DXB),Dubai International Hotel,Terminal 3 Airside,—,—,—,~$250,airside,No,https://www.dihdxb.ae/
Middle East,United Arab Emirates,Dubai,Dubai International (DXB),Sleepover,Terminal 1-D Gates,—,—,~$20,—,terminal_landside,No,https://www.airport-sleepover.com/en/terminals/dubai-terminal-1-concourse-d
Middle East,United Arab Emirates,Dubai,Dubai International (DXB),Sleepover,Terminal 3-B Gates,—,—,~$20,—,terminal_landside,No,https://www.airport-sleepover.com/en/terminals/dubai-terminal-3-concourse-b
Middle East,United Arab Emirates,Sharjah,Sharjah International (SHJ),—,—,Centro Sharjah,—,—,~$150,airport_compound,Yes,https://www.booking.com/hotel/ae/centro-sharjah-airport-sharjah.en-gb.html
Africa,Egypt,Cairo,Cairo International (CAI),—,—,Le Méridien Cairo Airport,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/eg/le-meridien-cairo-airport.en-gb.html
Africa,Egypt,Cairo,Cairo International (CAI),—,—,Le Passage Cairo Hotel & Casino,—,—,~$100,airport_compound,Yes,https://www.booking.com/hotel/eg/le-passage-cairo-hotel.en-gb.html
Africa,Egypt,Cairo,Cairo International (CAI),—,—,Novotel Cairo Airport,—,—,~$100,airport_compound,Yes,https://www.booking.com/hotel/eg/novotel-cairo-airport.en-gb.html
Africa,Ethiopia,Addis Ababa,Bole International (ADD),Skylight In-Terminal Hotel,Airside terminal,—,—,—,~$130,airside,No,https://www.booking.com/hotel/et/ethiopian-skylight.en-gb.html
Africa,Nigeria,Lagos,Murtala Muhammed International (LOS),—,—,—,Legend Hotel Lagos Airport,—,~$170,airport_compound,Yes,https://www.booking.com/hotel/ng/legend-lagos-airport-curio-collection-by-hilton.en-gb.html
Africa,South Africa,Johannesburg,OR Tambo International (JNB),—,—,City Lodge Hotel OR Tambo,—,—,~$140,airport_compound,Yes,https://www.booking.com/hotel/za/city-lodge-at-or-tambo-international-airport.en-gb.html
Africa,South Africa,Johannesburg,OR Tambo International (JNB),—,—,InterContinental Johannesburg O.R.Tambo Airport by IHG,—,—,~$500,airport_compound,Yes,https://www.booking.com/hotel/za/intercontinental-johannesburg-o-r-tambo.en-gb.html
Africa,South Africa,Johannesburg,OR Tambo International (JNB),—,—,Southern Sun O.R. Tambo International Airport,—,—,~$130,airport_compound,Yes,https://www.booking.com/hotel/za/southern-sun-or-tambo-international-airport.en-gb.html
Africa,Kenya,Nairobi,Jomo Kenyatta International (NBO),—,—,Four Points by Sheraton Nairobi Airport,—,—,~$300,airport_compound,Yes,https://www.booking.com/hotel/ke/four-points-by-sheraton-nairobi-airport.en-gb.html
Africa,Kenya,Nairobi,Jomo Kenyatta International (NBO),—,—,Crowne Plaza Nairobi Airport by IHG,—,—,~$190,airport_compound,Yes,https://www.booking.com/hotel/ke/the-lazizi-premiere-nairobi.html
Asia,China,Beijing,Beijing Daxing (PKX),—,—,Meichen Hotel Beijing Daxing International Airport,—,—,~$80,terminal_landside,Yes,https://www.booking.com/hotel/cn/bei-jing-ao-tu-ji-chang-jiu-dian.en-gb.html
Asia,China,Beijing,Beijing Daxing (PKX),—,2F NE Pier,Aerotel Beijing Daxing,—,~$100 (6h),~$160,terminal_landside,Yes,https://www.agoda.com/aerotel-beijing/hotel/langfang-cn.html
Asia,China,Shenzhen,Shenzhen Bao'an (SZX),—,—,Hyatt House Shenzhen Airport,—,—,~$180,terminal_connected,Yes,https://www.booking.com/hotel/cn/shen-zhen-ji-chang-kai-yue-jia-yu-jiu-dian.en-gb.html
Asia,China,Guangzhou,Guangzhou (CAN),—,—,Pullman Guangzhou Airport,—,—,~$140,terminal_connected,Yes,https://www.booking.com/hotel/cn/baiyun-airport-guangzhou.en-gb.html
Asia,China,Shanghai,Shanghai (PVG),—,—,Dazhong Airport Hotel South Building,—,—,~$120,airport_compound,Yes,https://www.agoda.com/da-zhong-pudong-airport-hotel-shanghai/hotel/shanghai-cn.html
Asia,China,Shanghai,Shanghai (PVG),—,—,Holiday Inn Shanghai Pudong Airport an IHG Hotel,—,—,~$120,airport_compound,Yes,https://www.booking.com/hotel/cn/holiday-inn-shanghai-pudong-airport-an-ihg.en-gb.html
Asia,China,Shanghai,Shanghai (PVG),—,—,Ramada Pudong Airport Shanghai,—,—,~$70,airport_compound,Yes,https://www.booking.com/hotel/cn/ramada-pudong-airport-shanghai.en-gb.html
Asia,Hong Kong,Hong Kong,Hong Kong International (HKG),—,—,Regal Airport Hotel,—,—,~$220,terminal_connected,Yes,https://www.booking.com/hotel/hk/regal-airport.en-gb.html
Asia,India,Delhi,Indira Gandhi (DEL),Holiday Inn Express Transit Hotel,Terminal 3,—,—,~$20,~$140,airside,No,https://www.booking.com/hotel/in/eaton-smart-new-delhi-airport.en-gb.html
Asia,India,Delhi,Indira Gandhi (DEL),—,—,—,Centaur Hotel New Delhi Airport,—,~$70,airport_compound,Yes,https://www.agoda.com/centaur-hotel/hotel/new-delhi-and-ncr-in.html
Asia,India,Mumbai,Chhatrapati Shivaji (BOM),Niranta Transit Hotel,Terminal 2,—,—,~$25,~$150,airside,No,https://www.booking.com/hotel/in/niranta-airport-transit-international-wing.en-gb.html
Asia,Indonesia,Bali,Ngurah Rai (DPS),—,—,Novotel Bali Ngurah Rai Airport,—,—,~$170,terminal_connected,Yes,https://www.booking.com/hotel/id/novotel-bali-ngurah-rai-airport-opening-june-2016.id.html
Asia,Indonesia,Bali,Ngurah Rai (DPS),—,—,PassGo Pods,—,—,~$34,terminal_landside,Yes,https://www.booking.com/hotel/id/passgo-digital-airport-bali.en-gb.html
Asia,Indonesia,Jakarta,Soekarno–Hatta (CGK),PassGo Pods,T3 Arrivals (Verify Visa),,—,~$40 (6h),—,terminal_landside,Yes,https://www.booking.com/hotel/id/passgo-digital-airport-terminal-2-soekarno-hatta.en-gb.html
Asia,Indonesia,Jakarta,Soekarno–Hatta (CGK),—,Terminal 2,Jakarta Airport Hotel,—,—,~$57,terminal_connected,Yes,https://www.booking.com/hotel/id/jakarta-airport-hotel.en-gb.html
Asia,Indonesia,Jakarta,Soekarno–Hatta (CGK),—,—,Grand Anara Airport Hotel,—,—,~$80,terminal_connected,Yes,https://www.booking.com/hotel/id/grand-anara-airport.en-gb.html
Asia,Indonesia,Jakarta,Soekarno–Hatta (CGK),—,—,Anara Airport Hotel,—,—,~$180,terminal_connected,Yes,https://www.agoda.com/anara-airport-hotel-terminal-3/hotel/jakarta-id.html
Asia,Japan,Osaka,Kansai (KIX),—,—,Hotel Nikko Kansai Airport,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/jp/nikko-kansai-airport.en-gb.html
Asia,Japan,Tokyo,Haneda (HND),—,Terminal 1,First Cabin Haneda,—,~$30,~$130,terminal_landside,Yes,https://www.booking.com/hotel/jp/huasutokiyabinyu-tian-taminaru1-dong-jing.en-gb.html
Asia,Japan,Tokyo,Haneda (HND),—,—,Royal Park Hotel The Haneda,—,—,~$230,terminal_connected,Yes,https://www.booking.com/hotel/jp/royal-park-the-haneda.en-gb.html
Asia,Japan,Tokyo,Haneda (HND),—,—,Haneda Excel Hotel Tokyu,—,—,~$160,terminal_connected,Yes,https://www.booking.com/hotel/jp/haneda-excel-tokyu.en-gb.html
Asia,Japan,Tokyo,Haneda (HND),—,—,Villa Fontaine Premier Haneda Airport,—,—,~$400,terminal_connected,Yes,https://www.booking.com/hotel/jp/villa-fontaine-premier-haneda-airport.en-gb.html
Asia,Japan,Tokyo,Narita (NRT),—,T2 Car Park Building B1,Nine Hours Narita,—,~$25,~$90,terminal_landside,Yes,https://www.booking.com/hotel/jp/nine-hours-narita-airport.en-gb.html
Asia,Japan,Tokyo,Narita (NRT),—,—,Narita Tobu Hotel Airport,—,—,~$90,airport_compound,Yes,https://www.booking.com/hotel/jp/holiday-inn-tobu-narita.en-gb.html
Asia,Uzbekistan,Tashkent,Taschkent (TAS),Khamsa hotel taschkent airoport,—,—,—,~$50 (3h),~$130,terminal_landside,No,https://khamsahotel.uz/
Asia,Kazakhstan,Almaty,Almaty (ALA),—,—,—,CAPS LOCK,—,~$60,terminal_landside,Yes,https://www.booking.com/hotel/kz/caps-lock.en-gb.html
Asia,Malaysia,Kuala Lumpur,Kuala Lumpur (KUL),Sama-Sama Express Transit Hotel,T1,—,—,~$65 (6h),~$130,airside,No,https://www.booking.com/hotel/my/sama-sama-express-klia.en-gb.html
Asia,Malaysia,Kuala Lumpur,Kuala Lumpur (KUL),Sama-Sama Express Transit Hotel,T2,—,—,~$65 (6h),~$130,airside,No,https://www.agoda.com/sama-sama-express-klia2-airside-transit-hotel/hotel/kuala-lumpur-my.html
Asia,Malaysia,Kuala Lumpur,Kuala Lumpur (KUL),—,—,Aerotel Kuala Lumpur,—,—,~$90,terminal_connected,Yes,https://www.booking.com/hotel/my/aerotelmalaysia.en-gb.html
Asia,Philippines,Manila,Ninoy Aquino (MNL),—,—,Belmont Hotel Manila,—,—,~$120,airport_shuttle,Yes,https://www.booking.com/hotel/ph/belmont-hotels-and-resorts.en-gb.html
Asia,Philippines,Manila,Ninoy Aquino (MNL),—,—,Sheraton Manila Hotel at Newport World Resorts,—,—,~$200,airport_shuttle,Yes,https://www.booking.com/hotel/ph/sheraton-manila.en-gb.html
Asia,Philippines,Manila,Ninoy Aquino (MNL),—,—,Holiday Inn Express Manila Newport World Resorts by IHG,—,—,~$100,airport_shuttle,Yes,https://www.booking.com/hotel/ph/remington.en-gb.html
Asia,Singapore,Singapore,Changi Airport (SIN),Aerotel Singapore,Terminal 1,—,—,~$25,~$160,airside,No,https://www.booking.com/hotel/sg/aerotel-singapore.en-gb.html
Asia,Singapore,Singapore,Changi Airport (SIN),Ambassador Transit Hotel,Terminal 2,—,—,~$20,~$150,airside,No,https://www.booking.com/hotel/sg/ambassador-transit-terminal-2.en-gb.html
Asia,Singapore,Singapore,Changi Airport (SIN),—,—,YOTELAIR Singapore Changi Airport,—,—,~$180,terminal_connected,Yes,https://www.booking.com/hotel/sg/yotelair-singapore-changi-airport.en-gb.html
Asia,Singapore,Singapore,Changi Airport (SIN),—,—,Crowne Plaza Changi Airport,—,—,~$230,terminal_connected,Yes,https://www.booking.com/hotel/sg/crowne-plaza-changi-airport.en-gb.html
Asia,South Korea,Seoul,Incheon (ICN),Transit Hotel,Terminal 1,—,—,~$25,~$130,terminal_landside,No,https://www.booking.com/hotel/kr/incheon-airport-transit.en-gb.html
Asia,South Korea,Seoul,Incheon (ICN),Incheon Airport Transit Hotel,Terminal 2,—,—,~$25,~$130,terminal_landside,No,https://www.agoda.com/incheon-airport-transit-hotel-terminal-2/hotel/incheon-kr.html
Asia,South Korea,Seoul,Incheon (ICN),—,—,Grand Hyatt Incheon,—,—,~$230,airport_compound,Yes,https://www.agoda.com/grand-hyatt-incheon/hotel/incheon-kr.html
Asia,South Korea,Seoul,Incheon (ICN),—,—,ibis Styles Ambassador,—,—,~$100,airport_compound,Yes,https://www.booking.com/hotel/kr/ibis-styles-ambassador-incheon-airport.en-gb.html
Asia,Taiwan,Taipei,Taoyuan International (TPE),Plaza Premium / CHO,T2 Airside,—,—,~$90 (6h),~$180,airside,No,https://www.booking.com/hotel/tw/ting-cao-xiu-xing-guan.en-gb.html
Asia,Taiwan,Taipei,Taoyuan International (TPE),—,—,Hyatt Regency Taoyuan International Airport,—,—,~$200,airport_compound,Yes,https://www.booking.com/hotel/tw/hyatt-regency-taoyuan-international-airport.en-gb.html
Asia,Thailand,Bangkok,Suvarnabhumi (BKK),—,Basement B (ARL Station),Boxtel,—,~$45 (4h),~$90,terminal_landside,Yes,https://www.booking.com/hotel/th/boxtel-suvarnabhumi.en-gb.html
Asia,Thailand,Bangkok,Suvarnabhumi (BKK),—,—,Hyatt Regency Bangkok Suvarnabhumi Airport,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/th/hyatt-regency-bangkok-suvarnabhumi-airport.en-gb.html
Asia,Vietnam,Ho Chi Minh City,Tan Son Nhat (SGN),—,—,—,Ibis Saigon Airport,—,~$120,airport_shuttle,Yes,https://www.booking.com/hotel/vn/ibis-saigon-airport.en-gb.html
Oceania,Australia,Brisbane,Brisbane Airport (BNE),—,—,Pullman Brisbane Airport,—,—,~$210,airport_compound,Yes,https://www.booking.com/hotel/au/pullman-brisbane-airport.en-gb.html
Oceania,Australia,Brisbane,Brisbane Airport (BNE),—,—,Ibis Brisbane Airport,—,—,~$140,walkable,Yes,https://www.booking.com/hotel/au/ibis-brisbane-airport.en-gb.html
Oceania,Australia,Melbourne,Melbourne Airport (MEL),—,—,Parkroyal Melbourne Airport,—,—,~$220,terminal_connected,Yes,https://www.booking.com/hotel/au/parkroyal-melbourne-airport.en-gb.html
Oceania,Australia,Melbourne,Melbourne Airport (MEL),—,—,Holiday Inn Melbourne Airport,—,—,~$170,walkable,Yes,https://www.booking.com/hotel/au/holiday-inn-melbourne-airport.en-gb.html
Oceania,Australia,Sydney,Sydney Kingsford Smith (SYD),—,Terminal 1 Arrivals,Aerotel Sydney,—,~$105 (6h),~$235,terminal_landside,Yes,https://www.booking.com/hotel/au/aerotel-sydney-arrivals-b-international-terminal-1.en-gb.html
Oceania,Australia,Sydney,Sydney Kingsford Smith (SYD),—,—,Rydges Sydney Airport,—,—,~$210,walkable,Yes,https://www.booking.com/hotel/au/rydges-sydney-airport.en-gb.html
Oceania,New Zealand,Auckland,Auckland Airport (AKL),—,—,Novotel Auckland Airport,—,—,~$210,terminal_connected,Yes,https://www.booking.com/hotel/nz/novotel-auckland-airport.en-gb.html
Oceania,New Zealand,Auckland,Auckland Airport (AKL),—,—,Ibis Budget Auckland Airport,—,—,~$120,walkable,Yes,https://www.booking.com/hotel/nz/pullman-auckland-airport.en-gb.html`;

function extractAirportCode(airportField) {
  if (!airportField) return null;
  const match = airportField.match(/\(([A-Z]{3,4})\)$/);
  return match ? match[1] : null;
}

function extractAirportName(airportField) {
  if (!airportField) return null;
  return airportField.replace(/\s*\([A-Z]{3,4}\)$/, '').trim();
}

function slugify(name, code) {
  if (!name) return code?.toLowerCase() || '';
  return (name + ' ' + code)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const airportsMap = new Map();
const properties = [];
let propertyIdCounter = 1;

const rows = rawData.trim().split('\n');

for (const row of rows) {
  const parts = row.split(',');
  if (parts.length < 13) continue;

  const region = parts[0];
  const country = parts[1];
  const city = parts[2];
  const airportField = parts[3];
  const airportCode = extractAirportCode(airportField);
  const airportName = extractAirportName(airportField);

  if (!airportCode || !airportName) continue;

  if (!airportsMap.has(airportCode)) {
    airportsMap.set(airportCode, {
      airport_code: airportCode,
      airport_name: airportName,
      city: city || null,
      country: country || null,
      region: region || null,
      slug: slugify(airportName, airportCode)
    });
  }

  const airsideProperty = parts[4] && parts[4] !== '—' ? parts[4].trim() : null;
  const landsideAttached = parts[6] && parts[6] !== '—' ? parts[6].trim() : null;
  const landsideShuttle = parts[7] && parts[7] !== '—' ? parts[7].trim() : null;

  const propertyName = airsideProperty || landsideAttached || landsideShuttle;

  if (!propertyName) continue;

  const gateInfo = parts[5] && parts[5] !== '—' ? parts[5].trim() : null;
  const hourlyRate = parts[8] && parts[8] !== '—' ? parts[8] : null;
  const dailyRateStr = parts[9] && parts[9] !== '—' ? parts[9] : null;
  const dailyRate = dailyRateStr ? parseFloat(dailyRateStr.replace(/[^0-9.]/g, '')) : null;
  const accessNotes = parts[10] || null;
  const mustClearImmigration = parts[11] === 'Yes';
  const bookingUrl = parts[12] || null;

  let accessType = 'terminal_connected';
  let propertyType = 'hotel';

  const notesLower = (accessNotes || '').toLowerCase();
  if (notesLower.includes('airside')) {
    accessType = 'airside';
    propertyType = airsideProperty ? 'transit_hotel' : 'hotel';
  } else if (notesLower.includes('terminal_connected')) {
    accessType = 'terminal_connected';
  } else if (notesLower.includes('terminal_landside')) {
    accessType = 'terminal_landside';
  } else if (notesLower.includes('walkable')) {
    accessType = 'walkable';
  } else if (notesLower.includes('airport_compound')) {
    accessType = 'airport_compound';
  } else if (notesLower.includes('airport_shuttle')) {
    accessType = 'airport_shuttle';
  }

  const nameLower = propertyName.toLowerCase();
  if (nameLower.includes('pod') || nameLower.includes('capsule')) {
    propertyType = nameLower.includes('capsule') ? 'capsule_hotel' : 'sleep_pods';
  } else if (nameLower.includes('transit') || accessType === 'airside') {
    propertyType = 'transit_hotel';
  } else if (nameLower.includes('lounge') && (nameLower.includes('sleep') || nameLower.includes('rest'))) {
    propertyType = 'sleep_lounge';
  }

  const propertyId = airportCode.toLowerCase() + '-' + propertyIdCounter;
  propertyIdCounter++;

  properties.push({
    property_id: propertyId,
    airport_code: airportCode,
    airport_name: airportName,
    region: region || null,
    country: country || null,
    city: city || null,
    property_name: propertyName,
    property_type: propertyType,
    access_type: accessType,
    gate_info: gateInfo,
    must_clear_immigration_first: mustClearImmigration,
    estimated_rate_hourly: hourlyRate,
    estimated_rate_daily: dailyRate,
    currency: 'USD',
    access_notes: accessNotes,
    booking_or_ota_url: bookingUrl,
    is_active: true
  });
}

const airports = Array.from(airportsMap.values()).sort((a, b) =>
  a.airport_name.localeCompare(b.airport_name)
);

writeFileSync('./data/airports.json', JSON.stringify({ airports }, null, 2));
writeFileSync('./data/properties.json', JSON.stringify({ properties }, null, 2));

console.log('Created airports.json with ' + airports.length + ' airports');
console.log('Created properties.json with ' + properties.length + ' properties');
console.log('\nSample airports:');
airports.slice(0, 5).forEach(a => console.log('  - [' + a.airport_code + '] ' + a.airport_name + ', ' + a.city + ', ' + a.country));
console.log('\nSample properties:');
properties.slice(0, 5).forEach(p => console.log('  - [' + p.airport_code + '] ' + p.property_name + ' (' + p.property_type + ', ' + p.access_type + ')'));
