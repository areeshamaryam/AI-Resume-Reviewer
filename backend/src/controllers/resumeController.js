import Resume from "../models/resume.js";
import extractTextFromPDF from "../utils/pdfParser.js";
import { analyzeResume } from "../services/geminiService.js";

// Upload Resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    // Extract PDF text
    const extractedText = await extractTextFromPDF(req.file.path);

    // Get job details from frontend
    const { jobTitle, jobDescription } = req.body;

    // Analyze using Gemini
    const analysis = await analyzeResume(
      extractedText,
      jobTitle,
      jobDescription,
    );
    const aiResult = JSON.parse(analysis);

    // Save Resume
    const resume = new Resume({
      user: req.user.id,

      // Stored filename on server
      fileName: req.file.filename,

      // Original filename uploaded by user
      originalName: req.file.originalname,

      filePath: req.file.path,

      extractedText,
      jobTitle,
      jobDescription,

      atsScore: aiResult.jobMatchScore,

      jobMatchScore: aiResult.jobMatchScore,

      matchedSkills: aiResult.matchedSkills,

      summary: aiResult.summary,

      strengths: aiResult.strengths,

      weaknesses: aiResult.weaknesses,

      missingSkills: aiResult.missingSkills,

      suggestions: aiResult.suggestions,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Resumes
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Resume By ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    res.status(200).json({
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
