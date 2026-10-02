import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, ReferralPayout, User } from "../../src/models";

const app = createApp();

async function createUser(email: string, role: "admin" | "instructor") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: role, role });
}

async function register(email: string, extra: Record<string, unknown> = {}) {
  await request(app)
    .post("/api/auth/register")
    .send({ email, password: "Password123!", firstName: "Jest", lastName: "Student", ...extra });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

// An ambassador whose friend has paid, so both rewards are owed. Returns the referral id.
async function qualifiedReferral(opts: { rewardType?: "airtime" | "data" | "discount"; phone?: string } = {}) {
  const admin = await createUser("payout-admin@example.com", "admin");
  const adminToken = await loginAs(admin.email);
  const instructor = await createUser("payout-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 12,
    status: "published",
    instructorId: instructor.id,
  });

  await register("amb@example.com");
  const ambToken = await loginAs("amb@example.com");
  const me = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${ambToken}`);
  if (opts.rewardType) {
    await request(app)
      .patch("/api/referrals/me/reward-preference")
      .set("Authorization", `Bearer ${ambToken}`)
      .send({ rewardType: opts.rewardType });
  }
  if (opts.phone !== undefined) {
    await request(app)
      .patch("/api/referrals/me/payout-phone")
      .set("Authorization", `Bearer ${ambToken}`)
      .send({ phone: opts.phone });
  }

  await register("friend@example.com", { referralCode: me.body.referral.code });
  await User.update({ emailVerifiedAt: new Date() }, { where: { email: "friend@example.com" } });
  const friendToken = await loginAs("friend@example.com");
  const enroll = await request(app)
    .post(`/api/courses/${course.id}/enroll`)
    .set("Authorization", `Bearer ${friendToken}`);
  await request(app)
    .patch(`/api/admin/enrollments/${enroll.body.enrollment.id}/payment`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ paymentConfirmed: true });

  const list = await request(app).get("/api/admin/referrals").set("Authorization", `Bearer ${adminToken}`);
  return { adminToken, referralId: list.body.referrals[0].id as string };
}

function vtpassReply(body: unknown) {
  return Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));
}

const delivered = (id = "17000000001") => ({
  code: "000",
  response_description: "TRANSACTION SUCCESSFUL",
  content: { transactions: { status: "delivered", transactionId: id } },
});

const MTN_PLANS = {
  content: {
    variations: [
      { variation_code: "mtn-10gb", name: "MTN 10GB - 30 days", variation_amount: "4500.00", fixedPrice: "Yes" },
      { variation_code: "mtn-20gb", name: "MTN 20GB - 30 days", variation_amount: "7500.00", fixedPrice: "Yes" },
      { variation_code: "mtn-1gb", name: "MTN 1GB - 1 day", variation_amount: "350.00", fixedPrice: "Yes" },
    ],
  },
};

describe("Referral payouts via VTpass", () => {
  let fetchSpy: jest.SpyInstance;
  const original = { ...config.vtpass };

  beforeEach(() => {
    Object.assign(config.vtpass, { apiKey: "test-api", secretKey: "SK_test", publicKey: "PK_test", live: false });
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    Object.assign(config.vtpass, original);
  });

  it("is switched off, and refuses to send, when no VTpass keys are set", async () => {
    Object.assign(config.vtpass, { apiKey: "", secretKey: "" });
    const { adminToken, referralId } = await qualifiedReferral({ phone: "08031234567" });

    const cfg = await request(app).get("/api/admin/referral-payouts/config").set("Authorization", `Bearer ${adminToken}`);
    expect(cfg.body).toEqual({ enabled: false, live: false, balanceNgn: null });

    const send = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(send.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("previews the payout with the number in local form and a network guess", async () => {
    const { adminToken, referralId } = await qualifiedReferral({ phone: "+234 803 123 4567" });
    const res = await request(app)
      .get(`/api/admin/referrals/${referralId}/payout-preview?party=referrer`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.preview).toMatchObject({
      kind: "airtime",
      amountNgn: 5000,
      phone: "08031234567",
      suggestedNetwork: "mtn",
      live: false,
    });
  });

  it("sends airtime, marks the reward issued, and won't send it twice", async () => {
    const { adminToken, referralId } = await qualifiedReferral({ phone: "0803 123 4567" });
    fetchSpy.mockImplementation(() => vtpassReply(delivered()));

    const res = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("delivered");
    expect(res.body.referral.referrerReward.status).toBe("issued");
    expect(res.body.referral.payouts.referrer).toMatchObject({ status: "delivered", amountNgn: 5000, network: "mtn" });

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://sandbox.vtpass.com/api/pay");
    expect(init.headers).toMatchObject({ "api-key": "test-api", "secret-key": "SK_test" });
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({ serviceID: "mtn", amount: 5000, phone: "08031234567" });
    expect(sent.request_id).toMatch(/^\d{12}[0-9a-f]{12}$/);

    const again = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(again.status).toBe(400);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("keeps an unclear send as processing, blocks manual mark-paid, and settles on refresh", async () => {
    const { adminToken, referralId } = await qualifiedReferral({ phone: "08031234567" });
    fetchSpy.mockImplementationOnce(() => Promise.reject(new Error("socket hang up")));

    const res = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(res.body.status).toBe("processing");
    expect(res.body.referral.referrerReward.status).toBe("pending");

    const manual = await request(app)
      .post(`/api/admin/referrals/${referralId}/issue-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer" });
    expect(manual.status).toBe(400);

    const voided = await request(app)
      .post(`/api/admin/referrals/${referralId}/void`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});
    expect(voided.status).toBe(400);

    const retry = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(retry.status).toBe(400);

    fetchSpy.mockImplementationOnce(() => vtpassReply(delivered()));
    const payoutId = res.body.referral.payouts.referrer.id;
    const refreshed = await request(app)
      .post(`/api/admin/referral-payouts/${payoutId}/refresh`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(refreshed.body.status).toBe("delivered");
    expect(refreshed.body.referral.referrerReward.status).toBe("issued");
    expect(fetchSpy.mock.calls[1][0]).toBe("https://sandbox.vtpass.com/api/requery");
  });

  it("records a definite failure, leaves the reward owed, and allows a retry", async () => {
    const { adminToken, referralId } = await qualifiedReferral({ phone: "08031234567" });
    fetchSpy.mockImplementationOnce(() => vtpassReply({ code: "018", response_description: "LOW WALLET BALANCE" }));

    const res = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(res.body.status).toBe("failed");
    expect(res.body.message).toMatch(/wallet balance/i);
    expect(res.body.referral.referrerReward.status).toBe("pending");

    fetchSpy.mockImplementationOnce(() => vtpassReply(delivered()));
    const retry = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(retry.body.status).toBe("delivered");
    expect(await ReferralPayout.count()).toBe(2);
  });

  it("sends data using a plan within the reward and rejects a dearer plan", async () => {
    const { adminToken, referralId } = await qualifiedReferral({ rewardType: "data", phone: "08031234567" });
    fetchSpy.mockImplementation((url: string) =>
      url.includes("service-variations") ? vtpassReply(MTN_PLANS) : vtpassReply(delivered()),
    );

    const plans = await request(app)
      .get("/api/admin/referral-payouts/data-plans?network=mtn&maxNgn=5000")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(plans.body.plans.map((p: { code: string }) => p.code)).toEqual(["mtn-10gb", "mtn-1gb"]);

    const dear = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn", variationCode: "mtn-20gb" });
    expect(dear.status).toBe(400);

    const res = await request(app)
      .post(`/api/admin/referrals/${referralId}/send-reward`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ party: "referrer", network: "mtn", variationCode: "mtn-10gb" });
    expect(res.body.status).toBe("delivered");
    expect(res.body.referral.payouts.referrer).toMatchObject({ kind: "data", amountNgn: 4500, planName: "MTN 10GB - 30 days" });

    const pay = fetchSpy.mock.calls.find(([url]) => String(url).endsWith("/pay"));
    expect(JSON.parse(pay[1].body)).toMatchObject({
      serviceID: "mtn-data",
      billersCode: "08031234567",
      variation_code: "mtn-10gb",
    });
  });

  it("refuses course credit and people with no usable phone", async () => {
    const credit = await qualifiedReferral({ rewardType: "discount", phone: "08031234567" });
    const res = await request(app)
      .post(`/api/admin/referrals/${credit.referralId}/send-reward`)
      .set("Authorization", `Bearer ${credit.adminToken}`)
      .send({ party: "referrer", network: "mtn" });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/course credit/i);

    // The friend never saved a number.
    const friend = await request(app)
      .post(`/api/admin/referrals/${credit.referralId}/send-reward`)
      .set("Authorization", `Bearer ${credit.adminToken}`)
      .send({ party: "referee", network: "mtn" });
    expect(friend.status).toBe(400);
    expect(friend.body.error.message).toMatch(/no phone/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
