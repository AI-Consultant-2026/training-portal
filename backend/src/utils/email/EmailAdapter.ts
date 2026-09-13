export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
  // Overrides the adapter's configured fromAddress for this one message -- used by the
  // email campaign feature, where the sender is one of two admin-selected addresses
  // rather than the fixed transactional EMAIL_FROM_ADDRESS. Left unset, every other
  // caller keeps sending from that one fixed address exactly as before.
  from?: string;
}

export interface EmailAdapter {
  send(message: EmailMessage): Promise<void>;
}
