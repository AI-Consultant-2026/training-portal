import bcrypt from "bcryptjs";
import crypto from "crypto";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { COURSE_PRICES_NGN } from "../../src/constants/coursePricing";
import { listTbcValues } from "../../src/constants/countries";
import { Course, Enrollment, Lead, Payment, User, WaitlistSignup } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Country homepages, waitlists and per-country Paystack (2026-10-30).
const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const naira = (n: number) => `₦${n.toLocaleString("en-GB")}`;

describe("Country homepages", () => {
  it("serves Nigeria at /ng with today's prices, deposit, checkout links and NDPA", async () => {
    const res = await request(app).get("/ng");
    expect(res.status).toBe(200);
    expect(res.text).toContain('<html lang="en-NG">');
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/ng">');
    for (const price of Object.values({
      cyber: COURSE_PRICES_NGN["cyber-security-fundamentals"],
      gis: COURSE_PRICES_NGN["gis-and-drone-mapping"],
      dm: COURSE_PRICES_NGN["digital-marketing"],
      hse: COURSE_PRICES_NGN["hse-fundamentals"],
    })) {
      expect(res.text).toContain(`<span class="price-value">${naira(price)}</span>`);
    }
    expect(res.text).toContain("Start any course for ₦20,000</strong>");
    expect(res.text).toContain('href="/register?course=cyber-security-fundamentals"');
    expect(res.text).toContain("Nigeria Data Protection Act 2023");
    expect(res.text).toContain("<option>NYSC Camp</option>");
    expect(res.text).toContain("Earn ₦5,000 in airtime, data or course credit when they enrol.");
    expect(res.text).toContain("500,000");
    expect(res.text).not.toContain('id="waitlist"');
    expect(res.text).toContain('<script src="/whatsapp-float.js" defer></script>');
    expect(res.text).toContain('"priceCurrency":"NGN","price":"200000"');
  });

  it.each([
    ["/za", "ZA", "en-ZA", "POPIA", "University / TVET college", "R"],
    ["/ke", "KE", "en-KE", "Occupational Safety and Health Act 2007", "National Youth Service (NYS)", "KSh"],
    ["/gh", "GH", "en-GH", "Data Protection Act 2012 (Act 843)", "National Service (NSS)", "GH₵"],
  ])("serves %s as a coming-soon page: waitlist, visible TBCs, no checkout", async (path, code, locale, law, service, symbol) => {
    const res = await request(app).get(path);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`<html lang="${locale}">`);
    expect(res.text).toContain(`data-waitlist-form data-country="${code}"`);
    expect(res.text).toContain("are launching soon");
    expect(res.text).toContain('<mark class="tbc">');
    expect(res.text).toContain(law);
    expect(res.text).toContain(`<option>${service}</option>`);
    expect(res.text).toContain(`NG &middot; ₦`.replace("NG", code).replace("₦", symbol.replace("₵", "₵")));
    expect(res.text).not.toContain("/register?course=");
    expect(res.text).not.toContain("priceCurrency");
    expect(res.text).not.toContain("whatsapp-float.js");
  });

  it("lists every country version with hreflang plus x-default, and has no inline scripts", async () => {
    for (const path of ["/", "/ng", "/za", "/ke", "/gh"]) {
      const res = await request(app).get(path);
      for (const [lang, href] of [
        ["en-NG", "/ng"],
        ["en-ZA", "/za"],
        ["en-KE", "/ke"],
        ["en-GH", "/gh"],
        ["x-default", "/"],
      ]) {
        expect(res.text).toContain(`<link rel="alternate" hreflang="${lang}" href="https://paleontraining.com${href}">`);
      }
      expect(res.text).not.toMatch(/<script>(?!\s*$)/);
      expect(res.text).not.toMatch(/<script(?![^>]*(?:\bsrc=|type="application\/(?:ld\+)?json"))[^>]*>/);
      // Flags are inline SVG, never emoji.
      expect(res.text).not.toMatch(/\u{1F1F3}\u{1F1EC}|\u{1F1FF}\u{1F1E6}|\u{1F1F0}\u{1F1EA}|\u{1F1EC}\u{1F1ED}/u);
      for (const name of ["Nigeria", "South Africa", "Kenya", "Ghana"]) {
        expect(res.text).toContain(`<span class="ctry-name">${name}</span>`);
      }
    }
  });

  it("keeps the ambassador video and long referral section off the homepage", async () => {
    const res = await request(app).get("/ng");
    expect(res.text).not.toContain("ambassadorGuide");
    expect(res.text).not.toContain("guide-chapter");
    expect(res.text).toContain('href="/ambassadors">Become an Ambassador</a>');
    const amb = await request(app).get("/ambassadors");
    expect(amb.text).toContain('id="ambassadorGuide"');
    expect(amb.text.match(/class="guide-chapter"/g)?.length).toBe(11);
    expect(amb.text).toContain("Bring a friend. You both get rewarded.");
    expect(amb.text).toContain('<link rel="alternate" hreflang="en-KE" href="https://paleontraining.com/ke/ambassadors">');
  });

  it("serves coming-soon ambassador pages and keeps Nigeria's at /ambassadors", async () => {
    const ke = await request(app).get("/ke/ambassadors");
    expect(ke.status).toBe(200);
    expect(ke.text).toContain("Paleon Ambassadors &middot; Kenya");
    expect(ke.text).toContain('data-waitlist-form data-country="KE"');
    expect(ke.text).toContain('<link rel="canonical" href="https://paleontraining.com/ke/ambassadors">');
    const ng = await request(app).get("/ng/ambassadors");
    expect(ng.status).toBe(301);
    expect(ng.headers.location).toBe("/ambassadors");
  });
});

describe("Hub, remembered country and the country banner", () => {
  it("shows Nigeria at / by default, canonical to /, without redirecting", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/">');
    expect(res.text).toContain("Oil &amp; Gas, Banking and Telecoms");
    expect(res.headers["cache-control"]).toBe("private, no-cache");
    expect(res.headers.vary).toMatch(/Cookie/);
  });

  it("shows the remembered country at / on the next visit", async () => {
    const res = await request(app).get("/").set("Cookie", "paleon_country=KE");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Telecoms, Fintech and Energy");
    expect(res.text).toContain('data-waitlist-form data-country="KE"');
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/">');
  });

  it("suggests the visitor's own country from the CDN header, never redirecting", async () => {
    const res = await request(app).get("/ng").set("CF-IPCountry", "KE");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Looks like you&rsquo;re in <strong>Kenya</strong>. See courses and prices in KES?");
    expect(res.text).toContain('<a class="btn btn-ink" href="/ke" data-pick-country="KE">Switch to Kenya</a>');
    expect(res.text).toContain('data-stay-country="NG">Stay on Nigeria</button>');
  });

  it("doesn't show the banner once a country was chosen, in the same country, or elsewhere", async () => {
    const chosen = await request(app).get("/ng").set("CF-IPCountry", "KE").set("Cookie", "paleon_country=NG");
    expect(chosen.text).not.toContain('id="geoBanner"');
    const same = await request(app).get("/ke").set("CF-IPCountry", "KE");
    expect(same.text).not.toContain('id="geoBanner"');
    const elsewhere = await request(app).get("/ng").set("CF-IPCountry", "US");
    expect(elsewhere.text).not.toContain('id="geoBanner"');
  });

  it("moves the old homepage to /ng permanently, keeping the query string", async () => {
    const res = await request(app).get("/welcome?utm_source=meta&utm_campaign=start20k");
    expect(res.status).toBe(301);
    expect(res.headers.location).toBe("/ng?utm_source=meta&utm_campaign=start20k");
  });
});

describe("Country waitlist", () => {
  beforeEach(() => memAdapter.clear());

  it("stores a sign-up with its country and tells the team once", async () => {
    const first = await request(app).post("/api/waitlist").send({ country: "KE", whatsapp: "+254 712 345 678", consent: true });
    expect(first.status).toBe(201);
    const again = await request(app).post("/api/waitlist").send({ country: "KE", whatsapp: "+254 712 345 678", consent: true });
    expect(again.status).toBe(201);
    const rows = await WaitlistSignup.findAll({ where: { country: "KE" } });
    expect(rows).toHaveLength(1);
    expect(rows[0].whatsapp).toBe("+254 712 345 678");
    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0].subject).toBe("New Kenya waitlist sign-up");
  });

  it("rejects live countries and numbers that aren't phone numbers", async () => {
    expect((await request(app).post("/api/waitlist").send({ country: "NG", whatsapp: "+234 803 123 4567" })).status).toBe(400);
    expect((await request(app).post("/api/waitlist").send({ country: "GH", whatsapp: "call me" })).status).toBe(400);
    expect((await request(app).post("/api/waitlist").send({ country: "US", whatsapp: "+1 202 555 0100" })).status).toBe(400);
  });

  it("needs the WhatsApp consent box ticked", async () => {
    const res = await request(app).post("/api/waitlist").send({ country: "ZA", whatsapp: "+27 82 123 4567" });
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toContain("Please tick the box");
    expect(await WaitlistSignup.count()).toBe(0);
  });

  it("lists sign-ups for admins only", async () => {
    await WaitlistSignup.create({ country: "ZA", whatsapp: "+27 82 123 4567" });
    expect((await request(app).get("/api/admin/waitlist")).status).toBe(401);
    await User.create({
      email: "waitlist-admin@example.com",
      passwordHash: await bcrypt.hash("Password123!", 4),
      firstName: "Ada",
      lastName: "Admin",
      role: "admin",
      emailVerifiedAt: new Date(),
    });
    const login = await request(app).post("/api/auth/login").send({ email: "waitlist-admin@example.com", password: "Password123!" });
    const res = await request(app).get("/api/admin/waitlist").set("Authorization", `Bearer ${login.body.accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.signups[0]).toMatchObject({ country: "ZA", whatsapp: "+27 82 123 4567" });
  });

  it("accepts each country's Career Match options on the lead form", async () => {
    const res = await request(app).post("/api/leads").send({
      name: "Wanjiru Kamau",
      email: "wanjiru@example.com",
      course: "Cyber Security Fundamentals",
      sector: "Fintech & mobile money",
      source: "National Youth Service (NYS)",
      country: "KE",
      consent: true,
    });
    expect(res.status).toBe(201);
    expect((await Lead.findByPk(res.body.id))?.marketingConsentAt).toBeInstanceOf(Date);
  });

  it("needs the email consent box ticked outside Nigeria, and not in Nigeria", async () => {
    const lead = { name: "Thabo Nkosi", email: "thabo@example.com", course: "Cyber Security Fundamentals" };
    const za = await request(app).post("/api/leads").send({ ...lead, country: "ZA" });
    expect(za.status).toBe(400);
    expect(JSON.stringify(za.body)).toContain("Please tick the box");
    const ng = await request(app).post("/api/leads").send({ ...lead, email: "chidi@example.com", country: "NG" });
    expect(ng.status).toBe(201);
    expect((await Lead.findByPk(ng.body.id))?.marketingConsentAt).toBeNull();
  });

  it("shows the tick-boxes on Ghana, Kenya and South Africa only", async () => {
    for (const path of ["/za", "/ke", "/gh"]) {
      const html = (await request(app).get(path)).text;
      expect(html).toContain('id="regConsent" name="consent" required');
      expect(html).toContain('id="waitlistConsent" name="consent" required');
    }
    expect((await request(app).get("/ke/ambassadors")).text).toContain('name="consent" required');
    const ng = (await request(app).get("/ng")).text;
    expect(ng).not.toContain('name="consent"');
  });
});

describe("Country config", () => {
  it("lists the unconfirmed values, and Nigeria's fees aren't among them", () => {
    const tbc = listTbcValues();
    expect(tbc).toContain("Kenya: coursePrices = not set");
    expect(tbc).toContain("Ghana: deposit = not set");
    expect(tbc.some((line) => line.startsWith("Nigeria: laws.hse"))).toBe(true);
    expect(tbc.some((line) => line.startsWith("Nigeria: coursePrices") || line.startsWith("Nigeria: deposit"))).toBe(false);
  });
});

describe("Paystack per country", () => {
  const NG_SECRET = "sk_test_jest_ng";
  const GH_SECRET = "sk_test_jest_gh";
  const original = { ng: config.paystackSecretKey, gh: config.paystackSecretKeys.GH };
  beforeEach(() => {
    config.paystackSecretKey = NG_SECRET;
    config.paystackSecretKeys.GH = GH_SECRET;
  });
  afterEach(() => jest.restoreAllMocks());
  afterAll(() => {
    config.paystackSecretKey = original.ng;
    config.paystackSecretKeys.GH = original.gh;
  });

  function webhook(secret: string, data: Record<string, unknown>) {
    const body = JSON.stringify({ event: "charge.success", data: { status: "success", ...data } });
    return request(app)
      .post("/api/payments/paystack/webhook")
      .set("Content-Type", "application/json")
      .set("x-paystack-signature", crypto.createHmac("sha512", secret).update(body).digest("hex"))
      .send(body);
  }

  it("accepts a signature from any configured country's key, and only that account's currency", async () => {
    const charge = { reference: "ref-gh-1", amount: 100_000, customer: { email: "nobody@example.com" } };
    expect((await webhook("sk_wrong", { ...charge, currency: "GHS" })).status).toBe(401);
    // A cedi charge signed by Nigeria's account, or a Naira one by Ghana's, isn't believed.
    expect((await webhook(NG_SECRET, { ...charge, currency: "GHS" })).body.outcome).toBe("ignored");
    expect((await webhook(GH_SECRET, { ...charge, currency: "NGN" })).body.outcome).toBe("ignored");
    // Ghana's own cedi charge is read, but with no enrolment it goes to the team by hand.
    expect((await webhook(GH_SECRET, { ...charge, currency: "GHS" })).body.outcome).toBe("unmatched");
  });

  it("keeps a student from a coming-soon country paying in Naira through Nigeria's account", async () => {
    const instructor = await User.create({
      email: "pc-instructor@example.com",
      passwordHash: await bcrypt.hash("Password123!", 4),
      firstName: "Ike",
      lastName: "Obi",
      role: "instructor",
      emailVerifiedAt: new Date(),
    });
    const course = await Course.create({
      title: "Digital Marketing",
      slug: "digital-marketing",
      durationWeeks: 8,
      status: "published",
      instructorId: instructor.id,
    });
    await User.create({
      email: "pc-ghana@example.com",
      passwordHash: await bcrypt.hash("Password123!", 4),
      firstName: "Kofi",
      lastName: "Mensah",
      role: "student",
      country: "GH",
      emailVerifiedAt: new Date(),
    });
    const login = await request(app).post("/api/auth/login").send({ email: "pc-ghana@example.com", password: "Password123!" });
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ status: true, data: { authorization_url: "https://checkout.paystack.com/gh" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const res = await request(app)
      .post("/api/payments/instalment")
      .set("Authorization", `Bearer ${login.body.accessToken}`)
      .send({ courseId: course.id, kind: "deposit" });
    expect(res.status).toBe(201);
    const [, init] = fetchMock.mock.calls[0];
    expect((init as RequestInit).headers).toMatchObject({ Authorization: `Bearer ${NG_SECRET}` });
    const sent = JSON.parse(String((init as RequestInit).body));
    expect(sent).toMatchObject({ currency: "NGN", amount: 2_000_000 });
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id } });
    const payment = await Payment.findOne({ where: { enrollmentId: enrollment!.id } });
    expect(payment).toMatchObject({ currency: "NGN", billingCountry: "NG" });
  });
});
