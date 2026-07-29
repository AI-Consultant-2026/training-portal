import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  globalSetup: "<rootDir>/test/globalSetup.ts",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  verbose: true,
};

export default config;
