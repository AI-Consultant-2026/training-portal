import { PublicCoursePreview } from "./course.service";

// Server-rendered /preview/<slug> (2026-09-25). The free-lesson page is a React route
// that fetches its content from /api (which robots.txt disallows), so crawlers saw an
// empty shell. This injects the lesson's title, description, canonical URL, structured
// data and full text into the SPA's index.html; React then replaces #root as normal.

const SITE = "https://paleontraining.com";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Inline markdown used in lesson text: **bold**, *italic*, [text](https://...). Runs on
// already-escaped text, so it can only ever emit these few tags.
function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>');
}

// Block-level markdown: ## / ### headings, - / 1. lists, paragraphs.
export function renderMarkdownBlock(block: string): string {
  const lines = block.split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return "";
  const heading = lines[0].match(/^(#{2,3})\s+(.*)$/);
  if (heading && lines.length === 1) {
    const tag = heading[1].length === 2 ? "h2" : "h3";
    return `<${tag}>${inline(heading[2])}</${tag}>`;
  }
  if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
    return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
  }
  if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
    return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
  }
  return `<p>${inline(lines.join(" "))}</p>`;
}

function plainText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*|\*|__/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function description(preview: PublicCoursePreview): string {
  const firstPara = preview.lesson.content.split("\n\n").find((p) => !p.trim().startsWith("#")) ?? "";
  const text = `Free lesson from ${preview.course.title}: ${plainText(firstPara)}`;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, "")}...` : text;
}

export function renderPreviewPage(indexHtml: string, slug: string, preview: PublicCoursePreview): string {
  const { course, module, lesson } = preview;
  const url = `${SITE}/preview/${slug}`;
  const title = `Free lesson: ${lesson.title} | ${course.title} | Paleon Training`;
  const desc = description(preview);

  // Body: the lesson text with its illustrations placed after their paragraphs, the same
  // layout rule as the React LessonContent component.
  const paragraphs = lesson.content.split("\n\n");
  const parts: string[] = [];
  paragraphs.forEach((p, i) => {
    parts.push(renderMarkdownBlock(p));
    for (const img of (lesson.images ?? []).filter((im) => im.afterParagraph === i)) {
      parts.push(
        `<figure><img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.caption)}" loading="lazy"><figcaption>${escapeHtml(img.caption)}</figcaption></figure>`,
      );
    }
  });
  const price = course.priceNgn !== null ? `\u20a6${course.priceNgn.toLocaleString("en-NG")}` : null;
  const body = `<main style="max-width:48rem;margin:0 auto;padding:2.5rem 1.5rem;font-family:system-ui,sans-serif;line-height:1.6">
<p><strong>Free preview.</strong> The first lesson of ${escapeHtml(course.title)}, exactly as enrolled students see it. No account needed.</p>
<p>${escapeHtml(course.title)} &middot; Day ${module.weekNumber}: ${escapeHtml(module.title)}</p>
<h1>${escapeHtml(lesson.title)}</h1>
${parts.join("\n")}
<h2>Want the rest of the course?</h2>
<p>${course.lessonCount - 1} more lessons across ${course.dayCount} days, each with an illustration and a video, plus assignments, quizzes, a capstone project and a certificate of completion. Self-paced, with lifetime access.${price ? ` Course fee: ${price}.` : ""}</p>
<p><a href="/register?course=${encodeURIComponent(slug)}">Enrol in ${escapeHtml(course.title)}</a> &middot; <a href="/${encodeURIComponent(slug)}-course">Course details</a></p>
</main>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: desc,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    learningResourceType: "Lesson",
    educationalLevel: "Beginner",
    timeRequired: `PT${lesson.durationMinutes}M`,
    provider: { "@type": "Organization", name: "Paleon Training", url: SITE },
    isPartOf: {
      "@type": "Course",
      name: course.title,
      url: `${SITE}/${slug}-course`,
      provider: { "@type": "Organization", name: "Paleon Training", url: SITE },
      ...(course.priceNgn !== null
        ? { offers: { "@type": "Offer", price: String(course.priceNgn), priceCurrency: "NGN", category: "Paid" } }
        : {}),
    },
  };
  const head = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(desc)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(desc)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/images/articles/${slug}-course.jpg" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");

  return indexHtml
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}
