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
  // Optional, used by the in-portal "Report a problem" email so support can reply
  // straight to the student and see their screenshot.
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
  // Extra headers, e.g. List-Unsubscribe on lead follow-up emails.
  headers?: Record<string, string>;
}

export interface EmailAdapter {
  send(message: EmailMessage): Promise<void>;
}
