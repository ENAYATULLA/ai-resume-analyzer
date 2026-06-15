import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Analyzer Backend is healthy 🚀",
    time: new Date().toISOString(),
  });
});

export default router;