// Course modules are presented as "Day N" rather than "Week N". This rewrites the
// module-relative wording in lesson prose ("Week 3", "next week", "the past two weeks",
// "18-week course") and deliberately leaves real calendar time alone ("within two weeks",
// "a 4-week campaign", "days or weeks before", "per week").
//
// Used by migration 20260920040000 (stored text) and to rewrite the seeder sources.

const NUM = "(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen)";
// The seeders keep newlines as a literal backslash-n, so "\nNext week" has no word boundary
// before "Next"; treat that position as a boundary too. (Real newlines in DB text already are.)
const B = String.raw`(?:(?<![A-Za-z])|(?<=\\n))`;

function keepCase(from: string, to: string): string {
  if (from === from.toUpperCase() && from.length > 1) return to.toUpperCase();
  if (from[0] === from[0].toUpperCase()) return to[0].toUpperCase() + to.slice(1);
  return to;
}

type Build = (...groups: string[]) => string;
const RULES: [RegExp, Build][] = [];

function rule(re: RegExp, build: Build) {
  RULES.push([re, build]);
}

// "Week 3", "Weeks 1-12", "week three", "weeks three and five"
rule(new RegExp(`(${B}[Ww]eek)(s?)(?= (?:\\d|${NUM}\\b))`, "g"), (w, s) => keepCase(w, "day") + s);
// this/next/last/final/previous/remaining/following/earlier + week(s)
rule(new RegExp(`(${B}(?:this|next|last|final|previous|remaining|following|earlier|later) )week(s?)\\b`, "gi"), (p, s) => p + "day" + s);
// "every week of this course", "every week from here", "every remaining week" (handled above),
// "the weeks ahead"
rule(new RegExp(`(${B}[Ee]very )week( of this course| from here)`, "g"), (p, t) => p + "day" + t);
rule(new RegExp(`(${B}(?:the|detailed) )weeks( ahead)`, "g"), (p, t) => p + "days" + t);
// Course-progress spans: "next eight weeks", "first two weeks", "past seven weeks", "these two weeks"
rule(new RegExp(`(${B}(?:next|past|previous|first|these|last|these first|these past) (?:${NUM}|\\d+) )weeks\\b`, "gi"), (p) => p + "days");
// "fourteen weeks later/covering", "twelve weeks of genuinely", "the same twelve weeks",
// "completed fourteen weeks", "past eleven weeks"
rule(new RegExp(`(${B}fourteen )weeks( later| covering)`, "g"), (p, t) => p + "days" + t);
rule(new RegExp(`(${B}twelve )weeks( of genuinely)`, "g"), (p, t) => p + "days" + t);
rule(new RegExp(`(same ${NUM} )weeks`, "g"), (p) => p + "days");
// "18-week course", "8-week/16-lesson curriculum", "8-week / 16-lesson"
rule(new RegExp(`(\\d+-)week(?=(?: course|/| /))`, "g"), (p) => p + "day");
// "Weeks" as a table/stat heading is handled in the HTML pages, not here.

export function weeksToDays(text: string): string {
  let out = text;
  // Replacer args are (match, ...groups, offset, string); the builders only take the groups.
  for (const [re, build] of RULES) {
    out = out.replace(re, (...args: unknown[]) => build(...(args.slice(1) as string[]).filter((g) => typeof g === "string")));
  }
  return out;
}
