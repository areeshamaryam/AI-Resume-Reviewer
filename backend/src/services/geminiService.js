import { GoogleGenAI } from "@google/genai";

export const analyzeResume = async (resumeText, jobTitle, jobDescription) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert ATS resume analyzer.

Your task is to compare a candidate resume against a target job.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations outside JSON.

JSON FORMAT:

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "matchedSkills": [],
  "jobMatchScore": 0,
  "suggestions": []
}


Rules:

1. Compare the resume with the job description.
2. Identify skills that exist in both resume and job requirements.
3. Identify important missing skills from the job description.
4. Give a realistic jobMatchScore from 0-100.
5. Do not randomly increase the score.
6. Base your score only on evidence from the resume.
7. Be specific for software engineering careers.


Target Job Title:
${jobTitle || "Not provided"}


Job Description:
${jobDescription || "Not provided"}


Candidate Resume:
${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0,
      },
    });

    let text = response.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
