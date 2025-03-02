import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post("/ask", async (req, res) => {
  try {
    const { problemUrl, userQuestion } = req.body;

    if (!problemUrl || !userQuestion) {
      return res.status(400).json({ error: "Missing required fields: problemUrl and userQuestion" });
    }

    const prompt = `You are a DSA teaching assistant. Help students understand problems by guiding them without direct answers.
    Problem URL: ${problemUrl}
    Question: ${userQuestion}`;

    // 🔹 Use the correct model name
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });

    // 🔹 Extract response safely
    const response = result.response;
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

    res.json({ answer: text });
  } catch (error) {
    console.error("Error:", error);

    // 🔹 Provide detailed error messages
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message || "Unknown error occurred."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
