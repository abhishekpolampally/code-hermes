import crypto from "crypto";
import { NextFunction, Request, RequestHandler, Response } from "express";

type CustomRequest = Request & { rawBody?: Buffer };

export function verifyGithubSignature(secret: string): RequestHandler {
  const middleware: RequestHandler = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const signature = req.headers["x-hub-signature-256"];
    if (!signature || !req.rawBody) {
      res.status(401).send("Missing signature");
      return;
    }
    const hmac = crypto.createHmac("sha256", secret);
    const digest = "sha256=" + hmac.update(req.rawBody).digest("hex");

    if (digest !== signature) {
      res.status(401).send("Invalid signature");
      return;
    }
    next();
  };
  return middleware;
}
