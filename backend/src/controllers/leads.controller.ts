import { Request, Response } from "express";
import * as leadService from "../services/lead.service";
import { unsubscribeLead } from "../services/leadUnsubscribe.service";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json({ id: lead.id });
});

function unsubscribePage(ok: boolean): string {
  const title = ok ? "You're unsubscribed" : "This unsubscribe link isn't valid";
  const body = ok
    ? "You won't receive any more course follow-up emails from Paleon Training. If you change your mind, you can use the Career Match on our homepage at any time."
    : "The link may be incomplete. To stop our emails, reply to any of them with \"unsubscribe\", or email hello@paleontraining.com.";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | Paleon Training</title></head><body style="margin:0;background:#F7F4EC;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#10151F"><main style="max-width:560px;margin:12vh auto;padding:0 24px"><p style="letter-spacing:.12em;text-transform:uppercase;font-size:13px;color:#C96A26;font-weight:600">Paleon Training</p><h1 style="font-size:28px;margin:8px 0 12px">${title}</h1><p style="line-height:1.6">${body}</p><p><a href="/welcome" style="color:#C96A26;font-weight:600">Go to paleontraining.com</a></p></main></body></html>`;
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
