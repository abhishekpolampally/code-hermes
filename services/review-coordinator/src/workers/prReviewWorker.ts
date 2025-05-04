import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { prisma } from "@code-hermes/db";
import { GitHubPRFile, ReviewComment } from "@code-hermes/types";
import { getAuthenticatedOctokit } from "@code-hermes/shared";
import axios from "axios";

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "pr-review",
  async (job) => {
    try {
      const { prNumber, repo, owner } = job.data;
      console.log("🤖 Starting review for:", { prNumber, repo, owner });
      const prDetails = await prisma.pullRequest.findFirst({
        where: {
          prNumber,
        },
      });
      if (prDetails) {
        const prFiles = (prDetails?.files as any)?.data as GitHubPRFile[];

        const response = await axios.post(
          `${process.env.REVIEW_ENGINE_URL}/llm`,
          {
            files: prFiles,
          }
        );

        if (!Array.isArray(response.data.comments)) {
          throw new Error("Invalid format from the LLM");
        }

        const comments = response.data.comments as ReviewComment[];

        await prisma.reviewComment.createMany({
          data: comments.map((comment) => ({
            prNumber,
            repo,
            owner,
            filePath: comment.filename,
            lineNumber: comment.line_number,
            comment: comment.comment,
            resolved: false,
          })),
        });

        const repoInstallationDetails =
          await prisma.repositoryInstallation.findUnique({
            where: {
              repo_owner: {
                repo,
                owner,
              },
            },
          });

        if (!repoInstallationDetails?.installationId) {
          throw new Error("Cannot find installation Id. Please try again");
        }

        const octokit = await getAuthenticatedOctokit(
          repoInstallationDetails.installationId
        );

        await octokit.pulls.createReview({
          owner,
          repo,
          pull_number: prNumber,
          event: "COMMENT", // or "REQUEST_CHANGES" or "APPROVE"
          comments: comments.map((comment) => ({
            path: comment.filename,
            body: comment.comment,
            line: comment.line_number,
            side: "RIGHT", // assuming you’re commenting on the new code
          })),
        });

        console.log("Added comments on the original PR in Github");
      } else {
        console.log("Could not find PR");
      }
    } catch (error) {
      console.log(error);
    }
    // Trigger AI or LLM here
  },
  { connection }
);

console.log("👷 PR Review Worker is running...");

worker.on("completed", (job) => console.log("Completed", job.data));
