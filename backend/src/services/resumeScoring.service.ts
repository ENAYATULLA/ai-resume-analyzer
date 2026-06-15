// backend/src/services/resumeScoring.service.ts

type ResumeInput = {
  skills?: string[];
  experienceLevel?: string;
  sections?: any;
};

type ScoreBreakdown = {
  skills: number;
  experience: number;
  education: number;
  projects: number;
  overall: number;
};

export const calculateResumeScore = (data: ResumeInput): ScoreBreakdown => {
  const { skills = [], experienceLevel = "Fresher", sections = {} } = data;

  // -----------------------------
  // 1. SKILLS SCORE
  // -----------------------------
  let skillsScore = 0;

  if (skills.length >= 15) skillsScore = 90;
  else if (skills.length >= 10) skillsScore = 75;
  else if (skills.length >= 5) skillsScore = 60;
  else skillsScore = 40;

  // bonus for diversity (basic heuristic)
  const uniqueSkills = new Set(skills.map(s => s.toLowerCase()));
  if (uniqueSkills.size > 10) skillsScore += 5;

  skillsScore = Math.min(skillsScore, 100);

  // -----------------------------
  // 2. EXPERIENCE SCORE
  // -----------------------------
  let experienceScore = 0;

  switch (experienceLevel) {
    case "Experienced":
      experienceScore = 90;
      break;
    case "Intermediate":
      experienceScore = 70;
      break;
    case "Fresher":
    default:
      experienceScore = 55;
  }

  // boost if experience section exists
  if (sections?.experience) experienceScore += 5;

  experienceScore = Math.min(experienceScore, 100);

  // -----------------------------
  // 3. EDUCATION SCORE
  // -----------------------------
  let educationScore = sections?.education ? 75 : 50;

  // boost if structured education present
  if (typeof sections?.education === "string" && sections.education.length > 50) {
    educationScore += 10;
  }

  educationScore = Math.min(educationScore, 100);

  // -----------------------------
  // 4. PROJECTS SCORE
  // -----------------------------
  let projectsScore = sections?.projects ? 75 : 40;

  if (Array.isArray(sections?.projects) && sections.projects.length >= 3) {
    projectsScore = 85;
  }

  if (typeof sections?.projects === "string" && sections.projects.length > 80) {
    projectsScore += 10;
  }

  projectsScore = Math.min(projectsScore, 100);

  // -----------------------------
  // 5. FINAL WEIGHTED SCORE (ATS STYLE)
  // -----------------------------
  const overall =
    skillsScore * 0.35 +
    experienceScore * 0.25 +
    projectsScore * 0.2 +
    educationScore * 0.2;

  return {
    skills: Math.round(skillsScore),
    experience: Math.round(experienceScore),
    education: Math.round(educationScore),
    projects: Math.round(projectsScore),
    overall: Math.round(overall),
  };
};