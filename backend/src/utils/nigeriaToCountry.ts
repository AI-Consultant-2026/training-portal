// Course content no longer names the country: "Nigeria's" becomes "the country's" and
// "Nigeria" becomes "the country". Left exactly as written:
//   - "Nigerian" (a different word)
//   - "Nigeria" followed by a bracketed aside: "Nigeria (NCAA)", "in Nigeria (for example ...)"
//   - official names and place names: "the Nigeria Data Protection Commission", "Nigeria
//     Civil Aviation Authority", "Central Bank of Nigeria", "GRID3 Nigeria", "Asaba, Nigeria"
//
// Used by migration 20260920050000 (stored text) and to rewrite the seeder sources.

// "Nigeria" as a whole word, and not one of the kept forms above: not followed by "(" or a
// capitalised word (an official name), not preceded by "Bank of ", "GRID3 " or a comma.
const N = String.raw`(?<!Bank of )(?<!GRID3 )(?<!, )Nigeria(?![A-Za-z])(?! \()(?! [A-Z])`;
// Start of a sentence/line/heading, where the replacement needs a capital: a literal
// backslash-n (seeder sources), a real newline (DB text), ". ", markdown bold/heading/list,
// or an opening quote (a string literal in the seeder sources that starts with the word).
const START = String.raw`(^|\\n|\n|[.!?]["')\]*]* +|\*\*|#+ +|[-*] +|["'\x60])`;

export function nigeriaToCountry(text: string): string {
  return (
    text
      // "the Nigeria boundary layer", "Nigeria-specific"
      .replace(new RegExp(`\\b(the|The) ${N}`, "g"), "$1 country")
      .replace(new RegExp(`\\b${N}-(?=\\w)`, "g"), "country-")
      // Sentence-initial mentions need a capital.
      .replace(new RegExp(`${START}${N}('s)?`, "g"), (_m, pre: string, poss?: string) => `${pre}The country${poss ?? ""}`)
      // Everything else.
      .replace(new RegExp(`\\b${N}('s)?`, "g"), (_m, poss?: string) => `the country${poss ?? ""}`)
  );
}
