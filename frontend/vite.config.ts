import react from "@vitejs/plugin-react";
// vitest/config re-exports vite's defineConfig with the `test` option typed in, so this
// file stays the single source of truth for both `vite dev`/`vite build` and `vitest`.
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
