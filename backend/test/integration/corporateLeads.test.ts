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
    // Only Nigeria offers in-house and hybrid delivery.
    expect(res.text.includes('name="delivery"')).toBe(cc === "ng");
  });

  it("serves the page photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/corporate-ai/ng-hero.jpg")).status).toBe(200);
    expect((await request(app).get("/images/corporate-ai/..%2Fog%2Fcorporate-ai-workflow-ng.jpg")).status).toBe(404);
  });

  it("serves the corporate training hub, linking to each country page", async () => {
    const res = await request(app).get("/corporate-training");

    expect(res.status).toBe(200);
    for (const cc of ["ng", "za", "gh", "ke"]) {
      expect(res.text).toContain(`href="/${cc}/corporate-training/ai-workflow-productivity"`);
    }
    // The visitor picks a country, so the hub form has no country preselected.
    expect(res.text).toContain('<option value="">Choose your country</option>');
    expect(res.text).toContain('hreflang="x-default" href="https://paleontraining.com/corporate-training"');
  });

  it("links the homepages and footers to the corporate pages", async () => {
    const res = await request(app).get("/za");

    expect(res.text).toContain('href="/za/corporate-training/ai-workflow-productivity"');
    expect(res.text).toContain('href="/corporate-training"');
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
    expect(res.text).toContain("Request Corporate Cybersecurity Training Proposal");
    // All 12 modules, the packages and the AI Workflow cross-link on every page.
    expect(res.text).toContain("Incident Reporting &amp; Response");
    expect(res.text).toContain("CyberSecure Workforce Essentials");
    expect(res.text).toContain(`href="/${cc}/corporate-training/ai-workflow-productivity"`);
    expect(res.text).not.toContain("Workforce Score");
    expect(res.text).not.toContain("(link:");
    expect(res.text.includes('name="delivery"')).toBe(cc === "ng");
    expect(res.text.includes("ITF")).toBe(cc === "ng");
  });

  it("serves the CyberSecure photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/cybersecure/ke-hero.jpg")).status).toBe(200);
    expect((await request(app).get("/images/cybersecure/..%2Fog%2Fcybersecure-workforce-ng.jpg")).status).toBe(404);
  });

  it("is linked from the hub, the AI pages, the homepages and the Cyber Security course pages", async () => {
    const hub = await request(app).get("/corporate-training");
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
    expect(res.text).toContain("Request Corporate Training Proposal");
    // Only the confirmed promises: facilitator capstone feedback and an unaccredited certificate.
    expect(res.text).toContain("certificate of completion");
    expect(res.text).toContain("not accredited");
    expect(res.text).not.toMatch(/typically|6 to 10|half a day/i);
    expect(res.text).not.toContain("(link:");
    expect(res.text).not.toContain("**");
    expect(res.text.includes('name="delivery"')).toBe(cc === "ng");
    expect(res.text.includes("ITF")).toBe(cc === "ng");
  });

  it("serves the Accelerator photos but nothing outside their folder", async () => {
    expect((await request(app).get("/images/accelerator/gh-security.jpg")).status).toBe(200);
    expect((await request(app).get("/images/accelerator/..%2Fog%2Fai-cyber-accelerator-ng.jpg")).status).toBe(404);
  });

  it("is linked from the hub, the AI and CyberSecure pages, the homepages and the course pages", async () => {
    const hub = await request(app).get("/corporate-training");
    for (const cc of ["ng", "za", "gh", "ke"]) expect(hub.text).toContain(`href="/${cc}/${PATH}"`);
    expect((await request(app).get("/gh/corporate-training/ai-workflow-productivity")).text).toContain(`href="/gh/${PATH}"`);
    expect((await request(app).get("/za/corporate-training/cybersecure-workforce")).text).toContain(`href="/za/${PATH}"`);
    expect((await request(app).get("/ke")).text).toContain(`href="/ke/${PATH}"`);
    expect((await request(app).get("/za/cyber-security-fundamentals-course")).text).toContain(`href="/za/${PATH}"`);
    expect((await request(app).get("/cyber-security-fundamentals-course")).text).toContain(`href="/ng/${PATH}"`);
  });
});
