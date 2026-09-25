import { renderMarkdownBlock, renderPreviewPage } from "../../src/services/previewPage.service";

const INDEX = `<!doctype html><html><head><title>Paleon Training</title></head><body><div id="root"></div><script type="module" src="/assets/index.js"></script></body></html>`;

const preview = {
  course: { slug: "gis-and-drone-mapping", title: "GIS and Drone Mapping", dayCount: 9, lessonCount: 18, priceNgn: 200000 },
  module: { title: "GIS Fundamentals & Spatial Concepts", weekNumber: 1 },
  lesson: {
    title: "Raster vs. Vector Data",
    content:
      "Welcome to GIS and Drone Mapping. Over the next nine days you'll learn **real** mapping.\n\n## What Is GIS?\n\nA GIS stores <script>alert(1)</script> location data.\n\n- points\n- lines",
    videoUrl: "https://www.youtube.com/watch?v=abc",
    images: [{ url: "/images/lessons/gis-1.svg", caption: "Raster vs vector", afterParagraph: 0 }],
    resources: {},
    durationMinutes: 25,
  },
};

describe("server-rendered free-lesson page", () => {
  const html = renderPreviewPage(INDEX, "gis-and-drone-mapping", preview as never);

  it("puts the lesson title, description, canonical URL and social tags in the head", () => {
    expect(html).toContain("<title>Free lesson: Raster vs. Vector Data | GIS and Drone Mapping | Paleon Training</title>");
    expect(html).toMatch(/<meta name="description" content="Free lesson from GIS and Drone Mapping: Welcome to GIS/);
    expect(html).toContain('<link rel="canonical" href="https://paleontraining.com/preview/gis-and-drone-mapping" />');
    expect(html).toContain('og:image" content="https://paleontraining.com/images/articles/gis-and-drone-mapping-course.jpg"');
  });

  it("renders the full lesson text, illustration and enrol links inside #root", () => {
    expect(html).toContain('<div id="root"><main');
    expect(html).toContain("<h1>Raster vs. Vector Data</h1>");
    expect(html).toContain("<h2>What Is GIS?</h2>");
    expect(html).toContain("<strong>real</strong>");
    expect(html).toContain("<ul><li>points</li><li>lines</li></ul>");
    expect(html).toContain('<img src="/images/lessons/gis-1.svg" alt="Raster vs vector"');
    expect(html).toContain('href="/register?course=gis-and-drone-mapping"');
    expect(html).toContain("17 more lessons across 9 days");
    expect(html).toContain('<script type="module" src="/assets/index.js"></script>'); // app still boots
  });

  it("adds LearningResource structured data with the course and its price", () => {
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1]);
    expect(ld["@type"]).toBe("LearningResource");
    expect(ld.isAccessibleForFree).toBe(true);
    expect(ld.isPartOf).toMatchObject({ "@type": "Course", name: "GIS and Drone Mapping" });
    expect(ld.isPartOf.offers).toMatchObject({ price: "200000", priceCurrency: "NGN" });
  });

  it("escapes any HTML in lesson text instead of rendering it", () => {
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(renderMarkdownBlock('[x](javascript:alert(1))')).not.toContain("href");
  });
});
