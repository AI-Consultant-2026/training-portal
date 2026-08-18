import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// Lean on purpose: hooks correctness + TypeScript rules only, no jsx-a11y yet -- an
// accessibility pass across existing pages is a separate, bigger effort with its own
// triage, not something to bundle silently into turning lint on for the first time.
export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // Only the two classic hooks rules -- eslint-plugin-react-hooks v7's
      // `recommended` bundles a much larger, stricter "React Compiler" rule family
      // (set-state-in-effect, no-deriving-state-in-effects, purity, etc.) that flags
      // widespread, otherwise-fine patterns across this codebase and would need real
      // refactors to satisfy, not just a lint-config change.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);
