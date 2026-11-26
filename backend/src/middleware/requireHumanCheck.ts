import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { verifyHumanCheck } from "../utils/humanCheck";

export const HUMAN_CHECK_STATUS = 428;
export const HUMAN_CHECK_MESSAGE =
  "The answer to the human check wasn't right (or the question expired). Please answer the new question.";

/**
 * Public form endpoints: require a correct answer to the human-check sum
 * (body.humanToken + body.humanAnswer, from GET /api/human-check). The two fields are
 * removed before validation so the endpoints' own schemas are unchanged.
 * Skipped under NODE_ENV=test (like the rate limiters) unless HUMAN_CHECK_IN_TESTS=1.
 */
export function requireHumanCheck(req: Request, res: Response, next: NextFunction) {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const { humanToken, humanAnswer } = body;
  delete body.humanToken;
  delete body.humanAnswer;
  if (config.nodeEnv === "test" && process.env.HUMAN_CHECK_IN_TESTS !== "1") return next();
  if (verifyHumanCheck(humanToken, humanAnswer)) return next();
  return res.status(HUMAN_CHECK_STATUS).json({ error: { message: HUMAN_CHECK_MESSAGE, code: "HUMAN_CHECK" } });
}
