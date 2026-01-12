// Remove ALL whitespace and uppercase once.
// Examples:
// " m r \n m " -> "MRM"
// "" -> ""
export function normalize(raw: string | undefined | null): string {
  return (raw ?? "").replace(/\s+/g, "").toUpperCase();
}

// Validation regexes
const CMD_PLUS = /^[LRM]+$/; // at least one command
const CMD_STAR = /^[LRM]*$/; // zero or more commands

// Toggle whether an empty string is allowed (treat as no-op)
export function isValidCommands(s: string, allowEmpty = true): boolean {
  return (allowEmpty ? CMD_STAR : CMD_PLUS).test(s);
}
