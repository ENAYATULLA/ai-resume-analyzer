export function extractSections(resumeText: string) {
  const sections = {
    objective: "",
    experience: "",
    education: "",
    projects: "",
    skills: "",
  };

  const lines = resumeText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let currentSection: keyof typeof sections | null = null;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (
      lower.includes("objective") ||
      lower.includes("summary")
    ) {
      currentSection = "objective";
      continue;
    }

    if (
      lower.includes("experience") ||
      lower.includes("internship")
    ) {
      currentSection = "experience";
      continue;
    }

    if (
      lower.includes("education") ||
      lower.includes("academic")
    ) {
      currentSection = "education";
      continue;
    }

    if (
      lower.includes("project") ||
      lower.includes("publication")
    ) {
      currentSection = "projects";
      continue;
    }

    if (
      lower.includes("skills") ||
      lower.includes("technical skills") ||
      lower.includes("research interest")
    ) {
      currentSection = "skills";
      continue;
    }

    if (currentSection) {
      sections[currentSection] += line + " ";
    }
  }

  return sections;
}