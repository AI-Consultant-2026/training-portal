import { config } from "../../config";
import { EmailAdapter } from "./EmailAdapter";
import { MemoryEmailAdapter } from "./MemoryEmailAdapter";
import { SmtpEmailAdapter } from "./SmtpEmailAdapter";

function buildEmailAdapter(): EmailAdapter {
  if (config.nodeEnv === "test") {
    return new MemoryEmailAdapter();
  }
  return new SmtpEmailAdapter(config.email);
}

export const emailAdapter: EmailAdapter = buildEmailAdapter();
export type { EmailAdapter, EmailMessage } from "./EmailAdapter";
export { MemoryEmailAdapter } from "./MemoryEmailAdapter";
