import { execSync } from "child_process";

export default function globalSetup() {
  execSync("npx sequelize-cli db:migrate", {
    cwd: __dirname + "/..",
    env: { ...process.env, NODE_ENV: "test" },
    stdio: "inherit",
  });
}
