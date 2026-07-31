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
