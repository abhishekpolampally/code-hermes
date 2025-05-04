import express from "express";
import { prQueue } from "../queue/index.js";
import { prisma } from "@code-hermes/db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prNumber, repo, owner, files, installationId } = req.body;

  await prisma.pullRequest.upsert({
    where: {
      prNumber,
    },
    create: {
      prNumber,
      repo,
      owner,
      files,
    },
    update: {
      files,
    },
  });

  await prisma.repositoryInstallation.upsert({
    where: {
      repo_owner: {
        owner,
        repo,
      },
    },
    create: {
      owner,
      repo,
      installationId,
    },
    update: {
      installationId,
    },
  });

  await prQueue.add("review", { prNumber, repo, owner });

  res.status(200).json({ message: "PR job added to queue" });
});

export default router;
