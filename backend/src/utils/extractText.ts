export function extractNameAndEmail(text: string) {
  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "N/A";

  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let bestName = "Not Found";
  let bestScore = 0;

  const badWords = [
    "artificial intelligence",
    "natural language",
    "machine learning",
    "data science",
    "deep learning",
    "software engineering",
    "resume",
    "objective",
    "education",
    "experience",
    "skills",
    "projects",
    "summary",
    "university",
    "college",
    "institute",
    "department"
  ];

  const isValidCandidate = (line: string) => {
    const lower = line.toLowerCase();

    if (line.includes("@")) return false;
    if (line.length < 3 || line.length > 50) return false;

    if (badWords.some(w => lower.includes(w))) return false;

    if (!/^[A-Za-z. ]+$/.test(line)) return false;

    const words = line.split(" ").filter(Boolean);

    if (words.length < 2 || words.length > 4) return false;

    return true;
  };

  // 🔥 IMPORTANT CHANGE: search ONLY top 15 lines (resume header area)
  const searchLines = lines.slice(0, 15);

  for (let i = 0; i < searchLines.length; i++) {
    const line = searchLines[i];

    if (!isValidCandidate(line)) continue;

    const words = line.split(" ").filter(Boolean);

    let score = 0;

    // position priority (very important)
    score += (15 - i);

    // name pattern bonus
    const titleCaseRatio =
      words.filter(w => /^[A-Z][a-z]+$/.test(w)).length / words.length;

    score += titleCaseRatio * 5;

    // 2–3 word preference
    if (words.length === 2 || words.length === 3) {
      score += 3;
    }

    // penalty if ALL CAPS (topics)
    if (line === line.toUpperCase()) {
      score -= 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestName = line;
    }
  }

  return {
    name: bestScore >= 3 ? bestName : "Not Found",
    email
  };
}