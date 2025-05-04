import { GitHubPRFile, ReviewComment } from "@code-hermes/types";
import { Router } from "express";
import { callLLM } from "../llm-client/index.js";
import { buildPrompt } from "../prompt-builder/index.js";

const llmRouter = Router();

llmRouter.post("/", async (req, res) => {
  const { files } = req.body;

  try {
    const prompt = buildPrompt(files as GitHubPRFile[]);

    const outputData = await callLLM(prompt);

    res.status(200).json({
      comments: JSON.parse(outputData) as ReviewComment[],
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

export default llmRouter;
