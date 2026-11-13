import { ORIGIN } from "./countryHome";

// "How we write our courses" (2026-11-09, reframed 2026-11-13): corporate training is online
// and in-house only (self-paced, private to the client's staff; never live, facilitator-led or
// hybrid), so these are the standards for the people who write and review the course content.
// Shown on the corporate homepage, the four country corporate pages and the twelve programme
// pages. Every line here is a commitment Paleon must keep: change the copy before the practice.

export const TRAINER_STANDARDS: { h: string; p: string }[] = [
  {
    h: "Real experience in the subject",
    p: "Cybersecurity modules are written by authors with hands-on experience of information security work, such as security operations, risk or awareness programmes. AI modules are written by authors who use AI tools in real business work.",
  },
  {
    h: "A recognised qualification",
    p: "Course authors hold a relevant degree or a recognised industry certification, for example CompTIA Security+, ISC2, ISACA, Microsoft or Google certifications. We check certificates before anyone writes for us.",
  },
  {
    h: "Written for non-technical staff",
    p: "Our courses are for whole workforces, not IT teams. Every module is reviewed by our Programme Director to make sure risks and tools are explained clearly to people with no technical background.",
  },
  {
    h: "Bound to confidentiality",
    p: "Authors and reviewers sign a confidentiality agreement. Your staff study in a private company space that only your organisation can join, and examples from your organisation stay there.",
  },
  {
    h: "Matched to your country and sector",
    p: "Each country version covers its own data protection law, and scenarios are drawn from real sectors, so the examples match the threats and tasks your people actually face.",
  },
  {
    h: "Kept up to date",
    p: "Scams and AI tools change quickly. We review and update the course examples regularly, so your staff learn from current attacks and current tools.",
  },
];

// Named trainers (2026-11-09). Only real people, with credentials and consent supplied by
// the user. Ken's details: degree from the user; career from his own LinkedIn profile.
export interface Trainer {
  slug: string;
  name: string;
  role: string;
  photo: string;
  credential: string;
  programmes: string[];
  bio: string;
  linkedin: string;
}

export const TRAINERS: Trainer[] = [
  {
    slug: "ken-uwotu",
    name: "Ken Uwotu",
    role: "Managing Director and Programme Director, Paleon Training Limited",
    photo: "/images/team/ken-uwotu.jpg",
    credential: "Master's degree with Distinction, Business Information Technology",
    programmes: ["CyberSecure Workforce", "AI Workflow Productivity & Process Transformation", "AI + Cybersecurity Professional Accelerator"],
    bio: "Ken founded Paleon Training. As Programme Director he designs and oversees all three corporate programmes and reviews every module before it is published; cybersecurity modules are written by authors with hands-on security experience. Before Paleon, he spent more than five years as an IT business consultant, including verification and validation work, and more than eight years as a senior consultant at Hellocare Consulting, advising UK care providers on regulation, compliance and governance.",
    linkedin: "https://www.linkedin.com/in/ken-uwotu-b687911a1/",
  },
];

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function trainerPersonLd(): object[] {
  return TRAINERS.map((t) => ({
    "@type": "Person",
    "@id": `${ORIGIN}/#${t.slug}`,
    name: t.name,
    jobTitle: t.role.split(",")[0],
    image: `${ORIGIN}${t.photo}`,
    worksFor: { "@id": `${ORIGIN}/#organization` },
    sameAs: [t.linkedin],
    knowsAbout: ["Cybersecurity awareness training", "Generative AI in the workplace", "Business information technology"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: t.credential,
    },
  }));
}

function profileCard(t: Trainer): string {
  return `<article class="tr-profile" aria-labelledby="tr-${t.slug}">
        <img class="tr-photo" src="${t.photo}" alt="${esc(t.name)}, ${esc(t.role)}" width="600" height="600" loading="lazy">
        <div class="tr-body">
          <h3 id="tr-${t.slug}">${esc(t.name)}</h3>
          <p class="tr-role">${esc(t.role)}</p>
          <p class="tr-cred"><strong>Qualification:</strong> ${esc(t.credential)}</p>
          <p class="tr-cred"><strong>Designs and reviews:</strong> ${t.programmes.map(esc).join(" &middot; ")}</p>
          <p>${esc(t.bio)}</p>
          <p class="tr-link"><a href="${t.linkedin}" rel="noopener" target="_blank">View ${esc(t.name.split(" ")[0])}'s LinkedIn profile &rarr;</a></p>
        </div>
      </article>`;
}

export function trainerStandards(): string {
  return `<section class="section section-paper ca-section" id="trainers" aria-labelledby="trainers-title">
    <div class="wrap">
      <span class="section-eyebrow">Who writes your training</span>
      <h2 class="section-title" id="trainers-title">Who designs our courses</h2>
      ${TRAINERS.map(profileCard).join("\n      ")}
      <h3 class="tr-sub">How we write our courses</h3>
      <p class="ca-p">All corporate training is online and in-house: your staff study self-paced in a private company space in the Paleon portal. There are no live, facilitator-led or hybrid sessions. Every course meets these standards:</p>
      <div class="ca-cards">${TRAINER_STANDARDS.map((s) => `
        <div class="ca-card"><h3>${s.h}</h3><p>${s.p}</p></div>`).join("")}
      </div>
      <p class="ca-p"><strong>See the course before you buy.</strong> Ask for a free leadership preview with your proposal, and your leadership team can work through sample modules online.</p>
    </div>
  </section>`;
}
