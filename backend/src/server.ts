import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resume.routes";
import healthRoutes from "./routes/health.routes";

dotenv.config();

const app = express(); // ✅ FIXED (THIS WAS MISSING)

// =========================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================= ROUTES
app.use("/api/resume", resumeRoutes);
app.use("/api/health", healthRoutes);

// ========================= ROOT
app.get("/", (req, res) => {
  res.json({ message: "Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});