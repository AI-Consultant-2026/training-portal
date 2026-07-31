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

    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0]).toMatchObject({
      to: validRegistration.email,
      subject: expect.stringContaining("Welcome"),
    });
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
});
