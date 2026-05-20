<div align="center">
  <h1>🚀 Portfolio 2.0</h1>
  <p>An interactive, AI-powered developer portfolio with immersive 3D/WebGL effects.</p>
</div>

---

## 📖 About The Project

Portfolio 2.0 is a highly interactive developer portfolio featuring advanced 3D visual effects and an integrated conversational AI assistant powered by Google Gemini. Blending performance, aesthetics, and intelligence, this portfolio provides visitors with an unforgettable experience while exploring projects, skills, and professional experience.

## ✨ Key Features

- **AI Chat Widget:** Converse directly with an integrated assistant powered by `@google/genai` to learn more about my background.
- **Immersive 3D Visuals:** Includes WebGL-powered components like `Hyperspeed`, `Ballpit`, and a dynamic `CursorTrail` leveraging `three.js` & `ogl`.
- **System Boot Sequence:** A creative terminal-style boot-up animation to engage users right from the start.
- **Interactive UI Components:** Smooth animations with `motion`, floating navigation, an elegant experience timeline, and a highly visual skill map.
- **Full-Stack Architecture:** React frontend powered by Vite, seamlessly served alongside an Express backend.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4
- **3D / Animations:** Three.js, OGL, Postprocessing, Motion
- **Backend:** Node.js, Express, TSX
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Build Tool:** Vite, esbuild

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if you haven't already)
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Update the `.env` file in the root directory with the following properties:
   ```env
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   APP_URL="http://localhost:5173" # Or your production URL
   ```

## 💻 Running the App

### Development Server
Run development server (Vite + Express):
```bash
npm run dev
```

### Production Build
Create an optimized production build for both client and server:
```bash
npm run build
```

Then start the production server:
```bash
npm start
```

## 📁 Project Structure Highlights
- `/src/components` - Core UI components including the AI Chat widget and 3D visual effects.
- `server.ts` - Express backend entry point.
- `vite.config.ts` - Vite configuration for frontend bundling.
