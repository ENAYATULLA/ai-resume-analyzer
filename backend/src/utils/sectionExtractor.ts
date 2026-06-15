export function extractSections(resumeText: string) {
  const sections = {
    objective: "",
    experience: "",
    education: "",
    projects: "",
    skills: ""
  };

  const lines = resumeText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let currentSection: keyof typeof sections | null = null;

  const isHeading = (line: string) => {
    const l = line.toLowerCase();

    return (
      l === "objective" ||
      l === "summary" ||
      l === "experience" ||
      l === "work experience" ||
      l === "education" ||
      l === "projects" ||
      l === "project" ||
      l === "skills"
    );
  };

  for (let line of lines) {
    const lower = line.toLowerCase();

    // detect clean headings only
    if (isHeading(lower)) {
      if (lower.includes("objective") || lower.includes("summary")) {
        currentSection = "objective";
      } else if (lower.includes("experience")) {
        currentSection = "experience";
      } else if (lower.includes("education")) {
        currentSection = "education";
      } else if (lower.includes("project")) {
        currentSection = "projects";
      } else if (lower.includes("skill")) {
        currentSection = "skills";
      }

      continue;
    }

    // ignore junk lines (VERY IMPORTANT)
    if (
      lower.includes("phone") ||
      lower.includes("email") ||
      lower.includes("@") ||
      line.length > 120
    ) {
      continue;
    }

    // assign content
    if (currentSection) {
      sections[currentSection] += line + " ";
    }
  }

  // final cleanup (trim extra spaces)
  Object.keys(sections).forEach((key) => {
    sections[key as keyof typeof sections] =
      sections[key as keyof typeof sections].trim();
  });

  return sections;
}