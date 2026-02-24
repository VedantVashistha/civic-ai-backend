import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/analyze", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an emergency civic risk classifier.

Classify strictly:

Critical = gas leak, fire, explosion, building collapse
High = electrical hazard, major flooding
Medium = potholes, broken streetlight
Low = garbage, noise, minor issue

Resolution time:
Critical → 1
High → 6
Medium → 24
Low → 48

Return ONLY valid JSON:
{
  "severity": "Low|Medium|High|Critical",
  "hours": number
}

Issue: "${description}"
`,
      config: { responseMimeType: "application/json" }
    });

    const aiText = response.text;
    console.log("AI RAW:", aiText);

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (e) {
      console.error("JSON parse failed:", e);
      return res.status(500).json({ error: "Invalid AI JSON" });
    }

    // STRICT CLEAN RESPONSE
    return res.status(200).json({
      severity: parsed.severity,
      hours: parsed.hours
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: "AI processing failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
