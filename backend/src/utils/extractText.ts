export function extractNameAndEmail(text: string) {
  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "N/A";

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const badWords = [
    "objective",
    "education",
    "experience",
    "skills",
    "projects",
    "publication",
    "research",
    "summary",
    "university",
    "college",
    "institute",
    "department",
    "artificial intelligence",
    "natural language",
    "machine learning",
    "information retrieval",
    "large language",
    "multilingual",
    "email",
    "phone",
    "address",
  ];

  let bestName = "Not Found";
  let bestScore = 0;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (line.includes("@")) continue;

    if (badWords.some((w) => lower.includes(w))) continue;

    if (!/^[A-Za-z.\s]+$/.test(line)) continue;

    const words = line.split(/\s+/).filter(Boolean);

    if (words.length < 2 || words.length > 4) continue;

    let score = 0;

    // ENAYAT ULLAH type names
    if (/^[A-Z\s]+$/.test(line)) {
      score += 20;
    }

    // Enayat Ullah type names
    const titleWords = words.filter((w) =>
      /^[A-Z][a-z]+$/.test(w)
    ).length;

    score += titleWords * 5;

    if (words.length === 2) score += 10;
    if (words.length === 3) score += 8;

    if (line.length < 25) score += 10;

    if (score > bestScore) {
      bestScore = score;
      bestName = line;
    }
  }

  return {
    name: bestName,
    email,
  };
}