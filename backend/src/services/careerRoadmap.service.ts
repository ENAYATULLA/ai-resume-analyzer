// backend/src/services/careerRoadmap.service.ts

type RoadmapInput = {
  skills: string[];
  missingSkills: string[];
  experienceLevel: string;
  scoreBreakdown: {
    overall: number;
  };
};

export const generateCareerRoadmap = (data: RoadmapInput) => {
  const { skills, missingSkills, experienceLevel, scoreBreakdown } = data;

  const overall = scoreBreakdown.overall;

  // ==============================
  // 1. JOB READINESS STATUS
  // ==============================
  let readiness = "Beginner";

  if (overall >= 85) readiness = "Job Ready (Strong)";
  else if (overall >= 70) readiness = "Almost Job Ready";
  else if (overall >= 50) readiness = "Intermediate";
  else readiness = "Needs Improvement";

  // ==============================
  // 2. PRIORITY SKILLS (TOP GAP FOCUS)
  // ==============================
  const prioritySkills = missingSkills.slice(0, 5);

  // ==============================
  // 3. 30 DAY PLAN
  // ==============================
  const plan30Days = [
    `Focus on strengthening: ${prioritySkills.join(", ")}`,
    "Build 1 strong full-stack project",
    "Improve GitHub portfolio",
    "Revise core CS fundamentals",
  ];

  // ==============================
  // 4. 90 DAY ROADMAP
  // ==============================
  const plan90Days = [
    "Build 2–3 real-world projects (deployed)",
    "Practice system design basics",
    "Improve resume with ATS optimization",
    "Apply to internships or junior roles",
    "Contribute to open-source or freelance work",
  ];

  // ==============================
  // 5. SKILL ADVICE (PERSONALIZED)
  // ==============================
  let advice = "";

  if (experienceLevel === "Fresher") {
    advice =
      "Focus on projects and practical implementation rather than advanced theory.";
  } else if (experienceLevel === "Senior") {
    advice =
      "Focus on system design, scalability, and leadership-level project impact.";
  } else {
    advice =
      "Balance between core fundamentals and real-world project experience.";
  }

  // ==============================
  // 6. FINAL OUTPUT
  // ==============================
  return {
    readiness,
    overallScore: overall,
    prioritySkills,
    plan30Days,
    plan90Days,
    advice,
  };
};