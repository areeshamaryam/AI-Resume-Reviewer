import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

// Upload Resume
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// Get All Resumes
router.get("/my-resumes", authMiddleware, getMyResumes);

// Get Resume By ID
router.get("/:id", authMiddleware, getResumeById);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

export default router;
