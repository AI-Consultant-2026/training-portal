import { ORIGIN } from "./countryHome";

// "How we choose our trainers" (2026-11-09): the standards every Paleon corporate facilitator
// must meet. Shown on the corporate homepage, the four country corporate pages and the twelve
// programme pages until named trainer profiles (with real, verified credentials) replace it.
// Every line here is a commitment Paleon must keep: change the copy before changing the practice.

export const TRAINER_STANDARDS: { h: string; p: string }[] = [
  {
    h: "Real experience in the subject",
    p: "Cybersecurity sessions are led by trainers with hands-on experience of information security work, such as security operations, risk or awareness programmes. AI sessions are led by trainers who use AI tools in real business work, not only in the classroom.",
  },
  {
    h: "A recognised qualification",
    p: "Trainers hold a relevant degree or a recognised industry certification, for example CompTIA Security+, ISC2, ISACA, Microsoft or Google certifications. We check certificates before a trainer is booked.",
  },
  {
    h: "Proven with non-technical staff",
    p: "Our training is for whole workforces, not IT teams. Every trainer runs an assessed trial session with us first, to show they can explain risks and tools clearly to people with no technical background.",
  },
  {
    h: "Checked and bound to confidentiality",
    p: "We check references, and every trainer signs a confidentiality agreement before seeing any client information. Examples from your organisation stay within your sessions.",
  },
  {
    h: "Briefed on your country and sector",
    p: "Before your programme starts, your trainer is briefed on your country's data protection law and on your sector, so scenarios match the threats and tasks your people actually face.",
  },
  {
    h: "Kept up to date",
    p: "Scams and AI tools change quickly. Trainers update their examples before each programme, so your staff learn from current attacks and current tools.",
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
    programmes: ["AI Workflow Productivity & Process Transformation"],
    bio: "Ken founded Paleon Training. As Programme Director he designs and oversees all three corporate programmes; cybersecurity sessions are delivered by facilitators with hands-on security experience. Before Paleon, he spent more than five years as an IT business consultant, including verification and validation work, and more than eight years as a senior consultant at Hellocare Consulting, advising UK care providers on regulation, compliance and governance.",
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
          <p class="tr-cred"><strong>Trains on:</strong> ${t.programmes.map(esc).join(" &middot; ")}</p>
          <p>${esc(t.bio)}</p>
          <p class="tr-link"><a href="${t.linkedin}" rel="noopener" target="_blank">View ${esc(t.name.split(" ")[0])}'s LinkedIn profile &rarr;</a></p>
        </div>
      </article>`;
}

export function trainerStandards(): string {
  return `<section class="section section-paper ca-section" id="trainers" aria-labelledby="trainers-title">
    <div class="wrap">
      <span class="section-eyebrow">Who trains your people</span>
      <h2 class="section-title" id="trainers-title">Meet our trainers</h2>
      ${TRAINERS.map(profileCard).join("\n      ")}
      <h3 class="tr-sub">How we choose our trainers</h3>
      <p class="ca-p">Every live session (online, in-house or hybrid) is led by a facilitator; the self-paced option is studied online in the Paleon portal. Before anyone trains your staff, they must meet these standards:</p>
      <div class="ca-cards">${TRAINER_STANDARDS.map((s) => `
        <div class="ca-card"><h3>${s.h}</h3><p>${s.p}</p></div>`).join("")}
      </div>
      <p class="ca-p"><strong>Know who is training your team.</strong> Before your programme starts, we send you your lead trainer's profile: name, qualifications and experience. Ask for it with your proposal.</p>
    </div>
  </section>`;
}
