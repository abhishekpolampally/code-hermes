// src/routes/webhook.ts
import express from "express";
import { verifyGithubSignature } from "../middleware/verifyHMAC.js";
import { getAuthenticatedOctokit } from "@code-hermes/shared";
import axios from "axios";

const router = express.Router();

router.post("/", verifyGithubSignature(), async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    if (event === "pull_request" && payload.action === "reopened") {
      const installationId = payload.installation.id;
      const { number: pull_number, head, base } = payload.pull_request;
      const [owner, repo] = payload.repository.full_name.split("/");

      const octokit = await getAuthenticatedOctokit(installationId);

      // You now have full access to the repo via the GitHub App!
      const files = await octokit.pulls.listFiles({
        owner,
        repo,
        pull_number,
      });

      files.data.forEach((file) => {
        if (file.patch) {
          console.log("Patch for file:", file.filename);
          console.log(file.patch); // This is the unified diff of the changes
        }
      });

      await axios.post(`${process.env.REVIEW_COORDINATOR_URL}/review`, {
        prNumber: pull_number,
        repo,
        owner,
        files,
        installationId,
      });

      res.status(200).send("Webhook processed successfully");
    } else {
      res.status(200).send("Event ignored");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
