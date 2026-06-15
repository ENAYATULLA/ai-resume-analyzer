import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });

// TEMP upload endpoint (must exist for frontend)
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    message: "File uploaded successfully",
  });
});

export default router;