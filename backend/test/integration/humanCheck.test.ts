import request from "supertest";
import { createApp } from "../../src/app";
import { createHumanCheck, parseHumanAnswer, verifyHumanCheck } from "../../src/utils/humanCheck";

const app = createApp();
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function solve(question: string): number {
  const m = /^What is (\w+) \+ (\d+)\?$/.exec(question);
  if (!m) throw new Error(`unexpected question: ${question}`);
  const a = /^\d+$/.test(m[1]) ? Number(m[1]) : WORDS.indexOf(m[1]);
  return a + Number(m[2]);
}

const enquiry = {
  name: "Ngozi Okafor",
  jobTitle: "HR Manager",
  organisation: "Example Energy Services Ltd",
  country: "NG",
  email: "ngozi.hc@example.com",
  employees: "250–999",
  department: "HR / Learning & Development",
  requirement: "Department training",
  delivery: "In-house",
  intent: "proposal",
  consent: true,
  page: "/ng/corporate-training/ai-workflow-productivity",
};

describe("human check on public forms", () => {
  beforeAll(() => { process.env.HUMAN_CHECK_IN_TESTS = "1"; });
  afterAll(() => { delete process.env.HUMAN_CHECK_IN_TESTS; });

  it("signs a question whose answer is never sent to the browser", () => {
    const { question, token } = createHumanCheck();
    const answer = solve(question);
    expect(token).not.toContain(String(answer) + "|");
    expect(verifyHumanCheck(token, String(answer + 1))).toBe(false);
    expect(verifyHumanCheck(token, ` ${answer} `)).toBe(true);
    expect(verifyHumanCheck(token, String(answer))).toBe(false); // single use
  });

  it("accepts number words and rejects expired or tampered tokens", () => {
    expect(parseHumanAnswer("eleven")).toBe(11);
    expect(parseHumanAnswer("abc")).toBeNull();
    const past = createHumanCheck(Date.now() - 31 * 60 * 1000);
    expect(verifyHumanCheck(past.token, solve(past.question))).toBe(false);
    const fresh = createHumanCheck();
    const tampered = fresh.token.replace(/^\d+/, String(Date.now() + 99_999_999));
    expect(verifyHumanCheck(tampered, solve(fresh.question))).toBe(false);
  });

  it("GET /api/human-check returns an uncached question", async () => {
    const res = await request(app).get("/api/human-check");
    expect(res.status).toBe(200);
    expect(res.headers["cache-control"]).toContain("no-store");
    expect(res.body.question).toMatch(/^What is \w+ \+ \d\?$/);
    expect(res.body.token.split(".")).toHaveLength(3);
  });

  it("serves /human-check.js", async () => {
    const res = await request(app).get("/human-check.js");
    expect(res.status).toBe(200);
    expect(res.text).toContain("PaleonHumanCheck");
  });

  it("blocks a public form post without a correct answer, then accepts a correct one once", async () => {
    const none = await request(app).post("/api/leads/corporate").send(enquiry);
    expect(none.status).toBe(428);
    expect(none.body.error.code).toBe("HUMAN_CHECK");

    const q1 = (await request(app).get("/api/human-check")).body;
    const wrong = await request(app).post("/api/leads/corporate").send({ ...enquiry, humanToken: q1.token, humanAnswer: "99" });
    expect(wrong.status).toBe(428);

    const q2 = (await request(app).get("/api/human-check")).body;
    const ok = await request(app).post("/api/leads/corporate").send({ ...enquiry, humanToken: q2.token, humanAnswer: String(solve(q2.question)) });
    expect(ok.status).toBeLessThan(300);

    const replay = await request(app).post("/api/leads/corporate").send({ ...enquiry, humanToken: q2.token, humanAnswer: String(solve(q2.question)) });
    expect(replay.status).toBe(428);
  });

  it.each([
    ["/api/auth/register"],
    ["/api/auth/password-reset"],
    ["/api/leads"],
    ["/api/leads/corporate-preview"],
    ["/api/leads/readiness"],
    ["/api/waitlist"],
    ["/api/zoom-attendees"],
    ["/api/corporate/orders"],
    ["/api/corporate/university-orders"],
    ["/api/corporate/join/ABC123"],
  ])("%s requires the human check", async (path) => {
    const res = await request(app).post(path).send({});
    expect(res.status).toBe(428);
  });
});
