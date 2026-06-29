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
