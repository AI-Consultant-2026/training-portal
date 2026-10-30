import {
  COUNTRIES,
  CountryCode,
  HOMEPAGE_COURSES,
  HomepageCourse,
  coursePriceLabel,
  depositLabel,
  isLive,
} from "../constants/countries";
import {
  COURSE_INFO,
  ORIGIN,
  SEARCH_OVERLAY,
  ambassadorsPath,
  coursePagePath,
  escapeHtml,
  footer,
  head,
  header,
  jobsBoardPath,
  scripts,
  text,
  whatsappAttr,
} from "./countryHome";

// Course pages for Ghana, Kenya and South Africa (2026-10-30), e.g.
// /gh/cyber-security-fundamentals-course. Nigeria keeps its original static pages
// (marketing/*-course.html); these are their equivalents in the other three countries,
// joined to them by hreflang.
//
// Each page has to earn its place in search, so it isn't the Nigerian page with the
// country swapped in. The local half -- who the course suits there, where the skills are
// used, the country's own laws and regulators, the fee in local money and local FAQs -- is
// written per country below. The lessons themselves are the same everywhere and use
// Nigerian regulation as their worked examples, so every page says so plainly and lists
// the local laws to read alongside, rather than claiming the course teaches them.
//
// Rules for this copy: name laws and regulators exactly and only when certain of them;
// no salary or job-placement figures; no accreditation Paleon doesn't hold; Paleon has no
// office in these countries (the course is online), and the pages say where it is based.

type LocalCountry = Exclude<CountryCode, "NG">;
export const COURSE_PAGE_COUNTRIES: LocalCountry[] = ["GH", "KE", "ZA"];

interface Law {
  name: string;
  what: string;
}

interface LocalCourse {
  /** Search-result title, kept under ~60 characters. */
  title: string;
  description: string;
  h1: string;
  intro: string;
  whoFor: string[];
  usedIn: { sector: string; example: string }[];
  laws: Law[];
  /** What the certificate is not, in this country's terms. */
  certificateNote: string;
  faqs: [string, string][];
}

interface CountryCopy {
  /** "Ghanaian", for "Ghanaian employers". */
  adjective: string;
  /** Who the courses are for, in local terms. */
  audience: string;
  courses: Record<HomepageCourse, LocalCourse>;
}

// Day-by-day outline, the same in every country (from the course pages' own tables).
const OUTLINE: Record<HomepageCourse, [string, string][]> = {
  "cyber-security-fundamentals": [
    ["Day 1", "Cyber threats and vulnerabilities, and thinking in risk"],
    ["Day 2", "Passwords, authentication and multi-factor authentication"],
    ["Day 3", "How networks work: OSI model, TCP/IP, segmentation"],
    ["Day 4", "Network security: firewalls, IDS/IPS, VPNs and monitoring"],
    ["Day 5", "Phishing, business email compromise, smishing and vishing"],
    ["Day 6", "Malware and ransomware, and how organisations respond"],
    ["Day 7", "Risk management: assets, risk registers, third-party risk"],
    ["Day 8", "Access control, least privilege and insider threats"],
    ["Day 9", "Incident response: the six phases, detection and triage"],
    ["Day 10", "Security awareness, remote work and physical security"],
    ["Day 11", "Cloud security and the shared responsibility model"],
    ["Day 12", "Data protection: classification, encryption, breach notification"],
    ["Days 13–18", "Sector pathways: oil &amp; gas (IT/OT and SCADA), banking (payments and fraud) and telecoms"],
  ],
  "gis-and-drone-mapping": [
    ["Day 1", "GIS fundamentals, raster and vector data, getting started in QGIS"],
    ["Day 2", "Coordinate systems, projections, UTM and map design"],
    ["Day 3", "Spatial data sources, quality and storage"],
    ["Day 4", "Remote sensing, spectral indices and change detection"],
    ["Day 5", "Drone types, regulation and flight planning"],
    ["Day 6", "Photogrammetry, orthomosaics, point clouds and 3D products"],
    ["Day 7", "Spatial analysis and thematic mapping"],
    ["Day 8", "Planning and delivering a GIS project"],
    ["Day 9", "Industry applications and your sector capstone"],
  ],
  "digital-marketing": [
    ["Day 1", "Digital marketing fundamentals and the funnel"],
    ["Day 2", "Audience research, personas and channel strategy"],
    ["Day 3", "On-page, technical, off-page and local SEO"],
    ["Day 4", "Content marketing and email campaigns"],
    ["Day 5", "Google Ads: structure, bidding, ad copy and tracking"],
    ["Day 6", "Analytics, attribution and marketing ROI"],
    ["Day 7", "E-commerce marketing, automation and CRM"],
    ["Day 8", "Integrated strategy and your capstone plan"],
  ],
  "hse-fundamentals": [
    ["Day 1", "Core HSE concepts, using oil &amp; gas as the setting"],
    ["Day 2", "Hazard identification and risk assessment (HIRA)"],
    ["Day 3", "Legal frameworks and international standards"],
    ["Day 4", "PPE, permit to work, gas testing and contractor safety"],
    ["Day 5", "Emergency preparedness, fire safety and first aid basics"],
    ["Day 6", "Incident investigation, reporting and root cause analysis"],
    ["Day 7", "Environmental management, pollution and spill response"],
    ["Day 8", "Safety culture, audits, inspections and HSE careers"],
  ],
};

const COPY: Record<LocalCountry, CountryCopy> = {
  GH: {
    adjective: "Ghanaian",
    audience: "graduates, final-year students and people doing National Service (NSS)",
    courses: {
      "cyber-security-fundamentals": {
        title: "Cyber Security Course Online in Ghana | Paleon Training",
        description:
          "Beginner cybersecurity course for learners in Ghana: 18 days, 36 video lessons, banking, telecoms and oil & gas pathways. Fee {FEE}. First lesson free.",
        h1: "Cyber Security Fundamentals: online course for Ghana",
        intro:
          "A beginner course in how organisations are attacked and how they defend themselves, taught online and at your own pace. It suits Ghanaian graduates who want a first, practical step into security work in banking, telecoms or the energy sector, without an IT degree.",
        whoFor: [
          "Graduates and final-year students from any discipline who want an entry point into security, risk or IT support work",
          "People on National Service who want a skill and a portfolio project to show at the end of their service year",
          "Staff in banks, telcos and fintechs who handle customer data or payments and want to understand the threats",
        ],
        usedIn: [
          { sector: "Banking and mobile money", example: "Mobile money and online banking make fraud, SIM-swap and phishing a daily concern; banks and payment companies need people who can spot and report attacks." },
          { sector: "Telecoms", example: "Networks, customer data and the systems behind MoMo all need monitoring, access control and incident response." },
          { sector: "Oil, gas and mining", example: "Production and processing sites run operational technology (SCADA and control systems) that is increasingly connected, which the course's oil &amp; gas pathway covers." },
        ],
        laws: [
          { name: "Cybersecurity Act, 2020 (Act 1038)", what: "Set up the Cyber Security Authority (CSA), which licenses cybersecurity service providers and accredits cybersecurity professionals in Ghana." },
          { name: "Data Protection Act, 2012 (Act 843)", what: "Governs how personal data is collected and used; overseen by the Data Protection Commission." },
          { name: "Bank of Ghana Cyber and Information Security Directive", what: "Sets security expectations for banks and other regulated financial institutions." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone. It is not a Cyber Security Authority accreditation or licence, and it is not an international certification such as CompTIA Security+ or ISC2 CC; many learners use this course as the foundation before attempting those.",
        faqs: [
          ["Do I need an IT background?", "No. The course starts from what cybersecurity protects and why, and builds up to networks, cloud and incident response. You need a phone or laptop and an internet connection."],
          ["Does it cover Ghanaian law?", "The lessons teach data protection and incident reporting in general terms, with Nigerian regulation as the worked example. This page lists the Ghanaian laws and regulators to read alongside the course: Act 1038, Act 843 and the Bank of Ghana directive."],
          ["Is the course accredited in Ghana?", "No. It is a practical online course from Paleon Training with a certificate of completion. If you plan to work as a cybersecurity professional in Ghana, check the Cyber Security Authority's accreditation requirements."],
          ["How much is it, and how do I pay?", "{FEE} for the full course, or start with a {DEPOSIT} deposit. Payment in Ghana is by MTN MoMo, Telecel Cash or card."],
        ],
      },
      "gis-and-drone-mapping": {
        title: "GIS and Drone Mapping Course Online in Ghana | Paleon",
        description:
          "Learn GIS, QGIS, remote sensing and drone mapping online from Ghana: 9 days, 18 lessons and a sector capstone for mining, oil & gas and agriculture. {FEE}.",
        h1: "GIS and Drone Mapping: online course for Ghana",
        intro:
          "Learn to capture, analyse and present location data with free GIS software (QGIS), satellite imagery and drone mapping. It is aimed at Ghanaian graduates in geography, geomatics, planning, agriculture, mining and environmental science, and at anyone who wants to turn maps into evidence for decisions.",
        whoFor: [
          "Graduates in geography, geomatic engineering, planning, agriculture, mining or environmental science",
          "National Service personnel posted to assemblies, agencies or companies that use maps and site data",
          "Field staff in mining, cocoa, utilities or construction who collect location data and want to analyse it",
        ],
        usedIn: [
          { sector: "Mining", example: "Mapping concessions, monitoring land disturbance and spotting illegal mining (galamsey) with satellite imagery and drones." },
          { sector: "Cocoa and agriculture", example: "Mapping farm boundaries and tracking tree cover, which traceability rules for cocoa exports increasingly ask for." },
          { sector: "Oil, gas and infrastructure", example: "Route planning, site surveys and environmental baselines for pipelines, roads and utilities." },
        ],
        laws: [
          { name: "Ghana Civil Aviation Authority (GCAA) drone rules", what: "Drones must be registered and operated within GCAA rules, with permission needed for many commercial flights. Check the GCAA's current requirements before flying for work." },
          { name: "Lands Commission (Survey and Mapping Division)", what: "Ghana's national mapping and survey authority; formal land surveys are carried out by licensed surveyors." },
        ],
        certificateNote:
          "The course teaches drone flight planning and mapping. It does not give you a drone pilot licence or permit, and it does not make you a licensed land surveyor. Your Paleon certificate of completion shows the GIS and drone-mapping work you have done.",
        faqs: [
          ["Which software does it use?", "QGIS, which is free, plus free satellite imagery sources. You don't need to buy software to finish the course."],
          ["Do I need my own drone?", "No. The drone lessons cover planning, regulation and processing; sample drone data is used for the mapping exercises."],
          ["Does it cover Ghana's drone regulations?", "The regulation lesson uses Nigeria's rules as the worked example and explains what drone rules usually require. Before flying in Ghana, check the Ghana Civil Aviation Authority's current requirements."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit and pay the balance later. Pay by MTN MoMo, Telecel Cash or card."],
        ],
      },
      "digital-marketing": {
        title: "Digital Marketing Course Online in Ghana | Paleon Training",
        description:
          "Practical digital marketing course for learners in Ghana: SEO, Google Ads, content, email and analytics. 8 days, 16 video lessons and a capstone. {FEE}.",
        h1: "Digital Marketing: online course for Ghana",
        intro:
          "A practical course in attracting customers online and proving what works: SEO, Google Ads, content, email, analytics and automation. It suits Ghanaian graduates aiming for marketing roles in banks, telcos and growing businesses, and anyone selling a product or service online.",
        whoFor: [
          "Graduates and NSS personnel who want a marketing, communications or growth role",
          "Small business owners and sellers on Instagram, WhatsApp and Jumia who want more customers for less money",
          "Communications staff in banks, telcos and agencies who are moving into digital channels",
        ],
        usedIn: [
          { sector: "Banking and telecoms", example: "Customer acquisition for accounts, MoMo and data bundles is now largely digital, measured in leads and cost per customer." },
          { sector: "SMEs and e-commerce", example: "Businesses that sell through social media, WhatsApp and online marketplaces need search, ads and email that pay for themselves." },
          { sector: "Agencies and media", example: "Agencies in Accra and Kumasi hire people who can plan campaigns and report results with analytics." },
        ],
        laws: [
          { name: "Data Protection Act, 2012 (Act 843)", what: "Applies to the personal data you collect for marketing lists and ads; the Data Protection Commission oversees it." },
          { name: "Electronic Transactions Act, 2008 (Act 772)", what: "Covers electronic communications and online transactions, including unsolicited electronic messages." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone campaign plan. It is not a Google Ads certification or a professional marketing qualification such as CIM, though the course prepares you well for Google's free certifications.",
        faqs: [
          ["Is it suitable for beginners?", "Yes. It starts with the marketing funnel and builds up to SEO, paid search, analytics and automation."],
          ["Does it cover Google Ads and SEO?", "Yes, each has its own lesson, along with content, email and analytics."],
          ["Can I use it for my own business?", "Yes. The capstone is a full campaign plan, which can be for your own business or a real organisation."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by MTN MoMo, Telecel Cash or card."],
        ],
      },
      "hse-fundamentals": {
        title: "HSE Course Online in Ghana for Mining and Oil & Gas | Paleon",
        description:
          "Beginner HSE course for Ghana's mining and oil & gas sectors: hazards, risk assessment, permit to work, emergencies and incident investigation. 8 days. {FEE}.",
        h1: "HSE Fundamentals: online course for Ghana",
        intro:
          "An introduction to Health, Safety and Environment: identifying hazards, assessing risk, safe systems of work and what to do when things go wrong. It is set in oil &amp; gas, and the same principles apply on Ghana's mine sites, construction projects and factories.",
        whoFor: [
          "Graduates and NSS personnel who want a first step towards an HSE officer or safety assistant role",
          "Workers on mine sites, rigs, plants and construction projects who want to understand the safety systems around them",
          "Anyone preparing for a recognised qualification such as NEBOSH who wants the foundations first",
        ],
        usedIn: [
          { sector: "Mining", example: "Gold and bauxite mines run on permits to work, risk assessments and incident reporting, and hire HSE assistants and officers." },
          { sector: "Oil and gas", example: "Offshore and onshore operations and their contractors need people who understand hazards, PPE, emergency response and spill control." },
          { sector: "Construction and manufacturing", example: "Contractors and factories need safety supervisors who can run inspections and toolbox talks." },
        ],
        laws: [
          { name: "Factories, Offices and Shops Act, 1970 (Act 328)", what: "Ghana's main workplace safety law for factories, offices and shops." },
          { name: "Labour Act, 2003 (Act 651)", what: "Sets employers' general duty to provide a safe working environment." },
          { name: "Minerals and Mining (Health, Safety and Technical) Regulations, 2012 (L.I. 2182)", what: "Safety rules for mines, enforced by the Minerals Commission's Inspectorate Division." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished an introductory HSE course. It is not a NEBOSH, IOSH or other recognised safety qualification, and employers may ask for one of those for HSE officer roles. This course is a practical foundation for them.",
        faqs: [
          ["Is HSE Fundamentals the same as NEBOSH?", "No. NEBOSH is an examined international qualification. This is a shorter, practical introduction that many people take first."],
          ["Does it cover Ghanaian regulations?", "The legal lesson uses Nigerian oil &amp; gas regulation and international standards as its examples. This page lists the Ghanaian laws to read alongside: Act 328, Act 651 and L.I. 2182."],
          ["Is it relevant to mining?", "Yes. Hazard identification, permits, PPE, emergencies and incident investigation work the same way on a mine site as on an oil &amp; gas site."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by MTN MoMo, Telecel Cash or card."],
        ],
      },
    },
  },
  KE: {
    adjective: "Kenyan",
    audience: "graduates, students on industrial attachment and young professionals",
    courses: {
      "cyber-security-fundamentals": {
        title: "Cyber Security Course Online in Kenya | Paleon Training",
        description:
          "Beginner cybersecurity course for learners in Kenya: threats, networks, incident response and data protection, 18 days and 36 video lessons. {FEE}. Free lesson.",
        h1: "Cyber Security Fundamentals: online course for Kenya",
        intro:
          "A beginner course in how organisations are attacked and how they defend themselves, taught online and at your own pace. It suits Kenyan graduates who want a practical first step into security work in fintech, banking or telecoms, the sectors where most of Kenya's digital money moves.",
        whoFor: [
          "Graduates and students on attachment who want an entry point into security, risk or IT support work",
          "Staff at banks, SACCOs, fintechs and telcos who handle customer data, payments or fraud cases",
          "IT support and helpdesk staff who want to move towards a security role",
        ],
        usedIn: [
          { sector: "Fintech and mobile money", example: "M-Pesa, digital lending and online banking make SIM-swap fraud, phishing and account takeover everyday risks that teams need to detect and stop." },
          { sector: "Telecoms", example: "Operators protect networks, customer records and payment systems, and run security operations around the clock." },
          { sector: "Banking", example: "Banks are expected to manage cyber risk, train staff and report incidents, which creates entry-level security and risk roles." },
        ],
        laws: [
          { name: "Data Protection Act, 2019", what: "Governs how personal data is handled; enforced by the Office of the Data Protection Commissioner (ODPC)." },
          { name: "Computer Misuse and Cybercrimes Act, 2018", what: "Defines cybercrimes such as unauthorised access and cyber fraud, and sets out how they are investigated." },
          { name: "Central Bank of Kenya cybersecurity guidance", what: "Sets out what banks and payment service providers must do to manage cyber risk." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone. It is not NITA-accredited and it is not an international certification such as CompTIA Security+ or ISC2 CC; many learners use this course as the foundation before attempting those.",
        faqs: [
          ["Do I need an IT background?", "No. The course starts from first principles and builds up to networks, cloud security and incident response."],
          ["Does it cover Kenyan law?", "The lessons teach data protection and incident reporting in general terms, with Nigerian regulation as the worked example. Read Kenya's Data Protection Act 2019 and the Computer Misuse and Cybercrimes Act 2018 alongside the course."],
          ["Can I do it while on attachment or working?", "Yes. It is self-paced with lifetime access, so you can study in the evenings or at weekends."],
          ["How much is it, and how do I pay?", "{FEE} for the full course, or start with a {DEPOSIT} deposit. Payment in Kenya is by M-Pesa or card."],
        ],
      },
      "gis-and-drone-mapping": {
        title: "GIS and Drone Mapping Course Online in Kenya | Paleon",
        description:
          "Learn GIS, QGIS, remote sensing and drone mapping online from Kenya: 9 days, 18 lessons and a capstone for agriculture, energy and infrastructure. {FEE}.",
        h1: "GIS and Drone Mapping: online course for Kenya",
        intro:
          "Learn to capture, analyse and present location data with QGIS, satellite imagery and drone mapping. It is aimed at Kenyan graduates in geography, geospatial engineering, planning, agriculture and environmental science, and at county and project staff who work with maps.",
        whoFor: [
          "Graduates in geography, geospatial or survey studies, planning, agriculture or environmental science",
          "County government and NGO staff working on spatial plans, land use or service delivery",
          "Field teams in agriculture, energy and construction who collect location data",
        ],
        usedIn: [
          { sector: "Agriculture", example: "Mapping farms, crop health and water use with satellite indices and drone imagery." },
          { sector: "Energy", example: "Site selection and environmental baselines for geothermal, wind, solar and transmission projects." },
          { sector: "Infrastructure and counties", example: "Roads, housing and utilities planning, and the county spatial plans that county governments prepare." },
        ],
        laws: [
          { name: "Civil Aviation (Unmanned Aircraft Systems) Regulations, 2020", what: "Kenya's drone rules, administered by the Kenya Civil Aviation Authority (KCAA): drones are registered, and a remote pilot licence is needed for medium- and high-risk operations." },
          { name: "Survey of Kenya", what: "The national mapping and survey agency; cadastral surveys are carried out by licensed surveyors." },
        ],
        certificateNote:
          "The course teaches drone flight planning and mapping. It does not give you a KCAA remote pilot licence, and it does not make you a licensed surveyor. Your Paleon certificate of completion shows the GIS and drone-mapping work you have done.",
        faqs: [
          ["Which software does it use?", "QGIS, which is free, plus free satellite imagery sources."],
          ["Do I need my own drone?", "No. Sample drone data is used for the mapping exercises."],
          ["Does it cover KCAA drone rules?", "The regulation lesson uses Nigeria's rules as the worked example. Before flying for work in Kenya, read the Civil Aviation (Unmanned Aircraft Systems) Regulations, 2020 and check the KCAA's requirements."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by M-Pesa or card."],
        ],
      },
      "digital-marketing": {
        title: "Digital Marketing Course Online in Kenya | Paleon Training",
        description:
          "Practical digital marketing course for learners in Kenya: SEO, Google Ads, content, email and analytics. 8 days, 16 video lessons and a capstone. {FEE}.",
        h1: "Digital Marketing: online course for Kenya",
        intro:
          "A practical course in attracting customers online and proving what works: SEO, Google Ads, content, email, analytics and automation. It suits Kenyan graduates aiming for marketing roles in fintech, retail and agencies, and business owners who sell online.",
        whoFor: [
          "Graduates who want a marketing, communications or growth role",
          "Business owners who sell through Instagram, WhatsApp, TikTok or their own website",
          "Marketing and communications staff moving into paid and measured digital channels",
        ],
        usedIn: [
          { sector: "Fintech", example: "Apps and lenders compete for customers online, so they hire people who can run campaigns and measure cost per customer." },
          { sector: "Retail and e-commerce", example: "Retailers and online shops need search, ads and email that turn visits into orders, often paid for by M-Pesa." },
          { sector: "SMEs and agencies", example: "Agencies in Nairobi and Mombasa, and small businesses everywhere, need people who can plan and report on campaigns." },
        ],
        laws: [
          { name: "Data Protection Act, 2019", what: "Sets rules for using personal data in marketing, including direct marketing; enforced by the ODPC." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone campaign plan. It is not NITA-accredited and it is not a Google Ads certification, though the course prepares you well for Google's free certifications.",
        faqs: [
          ["Is it suitable for beginners?", "Yes. It starts with the marketing funnel and builds up to SEO, paid search, analytics and automation."],
          ["Does it cover Google Ads and SEO?", "Yes, each has its own lesson."],
          ["Can I use it for my own business?", "Yes. The capstone is a full campaign plan, which can be for your own business."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by M-Pesa or card."],
        ],
      },
      "hse-fundamentals": {
        title: "HSE Course Online in Kenya | Paleon Training",
        description:
          "Beginner HSE course for learners in Kenya: hazards, risk assessment, permit to work, emergencies and incident investigation. 8 days, 16 lessons. {FEE}.",
        h1: "HSE Fundamentals: online course for Kenya",
        intro:
          "An introduction to Health, Safety and Environment: identifying hazards, assessing risk, safe systems of work and responding to incidents. The lessons are set in oil &amp; gas, and the same principles apply in Kenya's energy, construction and manufacturing workplaces.",
        whoFor: [
          "Graduates who want a first step towards a safety officer or HSE assistant role",
          "Workers in energy, construction, manufacturing and logistics who want to understand safety systems",
          "Anyone preparing for a recognised qualification such as NEBOSH who wants the foundations first",
        ],
        usedIn: [
          { sector: "Energy", example: "Geothermal, power and fuel operations rely on permits to work, gas testing and emergency response." },
          { sector: "Construction", example: "Contractors on roads, housing and infrastructure projects need people who can run inspections and toolbox talks." },
          { sector: "Manufacturing and logistics", example: "Factories and warehouses need risk assessments, incident reporting and safety committees." },
        ],
        laws: [
          { name: "Occupational Safety and Health Act, 2007", what: "Kenya's main workplace safety law, enforced by the Directorate of Occupational Safety and Health Services (DOSHS)." },
          { name: "Work Injury Benefits Act, 2007", what: "Covers compensation and reporting for work injuries and occupational diseases." },
          { name: "Environmental Management and Co-ordination Act, 1999", what: "Kenya's main environmental law, administered by the National Environment Management Authority (NEMA)." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished an introductory HSE course. It is not a DOSHS-approved qualification, nor NEBOSH or IOSH, which employers may ask for in safety officer roles. This course is a practical foundation for them.",
        faqs: [
          ["Is HSE Fundamentals the same as NEBOSH?", "No. NEBOSH is an examined international qualification. This is a shorter, practical introduction."],
          ["Does it cover Kenyan law?", "The legal lesson uses Nigerian regulation and international standards as its examples. Read Kenya's Occupational Safety and Health Act 2007 and the Work Injury Benefits Act 2007 alongside it."],
          ["I don't work in oil and gas. Is it still useful?", "Yes. Hazards, risk assessment, permits, PPE and incident investigation apply in any workplace; oil &amp; gas is the setting for the examples."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by M-Pesa or card."],
        ],
      },
    },
  },
  ZA: {
    adjective: "South African",
    audience: "graduates, university and TVET college students, and young professionals",
    courses: {
      "cyber-security-fundamentals": {
        title: "Cyber Security Course Online in South Africa | Paleon",
        description:
          "Beginner cybersecurity course for learners in South Africa: threats, networks, incident response and POPIA-style data protection. 18 days, 36 lessons. {FEE}.",
        h1: "Cyber Security Fundamentals: online course for South Africa",
        intro:
          "A beginner course in how organisations are attacked and how they defend themselves, taught online and at your own pace. It suits South African graduates and TVET students who want a practical first step into security work in banking, telecoms or mining.",
        whoFor: [
          "Graduates and TVET students who want an entry point into security, risk or IT support work",
          "Staff in banks, insurers and telcos who handle personal information under POPIA",
          "Helpdesk and IT support staff who want to move towards a security operations role",
        ],
        usedIn: [
          { sector: "Banking and insurance", example: "Banks and insurers protect payments and personal information, and need people to detect fraud and respond to incidents." },
          { sector: "Telecoms", example: "Operators run security operations for their networks, customer records and digital services." },
          { sector: "Mining", example: "Mines run operational technology and control systems, which the course's oil &amp; gas IT/OT pathway also applies to." },
        ],
        laws: [
          { name: "Protection of Personal Information Act 4 of 2013 (POPIA)", what: "Governs how personal information is processed and requires security safeguards and breach notification; enforced by the Information Regulator." },
          { name: "Cybercrimes Act 19 of 2020", what: "Defines cybercrimes and sets duties on reporting certain offences." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone. It is not a QCTO-registered qualification and it is not an international certification such as CompTIA Security+ or ISC2 CC; many learners use this course as the foundation before attempting those.",
        faqs: [
          ["Do I need an IT background?", "No. The course starts from first principles and builds up to networks, cloud security and incident response."],
          ["Does it cover POPIA?", "The data protection lesson covers classification, encryption and breach notification in general terms, with Nigerian regulation as the worked example. Read POPIA and the Information Regulator's guidance alongside it."],
          ["Is it a registered qualification?", "No. It is a practical online course with a certificate of completion, not a QCTO-registered qualification or learnership."],
          ["How much is it, and how do I pay?", "{FEE} for the full course, or start with a {DEPOSIT} deposit. Payment in South Africa is by card or EFT."],
        ],
      },
      "gis-and-drone-mapping": {
        title: "GIS and Drone Mapping Course Online in South Africa | Paleon",
        description:
          "Learn GIS, QGIS, remote sensing and drone mapping online from South Africa: 9 days, 18 lessons and a capstone for mining, infrastructure and environment. {FEE}.",
        h1: "GIS and Drone Mapping: online course for South Africa",
        intro:
          "Learn to capture, analyse and present location data with QGIS, satellite imagery and drone mapping. It is aimed at South African graduates in geography, geomatics, environmental science and town planning, and at people in mining, municipalities and consulting who work with spatial data.",
        whoFor: [
          "Graduates and students in geography, geomatics, environmental science or town and regional planning",
          "Municipal and consulting staff working on planning, infrastructure or environmental assessments",
          "Mining and exploration teams who collect site data and want to analyse it in GIS",
        ],
        usedIn: [
          { sector: "Mining", example: "Mapping mine footprints, rehabilitation progress and environmental monitoring with drone and satellite imagery." },
          { sector: "Infrastructure and municipalities", example: "Planning roads, housing and services, and keeping municipal spatial data current." },
          { sector: "Environment", example: "Environmental impact assessments, land-cover change and water-resource mapping." },
        ],
        laws: [
          { name: "SACAA Part 101 of the Civil Aviation Regulations", what: "South Africa's rules for remotely piloted aircraft: commercial drone work needs a remote pilot licence and an operator certificate from the South African Civil Aviation Authority." },
          { name: "Geomatics Profession Act 19 of 2013", what: "Registration of geomatics practitioners with the South African Geomatics Council; formal surveys are done by registered practitioners." },
        ],
        certificateNote:
          "The course teaches drone flight planning and mapping. It does not give you a SACAA remote pilot licence, and it does not register you with the South African Geomatics Council. Your Paleon certificate of completion shows the GIS and drone-mapping work you have done.",
        faqs: [
          ["Which software does it use?", "QGIS, which is free, plus free satellite imagery sources."],
          ["Do I need my own drone?", "No. Sample drone data is used for the mapping exercises."],
          ["Does it cover SACAA drone rules?", "The regulation lesson uses Nigeria's rules as the worked example. Commercial drone work in South Africa needs a SACAA remote pilot licence; check Part 101 and the SACAA's requirements."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by card or EFT."],
        ],
      },
      "digital-marketing": {
        title: "Digital Marketing Course Online in South Africa | Paleon",
        description:
          "Practical digital marketing course for learners in South Africa: SEO, Google Ads, content, email and analytics, with POPIA-aware email marketing. {FEE}.",
        h1: "Digital Marketing: online course for South Africa",
        intro:
          "A practical course in attracting customers online and proving what works: SEO, Google Ads, content, email, analytics and automation. It suits South African graduates aiming for marketing roles in retail, fintech and agencies, and business owners who sell online.",
        whoFor: [
          "Graduates and students who want a marketing, communications or growth role",
          "Small business owners selling online who want more customers for their budget",
          "Marketing staff moving into paid search, email and analytics",
        ],
        usedIn: [
          { sector: "Retail and e-commerce", example: "Retailers and online stores need search, ads and email that turn visits into orders." },
          { sector: "Fintech and financial services", example: "Banks, insurers and fintechs acquire customers online and measure every campaign." },
          { sector: "SMEs and agencies", example: "Agencies and small businesses need people who can plan campaigns and report results." },
        ],
        laws: [
          { name: "POPIA, section 69", what: "Direct marketing by electronic communication (email, SMS) generally needs the person's opt-in consent unless they are an existing customer." },
          { name: "Consumer Protection Act 68 of 2008", what: "Covers fair marketing and consumers' right to block direct marketing." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished the course and its capstone campaign plan. It is not a QCTO-registered qualification or a Google Ads certification, though the course prepares you well for Google's free certifications.",
        faqs: [
          ["Is it suitable for beginners?", "Yes. It starts with the marketing funnel and builds up to SEO, paid search, analytics and automation."],
          ["Does it cover POPIA for email marketing?", "The email lesson covers list building, consent and deliverability in general terms. Read POPIA section 69 alongside it before emailing South African contacts."],
          ["Can I use it for my own business?", "Yes. The capstone is a full campaign plan, which can be for your own business."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by card or EFT."],
        ],
      },
      "hse-fundamentals": {
        title: "HSE Course Online in South Africa | Paleon Training",
        description:
          "Beginner HSE (OHS) course for learners in South Africa: hazards, risk assessment, permit to work, emergencies and incidents, for mining and construction. {FEE}.",
        h1: "HSE Fundamentals: online course for South Africa",
        intro:
          "An introduction to Health, Safety and Environment (often called OHS in South Africa): identifying hazards, assessing risk, safe systems of work and responding to incidents. The lessons are set in oil &amp; gas, and the same principles apply on South African mines, construction sites and plants.",
        whoFor: [
          "Graduates and TVET students who want a first step towards an OHS or SHE officer role",
          "Workers and supervisors on mines, construction sites and plants who want to understand safety systems",
          "Anyone preparing for a recognised qualification such as SAMTRAC or NEBOSH who wants the foundations first",
        ],
        usedIn: [
          { sector: "Mining", example: "Mines run on risk assessments, permits, safety representatives and incident investigation under dedicated mine safety law." },
          { sector: "Construction", example: "Contractors need people who can run inspections, toolbox talks and site safety files." },
          { sector: "Manufacturing and energy", example: "Plants and energy sites rely on hazard identification, PPE and emergency response." },
        ],
        laws: [
          { name: "Occupational Health and Safety Act 85 of 1993", what: "South Africa's main workplace safety law, enforced by the Department of Employment and Labour." },
          { name: "Mine Health and Safety Act 29 of 1996", what: "Safety law for mines, enforced by the Mine Health and Safety Inspectorate." },
          { name: "Construction Regulations, 2014", what: "Safety duties for clients, contractors and safety officers on construction work." },
        ],
        certificateNote:
          "Your Paleon certificate of completion shows you finished an introductory HSE course. It is not a QCTO-registered qualification, SAMTRAC, NEBOSH or a SACPCMP registration, which employers may ask for in OHS officer roles. This course is a practical foundation for them.",
        faqs: [
          ["Is this the same as SAMTRAC or NEBOSH?", "No. Those are recognised, examined qualifications. This is a shorter, practical introduction that many people take first."],
          ["Does it cover the OHS Act?", "The legal lesson uses Nigerian regulation and international standards as its examples. Read the OHS Act, the Mine Health and Safety Act and the Construction Regulations alongside it."],
          ["Is it useful for mining?", "Yes. Hazard identification, permits, PPE, emergencies and incident investigation work the same way on a mine as on an oil &amp; gas site."],
          ["How much is it?", "{FEE}, or start with a {DEPOSIT} deposit. Pay by card or EFT."],
        ],
      },
    },
  },
};

// Background reading that isn't Nigeria-specific, per course.
const READING: Record<HomepageCourse, [string, string][]> = {
  "cyber-security-fundamentals": [
    ["/what-is-a-soc-analyst", "What does a SOC analyst do?"],
    ["/network-security-basics-for-beginners-nigeria", "Network security basics for beginners"],
    ["/cloud-security-basics-for-beginners-nigeria", "Cloud security basics for beginners"],
  ],
  "gis-and-drone-mapping": [
    ["/what-is-gis-course", "What is a GIS course?"],
    ["/is-gis-a-good-career", "Is GIS a good career?"],
    ["/qgis-vs-arcgis-for-beginners-nigeria", "QGIS vs ArcGIS for beginners"],
  ],
  "digital-marketing": [
    ["/top-skills-employers-want-in-2026", "Top skills employers want"],
    ["/interview-prep-for-digital-roles-nigeria", "Interview prep for digital roles"],
  ],
  "hse-fundamentals": [
    ["/is-nebosh-igc-worth-it", "Is NEBOSH IGC worth it?"],
    ["/safety-officer-vs-hse-officer-nigeria", "Safety officer vs HSE officer"],
  ],
};

export function isCountryCoursePage(country: string, slug: string): boolean {
  return (COURSE_PAGE_COUNTRIES as string[]).includes(country) && (HOMEPAGE_COURSES as readonly string[]).includes(slug);
}

function jsonLd(country: LocalCountry, slug: HomepageCourse, url: string): object {
  const c = COUNTRIES[country];
  const local = localCourse(country, slug);
  const info = COURSE_INFO[slug];
  const price = c.site.coursePrices?.[slug];
  const home = `${ORIGIN}${c.site.path}`;
  const plainText = (s: string) => s.replace(/&amp;/g, "&").replace(/&[a-z]+;/g, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: info.title,
        description: plainText(local.intro),
        url,
        inLanguage: "en",
        educationalLevel: "Beginner",
        provider: { "@type": "Organization", name: "Paleon Training", url: `${ORIGIN}/` },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: `P${info.days}D`,
        },
        // Only real, confirmed prices for a country that's taking payments go to search.
        ...(isLive(country) && price
          ? { offers: { "@type": "Offer", category: "Paid", priceCurrency: c.site.currency.code, price: String(price) } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: `Paleon Training ${c.name}`, item: home },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${home}#courses` },
          { "@type": "ListItem", position: 3, name: info.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: local.faqs.map(([q, a]) => ({
          "@type": "Question",
          name: plainText(q),
          acceptedAnswer: { "@type": "Answer", text: plainText(a) },
        })),
      },
    ],
  };
}

// {FEE} and {DEPOSIT} in the copy come from countries.ts, so a price change there can't
// leave a page quoting the old amount.
function localCourse(country: LocalCountry, slug: HomepageCourse): LocalCourse {
  const raw = COPY[country].courses[slug];
  const fill = (s: string) =>
    s.split("{FEE}").join(coursePriceLabel(country, slug)).split("{DEPOSIT}").join(depositLabel(country));
  return {
    ...raw,
    title: fill(raw.title),
    description: fill(raw.description),
    faqs: raw.faqs.map(([q, a]) => [fill(q), fill(a)] as [string, string]),
  };
}

export function renderCountryCourse(country: LocalCountry, slug: HomepageCourse): string {
  const c = COUNTRIES[country];
  const local = localCourse(country, slug);
  const info = COURSE_INFO[slug];
  const home = c.site.path;
  const path = coursePagePath(country, slug);
  const url = `${ORIGIN}${path}`;
  const live = isLive(country);
  const ctx = { country, hub: false, detected: null, chosen: null };
  const fee = coursePriceLabel(country, slug);
  const deposit = depositLabel(country);
  const enrol = live
    ? `<a class="btn btn-signal btn-lg" href="/register?course=${slug}&amp;country=${country}">Start for ${text(deposit)}</a>`
    : `<a class="btn btn-signal btn-lg" href="${home}#waitlist">Join the ${escapeHtml(c.name)} waitlist</a>`;
  const others = HOMEPAGE_COURSES.filter((s) => s !== slug);

  return `${head(ctx, {
    title: local.title,
    description: local.description,
    canonicalPath: path,
    alternatesFor: (code) => coursePagePath(code, slug),
    xDefault: info.page,
    jsonLd: jsonLd(country, slug, url),
  })}
<body data-country="${country}"${whatsappAttr(country)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${header(ctx, home)}
<main id="main">
  <section class="hero cc-hero">
    <div class="wrap hero-inner">
      <nav class="cc-crumbs" aria-label="Breadcrumb">
        <a href="${home}">${escapeHtml(c.name)}</a> <span aria-hidden="true">/</span>
        <a href="${home}#courses">Courses</a> <span aria-hidden="true">/</span>
        <span aria-current="page">${info.title}</span>
      </nav>
      <span class="eyebrow">Online course &middot; ${escapeHtml(c.name)} &middot; ${info.days} days &middot; ${info.lessons} lessons &middot; Beginner</span>
      <h1 class="hero-title">${local.h1}</h1>
      <p class="hero-sub">${local.intro}</p>
      <div class="hero-ctas">
        <a class="btn btn-outline-light btn-lg" href="/preview/${slug}">Try the first lesson free</a>
        ${enrol}
      </div>
      <p class="cc-fee">Course fee <strong>${text(fee)}</strong> &middot; or start with ${text(deposit)} &middot; pay with ${text(c.site.paymentMethods)}${live ? "" : `<br>Payments in ${escapeHtml(c.name)} open soon. The first lesson is free to try now.`}</p>
    </div>
  </section>

  <section class="section section-paper">
    <div class="wrap cc-body">
      <h2 class="section-title">Who this course is for in ${escapeHtml(c.name)}</h2>
      <p>It is written for ${COPY[country].audience}. No previous experience is needed.</p>
      <ul class="cc-list">${local.whoFor.map((w) => `<li>${w}</li>`).join("")}</ul>

      <h2 class="section-title">Where these skills are used in ${escapeHtml(c.name)}</h2>
      <p>The course's industry pathways most relevant here: ${text(c.site.pathways[slug])}.</p>
      <dl class="cc-uses">${local.usedIn.map((u) => `<div><dt>${u.sector}</dt><dd>${u.example}</dd></div>`).join("")}</dl>
      <p>See what ${COPY[country].adjective} employers are advertising right now on our <a href="${jobsBoardPath(country)}">latest jobs board for ${escapeHtml(c.name)}</a>, updated daily.</p>

      <h2 class="section-title">${COPY[country].adjective} laws and regulators to know</h2>
      <p>The lessons are the same in every country and use Nigerian regulation as their worked examples. They teach the principles, not ${escapeHtml(c.name)}&rsquo;s law in detail, so read these alongside the course:</p>
      <dl class="cc-uses">${local.laws.map((l) => `<div><dt>${l.name}</dt><dd>${l.what}</dd></div>`).join("")}</dl>

      <h2 class="section-title">What you&rsquo;ll learn</h2>
      <table class="cc-table">
        <thead><tr><th scope="col">Day</th><th scope="col">Topic</th></tr></thead>
        <tbody>${OUTLINE[slug].map(([d, t]) => `<tr><td>${d}</td><td>${t}</td></tr>`).join("")}</tbody>
      </table>
      <p>Every lesson is illustrated and has a matching video. Each day ends with a short quiz and an assignment, and the course finishes with a capstone project you can show employers. It is self-paced with lifetime access, and you can try the <a href="/preview/${slug}">first lesson free</a> before paying.</p>

      <h2 class="section-title">Your certificate, and what it isn&rsquo;t</h2>
      <p>${local.certificateNote}</p>
      <p>When you finish, including the capstone, we help you write a CV that presents your project as real work, and provide a reference confirming what you completed. We teach skills; we don&rsquo;t promise jobs.</p>

      <h2 class="section-title">Who runs the course</h2>
      <p>Paleon Training Limited is an online training company registered in Nigeria (Warri, Delta State), with operations in the United Kingdom. There is no Paleon office in ${escapeHtml(c.name)}: the course is taught entirely online, and you can reach us by WhatsApp on ${escapeHtml(c.site.whatsapp.display)} or at <a href="mailto:hello@paleontraining.com">hello@paleontraining.com</a>.</p>

      <h2 class="section-title">Frequently asked questions</h2>
      <div class="cc-faq">${local.faqs.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join("")}</div>

      <h2 class="section-title">Keep exploring</h2>
      <ul class="cc-list cc-links">
        ${others.map((s) => `<li><a href="${coursePagePath(country, s)}">${COURSE_INFO[s].title} course for ${escapeHtml(c.name)}</a></li>`).join("")}
        <li><a href="${jobsBoardPath(country)}">Latest jobs in ${escapeHtml(c.name)}</a></li>
        <li><a href="${ambassadorsPath(country)}">Student Ambassador programme in ${escapeHtml(c.name)}</a></li>
        ${READING[slug].map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}
      </ul>
      <div class="hero-ctas cc-end">
        <a class="btn btn-outline-dark btn-lg" href="/preview/${slug}">Try the first lesson free</a>
        ${enrol.replace("btn-signal", "btn-ink")}
      </div>
    </div>
  </section>
</main>
${footer(ctx, home)}
${scripts(ctx)}
</body>
</html>
`;
}
