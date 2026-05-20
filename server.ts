
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const RESUME_CONTEXT = `
You are an AI assistant for Rangan Das's portfolio. 
About Rangan:
- Name: Rangan Das
- Education: BCA at IEM Kolkata (2023-2026).
- Role: Full Stack Developer.
- Core Skills: 
  - Advanced: Python, HTML, CSS, JavaScript, MySQL, Git, GitHub.
  - Intermediate: C++, C, Java, React, Node.js, MongoDB, Docker, Postman.
- Experience: 
  - SDE Intern at Blue Stock Fintech (2024-Present).
  - Virtual Internships at JPMC and Lyft (2024).
- Projects (Recent Deployments):
  1. Amazon Clone: Responsive storefront replica with layout precision and cart-ready interactions.
  2. Skill Snap: AI skill platform for growth plans and tracking.
  3. Nexus Chat: Conversational AI app with session memory and lightweight APIs.
  4. Mindpal: AI-powered student mental health companion.
  5. Driver Safety Mechanism: Road safety system monitoring driver behavior.
  6. Weather App: Real-time forecasting with location-based updates.
  7. Scientific Calculator App: Advanced operations and intuitive UI.
  8. Langify: ML-based hand gesture to alphabet converter.
  9. AetherType: Gesture-based text input system using real-time hand tracking.
- Achievements:
  - HackerRank Gold in Python and Java.
  - 3rd Place in IEM Hackathon.
- Contact: ranganiem23@gmail.com | Location: Kolkata, India.
- Availability: Available for work.

Answer questions about Rangan precisely and concisely based on this context. Maintain a professional, innovative, and helpful tone consistent with the "Liquid Terminal" aesthetic (tech-forward).
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.use(express.json());

  // Gemini API Proxy
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${RESUME_CONTEXT}\n\nUser Question: ${message}\nAI Answer:`,
      });

      // Use type assertion to avoid linter issues with the SDK response property
      const responseText = (response as any).text || "No response received";
      res.json({ text: responseText });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to fetch response from Gemini" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
