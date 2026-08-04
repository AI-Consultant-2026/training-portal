import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { INSTRUCTOR_ID } from "../utils/seedIds";

interface LessonImageSeed {
  url: string;
  caption: string;
  afterParagraph: number;
}

interface LessonSeed {
  title: string;
  content: string;
  order: number;
  durationMinutes: number;
  videoUrl?: string;
  resources?: { links: { label: string; url: string }[] };
  images?: LessonImageSeed[];
}

interface ModuleSeed {
  title: string;
  description: string;
  weekNumber: number;
  order: number;
  lessons: LessonSeed[];
}

interface CourseSeed {
  title: string;
  slug: string;
  description: string;
  durationWeeks: number;
  modules: ModuleSeed[];
}

const COURSES: CourseSeed[] = [
  {
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    description:
      "A beginner-friendly, hands-on introduction to cybersecurity covering network security, ethical hacking, risk assessment, incident response, and cloud/data security.",
    durationWeeks: 12,
    modules: [
      {
        title: "Cybersecurity Foundations",
        description: "Threats, attack vectors, the CIA Triad, and the OWASP Top 10.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "History of Cybersecurity",
            content: `Welcome to Cyber Security Fundamentals. Before we touch a single tool or technical term, this first lesson answers a simpler question: how did we get here? Understanding where cybersecurity came from is what makes everything else in this course make sense — every defense you'll learn about exists because of a threat that came before it.

And one thing worth saying clearly, right at the start: you don't need a computer science degree to be good at this. Some of the strongest security professionals came from completely different backgrounds — accounting, law, teaching. What you need is curiosity, patience, and a habit of thinking like both a defender and an attacker at the same time. This lesson is where that habit starts.

THE ACCIDENTAL BEGINNING

Cybersecurity as a field is younger than most people assume. The first computer virus appeared in the early 1970s — a program called Creeper, which spread between computers on an early research network and simply displayed the message "I'm the creeper, catch me if you can." It didn't steal anything or damage anything. It was almost playful.

But Creeper proved a point we are still dealing with more than fifty years later: if a computer can run a program, it can run a program you didn't want it to run. That single idea is the seed of every security problem covered in this course.

FROM CURIOSITY TO CRISIS

Through the 1980s and into the 90s, computer networks — and eventually the internet — grew fast, and so did the first wave of genuinely disruptive incidents. The clearest example is the Morris Worm of 1988, which was released as an experiment and, due to a coding mistake, ended up disabling roughly ten percent of the internet that existed at the time.

That single incident had a lasting effect: it directly led to the creation of the first Computer Emergency Response Teams (CERTs) — dedicated groups whose job is to track threats and coordinate a response when something goes wrong. That model still exists today in almost every country, including Nigeria's own ngCERT, which plays exactly that role here.

CYBERCRIME GROWS UP

By the 2000s, hacking had stopped being mostly about curiosity. It became organized. Criminal groups — and eventually nation-states — began using cyberattacks deliberately, for financial gain, espionage, and political disruption. Cybercrime today is estimated to cost the global economy trillions of dollars every year.

Here is the part that matters most for you, personally, in this course: attackers do not only target huge multinational companies. Small businesses, local government offices, schools, and hospitals are targets too — often precisely because they have weaker defenses and fewer resources to recover when something goes wrong. That includes organizations right here in the State. Nobody is too small to be a target; smaller organizations are frequently targeted because they're small.

WHY THIS LESSON COMES FIRST

Every topic ahead of you in this course — network security, penetration testing, risk assessment, incident response — exists as a response to the pattern you've just seen: someone finds a way in, causes harm or takes something of value, and the field adapts. You cannot evaluate a defense without understanding what it was built to defend against.

That's the lens to carry into the rest of this week. In the next lesson, we'll introduce the CIA Triad — Confidentiality, Integrity, and Availability — the three-part framework security professionals use to reason about almost every decision they make. And for this week's assignment, you'll put this lesson into practice directly: researching three real-world data breaches and identifying exactly which attack vectors made them possible.

You don't need to memorize dates. What you need to walk away with is the mindset: cybersecurity is not a fixed checklist, it's an ongoing response to people who are actively looking for a way in.`,
            images: [
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGltZWxpbmVUaXRsZSI+CiAgPHRpdGxlIGlkPSJ0aW1lbGluZVRpdGxlIj5UaW1lbGluZTogMTk3MSBDcmVlcGVyLCAxOTg4IE1vcnJpcyBXb3JtLCAyMDAwcyBvcmdhbml6ZWQgY3liZXJjcmltZSwgdG9kYXkncyBnbG9iYWwgY29zdDwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9Ijc2MCIgaGVpZ2h0PSIxOTAiIGZpbGw9IiNGOUZBRkIiLz4KICA8bGluZSB4MT0iOTAiIHkxPSI5NSIgeDI9IjY5MCIgeTI9Ijk1IiBzdHJva2U9IiNFNUU3RUIiIHN0cm9rZS13aWR0aD0iMiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gTm9kZSAxIC0tPgogICAgPGNpcmNsZSBjeD0iOTAiIGN5PSI5NSIgcj0iOCIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iOTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4xOTcxPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+Q3JlZXBlciBhcHBlYXJzPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+QSBoYXJtbGVzcyBleHBlcmltZW50PC90ZXh0PgoKICAgIDwhLS0gTm9kZSAyIC0tPgogICAgPGNpcmNsZSBjeD0iMjkwIiBjeT0iOTUiIHI9IjgiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjI5MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPjE5ODg8L3RleHQ+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+TW9ycmlzIFdvcm08L3RleHQ+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+Rmlyc3QgaW50ZXJuZXQtd2lkZSBpbmNpZGVudDwvdGV4dD4KCiAgICA8IS0tIE5vZGUgMyAtLT4KICAgIDxjaXJjbGUgY3g9IjQ5MCIgY3k9Ijk1IiByPSI4IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI0OTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4yMDAwczwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ5MCIgeT0iMTIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIj5DeWJlcmNyaW1lIG9yZ2FuaXplczwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ5MCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNkI3MjgwIj5DcmltaW5hbCBncm91cHMsIG5hdGlvbi1zdGF0ZXM8L3RleHQ+CgogICAgPCEtLSBOb2RlIDQgLS0+CiAgICA8Y2lyY2xlIGN4PSI2OTAiIGN5PSI5NSIgcj0iOCIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iNjkwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+VG9kYXk8L3RleHQ+CiAgICA8dGV4dCB4PSI2OTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+VHJpbGxpb25zIGF0IHN0YWtlPC90ZXh0PgogICAgPHRleHQgeD0iNjkwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2QjcyODAiPkV2ZXJ5IG9yZyBpcyBhIHRhcmdldDwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
                caption: "Five decades of cybersecurity, in four moments: from a harmless 1971 experiment to a trillion-dollar global problem.",
                afterParagraph: 1,
              },
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGFyZ2V0c1RpdGxlIj4KICA8dGl0bGUgaWQ9InRhcmdldHNUaXRsZSI+V2hvIGdldHMgdGFyZ2V0ZWQ6IHNtYWxsIGJ1c2luZXNzZXMsIHNjaG9vbHMsIGhvc3BpdGFscywgYW5kIGxvY2FsIGdvdmVybm1lbnQgb2ZmaWNlcywgbm90IGp1c3QgbGFyZ2UgbXVsdGluYXRpb25hbHM8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3NjAiIGhlaWdodD0iMTkwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgoKICAgIDwhLS0gU21hbGwgYnVzaW5lc3MgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MCwzMCkiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZGIi8+CiAgICAgIDxyZWN0IHg9IjI1IiB5PSIzNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQ1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8cmVjdCB4PSI0MiIgeT0iNTUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyNSIgZmlsbD0iIzI1NjNFQiIvPgogICAgICA8bGluZSB4MT0iMjUiIHkxPSIzNSIgeDI9IjUwIiB5Mj0iMTgiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICAgIDxsaW5lIHgxPSI3NSIgeTE9IjM1IiB4Mj0iNTAiIHkyPSIxOCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPHRleHQgeD0iNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+U21hbGwgQnVzaW5lc3M8L3RleHQ+CiAgICA8L2c+CgogICAgPCEtLSBTY2hvb2wgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjAsMzApIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIvPgogICAgICA8cmVjdCB4PSIyMCIgeT0iNDUiIHdpZHRoPSI2MCIgaGVpZ2h0PSIzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxNSw0NSA1MCwyMiA4NSw0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgICAgPHJlY3QgeD0iNDQiIHk9IjU4IiB3aWR0aD0iMTIiIGhlaWdodD0iMjIiIGZpbGw9IiMyNTYzRUIiLz4KICAgICAgPHRleHQgeD0iNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+U2Nob29sPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0gSG9zcGl0YWwgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NTAsMzApIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIvPgogICAgICA8cmVjdCB4PSIyMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjUwIiB5MT0iNDIiIHgyPSI1MCIgeTI9IjYyIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgICA8bGluZSB4MT0iNDAiIHkxPSI1MiIgeDI9IjYwIiB5Mj0iNTIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICAgIDx0ZXh0IHg9IjUwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMzNzQxNTEiPkhvc3BpdGFsPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0gTG9jYWwgZ292ZXJubWVudCAtLT4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0MCwzMCkiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZGIi8+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMTUsNDIgNTAsMjAgODUsNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgIDxsaW5lIHgxPSIyNSIgeTE9IjQ1IiB4Mj0iMjUiIHkyPSI3OCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjQyIiB5MT0iNDUiIHgyPSI0MiIgeTI9Ijc4IiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8bGluZSB4MT0iNTgiIHkxPSI0NSIgeDI9IjU4IiB5Mj0iNzgiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICAgIDxsaW5lIHgxPSI3NSIgeTE9IjQ1IiB4Mj0iNzUiIHkyPSI3OCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjE4IiB5MT0iODAiIHgyPSI4MiIgeTI9IjgwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8dGV4dCB4PSI1MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIj5Mb2NhbCBHb3Zlcm5tZW50PC90ZXh0PgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
                caption: "Attackers don't only go after multinationals. Small businesses, schools, hospitals, and local government offices are targeted too — often because they have weaker defenses.",
                afterParagraph: 10,
              },
            ],
            order: 1,
            durationMinutes: 30,
          },
          {
            title: "The CIA Triad",
            content: "Confidentiality, Integrity, and Availability as the foundation of security.",
            order: 2,
            durationMinutes: 25,
            videoUrl: "https://www.youtube.com/watch?v=CIA-triad-explained",
            resources: {
              links: [
                { label: "NIST: Security and Privacy Controls", url: "https://csrc.nist.gov/publications/sp800" },
                { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    title: "Social Media Management & Content",
    slug: "social-media-management-content",
    description:
      "Build practical social media strategy, content creation, community management, and analytics skills for real businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Social Media Fundamentals & Strategy",
        description: "Platform landscape, audience personas, and content pillars.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Platform Comparison",
            content: "Facebook, Instagram, TikTok, LinkedIn, Twitter, and YouTube compared.",
            order: 1,
            durationMinutes: 20,
          },
          {
            title: "Audience Personas",
            content: "Researching and developing audience personas for a business.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "GIS and Drone Mapping",
    slug: "gis-and-drone-mapping",
    description:
      "Learn geographic information systems, remote sensing, and drone survey mapping with real State use cases.",
    durationWeeks: 8,
    modules: [
      {
        title: "GIS Fundamentals & Spatial Concepts",
        description: "Raster vs. vector data, coordinate systems, and mapping principles.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Raster vs. Vector Data",
            content: "Understanding the two core spatial data models used in GIS.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Coordinate Systems and Projections",
            content: "How GIS software represents locations on a curved earth in 2D maps.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Renewable Energy Digital Systems",
    slug: "renewable-energy-digital-systems",
    description:
      "Design solar PV systems, battery storage, and digital monitoring/control systems for renewable energy installations.",
    durationWeeks: 8,
    modules: [
      {
        title: "Renewable Energy Fundamentals",
        description: "Energy basics, renewable sources, and digital monitoring systems.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Energy Basics",
            content: "Power, voltage, current, and efficiency explained for beginners.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Solar PV Technology Overview",
            content: "How solar photovoltaic systems convert sunlight into usable electricity.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Build practical, hands-on digital marketing skills across SEO, email, paid advertising, and analytics for real State businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Digital Marketing Fundamentals & Strategy",
        description: "The marketing funnel, channel landscape, and buyer personas.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "The Digital Marketing Funnel",
            content: "Awareness, consideration, conversion, and loyalty stages explained.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Digital Marketing Channels Overview",
            content: "SEO, email, content, paid, and social channels compared.",
            order: 2,
            durationMinutes: 25,
          },
        ],
      },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const courseRows = COURSES.map((course) => ({
      id: crypto.randomUUID(),
      title: course.title,
      slug: course.slug,
      description: course.description,
      instructor_id: INSTRUCTOR_ID,
      duration_weeks: course.durationWeeks,
      level: "beginner",
      status: "published",
      metadata: JSON.stringify({}),
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("courses", courseRows);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdsByCourseSlug: Record<string, string[]> = {};

    COURSES.forEach((course, courseIndex) => {
      const courseId = courseRows[courseIndex].id;
      moduleIdsByCourseSlug[course.slug] = [];

      course.modules.forEach((mod) => {
        const moduleId = crypto.randomUUID();
        moduleIdsByCourseSlug[course.slug].push(moduleId);
        moduleRows.push({
          id: moduleId,
          course_id: courseId,
          title: mod.title,
          description: mod.description,
          week_number: mod.weekNumber,
          order: mod.order,
          status: "published",
          created_at: now,
        });
      });
    });

    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];

    COURSES.forEach((course) => {
      course.modules.forEach((mod, modIndex) => {
        const moduleId = moduleIdsByCourseSlug[course.slug][modIndex];
        mod.lessons.forEach((lesson) => {
          lessonRows.push({
            id: crypto.randomUUID(),
            module_id: moduleId,
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.videoUrl ?? null,
            resources: JSON.stringify(lesson.resources ?? {}),
            images: JSON.stringify(lesson.images ?? []),
            order: lesson.order,
            duration_minutes: lesson.durationMinutes,
            created_at: now,
          });
        });
      });
    });

    await queryInterface.bulkInsert("lessons", lessonRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = COURSES.map((c) => c.slug);
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id IN (${courseIds.map(() => "?").join(",")})`,
      { replacements: courseIds },
    );
    const moduleIds = (modules as { id: string }[]).map((m) => m.id);

    if (moduleIds.length > 0) {
      await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
      await queryInterface.bulkDelete("modules", { id: moduleIds });
    }
    await queryInterface.bulkDelete("courses", { id: courseIds });
  },
};
