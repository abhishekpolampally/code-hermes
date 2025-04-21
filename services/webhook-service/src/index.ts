import express, { Request, Response } from "express";
import webhookRouter from "./routes/webhook.js";

const app = express();
app.use(express.json({ verify: rawBodySaver }));

// Routes
app.use("/webhook", webhookRouter);

app.listen(3001, () => {
  console.log("🚀 Webhook service running on port 3001");
});

// Needed to verify HMAC
function rawBodySaver(
  req: Request & { rawBody?: Buffer },
  res: Response,
  buf: Buffer
) {
  if (buf && buf.length) {
    req.rawBody = buf;
  }
}
