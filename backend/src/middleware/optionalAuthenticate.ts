import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../services/token.service";

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice("Bearer ".length);
    try {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      // Invalid/expired token on an optionally-authenticated route: proceed as anonymous.
    }
  }
  next();
}
