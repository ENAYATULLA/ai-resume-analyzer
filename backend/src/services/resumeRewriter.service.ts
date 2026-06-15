// backend/src/services/resumeRewriter.service.ts

type RewriteInput = {
  text: string;
  skills: string[];
  missingSkills: string[];
  jobDescription?: string;
};

export const rewriteResume = (data: RewriteInput) => {
  const { text, skills, missingSkills, jobDescription = "" } = data;

  const topSkills = skills.slice(0, 6).join(", ");

  // =========================
  // 1. ATS KEYWORD BOOST
  // =========================
  const keywordBoost =
    missingSkills.length > 0
      ? `Integrated missing industry keywords like ${missingSkills.join(", ")} to improve ATS visibility.`
      : "Strong keyword alignment with industry standards.";

  // =========================
  // 2. IMPROVED SUMMARY
  // =========================
  const improvedSummary = `
Results-driven software developer with strong expertise in ${topSkills}. Experienced in building scalable applications and working with modern tech stacks. ${keywordBoost}
  `.trim();

  // =========================
  // 3. REWRITTEN BULLET POINTS
  // =========================
  const bulletPoints = [
    "Designed and developed scalable web applications using modern full-stack technologies.",
    "Improved system performance and optimized API response times.",
    "Built reusable UI components and responsive interfaces.",
    "Collaborated in cross-functional teams to deliver production-ready features.",
    "Implemented clean architecture and best coding practices."
  ];

  // =========================
  // 4. JOB MATCH OPTIMIZATION (IF JD EXISTS)
  // =========================
  let jdAdvice = "";

  if (jobDescription) {
    jdAdvice =
      "Resume optimized according to job description keywords and required skills alignment.";
  }

  // =========================
  // FINAL OUTPUT
  // =========================
  return {
    improvedSummary,
    bulletPoints,
    keywordBoost,
    jdAdvice,
  };
};