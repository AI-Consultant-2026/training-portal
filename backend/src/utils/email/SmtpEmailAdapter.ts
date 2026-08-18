import nodemailer, { Transporter } from "nodemailer";
import { EmailAdapter, EmailMessage } from "./EmailAdapter";

export interface SmtpEmailAdapterConfig {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromAddress: string;
}

export class SmtpEmailAdapter implements EmailAdapter {
  private readonly transporter: Transporter;
  private readonly fromAddress: string;

  constructor(config: SmtpEmailAdapterConfig) {
    this.fromAddress = config.fromAddress;
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPass } : undefined,
      // Nodemailer has no timeout at all by default -- an unreachable host (e.g. no real
      // SMTP provider configured yet, only the "mailhog" dev default) hangs the socket
      // forever instead of erroring. Every caller of EmailAdapter.send() now also treats
      // email as best-effort rather than awaiting it on the response path, but this is
      // the fail-fast backstop in case something ever does await it directly.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });
  }

  async send(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: this.fromAddress,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}
