// One-off maintenance script: backfills the real Week 5 Lesson 1
// (Hacker vs. Ethical Hacker) content and its illustration onto the
// already-seeded row. Editing the seeder source doesn't retroactively
// change data a seeder already inserted, so this fixes the live row
// directly, mirroring the eight prior backfill-*.js scripts. Run once via
// the Render Shell:
//   node scripts/backfill-week5-lesson1-hacker-vs-ethical-hacker.js
// Safe to re-run: it's a plain UPDATE by title, always setting the same
// values, so re-running is a no-op past the first run.
const { Client } = require("pg");

const CONTENT = 'Welcome to Module 3 — the part of this course a lot of people get most excited about: ethical hacking, penetration testing, the "offensive" side of security. Before we touch a single technique, one thing needs to be completely clear: the word "ethical" in "ethical hacking" isn\'t decoration. It\'s the entire foundation of everything that follows.\n\n## What "Hacker" Actually Means\n\nLet\'s clear up the language first, since these terms get used loosely — including in movies and news headlines.\n\nA **hacker**, in the original sense, is simply someone with deep technical curiosity about how systems work — often by taking them apart or finding unexpected ways to use them. That\'s a neutral trait, even an admirable one, on its own.\n\n## The One Thing That Determines Legal vs. Illegal\n\nWhat actually decides whether hacking is legal or illegal, ethical or malicious, comes down to exactly one thing: **authorization**. Did the person doing the hacking have explicit, documented permission from the system\'s owner to test it?\n\nA **black hat hacker** breaks into systems without authorization, for personal gain, malicious intent, or sometimes just because they can. This is criminal activity in essentially every country, including Nigeria under the Cybercrimes Act.\n\nA **white hat hacker** — also called an ethical hacker or penetration tester — does the exact same technical work, using many of the same tools and techniques, but always with explicit, written authorization from the system owner, and always with the goal of reporting what\'s found so it can be fixed. This is what this course trains you to be.\n\nA **grey hat hacker** sits in an uncomfortable middle ground: testing systems without authorization, but without malicious intent, often reporting vulnerabilities afterward. Here\'s the part beginners often get wrong: **grey hat activity is still illegal in most jurisdictions**, no matter how good the intentions were. Good intentions don\'t substitute for permission.\n\n## Why This Distinction Is the Whole Job\n\nThis isn\'t a legal technicality — it\'s the entire reason this profession is trusted and valued. Organizations pay ethical hackers specifically because they can rely on a clear scope, a signed agreement, and professional, responsible handling of anything discovered. Everything from here forward in this course assumes that authorization exists. Your practical exercise this week runs entirely inside a sandbox environment built for this course — never on a real system without written permission.\n\nCarry a mindset forward with you, not just a set of facts: ethical hacking is fundamentally about empathy for the defender. You\'re finding weaknesses before a real attacker does, so they can be fixed — not to prove how clever you are. Every technique in this module exists to make organizations safer.\n\n## What\'s Next\n\nNext lesson gets structural: the professional frameworks — NIST, OWASP, PTES — that turn "trying to break in" into disciplined, methodical work, plus your first real look at reconnaissance.';

const IMAGES = [
  {
    url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iaGF0c1RpdGxlIj4KICA8dGl0bGUgaWQ9ImhhdHNUaXRsZSI+QmxhY2sgaGF0IGhhY2tlcnMgaGF2ZSBubyBhdXRob3JpemF0aW9uIGFuZCBhcmUgaWxsZWdhbDsgZ3JleSBoYXQgaGFja2VycyBoYXZlIG5vIGF1dGhvcml6YXRpb24gYW5kIGFyZSBzdGlsbCBpbGxlZ2FsIGRlc3BpdGUgZ29vZCBpbnRlbnRpb25zOyB3aGl0ZSBoYXQgaGFja2VycyBoYXZlIGV4cGxpY2l0IGF1dGhvcml6YXRpb24gYW5kIGFyZSBsZWdhbDwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9Ijc2MCIgaGVpZ2h0PSIyNjAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CgogICAgPCEtLSBCbGFjayBIYXQgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCwyNikiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNFNUU3RUIiLz4KICAgICAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjY2IiByeD0iNDIiIHJ5PSIxMCIgZmlsbD0iIzExMTgyNyIvPgogICAgICA8cGF0aCBkPSJNNzIgNjYgdi0yNCBhMjggMjAgMCAwIDEgNTYgMCB2MjQgeiIgZmlsbD0iIzExMTgyNyIvPgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjEwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+QmxhY2sgSGF0PC90ZXh0PgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjNkI3MjgwIj5ObyBhdXRob3JpemF0aW9uPC90ZXh0PgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjNkI3MjgwIj5NYWxpY2lvdXMgaW50ZW50PC90ZXh0PgogICAgICA8cmVjdCB4PSI1NSIgeT0iMTYzIiB3aWR0aD0iOTAiIGhlaWdodD0iMjQiIHJ4PSIxMiIgZmlsbD0iI0ZERUNFQSIvPgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjE3OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0MxNDQyRCI+SUxMRUdBTDwvdGV4dD4KICAgIDwvZz4KCiAgICA8IS0tIEdyZXkgSGF0IC0tPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwLDI2KSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0U1RTdFQiIvPgogICAgICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iNjYiIHJ4PSI0MiIgcnk9IjEwIiBmaWxsPSIjOUNBM0FGIi8+CiAgICAgIDxwYXRoIGQ9Ik03MiA2NiB2LTI0IGEyOCAyMCAwIDAgMSA1NiAwIHYyNCB6IiBmaWxsPSIjOUNBM0FGIi8+CiAgICAgIDx0ZXh0IHg9IjEwMCIgeT0iMTA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5HcmV5IEhhdDwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzZCNzI4MCI+Tm8gYXV0aG9yaXphdGlvbjwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzZCNzI4MCI+R29vZCBpbnRlbnRpb25zPC90ZXh0PgogICAgICA8cmVjdCB4PSI0MCIgeT0iMTYzIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNGREVDRUEiLz4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNDMTQ0MkQiPlNUSUxMIElMTEVHQUw8L3RleHQ+CiAgICA8L2c+CgogICAgPCEtLSBXaGl0ZSBIYXQgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MTAsMjYpIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuNiIvPgogICAgICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iNjYiIHJ4PSI0MiIgcnk9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgICA8cGF0aCBkPSJNNzIgNjYgdi0yNCBhMjggMjAgMCAwIDEgNTYgMCB2MjQgeiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPldoaXRlIEhhdDwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+RXhwbGljaXQgYXV0aG9yaXphdGlvbjwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+UmVwb3J0cyBmaW5kaW5nczwvdGV4dD4KICAgICAgPHJlY3QgeD0iNjAiIHk9IjE2MyIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNEQ0ZDRTciLz4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxNTgwM0QiPkxFR0FMPC90ZXh0PgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
    caption: "Black hat and grey hat both lack authorization and are both illegal, despite the difference in intent. Only white hat has explicit authorization — and is legal.",
    afterParagraph: 8,
  },
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false },
  });
  await client.connect();

  const res = await client.query(
    `UPDATE lessons
     SET content = $1, images = $2::jsonb
     WHERE title = 'Hacker vs. Ethical Hacker'
     RETURNING id, title, jsonb_array_length(images) AS image_count`,
    [CONTENT, JSON.stringify(IMAGES)],
  );

  if (res.rowCount !== 1) {
    console.log(`WARNING: expected exactly 1 row, matched ${res.rowCount}`);
  }
  console.log(res.rows);

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
