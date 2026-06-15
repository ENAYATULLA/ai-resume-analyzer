// backend/src/services/resumeFeedback.service.ts

type ResumeInput = {
  text: string;
  skills?: string[];
  categorizedSkills?: Record<string, string[]>;
  experienceLevel?: string;
  sections?: any;
};

export const generateRecruiterFeedback = (data: ResumeInput) => {
  const { skills = [], experienceLevel = "Fresher", sections = {} } = data;

  // -----------------------------
  // 1. SKILLS ANALYSIS (HUMAN STYLE)
  // -----------------------------
  const skillFeedback =
    skills.length > 15
      ? "Your resume shows a strong and diverse technical skill set, which is highly attractive for most roles."
      : skills.length > 7
      ? "You have a solid foundational skill set, but expanding a few advanced tools would improve your profile."
      : "Your skill section is quite limited. Adding more relevant technologies will significantly improve your chances.";

  // -----------------------------
  // 2. EXPERIENCE ANALYSIS
  // -----------------------------
  const experienceFeedback =
    experienceLevel === "Experienced"
      ? "Your experience section reflects practical industry exposure, which is a strong advantage."
      : experienceLevel === "Fresher"
      ? "As a fresher, your resume should focus more on projects, internships, and real-world applications."
      : "Your experience needs clearer structuring and more impact-driven descriptions.";

  // -----------------------------
  // 3. SECTION QUALITY ANALYSIS
  // -----------------------------
  const hasProjects = sections?.projects ? true : false;
  const hasEducation = sections?.education ? true : false;

  const sectionFeedback = `
${hasProjects ? "Your projects section adds strong value and shows practical ability." : "Adding real-world projects will significantly improve your resume impact."}
${hasEducation ? "Your education details are well-presented." : "Education section needs proper structuring and clarity."}
`.trim();

  // -----------------------------
  // 4. OVERALL RECRUITER SUMMARY
  // -----------------------------
  const summary = `
From a recruiter’s perspective, your resume shows ${experienceLevel.toLowerCase()} level potential. ${skillFeedback} ${experienceFeedback}
Overall, your profile is ${skills.length > 10 ? "competitive" : "developing"} but can be improved with targeted refinements in structure and impact-driven writing.
`.trim();

  // -----------------------------
  // FINAL OUTPUT
  // -----------------------------
  return {
    recruiterSummary: summary,
    skillFeedback,
    experienceFeedback,
    sectionFeedback,
  };
};