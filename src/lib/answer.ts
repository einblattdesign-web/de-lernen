// Loose comparison for the translation exercises: ignore case, punctuation,
// and extra whitespace so minor formatting differences aren't marked wrong.
export function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:„“"']/g, "")
    .replace(/\s+/g, " ");
}

export function isCloseEnough(userAnswer: string, correctAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
}
