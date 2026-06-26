import Resume from "../models/resume.js";

export const uploadResume = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    // Create a new resume file
    const resume = new Resume({
      user: req.user.id,
      fileName: req.file.filename,
      filePath: req.file.path,
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
