import request from "supertest";
import { createApp } from "../../src/app";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import { config } from "../../src/config";
import { Lead } from "../../src/models";
import { sendPendingFollowUpEmails, sendPendingWelcomeEmails } from "../../src/services/leadNurture.service";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const enquiry = {
  name: "Ngozi Okafor",
  jobTitle: "HR Manager",
  organisation: "Example Energy Services Ltd",
  country: "NG",
  email: "ngozi.okafor@example.com",
  phone: "+234 801 234 5678",
  employees: "250–999",
  department: "HR / Learning & Development",
  requirement: "Department training",
  delivery: "In-house",
  message: "We want our HR team to draft letters faster.",
  intent: "proposal",
  consent: true,
  page: "/ng/corporate-training/ai-workflow-productivity",
};

describe("Corporate AI training enquiries", () => {
  it("saves the enquiry as a lead with its details and emails corporate@", async () => {
    const res = await request(app).post("/api/leads/corporate").send(enquiry);

    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead).toMatchObject({
      source: "corporate-ai-workflow",
      country: "NG",
      phone: enquiry.phone,
      marketingConsentAt: null,
    });
    expect(lead?.details).toMatchObject({
      organisation: enquiry.organisation,
      jobTitle: enquiry.jobTitle,
      employees: enquiry.employees,
      intent: "proposal",
      page: enquiry.page,
      consentAt: expect.any(String),
    });

    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0]).toMatchObject({
      to: config.corporateEnquiriesEmail,
      replyTo: enquiry.email,
      subject: expect.stringContaining(enquiry.organisation),
    });
    expect(memAdapter.sentMessages[0].text).toContain("Message: We want our HR team to draft letters faster.");
  });

  it("records marketing consent only when the updates box is ticked", async () => {
    const res = await request(app).post("/api/leads/corporate").send({ ...enquiry, updates: true });

    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead?.marketingConsentAt).toBeInstanceOf(Date);
  });

  it("rejects an enquiry without consent", async () => {
    const res = await request(app).post("/api/leads/corporate").send({ ...enquiry, consent: false });

    expect(res.status).toBe(400);
    expect(await Lead.count()).toBe(0);
  });

  it("rejects an enquiry missing the organisation or with an unknown employee band", async () => {
    expect((await request(app).post("/api/leads/corporate").send({ ...enquiry, organisation: "" })).status).toBe(400);
    expect((await request(app).post("/api/leads/corporate").send({ ...enquiry, employees: "lots" })).status).toBe(400);
  });

  it("rejects a filled-in honeypot", async () => {
    const res = await request(app).post("/api/leads/corporate").send({ ...enquiry, website: "http://spam.example" });

    expect(res.status).toBe(400);
  });

  it("never gets the learner welcome or follow-up emails", async () => {
    await request(app).post("/api/leads/corporate").send(enquiry);
    memAdapter.sentMessages.length = 0;

    await sendPendingWelcomeEmails();
    await sendPendingFollowUpEmails();

    expect(memAdapter.sentMessages).toHaveLength(0);
  });
});

describe("Corporate AI training pages", () => {
  it.each(["ng", "za", "gh", "ke"])("serves /%s/corporate-training/ai-workflow-productivity", async (cc) => {
    const res = await request(app).get(`/${cc}/corporate-training/ai-workflow-productivity`);

    expect(res.status).toBe(200);
    expect(res.text).toContain("AI Workflow Productivity &amp; Process Transformation");
    expect(res.text).toContain(`/images/og/corporate-ai-workflow-${cc}.jpg`);
    expect(res.text).toContain('id="caForm"');
    // The short form (2026-11-13): delivery is agreed on the call, in every country.
    expect(res.text).not.toContain('name="delivery"');
  });

  it("serves the page photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/corporate-ai/ng-hero.jpg")).status).toBe(200);
    expect((await request(app).get("/images/corporate-ai/..%2Fog%2Fcorporate-ai-workflow-ng.jpg")).status).toBe(404);
  });

  it("serves the corporate training hub at /, linking to each country page", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    for (const cc of ["ng", "za", "gh", "ke"]) {
      expect(res.text).toContain(`href="/${cc}/corporate-training/ai-workflow-productivity"`);
    }
    // The visitor picks a country, so the hub form has no country preselected.
    expect(res.text).toContain('<option value="">Choose your country</option>');
    expect(res.text).toContain('hreflang="x-default" href="https://paleontraining.com/"');
  });

  it("links the homepages and footers to the corporate pages", async () => {
    const res = await request(app).get("/za");

    expect(res.text).toContain('href="/za/corporate-training/ai-workflow-productivity"');
    expect(res.text).toContain('href="/?country=za"');
    expect(res.text).toContain('href="/za/corporate-training"');
  });
});

describe("CyberSecure Workforce corporate pages", () => {
  it("files a CyberSecure enquiry under its own source and subject", async () => {
    const res = await request(app)
      .post("/api/leads/corporate")
      .send({ ...enquiry, programme: "cybersecure-workforce", requirement: "Organisation-wide awareness programme", page: "/ng/corporate-training/cybersecure-workforce" });

    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead).toMatchObject({ source: "cybersecure-workforce", course: "CyberSecure Workforce (Corporate)" });
    expect(lead?.details).toMatchObject({ programme: "CyberSecure Workforce", requirement: "Organisation-wide awareness programme" });
    expect(memAdapter.sentMessages[0].subject).toContain("Corporate cybersecurity training enquiry");
  });

  it("keeps AI Workflow enquiries without a programme on the old source", async () => {
    const res = await request(app).post("/api/leads/corporate").send(enquiry);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead?.source).toBe("corporate-ai-workflow");
  });

  it("rejects an unknown programme", async () => {
    const res = await request(app).post("/api/leads/corporate").send({ ...enquiry, programme: "something-else" });
    expect(res.status).toBe(400);
  });

  it.each(["ng", "za", "gh", "ke"])("serves /%s/corporate-training/cybersecure-workforce", async (cc) => {
    const res = await request(app).get(`/${cc}/corporate-training/cybersecure-workforce`);

    expect(res.status).toBe(200);
    expect(res.text).toContain("CyberSecure Workforce: Cybersecurity Awareness Training for Businesses in");
    expect(res.text).toContain(`/images/og/cybersecure-workforce-${cc}.jpg`);
    expect(res.text).toContain('data-programme="cybersecure-workforce"');
    expect(res.text).toContain("Request In-House Training Proposal");
    // All 12 modules, the packages and the AI Workflow cross-link on every page.
    expect(res.text).toContain("Incident Reporting &amp; Response");
    expect(res.text).toContain("CyberSecure Workforce Foundation workshop (live)");
    expect(res.text).toContain(`href="/${cc}/corporate-training/ai-workflow-productivity"`);
    expect(res.text).not.toContain("Workforce Score");
    expect(res.text).not.toContain("(link:");
    expect(res.text).not.toContain('name="delivery"');
    expect(res.text.includes("ITF")).toBe(cc === "ng");
  });

  it("serves the CyberSecure photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/cybersecure/ke-hero.jpg")).status).toBe(200);
    expect((await request(app).get("/images/cybersecure/..%2Fog%2Fcybersecure-workforce-ng.jpg")).status).toBe(404);
  });

  it("is linked from the hub, the AI pages, the homepages and the Cyber Security course pages", async () => {
    const hub = await request(app).get("/");
    for (const cc of ["ng", "za", "gh", "ke"]) expect(hub.text).toContain(`href="/${cc}/corporate-training/cybersecure-workforce"`);
    expect((await request(app).get("/gh/corporate-training/ai-workflow-productivity")).text).toContain('href="/gh/corporate-training/cybersecure-workforce"');
    expect((await request(app).get("/ke")).text).toContain('href="/ke/corporate-training/cybersecure-workforce"');
    expect((await request(app).get("/za/cyber-security-fundamentals-course")).text).toContain('href="/za/corporate-training/cybersecure-workforce"');
    expect((await request(app).get("/cyber-security-fundamentals-course")).text).toContain('href="/ng/corporate-training/cybersecure-workforce"');
  });
});

describe("AI + Cybersecurity Professional Accelerator corporate pages", () => {
  const PATH = "corporate-training/ai-cybersecurity-professional-accelerator";

  it("files an Accelerator enquiry under its own source and subject", async () => {
    const res = await request(app)
      .post("/api/leads/corporate")
      .send({ ...enquiry, programme: "ai-cyber-accelerator", requirement: "Professional Accelerator for a team", page: `/ng/${PATH}` });

    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead).toMatchObject({ source: "ai-cyber-accelerator", course: "AI + Cybersecurity Professional Accelerator (Corporate)" });
    expect(lead?.details).toMatchObject({ requirement: "Professional Accelerator for a team" });
    expect(memAdapter.sentMessages[0].subject).toContain("Corporate AI + cybersecurity training enquiry");
  });

  it.each(["ng", "za", "gh", "ke"])(`serves /%s/${PATH}`, async (cc) => {
    const res = await request(app).get(`/${cc}/${PATH}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain("AI + Cybersecurity Professional Accelerator for Businesses in");
    expect(res.text).toContain(`/images/og/ai-cyber-accelerator-${cc}.jpg`);
    expect(res.text).toContain(`/images/accelerator/${cc}-hero.jpg`);
    expect(res.text).toContain('data-programme="ai-cyber-accelerator"');
    expect(res.text).toContain("Request In-House Training Proposal");
    // Only the confirmed promises: facilitator capstone feedback and an unaccredited certificate.
    expect(res.text).toContain("certificate of completion");
    expect(res.text).toContain("not accredited");
    expect(res.text).not.toMatch(/typically|6 to 10|half a day/i);
    expect(res.text).not.toContain("(link:");
    expect(res.text).not.toContain("**");
    expect(res.text).not.toContain('name="delivery"');
    expect(res.text.includes("ITF")).toBe(cc === "ng");
  });

  it("serves the Accelerator photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/accelerator/gh-security.jpg")).status).toBe(200);
    expect((await request(app).get("/images/accelerator/..%2Fog%2Fai-cyber-accelerator-ng.jpg")).status).toBe(404);
  });

  it("is linked from the hub, the AI and CyberSecure pages, the homepages and the course pages", async () => {
    const hub = await request(app).get("/");
    for (const cc of ["ng", "za", "gh", "ke"]) expect(hub.text).toContain(`href="/${cc}/${PATH}"`);
    expect((await request(app).get("/gh/corporate-training/ai-workflow-productivity")).text).toContain(`href="/gh/${PATH}"`);
    expect((await request(app).get("/za/corporate-training/cybersecure-workforce")).text).toContain(`href="/za/${PATH}"`);
    expect((await request(app).get("/ke")).text).toContain(`href="/ke/${PATH}"`);
    expect((await request(app).get("/za/cyber-security-fundamentals-course")).text).toContain(`href="/za/${PATH}"`);
    expect((await request(app).get("/cyber-security-fundamentals-course")).text).toContain(`href="/ng/${PATH}"`);
  });
});

describe("AI & Cyber Readiness Check (2026-11-08)", () => {
  const check = {
    name: "Thandi Mokoena",
    jobTitle: "Managing Director",
    organisation: "Example Logistics (Pty) Ltd",
    country: "ZA",
    email: "thandi@example.co.za",
    employees: "50–249",
    // Cyber: 0,1,0,1,0 (20%); AI: 2,2,1,2,2 (90%).
    answers: [0, 1, 0, 1, 0, 2, 2, 1, 2, 2],
    consent: true,
    page: "/ai-cyber-readiness-check",
  };

  it("serves the check with ten questions, scored in the browser by readiness-check.js", async () => {
    const res = await request(app).get("/ai-cyber-readiness-check?country=ke");
    expect(res.status).toBe(200);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/ai-cyber-readiness-check">');
    expect(res.text.match(/<fieldset class="rc-q"/g)?.length).toBe(10);
    expect(res.text).toContain('<script src="/readiness-check.js" defer></script>');
    expect(res.text).toContain('<option value="KE" selected>Kenya</option>');
    expect(res.text).toContain("/ke/corporate-training/cybersecure-workforce");
    expect((await request(app).get("/readiness-check.js")).status).toBe(200);
  });

  it("scores the answers on the server, saves an employer lead and emails the scorecard and corporate@", async () => {
    const res = await request(app).post("/api/leads/readiness").send({ ...check, updates: true });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ score: 55, cyber: 20, ai: 90, band: "developing" });
    const lead = await Lead.findByPk(res.body.id);
    expect(lead).toMatchObject({ source: "ai-cyber-readiness", course: "AI & Cyber Readiness Check (Corporate)", country: "ZA", phone: null });
    expect(lead?.details).toMatchObject({ organisation: check.organisation, score: "55", cyber: "20", ai: "90", band: "Developing" });
    expect(lead?.marketingConsentAt).not.toBeNull();
    // Not a learner: the nurture emails are stamped as done.
    expect(lead?.welcomeEmailSentAt).not.toBeNull();

    expect(memAdapter.sentMessages).toHaveLength(2);
    const [scorecard, notice] = memAdapter.sentMessages;
    expect(scorecard).toMatchObject({ to: check.email, replyTo: config.corporateEnquiriesEmail });
    expect(scorecard.subject).toContain("55% (Developing)");
    expect(scorecard.text).toContain("Cybersecurity: 20% · AI use: 90%");
    // Weakest area first: cybersecurity training is suggested first, with the country's page.
    expect(scorecard.text.indexOf("CyberSecure Workforce")).toBeLessThan(scorecard.text.indexOf("AI Workflow Productivity"));
    expect(scorecard.text).toContain("https://paleontraining.com/za/corporate-training/cybersecure-workforce");
    expect(notice).toMatchObject({ to: config.corporateEnquiriesEmail, replyTo: check.email });
    expect(notice.subject).toContain("scored 55%");
  });

  it("rejects incomplete answers, out-of-range answers and a missing consent", async () => {
    expect((await request(app).post("/api/leads/readiness").send({ ...check, answers: [2, 2, 2] })).status).toBe(400);
    expect((await request(app).post("/api/leads/readiness").send({ ...check, answers: [3, 2, 2, 2, 2, 2, 2, 2, 2, 2] })).status).toBe(400);
    expect((await request(app).post("/api/leads/readiness").send({ ...check, consent: false })).status).toBe(400);
    expect(await Lead.count()).toBe(0);
  });
});

describe("Director resources and the employer-first menu (2026-11-08)", () => {
  it.each([
    ["/ai-use-policy-template", "AI use policy template for organisations"],
    ["/board-cyber-risk-briefing", "Board cyber-risk briefing for directors"],
  ])("serves %s", async (path, h1) => {
    const res = await request(app).get(path);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`<link rel="canonical" href="https://paleontraining.com${path}">`);
    expect(res.text).toContain(h1);
    expect(res.text).toContain('"@type":"Article"');
    expect(res.text).toContain("not legal advice");
  });

  it("links the resources from the homepage, and names each country's data protection law there", async () => {
    const home = (await request(app).get("/")).text;
    expect(home).toContain('id="resources"');
    for (const href of ["/ai-cyber-readiness-check", "/ai-use-policy-template", "/board-cyber-risk-briefing"]) expect(home).toContain(`href="${href}"`);
    for (const law of ["Nigeria Data Protection Act 2023", "Protection of Personal Information Act (POPIA)", "Data Protection Act, 2019", "Act 843"]) {
      expect(home).toContain(law);
    }
    expect((await request(app).get("/ke/corporate-training")).text).toContain("Kenya&#39;s Data Protection Act, 2019");
  });

  it("keeps For individuals out of the corporate menu, in the top bar and footer (2026-11-13)", async () => {
    for (const path of ["/", "/za/corporate-training", "/ng/corporate-training/cybersecure-workforce", "/ai-use-policy-template"]) {
      const html = (await request(app).get(path)).text;
      expect(html).not.toContain("<summary>For individuals</summary>");
      expect(html).toMatch(/<a class="util-individuals" href="\/(ng|za|ke|gh)">For individuals &rarr;<\/a>/);
      expect(html).toContain('<a href="/ai-cyber-readiness-check">Free Readiness Check</a>');
      expect(html).toContain("Corporate training &middot;");
    }
    const learner = (await request(app).get("/ng")).text;
    expect(learner).not.toContain("For individuals");
    expect(learner).toContain("Digital skills &middot; Nigeria");
  });
});
