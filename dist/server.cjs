var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var RESUME_CONTEXT = `
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
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const ai = new import_genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  app.use(import_express.default.json());
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${RESUME_CONTEXT}

User Question: ${message}
AI Answer:`
      });
      const responseText = response.text || "No response received";
      res.json({ text: responseText });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to fetch response from Gemini" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
