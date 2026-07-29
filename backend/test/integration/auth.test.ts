import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

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
});
