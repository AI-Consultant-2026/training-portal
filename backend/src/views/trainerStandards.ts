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

export function trainerStandards(): string {
  return `<section class="section section-paper ca-section" id="trainers" aria-labelledby="trainers-title">
    <div class="wrap">
      <span class="section-eyebrow">Who trains your people</span>
      <h2 class="section-title" id="trainers-title">How we choose our trainers</h2>
      <p class="ca-p">Every Paleon programme is led by a live facilitator. Before anyone trains your staff, they must meet these standards:</p>
      <div class="ca-cards">${TRAINER_STANDARDS.map((s) => `
        <div class="ca-card"><h3>${s.h}</h3><p>${s.p}</p></div>`).join("")}
      </div>
      <p class="ca-p"><strong>Know who is training your team.</strong> Before your programme starts, we send you your lead trainer's profile: name, qualifications and experience. Ask for it with your proposal.</p>
    </div>
  </section>`;
}
