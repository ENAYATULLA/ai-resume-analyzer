import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractNameWithAI(resumeText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a resume parser.

Extract ONLY the candidate full name from this resume text.

Rules:
- Return ONLY the name (no explanation)
- If not found, return "Not Found"
- Ignore skills, education, universities, headings, topics
- Name is a PERSON only

Resume:
"""${resumeText.slice(0, 4000)}"""
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return text || "Not Found";
  } catch (err) {
    console.error("AI Name Extraction Error:", err);
    return "Not Found";
  }
}