import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { uploadResume, getMyResumes } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

router.get("/my-resumes", authMiddleware, getMyResumes);

export default router;
