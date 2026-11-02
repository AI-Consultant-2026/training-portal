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
