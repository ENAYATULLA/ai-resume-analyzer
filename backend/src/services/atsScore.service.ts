export const calculateATSScore = (
  resumeText: string,
  skills: string[],
  sections?: any
) => {
  const text = resumeText.toLowerCase();

  // =========================
  // 1. BASE KEYWORD SCORE (30%)
  // =========================
  const keywords = [
    "project",
    "experience",
    "education",
    "skill",
    "developed",
    "built",
    "implemented"
  ];

  let keywordHits = 0;

  keywords.forEach(k => {
    if (text.includes(k)) keywordHits++;
  });

  const keywordScore = (keywordHits / keywords.length) * 30;

  // =========================
  // 2. SKILL SCORE (30%)
  // =========================
  const skillScore = Math.min(skills.length * 2, 30);

  // =========================
  // 3. SECTION SCORE (40%) ⭐ NEW
  // =========================
  let sectionScore = 0;

  if (sections) {
    if (sections.experience && sections.experience.length > 50) {
      sectionScore += 10;
    }

    if (sections.projects && sections.projects.length > 50) {
      sectionScore += 10;
    }

    if (sections.education && sections.education.length > 20) {
      sectionScore += 10;
    }

    if (sections.skills && sections.skills.length > 20) {
      sectionScore += 10;
    }
  }

  // =========================
  // FINAL SCORE
  // =========================
  const atsScore = Math.round(
    keywordScore + skillScore + sectionScore
  );

  return {
    atsScore,
    breakdown: {
      keywordScore: Math.round(keywordScore),
      skillScore: Math.round(skillScore),
      sectionScore: Math.round(sectionScore)
    }
  };
};