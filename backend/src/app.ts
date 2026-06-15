import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Resume Analyzer API Running",
  });
});

// Upload routes
app.use("/api/upload", uploadRoutes);

export default app;