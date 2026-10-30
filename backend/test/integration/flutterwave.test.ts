import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { buildLeadWelcomeEmail } from "../../src/emails/templates/leadNurture";
import { Course, CourseModule, Enrollment, Lesson, Payment, User } from "../../src/models";
import { sponsorToken } from "../../src/services/sponsor.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Flutterwave checkout for Ghana, Kenya and South Africa (2026-10-30): a live Kenya pays
// in shillings on Flutterwave; Nigeria, and any country not live yet, stays on Paystack.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const HASH = "jest-flw-hash";

// Kenya, Digital Marketing (constants/countries.ts): KSh 14,475 = KSh 1,930 deposit + KSh 12,545.
const PRICE = 14_475;
const DEPOSIT = 1_930;
const BALANCE = 12_545;

async function makeUser(email: string, role: "student" | "instructor", country = "KE") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Wanjiru",
    lastName: "Kamau",
    role,
    country,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup(country = "KE") {
  const instructor = await makeUser("flw-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Digital Marketing",
    slug: "digital-marketing",
    durationWeeks: 8,
    status: "published",
    instructorId: instructor.id,
  });
  for (let n = 1; n <= 3; n++) {
    const day = await CourseModule.create({ courseId: course.id, title: `Day ${n}`, weekNumber: n });
    await Lesson.create({ moduleId: day.id, title: `Day ${n} Lesson 1`, order: 1 });
  }
  const student = await makeUser("flw-student@example.com", "student", country);
  const token = await loginAs(student.email);
  memAdapter.clear();
  return { course, student, token };
}

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

// Flutterwave's API: opening a checkout returns its link; verifying returns `transaction`
// with the tx_ref of the last checkout opened.
function mockFlutterwave(transaction: Record<string, unknown> = {}) {
  let txRef = "";
  const mock = jest.spyOn(global, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.endsWith("/v3/payments")) {
      txRef = JSON.parse(String((init as RequestInit).body)).tx_ref;
      return json({ status: "success", data: { link: "https://checkout.flutterwave.com/v3/hosted/pay/abc" } });
    }
    if (/\/v3\/transactions\/\d+\/verify$/.test(url)) {
      return json({
        status: "success",
        data: { id: 4242, tx_ref: txRef, status: "successful", currency: "KES", amount: DEPOSIT, ...transaction },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  return { mock, txRef: () => txRef };
}

function webhook(id: number | string, hash = HASH) {
  return request(app)
    .post("/api/payments/flutterwave/webhook")
    .set("verif-hash", hash)
    .send({ event: "charge.completed", data: { id, status: "successful" } });
}

async function startDeposit(course: Course, token: string) {
  return request(app)
    .post("/api/payments/instalment")
    .set("Authorization", `Bearer ${token}`)
    .send({ courseId: course.id, kind: "deposit" });
}

describe("Flutterwave checkout (Ghana, Kenya, South Africa)", () => {
  const original = { ...config.flutterwave, live: config.liveCountries };
  beforeEach(() => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
    config.liveCountries = ["KE"];
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
    config.liveCountries = original.live;
  });

  it("quotes a live Kenya in shillings on Flutterwave", async () => {
    const { course, token } = await setup();
    const res = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quote).toEqual({
      checkout: {
        country: "KE",
        gateway: "flutterwave",
        currency: { code: "KES", symbol: "KSh", spaced: true },
        currencyName: "shillings",
        whatsappLink: "https://wa.me/447508823495",
      },
      baseAmountNgn: PRICE,
      card: { currency: "KES", amount: PRICE, enabled: true },
      instalment: { depositNgn: DEPOSIT, balanceNgn: BALANCE, unlockedDays: 2, enabled: true },
    });
  });

  it("keeps a Kenyan student on Naira and Paystack while Kenya isn't live", async () => {
    config.liveCountries = [];
    const { course, token } = await setup();
    const res = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.body.quote.checkout).toMatchObject({ country: "NG", gateway: "paystack" });
    expect(res.body.quote.card).toMatchObject({ currency: "NGN", amount: 150_000 });
  });

  it("says payments are off when the Flutterwave key isn't set", async () => {
    config.flutterwave.secretKey = "";
    const { course, token } = await setup();
    const quote = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
    expect(quote.body.quote.card.enabled).toBe(false);
    const res = await startDeposit(course, token);
    expect(res.status).toBe(503);
  });

  it("opens Flutterwave checkout for the deposit in shillings and records a pending payment", async () => {
    const { course, student, token } = await setup();
    const { mock, txRef } = mockFlutterwave();

    const res = await startDeposit(course, token);

    expect(res.status).toBe(201);
    expect(res.body.paymentLink).toBe("https://checkout.flutterwave.com/v3/hosted/pay/abc");
    const [url, init] = mock.mock.calls[0];
    expect(url).toBe("https://api.flutterwave.com/v3/payments");
    expect((init as RequestInit).headers).toMatchObject({ Authorization: "Bearer FLWSECK_TEST-jest" });
    const sent = JSON.parse(String((init as RequestInit).body));
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(sent).toMatchObject({
      amount: DEPOSIT,
      currency: "KES",
      payment_options: "card,mpesa",
      customer: { email: student.email },
      meta: { enrollmentId: enrollment!.id, instalment: "deposit" },
    });
    expect(sent.redirect_url).toMatch(/\/courses\/digital-marketing\?payment=deposit$/);
    expect(txRef()).toMatch(/^PLN-deposit-[0-9a-f]{16}$/);
    const payment = await Payment.findOne({ where: { enrollmentId: enrollment!.id } });
    expect(payment).toMatchObject({
      status: "pending",
      currency: "KES",
      billingCountry: "KE",
      gatewayReference: `flutterwave-init:${txRef()}`,
    });
    expect(Number(payment!.amount)).toBe(DEPOSIT);
  });

  it("rejects a webhook without the right secret hash", async () => {
    await setup();
    const fetchMock = mockFlutterwave();
    const res = await webhook(4242, "wrong");
    expect(res.status).toBe(401);
    expect(fetchMock.mock).not.toHaveBeenCalled();
  });

  it("unlocks the deposit days from the webhook, after checking the charge with Flutterwave, once", async () => {
    const { course, student, token } = await setup();
    const { mock, txRef } = mockFlutterwave();
    await startDeposit(course, token);

    const res = await webhook(4242);
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("confirmed");
    expect(String(mock.mock.calls[1][0])).toBe("https://api.flutterwave.com/v3/transactions/4242/verify");

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.depositPaidAt).not.toBeNull();
    expect(enrollment!.paymentConfirmed).toBe(false);
    const payments = await Payment.findAll({ where: { enrollmentId: enrollment!.id } });
    expect(payments).toHaveLength(1);
    expect(payments[0]).toMatchObject({ status: "succeeded", gatewayReference: `flutterwave:${txRef()}` });

    const again = await webhook(4242);
    expect(again.body.outcome).toBe("duplicate");
    expect(await Payment.count({ where: { enrollmentId: enrollment!.id } })).toBe(1);
  });

  it("leaves a charge for the wrong amount to the team, with an email", async () => {
    const { course, student, token } = await setup();
    mockFlutterwave({ amount: 100 });
    await startDeposit(course, token);

    const res = await webhook(4242);
    expect(res.body.outcome).toBe("unmatched");
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.depositPaidAt).toBeNull();
    const sent = memAdapter.sentMessages.find((m) => m.subject.includes("Flutterwave payment needs manual confirmation"));
    expect(sent?.subject).toContain("KSh 100");
  });

  it("ignores a failed charge and anything that isn't one of our checkouts", async () => {
    const { course, student, token } = await setup();
    mockFlutterwave({ status: "failed" });
    await startDeposit(course, token);
    expect((await webhook(4242)).body.outcome).toBe("ignored");

    jest.restoreAllMocks();
    mockFlutterwave({ tx_ref: "someone-elses-link" });
    expect((await webhook(4242)).body.outcome).toBe("ignored");
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.depositPaidAt).toBeNull();
  });

  it("takes the full price through Flutterwave and confirms it when the student returns", async () => {
    const { course, student, token } = await setup();
    const { mock } = mockFlutterwave({ amount: PRICE });

    const start = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id });
    expect(start.status).toBe(201);
    const sent = JSON.parse(String((mock.mock.calls[0][1] as RequestInit).body));
    expect(sent).toMatchObject({ amount: PRICE, currency: "KES", meta: { instalment: "full" } });

    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ transactionId: "4242" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      outcome: "confirmed",
      purchase: { valueNgn: PRICE, currency: "KES", plan: "full", courseSlug: "digital-marketing" },
    });
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.paymentConfirmed).toBe(true);
  });

  it("won't let another student apply someone else's charge", async () => {
    const { course, token } = await setup();
    mockFlutterwave();
    await startDeposit(course, token);
    await makeUser("flw-other@example.com", "student");
    const otherToken = await loginAs("flw-other@example.com");

    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ transactionId: "4242" });
    expect(res.status).toBe(403);
  });

  it("lets a sponsor pay the balance in shillings", async () => {
    const { course, student, token } = await setup();
    mockFlutterwave();
    await startDeposit(course, token);
    await webhook(4242);
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    const sponsor = sponsorToken(enrollment!.id);

    const page = await request(app).get(`/api/sponsor/${sponsor}`);
    expect(page.body.sponsor).toMatchObject({
      checkout: { country: "KE", gateway: "flutterwave" },
      status: "deposit_paid",
      priceNgn: PRICE,
      depositNgn: DEPOSIT,
      balanceNgn: BALANCE,
      paymentsEnabled: true,
    });

    jest.restoreAllMocks();
    const { mock } = mockFlutterwave({ id: 5151, amount: BALANCE });
    const start = await request(app).post(`/api/sponsor/${sponsor}/pay`).send({ kind: "balance" });
    expect(start.status).toBe(201);
    const sent = JSON.parse(String((mock.mock.calls[0][1] as RequestInit).body));
    expect(sent).toMatchObject({ amount: BALANCE, currency: "KES", customer: { email: student.email } });
    expect(sent.redirect_url).toContain(`/sponsor/${sponsor}?paid=balance`);

    const verify = await request(app).post(`/api/sponsor/${sponsor}/verify`).send({ transactionId: "5151" });
    expect(verify.body.outcome).toBe("confirmed");
    await enrollment!.reload();
    expect(enrollment!.paymentConfirmed).toBe(true);
  });
});

// Pages and emails that show a live country's own currency (2026-10-30).
describe("A live Kenya outside the checkout", () => {
  const original = { ...config.flutterwave, live: config.liveCountries };
  beforeEach(() => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
    config.liveCountries = ["KE"];
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
    config.liveCountries = original.live;
  });

  it("emails the deposit confirmation in shillings", async () => {
    const { course, token } = await setup();
    mockFlutterwave();
    await startDeposit(course, token);
    await webhook(4242);
    const email = memAdapter.sentMessages.find((m) => m.subject.startsWith("Deposit received"));
    expect(email?.text).toContain("Your KSh 1,930 deposit");
    expect(email?.text).toContain("balance of KSh 12,545");
    expect(email?.text).not.toContain("₦");
  });

  it("drops the 'payments open soon' note from a live country's ambassador page", async () => {
    const live = await request(app).get("/ke/ambassadors");
    expect(live.text).toContain('href="/register?country=KE"');
    expect(live.text).not.toContain("Course payments in Kenya open soon");
    const gh = await request(app).get("/gh/ambassadors");
    expect(gh.text).toContain("Course payments in Ghana open soon");
  });

  it("quotes a Kenyan lead the fee in shillings and Kenya's WhatsApp line", () => {
    const lead = { id: "lead-1", name: "Wanjiru Kamau", email: "w@example.com", course: "Digital Marketing" };
    const ke = buildLeadWelcomeEmail({ ...lead, country: "KE" }).text;
    expect(ke).toContain("KSh 14,475");
    expect(ke).toContain("+44 7508 823495");
    const ng = buildLeadWelcomeEmail({ ...lead, country: "NG" }).text;
    expect(ng).toContain("₦150,000");
    expect(ng).toContain("+234 707 714 9215");
  });

  it("gives the free preview Kenya's prices beside Nigeria's", async () => {
    const { course } = await setup();
    const day1 = await CourseModule.findOne({ where: { courseId: course.id, weekNumber: 1 } });
    await Lesson.update({ content: "Free lesson" }, { where: { moduleId: day1!.id } });
    const res = await request(app).get(`/api/courses/${course.slug}/preview`);
    expect(res.status).toBe(200);
    expect(res.body.course).toMatchObject({ priceNgn: 150_000, depositNgn: 20_000 });
    expect(res.body.localPrices).toEqual({
      KE: { checkout: expect.objectContaining({ country: "KE" }), price: PRICE, deposit: DEPOSIT },
    });
  });
});
