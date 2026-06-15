import { extractSections } from "../utils/sectionExtractor";
import { extractNameAndEmail } from "../utils/extractText";
import { calculateATSScore } from "./atsScore.service";
import { generateRecruiterFeedback } from "./resumeFeedback.service";
import { calculateResumeScore } from "./resumeScoring.service";
import { generateCareerRoadmap } from "./careerRoadmap.service";
import { generateCoverLetter } from "./coverLetter.service";
import { rewriteResume } from "./resumeRewriter.service";
import fs from "fs";

const pdfParse = require("pdf-parse");

export const analyzeResume = async (
  filePath: string,
  jobDescription: string = ""
) => {
  try {
    // =========================
    // PDF READ
    // =========================
    const buffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(buffer);

    const resumeText = pdfData.text || "";

    if (!resumeText.trim()) {
      return {
        success: false,
        message: "No readable text found in PDF",
      };
    }

    const text = resumeText.toLowerCase();

    // =========================
    // SECTION EXTRACTION
    // =========================
    const sections = extractSections(resumeText);

    // =========================
    // SKILL DATABASE
    // =========================
    const skillCategories = {
      frontend: ["html", "css", "javascript", "typescript", "react", "next", "redux", "tailwind", "bootstrap"],
      backend: ["node", "express", "nestjs", "rest api", "graphql"],
      database: ["mongodb", "postgresql", "mysql", "sqlite", "redis"],
      ai_ml: ["python", "machine learning", "deep learning", "ai", "nlp", "llm", "tensorflow", "pytorch", "ocr"],
      devops: ["docker", "kubernetes", "aws", "azure", "ci/cd"],
      programming: ["c", "c++", "java", "python"],
      tools: ["git", "github", "postman", "gemini api"],
    };

    const allSkills = Object.values(skillCategories).flat();

    const detectedSkills = allSkills.filter((skill) =>
      text.includes(skill.toLowerCase())
    );

    const uniqueSkills = [...new Set(detectedSkills)];

    // =========================
    // CATEGORIZED SKILLS
    // =========================
    const categorizedSkills = {
      frontend: skillCategories.frontend.filter((s) => text.includes(s.toLowerCase())),
      backend: skillCategories.backend.filter((s) => text.includes(s.toLowerCase())),
      database: skillCategories.database.filter((s) => text.includes(s.toLowerCase())),
      ai_ml: skillCategories.ai_ml.filter((s) => text.includes(s.toLowerCase())),
      devops: skillCategories.devops.filter((s) => text.includes(s.toLowerCase())),
      programming: skillCategories.programming.filter((s) => text.includes(s.toLowerCase())),
      tools: skillCategories.tools.filter((s) => text.includes(s.toLowerCase())),
    };

    // =========================
    // EXPERIENCE LEVEL
    // =========================
    let experienceLevel = "Fresher";

    if (text.includes("senior") || text.includes("lead") || text.includes("5 years")) {
      experienceLevel = "Senior";
    } else if (text.includes("intern") || text.includes("trainee")) {
      experienceLevel = "Beginner";
    }

    // =========================
    // ATS SCORE
    // =========================
    const atsResult = calculateATSScore(resumeText, uniqueSkills, sections);
    const atsScore = atsResult.atsScore;

    // =========================
    // NAME + EMAIL
    // =========================
    const { name, email } = extractNameAndEmail(resumeText);

    // =========================
    // JOB MATCHING
    // =========================
    type JobMatch = {
      role: string;
      score: number;
      reason: string[];
    };

    const jobMatches: JobMatch[] = [];

    let frontendScore = 0;
    const frontendReasons: string[] = [];

    if (uniqueSkills.includes("react")) {
      frontendScore += 40;
      frontendReasons.push("React detected");
    }
    if (uniqueSkills.includes("javascript")) {
      frontendScore += 30;
      frontendReasons.push("JavaScript detected");
    }
    if (uniqueSkills.includes("html") || uniqueSkills.includes("css")) {
      frontendScore += 20;
      frontendReasons.push("UI skills present");
    }

    if (frontendScore > 0) {
      jobMatches.push({
        role: "Frontend Developer",
        score: frontendScore,
        reason: frontendReasons,
      });
    }

    let backendScore = 0;
    const backendReasons: string[] = [];

    if (uniqueSkills.includes("node")) {
      backendScore += 40;
      backendReasons.push("Node.js detected");
    }
    if (uniqueSkills.includes("express")) {
      backendScore += 30;
      backendReasons.push("Express detected");
    }
    if (uniqueSkills.includes("mongodb") || uniqueSkills.includes("postgresql")) {
      backendScore += 20;
      backendReasons.push("Database skills detected");
    }

    if (backendScore > 0) {
      jobMatches.push({
        role: "Backend Developer",
        score: backendScore,
        reason: backendReasons,
      });
    }

    let fullStackScore = 0;
    const fullStackReasons: string[] = [];

    if (frontendScore > 50 && backendScore > 50) {
      fullStackScore = 90;
      fullStackReasons.push("Strong frontend + backend combination");
    } else if (frontendScore > 30 && backendScore > 30) {
      fullStackScore = 70;
      fullStackReasons.push("Basic full stack capability detected");
    }

    if (fullStackScore > 0) {
      jobMatches.push({
        role: "Full Stack Developer",
        score: fullStackScore,
        reason: fullStackReasons,
      });
    }

    let aiScore = 0;
    const aiReasons: string[] = [];

    if (
      uniqueSkills.includes("python") ||
      uniqueSkills.includes("machine learning") ||
      uniqueSkills.includes("ai")
    ) {
      aiScore += 50;
      aiReasons.push("AI/ML skills detected");
    }

    if (
      uniqueSkills.includes("pytorch") ||
      uniqueSkills.includes("tensorflow")
    ) {
      aiScore += 40;
      aiReasons.push("Deep learning frameworks detected");
    }

    if (uniqueSkills.includes("nlp") || uniqueSkills.includes("llm")) {
      aiScore += 30;
      aiReasons.push("NLP / LLM experience detected");
    }

    if (aiScore > 0) {
      jobMatches.push({
        role: "AI/ML Engineer",
        score: aiScore,
        reason: aiReasons,
      });
    }

    jobMatches.sort((a, b) => b.score - a.score);

    // =========================
    // MISSING SKILLS
    // =========================
    const missingSkills: string[] = [];

    if (!uniqueSkills.includes("typescript")) missingSkills.push("TypeScript");
    if (!uniqueSkills.includes("mongodb")) missingSkills.push("MongoDB");
    if (!uniqueSkills.includes("next")) missingSkills.push("Next.js");

    // =========================
    // STRENGTHS
    // =========================
    const strengths: string[] = [];
    if (text.includes("project")) strengths.push("Strong Project Portfolio");
    if (text.includes("github")) strengths.push("GitHub Profile Present");
    if (uniqueSkills.length > 8) strengths.push("Strong Technical Skills");

    // =========================
    // WEAKNESSES
    // =========================
    const weaknesses: string[] = [];
    if (!text.includes("intern")) weaknesses.push("No Internship Experience");
    if (!text.includes("linkedin")) weaknesses.push("Missing LinkedIn Profile");

    // =========================
    // IMPROVEMENTS
    // =========================
    const improvementTips: string[] = [];
    if (!text.includes("linkedin")) improvementTips.push("Add LinkedIn Profile");
    if (missingSkills.length > 0) improvementTips.push(`Learn ${missingSkills.join(", ")}`);

    // =========================
    // SUMMARY
    // =========================
    const summary = `Candidate has ${uniqueSkills.length} skills and is ${experienceLevel}. Roles: ${
      jobMatches.map((j) => j.role).join(", ") || "Software Developer"
    }`;

    // =========================
    // 🔥 PHASE 7 STEP 3 ADDITION
    // =========================
    const recruiterFeedback = generateRecruiterFeedback({
      text: resumeText,
      skills: uniqueSkills,
      categorizedSkills,
      experienceLevel,
      sections,
    });

    const scoreBreakdown = calculateResumeScore({
      skills: uniqueSkills,
      experienceLevel,
      sections,
    });
    // ===============================
// PHASE 8 STEP 3 - RESUME REWRITER
// ===============================

const resumeRewrite = rewriteResume({
  text: resumeText,
  skills: uniqueSkills,
  missingSkills,
  jobDescription,
});
    // ===============================
// PHASE 8 STEP 1 - COVER LETTER
// ===============================

const primaryRole = jobMatches?.[0]?.role || "Software Developer";

const coverLetter = generateCoverLetter({
  name,
  skills: uniqueSkills,
  experienceLevel,
  jobRole: primaryRole,
});
    // ===============================
// PHASE 7 STEP 4 - CAREER ROADMAP
// ===============================

const careerRoadmap = generateCareerRoadmap({
  skills: uniqueSkills,
  missingSkills,
  experienceLevel,
  scoreBreakdown,
});

    // =========================
    // RETURN
    // =========================
    return {
      success: true,
      aiEnabled: false,

      text: resumeText.slice(0, 2000),

      skills: uniqueSkills,
      categorizedSkills,

      experienceLevel,

      name,
      email,

      atsScore,

      strengths,
      weaknesses,

      missingSkills,
      jobRoles: jobMatches.map((job) => job.role),
      jobMatches,

      improvementTips,
      sections,

      summary,
      careerRoadmap,
      coverLetter,
      resumeRewrite,

      // 🔥 PHASE 7 OUTPUT
      recruiterFeedback,
      scoreBreakdown,
    };
  } catch (error: any) {
    console.error("Resume Analyze Error:", error);

    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};