import { Request, Response } from "express";
import { unsubscribeEmail } from "../services/emailUnsubscribe.service";
import { asyncHandler } from "../utils/asyncHandler";
import { renderUnsubscribePage } from "../utils/unsubscribePage";

// GET: the link in a campaign email. POST: mail apps' one-click unsubscribe (RFC 8058).
export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  const ok = await unsubscribeEmail(String(req.query.e ?? ""), String(req.query.t ?? ""));
  if (req.method === "POST") {
    res.status(ok ? 200 : 400).json({ ok });
    return;
  }
  const page = ok
    ? renderUnsubscribePage("You're unsubscribed", "You won't receive any more marketing emails from Paleon Training.")
    : renderUnsubscribePage(
        "This unsubscribe link isn't valid",
        "The link may be incomplete. To stop our emails, reply to any of them with \"unsubscribe\", or email hello@paleontraining.com.",
      );
  res.status(ok ? 200 : 400).type("html").send(page);
});
