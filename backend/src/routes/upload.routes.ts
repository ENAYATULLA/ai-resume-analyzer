import express, { Request, Response } from "express";
import { upload } from "../middleware/upload.middleware";
import { analyzeResume } from "../services/resumeAI.service";


const router = express.Router();

router.post(
  "/",
  upload.single("resume"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "ERROR",
          message: "No file uploaded"
        });
      }

      const analysis = await analyzeResume(req.file.path);

      return res.status(200).json({
        status: "OK",
        message: "Resume analyzed successfully",
        file: {
          filename: req.file.filename,
          path: req.file.path
        },
        analysis
      });
    } catch (error: any) {
      console.error("UPLOAD ERROR:", error);

      return res.status(500).json({
        status: "ERROR",
        message: "Resume analysis failed",
        error: error.message
      });
    }
  }
);

export default router;