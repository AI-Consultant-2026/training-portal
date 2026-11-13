import request from "supertest";
import { createApp } from "../../src/app";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import { Lead } from "../../src/models";

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
  it("never says fully booked, and offers the December 2026 cohort on the booked programmes", async () => {
    for (const path of CORPORATE_PAGES) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toMatch(/fully booked|January 2027/i);
    }
    // Booked until December 2026; places left in that cohort per programme (owner, 2026-11-13).
    for (const [path, places] of [
      ["/ke/corporate-training/ai-workflow-productivity", 12],
      ["/za/corporate-training/cybersecure-workforce", 8],
      ["/gh/corporate-training/ai-cybersecurity-professional-accelerator", 10],
    ] as const) {
      const html = (await request(app).get(path)).text;
      expect(html).toContain(`<strong>Booked until December 2026.</strong> ${places} places remain in the December 2026 cohort`);
      expect(html).toContain(`data-intent="reserve" data-places="${places}">Reserve a December 2026 cohort</a>`);
    }
    const hub = (await request(app).get("/")).text;
    for (const places of [12, 8, 10]) expect(hub).toContain(`${places} places remain in the December 2026 cohort`);
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
    expect(html).toContain("Self-paced per learner, or live and in-house by quote");
    expect(html).toContain("25 staff × R900 (10% volume discount) = R22,500");
    expect(html).toContain("Pilot with 10 learners");
    expect(html).toContain("R9,000</strong> for 10 learners");
    expect(html).toContain('data-intent="taster"');
    // Outcomes come before the module list.
    expect(html.indexOf('id="outcomes"')).toBeLessThan(html.indexOf('id="modules"'));
  });

  it("offers in-house and hybrid in every country", async () => {
    for (const cc of ["za", "ke", "gh"]) {
      const html = (await request(app).get(`/${cc}/corporate-training/cybersecure-workforce`)).text;
      expect(html).toContain("Live online, in-house at your offices, or hybrid");
      expect(html).not.toMatch(/All training in [A-Za-z ]+ is (delivered )?live online/);
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

  it("keeps the enquiry form to five fields plus a call link", async () => {
    const html = (await request(app).get("/ng/corporate-training")).text;
    const form = html.slice(html.indexOf('id="caForm"'), html.indexOf("</form>", html.indexOf('id="caForm"')));
    for (const name of ["name", "email", "organisation", "country", "employees"]) expect(form).toContain(`name="${name}"`);
    for (const name of ["jobTitle", "phone", "department", "requirement", "delivery", "message"]) expect(form).not.toContain(`name="${name}"`);
    expect(html).toContain("Book a 20-minute call</a>");
  });

  it("accepts the short form and a cohort reservation", async () => {
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
    expect(memAdapter.sentMessages[0].subject).toContain("Cohort reservation");
    expect(memAdapter.sentMessages[0].text).toContain("to reserve places in the December 2026 cohort");
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
