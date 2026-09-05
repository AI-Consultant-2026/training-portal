import request from "supertest";
import { createApp } from "../../src/app";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const validRegistration = {
  email: "jest-student@example.com",
  password: "Password123!",
  firstName: "Jest",
  lastName: "Student",
};

describe("Auth flow", () => {
  it("registers a new user and returns an access token", async () => {
    const res = await request(app).post("/api/auth/register").send(validRegistration);

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(validRegistration.email);
    expect(res.body.accessToken).toEqual(expect.any(String));
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^rt=/);

    // Registration sends two emails: the welcome message and a separate email-
    // verification link (see the "email verification" describe block below).
    expect(memAdapter.sentMessages).toHaveLength(2);
    expect(memAdapter.sentMessages).toContainEqual(
      expect.objectContaining({ to: validRegistration.email, subject: expect.stringContaining("Welcome") }),
    );
    expect(memAdapter.sentMessages).toContainEqual(
      expect.objectContaining({ to: validRegistration.email, subject: expect.stringContaining("Verify") }),
    );
  });

  it("rejects registration with a weak password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validRegistration, password: "short" });

    expect(res.status).toBe(400);
  });

  it("rejects duplicate email registration", async () => {
    await request(app).post("/api/auth/register").send(validRegistration);
    const res = await request(app).post("/api/auth/register").send(validRegistration);

    expect(res.status).toBe(409);
  });

  it("accepts and persists a status from the allow-list", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validRegistration, email: "jest-status-student@example.com", university: "Graduate" });

    expect(res.status).toBe(201);
    expect(res.body.user.university).toBe("Graduate");
  });

  it("rejects a status that isn't on the allow-list", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...validRegistration,
        email: "jest-badstatus-student@example.com",
        university: "Not A Real Status",
      });

    expect(res.status).toBe(400);
  });

  it("logs in and can access a protected route with the access token", async () => {
    await request(app).post("/api/auth/register").send(validRegistration);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: validRegistration.email, password: validRegistration.password });

    expect(loginRes.status).toBe(200);
    const accessToken = loginRes.body.accessToken;

    const meRes = await request(app).get("/api/users/me").set("Authorization", `Bearer ${accessToken}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.user.email).toBe(validRegistration.email);
  });

  it("rejects login with the wrong password", async () => {
    await request(app).post("/api/auth/register").send(validRegistration);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validRegistration.email, password: "WrongPassword1!" });

    expect(res.status).toBe(401);
  });

  it("rejects protected routes without a token", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.status).toBe(401);
  });

  it("rotates the refresh token and rejects a refresh after logout", async () => {
    const agent = request.agent(app);
    await agent.post("/api/auth/register").send(validRegistration);

    const refreshRes = await agent.post("/api/auth/refresh");
    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.accessToken).toEqual(expect.any(String));

    const logoutRes = await agent.post("/api/auth/logout");
    expect(logoutRes.status).toBe(204);

    const secondRefreshRes = await agent.post("/api/auth/refresh");
    expect(secondRefreshRes.status).toBe(401);
  });

  it("sends a password reset email with a working reset link, and lets the user log in with the new password", async () => {
    await request(app).post("/api/auth/register").send(validRegistration);
    memAdapter.clear();

    const requestRes = await request(app)
      .post("/api/auth/password-reset")
      .send({ email: validRegistration.email });
    expect(requestRes.status).toBe(202);

    expect(memAdapter.sentMessages).toHaveLength(1);
    const resetMessage = memAdapter.sentMessages[0];
    expect(resetMessage.to).toBe(validRegistration.email);
    const match = resetMessage.text.match(/\/reset-password\?token=(\S+)/);
    expect(match).not.toBeNull();
    const token = match![1];

    const confirmRes = await request(app)
      .post("/api/auth/password-reset/confirm")
      .send({ token, password: "NewPassword456!" });
    expect(confirmRes.status).toBe(200);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: validRegistration.email, password: "NewPassword456!" });
    expect(loginRes.status).toBe(200);
  });

  it("does not send an email or reveal whether the address exists for an unknown email", async () => {
    const res = await request(app)
      .post("/api/auth/password-reset")
      .send({ email: "no-such-user@example.com" });

    expect(res.status).toBe(202);
    expect(memAdapter.sentMessages).toHaveLength(0);
  });

  describe("email verification", () => {
    it("verifies a new account via the link sent on registration, idempotently", async () => {
      await request(app).post("/api/auth/register").send(validRegistration);

      const verifyMessage = memAdapter.sentMessages.find((m) => m.subject.includes("Verify"));
      expect(verifyMessage).toBeDefined();
      const match = verifyMessage!.text.match(/\/verify-email\?token=(\S+)/);
      expect(match).not.toBeNull();
      const token = match![1];

      const firstVerify = await request(app).post("/api/auth/verify-email").send({ token });
      expect(firstVerify.status).toBe(200);

      // Clicking the same link twice (double-click, stale tab) should stay a success,
      // not error just because the account is already verified.
      const secondVerify = await request(app).post("/api/auth/verify-email").send({ token });
      expect(secondVerify.status).toBe(200);
    });

    it("rejects an invalid or malformed verification token", async () => {
      const res = await request(app).post("/api/auth/verify-email").send({ token: "not-a-real-token" });
      expect(res.status).toBe(400);
    });

    it("rejects a password-reset token reused as a verification token", async () => {
      await request(app).post("/api/auth/register").send(validRegistration);
      memAdapter.clear();

      await request(app).post("/api/auth/password-reset").send({ email: validRegistration.email });
      const resetMessage = memAdapter.sentMessages[0];
      const match = resetMessage.text.match(/\/reset-password\?token=(\S+)/);
      const resetToken = match![1];

      const res = await request(app).post("/api/auth/verify-email").send({ token: resetToken });
      expect(res.status).toBe(400);
    });

    it("resends a verification link for an unverified user, and no-ops for an already-verified one", async () => {
      const registerRes = await request(app).post("/api/auth/register").send(validRegistration);
      const accessToken = registerRes.body.accessToken;
      memAdapter.clear();

      const resendRes = await request(app)
        .post("/api/auth/resend-verification")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(resendRes.status).toBe(202);
      expect(memAdapter.sentMessages).toHaveLength(1);
      expect(memAdapter.sentMessages[0].subject).toContain("Verify");

      const verifyMessage = memAdapter.sentMessages[0];
      const token = verifyMessage.text.match(/\/verify-email\?token=(\S+)/)![1];
      await request(app).post("/api/auth/verify-email").send({ token });
      memAdapter.clear();

      const secondResendRes = await request(app)
        .post("/api/auth/resend-verification")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(secondResendRes.status).toBe(202);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("requires authentication to resend a verification link", async () => {
      const res = await request(app).post("/api/auth/resend-verification");
      expect(res.status).toBe(401);
    });
  });
});
