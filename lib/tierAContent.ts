// =============================================================================
// TIER A CONTENT — Deep, page-specific content for 6 cities × 4 services
//
// Each entry provides:
//   intro        — Rewritten, page-specific intro paragraph (replaces template)
//   buildingCallouts — Named buildings / complexes / streets specific to this
//                      city × service combo (rendered as a callout block)
//   extraFaqs    — 2 hyper-local FAQs that could only be answered by someone
//                  who actually operates in this city for this service
//   pricingNote  — City-calibrated pricing note (appended to pricing strip)
//
// Key: `${citySlug}-${serviceKey}` e.g. "seattle-residential"
// =============================================================================

export interface TierAEntry {
  intro: string;
  buildingCalloutsHeading: string;
  buildingCallouts: string;
  extraFaqs: { q: string; a: string }[];
  pricingNote?: string;
}

export const TIER_A_CONTENT: Record<string, TierAEntry> = {

  // ──────────────────────────────────────────────────────────────────────────
  // SEATTLE
  // ──────────────────────────────────────────────────────────────────────────

  "seattle-residential": {
    intro: `Seattle's residential neighborhoods each impose their own logistical demands, and the difference between a smooth move and a stressful one often comes down to whether your moving company has done it before. Capitol Hill's dense blocks require SDOT temporary no-parking permits filed 72 hours in advance — we handle that paperwork on your behalf. Queen Anne's steep grades demand properly loaded trucks and experienced drivers who know how to position a 26-foot box truck on a hillside. Ballard and Fremont have overhead utility lines that limit truck height on certain residential streets, so we scout routes before move day. Our crews have been navigating Seattle's neighborhoods since 2009, and that institutional knowledge is built into every quote we give.`,
    buildingCalloutsHeading: "Seattle Neighborhoods We Know Best",
    buildingCallouts: `We move homes in every Seattle neighborhood, but some areas come up most often: Capitol Hill (permit coordination on Broadway and Pine), Queen Anne (steep lots on 1st Ave N and Taylor Ave N), Ballard (narrow residential streets in the 24th Ave NW corridor), Magnolia (long driveways and limited street access), Beacon Hill (steep grades and parking restrictions near the light rail station), and South Lake Union (new construction with loading dock coordination). If your home is in any of these areas, mention it when you request a quote — we'll flag any access issues before move day.`,
    extraFaqs: [
      {
        q: "Do you handle the SDOT parking permit for Seattle home moves?",
        a: "Yes. For moves in Capitol Hill, Belltown, First Hill, and other dense Seattle neighborhoods where street parking is limited, we file the SDOT temporary no-parking permit on your behalf. The permit reserves curb space for our truck so we can park directly in front of your home. We handle the application, the fee, and the posting — you don't have to do anything.",
      },
      {
        q: "Can you move a home on Queen Anne's steep streets?",
        a: "Yes — Queen Anne is one of our most active areas. We use properly loaded trucks with weight distributed toward the rear for steep-grade streets, and our drivers are trained on the specific grades on Taylor Ave N, 1st Ave N, and Queen Anne Ave N. We also carry wheel chocks and use them on every steep-street job. Call us to discuss your specific address and we'll confirm the right truck size.",
      },
    ],
    pricingNote: "Seattle rates reflect SDOT permit costs where applicable.",
  },

  "seattle-apartment": {
    intro: `Seattle's apartment market is among the most active in the country, and the logistics vary dramatically by building and neighborhood. South Lake Union high-rises — including buildings in the Amazon campus corridor — require elevator reservations booked 48–72 hours in advance and enforce strict move-in windows, typically 8 a.m. to 5 p.m. on weekdays. Capitol Hill buildings like AVA Capitol Hill and The Danforth have their own COI requirements that name the building as additional insured. Ballard and Fremont low-rises have narrower truck access and often no freight elevator, which means stair carries and careful furniture disassembly. We call the building management before every move to confirm requirements, so none of it lands on you.`,
    buildingCalloutsHeading: "Seattle Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Seattle apartment buildings and their specific requirements: Modera Ballard (elevator reservation, 4-hour window), AVA Capitol Hill (COI required, named insured), The Danforth (elevator key from management), Cascade Tower in South Lake Union (loading dock coordination, 2-hour window), Insignia Towers in Belltown (elevator reservation, $500 damage deposit), and 2nd & Pike in Downtown (street-level loading only, no dock). If your building isn't on this list, we'll call them directly — we do this for every move.`,
    extraFaqs: [
      {
        q: "My Seattle apartment building requires a certificate of insurance. Can you provide one?",
        a: "Yes. We carry general liability and cargo insurance and can provide a certificate of insurance (COI) naming your building as additional insured. Most buildings require this, and we've provided COIs for hundreds of Seattle buildings. When you book, let us know your building's requirements — we'll have the COI ready before move day.",
      },
      {
        q: "What if my Seattle apartment building only allows moves on weekdays?",
        a: "Many Seattle high-rises restrict moves to weekday business hours. We work Monday through Sunday and can accommodate weekday moves with advance notice. If your building has a specific move-in window (e.g., 8 a.m.–5 p.m. weekdays only), we'll schedule your move to start early enough to complete within that window. Let us know your building's restrictions when you request a quote.",
      },
    ],
    pricingNote: "Elevator reservation fees (if charged by building) are not included in our quote.",
  },

  "seattle-commercial": {
    intro: `Seattle's commercial moving market is shaped by its tech-heavy economy and the density of its office corridors. South Lake Union — home to Amazon's headquarters and dozens of tech companies — has loading dock schedules that require advance coordination and often restrict moves to off-peak hours. The Pioneer Square and Downtown core have street-level loading restrictions that require permits on certain blocks. Capitol Hill's Pike/Pine corridor has narrow alleys and limited truck access that require smaller vehicles for the final approach. Our commercial crews have relocated offices for companies ranging from five-person startups to 200-person teams, and we've done it in every major Seattle office building. We work evenings and weekends to keep your business running.`,
    buildingCalloutsHeading: "Seattle Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with loading dock procedures and building requirements at: 1201 Third Avenue (after-hours loading dock, security escort required), Columbia Center (freight elevator reservation, 2-hour window), Amazon Day 1 Tower area buildings (loading dock scheduling through building management), WeWork locations on Capitol Hill and South Lake Union (standard COI, coordinate with community manager), and Pioneer Square buildings (street-level loading, SDOT permit required on certain blocks). For any Seattle office move, we recommend a free on-site walkthrough 1–2 weeks before your move date.`,
    extraFaqs: [
      {
        q: "Can you move our Seattle office over a weekend to avoid business disruption?",
        a: "Yes — weekend moves are our most common request for Seattle office relocations. We work Saturday and Sunday, and we can start as early as 6 a.m. to maximize your available time. Most Seattle office buildings allow weekend access with advance notice to building management. We'll coordinate directly with your building's security or property manager to confirm access.",
      },
      {
        q: "Do you handle IT equipment and server moves in Seattle?",
        a: "Yes. Our commercial crews are trained on IT equipment handling — monitors are wrapped and crated, towers are padded and secured upright, and server racks are handled with anti-static precautions. We do not disconnect or reconnect networking equipment, but we work alongside your IT team and can coordinate timing around their schedule. For server room moves, we recommend a pre-move walkthrough with your IT lead.",
      },
    ],
    pricingNote: "Commercial rates include 2-person crew minimum. Larger crews quoted on-site.",
  },

  "seattle-packing": {
    intro: `Professional packing in Seattle is more nuanced than it looks. Capitol Hill apartments often have narrow hallways and tight stairwells that require furniture disassembly before packing can begin. South Lake Union high-rises have strict move-out inspection requirements, so every item needs to be packed in a way that prevents wall and floor damage during the carry-out. Ballard craftsman homes frequently have fragile vintage fixtures and antique furniture that require specialty wrapping. Our packing crews bring all materials — boxes, tape, bubble wrap, packing paper, wardrobe boxes, and specialty dish packs — and they're trained to pack for both protection and efficient loading. We also offer a fragile-only option for customers who want to pack most items themselves.`,
    buildingCalloutsHeading: "Packing Services Across Seattle Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Seattle and are experienced with the specific challenges of each area: Capitol Hill and First Hill (tight stairwells, narrow hallways requiring furniture disassembly before packing), Magnolia and Madison Park (large homes with extensive art collections and antique furniture), Ballard and Fremont (craftsman homes with vintage fixtures and irregular-sized items), South Lake Union and Belltown (high-rise move-out inspections requiring careful floor and wall protection), and Queen Anne (steep-lot homes where packing sequence matters for load balance on the truck).`,
    extraFaqs: [
      {
        q: "How far in advance should I book packing services for a Seattle move?",
        a: "For most Seattle moves, booking 1–2 weeks in advance is sufficient. For peak season (May–September) and end-of-month dates, we recommend 3–4 weeks. If you're in a South Lake Union high-rise with a fixed move-out window, book as early as possible — we need to schedule the packing crew to finish the day before your move so the truck can load within your building's time window.",
      },
      {
        q: "Can you pack just my fragile items and art for my Seattle move?",
        a: "Yes. Fragile-only packing is one of our most popular options in Seattle, especially for homes in Magnolia, Madison Park, and Capitol Hill that have significant art collections or antique furniture. Our packers bring specialty materials — mirror boxes, dish packs, custom foam inserts, and wardrobe boxes — and they'll focus exclusively on the items you identify as fragile. Everything else you can pack yourself.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BELLEVUE
  // ──────────────────────────────────────────────────────────────────────────

  "bellevue-residential": {
    intro: `Bellevue home moves require a level of preparation that most moving companies don't provide. Somerset and Newport Hills have some of the steepest residential driveways on the Eastside — we assess access on every quote and bring the right equipment. The Crossroads and Lake Hills neighborhoods have dense townhome developments with shared driveways and HOA move-in windows that close at 5 p.m. sharp. West Bellevue and Medina have large estates with long carries and gated access that requires advance coordination with property managers. Our Redmond warehouse is five miles from central Bellevue — the closest of any major moving company — which means faster response times and lower fuel surcharges on your quote.`,
    buildingCalloutsHeading: "Bellevue Neighborhoods We Know Best",
    buildingCallouts: `We move homes throughout Bellevue and have specific experience with the access challenges in each area: Somerset (steep driveways on SE 60th St and Somerset Blvd SE, long carries), Newport Hills (narrow cul-de-sacs, limited truck turnaround), Crossroads (dense townhome complexes, shared driveways, HOA coordination), Factoria (newer construction with loading dock access for some complexes), Bridle Trails (gated community, advance notice required), and West Bellevue / Medina (large estates, long carries, private road access). Mention your neighborhood when you request a quote and we'll flag any access considerations.`,
    extraFaqs: [
      {
        q: "Do you move homes in gated Bellevue communities like Bridle Trails?",
        a: "Yes. We move in and out of gated communities throughout Bellevue regularly. For gated communities, we need the gate code or a contact number for the gate attendant — your HOA or property manager can provide this. We recommend confirming access details at least 48 hours before your move date. We've moved in Bridle Trails, Clyde Hill, and other gated Bellevue neighborhoods many times.",
      },
      {
        q: "How do you handle steep driveways in Somerset and Newport Hills?",
        a: "Steep driveways are one of the most common challenges in Bellevue's hillside neighborhoods. We assess driveway grade on every quote — if a driveway is too steep for our standard truck, we use a smaller vehicle for the driveway approach and shuttle items to the main truck on the street. We also carry wheel chocks and use them on every steep-grade job. There's no additional charge for this — it's part of our standard preparation for Bellevue hillside moves.",
      },
    ],
    pricingNote: "Bellevue rates reflect Eastside market pricing. Flat-rate quotes available.",
  },

  "bellevue-apartment": {
    intro: `Bellevue's apartment market spans a wide range — from luxury high-rises in Downtown to mid-rise complexes in Crossroads and Eastgate — and each building type has its own requirements. The Bravern and Cirrus in Downtown Bellevue require elevator reservations booked 48–72 hours in advance and enforce strict move-in windows. Bellevue Towers requires a $500 refundable damage deposit and a COI naming the building as additional insured. Crossroads and Eastgate complexes often have limited parking for moving trucks — we scout access points before move day to avoid blocking fire lanes or shared driveways. Our crews handle all building coordination before your move date so you don't have to navigate it yourself.`,
    buildingCalloutsHeading: "Bellevue Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Bellevue apartment buildings: The Bravern (elevator reservation required, 8 a.m.–5 p.m. weekday window), Cirrus (COI required, named insured, elevator reservation), Bellevue Towers (damage deposit, COI, freight elevator only), The Ashton (Crossroads area, limited truck parking, side-street access), Overlook at Eastgate (mid-rise, standard elevator reservation), and Soma Towers (Downtown Bellevue, loading dock coordination). If your building isn't listed, we'll call them directly before your move.`,
    extraFaqs: [
      {
        q: "Does The Bravern in Downtown Bellevue require special moving procedures?",
        a: "Yes. The Bravern requires elevator reservations booked at least 48 hours in advance through building management. Moves are restricted to weekday hours (typically 8 a.m.–5 p.m.), and a certificate of insurance naming The Bravern as additional insured is required. We've moved in and out of The Bravern many times and have the COI template ready. When you book, let us know your unit and we'll handle the building coordination.",
      },
      {
        q: "What's the best time to schedule a Bellevue apartment move to avoid elevator conflicts?",
        a: "Mid-week mornings (Tuesday–Thursday, starting at 8 a.m.) are the least competitive for elevator reservations in Downtown Bellevue high-rises. Friday and Monday are the most popular move days and elevator slots fill up quickly. End-of-month dates (28th–31st) are the busiest across all Bellevue buildings. If you have flexibility, a mid-week move in the middle of the month will give you the most elevator access options.",
      },
    ],
  },

  "bellevue-commercial": {
    intro: `Bellevue's commercial moving market is driven by its position as the Eastside's primary business hub. The Spring District — home to REI's headquarters, T-Mobile's campus, and dozens of tech companies — has loading dock schedules that require advance coordination and often restrict moves to after-hours or weekends. Downtown Bellevue's office towers on 106th Ave NE and Bellevue Way NE have freight elevator reservations that book out weeks in advance during peak season. The Bel-Red corridor has newer office parks with loading docks but limited street access for large trucks. Our commercial crews have relocated offices of every size in Bellevue, and we work evenings and weekends to keep your business running without interruption.`,
    buildingCalloutsHeading: "Bellevue Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with the following Bellevue office buildings and their move-in procedures: One Bellevue Center (freight elevator reservation, after-hours preferred), Lincoln Square (loading dock on NE 8th St, advance scheduling required), Skyline Tower (freight elevator, COI required), Spring District buildings (loading dock coordination through property management), T-Mobile campus (security badge coordination, after-hours access), and Eastgate office parks (surface parking, standard access). For any Bellevue commercial move, we recommend a free on-site walkthrough 2 weeks before your move date.`,
    extraFaqs: [
      {
        q: "Can you relocate our Bellevue office to the Spring District?",
        a: "Yes — the Spring District is one of our most active commercial move destinations. We're familiar with the loading dock procedures for the major Spring District buildings and have moved teams into REI's campus, T-Mobile's offices, and several tech startups in the area. We'll coordinate directly with your building's property manager and can work weekends or evenings to minimize business disruption.",
      },
      {
        q: "Do you provide chain-of-custody documentation for Bellevue office moves?",
        a: "Yes. For commercial moves that require documentation — particularly IT equipment, server moves, and confidential file transfers — we provide an itemized inventory with condition notes for every item. Each box is numbered and logged. We can also provide a signed chain-of-custody form if your company requires it for compliance purposes.",
      },
    ],
    pricingNote: "Commercial rates from $140–$180/hr (2-person crew). Free on-site estimate available.",
  },

  "bellevue-packing": {
    intro: `Bellevue homes tend to be larger and better-furnished than the regional average, which means packing takes longer and requires more specialty materials than a typical move. Somerset and Newport Hills estates often have extensive art collections, antique furniture, and custom cabinetry that require custom crating or specialty wrapping. Downtown Bellevue high-rises have strict move-out inspection requirements — every item needs to be packed and carried out in a way that prevents damage to common area walls and floors. Our Bellevue packing crews bring all materials and are trained on the full range of specialty packing: mirror boxes, dish packs, wardrobe boxes, custom foam inserts, and flat-screen TV boxes. We also offer a pack-and-move-same-day option for customers with tight schedules.`,
    buildingCalloutsHeading: "Packing Services Across Bellevue Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Bellevue and are experienced with the specific requirements of each area: Downtown Bellevue high-rises (move-out inspection compliance, floor and wall protection during carry-out), Somerset and Newport Hills (large homes, art collections, antique furniture requiring specialty wrapping), Crossroads and Eastgate (mid-size apartments and townhomes, standard packing), Factoria and Newport Hills (newer construction with oversized furniture common in recent builds), and Bridle Trails (gated community estates with extensive contents requiring full-pack service).`,
    extraFaqs: [
      {
        q: "Can you pack and move our Bellevue home on the same day?",
        a: "Yes, for homes up to 2 bedrooms. For a same-day pack-and-move, we send a larger crew — typically 3–4 people — so packing and loading can happen simultaneously. One team packs while another loads the truck. This works well for Bellevue apartments and smaller homes. For 3+ bedroom homes, we recommend packing the day before the move to ensure everything is ready when the truck arrives.",
      },
      {
        q: "Do you provide custom crating for art and antiques in Bellevue?",
        a: "Yes. For high-value art, antiques, and fragile collectibles, we offer custom crating using wood or foam-lined boxes built to the specific dimensions of your item. This is particularly common for Bellevue clients in Somerset and West Bellevue who have significant art collections. Custom crating is quoted separately — contact us with photos and dimensions of the items you need crated.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // KIRKLAND
  // ──────────────────────────────────────────────────────────────────────────

  "kirkland-residential": {
    intro: `Kirkland's residential neighborhoods range from compact bungalows in Norkirk and Houghton to large waterfront properties in Moss Bay and Highlands — and the logistical challenges vary just as widely. Downtown Kirkland's waterfront streets have limited truck parking and require early-morning scheduling to avoid tourist traffic on summer weekends. Lakeview and Highlands have steep hillside lots with long carries and limited truck access on certain streets. Juanita's older neighborhoods have narrow residential streets where we use smaller trucks for the final approach. Our crews have been moving Kirkland homes since 2009 and know every street, every HOA rule, and every access quirk in the city.`,
    buildingCalloutsHeading: "Kirkland Neighborhoods We Know Best",
    buildingCallouts: `We move homes throughout Kirkland and have specific experience with the access challenges in each area: Downtown Kirkland waterfront (limited parking on Lake St S and Central Way, early-morning scheduling recommended), Moss Bay (large waterfront properties, long carries, dock access coordination), Lakeview and Highlands (steep hillside lots, limited truck turnaround on upper streets), Juanita (narrow streets near Juanita Beach Park, smaller trucks required on some blocks), Bridle Trails (gated community, advance notice required), and Totem Lake (newer mixed-use development, standard access). Mention your neighborhood when you request a quote.`,
    extraFaqs: [
      {
        q: "Do you move homes near Kirkland's waterfront on Lake Washington?",
        a: "Yes — Kirkland's waterfront is one of our most active areas. Waterfront properties in Moss Bay and Downtown Kirkland often have dock access, steep paths to the water, and limited street parking. We assess access on every waterfront quote and bring the right equipment — dollies, furniture straps, and stair-climbing equipment — for properties with challenging approaches. We recommend scheduling waterfront moves on weekday mornings to avoid the summer tourist traffic on Lake Street.",
      },
      {
        q: "Are there HOA move-in restrictions in Kirkland's Bridle Trails neighborhood?",
        a: "Yes. Bridle Trails is a gated community with HOA move-in rules that vary by section. Most sections require advance notice to the HOA (typically 48–72 hours), a gate code or escort, and sometimes a refundable damage deposit. We handle all HOA coordination on your behalf — just provide us with your HOA contact when you book and we'll take it from there.",
      },
    ],
  },

  "kirkland-apartment": {
    intro: `Kirkland's apartment market is concentrated in two main areas: Totem Lake, near Google's major campus, and Downtown Kirkland. Totem Lake complexes — including Parkview Totem Lake and the newer mixed-use buildings on 124th Ave NE — require elevator reservations and certificates of insurance, and many have move-in windows that align with Google's campus security schedule. The Parkplace complex in Downtown Kirkland is one of the most active move locations in the city; our crews know its specific elevator booking process and the parking restrictions on the surrounding streets. We call every building before your move to confirm current requirements — policies change, and we don't want you to find out about a new COI requirement on move day.`,
    buildingCalloutsHeading: "Kirkland Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Kirkland apartment buildings: Parkplace (Downtown Kirkland, elevator reservation required, limited street parking on Central Way), Totem Lake complexes including Parkview Totem Lake (COI required, elevator reservation, 8 a.m.–5 p.m. window), Google campus-area apartments on 124th Ave NE (security coordination, COI required), Juanita Village (mid-rise, standard elevator reservation), and Houghton-area complexes (older buildings, no freight elevator, stair carries common). If your building isn't listed, we'll call them directly.`,
    extraFaqs: [
      {
        q: "Do you move in and out of the Parkplace complex in Downtown Kirkland?",
        a: "Yes — Parkplace is one of our most frequent Kirkland move locations. We know the building's elevator reservation process, the parking restrictions on Central Way, and the specific move-in window hours. When you book, let us know your unit number and we'll handle the building coordination. We typically book the elevator 72 hours in advance to ensure availability.",
      },
      {
        q: "What are the move-in requirements for Totem Lake apartments near Google's campus?",
        a: "Most Totem Lake apartment buildings near Google's campus require a certificate of insurance naming the building as additional insured, an elevator reservation booked 48–72 hours in advance, and moves restricted to weekday hours (typically 8 a.m.–5 p.m.). Some buildings also require a refundable damage deposit. We handle all of this — just let us know your building when you book.",
      },
    ],
  },

  "kirkland-commercial": {
    intro: `Kirkland's commercial moving market is anchored by Google's major campus in Totem Lake, which has made the city one of the most active tech-office relocation markets on the Eastside. Google's campus buildings have security badge coordination requirements and after-hours access procedures that require advance planning. The growing number of tech startups and professional services firms in Downtown Kirkland and the Totem Lake corridor have created consistent demand for office moves of every size. Our commercial crews are trained on IT equipment handling, workstation disassembly, and chain-of-custody documentation. We work evenings and weekends and have moved teams ranging from 5 to 150 people in Kirkland.`,
    buildingCalloutsHeading: "Kirkland Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with the following Kirkland office locations: Google campus buildings in Totem Lake (security badge coordination, after-hours access, COI required), Totem Lake office parks on 124th Ave NE (loading dock coordination, standard COI), Downtown Kirkland offices on Central Way and Lake St S (street-level loading, SDOT permit on some blocks), Houghton Business Center (surface parking, standard access), and Bridle Trails office park (gated access, advance notice required). For any Kirkland commercial move, we recommend a free on-site walkthrough.`,
    extraFaqs: [
      {
        q: "Can you move our office within Google's Kirkland campus?",
        a: "Yes. We've moved teams within and between Google's Kirkland campus buildings. Campus moves require security badge coordination and advance approval from Google's facilities team — we work directly with your facilities contact to get the necessary access. We also carry the required COI for Google campus work. Intra-campus moves are typically done on weekends to avoid disrupting the work week.",
      },
      {
        q: "Do you move law firms and professional services offices in Downtown Kirkland?",
        a: "Yes. We move law firms, financial services offices, and professional services companies in Downtown Kirkland regularly. For these moves, we're particularly careful with confidential files and document boxes — each box is numbered, logged, and delivered to the correct room at the destination. We can also provide a signed chain-of-custody form if your firm requires it.",
      },
    ],
  },

  "kirkland-packing": {
    intro: `Kirkland homes range from compact Norkirk bungalows to large Moss Bay waterfront estates, and packing requirements vary accordingly. Waterfront properties often have extensive art collections, nautical antiques, and custom furniture that require specialty wrapping and custom crating. Lakeview and Highlands homes tend to have large, heavy furniture on steep lots — packing sequence matters here because items need to be loaded in the right order for the truck to navigate the driveway safely. Our Kirkland packing crews bring all materials and are experienced with the full range of specialty packing. We also know which Kirkland apartment buildings require move-out inspections, and we pack accordingly to protect common area walls and floors.`,
    buildingCalloutsHeading: "Packing Services Across Kirkland Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Kirkland and are experienced with the specific requirements of each area: Moss Bay and Downtown Kirkland waterfront (art collections, nautical antiques, custom furniture requiring specialty wrapping), Lakeview and Highlands (large homes on steep lots, packing sequence critical for safe loading), Juanita (older homes with vintage fixtures and irregular-sized items), Totem Lake apartments (move-out inspection compliance, floor and wall protection), and Bridle Trails (large estates, full-pack service common, advance scheduling recommended).`,
    extraFaqs: [
      {
        q: "Do you offer packing services for Kirkland waterfront homes?",
        a: "Yes. Kirkland waterfront homes in Moss Bay and the Downtown Kirkland area often have significant art collections, antique furniture, and custom pieces that require specialty packing. We bring mirror boxes, custom foam inserts, and specialty wrapping materials for high-value items. For items that require custom crating — oversized art, sculptures, or antique furniture — we can arrange that as well. Contact us with photos and dimensions.",
      },
      {
        q: "How long does it take to pack a 3-bedroom Kirkland home?",
        a: "A typical 3-bedroom Kirkland home takes 6–10 hours to pack with a 2-person crew. Homes with extensive art, antiques, or a large kitchen take longer. We recommend packing the day before your move so everything is ready when the truck arrives. For homes in Lakeview or Highlands with steep driveways, we coordinate the packing and loading sequence to ensure the truck can be loaded and positioned safely.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // REDMOND
  // ──────────────────────────────────────────────────────────────────────────

  "redmond-residential": {
    intro: `Redmond is our home city — our warehouse is on Redmond Way, and our crews have been moving Redmond homes since the company was founded in 2009. That means we know Education Hill's long wooded driveways and the specific streets where a 26-foot truck can't make the turn. We know which Redmond Ridge developments have HOA move-in windows that close at 6 p.m. and which ones require a refundable damage deposit. We know the traffic patterns on 520 and Redmond Way and how to route around them on move day. No other moving company has this depth of local knowledge in Redmond, and it shows in the smoothness of every move we do here.`,
    buildingCalloutsHeading: "Redmond Neighborhoods We Know Best",
    buildingCallouts: `We move homes throughout Redmond and have specific experience with every neighborhood: Education Hill (long wooded driveways, some streets require smaller trucks, steep grades on upper lots), Bear Creek (rural properties with long carries, limited road access in some areas), Overlake (tech campus-adjacent apartments and townhomes, HOA coordination), Redmond Ridge (newer planned community, strict HOA move-in rules, damage deposit common), Downtown Redmond (mixed-use blocks, limited truck parking, early-morning scheduling recommended), and Novelty Hill (newer large-lot homes, long carries, gated access in some developments).`,
    extraFaqs: [
      {
        q: "What are the HOA move-in rules in Redmond Ridge?",
        a: "Redmond Ridge HOA rules vary by section, but most require advance notice (48–72 hours), a refundable damage deposit ($200–$500), and moves restricted to daylight hours. Some sections also require a COI. We handle all HOA coordination on your behalf — just provide your HOA contact when you book and we'll confirm the requirements before move day. We've moved in and out of Redmond Ridge dozens of times and know the process well.",
      },
      {
        q: "Can you access homes on Education Hill with long driveways?",
        a: "Yes. Education Hill is one of our most active areas. Many Education Hill homes have long wooded driveways that require careful truck positioning — on some properties, we use a smaller vehicle for the driveway approach and shuttle items to the main truck on the street. We assess driveway access on every Education Hill quote. There's no additional charge for shuttle service — it's part of our standard preparation for this neighborhood.",
      },
    ],
    pricingNote: "Redmond is our home base — no travel surcharge for any Redmond move.",
  },

  "redmond-apartment": {
    intro: `Redmond's apartment market is heavily shaped by Microsoft's nearby campus, and the Overlake neighborhood — directly adjacent to Microsoft's main campus — has some of the most active apartment move traffic on the Eastside. Overlake complexes like Modera Overlake and The Reserve at Overlake require elevator reservations, certificates of insurance, and move-in fees that vary by building. Downtown Redmond's newer mixed-use buildings on Redmond Way have loading dock access but strict move-in window requirements. Our Redmond-based crews handle all building coordination before your move date, and because we're based here, we can often accommodate last-minute bookings that out-of-area companies can't.`,
    buildingCalloutsHeading: "Redmond Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Redmond apartment buildings: Modera Overlake (elevator reservation, COI required, 8 a.m.–5 p.m. window), The Reserve at Overlake (standard elevator reservation, move-in fee), Esterra Park apartments (newer complex, loading dock access, COI required), Downtown Redmond mixed-use buildings on Redmond Way (loading dock, advance scheduling required), and Redmond Town Center-area apartments (standard elevator reservation, limited street parking). If your building isn't listed, we'll call them directly.`,
    extraFaqs: [
      {
        q: "Do you move in and out of Modera Overlake in Redmond?",
        a: "Yes — Modera Overlake is one of our most frequent Redmond move locations. We know the building's elevator reservation process, the COI requirements, and the move-in window hours. When you book, let us know your unit number and we'll handle the building coordination. Because we're based in Redmond, we can often accommodate same-week bookings at Modera Overlake when other companies can't.",
      },
      {
        q: "How close is your warehouse to the Overlake area of Redmond?",
        a: "Our warehouse on Redmond Way is approximately 2 miles from the Overlake neighborhood. This means our crew can be at your Overlake apartment within 10–15 minutes of leaving the warehouse — no long drive time, no travel surcharge. For Microsoft employees moving within Overlake or between Overlake and other Eastside locations, this proximity translates directly into lower move costs.",
      },
    ],
    pricingNote: "No travel surcharge for Redmond moves. Overlake proximity = lower total cost.",
  },

  "redmond-commercial": {
    intro: `Redmond is home to Microsoft, Nintendo of America, and hundreds of tech companies, making it one of the most active commercial moving markets in Washington State. Microsoft's campus alone generates dozens of office relocations every year — intra-campus moves, team consolidations, and full department relocations. Our commercial crews are trained on IT equipment handling, server room moves, and the chain-of-custody documentation that Microsoft's facilities team requires. Nintendo of America's campus on 118th Ave NE has its own security and access procedures that we've navigated many times. For smaller Redmond tech companies, we offer after-hours and weekend moves that keep your team productive through the transition.`,
    buildingCalloutsHeading: "Redmond Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with the following Redmond office locations: Microsoft main campus (security badge coordination, facilities team approval, COI required), Nintendo of America campus on 118th Ave NE (security coordination, advance notice required), Redmond Town Center office buildings (loading dock access, standard COI), Overlake tech park buildings (surface parking, standard access), and Downtown Redmond mixed-use office space (street-level loading, limited parking on Redmond Way). Our Redmond warehouse allows us to stage large commercial moves efficiently — we can pre-position equipment and supplies the day before your move.`,
    extraFaqs: [
      {
        q: "Can you move our team within Microsoft's Redmond campus?",
        a: "Yes. We've done intra-campus moves at Microsoft's Redmond campus many times. Campus moves require advance approval from Microsoft's facilities team and security badge coordination — we work directly with your facilities contact to get the necessary access. We carry the required COI for Microsoft campus work and are familiar with the loading dock procedures for the major campus buildings. Intra-campus moves are typically done on weekends.",
      },
      {
        q: "Do you handle server room moves for Redmond tech companies?",
        a: "Yes. Server room moves require anti-static precautions, careful handling of rack-mounted equipment, and coordination with your IT team on shutdown and startup sequencing. We don't disconnect or reconnect networking equipment, but we work alongside your IT team and can coordinate timing around their schedule. We provide an itemized inventory with condition notes for every piece of server equipment. For server room moves, a pre-move walkthrough with your IT lead is strongly recommended.",
      },
    ],
    pricingNote: "Commercial rates from $140–$175/hr. Redmond-based crew = no travel surcharge.",
  },

  "redmond-packing": {
    intro: `Redmond homes range from compact townhomes near Redmond Town Center to large wooded properties on Education Hill and Bear Creek, and packing requirements vary accordingly. Education Hill and Bear Creek properties often have extensive contents — large homes with multiple levels, garages full of equipment, and outdoor furniture that needs weatherproofing for storage. Overlake apartments have strict move-out inspection requirements, so packing needs to protect common area walls and floors during carry-out. Our Redmond packing crews bring all materials and are experienced with the full range of packing scenarios. Because we're based in Redmond, we can often accommodate same-week packing bookings that out-of-area companies can't.`,
    buildingCalloutsHeading: "Packing Services Across Redmond Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Redmond and are experienced with the specific requirements of each area: Education Hill and Bear Creek (large homes on wooded lots, multi-level packing, garage and outdoor equipment), Overlake apartments (move-out inspection compliance, floor and wall protection during carry-out), Redmond Ridge (large planned-community homes, HOA move-out inspection requirements), Downtown Redmond mixed-use (tight stairwells in some buildings, furniture disassembly before packing), and Novelty Hill (newer large-lot homes, extensive contents, full-pack service common).`,
    extraFaqs: [
      {
        q: "Can you pack our Redmond home the day before the move?",
        a: "Yes — packing the day before is our recommended approach for most Redmond homes. We send the packing crew the day before your move so everything is boxed, labeled, and ready when the moving truck arrives the next morning. This is especially useful for Education Hill and Bear Creek homes with large amounts of content. Same-day pack-and-move is available for homes up to 2 bedrooms.",
      },
      {
        q: "Do you pack garages and outdoor equipment for Redmond moves?",
        a: "Yes. Garages and outdoor equipment are often the most time-consuming part of a Redmond move — especially for Education Hill and Bear Creek homes with large garages, workshop equipment, and outdoor furniture. We bring heavy-duty boxes, stretch wrap, and weatherproof packing materials for outdoor items. For large power tools and equipment, we can disassemble and wrap components for safe transport.",
      },
    ],
    pricingNote: "Redmond packing rates: $35–$55/hr per packer. All materials included.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ISSAQUAH
  // ──────────────────────────────────────────────────────────────────────────

  "issaquah-residential": {
    intro: `Issaquah's residential neighborhoods present a unique combination of challenges: the steep internal roads of Issaquah Highlands, the HOA move-in rules of Talus, the narrow historic streets of Downtown Issaquah, and the I-90 traffic that can add an hour to any move that isn't scheduled carefully. Issaquah Highlands — one of the largest planned communities in Washington State — has HOA move-in rules that require advance notice, a COI, and moves restricted to specific hours. Talus has similar requirements plus steep hillside lots that require careful truck positioning. Our crews have been moving Issaquah homes since 2009 and know every neighborhood's specific requirements before the truck leaves the yard.`,
    buildingCalloutsHeading: "Issaquah Neighborhoods We Know Best",
    buildingCallouts: `We move homes throughout Issaquah and have specific experience with each area: Issaquah Highlands (HOA move-in rules, COI required, restricted hours, steep internal roads), Talus (HOA coordination, steep hillside lots, limited truck access on upper streets), Downtown Issaquah (narrow historic streets near Gilman Village, limited truck parking), Grand Ridge (newer large-lot homes, long carries, HOA coordination), Montreux (gated community, advance notice required, large estate homes), and East Issaquah (rural properties, long driveways, limited road access in some areas).`,
    extraFaqs: [
      {
        q: "What are the HOA move-in rules in Issaquah Highlands?",
        a: "Issaquah Highlands HOA move-in rules require advance notice (typically 48–72 hours to the HOA), a certificate of insurance naming the HOA as additional insured, and moves restricted to daylight hours (typically 8 a.m.–6 p.m.). Some sections also require a refundable damage deposit. We handle all HOA coordination on your behalf — just provide your HOA contact when you book and we'll confirm the requirements before move day.",
      },
      {
        q: "How do you handle I-90 traffic for Issaquah moves?",
        a: "I-90 traffic between Issaquah and the rest of the Eastside can be significant during peak hours, especially on weekday mornings and Friday afternoons. We schedule Issaquah moves to avoid peak traffic — typically starting at 7–8 a.m. on weekdays to get ahead of the morning rush. For moves that involve multiple trips (large homes or long-distance moves within the region), we plan the route and timing to minimize I-90 exposure.",
      },
    ],
  },

  "issaquah-apartment": {
    intro: `Issaquah's apartment market is centered around Issaquah Highlands and the newer mixed-use developments near downtown. Issaquah Highlands apartment buildings have standard elevator and move-in window requirements, and the HOA-level rules that apply to the broader Highlands community also apply to apartment residents. The newer mixed-use buildings near Front Street and Gilman Village have loading dock access but limited street parking for moving trucks. Our crews handle all building coordination before your move date, and because we're based nearby in Redmond, we can often accommodate last-minute bookings that out-of-area companies can't.`,
    buildingCalloutsHeading: "Issaquah Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Issaquah apartment buildings: Issaquah Highlands apartment complexes (HOA and building elevator coordination, COI required, restricted hours), Front Street mixed-use buildings in Downtown Issaquah (loading dock access, limited street parking), Gilman Village-area apartments (older buildings, no freight elevator, stair carries common on upper floors), Grand Ridge apartments (newer construction, standard elevator reservation), and Talus-area townhomes (HOA coordination, steep access on some lots).`,
    extraFaqs: [
      {
        q: "Do Issaquah Highlands apartments require a COI for moving companies?",
        a: "Yes. Most apartment buildings in Issaquah Highlands require a certificate of insurance (COI) naming the building as additional insured. The HOA-level rules for Issaquah Highlands also require advance notice and moves restricted to specific hours. We carry the required insurance and can provide a COI for any Issaquah Highlands building. When you book, let us know your building and we'll handle the coordination.",
      },
      {
        q: "Is there parking for moving trucks near Downtown Issaquah apartments?",
        a: "Parking for large moving trucks near Downtown Issaquah and Gilman Village can be limited. We scout parking options before every Downtown Issaquah move — in some cases, we use a smaller vehicle for the final approach and shuttle items to the main truck on Front Street or a nearby side street. There's no additional charge for this — it's part of our standard preparation for Downtown Issaquah moves.",
      },
    ],
  },

  "issaquah-commercial": {
    intro: `Issaquah's commercial moving market is smaller than Seattle or Bellevue but growing steadily, driven by the expansion of businesses along Front Street and in the Gilman Village area. The Front Street corridor has street-level loading that requires careful scheduling around Issaquah's peak traffic hours on I-90. Gilman Village's historic buildings have narrow access and no loading docks, requiring hand-carry from the street. Our commercial crews handle office moves of every size in Issaquah and work evenings and weekends to minimize business disruption. We're based in Redmond — 15 minutes from Issaquah — which means fast response times and no travel surcharge.`,
    buildingCalloutsHeading: "Issaquah Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with the following Issaquah office locations: Front Street office buildings (street-level loading, I-90 traffic scheduling important), Gilman Village office spaces (historic buildings, narrow access, hand-carry from street), Issaquah Highlands commercial buildings (standard loading dock access, HOA coordination may apply), and East Issaquah office parks (surface parking, standard access). For any Issaquah commercial move, we recommend a free on-site walkthrough to assess access and plan the move sequence.`,
    extraFaqs: [
      {
        q: "Can you move our Issaquah office on a weekend?",
        a: "Yes — weekend moves are our most common request for Issaquah office relocations. We work Saturday and Sunday, and we can start as early as 6 a.m. to maximize your available time. Most Issaquah commercial buildings allow weekend access with advance notice. We'll coordinate directly with your building's property manager or landlord to confirm access.",
      },
      {
        q: "How long does a typical Issaquah office move take?",
        a: "A small Issaquah office (5–10 workstations) typically takes 4–6 hours with a 2-person crew. A medium office (20–30 workstations) takes 8–12 hours with a 3-person crew. For larger offices, we recommend a free on-site walkthrough to provide an accurate time and cost estimate. We provide flat-rate quotes for commercial moves so you know the final price before we start.",
      },
    ],
  },

  "issaquah-packing": {
    intro: `Issaquah homes range from historic downtown properties to large new construction in Issaquah Highlands and Talus, and packing requirements vary accordingly. Issaquah Highlands and Talus homes tend to be large and well-furnished, with extensive contents that benefit from professional packing. Historic Downtown Issaquah homes often have vintage fixtures, antique furniture, and irregular-sized items that require specialty wrapping. Our Issaquah packing crews bring all materials and are experienced with the full range of packing scenarios. We also know the HOA move-out inspection requirements for Issaquah Highlands and Talus, and we pack accordingly to protect common area walls and floors.`,
    buildingCalloutsHeading: "Packing Services Across Issaquah Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Issaquah and are experienced with the specific requirements of each area: Issaquah Highlands (large homes, HOA move-out inspection compliance, COI required), Talus (steep hillside homes, HOA coordination, packing sequence important for safe loading), Downtown Issaquah (historic homes with vintage fixtures and antique furniture, specialty wrapping required), Grand Ridge (newer large-lot homes, extensive contents, full-pack service common), and Montreux (gated estate homes, high-value contents, custom crating available).`,
    extraFaqs: [
      {
        q: "Do you pack homes in Issaquah Highlands with HOA move-out requirements?",
        a: "Yes. Issaquah Highlands HOA move-out requirements typically include protecting common area walls and floors during carry-out, which means every item needs to be properly wrapped and padded before it leaves your unit. Our packing crews are experienced with these requirements and bring floor runners, door jamb protectors, and furniture pads for every Issaquah Highlands move. We also coordinate with the HOA on your behalf to confirm specific requirements before move day.",
      },
      {
        q: "How much does it cost to pack a 3-bedroom Issaquah Highlands home?",
        a: "A typical 3-bedroom Issaquah Highlands home takes 6–10 hours to pack with a 2-person crew at $35–$55 per hour per packer. All packing materials are included — no surprise supply charges. For homes with extensive art, antiques, or a large kitchen, packing takes longer. We recommend getting a quote based on a walkthrough of your home so we can give you an accurate estimate.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SAMMAMISH
  // ──────────────────────────────────────────────────────────────────────────

  "sammamish-residential": {
    intro: `Sammamish is defined by its large planned communities — Klahanie, Trossachs, Pine Lake, and Beaver Lake — and the HOA move-in rules that govern them. Klahanie and Trossachs both require advance notice to the HOA, a certificate of insurance, and moves restricted to specific hours. Pine Lake and Beaver Lake have long wooded driveways that require careful truck positioning and sometimes a smaller vehicle for the final approach. The limited road network on the Sammamish Plateau means that traffic on SE 8th Street and 228th Ave SE can add significant time to a move if not scheduled carefully. Our crews know every Sammamish community's specific requirements and plan every move accordingly.`,
    buildingCalloutsHeading: "Sammamish Neighborhoods We Know Best",
    buildingCallouts: `We move homes throughout Sammamish and have specific experience with each community: Klahanie (HOA move-in rules, COI required, restricted hours, dense townhome sections), Trossachs (HOA coordination, large single-family homes, long carries), Pine Lake (wooded lots, long driveways, smaller trucks required on some streets), Beaver Lake (rural properties, long carries, limited road access in some areas), Sahalee (gated community, advance notice required, large estate homes), and Sammamish Town Center area (newer mixed-use, standard access).`,
    extraFaqs: [
      {
        q: "What are the HOA move-in rules in Klahanie?",
        a: "Klahanie HOA move-in rules require advance notice (typically 48–72 hours), a certificate of insurance naming the Klahanie HOA as additional insured, and moves restricted to daylight hours (typically 8 a.m.–6 p.m.). Some sections also require a refundable damage deposit. We handle all HOA coordination on your behalf — just provide your HOA contact when you book and we'll confirm the requirements before move day. We've moved in and out of Klahanie dozens of times.",
      },
      {
        q: "Can you access homes in Pine Lake and Beaver Lake with long driveways?",
        a: "Yes. Pine Lake and Beaver Lake properties often have long wooded driveways that require careful truck positioning. On some properties, we use a smaller vehicle for the driveway approach and shuttle items to the main truck on the street. We assess driveway access on every Pine Lake and Beaver Lake quote. There's no additional charge for shuttle service — it's part of our standard preparation for these neighborhoods.",
      },
    ],
    pricingNote: "Sammamish rates reflect large-home market. Flat-rate quotes available.",
  },

  "sammamish-apartment": {
    intro: `Sammamish has fewer apartment complexes than other Eastside cities, but the newer mixed-use developments near Sammamish Town Center have standard elevator and move-in window requirements. The Sammamish Town Center mixed-use buildings are the most active apartment move locations in the city, and our crews are familiar with their specific elevator reservation processes and parking restrictions. For apartment residents in Klahanie and Trossachs, the HOA-level rules that apply to the broader community also apply to apartment and townhome residents — we handle all of that coordination before your move date.`,
    buildingCalloutsHeading: "Sammamish Apartment Buildings We Move Regularly",
    buildingCallouts: `We have on-file experience with the following Sammamish apartment buildings: Sammamish Town Center mixed-use apartments (elevator reservation, limited street parking, COI required for some buildings), Klahanie townhomes and apartments (HOA coordination, COI required, restricted hours), Trossachs townhomes (HOA coordination, large units, long carries common), and Pine Lake-area townhomes (standard access, HOA coordination may apply). If your building isn't listed, we'll call them directly before your move.`,
    extraFaqs: [
      {
        q: "Do Sammamish Town Center apartments require a COI for moving companies?",
        a: "Some Sammamish Town Center buildings require a certificate of insurance, while others do not. We call every building before your move to confirm current requirements. If a COI is required, we provide one naming your building as additional insured at no additional charge. When you book, let us know your building name and address and we'll confirm the requirements.",
      },
      {
        q: "Are there HOA restrictions for moving in Klahanie townhomes?",
        a: "Yes. Klahanie HOA rules apply to all residents, including townhome and apartment residents. Move-in and move-out procedures require advance notice to the HOA, a COI, and moves restricted to specific hours. We handle all HOA coordination on your behalf. Because we've moved in Klahanie many times, we know the current requirements and can often confirm them quickly.",
      },
    ],
  },

  "sammamish-commercial": {
    intro: `Sammamish's commercial moving market is smaller than other Eastside cities but growing steadily, driven by the expansion of businesses along SE 8th Street and near Sammamish Town Center. The limited road network on the Sammamish Plateau means that access for large moving trucks requires careful route planning — SE 8th Street and 228th Ave SE are the main commercial corridors, and traffic on these roads can be significant during peak hours. Our commercial crews handle office moves of every size in Sammamish and work evenings and weekends to minimize business disruption. We're based in Redmond — 12 minutes from Sammamish — which means fast response times and no travel surcharge.`,
    buildingCalloutsHeading: "Sammamish Office Buildings We Move Regularly",
    buildingCallouts: `We have direct experience with the following Sammamish office locations: SE 8th Street office buildings (surface parking, I-90 access via 228th Ave SE), Sammamish Town Center commercial space (standard loading access, limited street parking), and Klahanie-area office parks (HOA coordination may apply, surface parking). For any Sammamish commercial move, we recommend a free on-site walkthrough to assess access and plan the move sequence.`,
    extraFaqs: [
      {
        q: "How do you route large moving trucks to Sammamish offices?",
        a: "The Sammamish Plateau has a limited road network, and the main access routes — SE 8th Street from I-90 and 228th Ave SE — can have significant traffic during peak hours. We schedule Sammamish commercial moves to avoid peak traffic, typically starting at 7–8 a.m. on weekdays. For moves involving large trucks, we plan the route in advance to ensure there are no low-clearance bridges or weight restrictions on the approach.",
      },
      {
        q: "Can you move our Sammamish business on a weekend?",
        a: "Yes — weekend moves are our most common request for Sammamish office relocations. We work Saturday and Sunday, and we can start as early as 6 a.m. to maximize your available time. Most Sammamish commercial buildings allow weekend access with advance notice. We'll coordinate directly with your building's property manager or landlord to confirm access.",
      },
    ],
  },

  "sammamish-packing": {
    intro: `Sammamish is defined by its large single-family homes in planned communities, and packing these homes is a significant undertaking. Klahanie and Trossachs homes tend to be large and well-furnished, with extensive contents that benefit from professional packing. Pine Lake and Beaver Lake properties often have large garages, workshop equipment, and outdoor furniture that requires weatherproofing for storage. The HOA move-out inspection requirements in Klahanie and Trossachs mean that every item needs to be properly wrapped and padded before it leaves your home. Our Sammamish packing crews bring all materials and are experienced with the full range of packing scenarios for large Eastside homes.`,
    buildingCalloutsHeading: "Packing Services Across Sammamish Neighborhoods",
    buildingCallouts: `Our packing crews work throughout Sammamish and are experienced with the specific requirements of each community: Klahanie (large homes, HOA move-out inspection compliance, COI required), Trossachs (large single-family homes, extensive contents, full-pack service common), Pine Lake and Beaver Lake (wooded-lot homes, large garages, outdoor equipment, weatherproof packing), Sahalee (gated estate homes, high-value contents, custom crating available), and Sammamish Town Center (mixed-use apartments, standard packing).`,
    extraFaqs: [
      {
        q: "How long does it take to pack a large Sammamish home?",
        a: "A typical 4-bedroom Sammamish home takes 8–12 hours to pack with a 2-person crew. Homes with large garages, workshop equipment, or extensive outdoor furniture take longer. For large Sammamish homes, we recommend a 2-day packing schedule — packing the main living areas on day one and the garage and outdoor items on day two — so everything is ready when the truck arrives on move day.",
      },
      {
        q: "Do you pack outdoor furniture and garage equipment for Sammamish moves?",
        a: "Yes. Outdoor furniture, grills, lawn equipment, and garage tools are often the most time-consuming part of a Sammamish move. We bring heavy-duty boxes, stretch wrap, and weatherproof packing materials for outdoor items. For large power tools and equipment, we can disassemble and wrap components for safe transport. For items going into storage, we use weatherproof wrapping to protect against moisture.",
      },
    ],
  },
};
