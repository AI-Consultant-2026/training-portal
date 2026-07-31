import { EmailAdapter, EmailMessage } from "./EmailAdapter";

export class MemoryEmailAdapter implements EmailAdapter {
  sentMessages: EmailMessage[] = [];

  async send(message: EmailMessage): Promise<void> {
    this.sentMessages.push(message);
  }

  clear(): void {
    this.sentMessages = [];
  }
}
