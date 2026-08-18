import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// @testing-library/react's auto-cleanup only self-registers when it detects a global
// `afterEach` (e.g. Vitest's `globals: true`). This project intentionally uses
// explicit vitest imports instead of globals, so cleanup has to be wired up by hand --
// without it, each test file's renders pile up in the same jsdom document and later
// tests see duplicate elements from earlier ones.
afterEach(() => {
  cleanup();
});
