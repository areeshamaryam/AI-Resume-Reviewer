import { GoogleGenAI } from "@google/genai";

export const analyzeResume = async (resumeText) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an ATS resume reviewer.

Return ONLY valid JSON.

{
  "atsScore": 85,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
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
