import { WeekSeed } from "./curriculumTypes";

export const WEEKS: WeekSeed[] = [
  {
    weekNumber: 2,
    moduleTitle: "Solar Resource Assessment and System Types",
    moduleDescription:
      "How real-world conditions affect solar efficiency, the tradeoffs between grid-tied, off-grid, and hybrid systems, and how to assess a location's solar resource using peak sun hour data.",
    lessons: [
      {
        title: "Real-World Solar Efficiency Factors",
        content:
          "Temperature, shading, dust accumulation, and panel angle all affect how much power a solar array actually produces compared to its rated specifications.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "System Architectures and Solar Resource Assessment",
        content:
          "Comparing grid-tied, off-grid, and hybrid system types, and using peak sun hour data to estimate a location's daily solar energy potential.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Delta State Solar Potential Calculation",
    assignmentDescription:
      "Using peak sun hour data, calculate estimated daily solar energy output for three different locations in Delta State and compare the results.",
    fileRequired: false,
    quizQuestions: [
      { text: "What effect does rising panel temperature typically have on a PV panel's efficiency?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It reduces the panel's efficiency", isCorrect: true },
        { text: "It increases the panel's efficiency", isCorrect: false },
        { text: "It has no measurable effect on efficiency at all", isCorrect: false },
      ]},
      { text: "Why can shading across even a small part of a panel meaningfully reduce its total output?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The reduction is disproportionate to the shaded area, not simply equal to it", isCorrect: true },
        { text: "Shading only affects panels during winter months", isCorrect: false },
        { text: "Shaded panels compensate automatically by drawing extra current from unshaded panels", isCorrect: false },
      ]},
      { text: "Why does regular panel cleaning matter as an ongoing maintenance task in dusty environments?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Dust and dirt accumulation gradually reduces panel performance over time", isCorrect: true },
        { text: "Cleaning is required to keep the panel's rated efficiency specification legally valid", isCorrect: false },
        { text: "Dust buildup causes panels to overheat and shut down entirely", isCorrect: false },
      ]},
      { text: "Why does panel installation angle affect total system output?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Panels perform best when positioned to face the sun as directly as possible, ideally matched to the location's latitude", isCorrect: true },
        { text: "Angle only matters for preventing wind damage, not for energy output", isCorrect: false },
        { text: "Flat-mounted panels always outperform angled panels regardless of location", isCorrect: false },
      ]},
      { text: "Which system type connects directly to the centralized grid, feeds back excess power, and includes no battery storage?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Grid-tied", isCorrect: true },
        { text: "Off-grid", isCorrect: false },
        { text: "Hybrid", isCorrect: false },
      ]},
      { text: "Which system type operates entirely independently, relying solely on solar generation and battery storage?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Off-grid", isCorrect: true },
        { text: "Grid-tied", isCorrect: false },
        { text: "Hybrid", isCorrect: false },
      ]},
      { text: "Which system type combines a grid connection with battery storage for backup power or peak-time savings?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Hybrid", isCorrect: true },
        { text: "Grid-tied", isCorrect: false },
        { text: "Off-grid", isCorrect: false },
      ]},
      { text: "Why is a grid-tied system generally the least expensive of the three architectures?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It doesn't require battery storage at all", isCorrect: true },
        { text: "It uses smaller, lower-wattage panels than other system types", isCorrect: false },
        { text: "It requires no inverter", isCorrect: false },
      ]},
      { text: "What is a significant limitation of a grid-tied system for a customer in an area with unreliable grid access?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It provides no backup power during a grid outage", isCorrect: true },
        { text: "It cannot legally be installed in Nigeria", isCorrect: false },
        { text: "It requires a larger battery bank than an off-grid system", isCorrect: false },
      ]},
      { text: "What does solar irradiance measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The power of solar radiation received per unit of surface area", isCorrect: true },
        { text: "The total number of daylight hours in a given day", isCorrect: false },
        { text: "The percentage of sunlight a panel converts into electricity", isCorrect: false },
      ]},
      { text: "What do 'peak sun hours' represent?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The equivalent number of hours per day at a standardized ideal irradiance level that delivers the same total daily energy as actual conditions", isCorrect: true },
        { text: "The exact number of hours the sun is above the horizon each day", isCorrect: false },
        { text: "The hours during which a panel reaches its absolute maximum possible temperature", isCorrect: false },
      ]},
      { text: "Which freely available database is mentioned as a reliable source of solar irradiance data?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "NASA's POWER database", isCorrect: true },
        { text: "The World Bank Climate Registry", isCorrect: false },
        { text: "The Nigerian Meteorological Efficiency Index", isCorrect: false },
      ]},
      { text: "In the estimated daily energy output formula described in the lecture, what three factors are multiplied together?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Total panel capacity, peak sun hours, and an overall system efficiency factor", isCorrect: true },
        { text: "Panel cost, battery capacity, and inverter rating", isCorrect: false },
        { text: "Voltage, current, and total number of panels", isCorrect: false },
      ]},
      { text: "Why does real historical climate data matter more than a single average annual peak sun hour figure for a Delta State location?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Because meaningful seasonal variation exists between wetter and drier periods", isCorrect: true },
        { text: "Because peak sun hours are only measurable during the dry season", isCorrect: false },
        { text: "Because average figures are not published for any Nigerian region", isCorrect: false },
      ]},
      { text: "PV panels typically lose some efficiency as they get hotter.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Shading across even a small part of a panel reduces output only in exact proportion to the shaded area.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Hybrid systems are often described as the most sensible practical choice for many Nigerian customers dealing with a partially reliable grid.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Off-grid systems generally require a smaller battery bank than grid-tied systems.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between a grid-tied and an off-grid solar system.", type: "short_answer", points: 1, explanation: "Grid-tied systems connect to the centralized grid and require no battery storage but provide no backup during outages; off-grid systems operate independently using solar plus battery storage to meet all energy needs without any grid connection.", answers: [] },
      { text: "In one or two sentences, explain what peak sun hours represent and why they're useful for system design.", type: "short_answer", points: 1, explanation: "Peak sun hours represent the equivalent number of hours per day at a standardized ideal irradiance level that would deliver the same total daily energy as the location's actual variable sunlight, simplifying daily energy output calculations.", answers: [] },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "Component Sizing and Complete System Design",
    moduleDescription:
      "How to calculate customer load, size every major system component, use professional design software, and estimate cost and ROI for a complete solar installation.",
    lessons: [
      {
        title: "Load Calculation and Component Sizing",
        content:
          "How to calculate a customer's total energy needs and use that figure to properly size panels, inverters, charge controllers, and wiring.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Design Software, Safety, and Cost Analysis",
        content:
          "An overview of PVsyst and HOMER design software, essential electrical safety practices, and how to estimate system cost and calculate return on investment.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Solar System Design Document with Bill of Materials",
    assignmentDescription:
      "Produce a complete system design document, including a full bill of materials, for a residential or commercial customer scenario.",
    fileRequired: true,
    quizQuestions: [
      { text: "According to the lecture, what should every proper solar system design start with?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A careful understanding of exactly how much energy the customer actually needs", isCorrect: true },
        { text: "Selecting the cheapest available panels on the market", isCorrect: false },
        { text: "Choosing an inverter brand before anything else", isCorrect: false },
      ]},
      { text: "How is a single device's daily energy consumption calculated during load calculation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Its power consumption in watts multiplied by the hours per day it's typically used", isCorrect: true },
        { text: "Its power consumption in watts divided by the number of panels in the array", isCorrect: false },
        { text: "Its voltage rating multiplied by the total number of devices in the home", isCorrect: false },
      ]},
      { text: "What is described as the single most common point of failure in amateur solar system design?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Inaccurate load calculation", isCorrect: true },
        { text: "Choosing the wrong panel color", isCorrect: false },
        { text: "Poor charge controller brand selection", isCorrect: false },
      ]},
      { text: "What is the practical consequence of significantly overestimating a customer's actual load?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An unnecessarily and needlessly expensive system", isCorrect: true },
        { text: "A system that cannot legally be connected to the grid", isCorrect: false },
        { text: "A system that automatically underperforms its rated capacity", isCorrect: false },
      ]},
      { text: "How is required panel capacity generally calculated?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Total daily energy need divided by peak sun hours, with a reasonable safety margin applied", isCorrect: true },
        { text: "Total daily energy need multiplied by the number of batteries installed", isCorrect: false },
        { text: "The customer's monthly electricity bill divided by the cost per panel", isCorrect: false },
      ]},
      { text: "What is the core function of an inverter in a solar system?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Converting DC power from panels and batteries into AC power for appliances", isCorrect: true },
        { text: "Converting AC grid power into DC power for battery charging only", isCorrect: false },
        { text: "Regulating the charging current flowing into the batteries", isCorrect: false },
      ]},
      { text: "Why must inverters typically include an additional safety margin beyond simple peak demand?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "To handle brief power surges when large appliances like a compressor or water pump first switch on", isCorrect: true },
        { text: "To compensate for panels losing efficiency in cold weather", isCorrect: false },
        { text: "To meet a fixed legal minimum size regardless of actual system needs", isCorrect: false },
      ]},
      { text: "What is the primary role of a charge controller in a system with battery storage?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Regulating the flow of electricity from the panels into the batteries and protecting against overcharging", isCorrect: true },
        { text: "Converting DC electricity into AC electricity for household appliances", isCorrect: false },
        { text: "Measuring and reporting the customer's total daily energy consumption", isCorrect: false },
      ]},
      { text: "What is a genuine consequence of undersized wiring in a solar installation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Safety hazards through overheating and reduced efficiency from resistive power loss", isCorrect: true },
        { text: "Increased panel efficiency due to lower material cost", isCorrect: false },
        { text: "Automatic shutdown of the inverter to protect the batteries", isCorrect: false },
      ]},
      { text: "What is PVsyst primarily used for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Detailed solar system simulation against real historical local climate data", isCorrect: true },
        { text: "Automatically generating a customer's monthly electricity bill", isCorrect: false },
        { text: "Managing customer support tickets for installed systems", isCorrect: false },
      ]},
      { text: "What does HOMER specialize in?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Optimizing hybrid systems, including those combining solar with diesel generator backup", isCorrect: true },
        { text: "Detailed structural analysis of rooftop mounting hardware", isCorrect: false },
        { text: "Tracking customer payments for leased solar equipment", isCorrect: false },
      ]},
      { text: "Which of the following is listed as a key electrical safety consideration in system design?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Proper grounding to protect against dangerous electrical faults", isCorrect: true },
        { text: "Removing circuit breakers to simplify the wiring layout", isCorrect: false },
        { text: "Placing all components as close together as physically possible regardless of access", isCorrect: false },
      ]},
      { text: "What is the formula for a simple payback period, as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Total system cost divided by realistic estimated annual savings", isCorrect: true },
        { text: "Total system cost multiplied by the system's expected lifespan in years", isCorrect: false },
        { text: "Annual savings divided by the number of panels installed", isCorrect: false },
      ]},
      { text: "What does a Bill of Materials (BOM) provide?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An itemized list of every component required, along with quantities and cost", isCorrect: true },
        { text: "A record of every customer complaint received during installation", isCorrect: false },
        { text: "A simulation of expected system output over its operational lifetime", isCorrect: false },
      ]},
      { text: "Using actual measured consumption data is preferable to relying purely on rough estimates when calculating load.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Solar panels and batteries produce alternating current (AC) directly, so no inverter is needed to power household appliances.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "HOMER software is specifically highlighted as useful for optimizing systems that include diesel generator backup.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Proper electrical safety design in solar installations is described in the lecture as an optional nice-to-have rather than a firm requirement.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain why accurate load calculation matters so much in solar system design.", type: "short_answer", points: 1, explanation: "Underestimating load produces a system that can't reliably meet the customer's needs, while overestimating it produces an unnecessarily expensive system, making accurate load calculation critical to good design.", answers: [] },
      { text: "In one or two sentences, explain the difference between what PVsyst and HOMER are each used for.", type: "short_answer", points: 1, explanation: "PVsyst is used for detailed solar system simulation against historical climate data to predict performance, while HOMER specializes in optimizing hybrid systems that combine solar with other sources like diesel generators.", answers: [] },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Battery Chemistry, Sizing, and Smart Energy Management",
    moduleDescription:
      "The major battery chemistries and their tradeoffs, how to size a battery bank, and how battery management systems, smart energy management, and microgrids keep stored power safe and well used.",
    lessons: [
      {
        title: "Battery Chemistry and Sizing",
        content:
          "Comparing lead-acid, lithium-ion, and flow battery technologies, and how depth of discharge and days of autonomy determine required battery capacity.",
        order: 1,
        durationMinutes: 28,
      },
      {
        title: "Battery Management, Smart Energy Systems, and Microgrids",
        content:
          "How battery management systems protect batteries, how smart energy management optimizes power flow, and how microgrids combine generation, storage, and control at a larger scale.",
        order: 2,
        durationMinutes: 32,
      },
    ],
    assignmentTitle: "Battery Storage Economics and Technology Comparison",
    assignmentDescription:
      "Analyze the economics of adding battery storage to a solar installation and compare lead-acid, lithium-ion, and flow battery technology options for a given customer scenario.",
    fileRequired: true,
    quizQuestions: [
      { text: "Which battery chemistry is described as the most established, mature, and generally least expensive upfront option?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Lead-acid", isCorrect: true },
        { text: "Lithium-ion", isCorrect: false },
        { text: "Flow batteries", isCorrect: false },
      ]},
      { text: "To roughly what percentage of capacity should lead-acid batteries generally not be discharged below?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "50 percent", isCorrect: true },
        { text: "10 percent", isCorrect: false },
        { text: "90 percent", isCorrect: false },
      ]},
      { text: "Which battery chemistry can typically be safely discharged much more deeply, often to 80 or 90 percent of capacity?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Lithium-ion", isCorrect: true },
        { text: "Lead-acid", isCorrect: false },
        { text: "Flow batteries", isCorrect: false },
      ]},
      { text: "What is described as lithium-ion's genuine downside compared to lead-acid?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Meaningfully higher upfront cost", isCorrect: true },
        { text: "A significantly shorter usable lifespan", isCorrect: false },
        { text: "The need for much more frequent routine maintenance", isCorrect: false },
      ]},
      { text: "Where does a flow battery store its energy?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "In external liquid electrolyte tanks", isCorrect: true },
        { text: "In solid lithium cells packed into a sealed case", isCorrect: false },
        { text: "In a lead-plate array submerged in acid", isCorrect: false },
      ]},
      { text: "Flow batteries are generally described as more relevant for which kind of installation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Larger, utility-scale installations", isCorrect: true },
        { text: "Small residential rooftop systems", isCorrect: false },
        { text: "Portable off-grid camping setups", isCorrect: false },
      ]},
      { text: "What does 'depth of discharge' (DoD) indicate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "What percentage of total battery capacity is safely usable", isCorrect: true },
        { text: "How many hours it takes to fully recharge a battery", isCorrect: false },
        { text: "The total lifetime energy a battery can store before replacement", isCorrect: false },
      ]},
      { text: "What does 'days of autonomy' indicate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How many consecutive days a battery system can reliably supply power without any solar charging", isCorrect: true },
        { text: "How many days a battery warranty remains valid after installation", isCorrect: false },
        { text: "The number of days required to fully install a battery bank", isCorrect: false },
      ]},
      { text: "Why does battery sizing carry especially serious weight for off-grid systems?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Insufficient capacity directly means real power outages, since there's no grid to fall back on", isCorrect: true },
        { text: "Off-grid batteries are legally required to be oversized by regulation", isCorrect: false },
        { text: "Off-grid systems cannot use lithium-ion batteries at all", isCorrect: false },
      ]},
      { text: "What is the primary role of a Battery Management System (BMS)?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Monitoring individual cell voltage and temperature and protecting against overcharging or over-discharging", isCorrect: true },
        { text: "Converting DC battery output into AC power for appliances", isCorrect: false },
        { text: "Automatically cleaning dust off nearby solar panels", isCorrect: false },
      ]},
      { text: "Why is a properly functioning BMS especially critical for lithium-ion systems specifically?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Damaged or improperly managed lithium-ion cells can, in rare cases, pose real fire risk", isCorrect: true },
        { text: "Lithium-ion batteries cannot generate any current without a BMS present", isCorrect: false },
        { text: "Lithium-ion batteries require a BMS to legally qualify for a warranty", isCorrect: false },
      ]},
      { text: "What is one example given of what a smart energy management system can do?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Automatically switch between solar, battery, and grid power sources based on real-time conditions", isCorrect: true },
        { text: "Physically rotate panels to track the sun's position throughout the day", isCorrect: false },
        { text: "Automatically negotiate lower electricity prices with the utility company", isCorrect: false },
      ]},
      { text: "What must a microgrid control system manage in real time?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The balance between variable solar generation, battery state of charge, and real-time customer demand", isCorrect: true },
        { text: "Only the physical security of the installation site", isCorrect: false },
        { text: "The scheduling of customer support technician visits", isCorrect: false },
      ]},
      { text: "When does the economic case for adding battery storage strengthen considerably, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "When grid access is genuinely unreliable, or for time-of-use optimization", isCorrect: true },
        { text: "Only when the customer plans to sell the system within one year", isCorrect: false },
        { text: "Only in locations with no access to solar panels at all", isCorrect: false },
      ]},
      { text: "Lithium-ion batteries generally have a shorter usable lifespan than lead-acid batteries.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Flow batteries can be scaled up simply by using larger tanks.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "For grid-support battery systems, sizing requirements are generally more flexible than for off-grid systems, since the grid remains available as backup.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Battery costs have risen substantially over the past decade, making storage a smaller share of total system cost.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the main tradeoff between lead-acid and lithium-ion batteries for a typical residential solar project.", type: "short_answer", points: 1, explanation: "Lead-acid batteries cost less upfront but have a shorter lifespan, need more maintenance, and can't be discharged as deeply; lithium-ion batteries cost more upfront but last longer, are more efficient, and support deeper discharge.", answers: [] },
      { text: "In one or two sentences, explain what a Battery Management System (BMS) does and why it matters.", type: "short_answer", points: 1, explanation: "A BMS monitors individual cell voltage and temperature, prevents damaging overcharging or over-discharging, and balances charge across cells, which is essential for battery longevity and for preventing safety risks like fire in lithium-ion packs.", answers: [] },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Digital Monitoring, Sensors, and Dashboards",
    moduleDescription:
      "How IoT sensors, communication protocols, SCADA systems, and well-designed dashboards let operators track solar system performance and catch problems in real time.",
    lessons: [
      {
        title: "IoT Sensors, Communication Protocols, and SCADA",
        content:
          "How IoT sensors collect system data, the tradeoffs between WiFi, cellular, and LoRaWAN connectivity, and how SCADA systems add remote monitoring and control.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Real-Time Monitoring, Data Logging, and Dashboards",
        content:
          "Using real-time and historical performance data to catch problems early, configuring effective alerts, and designing a dashboard that presents key metrics clearly.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Solar Monitoring Dashboard Design",
    assignmentDescription:
      "Design a complete monitoring dashboard for a solar installation, identifying the key metrics to track and how to present them clearly to a system owner or maintenance technician.",
    fileRequired: true,
    quizQuestions: [
      { text: "Which communication protocol is described as offering high bandwidth but requiring reasonably reliable local internet infrastructure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "WiFi", isCorrect: true },
        { text: "LoRaWAN", isCorrect: false },
        { text: "Satellite radio", isCorrect: false },
      ]},
      { text: "Which protocol is well suited to remote installations lacking local WiFi, though it requires an ongoing data plan?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Cellular connectivity", isCorrect: true },
        { text: "LoRaWAN", isCorrect: false },
        { text: "WiFi", isCorrect: false },
      ]},
      { text: "Which protocol is described as low-power and long-range, suited to small, infrequent data transmissions with excellent sensor battery life?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "LoRaWAN", isCorrect: true },
        { text: "Cellular connectivity", isCorrect: false },
        { text: "WiFi", isCorrect: false },
      ]},
      { text: "What distinguishes a SCADA system from simple passive monitoring?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It also enables genuine remote control, letting operators adjust settings without being physically present", isCorrect: true },
        { text: "It only works with lithium-ion battery systems", isCorrect: false },
        { text: "It eliminates the need for any IoT sensors at all", isCorrect: false },
      ]},
      { text: "For what kind of installations does SCADA-level monitoring and control become increasingly valuable, and at real scale, often necessary?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Larger commercial or microgrid installations", isCorrect: true },
        { text: "Single residential rooftop systems only", isCorrect: false },
        { text: "Systems that don't use any battery storage", isCorrect: false },
      ]},
      { text: "What does real-time performance monitoring compare?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Actual current system performance against expected performance under current real conditions", isCorrect: true },
        { text: "Today's output against the output from exactly one year ago", isCorrect: false },
        { text: "The customer's electricity bill against the national average", isCorrect: false },
      ]},
      { text: "What is described as often the earliest sign of a developing system problem?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A meaningful gap between expected and actual performance", isCorrect: true },
        { text: "A sudden increase in the number of panels installed", isCorrect: false },
        { text: "A decrease in the customer's monthly electricity bill", isCorrect: false },
      ]},
      { text: "Why is historical data logging valuable beyond simple real-time display?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It enables trend analysis, showing whether performance is gradually declining or staying consistent over time", isCorrect: true },
        { text: "It automatically repairs faulty wiring connections", isCorrect: false },
        { text: "It replaces the need for any real-time monitoring at all", isCorrect: false },
      ]},
      { text: "What is one tradeoff of local, on-site data storage compared to cloud storage?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Local storage remains accessible during an internet outage, while cloud storage depends on connectivity but enables remote access", isCorrect: true },
        { text: "Local storage is always more expensive than cloud storage", isCorrect: false },
        { text: "Local storage cannot record battery state of charge", isCorrect: false },
      ]},
      { text: "What is the purpose of alarm and alert systems?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Automatically notifying relevant operators when specific defined conditions occur", isCorrect: true },
        { text: "Physically shutting down the entire system whenever any sensor reports data", isCorrect: false },
        { text: "Replacing the need for periodic panel cleaning", isCorrect: false },
      ]},
      { text: "What risk is described if a monitoring system generates too many minor or inconsequential alerts?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Operators start ignoring them entirely", isCorrect: true },
        { text: "The system automatically disables itself for safety", isCorrect: false },
        { text: "The customer's electricity bill increases", isCorrect: false },
      ]},
      { text: "What risk is described if a monitoring system has too few alerts configured?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Genuinely serious problems go unnoticed for far too long", isCorrect: true },
        { text: "The dashboard becomes too cluttered to read", isCorrect: false },
        { text: "The battery management system stops functioning", isCorrect: false },
      ]},
      { text: "What should a well-designed dashboard show at a glance?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Key performance indicators like current generation, battery status, and total energy produced", isCorrect: true },
        { text: "The complete raw sensor data log for the past five years", isCorrect: false },
        { text: "Only the original system design document", isCorrect: false },
      ]},
      { text: "Beyond catching problems early, what other purpose does monitoring data serve, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Providing concrete evidence of system value that supports ROI calculations", isCorrect: true },
        { text: "Replacing the need for a formal system design document", isCorrect: false },
        { text: "Automatically negotiating a lower price with equipment suppliers", isCorrect: false },
      ]},
      { text: "IoT sensors are described as small, relatively inexpensive devices that measure parameters and transmit data to a central system.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "LoRaWAN is best suited to applications requiring large amounts of data transmitted frequently.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "SCADA systems only collect data passively and cannot be used to remotely control a system.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A significant gap between expected and actual system performance can be an early indicator of a developing problem.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between WiFi, cellular, and LoRaWAN as communication protocols for solar monitoring sensors.", type: "short_answer", points: 1, explanation: "WiFi offers high bandwidth but needs reliable local internet; cellular works well for remote sites without WiFi but needs a data plan; LoRaWAN is a low-power, long-range option best suited to small, infrequent data transmissions with excellent sensor battery life.", answers: [] },
      { text: "In one or two sentences, explain why alert threshold configuration requires a careful balance.", type: "short_answer", points: 1, explanation: "Too many alerts, including minor ones, cause operators to start ignoring them, while too few alerts let genuinely serious problems go unnoticed for too long, so thresholds need to be tuned carefully.", answers: [] },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "Diagnostics, Maintenance, and System Security",
    moduleDescription:
      "How to measure system performance with concrete metrics, methodically diagnose and troubleshoot faults, and build preventive and predictive maintenance practices that keep a solar installation secure and reliable.",
    lessons: [
      {
        title: "Performance Metrics and Fault Diagnosis",
        content:
          "Using performance ratio, capacity factor, and availability to measure system health, and applying structured troubleshooting to diagnose common solar system faults.",
        order: 1,
        durationMinutes: 28,
      },
      {
        title: "Preventive Maintenance, Predictive Analytics, and Security",
        content:
          "Building preventive maintenance schedules, using historical data for predictive maintenance, securing digital monitoring systems, and communicating clearly with customers.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Maintenance Manual and Troubleshooting Guide",
    assignmentDescription:
      "Create a complete maintenance manual and troubleshooting guide for a solar installation, covering routine preventive tasks and a structured process for diagnosing common faults.",
    fileRequired: true,
    quizQuestions: [
      { text: "What does 'performance ratio' measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Actual measured energy output against theoretical maximum output under current, actual conditions", isCorrect: true },
        { text: "The total cost of the system divided by its rated capacity", isCorrect: false },
        { text: "The number of alerts generated by the monitoring system per month", isCorrect: false },
      ]},
      { text: "What is 'capacity factor' particularly useful for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Longer-term trend analysis across weeks and months", isCorrect: true },
        { text: "Determining the correct wire gauge for a new installation", isCorrect: false },
        { text: "Calculating the customer's payback period", isCorrect: false },
      ]},
      { text: "What does 'availability' measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "What percentage of time a system was genuinely operational and available to produce power", isCorrect: true },
        { text: "How many hours of direct sunlight a location receives annually", isCorrect: false },
        { text: "The percentage of sunlight a panel converts into usable electricity", isCorrect: false },
      ]},
      { text: "What is the difference between fault detection and diagnosis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Detection identifies abnormal operation; diagnosis determines the actual underlying cause", isCorrect: true },
        { text: "Detection and diagnosis are two names for exactly the same process", isCorrect: false },
        { text: "Detection happens after repairs are made; diagnosis happens before installation", isCorrect: false },
      ]},
      { text: "Which of the following is listed as a common cause of significantly reduced system output?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Panel shading or accumulated dirt", isCorrect: true },
        { text: "A recently signed maintenance contract", isCorrect: false },
        { text: "Normal seasonal changes in daylight length alone", isCorrect: false },
      ]},
      { text: "What could cause a complete solar system shutdown, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A tripped safety breaker or a serious inverter fault", isCorrect: true },
        { text: "A slightly dusty panel surface", isCorrect: false },
        { text: "A minor drop in ambient temperature", isCorrect: false },
      ]},
      { text: "In effective, systematic diagnosis, where should a technician generally start checking first?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The simplest and most common, easiest-to-check causes", isCorrect: true },
        { text: "The most expensive component in the system", isCorrect: false },
        { text: "The customer's original loan payment history", isCorrect: false },
      ]},
      { text: "What is the first step of the structured troubleshooting methodology described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Clearly and precisely defining the specific problem, ideally using real monitoring data", isCorrect: true },
        { text: "Immediately replacing the most recently installed component", isCorrect: false },
        { text: "Contacting the equipment manufacturer before doing anything else", isCorrect: false },
      ]},
      { text: "Why is it important to change only one variable at a time when testing a troubleshooting hypothesis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "So you know with genuine confidence exactly what actually fixed the problem", isCorrect: true },
        { text: "Because most solar equipment warranties require it", isCorrect: false },
        { text: "Because it reduces the total cost of the repair", isCorrect: false },
      ]},
      { text: "What does preventive maintenance for solar installations typically include?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Regular panel cleaning, periodic wiring and mounting inspection, and battery health checks", isCorrect: true },
        { text: "Replacing all panels every twelve months regardless of condition", isCorrect: false },
        { text: "Disconnecting the system from monitoring during the rainy season", isCorrect: false },
      ]},
      { text: "What does predictive maintenance use to anticipate likely component failures?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Accumulated historical performance trends", isCorrect: true },
        { text: "The original manufacturer's marketing brochure", isCorrect: false },
        { text: "A fixed replacement schedule unrelated to actual performance", isCorrect: false },
      ]},
      { text: "What security practice is recommended for remote access to monitoring and control systems?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using genuinely strong, unique passwords", isCorrect: true },
        { text: "Sharing one universal password across every installed system", isCorrect: false },
        { text: "Disabling all software updates to avoid compatibility issues", isCorrect: false },
      ]},
      { text: "Why is an improperly secured monitoring and control system described as more than just a data privacy concern?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "For systems with real remote control capability, it represents a genuine safety and reliability risk if compromised", isCorrect: true },
        { text: "Because it always voids the equipment manufacturer's warranty", isCorrect: false },
        { text: "Because it automatically increases the customer's electricity bill", isCorrect: false },
      ]},
      { text: "What should effective customer communication about a diagnosed problem include?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Explaining the problem and its resolution in plain, non-technical language and setting realistic repair timelines", isCorrect: true },
        { text: "Using only detailed technical terminology to demonstrate expertise", isCorrect: false },
        { text: "Avoiding any written documentation to keep the interaction informal", isCorrect: false },
      ]},
      { text: "Performance ratio compares actual measured output against theoretical maximum output under current, actual conditions.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Effective diagnosis generally starts by assuming the most complex, rare component failure first.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A well-designed maintenance schedule specifies exactly what needs to be checked, how frequently, and by whom.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Predictive maintenance only reacts to a component once it has already fully failed.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between preventive and predictive maintenance.", type: "short_answer", points: 1, explanation: "Preventive maintenance performs regular, scheduled tasks to prevent failures from happening in the first place, while predictive maintenance uses accumulated performance trends to anticipate a specific failure before it actually occurs.", answers: [] },
      { text: "In one or two sentences, explain the four-step troubleshooting methodology described in the lecture.", type: "short_answer", points: 1, explanation: "Clearly define the problem using real monitoring data, form a specific testable hypothesis about the likely cause, test that hypothesis by changing one variable at a time, and thoroughly document both the problem and its resolution.", answers: [] },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Installation Safety, Compliance, and Commissioning",
    moduleDescription:
      "How to assess a site, sequence an installation safely, meet Nigerian safety and electrical code requirements, and properly test, commission, and hand over a completed system.",
    lessons: [
      {
        title: "Site Assessment, Sequencing, and Installation Safety",
        content:
          "Assessing a site before installation, following a proper installation sequence, and applying safety standards, electrical codes, and permitting requirements.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Budgeting, Quality Assurance, and Commissioning",
        content:
          "Building a realistic project budget and schedule, testing a finished installation for quality assurance, and properly commissioning and handing over a system to the customer.",
        order: 2,
        durationMinutes: 35,
      },
    ],
    assignmentTitle: "Installation Safety and Compliance Checklist",
    assignmentDescription:
      "Create a complete safety and compliance checklist covering site assessment, electrical code requirements, and permitting steps for a solar installation project.",
    fileRequired: true,
    quizQuestions: [
      { text: "What should a thorough site assessment verify regarding solar resource, before installation begins?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "That the site's actual solar resource matches the assumptions used in the original design", isCorrect: true },
        { text: "That the customer's electricity bill has been fully paid", isCorrect: false },
        { text: "That the site has never previously had any electrical work performed", isCorrect: false },
      ]},
      { text: "What physical condition must specifically be assessed for a rooftop installation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Roof structural integrity", isCorrect: true },
        { text: "The color of the roofing material", isCorrect: false },
        { text: "The age of the customer's electrical appliances", isCorrect: false },
      ]},
      { text: "What is the general installation sequence described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Mounting structure, then panels, then wiring and connections, then inverter and battery, then testing and commissioning", isCorrect: true },
        { text: "Inverter, then batteries, then panels, then mounting structure, then wiring", isCorrect: false },
        { text: "Wiring, then commissioning, then mounting structure, then panels", isCorrect: false },
      ]},
      { text: "Why does realistic installation timeline planning need to include weather contingency?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Electrical installation work generally cannot safely proceed during genuinely poor weather conditions", isCorrect: true },
        { text: "Panels perform better when installed during heavy rain", isCorrect: false },
        { text: "Weather has no real effect on installation scheduling", isCorrect: false },
      ]},
      { text: "What is one key safety practice mentioned for work at height on rooftop installations?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Proper fall protection", isCorrect: true },
        { text: "Working without a harness to move more quickly", isCorrect: false },
        { text: "Scheduling rooftop work only at night", isCorrect: false },
      ]},
      { text: "What must be done to electrical circuits before beginning work on them?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Correctly de-energize and clearly label them", isCorrect: true },
        { text: "Leave them fully energized to test connections as you go", isCorrect: false },
        { text: "Immediately disconnect them from the customer's property permanently", isCorrect: false },
      ]},
      { text: "What must every member of an installation team use throughout every stage of a project?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Appropriate personal protective equipment", isCorrect: true },
        { text: "A company-branded vehicle", isCorrect: false },
        { text: "A signed customer satisfaction survey", isCorrect: false },
      ]},
      { text: "Beyond bureaucratic formality, what does compliance with electrical codes genuinely ensure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "That the installation is safe for both the installation team and the customer over the system's operational lifetime", isCorrect: true },
        { text: "That the system automatically qualifies for the lowest available insurance rate", isCorrect: false },
        { text: "That the customer never needs future maintenance", isCorrect: false },
      ]},
      { text: "For which system types does connecting to the grid typically require formal utility approval?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Grid-tied and hybrid systems", isCorrect: true },
        { text: "Off-grid systems only", isCorrect: false },
        { text: "Systems with no battery storage installed", isCorrect: false },
      ]},
      { text: "Beyond original cost estimation, what must complete project budgeting also account for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Installation labor, required permits, and contingency for unexpected site conditions", isCorrect: true },
        { text: "Only the wholesale cost of the solar panels", isCorrect: false },
        { text: "The customer's personal monthly household budget", isCorrect: false },
      ]},
      { text: "What does quality assurance testing confirm before an installation is considered complete?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Electrical connections are secure, output roughly matches design expectations, and monitoring systems report accurate data", isCorrect: true },
        { text: "The customer has signed a long-term maintenance contract", isCorrect: false },
        { text: "The system has been operating for at least one full year", isCorrect: false },
      ]},
      { text: "How is 'commissioning' defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The formal process of verifying a completed system is genuinely ready for full, ongoing operation", isCorrect: true },
        { text: "The initial sales meeting with a prospective customer", isCorrect: false },
        { text: "The process of removing an old system before installing a new one", isCorrect: false },
      ]},
      { text: "What does the 'handover' process transfer to the customer?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The fully completed, tested system, along with operational training and support contact information", isCorrect: true },
        { text: "Ownership of the installation company's equipment inventory", isCorrect: false },
        { text: "A blank system design template for future modifications", isCorrect: false },
      ]},
      { text: "Why might the final documented system configuration differ from the original design?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Genuine site conditions may have required specific adjustments during actual installation", isCorrect: true },
        { text: "Documentation is always written before the design is finalized", isCorrect: false },
        { text: "Local regulations require the documentation to be intentionally inaccurate", isCorrect: false },
      ]},
      { text: "Skipping or rushing the permitting and grid connection process can create serious, costly delays later in a project.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Electrical installation work can generally proceed safely during any weather conditions, including severe storms.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Handover should include operational training, such as how to read the monitoring dashboard and basic troubleshooting steps.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "The as-built system documentation created during commissioning will always exactly match the original design with no adjustments.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what a site assessment should verify before installation begins.", type: "short_answer", points: 1, explanation: "A site assessment should confirm the site's actual solar resource matches the original design assumptions, check mounting surface conditions and any new shading sources, and confirm safe access for installation and future maintenance.", answers: [] },
      { text: "In one or two sentences, explain the difference between commissioning and handover.", type: "short_answer", points: 1, explanation: "Commissioning is the formal process of testing and verifying a completed system is ready for full operation, while handover is transferring that tested system to the customer along with operational training and support contact information.", answers: [] },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Integrated Systems, Business Models, and Capstone Planning",
    moduleDescription:
      "How solar integrates with other energy sources, the business models used to deliver renewable energy services, and how to scope a complete capstone project.",
    lessons: [
      {
        title: "Integrated Systems and Renewable Energy Business Models",
        content:
          "Combining solar with other generation sources or backup, and comparing direct sales, leasing, PPA, and Energy-as-a-Service business models.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Customer Engagement, Scaling, and Capstone Planning",
        content:
          "Educating customers honestly, the operational challenges of scaling a renewable energy business, emerging AI and blockchain applications, and how to scope the capstone project.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Capstone Project Scope and Approach",
    assignmentDescription:
      "Finalize the scope and overall approach for your capstone renewable energy system project, identifying the facility, its demonstration purpose, and how each prior module's work will feed into the final design.",
    fileRequired: false,
    quizQuestions: [
      { text: "In an integrated renewable system, what might solar be combined with to provide more consistent generation across varying weather conditions?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A small wind installation", isCorrect: true },
        { text: "An additional layer of battery-only backup with no other generation source", isCorrect: false },
        { text: "A second, identical solar array facing the same direction", isCorrect: false },
      ]},
      { text: "What existing conventional backup source is described as genuinely common across much of Nigeria?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Diesel generators", isCorrect: true },
        { text: "Coal-fired backup plants", isCorrect: false },
        { text: "Nuclear microreactors", isCorrect: false },
      ]},
      { text: "In a 'direct sales' business model, how does the customer pay for the system?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Purchasing the complete system outright, paying the full cost upfront", isCorrect: true },
        { text: "Paying only for the electricity actually generated and consumed", isCorrect: false },
        { text: "Paying a fee that bundles installation with ongoing monitoring and maintenance", isCorrect: false },
      ]},
      { text: "In a 'solar leasing' model, who retains ownership of the system?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A separate company, while the customer pays a regular fee", isCorrect: true },
        { text: "The customer, immediately upon signing the lease agreement", isCorrect: false },
        { text: "The local utility company", isCorrect: false },
      ]},
      { text: "In a Power Purchase Agreement (PPA), what does the customer specifically pay for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Only the electricity actually generated and consumed", isCorrect: true },
        { text: "The full upfront cost of the system before installation begins", isCorrect: false },
        { text: "A flat annual fee unrelated to actual electricity usage", isCorrect: false },
      ]},
      { text: "What does the 'Energy-as-a-Service' model bundle together into one recurring subscription fee?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "System installation together with ongoing monitoring and maintenance", isCorrect: true },
        { text: "Panel manufacturing and raw material sourcing", isCorrect: false },
        { text: "Grid connection permits and government tax filings", isCorrect: false },
      ]},
      { text: "Which business models can make solar accessible to customers who couldn't otherwise afford the full upfront cost?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Leasing and PPA models", isCorrect: true },
        { text: "Direct sales only", isCorrect: false },
        { text: "Energy-as-a-Service only, since it requires no ongoing payment", isCorrect: false },
      ]},
      { text: "What is described as a real, significant part of successfully growing a renewable energy business?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Effective customer education", isCorrect: true },
        { text: "Avoiding any discussion of system limitations with customers", isCorrect: false },
        { text: "Focusing exclusively on the lowest-cost equipment available", isCorrect: false },
      ]},
      { text: "What becomes genuinely essential once a business is managing many dozens or hundreds of active installations?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The digital monitoring approaches covered in Module 4", isCorrect: true },
        { text: "Manually visiting every single site each week", isCorrect: false },
        { text: "Switching every customer to a direct sales model", isCorrect: false },
      ]},
      { text: "How is artificial intelligence described as being applied to energy management?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Predicting generation output from weather forecasting and optimizing battery charging and discharging patterns", isCorrect: true },
        { text: "Physically installing panels without any human labor", isCorrect: false },
        { text: "Replacing the need for load calculation entirely", isCorrect: false },
      ]},
      { text: "What is blockchain technology being explored for in the renewable energy space?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Peer-to-peer energy trading between solar system owners", isCorrect: true },
        { text: "Automatically cleaning dust off installed panels", isCorrect: false },
        { text: "Replacing charge controllers in battery systems", isCorrect: false },
      ]},
      { text: "What kind of facility does the capstone project ask students to design a complete renewable energy system for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A community center, school, or health facility in Delta State", isCorrect: true },
        { text: "A large industrial manufacturing plant", isCorrect: false },
        { text: "A single-family residential home outside Nigeria", isCorrect: false },
      ]},
      { text: "What broader purpose should the capstone facility explicitly serve, beyond raw technical performance alone?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A demonstration and training facility for the surrounding community", isCorrect: true },
        { text: "A private research lab closed to the public", isCorrect: false },
        { text: "A backup power source exclusively for government offices", isCorrect: false },
      ]},
      { text: "Which prior module's principles should the capstone's monitoring design specifically apply?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Module 4's dashboard principles", isCorrect: true },
        { text: "Module 1's energy basics only", isCorrect: false },
        { text: "Module 7's business model comparisons", isCorrect: false },
      ]},
      { text: "Under a Power Purchase Agreement, the customer typically owns and maintains the system themselves.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Energy-as-a-Service models combine installation with ongoing monitoring and maintenance into one subscription fee.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "As a renewable energy business grows, digital monitoring becomes less necessary since more staff are available to manually check each system.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "The capstone project's community engagement plan should be adapted specifically for a broader community audience, not a single individual customer.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between a Power Purchase Agreement (PPA) and solar leasing.", type: "short_answer", points: 1, explanation: "In a PPA, a company owns and maintains the system and the customer pays only for the electricity actually generated and consumed; in a leasing model, the customer pays a regular fee to use the system that a separate company still owns.", answers: [] },
      { text: "In one or two sentences, explain how artificial intelligence is described as being applied to renewable energy management.", type: "short_answer", points: 1, explanation: "AI is used to more accurately predict generation output from weather forecasting, optimize battery charging and discharging patterns, and improve predictive maintenance through pattern recognition across historical data.", answers: [] },
    ],
  },
];
