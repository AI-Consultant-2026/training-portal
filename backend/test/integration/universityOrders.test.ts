import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { AppSetting, CorporateClient, CorporateMember, CorporateOrder, CorporateSeat, Course, Enrollment, User } from "../../src/models";
import {
  DEFAULT_TIERS,
  GROUP_DISCOUNT_KEY,
  quoteUniversityOrder,
} from "../../src/services/universityPricing.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// University places (2026-11-15): universities buy places on the graduate courses for
// their students with a group discount Paleon sets in /admin; representatives get the
// manager login; students join with /university/join/<code>.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const HASH = "jest-flw-hash";
const PASSWORD = "Password123!";
const GRADUATE = [
  ["cyber-security-fundamentals", "Cyber Security Fundamentals"],
  ["hse-fundamentals", "HSE Fundamentals"],
  ["digital-marketing", "Digital Marketing"],
];

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

function mockFlutterwave() {
  let opened: Record<string, unknown> = {};
  jest.spyOn(global, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.endsWith("/v3/payments")) {
      opened = JSON.parse(String((init as RequestInit).body));
      return json({ status: "success", data: { link: "https://checkout.flutterwave.com/v3/hosted/pay/uni" } });
    }
    if (/\/v3\/transactions\/\d+\/verify$/.test(url)) {
      return json({
        status: "success",
        data: { id: 888, tx_ref: opened.tx_ref, status: "successful", currency: opened.currency, amount: opened.amount },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  return { opened: () => opened };
}

function webhook(txRef: string) {
  return request(app)
    .post("/api/payments/flutterwave/webhook")
    .set("verif-hash", HASH)
    .send({ event: "charge.completed", data: { id: 888, tx_ref: txRef, status: "successful" } });
}

async function makeUser(email: string, role: "admin" | "student" = "student") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash(PASSWORD, 4),
    firstName: "Ada",
    lastName: "Obi",
    role,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: PASSWORD });
  return res.body.accessToken as string;
}

async function makeCourses() {
  const courses: Record<string, Course> = {};
  for (const [slug, title] of GRADUATE) {
    courses[slug] = await Course.create({ title, slug, durationWeeks: 8, status: "published" });
  }
  return courses;
}

const BUYER = {
  organisation: "University of Lagos",
  contactName: "Funmi Bello",
  contactEmail: "careers@unilag.example",
  consent: true,
};

describe("University group pricing", () => {
  it("discounts each course on its own number of places: 10% at 10-49, 20% at 50-199, 30% at 200+", () => {
    const q = quoteUniversityOrder(
      "NG",
      [
        { courseSlug: "cyber-security-fundamentals", seats: 9 },
        { courseSlug: "hse-fundamentals", seats: 10 },
        { courseSlug: "digital-marketing", seats: 50 },
        { courseSlug: "gis-and-drone-mapping", seats: 200 },
      ],
      DEFAULT_TIERS,
    );
    expect(q.currency).toBe("NGN");
    expect(q.lines.map((l) => [l.courseSlug, l.discountPercent, l.unitPrice])).toEqual([
      ["cyber-security-fundamentals", 0, 200000],
      ["hse-fundamentals", 10, 90000],
      ["digital-marketing", 20, 120000],
      ["gis-and-drone-mapping", 30, 140000],
    ]);
    expect(q.total).toBe(9 * 200000 + 10 * 90000 + 50 * 120000 + 200 * 140000);
    // Kenya: local fees, same tiers.
    const ke = quoteUniversityOrder("KE", [{ courseSlug: "hse-fundamentals", seats: 60 }], DEFAULT_TIERS);
    expect(ke.currency).toBe("KES");
    expect(ke.lines[0].discountPercent).toBe(20);
  });

  it("gives a university its agreed discount when it is bigger than the tier", () => {
    const q = quoteUniversityOrder("NG", [{ courseSlug: "hse-fundamentals", seats: 5 }], DEFAULT_TIERS, 25);
    expect(q.lines[0]).toMatchObject({ discountPercent: 25, unitPrice: 75000 });
    const big = quoteUniversityOrder("NG", [{ courseSlug: "hse-fundamentals", seats: 250 }], DEFAULT_TIERS, 25);
    expect(big.lines[0].discountPercent).toBe(30);
  });
});

describe("University places", () => {
  const original = { ...config.flutterwave };
  beforeEach(() => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
  });
  afterEach(async () => {
    jest.restoreAllMocks();
    await AppSetting.upsert({ key: GROUP_DISCOUNT_KEY, value: DEFAULT_TIERS });
  });
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
  });

  it("lets Paleon change the group discount tiers, which the page and checkout then use", async () => {
    await makeCourses();
    await makeUser("admin@example.com", "admin");
    const admin = await loginAs("admin@example.com");
    const current = await request(app).get("/api/admin/university-discounts").set("Authorization", `Bearer ${admin}`);
    expect(current.body.tiers).toEqual(DEFAULT_TIERS);

    const bad = await request(app)
      .put("/api/admin/university-discounts")
      .set("Authorization", `Bearer ${admin}`)
      .send({ tiers: [{ minLearners: 10, percent: 20 }, { minLearners: 50, percent: 10 }] });
    expect(bad.status).toBe(400);

    const saved = await request(app)
      .put("/api/admin/university-discounts")
      .set("Authorization", `Bearer ${admin}`)
      .send({ tiers: [{ minLearners: 100, percent: 35 }, { minLearners: 5, percent: 15 }] });
    expect(saved.status).toBe(200);
    expect(saved.body.tiers).toEqual([{ minLearners: 5, percent: 15 }, { minLearners: 100, percent: 35 }]);

    const page = await request(app).get("/gh/universities");
    expect(page.status).toBe(200);
    expect(page.text).toContain("up to 35%");
    expect(page.text).toContain("5–99 learners");

    const fw = mockFlutterwave();
    const res = await request(app)
      .post("/api/corporate/university-orders")
      .send({ ...BUYER, country: "NG", items: [{ courseSlug: "hse-fundamentals", seats: 6 }] });
    expect(res.status).toBe(201);
    expect(fw.opened()).toMatchObject({ amount: 6 * 85000, currency: "NGN" });

    const student = await makeUser("someone@example.com");
    const token = await loginAs(student.email);
    const forbidden = await request(app).get("/api/admin/university-discounts").set("Authorization", `Bearer ${token}`);
    expect(forbidden.status).toBe(403);
  });

  it("sets a paid university up, makes the buyer its representative and lets students join", async () => {
    const courses = await makeCourses();
    const fw = mockFlutterwave();
    const res = await request(app)
      .post("/api/corporate/university-orders")
      .send({
        ...BUYER,
        country: "NG",
        items: [
          { courseSlug: "cyber-security-fundamentals", seats: 12 },
          { courseSlug: "hse-fundamentals", seats: 3 },
          { courseSlug: "digital-marketing", seats: 0 },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body.kind).toBe("checkout");
    // 12 x 180,000 (10% off) + 3 x 100,000 (no discount), priced on the server.
    expect(fw.opened()).toMatchObject({ amount: 2160000 + 300000, currency: "NGN" });
    expect(String(fw.opened().redirect_url)).toContain("/university-checkout/complete");

    expect((await webhook(res.body.txRef)).body.outcome).toBe("paid");
    const order = await CorporateOrder.findOne({ where: { txRef: res.body.txRef } });
    expect(order).toMatchObject({ status: "paid", orderType: "university", seats: 15 });
    const client = await CorporateClient.findByPk(order!.clientId!);
    expect(client).toMatchObject({ clientType: "university", name: "University of Lagos", representativeEmails: ["careers@unilag.example"] });
    const seats = await CorporateSeat.findAll({ where: { clientId: client!.id } });
    expect(Object.fromEntries(seats.map((s) => [s.courseId, s.seats]))).toEqual({
      [courses["cyber-security-fundamentals"].id]: 12,
      [courses["hse-fundamentals"].id]: 3,
    });
    const receipt = memAdapter.sentMessages.find((m) => m.to === "careers@unilag.example");
    expect(receipt?.text).toContain(`/university/join/${client!.joinCode}`);
    expect(receipt?.text).toContain("Cyber Security Fundamentals: 12 places at ₦180,000 each (10% group discount)");

    // The buyer signs up with the link: representative (manager) login.
    const rep = await request(app).post(`/api/corporate/join/${client!.joinCode}`).send({
      firstName: "Funmi",
      lastName: "Bello",
      email: "careers@unilag.example",
      password: PASSWORD,
      courseIds: [courses["hse-fundamentals"].id],
    });
    expect(rep.status).toBe(201);
    // A student joins, picks a course and is unlocked straight away.
    const student = await request(app).post(`/api/corporate/join/${client!.joinCode}`).send({
      firstName: "Chidi",
      lastName: "Okafor",
      email: "chidi@gmail.example",
      password: PASSWORD,
      courseIds: [courses["cyber-security-fundamentals"].id],
    });
    expect(student.status).toBe(201);
    const chidi = await User.findOne({ where: { email: "chidi@gmail.example" } });
    expect(chidi?.profileData).toMatchObject({ universityClient: "University of Lagos" });
    expect(chidi?.profileData).not.toHaveProperty("corporateClient");
    const enrolment = await Enrollment.findOne({ where: { studentId: chidi!.id } });
    expect(enrolment).toMatchObject({ paymentConfirmed: true, corporateClientId: client!.id });
    const members = await CorporateMember.findAll({ where: { clientId: client!.id } });
    expect(members.find((m) => m.userId === chidi!.id)?.isManager).toBe(false);
    expect(members.find((m) => m.userId !== chidi!.id)?.isManager).toBe(true);

    // The representative sees the manager view, with what they need to buy more places.
    const repToken = rep.body.accessToken as string;
    const mine = await request(app).get("/api/corporate/me").set("Authorization", `Bearer ${repToken}`);
    expect(mine.body.company).toMatchObject({ clientType: "university", isManager: true });
    expect(mine.body.company.members).toHaveLength(2);
    expect(mine.body.company.buy.tiers).toEqual(DEFAULT_TIERS);
    expect(mine.body.company.buy.courses.find((c: { slug: string }) => c.slug === "hse-fundamentals").listPrice).toBe(100000);
    // A student doesn't.
    const studentView = await request(app)
      .get("/api/corporate/me")
      .set("Authorization", `Bearer ${student.body.accessToken}`);
    expect(studentView.body.company).not.toHaveProperty("buy");
    const studentBuy = await request(app)
      .post("/api/corporate/me/orders")
      .set("Authorization", `Bearer ${student.body.accessToken}`)
      .send({ items: [{ courseSlug: "hse-fundamentals", seats: 10 }] });
    expect(studentBuy.status).toBe(403);

    // Paleon agrees 25% with this university; the representative buys 5 more HSE places by invoice.
    await client!.update({ discountPercent: 25 });
    memAdapter.clear();
    const topUp = await request(app)
      .post("/api/corporate/me/orders")
      .set("Authorization", `Bearer ${repToken}`)
      .send({ items: [{ courseSlug: "hse-fundamentals", seats: 5 }], payByInvoice: true });
    expect(topUp.status).toBe(201);
    expect(topUp.body.kind).toBe("invoice");
    const invoice = await CorporateOrder.findOne({ where: { txRef: topUp.body.txRef } });
    expect(invoice).toMatchObject({ status: "invoice_requested", clientId: client!.id, total: 5 * 75000 });

    // Admin marks the invoice paid: the places are added to the same university and link.
    await makeUser("admin@example.com", "admin");
    const admin = await loginAs("admin@example.com");
    const marked = await request(app)
      .post(`/api/admin/corporate-orders/${invoice!.id}/mark-paid`)
      .set("Authorization", `Bearer ${admin}`);
    expect(marked.status).toBe(200);
    expect(await CorporateClient.count()).toBe(1);
    const hse = await CorporateSeat.findOne({ where: { clientId: client!.id, courseId: courses["hse-fundamentals"].id } });
    expect(hse?.seats).toBe(8);
    const listed = marked.body.orders.find((o: { id: string }) => o.id === invoice!.id);
    expect(listed.programmeName).toBe("University places: HSE Fundamentals ×5");
  });

  it("lets Paleon add representatives, who get the manager login even if they joined first", async () => {
    const courses = await makeCourses();
    await makeUser("admin@example.com", "admin");
    const admin = await loginAs("admin@example.com");
    const created = await request(app)
      .post("/api/admin/corporate-clients")
      .set("Authorization", `Bearer ${admin}`)
      .send({
        name: "Kenyatta University",
        country: "KE",
        clientType: "university",
        seats: [{ courseId: courses["digital-marketing"].id, seats: 20 }],
      });
    expect(created.status).toBe(201);
    expect(created.body.client).toMatchObject({ clientType: "university", representativeEmails: [] });
    expect(created.body.client.joinUrl).toContain("/university/join/");
    const code = created.body.client.joinCode;

    const joined = await request(app).post(`/api/corporate/join/${code}`).send({
      firstName: "Wanjiru",
      lastName: "Kamau",
      email: "dean@ku.example",
      password: PASSWORD,
      courseIds: [courses["digital-marketing"].id],
    });
    expect(joined.status).toBe(201);
    let member = await CorporateMember.findOne({ where: { clientId: created.body.client.id } });
    expect(member?.isManager).toBe(false);

    const updated = await request(app)
      .patch(`/api/admin/corporate-clients/${created.body.client.id}`)
      .set("Authorization", `Bearer ${admin}`)
      .send({ representativeEmails: ["Dean@KU.example", "registrar@ku.example"], discountPercent: 15 });
    expect(updated.status).toBe(200);
    expect(updated.body.client).toMatchObject({
      representativeEmails: ["dean@ku.example", "registrar@ku.example"],
      discountPercent: 15,
    });
    member = await CorporateMember.findOne({ where: { clientId: created.body.client.id } });
    expect(member?.isManager).toBe(true);

    // A university's places are only on the graduate courses.
    const corporateCourse = await Course.create({
      title: "CyberSecure Workforce Essentials",
      slug: "cybersecure-workforce-essentials",
      durationWeeks: 13,
      status: "published",
      metadata: { corporate: true },
    });
    const wrong = await request(app)
      .patch(`/api/admin/corporate-clients/${created.body.client.id}`)
      .set("Authorization", `Bearer ${admin}`)
      .send({ seats: [{ courseId: corporateCourse.id, seats: 5 }] });
    expect(wrong.status).toBe(400);
  });

  it("serves the four university pages with local group prices and the buy form", async () => {
    for (const [path, money] of [
      ["/ng/universities", "₦180,000"],
      ["/za/universities", "R"],
      ["/ke/universities", "KSh"],
      ["/gh/universities", "GH₵"],
    ]) {
      const page = await request(app).get(path);
      expect(page.status).toBe(200);
      expect(page.text).toContain('id="uniBuy"');
      expect(page.text).toContain(money);
      expect(page.text).toContain("10–49 learners");
      expect(page.text).toContain("200+ learners");
    }
    const home = await request(app).get("/za");
    expect(home.text).toContain('href="/za/universities"');
  });

  it("rejects an order with no places or an unknown course", async () => {
    const none = await request(app)
      .post("/api/corporate/university-orders")
      .send({ ...BUYER, country: "NG", items: [{ courseSlug: "hse-fundamentals", seats: 0 }] });
    expect(none.status).toBe(400);
    const unknown = await request(app)
      .post("/api/corporate/university-orders")
      .send({ ...BUYER, country: "NG", items: [{ courseSlug: "cybersecure-workforce-essentials", seats: 10 }] });
    expect(unknown.status).toBe(400);
  });
});
