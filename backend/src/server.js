import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { analyzeResume } from "./services/geminiService.js";

dotenv.config();
// console.log("Gemini Key:", process.env.GEMINI_API_KEY);
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("AI Resume Reviewer API Running");
});

const PORT = process.env.PORT || 5000;

// const testAI = async () => {
//   const result = await analyzeResume(`
// Computer Science Graduate

// Skills:
// React
// Node.js
// MongoDB

// Projects:
// AI Resume Reviewer
//   `);

//   console.log(result);
// };

// testAI();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
