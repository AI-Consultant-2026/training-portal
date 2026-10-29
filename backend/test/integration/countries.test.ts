import request from "supertest";
import { createApp } from "../../src/app";
import { Lead, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const registration = {
  password: "Password123!",
  firstName: "Kofi",
  lastName: "Mensah",
};

describe("Countries (Ghana, Kenya, South Africa)", () => {
  it("lists the four countries and guesses the visitor's from Cloudflare's header", async () => {
    const res = await request(app).get("/api/countries").set("CF-IPCountry", "gh");
    expect(res.status).toBe(200);
    expect(res.body.detected).toBe("GH");
    expect(res.body.countries.map((c: { code: string }) => c.code)).toEqual(["NG", "GH", "KE", "ZA"]);
    expect(res.body.countries[1].regions).toContain("Greater Accra");

    const elsewhere = await request(app).get("/api/countries").set("CF-IPCountry", "US");
    expect(elsewhere.body.detected).toBeNull();
    const noHeader = await request(app).get("/api/countries");
    expect(noHeader.body.detected).toBeNull();
  });

  it("registers a Ghanaian student with a Ghanaian phone and no mobile network", async () => {
    const res = await request(app).post("/api/auth/register").send({
      ...registration,
      email: "jest-ghana-student@example.com",
      country: "GH",
      location: "Greater Accra",
      phone: "+233 24 123 4567",
    });

    expect(res.status).toBe(201);
    expect(res.body.user.country).toBe("GH");
    const user = await User.findOne({ where: { email: "jest-ghana-student@example.com" } });
    expect(user?.location).toBe("Greater Accra");
    // Not a payout number: airtime/data rewards are Nigerian only.
    expect(user?.profileData).toEqual({ phone: "+233 24 123 4567" });
  });

  it("rejects a location from another country", async () => {
    const res = await request(app).post("/api/auth/register").send({
      ...registration,
      email: "jest-wrong-region@example.com",
      country: "KE",
      location: "Lagos",
    });
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toContain("Choose a location in your country");
  });

  it("still defaults to Nigeria when no country is sent", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...registration, email: "jest-default-country@example.com", location: "Delta" });
    expect(res.status).toBe(201);
    expect(res.body.user.country).toBe("NG");
  });

  it("saves a lead's country and names it in the notification email", async () => {
    const res = await request(app)
      .post("/api/leads")
      .send({ name: "Ama Owusu", email: "ama@example.com", course: "Digital Marketing", country: "GH" });
    expect(res.status).toBe(201);
    const lead = await Lead.findByPk(res.body.id);
    expect(lead?.country).toBe("GH");
    expect(memAdapter.sentMessages[0].text).toContain("Country: Ghana");

    const nigerian = await request(app)
      .post("/api/leads")
      .send({ name: "Amara Chukwu", email: "amara@example.com", course: "Digital Marketing" });
    expect((await Lead.findByPk(nigerian.body.id))?.country).toBe("NG");
  });

  it.each([
    ["/ghana", "GH", "Ghanaian"],
    ["/kenya", "KE", "Kenyan"],
    ["/south-africa", "ZA", "South African"],
  ])("serves the %s landing page", async (path, code, people) => {
    const page = await request(app).get(path);
    expect(page.status).toBe(200);
    expect(page.text).toContain(`Digital skills for ${people} graduates`);
    expect(page.text).toContain(`href="/register?country=${code}"`);
    expect(page.text).toContain(`data-country="${code}"`);
    expect(page.text).not.toMatch(/<script>(?!\s*$)/); // CSP: no inline scripts
  });

  it("serves the shared country-page script", async () => {
    const script = await request(app).get("/country-page.js");
    expect(script.status).toBe(200);
    expect(script.text).toContain('getAttribute("data-country")');
  });
});
