// One-off maintenance script: backfills the real Week 2 Lesson 1
// (The CIA Triad, revisited) content and its illustration onto the
// already-seeded row. Editing the seeder source doesn't retroactively
// change data a seeder already inserted, so this fixes the live row
// directly, mirroring backfill-lesson1/2-*.js. Run once via the Render Shell:
//   node scripts/backfill-week2-lesson1-cia-triad-revisited.js
// Safe to re-run: it's a plain UPDATE by title + week_number, always setting
// the same values, so re-running is a no-op past the first run.
const { Client } = require("pg");

const CONTENT = 'Welcome back to the CIA Triad — yes, again. Last week you met **Confidentiality**, **Integrity**, and **Availability** for the first time. This week isn\'t about relearning the definitions. It\'s about the harder skill: recognizing which one is actually in play in a given situation, and understanding why the three of them are usually pulling *against* each other, not working together for free.\n\n## A Quick Refresher, Not a Restart\n\nConfidentiality: only the right people see it. Integrity: the information hasn\'t been tampered with. Availability: it\'s there when legitimate users need it. If those three already feel familiar, good — that\'s the point. Everything below builds on them; nothing repeats them from scratch.\n\n## The Real Skill: Spotting the Tension\n\nHere\'s what most beginners get wrong: they think good security means maximizing all three at once. It doesn\'t, and it can\'t. The three goals actively compete with each other, and every real security decision is really a decision about which one wins in a given moment.\n\nTake encryption. Encrypting a hospital\'s database protects confidentiality beautifully — nobody without the key can read it. But now imagine that key is lost, or the decryption process is too slow during an emergency. You\'ve just weakened availability in the name of protecting confidentiality. Neither choice is "wrong." It\'s a trade-off, and the right answer depends entirely on context — an emergency room needs different defaults than a bank vault.\n\n## Applying This as a Decision Lens\n\nFrom here on, whenever you look at any security control — a password policy, a backup schedule, a firewall rule — ask two questions: **which of the three goals is this control mainly protecting?** And **what is it costing on the other two?** That single habit is closer to what a working security professional actually does all day than any list of tools or acronyms.\n\n## Why This Matters for What\'s Coming\n\nEvery module ahead of you — network security, ethical hacking, incident response, cloud security — is really just this same balancing act, applied to a different layer of the system. You now have the lens. The rest of the course is practice using it.\n\n## This Week\'s Practical\n\nFor this week\'s practical exercise, you\'ll document the security controls present in a sample IT environment, and for each one, name which side of the CIA Triad it\'s mainly protecting — and what it costs elsewhere. That\'s the exact skill this lesson just walked you through.';

const IMAGES = [
  {
    url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDM0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iYmFsYW5jZVRpdGxlIj4KICA8dGl0bGUgaWQ9ImJhbGFuY2VUaXRsZSI+Q29uZmlkZW50aWFsaXR5IGFuZCBBdmFpbGFiaWxpdHkgdHJhZGUgb2ZmIGFnYWluc3QgZWFjaCBvdGhlciBvbiBhIGJhbGFuY2Ugc2NhbGUsIHdpdGggSW50ZWdyaXR5IGFzIHRoZSBzdGFibGUgZnVsY3J1bSB1bmRlcm5lYXRoIGJvdGg8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3NjAiIGhlaWdodD0iMzQwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBmdWxjcnVtIGJhc2UgLS0+CiAgICA8cG9seWdvbiBwb2ludHM9IjM4MCwyNTAgMzQwLDI5NSA0MjAsMjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICA8bGluZSB4MT0iMzgwIiB5MT0iMjUwIiB4Mj0iMzgwIiB5Mj0iMTMwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMi40Ii8+CiAgICA8dGV4dCB4PSIzODAiIHk9IjMzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+SU5URUdSSVRZPC90ZXh0PgoKICAgIDwhLS0gYmVhbSwgdGlsdGVkIHRvIHNob3cgdHJhZGUtb2ZmIC0tPgogICAgPGxpbmUgeDE9IjE2MCIgeTE9IjEwOCIgeDI9IjYwMCIgeTI9IjE1MiIgc3Ryb2tlPSIjMTExODI3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPGNpcmNsZSBjeD0iMzgwIiBjeT0iMTMwIiByPSI3IiBmaWxsPSIjMTExODI3Ii8+CgogICAgPCEtLSBsZWZ0IHBhbjogQ29uZmlkZW50aWFsaXR5IChsb3dlciA9IHdlaWdodGVkIGRvd24pIC0tPgogICAgPGxpbmUgeDE9IjE2MCIgeTE9IjEwOCIgeDI9IjE2MCIgeTI9IjE2OCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNiIvPgogICAgPGxpbmUgeDE9IjEyMCIgeTE9IjEwOCIgeDI9IjIwMCIgeTI9IjEwOCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNiIvPgogICAgPGxpbmUgeDE9IjEyMCIgeTE9IjEwOCIgeDI9IjE2MCIgeTI9IjE2OCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNiIvPgogICAgPGxpbmUgeDE9IjIwMCIgeTE9IjEwOCIgeDI9IjE2MCIgeTI9IjE2OCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNiIvPgogICAgPGVsbGlwc2UgY3g9IjE2MCIgY3k9IjE2OCIgcng9IjQ2IiByeT0iMTAiIGZpbGw9IiNFRkY2RkYiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxNTAiIHI9IjIwIiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8cGF0aCBkPSJNMTUwIDE0OCB2LTYgYTEwIDEwIDAgMCAxIDIwIDAgdjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KICAgIDxyZWN0IHg9IjE0OSIgeT0iMTQ4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTUiIHJ4PSIyLjUiIGZpbGw9IiNmZmYiLz4KICAgIDx0ZXh0IHg9IjE2MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Db25maWRlbnRpYWxpdHk8L3RleHQ+CgogICAgPCEtLSByaWdodCBwYW46IEF2YWlsYWJpbGl0eSAoaGlnaGVyID0gdHJhZGluZyBhd2F5KSAtLT4KICAgIDxsaW5lIHgxPSI2MDAiIHkxPSIxNTIiIHgyPSI2MDAiIHkyPSIyMDAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICAgIDxsaW5lIHgxPSI1NjIiIHkxPSIxNTIiIHgyPSI2MzgiIHkyPSIxNTIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICAgIDxsaW5lIHgxPSI1NjIiIHkxPSIxNTIiIHgyPSI2MDAiIHkyPSIyMDAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICAgIDxsaW5lIHgxPSI2MzgiIHkxPSIxNTIiIHgyPSI2MDAiIHkyPSIyMDAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICAgIDxlbGxpcHNlIGN4PSI2MDAiIGN5PSIyMDAiIHJ4PSI0MiIgcnk9IjkiIGZpbGw9IiNFRkY2RkYiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIxODQiIHI9IjE4IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8cGF0aCBkPSJNNjAwIDE3MiBhMTIgMTIgMCAxIDEgLTguNSAzLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTTYwMCAxNjkgbDAgNyBsNS41IDIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgPHRleHQgeD0iNjAwIiB5PSIyMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkF2YWlsYWJpbGl0eTwvdGV4dD4KCiAgICA8dGV4dCB4PSIzODAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIj5UaWdodGVuIG9uZSwgYW5kIHRoZSBvdGhlciB0aXBzIGF3YXk8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
    caption:
      "Confidentiality and Availability trade off against each other on a balance scale, with Integrity as the stable fulcrum underneath both.",
    afterParagraph: 5,
  },
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false },
  });
  await client.connect();

  // Disambiguates the two lessons titled "The CIA Triad" (Week 1 and Week 2)
  // by module.week_number, since title alone is not unique.
  const res = await client.query(
    `UPDATE lessons l
     SET content = $1, images = $2::jsonb
     FROM modules m
     WHERE l.module_id = m.id
       AND l.title = 'The CIA Triad'
       AND m.week_number = 2
     RETURNING l.id, l.title, jsonb_array_length(l.images) AS image_count`,
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
