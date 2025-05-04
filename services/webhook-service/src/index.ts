import express, { Request, Response } from "express";
import webhookRouter from "./routes/webhook.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ verify: rawBodySaver }));

// Routes
app.use("/webhook", webhookRouter);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Webhook service running on port ${process.env.PORT}`);
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
