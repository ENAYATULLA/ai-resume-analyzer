export const calculateATSScore = (
  resumeText: string,
  skills: string[],
  sections?: any
) => {
  const text = resumeText.toLowerCase();

  // =========================
  // KEYWORDS (25)
  // =========================
  const keywords = [
    "project",
    "education",
    "skill",
    "developed",
    "built",
    "implemented",
    "created",
    "designed",
    "research",
    "publication",
    "github",
    "machine learning",
    "artificial intelligence",
    "nlp",
    "llm"
  ];

  let keywordHits = 0;

  keywords.forEach((keyword) => {
    if (text.includes(keyword.toLowerCase())) {
      keywordHits++;
    }
  });

  const keywordScore =
    (keywordHits / keywords.length) * 25;

  // =========================
  // SKILLS (35)
  // =========================
  const uniqueSkills = [
    ...new Set(skills.map((s) => s.toLowerCase())),
  ];

  const skillScore = Math.min(
    35,
    uniqueSkills.length * 1.8
  );

  // =========================
  // SECTIONS (30)
  // =========================
  let sectionScore = 0;

  if (sections) {
    if ((sections.education || "").length > 30)
      sectionScore += 10;

    if ((sections.projects || "").length > 30)
      sectionScore += 10;

    if ((sections.skills || "").length > 20)
      sectionScore += 10;
  }

  // =========================
  // RESUME QUALITY BONUS (10)
  // =========================
  let bonus = 0;

  if (text.includes("github")) bonus += 2;

  if (text.includes("linkedin")) bonus += 2;

  if (text.includes("publication")) bonus += 3;

  if (
    text.includes("machine learning") ||
    text.includes("artificial intelligence") ||
    text.includes("nlp")
  ) {
    bonus += 3;
  }

  // =========================
  // FINAL SCORE
  // =========================
  const atsScore = Math.min(
    100,
    Math.round(
      keywordScore +
        skillScore +
        sectionScore +
        bonus
    )
  );

  return {
    atsScore,
    breakdown: {
      keywordScore: Math.round(keywordScore),
      skillScore: Math.round(skillScore),
      sectionScore: Math.round(sectionScore),
      bonus: Math.round(bonus),
    },
  };
};