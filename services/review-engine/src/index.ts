import express from "express";
import dotenv from "dotenv";
import llmRouter from "./routes/llm.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/llm", llmRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`🚀 Review Engine listening on port ${PORT}`);
});
