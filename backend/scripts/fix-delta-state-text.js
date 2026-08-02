// One-off maintenance script: replaces "Delta State" with "the State" in
// already-seeded production rows. Editing the seeder source files doesn't
// retroactively change data a seeder already inserted, so this fixes the
// live rows directly. Run once via the Render Shell:
//   node scripts/fix-delta-state-text.js
// Safe to re-run: it only touches rows still matching "Delta State", and the
// grammar-repair patterns are idempotent no-ops once already applied.
const { Client } = require("pg");

// Mirrors, in order, the exact replacements already applied to the seeder
// source files: a blind "Delta State" -> "the State" produces doubled/
// misplaced articles in a few specific phrases (e.g. "a Delta State business"
// -> "a the State business"), so those get fixed immediately after.
function fixText(text) {
  if (text == null) return text;
  let out = text.replace(/Delta State/g, "the State");
  const specificFixes = [
    ["a fictional the State business", "a fictional State business"],
    ["those detailed the State business personas", "those detailed State business personas"],
    ["a specific the State resource", "a specific State resource"],
    ["a genuinely hot the State afternoon", "a genuinely hot afternoon here in the State"],
    ["one particular the State location", "one particular State location"],
    ["real the State use cases", "real State use cases"],
    ["real the State businesses", "real State businesses"],
    ["a new the State tourism business", "a new State tourism business"],
    ["the State Solar Potential Calculation", "State Solar Potential Calculation"],
  ];
  for (const [bad, good] of specificFixes) {
    out = out.split(bad).join(good);
  }
  // Generic safety net for any doubled-article pattern not covered above.
  out = out.replace(/\ba the State\b/g, "a State");
  out = out.replace(/\bA the State\b/g, "A State");
  out = out.replace(/\bthe the State\b/g, "the State");
  return out;
}

const TARGETS = [
  { table: "courses", columns: ["description"] },
  { table: "assignments", columns: ["title", "description"] },
  { table: "quiz_questions", columns: ["question_text", "explanation"] },
  { table: "quiz_answers", columns: ["answer_text"] },
  { table: "capstones", columns: ["title", "description"] },
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false },
  });
  await client.connect();

  let totalUpdated = 0;

  for (const { table, columns } of TARGETS) {
    const whereClause = columns.map((c) => `${c} ILIKE '%Delta State%'`).join(" OR ");
    const selectCols = ["id", ...columns].join(", ");
    const res = await client.query(`SELECT ${selectCols} FROM ${table} WHERE ${whereClause}`);

    for (const row of res.rows) {
      const updates = {};
      let changed = false;
      for (const col of columns) {
        const fixed = fixText(row[col]);
        if (fixed !== row[col]) {
          updates[col] = fixed;
          changed = true;
        }
      }
      if (!changed) continue;

      const setClause = Object.keys(updates)
        .map((col, i) => `${col} = $${i + 1}`)
        .join(", ");
      const values = [...Object.values(updates), row.id];
      await client.query(`UPDATE ${table} SET ${setClause} WHERE id = $${values.length}`, values);
      totalUpdated++;
    }
    console.log(`${table}: ${res.rows.length} row(s) matched, updated`);
  }

  console.log("total rows updated:", totalUpdated);

  // Verification: should all be zero.
  for (const { table, columns } of TARGETS) {
    const checks = [
      columns.map((c) => `${c} ILIKE '%Delta State%'`).join(" OR "),
      columns.map((c) => `${c} ILIKE '%a the State%'`).join(" OR "),
      columns.map((c) => `${c} ILIKE '%the the State%'`).join(" OR "),
    ];
    for (const clause of checks) {
      const res = await client.query(`SELECT count(*) FROM ${table} WHERE ${clause}`);
      if (Number(res.rows[0].count) > 0) {
        console.log(`WARNING: ${table} still has ${res.rows[0].count} row(s) matching: ${clause}`);
      }
    }
  }
  console.log("verification complete");

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
