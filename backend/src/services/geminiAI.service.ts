import axios from "axios";

export const analyzeWithAI = async (resumeText: string) => {
  try {
    const prompt = `
You are a professional ATS Resume Analyzer.

Return ONLY valid JSON. No markdown, no explanation.

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

Rules:
- If unknown values, use empty string or empty array
- Do not hallucinate personal info
- Keep JSON strictly valid

Resume:
${resumeText}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    console.log("RAW GEMINI RESPONSE:", rawText);

    // =========================
    // CLEANING FIX (IMPORTANT)
    // =========================
    rawText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/^[^{]*/, "") // remove garbage before JSON
      .trim();

    // =========================
    // SAFE JSON PARSE
    // =========================
    try {
      return JSON.parse(rawText);
    } catch (err) {
      console.error("JSON Parse Failed:", rawText);

      return {
        name: "",
        email: "",
        skills: [],
        experience_level: "",
        ats_score: 0,
        strengths: [],
        weaknesses: [],
        missing_skills: [],
        job_roles: [],
        improvement_tips: [],
      };
    }
  } catch (error: any) {
    console.error(
      "Gemini Analysis Error:",
      error.response?.data || error.message
    );

    throw new Error("Gemini AI analysis failed");
  }
};