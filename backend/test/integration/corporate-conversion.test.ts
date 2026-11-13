import request from "supertest";
import { createApp } from "../../src/app";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import { Lead } from "../../src/models";
import { ONBOARDING, cohortNotice, cohortSentence, onboardingSummary, reserveButton } from "../../src/views/corporateOffers";

// The owner's 12-point conversion review of the corporate pages (2026-11-13).
const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const CORPORATE_PAGES = [
  "/",
  "/ng/corporate-training",
  "/za/corporate-training",
  "/ke/corporate-training/ai-workflow-productivity",
  "/gh/corporate-training/ai-cybersecurity-professional-accelerator",
  "/za/corporate-training/cybersecure-workforce",
  "/Promotion-AI-Workflow-Productivity",
  "/ai-cyber-readiness-check",
  "/corporate-training/sectors",
  "/corporate-training/sectors/healthcare",
];

describe("Corporate conversion review (2026-11-13)", () => {
  it("never says fully booked, and offers December 2026 company onboarding slots on every programme", async () => {
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toMatch(/fully booked|January 2027/i);
    }
    // December 2026 company onboarding slots per programme; individual places start today (online and in-house only, 2026-11-13).
    for (const [path, places] of [
      ["/ke/corporate-training/ai-workflow-productivity", 10],
      ["/za/corporate-training/cybersecure-workforce", 10],
      ["/gh/corporate-training/ai-cybersecurity-professional-accelerator", 10],
    ] as const) {
      const html = (await request(app).get(path)).text;
      expect(html).toContain(
        `<strong>Company onboarding: ${places} December 2026 slots left.</strong> Each slot covers portal setup, your staff sign-up link and a manager login for one organisation. Individual places bought online start today.`,
      );
      expect(html).not.toMatch(/intake|December 2026 cohort/i);
      expect(html).not.toMatch(/Booked until/);
      expect(html).toContain(`data-intent="reserve" data-places="${places}">Reserve a December onboarding slot</a>`);
    }
    const hub = (await request(app).get("/")).text;
    // One count shared by the three programmes (owner, 2026-11-13); multi-programme pages say so.
    expect(hub).toContain("Company onboarding: 10 December 2026 slots left, shared across our three corporate programmes.");
    expect(hub).not.toMatch(/\b(12|8) December 2026 slots/);
    const za = (await request(app).get("/za/corporate-training")).text;
    expect(za.match(/Company onboarding: 10 December 2026 slots left, shared/g)?.length).toBeGreaterThanOrEqual(1);
  });

  it("drops the onboarding line, buttons and FAQ mentions when December is full", () => {
    const saved = ONBOARDING.slotsLeft;
    try {
      ONBOARDING.slotsLeft = 0;
      for (const p of ["cybersecure", "ai-workflow", "accelerator"] as const) {
        expect(cohortNotice(p)).toBe("");
        expect(reserveButton(p)).toBe("");
        expect(cohortSentence(p)).toBe("Individual places bought online start today.");
      }
      expect(onboardingSummary()).toBe("Individual places bought online start today.");
      ONBOARDING.slotsLeft = 1;
      expect(cohortNotice("accelerator")).toContain("1 December 2026 slot left.");
    } finally {
      ONBOARDING.slotsLeft = saved;
    }
  });

  it("says Who we serve, with a city lead-in that does not imply on-site delivery (owner, 2026-11-13)", async () => {
    const hub = (await request(app).get("/")).text;
    expect(hub).toContain(">Who we serve</h2>");
    expect(hub).toContain("Organisations across Nigeria, South Africa, Kenya and Ghana, fully online.");
    expect(hub).toContain("Serving employers in Lagos, Abuja, Port Harcourt, Warri and nationwide.");
    expect(hub).toContain("Serving employers in Johannesburg, Cape Town, Durban, Pretoria and nationwide.");
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toMatch(/Where we (train|deliver)/i);
    }
    const ke = (await request(app).get("/ke/corporate-training/cybersecure-workforce")).text;
    expect(ke).toContain("Serving employers in Nairobi, Mombasa, Kisumu, Nakuru and nationwide.");
  });

  it("uses one corporate email and the UK WhatsApp line, with no Nigerian call line", async () => {
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text;
      expect(html).toContain("mailto:corporate@paleontraining.com");
      expect(html).toContain("https://wa.me/447508823495");
      expect(html).not.toContain("+234 707 714 9215");
      expect(html).not.toContain("tel:+234");
      expect(html).not.toContain("hello@paleontraining.com");
    }
  });

  it("labels the two ways to buy with a worked example for 25 staff", async () => {
    const html = (await request(app).get("/za/corporate-training/cybersecure-workforce")).text;
    expect(html).toContain("Online: per learner, or in a private company portal");
    expect(html).toContain("25 staff × R900 (10% volume discount) = R22,500");
    expect(html).toContain("Pilot with 10 learners");
    expect(html).toContain('<td class="co-here">R9,000</td>');
    expect(html).toContain('data-intent="taster"');
    // Outcomes come before the module list.
    expect(html.indexOf('id="outcomes"')).toBeLessThan(html.indexOf('id="modules"'));
  });

  it("offers online, in-house training only: never live, facilitator-led or hybrid (owner, 2026-11-13)", async () => {
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toMatch(/live online|live sessions?|live virtual|live cohort|facilitator-led sessions at|in-house at your offices|instructor-led|(online|in-house|, live online,?) or (as a )?hybrid|hybrid deliver|\(live|taster session|leadership taster/i);
    }
    for (const cc of ["za", "ke", "gh", "ng"]) {
      const html = (await request(app).get(`/${cc}/corporate-training/cybersecure-workforce`)).text;
      expect(html).toContain("<h3>Private company portal (by proposal)</h3>");
      expect(html).toContain(
        "Your organisation gets its own private space in the Paleon portal. Staff join with one sign-up link, and your HR or L&amp;D lead tracks progress from a manager login.",
      );
      expect(html).toContain("A private online space for your staff only");
    }
    // "Private company portal" replaces "in-house" in visible copy, titles and metas (owner, 2026-11-13).
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text.replace(/in-house IT/g, "");
      expect(html).not.toMatch(/in-house/i);
    }
  });

  it("routes the main button by country and puts the Readiness Check in the hero", async () => {
    const za = (await request(app).get("/").set("CF-IPCountry", "ZA")).text;
    expect(za).toContain('href="/za/corporate-training/cybersecure-workforce#buy" data-buy-cta>Book Corporate Workforce Training');
    const ke = (await request(app).get("/").set("Cookie", "paleon_country=KE")).text;
    expect(ke).toContain('href="/ke/corporate-training/cybersecure-workforce#buy" data-buy-cta>');
    const unknown = (await request(app).get("/")).text;
    expect(unknown).toContain('href="#choose-country" data-buy-cta>');
    expect(za).toContain('href="/ai-cyber-readiness-check?country=za">Take the free Readiness Check</a>');
  });

  it("keeps the enquiry form to five fields, an optional message and a call link", async () => {
    const html = (await request(app).get("/ng/corporate-training")).text;
    const form = html.slice(html.indexOf('id="caForm"'), html.indexOf("</form>", html.indexOf('id="caForm"')));
    for (const name of ["name", "email", "organisation", "country", "employees"]) expect(form).toContain(`name="${name}"`);
    for (const name of ["jobTitle", "phone", "department", "requirement", "delivery"]) expect(form).not.toContain(`name="${name}"`);
    expect(form).toMatch(/name="message" maxlength="500"/);
    expect(form).not.toMatch(/name="message"[^>]*required/);
    expect(form).toContain('<option value="XX">Other country</option>');
    expect(html).toContain("Book a 20-minute call</a>");
  });

  it("accepts the short form and an onboarding slot reservation", async () => {
    const res = await request(app).post("/api/leads/corporate").send({
      name: "Thandi Mokoena",
      organisation: "Example Mining (Pty) Ltd",
      country: "ZA",
      email: "thandi@example.co.za",
      employees: "50–249",
      intent: "reserve",
      programme: "ai-cyber-accelerator",
      consent: true,
    });
    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead?.phone).toBeNull();
    expect(lead?.details).toMatchObject({ intent: "reserve", organisation: "Example Mining (Pty) Ltd" });
    expect(memAdapter.sentMessages[0].subject).toContain("Onboarding slot reservation");
    expect(memAdapter.sentMessages[0].text).toContain("to reserve a December 2026 company onboarding slot");
  });

  it("serves the sector pages and 404s an unknown sector", async () => {
    for (const slug of ["banking-financial-services", "healthcare", "public-sector", "oil-and-gas"]) {
      const res = await request(app).get(`/corporate-training/sectors/${slug}?country=ke`);
      expect(res.status).toBe(200);
      expect(res.text).toContain("Kenya&#39;s Data Protection Act, 2019");
      expect(res.text).toContain("KSh");
    }
    expect((await request(app).get("/corporate-training/sectors/fishing")).status).toBe(404);
  });

  it("serves a brochure and a business case PDF per programme and country", async () => {
    for (const path of [
      "/corporate-training/brochures/cybersecure-workforce-ng.pdf",
      "/corporate-training/business-case/ai-cybersecurity-accelerator-gh.pdf",
    ]) {
      const res = await request(app).get(path).buffer(true).parse((r, cb) => {
        const chunks: Buffer[] = [];
        r.on("data", (c: Buffer) => chunks.push(c));
        r.on("end", () => cb(null, Buffer.concat(chunks)));
      });
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("application/pdf");
      expect((res.body as Buffer).subarray(0, 5).toString()).toBe("%PDF-");
    }
    expect((await request(app).get("/corporate-training/brochures/unknown-ng.pdf")).status).toBe(404);
  });

  it("emails a tailored recommendation and flags a wanted proposal after the Readiness Check", async () => {
    const res = await request(app)
      .post("/api/leads/readiness")
      .send({
        name: "Kwame Mensah",
        jobTitle: "CEO",
        organisation: "Example Logistics",
        country: "GH",
        email: "kwame@example.com.gh",
        employees: "50–249",
        answers: [0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
        consent: true,
        proposal: true,
      });
    expect(res.status).toBe(201);
    const scorecard = memAdapter.sentMessages.find((m) => m.to === "kwame@example.com.gh");
    expect(scorecard?.text).toContain("Start with CyberSecure Workforce");
    expect(scorecard?.text).toContain("GH₵");
    expect(scorecard?.text).toContain("You asked for a proposal");
    const notice = memAdapter.sentMessages.find((m) => m.to !== "kwame@example.com.gh");
    expect(notice?.subject).toContain("PROPOSAL WANTED");
  });
});

describe("Second corporate review (2026-11-13)", () => {
  it("prices the pilot in every country and sends each pilot button to its own programme", async () => {
    const hub = (await request(app).get("/ke/corporate-training")).text;
    const pilot = hub.slice(hub.indexOf('id="pilot"'), hub.indexOf("</section>", hub.indexOf('id="pilot"')));
    for (const country of ["Nigeria", "South Africa", "Kenya", "Ghana"]) expect(pilot).toContain(`<th scope="col">${country}</th>`);
    expect(pilot).toContain('href="/ke/corporate-training/cybersecure-workforce#buy" data-pilot-cta');
    expect(pilot).toContain('href="/ke/corporate-training/ai-workflow-productivity#buy" data-pilot-cta');
    expect(pilot).toContain('href="/ke/corporate-training/ai-cybersecurity-professional-accelerator#buy" data-pilot-cta');
    expect(pilot).toContain("the full pilot fee is credited against it");
  });

  it("states refund, cancellation and unused-seat terms by the buy form", async () => {
    const html = (await request(app).get("/gh/corporate-training/ai-workflow-productivity")).text;
    const after = html.slice(html.indexOf('id="cpBuy"'));
    expect(after).toContain("Refunds, cancellations and unused seats");
    expect(after).toContain("Full refund within 14 days of purchase if no learner has started");
    expect(after).toContain("The same refund and unused-seat terms as self-paced places.");
    expect(after).not.toContain("Free rescheduling");
  });

  it("links other countries' brochures and the sample certificate and attendance record", async () => {
    const html = (await request(app).get("/ng/corporate-training/cybersecure-workforce")).text;
    expect(html).toContain('href="/corporate-training/brochures/cybersecure-workforce-za.pdf"');
    expect(html).toContain('href="/corporate-training/business-case/cybersecure-workforce-ke.pdf"');
    expect(html).toContain('href="/corporate-training/samples/certificate.pdf"');
    for (const path of ["/corporate-training/samples/certificate.pdf", "/corporate-training/samples/attendance-record.pdf"]) {
      const res = await request(app).get(path).buffer(true);
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("application/pdf");
    }
  });

  it("uses one CyberSecure name, makes no facilitator claim and says Led from the UK", async () => {
    const za = (await request(app).get("/za/corporate-training/cybersecure-workforce")).text;
    expect(za).not.toContain("CyberSecure Workforce Essentials");
    expect(za).toContain("One product, online, per learner or in a private company portal.");
    expect(za).not.toContain("Every Paleon programme is led by a live facilitator");
    for (const path of ["/", "/ng"]) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toContain("Led from London");
    }
  });

  it("cites the ITF Act for the 50% levy refund", async () => {
    const html = (await request(app).get("/ng/corporate-training/cybersecure-workforce")).text;
    expect(html).toMatch(/refund up to 50% of the levy|refund of up to 50% of the levy/);
    expect(html).toContain('href="https://www.mondaq.com/nigeria/employee-rights-labour-relations/199880/');
    expect(html).not.toContain("50% of eligible training costs");
  });

  it("keeps Career Match, jobs and Ambassadors out of the corporate footer", async () => {
    const html = (await request(app).get("/za/corporate-training")).text;
    const footer = html.slice(html.indexOf('<footer class="site-footer">'));
    expect(footer).not.toContain("Career Match");
    expect(footer).not.toContain("Latest jobs");
    expect(footer).not.toContain("Ambassadors");
  });

  it("explains the score bands and shows a rough cost on the Readiness Check", async () => {
    const html = (await request(app).get("/ai-cyber-readiness-check?country=za")).text;
    expect(html).toContain("How to read your score.");
    expect(html).toContain('id="rcCost"');
    expect(html).toMatch(/"example":"R22,500"/);
  });

  it("accepts an enquiry from another country with a message", async () => {
    const res = await request(app).post("/api/leads/corporate").send({
      name: "Amina Okello",
      organisation: "Example Co",
      country: "XX",
      email: "amina@example.com",
      employees: "50–249",
      message: "Phishing clicks in finance",
      programme: "cybersecure-workforce",
      consent: true,
    });
    expect(res.status).toBe(201);
    expect(memAdapter.sentMessages.at(-1)?.text).toContain("another country");
    expect(memAdapter.sentMessages.at(-1)?.text).toContain("Message: Phishing clicks in finance");
  });
});
