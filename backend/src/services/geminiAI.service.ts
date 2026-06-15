import axios from "axios";

export const analyzeWithAI = async (
  resumeText: string
) => {
  try {
    const prompt = `
You are a professional ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

{
  "name": "",
  "email": "",
  "skills": [],
  "experience_level": "",
  "ats_score": 0,
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "job_roles": [],
  "improvement_tips": []
}

Resume:
${resumeText}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]
        ?.text || "{}";

    console.log("RAW GEMINI RESPONSE:");
    console.log(rawText);

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

  } catch (error: any) {
    console.error(
      "Gemini Analysis Error:",
      error.response?.data || error.message
    );

    throw new Error("Gemini AI analysis failed");
  }
};