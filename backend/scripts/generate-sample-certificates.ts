// Renders one sample certificate per public course with the real certificate generator,
// for the "Before you enrol" section of the marketing course pages (2026-09-25).
// Usage (from repo root): docker compose run --rm -T backend npx ts-node scripts/generate-sample-certificates.ts
// then convert the PDFs in /tmp/sample-certificates to JPG (see PR notes).
import fs from "fs";
import path from "path";
import { Course, sequelize } from "../src/models";
import { streamCertificatePdf } from "../src/services/certificate.service";

const SLUGS = ["cyber-security-fundamentals", "gis-and-drone-mapping", "digital-marketing", "hse-fundamentals"];

async function main() {
  const outDir = path.join(__dirname, "..", "tmp-sample-certificates");
  fs.mkdirSync(outDir, { recursive: true });
  for (const slug of SLUGS) {
    const course = await Course.findOne({ where: { slug } });
    if (!course) throw new Error(`Course not found: ${slug}`);
    const file = path.join(outDir, `sample-${slug}.pdf`);
    await new Promise<void>((resolve, reject) => {
      const stream = fs.createWriteStream(file);
      stream.on("finish", resolve).on("error", reject);
      streamCertificatePdf(
        {
          enrollmentId: "00000000-sample-certificate",
          studentName: "Your Name Here",
          courseTitle: course.title,
          courseDescription: course.description,
          durationWeeks: course.durationWeeks,
          completionDate: new Date("2026-10-30T12:00:00Z"),
        },
        stream,
      );
    });
    console.log("wrote", file);
  }
  await sequelize.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
