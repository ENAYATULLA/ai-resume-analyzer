import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { analyzeResume } from "../services/resumeAI.service";

const router = Router();

router.post("/upload", upload.single("file"), async (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await analyzeResume(req.file.path);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
});

export default router;