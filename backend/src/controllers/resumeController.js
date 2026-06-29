import Resume from "../models/resume.js";
import extractTextFromPDF from "../utils/pdfParser.js";
import { analyzeResume } from "../services/geminiService.js";
export const uploadResume = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }
    const extractedText = await extractTextFromPDF(req.file.path);
    const analysis = await analyzeResume(extractedText);

    const aiResult = JSON.parse(analysis);

    // Create a new resume file
    const resume = new Resume({
      user: req.user.id,

      fileName: req.file.filename,

      filePath: req.file.path,

      extractedText,

      atsScore: aiResult.atsScore,

      summary: aiResult.summary,

      strengths: aiResult.strengths,

      weaknesses: aiResult.weaknesses,

      missingSkills: aiResult.missingSkills,

      suggestions: aiResult.suggestions,
    });

    // Save to MongoDB
    await resume.save();

    res.status(201).json({
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
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
