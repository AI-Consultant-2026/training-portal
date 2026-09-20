import bcrypt from "bcryptjs";
import JSZip from "jszip";
import PDFDocument from "pdfkit";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Assignment,
  AssignmentSubmission,
  Capstone,
  CapstoneSubmission,
  Course,
  CourseModule,
  Enrollment,
  User,
} from "../../src/models";
import { AI_SAMPLES, HUMAN_SAMPLES } from "../fixtures/originalitySamples";

const app = createApp();
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

async function setup(email: string) {
  const instructor = await User.create({
    email: `inst-${email}`,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Jest",
    lastName: "Instructor",
    role: "instructor",
  });
  const course = await Course.create({
    title: "Originality Course",
    slug: `originality-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId: instructor.id,
  });
  const mod = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
  const assignment = await Assignment.create({ moduleId: mod.id, title: "Week 1", pointsTotal: 100 });
  const capstone = await Capstone.create({ courseId: course.id, title: "Capstone", pointsTotal: 100 });
  await request(app)
    .post("/api/auth/register")
    .send({ email, password: "Password123!", firstName: "Jest", lastName: "Student" });
  const student = (await User.findOne({ where: { email } })) as User;
  await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
  const login = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return { assignment, capstone, student, token: login.body.accessToken as string };
}

async function docxWith(text: string): Promise<Buffer> {
  const zip = new JSZip();
  const paragraphs = text
    .split("\n")
    .map((p) => `<w:p><w:r><w:t xml:space="preserve">${p.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</w:t></w:r></w:p>`)
    .join("");
  zip.file("word/document.xml", `<?xml version="1.0"?><w:document><w:body>${paragraphs}</w:body></w:document>`);
  return zip.generateAsync({ type: "nodebuffer" });
}

function pdfWith(text: string): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.fontSize(11).text(text);
    doc.end();
  });
}

describe("AI-generated answer check on submissions", () => {
  it("blocks an AI-generated typed assignment answer with the 422 the dialog reads, and stores nothing", async () => {
    const { assignment, student, token } = await setup("orig1@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", AI_SAMPLES.phishingChatbot);
    expect(res.status).toBe(422);
    expect(res.body.error.message).toBe("AI-Generated Answer Detected — Submission Not Accepted");
    expect(res.body.error.details.code).toBe("AI_GENERATED_CONTENT");
    expect(res.body.error.details.instruction).toMatch(/rewrite it in your own words/i);
    expect(await AssignmentSubmission.count({ where: { assignmentId: assignment.id, studentId: student.id } })).toBe(0);
  });

  it("accepts a genuine human-written assignment answer", async () => {
    const { assignment, token } = await setup("orig2@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", HUMAN_SAMPLES.casualNigerian);
    expect(res.status).toBe(201);
  });

  it("blocks an AI-generated text file attachment even when the typed answer is clean", async () => {
    const { assignment, token } = await setup("orig3@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "See attached.")
      .attach("file", Buffer.from(AI_SAMPLES.polishedEssay), { filename: "answer.txt", contentType: "text/plain" });
    expect(res.status).toBe(422);
    expect(res.body.error.details.source).toBe("file");
  });

  it("reads text out of a .docx attachment and blocks it when AI-generated", async () => {
    const { assignment, token } = await setup("orig4@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", await docxWith(AI_SAMPLES.polishedEssay), { filename: "answer.docx", contentType: DOCX });
    expect(res.status).toBe(422);
    expect(res.body.error.details.source).toBe("file");
  });

  it("accepts a genuine human-written .docx attachment", async () => {
    const { assignment, token } = await setup("orig5@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", await docxWith(HUMAN_SAMPLES.carefulFormal), { filename: "answer.docx", contentType: DOCX });
    expect(res.status).toBe(201);
  });

  it("reads text out of a PDF attachment: blocks a generated one, accepts a human one", async () => {
    const { assignment, token } = await setup("orig8@example.com");
    const blocked = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", await pdfWith(AI_SAMPLES.polishedEssay), { filename: "answer.pdf", contentType: "application/pdf" });
    expect(blocked.status).toBe(422);
    expect(blocked.body.error.details.source).toBe("file");

    const ok = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", await pdfWith(HUMAN_SAMPLES.nonNativeEnglish), { filename: "answer.pdf", contentType: "application/pdf" });
    expect(ok.status).toBe(201);
  });

  it("never blocks on a file it cannot read (e.g. a corrupt or image upload)", async () => {
    const { assignment, token } = await setup("orig6@example.com");
    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("not really a zip"), { filename: "answer.docx", contentType: DOCX });
    expect(res.status).toBe(201);
  });

  it("applies the same check to capstone submissions", async () => {
    const { capstone, student, token } = await setup("orig7@example.com");
    const blocked = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", AI_SAMPLES.polishedEssay);
    expect(blocked.status).toBe(422);
    expect(blocked.body.error.details.code).toBe("AI_GENERATED_CONTENT");
    expect(await CapstoneSubmission.count({ where: { capstoneId: capstone.id, studentId: student.id } })).toBe(0);

    const ok = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", HUMAN_SAMPLES.reflective);
    expect(ok.status).toBe(201);
  });
});
