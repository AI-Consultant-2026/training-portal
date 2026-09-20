// Course content no longer names the country: "Nigeria's" becomes "the country's",
// "Nigeria" becomes "the country", and Nigeria is dropped where it is part of a body's
// official name or an address ("the Nigeria Data Protection Commission" -> "the Data
// Protection Commission", "Central Bank of Nigeria" -> "Central Bank", "Asaba, Nigeria" ->
// "Asaba"). "Nigerian" is deliberately left alone.
//
// Used by migration 20260920050000 (stored text) and to rewrite the seeder sources.

// "Nigeria" as a whole word, not "Nigerian" or a longer identifier.
// "Nigeria (NCAA)", "Nigeria (for example ...)" -- the word followed by a bracketed aside --
// is kept as written, so a comparison like "Nigeria (NCAA), the UK (CAA)" still reads.
const N = String.raw`Nigeria(?![A-Za-z])(?! \()`;
// Start of a sentence/line/heading, where the replacement needs a capital: a literal
// backslash-n (seeder sources), a real newline (DB text), ". ", markdown bold/heading/list,
// or an opening quote (a string literal in the seeder sources that starts with the word).
const START = String.raw`(^|\\n|\n|[.!?]["')\]*]* +|\*\*|#+ +|[-*] +|["'\x60])`;

export function nigeriaToCountry(text: string): string {
  return (
    text
      // Official names and addresses: drop the word.
      .replace(new RegExp(`\\bBank of ${N}`, "g"), "Bank")
      .replace(new RegExp(`\\bGRID3 ${N}`, "g"), "GRID3")
      .replace(new RegExp(`(?<=[A-Za-z]), ${N}`, "g"), "")
      .replace(new RegExp(`\\b${N} (?=[A-Z])`, "g"), "")
      // "the Nigeria boundary layer", "Nigeria-specific"
      .replace(new RegExp(`\\b(the|The) ${N}`, "g"), "$1 country")
      .replace(new RegExp(`\\b${N}-(?=\\w)`, "g"), "country-")
      // Sentence-initial mentions need a capital.
      .replace(new RegExp(`${START}${N}('s)?`, "g"), (_m, pre: string, poss?: string) => `${pre}The country${poss ?? ""}`)
      // Everything else.
      .replace(new RegExp(`\\b${N}('s)?`, "g"), (_m, poss?: string) => `the country${poss ?? ""}`)
  );
}
