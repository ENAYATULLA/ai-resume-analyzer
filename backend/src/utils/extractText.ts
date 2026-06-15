export function extractNameAndEmail(text: string) {
  const cleanText = text.replace(/\s+/g, " ");

  // ======================
  // EMAIL EXTRACTION
  // ======================
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = cleanText.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "N/A";

  // ======================
  // NAME EXTRACTION (SMART)
  // ======================

  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let name = "N/A";

  for (let line of lines) {
    const trimmed = line.trim();

    // skip bad lines
    if (
      trimmed.includes("@") ||
      trimmed.toLowerCase().includes("email") ||
      trimmed.toLowerCase().includes("phone") ||
      trimmed.toLowerCase().includes("resume") ||
      trimmed.toLowerCase().includes("curriculum") ||
      trimmed.toLowerCase().includes("artificial intelligence") ||
      trimmed.toLowerCase().includes("machine learning") ||
      trimmed.toLowerCase().includes("developer") ||
      trimmed.length > 40
    ) {
      continue;
    }

    // NAME RULE:
    // 2–4 words, mostly alphabets
    const words = trimmed.split(" ");

    if (
      words.length >= 2 &&
      words.length <= 4 &&
      /^[A-Za-z ]+$/.test(trimmed)
    ) {
      name = trimmed;
      break;
    }
  }

  return { name, email };
}