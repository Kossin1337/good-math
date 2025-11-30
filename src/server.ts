import express from "express";
import cors from "cors";

import calendarRouter from "./routes/calendar"; // adjust path if needed

const app = express();

// --- MIDDLEWARE ---

// Allow your Vite dev server
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin in dev
  })
);

// Parse JSON bodies (handy for other routes too)
app.use(express.json());

// --- ROUTES ---

// Calendar API under /api
app.use("/api", calendarRouter);

// Simple health check (optional)
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// --- START SERVER ---

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

export default app;