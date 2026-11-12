import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { quoteCorporateOrder } from "../../src/constants/corporatePricing";
import { CorporateClient, CorporateMember, CorporateOrder, CorporateSeat, Course, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Corporate online orders (2026-11-12): buy learner places on Flutterwave, company set up
// automatically on payment; 200+ learners (or on request) invoiced instead.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const HASH = "jest-flw-hash";
const SLUGS = ["cybersecure-workforce-essentials", "ai-workflow-productivity", "ai-cybersecurity-professional-accelerator"];

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

async function makeCourses() {
  const instructor = await User.create({
    email: "corp-instructor@example.com",
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Ada",
    lastName: "Obi",
    role: "instructor",
  });
  for (const slug of SLUGS) {
    await Course.create({
      title: slug,
      slug,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
      metadata: { corporate: true },
    });
  }
}

// Flutterwave's API: opening a checkout returns a link; verify returns the last tx_ref.
function mockFlutterwave(transaction: Record<string, unknown> = {}) {
  let opened: Record<string, unknown> = {};
  const mock = jest.spyOn(global, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.endsWith("/v3/payments")) {
      opened = JSON.parse(String((init as RequestInit).body));
      return json({ status: "success", data: { link: "https://checkout.flutterwave.com/v3/hosted/pay/corp" } });
    }
    if (/\/v3\/transactions\/\d+\/verify$/.test(url)) {
      return json({
        status: "success",
        data: { id: 777, tx_ref: opened.tx_ref, status: "successful", currency: opened.currency, amount: opened.amount, ...transaction },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  return { mock, opened: () => opened };
}

const BUYER = {
  organisation: "Acme Bank Ltd",
  contactName: "Ngozi Eze",
  contactEmail: "ngozi@acmebank.example",
  phone: "+234 800 000 0000",
  consent: true,
};

function order(body: Record<string, unknown>) {
  return request(app).post("/api/corporate/orders").send({ ...BUYER, ...body });
}

function webhook(txRef: string, id = 777, hash = HASH) {
  return request(app)
    .post("/api/payments/flutterwave/webhook")
    .set("verif-hash", hash)
    .send({ event: "charge.completed", data: { id, tx_ref: txRef, status: "successful" } });
}

describe("Corporate pricing", () => {
  it("applies the volume tiers and the all-three discount, whichever is larger", () => {
    expect(quoteCorporateOrder("NG", "cybersecure", 9)).toMatchObject({ unitPrice: 55000, total: 495000, discountPercent: 0 });
    expect(quoteCorporateOrder("NG", "cybersecure", 10)).toMatchObject({ unitPrice: 49500, total: 495000, discountPercent: 10 });
    expect(quoteCorporateOrder("KE", "ai-workflow", 50)).toMatchObject({ currency: "KES", unitPrice: 12400 });
    expect(quoteCorporateOrder("INTL", "accelerator", 1)).toMatchObject({ currency: "GBP", unitPrice: 195 });
    // All three: 15% beats 10%, 20% beats 15%.
    expect(quoteCorporateOrder("NG", "all-three", 10)).toMatchObject({ listUnitPrice: 425000, unitPrice: 361250 });
    expect(quoteCorporateOrder("NG", "all-three", 50)).toMatchObject({ unitPrice: 340000 });
    expect(quoteCorporateOrder("INTL", "all-three", 1)).toMatchObject({ unitPrice: 284 });
    expect(quoteCorporateOrder("ZA", "cybersecure", 200)).toMatchObject({ invoiceOnly: true, unitPrice: 700 });
  });
});

describe("Corporate online orders", () => {
  const original = { ...config.flutterwave };
  beforeEach(async () => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
    await makeCourses();
    memAdapter.clear();
  });
  afterEach(() => jest.restoreAllMocks());
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
  });

  it("opens a Flutterwave checkout priced on the server, then sets the company up on payment", async () => {
    const fw = mockFlutterwave();
    const res = await order({ region: "NG", programme: "cybersecure", seats: 12, unitPrice: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ kind: "checkout", paymentLink: "https://checkout.flutterwave.com/v3/hosted/pay/corp" });
    // 12 learners at 10% off, whatever the browser sends.
    expect(fw.opened()).toMatchObject({ amount: 594000, currency: "NGN", payment_options: "card,banktransfer,ussd" });
    const pending = await CorporateOrder.findOne({ where: { txRef: res.body.txRef } });
    expect(pending).toMatchObject({ status: "pending", seats: 12, total: 594000, unitPrice: 49500 });

    const hook = await webhook(res.body.txRef);
    expect(hook.body).toEqual({ received: true, outcome: "paid" });

    const paid = await CorporateOrder.findOne({ where: { txRef: res.body.txRef } });
    expect(paid?.status).toBe("paid");
    const client = await CorporateClient.findByPk(paid!.clientId!);
    expect(client).toMatchObject({ name: "Acme Bank Ltd", country: "NG", contactEmail: "ngozi@acmebank.example" });
    const seats = await CorporateSeat.findAll({ where: { clientId: client!.id } });
    expect(seats).toHaveLength(1);
    expect(seats[0].seats).toBe(12);
    expect(seats[0].expiresAt!.getTime()).toBeGreaterThan(Date.now() + 360 * 24 * 3600 * 1000);

    const sent = memAdapter.sentMessages;
    const receipt = sent.find((m) => m.to === "ngozi@acmebank.example");
    expect(receipt?.text).toContain(`/company/join/${client!.joinCode}`);
    expect(receipt?.text).toContain("₦594,000");
    expect(sent.some((m) => m.to === config.corporateEnquiriesEmail && /PAID/.test(m.subject))).toBe(true);

    // Flutterwave retries: nothing is set up twice.
    expect((await webhook(res.body.txRef)).body.outcome).toBe("duplicate");
    expect(await CorporateClient.count()).toBe(1);

    // The buyer signs up with the link and becomes the manager; other staff don't.
    const join = await request(app)
      .post(`/api/corporate/join/${client!.joinCode}`)
      .send({ firstName: "Ngozi", lastName: "Eze", email: "Ngozi@acmebank.example", password: "Password123!", courseIds: [seats[0].courseId] });
    expect(join.status).toBe(201);
    const staff = await request(app)
      .post(`/api/corporate/join/${client!.joinCode}`)
      .send({ firstName: "Tunde", lastName: "Ade", email: "tunde@acmebank.example", password: "Password123!", courseIds: [seats[0].courseId] });
    expect(staff.status).toBe(201);
    const members = await CorporateMember.findAll({ where: { clientId: client!.id }, include: [{ model: User, as: "user" }] });
    const managerOf = (email: string) =>
      members.find((m) => (m as unknown as { user: User }).user.email === email)?.isManager;
    expect(managerOf("ngozi@acmebank.example")).toBe(true);
    expect(managerOf("tunde@acmebank.example")).toBe(false);
  });

  it("buys all three programmes in pounds for a buyer outside the four countries", async () => {
    const fw = mockFlutterwave();
    const res = await order({ region: "INTL", buyerCountry: "United Kingdom", programme: "all-three", seats: 3 });
    expect(res.status).toBe(201);
    expect(fw.opened()).toMatchObject({ amount: 852, currency: "GBP", payment_options: "card" });
    await webhook(res.body.txRef);
    const paid = await CorporateOrder.findOne({ where: { txRef: res.body.txRef } });
    const seats = await CorporateSeat.findAll({ where: { clientId: paid!.clientId! } });
    expect(seats.map((s) => s.seats)).toEqual([3, 3, 3]);
    const client = await CorporateClient.findByPk(paid!.clientId!);
    expect(client?.notes).toContain("United Kingdom");
  });

  it("asks for the buyer's country when paying in pounds", async () => {
    const res = await order({ region: "INTL", programme: "cybersecure", seats: 3 });
    expect(res.status).toBe(400);
  });

  it("does not set the company up when less than the order total was paid", async () => {
    mockFlutterwave({ amount: 1000 });
    const res = await order({ region: "GH", programme: "cybersecure", seats: 5 });
    expect((await webhook(res.body.txRef)).body.outcome).toBe("unmatched");
    expect(await CorporateClient.count()).toBe(0);
    expect((await CorporateOrder.findOne({ where: { txRef: res.body.txRef } }))?.status).toBe("pending");
  });

  it("does not set the company up when paid in another currency", async () => {
    mockFlutterwave({ currency: "USD" });
    const res = await order({ region: "KE", programme: "cybersecure", seats: 5 });
    expect((await webhook(res.body.txRef)).body.outcome).toBe("unmatched");
    expect(await CorporateClient.count()).toBe(0);
  });

  it("rejects a webhook without the secret hash", async () => {
    mockFlutterwave();
    const res = await order({ region: "ZA", programme: "cybersecure", seats: 5 });
    expect((await webhook(res.body.txRef, 777, "wrong")).status).toBe(401);
    expect(await CorporateClient.count()).toBe(0);
  });

  it("invoices 200 or more learners instead of opening a checkout", async () => {
    const fw = mockFlutterwave();
    const res = await order({ region: "ZA", programme: "cybersecure", seats: 250 });
    expect(res.status).toBe(201);
    expect(res.body.kind).toBe("invoice");
    expect(fw.mock).not.toHaveBeenCalled();
    const saved = await CorporateOrder.findOne({ where: { txRef: res.body.txRef } });
    expect(saved).toMatchObject({ status: "invoice_requested", total: 175000, currency: "ZAR" });
    expect(memAdapter.sentMessages.some((m) => m.to === config.corporateEnquiriesEmail && /invoice request/i.test(m.subject))).toBe(true);
    expect(memAdapter.sentMessages.some((m) => m.to === "ngozi@acmebank.example")).toBe(true);
  });

  it("invoices a smaller order when the buyer asks", async () => {
    const fw = mockFlutterwave();
    const res = await order({ region: "NG", programme: "accelerator", seats: 4, payByInvoice: true });
    expect(res.body.kind).toBe("invoice");
    expect(fw.mock).not.toHaveBeenCalled();
  });

  it("sets the company up when the buyer returns before the webhook arrives", async () => {
    mockFlutterwave();
    const res = await order({ region: "KE", programme: "ai-workflow", seats: 2 });
    const page = await request(app).get(
      `/corporate-checkout/complete?status=successful&tx_ref=${res.body.txRef}&transaction_id=777`,
    );
    expect(page.status).toBe(200);
    expect(page.text).toContain("Payment received");
    expect(page.text).not.toContain("/company/join/");
    expect((await CorporateOrder.findOne({ where: { txRef: res.body.txRef } }))?.status).toBe("paid");
    expect((await webhook(res.body.txRef)).body.outcome).toBe("duplicate");
  });

  it("shows a cancelled checkout without charging", async () => {
    mockFlutterwave();
    const res = await order({ region: "KE", programme: "ai-workflow", seats: 2 });
    const page = await request(app).get(`/corporate-checkout/complete?status=cancelled&tx_ref=${res.body.txRef}`);
    expect(page.text).toContain("Payment cancelled");
    expect(await CorporateClient.count()).toBe(0);
  });
});

describe("Admin: corporate orders", () => {
  const original = { ...config.flutterwave };
  beforeEach(async () => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
    await makeCourses();
  });
  afterEach(() => jest.restoreAllMocks());
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
  });

  async function adminToken() {
    await User.create({
      email: "corp-admin@example.com",
      passwordHash: await bcrypt.hash("Password123!", 4),
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      emailVerifiedAt: new Date(),
    });
    const res = await request(app).post("/api/auth/login").send({ email: "corp-admin@example.com", password: "Password123!" });
    return res.body.accessToken as string;
  }

  it("lists orders for admins only", async () => {
    mockFlutterwave();
    await order({ region: "ZA", programme: "cybersecure", seats: 250 });
    expect((await request(app).get("/api/admin/corporate-orders")).status).toBe(401);
    const token = await adminToken();
    const res = await request(app).get("/api/admin/corporate-orders").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.orders).toHaveLength(1);
    expect(res.body.orders[0]).toMatchObject({
      status: "invoice_requested",
      organisation: "Acme Bank Ltd",
      seats: 250,
      total: 175000,
      totalLabel: "R175,000",
      programmeName: "CyberSecure Workforce Essentials",
      client: null,
    });
  });

  it("marks a paid invoice as paid, setting the company up and emailing the buyer", async () => {
    mockFlutterwave();
    const placed = await order({ region: "NG", programme: "all-three", seats: 300 });
    const token = await adminToken();
    const list = await request(app).get("/api/admin/corporate-orders").set("Authorization", `Bearer ${token}`);
    const id = list.body.orders[0].id;
    memAdapter.clear();

    const res = await request(app).post(`/api/admin/corporate-orders/${id}/mark-paid`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.orders[0]).toMatchObject({ status: "paid", client: { name: "Acme Bank Ltd" } });
    const saved = await CorporateOrder.findOne({ where: { txRef: placed.body.txRef } });
    const seats = await CorporateSeat.findAll({ where: { clientId: saved!.clientId! } });
    expect(seats.map((s) => s.seats)).toEqual([300, 300, 300]);
    const client = await CorporateClient.findByPk(saved!.clientId!);
    expect(client?.notes).toContain("marked paid by an admin (invoice)");
    expect(memAdapter.sentMessages.some((m) => m.to === "ngozi@acmebank.example" && m.text.includes(`/company/join/${client!.joinCode}`))).toBe(true);

    // Clicking again does nothing more.
    const again = await request(app).post(`/api/admin/corporate-orders/${id}/mark-paid`).set("Authorization", `Bearer ${token}`);
    expect(again.status).toBe(409);
    expect(await CorporateClient.count()).toBe(1);
  });

  it("cancels an unpaid order but not a paid one", async () => {
    mockFlutterwave();
    const unpaid = await order({ region: "KE", programme: "cybersecure", seats: 5 });
    const paid = await order({ region: "KE", programme: "ai-workflow", seats: 5 });
    await webhook(paid.body.txRef);
    const token = await adminToken();
    const byRef = async (txRef: string) => (await CorporateOrder.findOne({ where: { txRef } }))!;

    const cancel = await request(app)
      .post(`/api/admin/corporate-orders/${(await byRef(unpaid.body.txRef)).id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(cancel.status).toBe(200);
    expect((await byRef(unpaid.body.txRef)).status).toBe("cancelled");

    const refused = await request(app)
      .post(`/api/admin/corporate-orders/${(await byRef(paid.body.txRef)).id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(refused.status).toBe(409);
  });
});
