// AP Title Case transformer
// Rules:
// - Capitalize first and last word
// - Capitalize nouns, pronouns, verbs, adjectives, adverbs (default behavior)
// - Lowercase: articles (a, an, the), coordinating conjunctions
//   (and, but, or, for, nor, so, yet), and prepositions under 4 letters
// - Always capitalize the first word after a colon
// - Preserve punctuation and spacing

const LOWERCASE_WORDS = new Set([
  // articles
  "a", "an", "the",
  // coordinating conjunctions
  "and", "but", "or", "for", "nor", "so", "yet",
  // common prepositions under 4 letters
  "as", "at", "by", "in", "of", "off", "on", "out", "per", "to", "up", "via",
]);

function capitalize(word: string): string {
  if (!word) return word;
  // Handle hyphenated words: capitalize each segment
  if (word.includes("-")) {
    return word
      .split("-")
      .map((seg) => capitalize(seg))
      .join("-");
  }
  // Find first alphabetic char (skip leading punctuation/quotes)
  const match = word.match(/[a-zA-Z]/);
  if (!match) return word;
  const idx = word.indexOf(match[0]);
  return (
    word.slice(0, idx) +
    word.charAt(idx).toUpperCase() +
    word.slice(idx + 1).toLowerCase()
  );
}

function lowercaseWord(word: string): string {
  // Lowercase but preserve any leading/trailing punctuation
  return word.toLowerCase();
}

export function toAPTitleCase(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Split into tokens preserving whitespace
  const tokens = trimmed.split(/(\s+)/);

  // Identify indices of "word" tokens (non-whitespace)
  const wordIndices: number[] = [];
  tokens.forEach((tok, i) => {
    if (tok.trim().length > 0) wordIndices.push(i);
  });

  if (wordIndices.length === 0) return trimmed;

  const firstWordIdx = wordIndices[0];
  const lastWordIdx = wordIndices[wordIndices.length - 1];

  // Track whether the previous word ended with a colon
  let capitalizeNext = false;

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.trim().length === 0) continue;

    const isFirst = i === firstWordIdx;
    const isLast = i === lastWordIdx;

    // Strip surrounding punctuation to evaluate the core word
    const coreMatch = tok.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9'’-]+)([^a-zA-Z0-9]*)$/);
    const core = coreMatch ? coreMatch[2] : tok;
    const lowerCore = core.toLowerCase();

    let transformed: string;
    if (isFirst || isLast || capitalizeNext) {
      transformed = capitalize(tok);
    } else if (LOWERCASE_WORDS.has(lowerCore)) {
      transformed = lowercaseWord(tok);
    } else {
      transformed = capitalize(tok);
    }

    tokens[i] = transformed;

    // Determine if next non-whitespace word should be force-capitalized
    capitalizeNext = /:$/.test(tok.trim());
  }

  return tokens.join("");
}
