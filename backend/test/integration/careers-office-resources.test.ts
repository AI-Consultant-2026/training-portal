import request from "supertest";
import { createApp } from "../../src/app";

// Free resources for university careers offices and student bodies (2026-11-17).
const app = createApp();

describe.each([
  ["ng", "Nigeria"],
  ["za", "South Africa"],
  ["ke", "Kenya"],
  ["gh", "Ghana"],
])("/%s/careers-office-resources", (cc, name) => {
  it("serves the page with its canonical, hreflang and links to the country homepage and jobs board", async () => {
    const res = await request(app).get(`/${cc}/careers-office-resources`);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`<link rel="canonical" href="https://paleontraining.com/${cc}/careers-office-resources">`);
    expect(res.text).toContain('hreflang="en-ZA" href="https://paleontraining.com/za/careers-office-resources"');
    expect(res.text).toContain(`Free Career Resources for Students in ${name}`);
    expect(res.text).toContain(`<a href="/${cc}">https://paleontraining.com/${cc}</a>`);
    expect(res.text).toContain(cc === "ng" ? 'href="/latest-jobs-board"' : `href="/${cc}/latest-jobs-board"`);
    expect(res.text).toContain(`href="/${cc}/universities"`);
    expect(res.text).not.toMatch(/in person|on campus visit/i);
  });

  it("is linked from the country homepage footer", async () => {
    const res = await request(app).get(`/${cc}`);
    expect(res.text).toContain(`href="/${cc}/careers-office-resources"`);
  });
});
