// One-off maintenance script: backfills the real Week 8 Lesson 2
// (Business Continuity and Disaster Recovery) content and its two
// illustrations onto the already-seeded row. Editing the seeder source
// doesn't retroactively change data a seeder already inserted, so this
// fixes the live row directly, mirroring the fifteen prior
// backfill-*.js scripts. Run once via the Render Shell:
//   node scripts/backfill-week8-lesson2-business-continuity-disaster-recovery.js
// Safe to re-run: it's a plain UPDATE by title, always setting the same
// values, so re-running is a no-op past the first run.
const { Client } = require("pg");

const CONTENT = 'Last lesson covered what organizations are legally required to do. This lesson covers something just as important, but far more practical: what actually happens on the day something goes wrong — a fire, a flood, a ransomware attack, a data center outage — and how an organization keeps functioning through it.\n\n## Business Continuity vs. Disaster Recovery\n\nThese two terms are closely related and often used together, but they describe different scopes.\n\n**Business Continuity Planning (BCP)** is the broad discipline of ensuring an organization can continue operating, perhaps in a reduced or modified way, during and after a disruptive event — everything from where staff work if a building is unusable, to how customers get served if the usual systems are down.\n\n**Disaster Recovery (DR)** is narrower, focused specifically on restoring IT systems and data after a disaster. DR is essentially the technical subset of the broader BCP effort — the part concerned with getting servers, applications, and data back online.\n\n## Business Impact Analysis\n\nBefore any recovery plan can be built, an organization needs to know what it\'s actually protecting, and in what order. That\'s the job of a **Business Impact Analysis (BIA)**: it identifies which business functions are most critical, and how quickly each one needs to be restored if it goes down. Payroll processing and the company\'s internal wiki are not equally urgent, and a BIA is what makes that priority explicit instead of assumed.\n\n## RTO and RPO\n\nTwo numbers come out of a BIA that drive nearly every practical decision afterward.\n\n**Recovery Time Objective (RTO)** is the maximum acceptable time a system or function can be down before serious business harm occurs. If an e-commerce checkout system has an RTO of two hours, the recovery plan has to be able to restore it within that window, full stop.\n\n**Recovery Point Objective (RPO)** is the maximum acceptable amount of data loss, typically measured in time — "we can afford to lose at most 15 minutes of data." RPO directly drives how frequently backups need to be taken. An RPO of 15 minutes requires backups (or continuous replication) far more frequent than an RPO of 24 hours.\n\nTogether, RTO and RPO turn a vague goal like "recover quickly" into two concrete numbers that engineering teams can actually design a system around.\n\n## A Plan Is Only as Good as Its Last Test\n\nA beautifully written business continuity plan that has never been tested is not a reliable plan — it\'s a guess. What separates a plan that actually works from one that only looks good on paper is regular testing, commonly through **tabletop exercises**: structured walkthroughs where a team talks through a simulated disaster step by step, out loud, before a real one ever happens. These exercises reliably surface gaps — a backup that was never actually verified, a contact list with outdated phone numbers, a step nobody remembers being assigned to — while there\'s still time to fix them calmly, instead of during an actual crisis.\n\n## What\'s Next\n\nThis week\'s assignment asks you to build a business continuity plan outline of your own, complete with a Business Impact Analysis and clearly defined RTO and RPO values — the same building blocks covered here. Next week moves from planning for disruption to responding to it directly, with the incident response lifecycle: the structured process organizations follow the moment they realize something has actually gone wrong.';

const IMAGES = [
  {
    url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjAwIDM0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iYmNwZHJUaXRsZSI+CiAgPHRpdGxlIGlkPSJiY3BkclRpdGxlIj5EaXNhc3RlciBSZWNvdmVyeSBpcyB0aGUgdGVjaG5pY2FsIHN1YnNldCBvZiB0aGUgYnJvYWRlciBCdXNpbmVzcyBDb250aW51aXR5IFBsYW5uaW5nIGVmZm9ydCwgZm9jdXNlZCBzcGVjaWZpY2FsbHkgb24gcmVzdG9yaW5nIElUIHN5c3RlbXMgYW5kIGRhdGE8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMzQwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iMzAwIiB5PSIyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+QnVzaW5lc3MgQ29udGludWl0eSBQbGFubmluZzwvdGV4dD4KICAgIDx0ZXh0IHg9IjMwMCIgeT0iNDMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMyNTYzRUIiPktlZXAgdGhlIHdob2xlIG9yZ2FuaXphdGlvbiBvcGVyYXRpbmc8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTcwIiByPSI5MCIgZmlsbD0iI0VGRjZGRiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KCiAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIxNzAiIHI9IjUwIiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzMDAiIHk9IjE2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+RGlzYXN0ZXI8L3RleHQ+CiAgICA8dGV4dCB4PSIzMDAiIHk9IjE4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+UmVjb3Zlcnk8L3RleHQ+CgogICAgPHRleHQgeD0iMzAwIiB5PSIyODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5SZXN0b3JlcyBJVCBzeXN0ZW1zICZhbXA7IGRhdGE8L3RleHQ+CgogICAgPHRleHQgeD0iMTIwIiB5PSIzMDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5TdGFmZiwgZmFjaWxpdGllcyw8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjAiIHk9IjMyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPmN1c3RvbWVyIHNlcnZpY2U8L3RleHQ+CgogICAgPHRleHQgeD0iNDgwIiB5PSIzMDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5Db21tdW5pY2F0aW9ucyw8L3RleHQ+CiAgICA8dGV4dCB4PSI0ODAiIHk9IjMyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPnN1cHBseSBjaGFpbjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
    caption: "Disaster Recovery is the technical subset of the broader Business Continuity Planning effort, focused specifically on restoring IT systems and data.",
    afterParagraph: 4,
  },
  {
    url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0icnRvcnBvVGl0bGUiPgogIDx0aXRsZSBpZD0icnRvcnBvVGl0bGUiPlJlY292ZXJ5IFBvaW50IE9iamVjdGl2ZSBtZWFzdXJlcyB0aGUgYWNjZXB0YWJsZSBkYXRhIGxvc3Mgd2luZG93IGJlZm9yZSBhIGRpc2FzdGVyLCBhbmQgUmVjb3ZlcnkgVGltZSBPYmplY3RpdmUgbWVhc3VyZXMgdGhlIGFjY2VwdGFibGUgZG93bnRpbWUgd2luZG93IGFmdGVyIGl0LCB1bnRpbCB0aGUgc3lzdGVtIGlzIHJlc3RvcmVkPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDxsaW5lIHgxPSI2MCIgeTE9IjExMCIgeDI9IjY0MCIgeTI9IjExMCIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KCiAgICA8IS0tIExhc3QgYmFja3VwIC0tPgogICAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTEwIiByPSI3IiBmaWxsPSIjNkI3MjgwIi8+CiAgICA8dGV4dCB4PSIxMjAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5MYXN0IEJhY2t1cDwvdGV4dD4KCiAgICA8IS0tIERpc2FzdGVyIC0tPgogICAgPGNpcmNsZSBjeD0iMzYwIiBjeT0iMTEwIiByPSI4IiBmaWxsPSIjQzE0NDJEIi8+CiAgICA8dGV4dCB4PSIzNjAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjQzE0NDJEIj5EaXNhc3RlcjwvdGV4dD4KCiAgICA8IS0tIFJlc3RvcmVkIC0tPgogICAgPGNpcmNsZSBjeD0iNTgwIiBjeT0iMTEwIiByPSI3IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1ODAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5TeXN0ZW0gUmVzdG9yZWQ8L3RleHQ+CgogICAgPCEtLSBSUE8gYnJhY2tldCAtLT4KICAgIDxwYXRoIGQ9Ik0xMjAsMTQwIEwxMjAsMTUwIEwzNjAsMTUwIEwzNjAsMTQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMS42Ii8+CiAgICA8cmVjdCB4PSIxNzUiIHk9IjE1MiIgd2lkdGg9IjEzMCIgaGVpZ2h0PSI0MiIgcng9IjYiIGZpbGw9IiNGM0Y0RjYiLz4KICAgIDx0ZXh0IHg9IjI0MCIgeT0iMTY5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzc0MTUxIj5SUE88L3RleHQ+CiAgICA8dGV4dCB4PSIyNDAiIHk9IjE4NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5hY2NlcHRhYmxlIGRhdGEgbG9zczwvdGV4dD4KCiAgICA8IS0tIFJUTyBicmFja2V0IC0tPgogICAgPHBhdGggZD0iTTM2MCwxNDAgTDM2MCwxNTAgTDU4MCwxNTAgTDU4MCwxNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICAgIDxyZWN0IHg9IjQxMCIgeT0iMTUyIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjQyIiByeD0iNiIgZmlsbD0iI0VGRjZGRiIvPgogICAgPHRleHQgeD0iNDc1IiB5PSIxNjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMyNTYzRUIiPlJUTzwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ3NSIgeT0iMTg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiMyNTYzRUIiPmFjY2VwdGFibGUgZG93bnRpbWU8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
    caption: "RPO measures the acceptable data loss window before a disaster; RTO measures the acceptable downtime window after it, until the system is restored.",
    afterParagraph: 11,
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
     WHERE title = 'Business Continuity and Disaster Recovery'
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
