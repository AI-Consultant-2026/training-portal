import { Request, Response } from "express";
import * as leadService from "../services/lead.service";
import { unsubscribeLead } from "../services/leadUnsubscribe.service";
import { asyncHandler } from "../utils/asyncHandler";
import { renderUnsubscribePage } from "../utils/unsubscribePage";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json({ id: lead.id });
});

function unsubscribePage(ok: boolean): string {
  return ok
    ? renderUnsubscribePage(
        "You're unsubscribed",
        "You won't receive any more course follow-up emails from Paleon Training. If you change your mind, you can use the Career Match on our homepage at any time.",
      )
    : renderUnsubscribePage(
        "This unsubscribe link isn't valid",
        "The link may be incomplete. To stop our emails, reply to any of them with \"unsubscribe\", or email hello@paleontraining.com.",
      );
}

// GET: the link in the email. POST: mail apps' one-click unsubscribe (RFC 8058).
export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.query.id ?? "");
  const token = String(req.query.t ?? "");
  const ok = await unsubscribeLead(id, token);
  if (req.method === "POST") {
    res.status(ok ? 200 : 400).json({ ok });
    return;
  }
  res.status(ok ? 200 : 400).type("html").send(unsubscribePage(ok));
});
