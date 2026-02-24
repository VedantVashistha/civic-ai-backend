console.log("KEY EXISTS:", process.env.GEMINI_API_KEY ? "YES" : "NO");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // 🔥 Create client inside route (prevents startup crash)
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an emergency civic risk classifier.

Critical = gas leak, fire, explosion, building collapse
High = electrical hazard, flooding
Medium = potholes, broken streetlight
Low = garbage, minor issue

Return ONLY valid JSON:
{
  "severity": "Low|Medium|High|Critical",
  "hours": number
}

Issue: "${description}"
`,
      config: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});