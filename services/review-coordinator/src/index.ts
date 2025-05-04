import express from "express";
import dotenv from "dotenv";
import prRouter from "./routes/pr.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/review", prRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Review Coordinator listening on port ${PORT}`);
});
