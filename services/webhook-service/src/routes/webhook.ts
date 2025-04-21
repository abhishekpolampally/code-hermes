// src/routes/webhook.ts
import express from "express";
import { verifyGithubSignature } from "../middleware/verifyHMAC.js";

const router = express.Router();

router.post(
  "/webhook",
  verifyGithubSignature(process.env.WEBHOOK_SECRET ?? ""),
  (req, res) => {
    const event = req.headers["x-github-event"];
    const action = req.body.action;

    console.log(event, action);

    if (event === "pull_requests" && action === "reopened") {
      const pr = req.body.pull_request;
      const repo = req.body.repository;

      console.log(`🆕 New PR by ${pr.user.login} in ${repo.full_name}`);
      console.log(`🔗 PR: ${pr.html_url}`);
    }

    res.status(200).send("Event received");
  }
);

export default router;
